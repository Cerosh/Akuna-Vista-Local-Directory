import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { JSONEventRepository } from "./eventRepository";
import type { Event } from "@/types/event";

function makeEvent(overrides: Partial<Event>): Event {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    title: "Example Event",
    slug: "example-event",
    description: "An event used for testing.",
    startDate: "2026-08-01T10:00:00Z",
    endDate: "2026-08-01T12:00:00Z",
    location: "Example Park",
    featured: false,
    ...overrides,
  };
}

describe("JSONEventRepository", () => {
  const now = new Date("2026-07-06T12:00:00Z");

  // `isPast` (lib/utils/dateStatus.ts) defaults to `new Date()` when the
  // repository calls it with no explicit `now` — reassigning `Date.now`
  // alone does NOT affect that (`new Date()` doesn't consult the
  // monkey-patched static method), so every test in this file needs real
  // fake-timer support to get a deterministic "now", not just the one test
  // that filters on it. `useFakeTimers`/`setSystemTime` correctly intercept
  // `new Date()` too.
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns all events", async () => {
    const events = [makeEvent({ slug: "a" }), makeEvent({ slug: "b" })];
    const repository = new JSONEventRepository(events);

    await expect(repository.getAll()).resolves.toHaveLength(2);
  });

  it("returns an empty array when no events exist", async () => {
    const repository = new JSONEventRepository([]);

    await expect(repository.getUpcomingEvents()).resolves.toEqual([]);
  });

  it("excludes events whose endDate has passed", async () => {
    const upcoming = makeEvent({ slug: "upcoming", endDate: "2026-08-01T12:00:00Z" });
    const past = makeEvent({ slug: "past", endDate: "2026-06-01T12:00:00Z" });
    const repository = new JSONEventRepository([upcoming, past]);

    const result = await repository.getUpcomingEvents();
    expect(result.map((event) => event.slug)).toEqual(["upcoming"]);
  });

  it("sorts upcoming events by startDate ascending", async () => {
    const later = makeEvent({ slug: "later", startDate: "2026-09-01T10:00:00Z" });
    const sooner = makeEvent({ slug: "sooner", startDate: "2026-08-01T10:00:00Z" });
    const repository = new JSONEventRepository([later, sooner]);

    const result = await repository.getUpcomingEvents();

    expect(result.map((event) => event.slug)).toEqual(["sooner", "later"]);
  });

  it("returns only featured events", async () => {
    const featured = makeEvent({ slug: "featured", featured: true });
    const notFeatured = makeEvent({ slug: "not-featured", featured: false });
    const repository = new JSONEventRepository([featured, notFeatured]);

    await expect(repository.getFeaturedEvents()).resolves.toEqual([featured]);
  });
});

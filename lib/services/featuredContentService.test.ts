import { describe, expect, it } from "vitest";
import { getFeaturedContent } from "./featuredContentService";
import type { Event } from "@/types/event";
import type { Announcement } from "@/types/announcement";
import type { Business } from "@/types/business";
import type { ResolvedPromotion } from "@/lib/services/resolvePromotionBusinesses";

function makeEvent(overrides: Partial<Event>): Event {
  return {
    id: "event-1",
    title: "Community BBQ",
    slug: "community-bbq",
    description: "A community gathering.",
    startDate: "2026-09-10T10:00:00Z",
    endDate: "2026-09-10T14:00:00Z",
    location: "Akuna Vista Park",
    featured: true,
    ...overrides,
  };
}

function makeResolvedPromotion(overrides: Partial<ResolvedPromotion> = {}): ResolvedPromotion {
  const business: Business = {
    id: "biz-1",
    slug: "abc-plumbing",
    name: "ABC Plumbing",
    description: "A business used for testing.",
    categoryId: "plumbing",
    featured: false,
    createdAt: "2026-07-06T00:00:00Z",
    updatedAt: "2026-07-06T00:00:00Z",
  };
  return {
    promotion: {
      id: "promo-1",
      businessId: "biz-1",
      title: "10% Off",
      description: "Available this month.",
      startDate: "2026-07-01",
      endDate: "2026-07-31",
      featured: true,
    },
    business,
    ...overrides,
  };
}

function makeAnnouncement(overrides: Partial<Announcement>): Announcement {
  return {
    id: "announcement-1",
    title: "Water main works",
    message: "Planned maintenance on Vista Street.",
    publishedAt: "2026-07-05T09:00:00Z",
    priority: "high",
    featured: true,
    ...overrides,
  };
}

describe("getFeaturedContent", () => {
  it("returns an empty array when nothing is featured", () => {
    expect(getFeaturedContent([], [], [])).toEqual([]);
  });

  it("normalises a featured event", () => {
    const [item] = getFeaturedContent([makeEvent({})], [], []);

    expect(item).toMatchObject({
      id: "event-1",
      type: "event",
      title: "Community BBQ",
    });
    expect(item.href).toBeUndefined();
  });

  it("normalises a featured promotion with a link to the business", () => {
    const [item] = getFeaturedContent([], [makeResolvedPromotion()], []);

    expect(item).toMatchObject({
      id: "promo-1",
      type: "promotion",
      title: "10% Off",
      meta: "ABC Plumbing",
      href: "/business/abc-plumbing",
    });
  });

  it("normalises a featured announcement", () => {
    const [item] = getFeaturedContent([], [], [makeAnnouncement({})]);

    expect(item).toMatchObject({
      id: "announcement-1",
      type: "announcement",
      title: "Water main works",
    });
    expect(item.href).toBeUndefined();
  });

  it("aggregates across all three content types", () => {
    const items = getFeaturedContent(
      [makeEvent({})],
      [makeResolvedPromotion()],
      [makeAnnouncement({})],
    );

    expect(items.map((item) => item.type)).toEqual(["event", "promotion", "announcement"]);
  });
});

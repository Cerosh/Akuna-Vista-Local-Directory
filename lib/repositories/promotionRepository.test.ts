import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { JSONPromotionRepository } from "./promotionRepository";
import type { Promotion } from "@/types/promotion";

function makePromotion(overrides: Partial<Promotion>): Promotion {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    businessId: "b1a7c3d2-4e5f-4a6b-8c7d-1e2f3a4b5c6d",
    title: "Example Promotion",
    description: "A promotion used for testing.",
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    featured: false,
    ...overrides,
  };
}

describe("JSONPromotionRepository", () => {
  const now = new Date("2026-07-06T12:00:00Z");

  // See eventRepository.test.ts for why every test needs this, not just the
  // ones that filter on `isPast`: reassigning `Date.now` alone doesn't
  // affect `new Date()`, which is what `isPast`'s default `now` uses.
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns all promotions", async () => {
    const promotions = [makePromotion({ id: "a" }), makePromotion({ id: "b" })];
    const repository = new JSONPromotionRepository(promotions);

    await expect(repository.getAll()).resolves.toHaveLength(2);
  });

  it("returns an empty array when no promotions exist", async () => {
    const repository = new JSONPromotionRepository([]);

    await expect(repository.getActivePromotions()).resolves.toEqual([]);
  });

  it("excludes promotions whose endDate has passed", async () => {
    const active = makePromotion({ id: "active", endDate: "2026-07-31" });
    const expired = makePromotion({ id: "expired", endDate: "2026-06-30" });
    const repository = new JSONPromotionRepository([active, expired]);

    const result = await repository.getActivePromotions();
    expect(result.map((promotion) => promotion.id)).toEqual(["active"]);
  });

  it("orders active promotions with featured ones first, preserving relative order otherwise", async () => {
    const first = makePromotion({ id: "first", featured: false });
    const second = makePromotion({ id: "second", featured: false });
    const featured = makePromotion({ id: "featured", featured: true });
    const repository = new JSONPromotionRepository([first, second, featured]);

    const result = await repository.getActivePromotions();
    expect(result.map((promotion) => promotion.id)).toEqual(["featured", "first", "second"]);
  });

  it("returns only featured promotions", async () => {
    const featured = makePromotion({ id: "featured", featured: true });
    const notFeatured = makePromotion({ id: "not-featured", featured: false });
    const repository = new JSONPromotionRepository([featured, notFeatured]);

    await expect(repository.getFeaturedPromotions()).resolves.toEqual([featured]);
  });

  it("returns promotions for a given business id", async () => {
    const forBusiness = makePromotion({ id: "matches", businessId: "biz-1" });
    const otherBusiness = makePromotion({ id: "other", businessId: "biz-2" });
    const repository = new JSONPromotionRepository([forBusiness, otherBusiness]);

    const result = await repository.getPromotionsByBusinessId("biz-1");

    expect(result.map((promotion) => promotion.id)).toEqual(["matches"]);
  });
});

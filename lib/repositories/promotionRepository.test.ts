import { describe, expect, it } from "vitest";
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

    const originalNow = Date.now;
    Date.now = () => now.getTime();
    try {
      const result = await repository.getActivePromotions();
      expect(result.map((promotion) => promotion.id)).toEqual(["active"]);
    } finally {
      Date.now = originalNow;
    }
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

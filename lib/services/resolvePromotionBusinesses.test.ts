import { describe, expect, it } from "vitest";
import { resolvePromotionBusinesses } from "./resolvePromotionBusinesses";
import type { Promotion } from "@/types/promotion";
import type { Business } from "@/types/business";

function makePromotion(overrides: Partial<Promotion>): Promotion {
  return {
    id: "promo-1",
    businessId: "biz-1",
    title: "Example Promotion",
    description: "A promotion used for testing.",
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    featured: false,
    ...overrides,
  };
}

function makeBusiness(overrides: Partial<Business>): Business {
  return {
    id: "biz-1",
    slug: "example-business",
    name: "Example Business",
    description: "A business used for testing.",
    categoryId: "plumbing",
    featured: false,
    createdAt: "2026-07-06T00:00:00Z",
    updatedAt: "2026-07-06T00:00:00Z",
    ...overrides,
  };
}

describe("resolvePromotionBusinesses", () => {
  it("resolves each promotion's businessId to its business", async () => {
    const promotion = makePromotion({ businessId: "biz-1" });
    const business = makeBusiness({ id: "biz-1" });

    const result = await resolvePromotionBusinesses([promotion], async (id) =>
      id === "biz-1" ? business : null,
    );

    expect(result).toEqual([{ promotion, business }]);
  });

  it("omits a promotion whose business no longer resolves", async () => {
    const resolvable = makePromotion({ id: "resolvable", businessId: "biz-1" });
    const dangling = makePromotion({ id: "dangling", businessId: "missing" });
    const business = makeBusiness({ id: "biz-1" });

    const result = await resolvePromotionBusinesses([resolvable, dangling], async (id) =>
      id === "biz-1" ? business : null,
    );

    expect(result.map((item) => item.promotion.id)).toEqual(["resolvable"]);
  });

  it("returns an empty array for an empty promotion list", async () => {
    const result = await resolvePromotionBusinesses([], async () => null);

    expect(result).toEqual([]);
  });
});

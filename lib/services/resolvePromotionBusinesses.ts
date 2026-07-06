import type { Promotion } from "@/types/promotion";
import type { Business } from "@/types/business";

export interface ResolvedPromotion {
  promotion: Promotion;
  business: Business;
}

/**
 * Resolves each promotion's businessId to a full Business record,
 * omitting (not throwing on) any promotion whose business no longer
 * exists. Shared by the Promotions section and the Featured Content
 * aggregator so this rule lives in exactly one place.
 */
export async function resolvePromotionBusinesses(
  promotions: Promotion[],
  getBusinessById: (id: string) => Promise<Business | null>,
): Promise<ResolvedPromotion[]> {
  const resolved = await Promise.all(
    promotions.map(async (promotion): Promise<ResolvedPromotion | null> => {
      const business = await getBusinessById(promotion.businessId);
      return business ? { promotion, business } : null;
    }),
  );

  return resolved.filter((item): item is ResolvedPromotion => item !== null);
}

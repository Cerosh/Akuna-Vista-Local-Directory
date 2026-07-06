import type { Promotion } from "@/types/promotion";
import promotionsData from "@/data/promotions.json";
import { isPast } from "@/lib/utils/dateStatus";

export interface PromotionRepository {
  getAll(): Promise<Promotion[]>;
  getActivePromotions(): Promise<Promotion[]>;
  getFeaturedPromotions(): Promise<Promotion[]>;
  getPromotionsByBusinessId(businessId: string): Promise<Promotion[]>;
}

/**
 * JSON-backed implementation. See businessRepository.ts for why the data
 * set is injectable via the constructor.
 */
export class JSONPromotionRepository implements PromotionRepository {
  private readonly promotions: Promotion[];

  constructor(promotions: Promotion[] = promotionsData as Promotion[]) {
    this.promotions = promotions;
  }

  async getAll(): Promise<Promotion[]> {
    return this.promotions;
  }

  async getActivePromotions(): Promise<Promotion[]> {
    return this.promotions.filter((promotion) => !isPast(promotion.endDate));
  }

  async getFeaturedPromotions(): Promise<Promotion[]> {
    return this.promotions.filter((promotion) => promotion.featured);
  }

  async getPromotionsByBusinessId(businessId: string): Promise<Promotion[]> {
    return this.promotions.filter((promotion) => promotion.businessId === businessId);
  }
}

export const promotionRepository: PromotionRepository = new JSONPromotionRepository();

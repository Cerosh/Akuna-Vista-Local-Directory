import type { Business } from "@/types/business";
import businessesData from "@/data/businesses.json";

export interface BusinessRepository {
  getAll(): Promise<Business[]>;
  getBySlug(slug: string): Promise<Business | null>;
  getFeatured(): Promise<Business[]>;
}

/**
 * JSON-backed implementation. The constructor accepts an optional data set
 * so tests can inject fixtures instead of reading the real data file —
 * see ADR-003 (Repository Pattern) and CODING_STANDARDS.md's Testing
 * Philosophy (prefer dependency injection over tightly coupled logic).
 */
export class JSONBusinessRepository implements BusinessRepository {
  private readonly businesses: Business[];

  constructor(businesses: Business[] = businessesData as Business[]) {
    this.businesses = businesses;
  }

  async getAll(): Promise<Business[]> {
    return this.businesses;
  }

  async getBySlug(slug: string): Promise<Business | null> {
    return this.businesses.find((business) => business.slug === slug) ?? null;
  }

  async getFeatured(): Promise<Business[]> {
    return this.businesses.filter((business) => business.featured);
  }
}

export const businessRepository: BusinessRepository = new JSONBusinessRepository();

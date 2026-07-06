import type { Business } from "@/types/business";
import businessesData from "@/data/businesses.json";

/**
 * Deterministic orderings only. "Recommendation count" is intentionally
 * not an option — that field doesn't exist in JSON_SCHEMA.md's Business
 * schema, and relevance ranking is Sprint 5 (Search) territory.
 */
export type BusinessSortOption = "featured" | "name";

export const DEFAULT_BUSINESS_PAGE_SIZE = 6;

export interface GetBusinessesOptions {
  categoryId?: string;
  sort?: BusinessSortOption;
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BusinessRepository {
  getAll(): Promise<Business[]>;
  getBySlug(slug: string): Promise<Business | null>;
  getById(id: string): Promise<Business | null>;
  getFeatured(): Promise<Business[]>;
  /**
   * The single filter/sort/pagination implementation shared by the
   * `/businesses` directory and `/category/[slug]` pages — see
   * sprints/sprint-03-directory/notes.md "Shared filtering logic".
   */
  getPage(options?: GetBusinessesOptions): Promise<PagedResult<Business>>;
}

function sortBusinesses(businesses: Business[], sort: BusinessSortOption): Business[] {
  const sorted = [...businesses];
  if (sort === "name") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  // "featured": featured businesses first, alphabetical within each group.
  return sorted.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
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

  async getById(id: string): Promise<Business | null> {
    return this.businesses.find((business) => business.id === id) ?? null;
  }

  async getFeatured(): Promise<Business[]> {
    return this.businesses.filter((business) => business.featured);
  }

  async getPage(options: GetBusinessesOptions = {}): Promise<PagedResult<Business>> {
    const {
      categoryId,
      sort = "featured",
      page = 1,
      pageSize = DEFAULT_BUSINESS_PAGE_SIZE,
    } = options;

    const filtered = categoryId
      ? this.businesses.filter((business) => business.categoryId === categoryId)
      : this.businesses;

    const sorted = sortBusinesses(filtered, sort);

    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;
    const items = sorted.slice(start, start + pageSize);

    return { items, total, page: safePage, pageSize, totalPages };
  }
}

export const businessRepository: BusinessRepository = new JSONBusinessRepository();

import type { Category } from "@/types/category";
import categoriesData from "@/data/categories.json";

export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  getBySlug(slug: string): Promise<Category | null>;
  getFeatured(): Promise<Category[]>;
}

/**
 * JSON-backed implementation. See businessRepository.ts for why the data
 * set is injectable via the constructor.
 */
export class JSONCategoryRepository implements CategoryRepository {
  private readonly categories: Category[];

  constructor(categories: Category[] = categoriesData as Category[]) {
    this.categories = categories;
  }

  async getAll(): Promise<Category[]> {
    // Categories without an explicit displayOrder sort after those that have one.
    return [...this.categories].sort(
      (a, b) =>
        (a.displayOrder ?? Number.POSITIVE_INFINITY) - (b.displayOrder ?? Number.POSITIVE_INFINITY),
    );
  }

  async getBySlug(slug: string): Promise<Category | null> {
    return this.categories.find((category) => category.slug === slug) ?? null;
  }

  async getFeatured(): Promise<Category[]> {
    const all = await this.getAll();
    return all.filter((category) => category.featured);
  }
}

export const categoryRepository: CategoryRepository = new JSONCategoryRepository();

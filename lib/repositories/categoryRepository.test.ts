import { describe, expect, it } from "vitest";
import { JSONCategoryRepository } from "./categoryRepository";
import type { Category } from "@/types/category";

function makeCategory(overrides: Partial<Category>): Category {
  return {
    id: overrides.slug ?? "example",
    slug: "example",
    name: "Example",
    ...overrides,
  };
}

describe("JSONCategoryRepository", () => {
  it("returns categories ordered by displayOrder", async () => {
    const second = makeCategory({ slug: "second", displayOrder: 2 });
    const first = makeCategory({ slug: "first", displayOrder: 1 });
    const repository = new JSONCategoryRepository([second, first]);

    const result = await repository.getAll();

    expect(result.map((category) => category.slug)).toEqual(["first", "second"]);
  });

  it("treats a missing displayOrder as lowest priority", async () => {
    const withOrder = makeCategory({ slug: "with-order", displayOrder: 1 });
    const withoutOrder = makeCategory({ slug: "without-order" });
    const repository = new JSONCategoryRepository([withOrder, withoutOrder]);

    const result = await repository.getAll();

    expect(result.map((category) => category.slug)).toEqual(["with-order", "without-order"]);
  });

  it("finds a category by slug", async () => {
    const target = makeCategory({ slug: "plumbing", name: "Plumbing" });
    const repository = new JSONCategoryRepository([makeCategory({ slug: "other" }), target]);

    await expect(repository.getBySlug("plumbing")).resolves.toEqual(target);
  });

  it("returns null for an unknown slug", async () => {
    const repository = new JSONCategoryRepository([makeCategory({ slug: "known" })]);

    await expect(repository.getBySlug("unknown")).resolves.toBeNull();
  });

  it("returns only featured categories, ordered by displayOrder", async () => {
    const featuredSecond = makeCategory({ slug: "featured-2", displayOrder: 2, featured: true });
    const notFeatured = makeCategory({ slug: "not-featured", displayOrder: 1, featured: false });
    const featuredFirst = makeCategory({ slug: "featured-1", displayOrder: 1, featured: true });
    const repository = new JSONCategoryRepository([featuredSecond, notFeatured, featuredFirst]);

    const result = await repository.getFeatured();

    expect(result.map((category) => category.slug)).toEqual(["featured-1", "featured-2"]);
  });

  it("returns an empty array when no categories are featured", async () => {
    const repository = new JSONCategoryRepository([makeCategory({ slug: "a", featured: false })]);

    await expect(repository.getFeatured()).resolves.toEqual([]);
  });
});

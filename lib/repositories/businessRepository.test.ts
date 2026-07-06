import { describe, expect, it } from "vitest";
import { JSONBusinessRepository } from "./businessRepository";
import type { Business } from "@/types/business";

function makeBusiness(overrides: Partial<Business>): Business {
  return {
    id: "00000000-0000-0000-0000-000000000000",
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

describe("JSONBusinessRepository", () => {
  it("returns all businesses", async () => {
    const businesses = [makeBusiness({ slug: "a" }), makeBusiness({ slug: "b" })];
    const repository = new JSONBusinessRepository(businesses);

    await expect(repository.getAll()).resolves.toHaveLength(2);
  });

  it("returns an empty array when no businesses exist", async () => {
    const repository = new JSONBusinessRepository([]);

    await expect(repository.getAll()).resolves.toEqual([]);
  });

  it("finds a business by slug", async () => {
    const target = makeBusiness({ slug: "abc-plumbing", name: "ABC Plumbing" });
    const repository = new JSONBusinessRepository([makeBusiness({ slug: "other" }), target]);

    await expect(repository.getBySlug("abc-plumbing")).resolves.toEqual(target);
  });

  it("returns null for an unknown slug", async () => {
    const repository = new JSONBusinessRepository([makeBusiness({ slug: "known" })]);

    await expect(repository.getBySlug("unknown")).resolves.toBeNull();
  });

  it("finds a business by id", async () => {
    const target = makeBusiness({ id: "b1", slug: "abc-plumbing" });
    const repository = new JSONBusinessRepository([makeBusiness({ id: "other" }), target]);

    await expect(repository.getById("b1")).resolves.toEqual(target);
  });

  it("returns null for an unknown id", async () => {
    const repository = new JSONBusinessRepository([makeBusiness({ id: "known" })]);

    await expect(repository.getById("unknown")).resolves.toBeNull();
  });

  it("returns only featured businesses", async () => {
    const featured = makeBusiness({ slug: "featured", featured: true });
    const notFeatured = makeBusiness({ slug: "not-featured", featured: false });
    const repository = new JSONBusinessRepository([featured, notFeatured]);

    await expect(repository.getFeatured()).resolves.toEqual([featured]);
  });

  describe("getPage", () => {
    it("filters by categoryId", async () => {
      const plumber = makeBusiness({ slug: "plumber", categoryId: "plumbing" });
      const electrician = makeBusiness({ slug: "electrician", categoryId: "electrical" });
      const repository = new JSONBusinessRepository([plumber, electrician]);

      const result = await repository.getPage({ categoryId: "plumbing" });

      expect(result.items).toEqual([plumber]);
      expect(result.total).toBe(1);
    });

    it("sorts by name ascending", async () => {
      const zed = makeBusiness({ slug: "z", name: "Zed Co" });
      const alpha = makeBusiness({ slug: "a", name: "Alpha Co" });
      const repository = new JSONBusinessRepository([zed, alpha]);

      const result = await repository.getPage({ sort: "name" });

      expect(result.items.map((b) => b.slug)).toEqual(["a", "z"]);
    });

    it("sorts featured first, then alphabetically", async () => {
      const zedFeatured = makeBusiness({ slug: "z-featured", name: "Zed Co", featured: true });
      const alphaNotFeatured = makeBusiness({ slug: "a-not", name: "Alpha Co", featured: false });
      const bravoFeatured = makeBusiness({ slug: "b-featured", name: "Bravo Co", featured: true });
      const repository = new JSONBusinessRepository([alphaNotFeatured, zedFeatured, bravoFeatured]);

      const result = await repository.getPage({ sort: "featured" });

      expect(result.items.map((b) => b.slug)).toEqual(["b-featured", "z-featured", "a-not"]);
    });

    it("returns the first page with the correct slice", async () => {
      const businesses = Array.from({ length: 8 }, (_, i) =>
        makeBusiness({ slug: `b${i}`, name: `Business ${i}` }),
      );
      const repository = new JSONBusinessRepository(businesses);

      const result = await repository.getPage({ sort: "name", page: 1, pageSize: 6 });

      expect(result.items.map((b) => b.slug)).toEqual(["b0", "b1", "b2", "b3", "b4", "b5"]);
      expect(result.total).toBe(8);
      expect(result.totalPages).toBe(2);
      expect(result.page).toBe(1);
    });

    it("returns the last page with the remainder", async () => {
      const businesses = Array.from({ length: 8 }, (_, i) =>
        makeBusiness({ slug: `b${i}`, name: `Business ${i}` }),
      );
      const repository = new JSONBusinessRepository(businesses);

      const result = await repository.getPage({ sort: "name", page: 2, pageSize: 6 });

      expect(result.items.map((b) => b.slug)).toEqual(["b6", "b7"]);
      expect(result.page).toBe(2);
      expect(result.totalPages).toBe(2);
    });

    it("clamps a page number beyond the last page down to the last page", async () => {
      const businesses = [makeBusiness({ slug: "only" })];
      const repository = new JSONBusinessRepository(businesses);

      const result = await repository.getPage({ page: 99, pageSize: 6 });

      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
      expect(result.items).toEqual(businesses);
    });

    it("returns a single page when everything fits within pageSize", async () => {
      const businesses = [makeBusiness({ slug: "a" }), makeBusiness({ slug: "b" })];
      const repository = new JSONBusinessRepository(businesses);

      const result = await repository.getPage({ pageSize: 6 });

      expect(result.totalPages).toBe(1);
      expect(result.items).toHaveLength(2);
    });

    it("returns zero results gracefully", async () => {
      const repository = new JSONBusinessRepository([makeBusiness({ categoryId: "plumbing" })]);

      const result = await repository.getPage({ categoryId: "nonexistent" });

      expect(result.items).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(1);
      expect(result.page).toBe(1);
    });
  });
});

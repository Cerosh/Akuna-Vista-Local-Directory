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

  it("returns only featured businesses", async () => {
    const featured = makeBusiness({ slug: "featured", featured: true });
    const notFeatured = makeBusiness({ slug: "not-featured", featured: false });
    const repository = new JSONBusinessRepository([featured, notFeatured]);

    await expect(repository.getFeatured()).resolves.toEqual([featured]);
  });
});

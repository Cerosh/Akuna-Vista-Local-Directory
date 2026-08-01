import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { addRecord, toggleField, updateRecord } from "./admin";

function makeCategory(overrides: Partial<Record<string, unknown>> = {}) {
  return { id: "plumbing", slug: "plumbing", name: "Plumbing", ...overrides };
}

function makeBusiness(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    id: "b3b0f6d0-6b1a-4e3e-9c2a-6a7a2f4a1a10",
    slug: "example-business",
    name: "Example Business",
    description: "An example business.",
    categoryId: "plumbing",
    featured: false,
    createdAt: "2026-07-06T00:00:00Z",
    updatedAt: "2026-07-06T00:00:00Z",
    ...overrides,
  };
}

/** Uses a throwaway temp directory — never the real data/ directory. */
describe("admin data scripts", () => {
  let dataDir: string;

  beforeEach(() => {
    dataDir = mkdtempSync(join(tmpdir(), "akuna-admin-test-"));
    writeFileSync(join(dataDir, "categories.json"), JSON.stringify([makeCategory()]));
  });

  afterEach(() => {
    rmSync(dataDir, { recursive: true, force: true });
  });

  function readCategories(): Record<string, unknown>[] {
    return JSON.parse(readFileSync(join(dataDir, "categories.json"), "utf-8"));
  }

  function readBusinesses(): Record<string, unknown>[] {
    return JSON.parse(readFileSync(join(dataDir, "businesses.json"), "utf-8"));
  }

  describe("addRecord", () => {
    it("appends a valid record", () => {
      const result = addRecord(
        dataDir,
        "categories",
        makeCategory({ id: "electrical", slug: "electrical", name: "Electrical" }),
      );

      expect(result.errors).toEqual([]);
      expect(readCategories()).toHaveLength(2);
    });

    it("rejects and writes nothing when the new record is invalid", () => {
      const result = addRecord(dataDir, "categories", { id: "electrical" });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(readCategories()).toHaveLength(1);
    });

    it("rejects a duplicate id without writing", () => {
      const result = addRecord(dataDir, "categories", makeCategory());

      expect(result.errors.length).toBeGreaterThan(0);
      expect(readCategories()).toHaveLength(1);
    });
  });

  describe("updateRecord", () => {
    it("merges a patch into the record matched by id", () => {
      const result = updateRecord(dataDir, "categories", { id: "plumbing" }, { displayOrder: 3 });

      expect(result.errors).toEqual([]);
      expect(readCategories()[0].displayOrder).toBe(3);
    });

    it("merges a patch into the record matched by slug", () => {
      const result = updateRecord(
        dataDir,
        "categories",
        { slug: "plumbing" },
        { name: "Plumbing Services" },
      );

      expect(result.errors).toEqual([]);
      expect(readCategories()[0].name).toBe("Plumbing Services");
    });

    it("errors when no record matches the identifier", () => {
      const result = updateRecord(dataDir, "categories", { id: "does-not-exist" }, { name: "X" });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(readCategories()[0].name).toBe("Plumbing");
    });

    it("rejects a patch that would make the record invalid", () => {
      const result = updateRecord(
        dataDir,
        "categories",
        { id: "plumbing" },
        { id: "Not A Valid Slug" },
      );

      expect(result.errors.length).toBeGreaterThan(0);
      expect(readCategories()[0].id).toBe("plumbing");
    });
  });

  describe("toggleField", () => {
    it("flips a boolean field", () => {
      // Categories no longer have a boolean field (Sprint 16 F-018 removed
      // `featured`) — uses businesses (`featured`) to exercise the generic
      // toggle behaviour instead.
      writeFileSync(join(dataDir, "businesses.json"), JSON.stringify([makeBusiness()]));

      const result = toggleField(
        dataDir,
        "businesses",
        { id: "b3b0f6d0-6b1a-4e3e-9c2a-6a7a2f4a1a10" },
        "featured",
      );

      expect(result.errors).toEqual([]);
      expect(readBusinesses()[0].featured).toBe(true);

      toggleField(
        dataDir,
        "businesses",
        { id: "b3b0f6d0-6b1a-4e3e-9c2a-6a7a2f4a1a10" },
        "featured",
      );
      expect(readBusinesses()[0].featured).toBe(false);
    });

    it("errors when the field isn't a boolean", () => {
      const result = toggleField(dataDir, "categories", { id: "plumbing" }, "name");

      expect(result.errors.length).toBeGreaterThan(0);
      expect(readCategories()[0].name).toBe("Plumbing");
    });

    // Code-review finding, Sprint 16 F-023: validateFeaturedBusinessCap was
    // originally wired only into validateAllData (npm run validate:data),
    // not into scripts/admin.ts's own validateArrayRecords-based write path
    // — so this exact command could silently write a 7th featured business
    // with no error, only caught later at the next `npm run validate:data`
    // or `git commit`. Regression test for the fix (validateWrite() in
    // admin.ts now also runs the per-file cross-record check).
    it("rejects toggling a 7th business featured, writing nothing", () => {
      const sixFeatured = Array.from({ length: 6 }, (_, i) =>
        makeBusiness({ id: randomUUID(), slug: `featured-${i}`, featured: true }),
      );
      const seventh = makeBusiness({ id: randomUUID(), slug: "seventh", featured: false });
      writeFileSync(join(dataDir, "businesses.json"), JSON.stringify([...sixFeatured, seventh]));

      const result = toggleField(dataDir, "businesses", { slug: "seventh" }, "featured");

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain("7 businesses");
      expect(readBusinesses().find((b) => b.slug === "seventh")?.featured).toBe(false);
    });
  });
});

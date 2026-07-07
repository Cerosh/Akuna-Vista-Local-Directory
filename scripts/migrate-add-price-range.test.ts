import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { migrateAddPriceRange } from "./migrate-add-price-range";
import { readJsonFile } from "./lib/fileIO";

describe("migrateAddPriceRange", () => {
  let dataDir: string;

  beforeEach(() => {
    dataDir = mkdtempSync(join(tmpdir(), "akuna-migrate-test-"));
    writeFileSync(
      join(dataDir, "businesses.json"),
      JSON.stringify([
        { id: "1", slug: "a", name: "A", featured: false },
        { id: "2", slug: "b", name: "B", featured: true, priceRange: "$" },
      ]),
    );
    writeFileSync(
      join(dataDir, "metadata.json"),
      JSON.stringify({
        schemaVersion: "1.2.0",
        generatedAt: "2026-07-06T00:00:00Z",
        lastUpdated: "2026-07-06T00:00:00Z",
        totalBusinesses: 2,
        totalCategories: 1,
      }),
    );
  });

  afterEach(() => {
    rmSync(dataDir, { recursive: true, force: true });
  });

  it("adds priceRange only to records that don't already have one", () => {
    const result = migrateAddPriceRange(dataDir);

    expect(result.updatedCount).toBe(1);
    expect(result.totalCount).toBe(2);

    const businesses = readJsonFile<Record<string, unknown>[]>(join(dataDir, "businesses.json"));
    expect(businesses[0].priceRange).toBe("$$");
    expect(businesses[1].priceRange).toBe("$"); // untouched — already had a value
  });

  it("leaves every other field on each business unchanged", () => {
    migrateAddPriceRange(dataDir);

    const businesses = readJsonFile<Record<string, unknown>[]>(join(dataDir, "businesses.json"));
    expect(businesses[0]).toMatchObject({ id: "1", slug: "a", name: "A", featured: false });
    expect(businesses[1]).toMatchObject({ id: "2", slug: "b", name: "B", featured: true });
  });

  it("bumps metadata.json's schemaVersion to 1.3.0 and updates lastUpdated", () => {
    const before = readJsonFile<Record<string, unknown>>(join(dataDir, "metadata.json"));
    const result = migrateAddPriceRange(dataDir);

    const metadata = readJsonFile<Record<string, unknown>>(join(dataDir, "metadata.json"));
    expect(result.schemaVersion).toBe("1.3.0");
    expect(metadata.schemaVersion).toBe("1.3.0");
    expect(metadata.lastUpdated).not.toBe(before.lastUpdated);
    expect(metadata.generatedAt).toBe(before.generatedAt);
    expect(metadata.totalBusinesses).toBe(before.totalBusinesses);
  });
});

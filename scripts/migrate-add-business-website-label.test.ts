import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { migrateAddBusinessWebsiteLabel } from "./migrate-add-business-website-label";
import { readJsonFile } from "./lib/fileIO";

describe("migrateAddBusinessWebsiteLabel", () => {
  let dataDir: string;

  beforeEach(() => {
    dataDir = mkdtempSync(join(tmpdir(), "akuna-migrate-test-"));
    writeFileSync(
      join(dataDir, "businesses.json"),
      JSON.stringify([
        { id: "1", slug: "a", name: "A", featured: false },
        {
          id: "2",
          slug: "b",
          name: "B",
          featured: true,
          website: "https://forms.gle/example",
          websiteLabel: "Enrol now",
        },
      ]),
    );
    writeFileSync(
      join(dataDir, "metadata.json"),
      JSON.stringify({
        schemaVersion: "1.4.0",
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

  it("leaves every business's fields unchanged, including any existing websiteLabel", () => {
    migrateAddBusinessWebsiteLabel(dataDir);

    const businesses = readJsonFile<Record<string, unknown>[]>(join(dataDir, "businesses.json"));
    expect(businesses[0]).toMatchObject({ id: "1", slug: "a" });
    expect(businesses[0].websiteLabel).toBeUndefined();
    expect(businesses[1].websiteLabel).toBe("Enrol now");
  });

  it("does not fabricate a websiteLabel for businesses that don't have one", () => {
    const result = migrateAddBusinessWebsiteLabel(dataDir);
    expect(result.updatedCount).toBe(0);
    expect(result.totalCount).toBe(2);
  });

  it("bumps metadata.json's schemaVersion to 1.5.0 and updates lastUpdated", () => {
    const before = readJsonFile<Record<string, unknown>>(join(dataDir, "metadata.json"));
    const result = migrateAddBusinessWebsiteLabel(dataDir);

    const metadata = readJsonFile<Record<string, unknown>>(join(dataDir, "metadata.json"));
    expect(result.schemaVersion).toBe("1.5.0");
    expect(metadata.schemaVersion).toBe("1.5.0");
    expect(metadata.lastUpdated).not.toBe(before.lastUpdated);
    expect(metadata.generatedAt).toBe(before.generatedAt);
    expect(metadata.totalBusinesses).toBe(before.totalBusinesses);
  });
});

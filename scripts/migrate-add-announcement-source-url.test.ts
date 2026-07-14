import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { migrateAddAnnouncementSourceUrl } from "./migrate-add-announcement-source-url";
import { readJsonFile } from "./lib/fileIO";

describe("migrateAddAnnouncementSourceUrl", () => {
  let dataDir: string;

  beforeEach(() => {
    dataDir = mkdtempSync(join(tmpdir(), "akuna-migrate-test-"));
    writeFileSync(
      join(dataDir, "announcements.json"),
      JSON.stringify([
        {
          id: "1",
          title: "A",
          message: "msg",
          publishedAt: "2026-07-06T00:00:00Z",
          priority: "normal",
          featured: false,
        },
        {
          id: "2",
          title: "B",
          message: "msg",
          publishedAt: "2026-07-06T00:00:00Z",
          priority: "high",
          featured: true,
          sourceUrl: "https://example.com/notice",
        },
      ]),
    );
    writeFileSync(
      join(dataDir, "metadata.json"),
      JSON.stringify({
        schemaVersion: "1.3.0",
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

  it("leaves every announcement's fields unchanged, including any existing sourceUrl", () => {
    migrateAddAnnouncementSourceUrl(dataDir);

    const announcements = readJsonFile<Record<string, unknown>[]>(
      join(dataDir, "announcements.json"),
    );
    expect(announcements[0]).toMatchObject({ id: "1", title: "A" });
    expect(announcements[0].sourceUrl).toBeUndefined();
    expect(announcements[1].sourceUrl).toBe("https://example.com/notice");
  });

  it("does not fabricate a sourceUrl for announcements that don't have one", () => {
    const result = migrateAddAnnouncementSourceUrl(dataDir);
    expect(result.updatedCount).toBe(0);
    expect(result.totalCount).toBe(2);
  });

  it("bumps metadata.json's schemaVersion to 1.4.0 and updates lastUpdated", () => {
    const before = readJsonFile<Record<string, unknown>>(join(dataDir, "metadata.json"));
    const result = migrateAddAnnouncementSourceUrl(dataDir);

    const metadata = readJsonFile<Record<string, unknown>>(join(dataDir, "metadata.json"));
    expect(result.schemaVersion).toBe("1.4.0");
    expect(metadata.schemaVersion).toBe("1.4.0");
    expect(metadata.lastUpdated).not.toBe(before.lastUpdated);
    expect(metadata.generatedAt).toBe(before.generatedAt);
    expect(metadata.totalBusinesses).toBe(before.totalBusinesses);
  });
});

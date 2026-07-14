#!/usr/bin/env tsx
import { join } from "node:path";
import { readJsonFile, writeJsonFile } from "./lib/fileIO";
import { isMainModule } from "./lib/isMainModule";

/**
 * One mechanical, single-purpose data migration, per
 * .ai/JSON_SCHEMA.md's "Versioning" section: activates the
 * `Announcement.sourceUrl?: string` field (Sprint 09b F-004) and bumps
 * metadata.json's schemaVersion 1.3.0 -> 1.4.0.
 *
 * Unlike scripts/migrate-add-price-range.ts, there's no default value to
 * backfill — `sourceUrl` is genuinely optional per-announcement, and
 * fabricating one isn't an option (this project's real-content
 * convention, see sprint-08b/09b notes.md). Existing announcements are
 * rewritten unchanged; the schemaVersion bump is what this migration
 * actually does.
 */

const NEW_SCHEMA_VERSION = "1.4.0";

export interface MigrationResult {
  updatedCount: number;
  totalCount: number;
  schemaVersion: string;
}

export function migrateAddAnnouncementSourceUrl(dataDir: string): MigrationResult {
  const announcements = readJsonFile<Record<string, unknown>[]>(
    join(dataDir, "announcements.json"),
  );
  writeJsonFile(join(dataDir, "announcements.json"), announcements);

  const metadata = readJsonFile<Record<string, unknown>>(join(dataDir, "metadata.json"));
  const migratedMetadata = {
    ...metadata,
    schemaVersion: NEW_SCHEMA_VERSION,
    lastUpdated: new Date().toISOString(),
  };
  writeJsonFile(join(dataDir, "metadata.json"), migratedMetadata);

  return { updatedCount: 0, totalCount: announcements.length, schemaVersion: NEW_SCHEMA_VERSION };
}

function main() {
  const dataDir = join(process.cwd(), "data");
  const result = migrateAddAnnouncementSourceUrl(dataDir);
  console.log(
    `announcements.json schema now supports sourceUrl (${result.totalCount} announcements unchanged, none had a real source URL supplied yet).`,
  );
  console.log(`metadata.json schemaVersion -> ${result.schemaVersion}.`);
  console.log('Run "npm run validate:data" to confirm.');
}

if (isMainModule(import.meta.url)) {
  main();
}

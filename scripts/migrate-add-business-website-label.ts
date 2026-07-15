#!/usr/bin/env tsx
import { join } from "node:path";
import { readJsonFile, writeJsonFile } from "./lib/fileIO";
import { isMainModule } from "./lib/isMainModule";

/**
 * One mechanical, single-purpose data migration, per
 * .ai/JSON_SCHEMA.md's "Versioning" section: activates the
 * `Business.websiteLabel?: string` field (Sprint 11 follow-up) and bumps
 * metadata.json's schemaVersion 1.4.0 -> 1.5.0.
 *
 * Like scripts/migrate-add-announcement-source-url.ts, there's no default
 * value to backfill — `websiteLabel` only makes sense for a business whose
 * `website` isn't really its own domain (a form, booking page, etc), and
 * fabricating one for existing businesses isn't an option. Existing
 * businesses are rewritten unchanged; the schemaVersion bump is what this
 * migration actually does.
 */

const NEW_SCHEMA_VERSION = "1.5.0";

export interface MigrationResult {
  updatedCount: number;
  totalCount: number;
  schemaVersion: string;
}

export function migrateAddBusinessWebsiteLabel(dataDir: string): MigrationResult {
  const businesses = readJsonFile<Record<string, unknown>[]>(join(dataDir, "businesses.json"));
  writeJsonFile(join(dataDir, "businesses.json"), businesses);

  const metadata = readJsonFile<Record<string, unknown>>(join(dataDir, "metadata.json"));
  const migratedMetadata = {
    ...metadata,
    schemaVersion: NEW_SCHEMA_VERSION,
    lastUpdated: new Date().toISOString(),
  };
  writeJsonFile(join(dataDir, "metadata.json"), migratedMetadata);

  return { updatedCount: 0, totalCount: businesses.length, schemaVersion: NEW_SCHEMA_VERSION };
}

function main() {
  const dataDir = join(process.cwd(), "data");
  const result = migrateAddBusinessWebsiteLabel(dataDir);
  console.log(
    `businesses.json schema now supports websiteLabel (${result.totalCount} businesses unchanged).`,
  );
  console.log(`metadata.json schemaVersion -> ${result.schemaVersion}.`);
  console.log('Run "npm run validate:data" to confirm.');
}

if (isMainModule(import.meta.url)) {
  main();
}

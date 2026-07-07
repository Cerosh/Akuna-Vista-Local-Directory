#!/usr/bin/env tsx
import { join } from "node:path";
import { readJsonFile, writeJsonFile } from "./lib/fileIO";
import { isMainModule } from "./lib/isMainModule";

/**
 * One mechanical, single-purpose data migration helper, per
 * .ai/JSON_SCHEMA.md's "Versioning" section: adds `Business.priceRange`
 * (default "$$") to every business that doesn't already have one, and
 * bumps metadata.json's schemaVersion 1.2.0 -> 1.3.0.
 *
 * Deliberately NOT a general-purpose migration framework — see
 * sprints/sprint-08-admin/notes.md, which distinguishes this kind of
 * small JSON-to-JSON schemaVersion bump from Sprint 10's much larger,
 * conceptual JSON-to-Supabase migration plan (design/interfaces only,
 * not implemented code). If another schema change is needed later, write
 * another small script like this one rather than generalising this one.
 */

const NEW_SCHEMA_VERSION = "1.3.0";
const DEFAULT_PRICE_RANGE = "$$";

export interface MigrationResult {
  updatedCount: number;
  totalCount: number;
  schemaVersion: string;
}

export function migrateAddPriceRange(dataDir: string): MigrationResult {
  const businesses = readJsonFile<Record<string, unknown>[]>(join(dataDir, "businesses.json"));
  let updatedCount = 0;
  const migrated = businesses.map((business) => {
    if (business.priceRange !== undefined) return business;
    updatedCount++;
    return { ...business, priceRange: DEFAULT_PRICE_RANGE };
  });
  writeJsonFile(join(dataDir, "businesses.json"), migrated);

  const metadata = readJsonFile<Record<string, unknown>>(join(dataDir, "metadata.json"));
  const migratedMetadata = {
    ...metadata,
    schemaVersion: NEW_SCHEMA_VERSION,
    lastUpdated: new Date().toISOString(),
  };
  writeJsonFile(join(dataDir, "metadata.json"), migratedMetadata);

  return { updatedCount, totalCount: businesses.length, schemaVersion: NEW_SCHEMA_VERSION };
}

function main() {
  const dataDir = join(process.cwd(), "data");
  const result = migrateAddPriceRange(dataDir);
  console.log(
    `Added priceRange to ${result.updatedCount}/${result.totalCount} businesses in businesses.json.`,
  );
  console.log(`metadata.json schemaVersion -> ${result.schemaVersion}.`);
  console.log('Run "npm run validate:data" to confirm.');
}

if (isMainModule(import.meta.url)) {
  main();
}

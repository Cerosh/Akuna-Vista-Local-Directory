#!/usr/bin/env tsx
import { join, resolve } from "node:path";
import { formatValidationError, validateAllData } from "./lib/validation";

/**
 * Usage: npm run validate:data [-- <dataDir>]
 * Validates every file in <dataDir> (default: ./data) against
 * .ai/JSON_SCHEMA.md's schemas, required fields, slug/identifier rules,
 * dates, duplicate checks, and cross-file referential integrity
 * (Business.categoryId, Promotion.businessId). Exits non-zero (and prints
 * every specific error) if anything is invalid.
 */
function main() {
  const dataDir = process.argv[2]
    ? resolve(process.cwd(), process.argv[2])
    : join(process.cwd(), "data");
  const errors = validateAllData(dataDir);

  if (errors.length === 0) {
    console.log(`All data files in ${dataDir} are valid.`);
    return;
  }

  console.error(`Found ${errors.length} validation error(s):\n`);
  for (const error of errors) {
    console.error(`  ${formatValidationError(error)}`);
  }
  process.exitCode = 1;
}

main();

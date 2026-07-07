#!/usr/bin/env tsx
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Papa from "papaparse";
import { FIELD_KINDS_BY_FILE, unflattenRow } from "./lib/csv";
import { writeJsonFile } from "./lib/fileIO";
import { isMainModule } from "./lib/isMainModule";
import {
  ARRAY_FILES,
  formatValidationError,
  validateArrayRecords,
  type ArrayFileKey,
} from "./lib/validation";

export interface ImportResult {
  records: Record<string, unknown>[];
  errors: string[];
}

/**
 * Parses CSV content into JSON records and validates every row before
 * the caller writes anything — an invalid row is rejected with a specific
 * error, never partially written (README.md Story 2).
 */
export function importFromCsv(fileKey: ArrayFileKey, csvContent: string): ImportResult {
  const parsed = Papa.parse<Record<string, string>>(csvContent, {
    header: true,
    skipEmptyLines: true,
  });
  const fieldKinds = FIELD_KINDS_BY_FILE[fileKey];
  const records = parsed.data.map((row) => unflattenRow(row, fieldKinds));
  const errors = validateArrayRecords(fileKey, records).map(formatValidationError);

  return { records, errors };
}

/**
 * Usage: npm run import:csv -- <businesses|categories|suburbs|events|promotions|announcements> <path/to/file.csv>
 */
function main() {
  const fileKey = process.argv[2] as ArrayFileKey | undefined;
  const csvPath = process.argv[3];

  if (!fileKey || !(fileKey in ARRAY_FILES) || !csvPath) {
    console.error(
      `Usage: npm run import:csv -- <${Object.keys(ARRAY_FILES).join("|")}> <path/to/file.csv>`,
    );
    process.exitCode = 1;
    return;
  }

  const csvContent = readFileSync(csvPath, "utf-8");
  const { records, errors } = importFromCsv(fileKey, csvContent);

  if (errors.length > 0) {
    console.error(`Import rejected — ${errors.length} error(s), nothing was written:\n`);
    for (const error of errors) console.error(`  ${error}`);
    process.exitCode = 1;
    return;
  }

  writeJsonFile(join(process.cwd(), "data", `${fileKey}.json`), records);
  console.log(`Imported ${records.length} record(s) from ${csvPath} -> data/${fileKey}.json`);
  console.log(
    'Tip: run "npm run backup:data" before a bulk import, and "npm run validate:data" after.',
  );
}

if (isMainModule(import.meta.url)) {
  main();
}

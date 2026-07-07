#!/usr/bin/env tsx
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import Papa from "papaparse";
import { collectColumns, flattenRecord } from "./lib/csv";
import { readJsonFile } from "./lib/fileIO";
import { isMainModule } from "./lib/isMainModule";
import { ARRAY_FILES, type ArrayFileKey } from "./lib/validation";

/**
 * Usage: npm run export:csv -- <businesses|categories|suburbs|events|promotions|announcements> [outputPath]
 * Converts data/<file>.json to a CSV, flattening nested fields per
 * scripts/lib/csv.ts's documented convention (dot-notation columns,
 * semicolon-separated arrays).
 */
export function exportToCsv(dataDir: string, fileKey: ArrayFileKey): string {
  const records = readJsonFile<Record<string, unknown>[]>(join(dataDir, `${fileKey}.json`));
  const flatRecords = records.map((record) => flattenRecord(record));
  const columns = collectColumns(flatRecords);
  return Papa.unparse({
    fields: columns,
    data: flatRecords.map((record) => columns.map((column) => record[column] ?? "")),
  });
}

function main() {
  const fileKey = process.argv[2] as ArrayFileKey | undefined;
  if (!fileKey || !(fileKey in ARRAY_FILES)) {
    console.error(
      `Usage: npm run export:csv -- <${Object.keys(ARRAY_FILES).join("|")}> [outputPath]`,
    );
    process.exitCode = 1;
    return;
  }

  const outputPath = process.argv[3] ?? join(process.cwd(), `${fileKey}.csv`);
  const csv = exportToCsv(join(process.cwd(), "data"), fileKey);
  writeFileSync(outputPath, csv, "utf-8");
  console.log(`Exported data/${fileKey}.json -> ${outputPath}`);
}

if (isMainModule(import.meta.url)) {
  main();
}

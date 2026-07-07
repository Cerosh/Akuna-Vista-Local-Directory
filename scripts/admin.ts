#!/usr/bin/env tsx
import { parseArgs } from "node:util";
import { join } from "node:path";
import { readJsonFile, writeJsonFile } from "./lib/fileIO";
import { isMainModule } from "./lib/isMainModule";
import {
  ARRAY_FILES,
  formatValidationError,
  validateArrayRecords,
  type ArrayFileKey,
} from "./lib/validation";

export interface AdminResult {
  errors: string[];
}

interface Identifier {
  id?: string;
  slug?: string;
}

function loadRecords(dataDir: string, fileKey: ArrayFileKey): Record<string, unknown>[] {
  return readJsonFile<Record<string, unknown>[]>(join(dataDir, `${fileKey}.json`));
}

function saveRecords(
  dataDir: string,
  fileKey: ArrayFileKey,
  records: Record<string, unknown>[],
): void {
  writeJsonFile(join(dataDir, `${fileKey}.json`), records);
}

function findIndex(records: Record<string, unknown>[], identifier: Identifier): number {
  if (identifier.id) return records.findIndex((record) => record.id === identifier.id);
  if (identifier.slug) return records.findIndex((record) => record.slug === identifier.slug);
  return -1;
}

function describeIdentifier(identifier: Identifier): string {
  return identifier.id ? `id "${identifier.id}"` : `slug "${identifier.slug}"`;
}

/** Appends a new record, validated against the rest of the file before writing. */
export function addRecord(
  dataDir: string,
  fileKey: ArrayFileKey,
  data: Record<string, unknown>,
): AdminResult {
  const records = loadRecords(dataDir, fileKey);
  const updated = [...records, data];
  const errors = validateArrayRecords(fileKey, updated).map(formatValidationError);
  if (errors.length > 0) return { errors };

  saveRecords(dataDir, fileKey, updated);
  return { errors: [] };
}

/** Merges `patch` into the record matched by id/slug, validated before writing. */
export function updateRecord(
  dataDir: string,
  fileKey: ArrayFileKey,
  identifier: Identifier,
  patch: Record<string, unknown>,
): AdminResult {
  const records = loadRecords(dataDir, fileKey);
  const index = findIndex(records, identifier);
  if (index === -1) {
    return { errors: [`No record in ${fileKey}.json matches ${describeIdentifier(identifier)}`] };
  }

  const updated = [...records];
  updated[index] = { ...updated[index], ...patch };
  const errors = validateArrayRecords(fileKey, updated).map(formatValidationError);
  if (errors.length > 0) return { errors };

  saveRecords(dataDir, fileKey, updated);
  return { errors: [] };
}

/** Flips a boolean flag (featured/verified) on the record matched by id/slug. */
export function toggleField(
  dataDir: string,
  fileKey: ArrayFileKey,
  identifier: Identifier,
  field: string,
): AdminResult {
  const records = loadRecords(dataDir, fileKey);
  const index = findIndex(records, identifier);
  if (index === -1) {
    return { errors: [`No record in ${fileKey}.json matches ${describeIdentifier(identifier)}`] };
  }

  const current = records[index][field];
  if (typeof current !== "boolean") {
    return { errors: [`Field "${field}" is not a boolean on this record (or doesn't exist)`] };
  }

  const updated = [...records];
  updated[index] = { ...updated[index], [field]: !current };
  const errors = validateArrayRecords(fileKey, updated).map(formatValidationError);
  if (errors.length > 0) return { errors };

  saveRecords(dataDir, fileKey, updated);
  return { errors: [] };
}

function printUsage(): void {
  console.error(`Usage:
  npm run admin:data -- add --file <${Object.keys(ARRAY_FILES).join("|")}> --data '<json>'
  npm run admin:data -- update --file <name> --id|--slug <value> --data '<json patch>'
  npm run admin:data -- toggle --file <name> --id|--slug <value> --field <featured|verified>`);
}

function main() {
  const subcommand = process.argv[2];
  if (subcommand !== "add" && subcommand !== "update" && subcommand !== "toggle") {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const { values } = parseArgs({
    args: process.argv.slice(3),
    options: {
      file: { type: "string" },
      id: { type: "string" },
      slug: { type: "string" },
      data: { type: "string" },
      field: { type: "string" },
    },
  });

  const fileKey = values.file as ArrayFileKey | undefined;
  if (!fileKey || !(fileKey in ARRAY_FILES)) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const dataDir = join(process.cwd(), "data");
  const identifier: Identifier = { id: values.id, slug: values.slug };
  let result: AdminResult;

  if (subcommand === "add") {
    if (!values.data) {
      printUsage();
      process.exitCode = 1;
      return;
    }
    result = addRecord(dataDir, fileKey, JSON.parse(values.data));
  } else if (subcommand === "update") {
    if (!values.data || (!values.id && !values.slug)) {
      printUsage();
      process.exitCode = 1;
      return;
    }
    result = updateRecord(dataDir, fileKey, identifier, JSON.parse(values.data));
  } else {
    if (!values.field || (!values.id && !values.slug)) {
      printUsage();
      process.exitCode = 1;
      return;
    }
    result = toggleField(dataDir, fileKey, identifier, values.field);
  }

  if (result.errors.length > 0) {
    console.error(`${subcommand} rejected — nothing was written:\n`);
    for (const error of result.errors) console.error(`  ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`${subcommand} on ${fileKey}.json succeeded.`);
  if (subcommand !== "toggle") {
    console.log('Beyond a single-field change? Run "npm run backup:data" before your next one.');
  }
}

if (isMainModule(import.meta.url)) {
  main();
}

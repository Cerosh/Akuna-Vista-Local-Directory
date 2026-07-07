import { readFileSync, writeFileSync } from "node:fs";

/**
 * Shared file I/O for every script under scripts/ — one place that knows
 * how `data/*.json` is read/written, so every script (validation, backup,
 * import, admin, seed generator, migration) is consistent.
 */

/**
 * Reads and parses a JSON file, strictly decoding as UTF-8 (per
 * JSON_SCHEMA.md's "Definition of a Valid JSON File" — UTF-8 encoding).
 * Throws a descriptive error rather than a raw JSON.parse/TextDecoder
 * stack trace on malformed input.
 */
export function readJsonFile<T = unknown>(filePath: string): T {
  const buffer = readFileSync(filePath);
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    throw new Error(`${filePath} is not valid UTF-8`);
  }
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${filePath} is not valid JSON: ${message}`);
  }
}

/**
 * Writes a value as pretty-printed JSON (two-space indent, per
 * JSON_SCHEMA.md's Common Rules), terminated with a trailing newline.
 * Prettier (lint-staged) re-formats on commit regardless — this just
 * keeps a script's own output readable before that happens.
 */
export function writeJsonFile(filePath: string, data: unknown): void {
  writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

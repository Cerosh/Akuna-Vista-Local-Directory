#!/usr/bin/env tsx
import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { backupDirPath, listBackups } from "./lib/backupPaths";
import { isMainModule } from "./lib/isMainModule";

/**
 * Usage: npm run restore:data [-- <timestamp>]
 * Restores data/ from a backup created by scripts/backup.ts. Defaults to
 * the most recent backup if no timestamp is given.
 */
export function restoreData(
  root: string,
  timestamp?: string,
  targetDir = join(root, "data"),
): string {
  const resolvedTimestamp = timestamp ?? listBackups(root)[0];
  if (!resolvedTimestamp) {
    throw new Error(
      `No backups found under ${join(root, ".backups")} — run "npm run backup:data" first.`,
    );
  }

  const source = backupDirPath(root, resolvedTimestamp);
  if (!existsSync(source)) {
    throw new Error(`Backup "${resolvedTimestamp}" does not exist at ${source}.`);
  }

  const files = readdirSync(source).filter((name) => name.endsWith(".json"));
  for (const file of files) {
    copyFileSync(join(source, file), join(targetDir, file));
  }

  return source;
}

function main() {
  const root = process.cwd();
  const timestamp = process.argv[2];
  try {
    const source = restoreData(root, timestamp);
    console.log(`Restored data/ from ${source}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

if (isMainModule(import.meta.url)) {
  main();
}

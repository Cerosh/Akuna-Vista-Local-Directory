#!/usr/bin/env tsx
import { copyFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { backupDirPath, ensureDir, timestampNow } from "./lib/backupPaths";
import { isMainModule } from "./lib/isMainModule";

/**
 * Usage: npm run backup:data
 * Snapshots data/ to a timestamped, git-ignored directory under .backups/.
 * Recommended before any bulk operation (import, seed generation,
 * migration, or an admin script touching more than a single field) —
 * see sprints/sprint-08-admin/README.md Story 4.
 */
export function backupData(root: string, sourceDir = join(root, "data")): string {
  const timestamp = timestampNow();
  const destination = backupDirPath(root, timestamp);
  ensureDir(destination);

  const files = readdirSync(sourceDir).filter((name) => name.endsWith(".json"));
  for (const file of files) {
    copyFileSync(join(sourceDir, file), join(destination, file));
  }

  return destination;
}

function main() {
  const root = process.cwd();
  const destination = backupData(root);
  console.log(`Backed up data/ to ${destination}`);
  console.log(`Restore with: npm run restore:data -- ${basename(destination)}`);
}

if (isMainModule(import.meta.url)) {
  main();
}

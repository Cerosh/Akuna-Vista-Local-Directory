import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join } from "node:path";

/** Git-ignored, timestamped snapshots of data/ live here — see .gitignore. */
export const BACKUPS_DIR = ".backups";

/**
 * ISO timestamp + a short random suffix — the suffix guarantees uniqueness
 * even if two backups are triggered within the same millisecond (e.g. back
 * to back in a script or test), which a bare timestamp alone can't.
 */
export function timestampNow(): string {
  const iso = new Date().toISOString().replace(/[:.]/g, "-");
  return `${iso}-${randomBytes(3).toString("hex")}`;
}

export function backupDirPath(root: string, timestamp: string): string {
  return join(root, BACKUPS_DIR, timestamp);
}

/** Lists available backup timestamps, most recent first. */
export function listBackups(root: string): string[] {
  const backupsRoot = join(root, BACKUPS_DIR);
  if (!existsSync(backupsRoot)) return [];
  return readdirSync(backupsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse();
}

export function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true });
}

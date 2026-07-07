import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { backupData } from "./backup";
import { restoreData } from "./restore";
import { ensureDir } from "./lib/backupPaths";

/**
 * Uses a throwaway temp directory standing in for the project root — never
 * touches the real data/ directory, per this sprint's own review.md
 * "Security" checklist item (scripts operate on local files only) and
 * general test hygiene.
 */
describe("backup and restore", () => {
  let root: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), "akuna-backup-test-"));
    ensureDir(join(root, "data"));
    writeFileSync(
      join(root, "data", "businesses.json"),
      JSON.stringify([{ id: "1", name: "Original" }]),
    );
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it("backs up data/ to a timestamped .backups/ directory", () => {
    const destination = backupData(root);
    const backedUp = readFileSync(join(destination, "businesses.json"), "utf-8");
    expect(JSON.parse(backedUp)).toEqual([{ id: "1", name: "Original" }]);
  });

  it("restores data/ to its prior state after a destructive change", () => {
    backupData(root);

    // Simulate a destructive operation (corruption).
    writeFileSync(
      join(root, "data", "businesses.json"),
      JSON.stringify([{ id: "1", name: "CORRUPTED" }]),
    );

    restoreData(root);

    const restored = readFileSync(join(root, "data", "businesses.json"), "utf-8");
    expect(JSON.parse(restored)).toEqual([{ id: "1", name: "Original" }]);
  });

  it("restores from a specific timestamp when more than one backup exists", () => {
    const first = backupData(root);
    writeFileSync(
      join(root, "data", "businesses.json"),
      JSON.stringify([{ id: "1", name: "Second version" }]),
    );
    backupData(root);

    restoreData(root, basename(first));

    const restored = readFileSync(join(root, "data", "businesses.json"), "utf-8");
    expect(JSON.parse(restored)).toEqual([{ id: "1", name: "Original" }]);
  });

  it("throws a clear error when no backups exist", () => {
    expect(() => restoreData(root)).toThrow(/No backups found/);
  });
});

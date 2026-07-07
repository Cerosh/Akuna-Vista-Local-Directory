import { pathToFileURL } from "node:url";

/**
 * True when this module was executed directly (`tsx scripts/x.ts`) rather
 * than imported (e.g. by a test). Comparing `import.meta.url` against a
 * raw `file://${process.argv[1]}` string breaks whenever the path contains
 * spaces or other characters `file://` URLs must percent-encode — this
 * project's own path ("Akuna Vista Local Directory") is exactly such a
 * case, found while smoke-testing scripts/backup.ts. `pathToFileURL`
 * encodes correctly before comparing.
 */
export function isMainModule(moduleUrl: string): boolean {
  return process.argv[1] !== undefined && moduleUrl === pathToFileURL(process.argv[1]).href;
}

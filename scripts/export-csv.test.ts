import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { exportToCsv } from "./export-csv";
import { importFromCsv } from "./import-csv";
import { readJsonFile } from "./lib/fileIO";

/**
 * Removes keys whose value is `undefined`, an empty object, or an empty
 * array, recursively. Round-tripping through CSV can't distinguish
 * "field present but empty" (e.g. `socialLinks: {}`) from "field absent"
 * — every consumer in this codebase treats those identically (see
 * scripts/lib/csv.ts's doc comment), so comparing after normalising both
 * sides is the honest definition of "no data loss," not a fudge.
 */
function normalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    const items = value.map(normalize).filter((item) => item !== undefined);
    return items.length > 0 ? items : undefined;
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, v]) => [key, normalize(v)] as const)
      .filter(([, v]) => v !== undefined);
    return entries.length > 0 ? Object.fromEntries(entries) : undefined;
  }
  return value;
}

describe("export-csv / import-csv round trip", () => {
  it("round-trips the real data/businesses.json with no data loss", () => {
    const dataDir = join(process.cwd(), "data");
    const original = readJsonFile<Record<string, unknown>[]>(join(dataDir, "businesses.json"));

    const csv = exportToCsv(dataDir, "businesses");
    const { records, errors } = importFromCsv("businesses", csv);

    expect(errors).toEqual([]);
    expect(records.map(normalize)).toEqual(original.map(normalize));
  });

  it("rejects an invalid row instead of writing partial data", () => {
    const csv =
      "id,slug,name,description,categoryId,featured,createdAt,updatedAt\n" +
      "not-a-uuid,a,A,desc,plumbing,true,2026-07-06T00:00:00Z,2026-07-06T00:00:00Z\n";

    const { errors } = importFromCsv("businesses", csv);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0]).toContain("id");
  });
});

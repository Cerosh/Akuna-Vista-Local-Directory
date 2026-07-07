import type { ArrayFileKey } from "./validation";

/**
 * Shared JSON<->CSV convention for every export/import script this sprint.
 * Documented in .ai/JSON_SCHEMA.md's Tooling section:
 * - Nested objects flatten to dot-notation columns (e.g. "address.street").
 * - Arrays flatten to one semicolon-separated cell (e.g. "tags" -> "a;b").
 * - An absent optional field round-trips as an empty cell <-> the key
 *   being omitted from the JSON object. A field whose *value* is an empty
 *   object/array (e.g. `socialLinks: {}`) also round-trips as omitted —
 *   every consumer in this codebase treats "empty object" and "absent"
 *   identically (all BusinessSocialLinks fields are optional strings), so
 *   this loses no meaningful information.
 */

export type FieldKind = "string" | "number" | "boolean" | "array";
export type FieldKindMap = Record<string, FieldKind>;

const DAY_KINDS: FieldKindMap = {
  monday: "string",
  tuesday: "string",
  wednesday: "string",
  thursday: "string",
  friday: "string",
  saturday: "string",
  sunday: "string",
};

export const FIELD_KINDS_BY_FILE: Record<ArrayFileKey, FieldKindMap> = {
  businesses: {
    id: "string",
    slug: "string",
    name: "string",
    description: "string",
    shortDescription: "string",
    categoryId: "string",
    phone: "string",
    email: "string",
    website: "string",
    "address.street": "string",
    "address.suburb": "string",
    "address.state": "string",
    "address.postcode": "string",
    serviceAreas: "array",
    "coordinates.latitude": "number",
    "coordinates.longitude": "number",
    ...Object.fromEntries(Object.keys(DAY_KINDS).map((day) => [`openingHours.${day}`, "string"])),
    "socialLinks.facebook": "string",
    "socialLinks.instagram": "string",
    "socialLinks.linkedin": "string",
    images: "array",
    featured: "boolean",
    verified: "boolean",
    tags: "array",
    createdAt: "string",
    updatedAt: "string",
  },
  categories: {
    id: "string",
    slug: "string",
    name: "string",
    icon: "string",
    description: "string",
    displayOrder: "number",
    featured: "boolean",
  },
  suburbs: {
    id: "string",
    name: "string",
    postcode: "string",
    state: "string",
    featured: "boolean",
  },
  events: {
    id: "string",
    title: "string",
    slug: "string",
    description: "string",
    startDate: "string",
    endDate: "string",
    location: "string",
    image: "string",
    featured: "boolean",
  },
  promotions: {
    id: "string",
    businessId: "string",
    title: "string",
    description: "string",
    startDate: "string",
    endDate: "string",
    featured: "boolean",
  },
  announcements: {
    id: "string",
    title: "string",
    message: "string",
    publishedAt: "string",
    expiresAt: "string",
    priority: "string",
    featured: "boolean",
  },
};

const ARRAY_ITEM_DELIMITER = ";";

/** Flattens one JSON record into a flat, CSV-row-friendly object. */
export function flattenRecord(
  record: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  const flat: Record<string, string> = {};
  for (const [key, value] of Object.entries(record)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length > 0) flat[path] = value.join(ARRAY_ITEM_DELIMITER);
    } else if (typeof value === "object") {
      Object.assign(flat, flattenRecord(value as Record<string, unknown>, path));
    } else {
      flat[path] = String(value);
    }
  }
  return flat;
}

/** Reverses `flattenRecord`, coercing each cell back to its schema type. */
export function unflattenRow(
  row: Record<string, string>,
  fieldKinds: FieldKindMap,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [path, rawValue] of Object.entries(row)) {
    if (rawValue === undefined || rawValue === "") continue;

    const kind = fieldKinds[path] ?? "string";
    let value: unknown;
    switch (kind) {
      case "array":
        value = rawValue
          .split(ARRAY_ITEM_DELIMITER)
          .map((item) => item.trim())
          .filter((item) => item.length > 0);
        break;
      case "number":
        value = Number(rawValue);
        break;
      case "boolean":
        value = rawValue === "true";
        break;
      default:
        value = rawValue;
    }
    setNestedValue(result, path.split("."), value);
  }
  return result;
}

function setNestedValue(
  target: Record<string, unknown>,
  pathParts: string[],
  value: unknown,
): void {
  let current = target;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    const existing = current[part];
    if (typeof existing !== "object" || existing === null) {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }
  current[pathParts[pathParts.length - 1]] = value;
}

/** Every column name that appears across a set of flattened records, in a stable order. */
export function collectColumns(flatRecords: Record<string, string>[]): string[] {
  const columns = new Set<string>();
  for (const record of flatRecords) {
    for (const key of Object.keys(record)) columns.add(key);
  }
  return Array.from(columns);
}

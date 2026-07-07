import { join } from "node:path";
import { z } from "zod";
import { readJsonFile } from "./fileIO";

/**
 * Single validation library for every `data/*.json` file, per
 * `.ai/JSON_SCHEMA.md`. Reused by the standalone CLI (`scripts/validate-data.ts`),
 * Husky pre-commit, CI, and every script that writes to `data/` (import,
 * admin, seed generator, migration helper) — see sprints/sprint-08-admin/notes.md
 * "Single validation library, many entry points."
 *
 * If this file and JSON_SCHEMA.md's prose ever disagree, JSON_SCHEMA.md is
 * the source of truth (per its own "Purpose" section) — fix this file, not
 * the other way around.
 */

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "must be lowercase, hyphenated, letters/numbers only");

// Category and Suburb use kebab-case string ids ("plumbing", "schofields"),
// not UUIDs — a deliberate, documented exception to the Identifier Rules'
// general "use UUIDs" guidance, confirmed against the real schema examples
// in JSON_SCHEMA.md and the actual data/categories.json / data/suburbs.json.
const kebabIdSchema = slugSchema;

const isoDateTimeSchema = z.iso.datetime({
  message: "must be ISO 8601 UTC, e.g. 2026-07-06T14:30:00Z",
});
// Promotions use a date-only format (JSON_SCHEMA.md's Promotion Schema), not
// a full timestamp — distinct from every other date field in this project.
const isoDateOnlySchema = z.iso.date({ message: "must be an ISO 8601 date, e.g. 2026-07-06" });

const businessAddressSchema = z.strictObject({
  street: z.string().min(1),
  suburb: z.string().min(1),
  state: z.string().min(1),
  postcode: z.string().min(1),
});

const businessCoordinatesSchema = z.strictObject({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

const dayHoursSchema = z.string().min(1);

const businessOpeningHoursSchema = z.strictObject({
  monday: dayHoursSchema,
  tuesday: dayHoursSchema,
  wednesday: dayHoursSchema,
  thursday: dayHoursSchema,
  friday: dayHoursSchema,
  saturday: dayHoursSchema,
  sunday: dayHoursSchema,
});

const businessSocialLinksSchema = z.strictObject({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
});

export const businessSchema = z.strictObject({
  id: z.uuid(),
  slug: slugSchema,
  name: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().optional(),
  categoryId: kebabIdSchema,
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  address: businessAddressSchema.optional(),
  serviceAreas: z.array(z.string()).optional(),
  coordinates: businessCoordinatesSchema.optional(),
  openingHours: businessOpeningHoursSchema.optional(),
  socialLinks: businessSocialLinksSchema.optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean(),
  verified: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  // Added in schema 1.3.0 — Sprint 8's data migration helper demonstration.
  priceRange: z.enum(["$", "$$", "$$$"]).optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const categorySchema = z.strictObject({
  id: kebabIdSchema,
  slug: slugSchema,
  name: z.string().min(1),
  icon: z.string().optional(),
  description: z.string().optional(),
  displayOrder: z.number().optional(),
  featured: z.boolean().optional(),
});

export const suburbSchema = z.strictObject({
  id: kebabIdSchema,
  name: z.string().min(1),
  postcode: z.string().min(1),
  state: z.string().min(1),
  featured: z.boolean().optional(),
});

export const eventSchema = z.strictObject({
  id: z.uuid(),
  title: z.string().min(1),
  slug: slugSchema,
  description: z.string().min(1),
  startDate: isoDateTimeSchema,
  endDate: isoDateTimeSchema,
  location: z.string().min(1),
  image: z.string().optional(),
  featured: z.boolean(),
});

export const promotionSchema = z.strictObject({
  id: z.uuid(),
  businessId: z.uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  startDate: isoDateOnlySchema,
  endDate: isoDateOnlySchema,
  featured: z.boolean(),
});

export const announcementSchema = z.strictObject({
  id: z.uuid(),
  title: z.string().min(1),
  message: z.string().min(1),
  publishedAt: isoDateTimeSchema,
  expiresAt: isoDateTimeSchema.optional(),
  priority: z.enum(["normal", "high"]),
  featured: z.boolean(),
});

export const settingsSchema = z.strictObject({
  communityName: z.string().min(1),
  siteName: z.string().min(1),
  tagline: z.string().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  logo: z.string().optional(),
  heroImage: z.string().optional(),
  contactEmail: z.string().optional(),
  enableSearch: z.boolean().optional(),
  enableFeaturedBusinesses: z.boolean().optional(),
  enableEvents: z.boolean().optional(),
});

export const metadataSchema = z.strictObject({
  schemaVersion: z.string().min(1),
  generatedAt: isoDateTimeSchema,
  lastUpdated: isoDateTimeSchema,
  totalBusinesses: z.number().int().min(0),
  totalCategories: z.number().int().min(0),
  communityMembers: z.number().int().min(0).optional(),
});

export interface ValidationError {
  file: string;
  recordIndex?: number;
  identifier?: string;
  field?: string;
  message: string;
}

/** File keys whose JSON is a top-level array of records. */
export const ARRAY_FILES = {
  businesses: { schema: businessSchema, identifierFields: ["id", "slug"] as const },
  categories: { schema: categorySchema, identifierFields: ["id", "slug"] as const },
  suburbs: { schema: suburbSchema, identifierFields: ["id"] as const },
  events: { schema: eventSchema, identifierFields: ["id", "slug"] as const },
  promotions: { schema: promotionSchema, identifierFields: ["id"] as const },
  announcements: { schema: announcementSchema, identifierFields: ["id"] as const },
} as const;

export type ArrayFileKey = keyof typeof ARRAY_FILES;

/** File keys whose JSON is a single object, not an array. */
export const OBJECT_FILES = {
  settings: settingsSchema,
  metadata: metadataSchema,
} as const;

export type ObjectFileKey = keyof typeof OBJECT_FILES;

function recordIdentifier(record: Record<string, unknown>): string | undefined {
  if (typeof record.id === "string") return record.id;
  if (typeof record.slug === "string") return record.slug;
  return undefined;
}

/**
 * Validates one array-based file's records against its schema, plus
 * within-file duplicate-identifier checks. Does not perform cross-file
 * referential checks — see `validateReferentialIntegrity`.
 */
export function validateArrayRecords(fileKey: ArrayFileKey, records: unknown[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const { schema, identifierFields } = ARRAY_FILES[fileKey];
  const seen: Record<string, Set<string>> = Object.fromEntries(
    identifierFields.map((field) => [field, new Set<string>()]),
  );

  records.forEach((record, index) => {
    const result = schema.safeParse(record);
    const identifier =
      record && typeof record === "object"
        ? recordIdentifier(record as Record<string, unknown>)
        : undefined;

    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          file: fileKey,
          recordIndex: index,
          identifier,
          field: issue.path.join(".") || undefined,
          message: issue.message,
        });
      }
      return;
    }

    for (const field of identifierFields) {
      const value = (record as Record<string, unknown>)[field];
      if (typeof value !== "string") continue;
      if (seen[field].has(value)) {
        errors.push({
          file: fileKey,
          recordIndex: index,
          identifier,
          field,
          message: `duplicate ${field} "${value}" — ${field}s must be unique within ${fileKey}.json`,
        });
      } else {
        seen[field].add(value);
      }
    }
  });

  return errors;
}

/** Validates a single-object file (settings, metadata) against its schema. */
export function validateObjectRecord(fileKey: ObjectFileKey, data: unknown): ValidationError[] {
  const result = OBJECT_FILES[fileKey].safeParse(data);
  if (result.success) return [];
  return result.error.issues.map((issue) => ({
    file: fileKey,
    field: issue.path.join(".") || undefined,
    message: issue.message,
  }));
}

/**
 * Cross-file referential integrity: Business.categoryId must reference a
 * real Category.id; Promotion.businessId must reference a real Business.id.
 * Confirmed via categoryRepository.getBySlug(business.categoryId) in
 * app/business/[slug]/page.tsx that categoryId really is a categories.json
 * `id` (which is itself a kebab-case slug, not a UUID, for Category).
 */
export function validateReferentialIntegrity(data: {
  businesses?: unknown[];
  categories?: unknown[];
  promotions?: unknown[];
}): ValidationError[] {
  const errors: ValidationError[] = [];
  const categoryIds = new Set(
    (data.categories ?? [])
      .map((c) => (c && typeof c === "object" ? (c as Record<string, unknown>).id : undefined))
      .filter((id): id is string => typeof id === "string"),
  );
  const businessIds = new Set(
    (data.businesses ?? [])
      .map((b) => (b && typeof b === "object" ? (b as Record<string, unknown>).id : undefined))
      .filter((id): id is string => typeof id === "string"),
  );

  (data.businesses ?? []).forEach((record, index) => {
    if (!record || typeof record !== "object") return;
    const categoryId = (record as Record<string, unknown>).categoryId;
    if (typeof categoryId === "string" && !categoryIds.has(categoryId)) {
      errors.push({
        file: "businesses",
        recordIndex: index,
        identifier: recordIdentifier(record as Record<string, unknown>),
        field: "categoryId",
        message: `categoryId "${categoryId}" does not match any category id in categories.json`,
      });
    }
  });

  (data.promotions ?? []).forEach((record, index) => {
    if (!record || typeof record !== "object") return;
    const businessId = (record as Record<string, unknown>).businessId;
    if (typeof businessId === "string" && !businessIds.has(businessId)) {
      errors.push({
        file: "promotions",
        recordIndex: index,
        identifier: recordIdentifier(record as Record<string, unknown>),
        field: "businessId",
        message: `businessId "${businessId}" does not match any business id in businesses.json`,
      });
    }
  });

  return errors;
}

/**
 * Reads and validates every file in `data/` — schema, within-file
 * duplicates, and cross-file referential integrity. The single entry
 * point used by the CLI, Husky pre-commit and CI.
 */
export function validateAllData(dataDir: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const arrayData: Partial<Record<ArrayFileKey, unknown[]>> = {};

  for (const fileKey of Object.keys(ARRAY_FILES) as ArrayFileKey[]) {
    try {
      const records = readJsonFile<unknown[]>(join(dataDir, `${fileKey}.json`));
      if (!Array.isArray(records)) {
        errors.push({ file: fileKey, message: `${fileKey}.json must contain a top-level array` });
        continue;
      }
      arrayData[fileKey] = records;
      errors.push(...validateArrayRecords(fileKey, records));
    } catch (error) {
      errors.push({
        file: fileKey,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  for (const fileKey of Object.keys(OBJECT_FILES) as ObjectFileKey[]) {
    try {
      const data = readJsonFile(join(dataDir, `${fileKey}.json`));
      errors.push(...validateObjectRecord(fileKey, data));
    } catch (error) {
      errors.push({
        file: fileKey,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  errors.push(
    ...validateReferentialIntegrity({
      businesses: arrayData.businesses,
      categories: arrayData.categories,
      promotions: arrayData.promotions,
    }),
  );

  return errors;
}

export function formatValidationError(error: ValidationError): string {
  const location = [
    error.file + ".json",
    error.identifier && `record "${error.identifier}"`,
    error.field && `field "${error.field}"`,
  ]
    .filter(Boolean)
    .join(" — ");
  return `${location}: ${error.message}`;
}

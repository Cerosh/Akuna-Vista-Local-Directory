import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  businessSchema,
  eventSchema,
  promotionSchema,
  validateArrayRecords,
  validateAllData,
  validateReferentialIntegrity,
} from "./validation";

function makeBusiness(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    slug: "example-business",
    name: "Example Business",
    description: "A business used for testing.",
    categoryId: "plumbing",
    featured: false,
    createdAt: "2026-07-06T00:00:00Z",
    updatedAt: "2026-07-06T00:00:00Z",
    ...overrides,
  };
}

describe("validateAllData against the real data/ directory", () => {
  it("finds zero errors in the project's real, committed data", () => {
    const dataDir = join(process.cwd(), "data");
    expect(validateAllData(dataDir)).toEqual([]);
  });
});

describe("businessSchema", () => {
  it("accepts a fully-populated valid business", () => {
    const business = makeBusiness({
      shortDescription: "Trusted local plumber.",
      phone: "+61 400 111 222",
      email: "hello@example.com",
      address: { street: "1 Vista Street", suburb: "Schofields", state: "NSW", postcode: "2762" },
      coordinates: { latitude: -33.7, longitude: 150.87 },
      openingHours: {
        monday: "08:00-17:00",
        tuesday: "08:00-17:00",
        wednesday: "08:00-17:00",
        thursday: "08:00-17:00",
        friday: "08:00-17:00",
        saturday: "09:00-13:00",
        sunday: "Closed",
      },
      tags: ["Emergency"],
    });
    expect(businessSchema.safeParse(business).success).toBe(true);
  });

  it("rejects a business missing a required field", () => {
    const { featured: _featured, ...business } = makeBusiness();
    expect(businessSchema.safeParse(business).success).toBe(false);
  });

  it("rejects a non-UUID id", () => {
    const business = makeBusiness({ id: "not-a-uuid" });
    expect(businessSchema.safeParse(business).success).toBe(false);
  });

  it("rejects a slug with invalid characters", () => {
    const business = makeBusiness({ slug: "Not_A_Valid_Slug" });
    expect(businessSchema.safeParse(business).success).toBe(false);
  });

  it("rejects a non-ISO-8601 date", () => {
    const business = makeBusiness({ createdAt: "06/07/2026" });
    expect(businessSchema.safeParse(business).success).toBe(false);
  });

  it("rejects an unknown/unused field", () => {
    const business = makeBusiness({ unexpectedField: "not in the schema" });
    expect(businessSchema.safeParse(business).success).toBe(false);
  });
});

describe("eventSchema", () => {
  it("accepts a valid event", () => {
    const event = {
      id: "2ad23d3c-e928-45d2-8583-b919c44cded5",
      title: "Community BBQ",
      slug: "community-bbq",
      description: "Monthly community gathering.",
      startDate: "2026-09-10T10:00:00Z",
      endDate: "2026-09-10T14:00:00Z",
      location: "Akuna Vista Park",
      featured: true,
    };
    expect(eventSchema.safeParse(event).success).toBe(true);
  });
});

describe("promotionSchema", () => {
  it("accepts date-only startDate/endDate", () => {
    const promotion = {
      id: "2ad23d3c-e928-45d2-8583-b919c44cded5",
      businessId: "00000000-0000-0000-0000-000000000000",
      title: "10% Off",
      description: "Available this month.",
      startDate: "2026-07-01",
      endDate: "2026-07-31",
      featured: true,
    };
    expect(promotionSchema.safeParse(promotion).success).toBe(true);
  });

  it("rejects a full ISO 8601 timestamp instead of a date-only string", () => {
    const promotion = {
      id: "2ad23d3c-e928-45d2-8583-b919c44cded5",
      businessId: "00000000-0000-0000-0000-000000000000",
      title: "10% Off",
      description: "Available this month.",
      startDate: "2026-07-01T00:00:00Z",
      endDate: "2026-07-31",
      featured: true,
    };
    expect(promotionSchema.safeParse(promotion).success).toBe(false);
  });
});

describe("validateArrayRecords — duplicate detection", () => {
  it("flags a duplicate id within the same file", () => {
    const businesses = [makeBusiness({ slug: "a" }), makeBusiness({ slug: "b" })];
    const errors = validateArrayRecords("businesses", businesses);
    expect(errors.some((e) => e.field === "id" && e.message.includes("duplicate"))).toBe(true);
  });

  it("flags a duplicate slug within the same file", () => {
    const businesses = [
      makeBusiness({ id: "8976609d-c0bc-4933-9135-382ef353f861" }),
      makeBusiness({ id: "9cc40d77-f1c6-4b1d-96b4-70d94cd7fbb4" }),
    ];
    const errors = validateArrayRecords("businesses", businesses);
    expect(errors.some((e) => e.field === "slug" && e.message.includes("duplicate"))).toBe(true);
  });

  it("passes when ids and slugs are unique", () => {
    const businesses = [
      makeBusiness({ id: "8976609d-c0bc-4933-9135-382ef353f861", slug: "a" }),
      makeBusiness({ id: "9cc40d77-f1c6-4b1d-96b4-70d94cd7fbb4", slug: "b" }),
    ];
    expect(validateArrayRecords("businesses", businesses)).toEqual([]);
  });
});

describe("validateReferentialIntegrity", () => {
  it("flags a business categoryId with no matching category", () => {
    const errors = validateReferentialIntegrity({
      businesses: [makeBusiness({ categoryId: "does-not-exist" })],
      categories: [{ id: "plumbing", slug: "plumbing", name: "Plumbing" }],
      promotions: [],
    });
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe("categoryId");
  });

  it("flags a promotion businessId with no matching business", () => {
    const errors = validateReferentialIntegrity({
      businesses: [makeBusiness()],
      categories: [{ id: "plumbing", slug: "plumbing", name: "Plumbing" }],
      promotions: [
        {
          id: "2ad23d3c-e928-45d2-8583-b919c44cded5",
          businessId: "99999999-9999-9999-9999-999999999999",
          title: "10% Off",
          description: "Available this month.",
          startDate: "2026-07-01",
          endDate: "2026-07-31",
          featured: true,
        },
      ],
    });
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe("businessId");
  });

  it("passes when every cross-reference resolves", () => {
    const business = makeBusiness();
    const errors = validateReferentialIntegrity({
      businesses: [business],
      categories: [{ id: "plumbing", slug: "plumbing", name: "Plumbing" }],
      promotions: [
        {
          id: "2ad23d3c-e928-45d2-8583-b919c44cded5",
          businessId: business.id,
          title: "10% Off",
          description: "Available this month.",
          startDate: "2026-07-01",
          endDate: "2026-07-31",
          featured: true,
        },
      ],
    });
    expect(errors).toEqual([]);
  });
});

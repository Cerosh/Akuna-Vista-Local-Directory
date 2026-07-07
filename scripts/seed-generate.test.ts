import { describe, expect, it } from "vitest";
import {
  generateAnnouncements,
  generateBusinesses,
  generateCategories,
  generateEvents,
  generatePromotions,
  generateSuburbs,
} from "./seed-generate";
import {
  validateArrayRecords,
  validateReferentialIntegrity,
  type ArrayFileKey,
} from "./lib/validation";

function validate(fileKey: ArrayFileKey, records: unknown[]) {
  return validateArrayRecords(fileKey, records);
}

describe("seed generator", () => {
  const categories = generateCategories(25);
  const suburbs = generateSuburbs(10);
  const businesses = generateBusinesses(30, categories, suburbs);
  const events = generateEvents(10);
  const promotions = generatePromotions(10, businesses);
  const announcements = generateAnnouncements(10);

  it("produces the requested counts", () => {
    expect(categories).toHaveLength(25);
    expect(suburbs).toHaveLength(10);
    expect(businesses).toHaveLength(30);
    expect(events).toHaveLength(10);
    expect(promotions).toHaveLength(10);
    expect(announcements).toHaveLength(10);
  });

  it("passes validation with zero errors for every generated file", () => {
    expect(validate("categories", categories)).toEqual([]);
    expect(validate("suburbs", suburbs)).toEqual([]);
    expect(validate("businesses", businesses)).toEqual([]);
    expect(validate("events", events)).toEqual([]);
    expect(validate("promotions", promotions)).toEqual([]);
    expect(validate("announcements", announcements)).toEqual([]);
  });

  it("has no dangling referential integrity across files", () => {
    const errors = validateReferentialIntegrity({ businesses, categories, promotions });
    expect(errors).toEqual([]);
  });

  it("does not produce obviously synthetic names like 'Business 1'", () => {
    for (const business of businesses) {
      expect(business.name).not.toMatch(/^Business \d+$/);
      expect(business.name).not.toMatch(/lorem ipsum/i);
    }
  });

  it("generates unique business names and slugs", () => {
    const names = new Set(businesses.map((b) => b.name));
    const slugs = new Set(businesses.map((b) => b.slug));
    expect(names.size).toBe(businesses.length);
    expect(slugs.size).toBe(businesses.length);
  });

  it("caps category/suburb counts at the number of curated seeds available", () => {
    expect(generateCategories(1000).length).toBeLessThanOrEqual(25);
    expect(generateSuburbs(1000).length).toBeLessThanOrEqual(10);
  });

  it("returns no businesses/promotions when there are no categories/businesses to reference", () => {
    expect(generateBusinesses(5, [], suburbs)).toEqual([]);
    expect(generatePromotions(5, [])).toEqual([]);
  });
});

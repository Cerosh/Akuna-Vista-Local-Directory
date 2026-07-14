import { describe, expect, it } from "vitest";
import {
  categoriesWithBusinesses,
  getSearchSuggestions,
  searchBusinesses,
  suburbsWithBusinesses,
} from "./searchService";
import type { Business } from "@/types/business";
import type { Category } from "@/types/category";
import type { Suburb } from "@/types/suburb";

function makeBusiness(overrides: Partial<Business>): Business {
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

function makeCategory(overrides: Partial<Category>): Category {
  return { id: "plumbing", slug: "plumbing", name: "Plumbing", ...overrides };
}

function makeSuburb(overrides: Partial<Suburb>): Suburb {
  return { id: "schofields", name: "Schofields", postcode: "2762", state: "NSW", ...overrides };
}

describe("searchBusinesses", () => {
  const plumber = makeBusiness({
    slug: "abc-plumbing",
    name: "ABC Plumbing",
    description: "Local plumber",
    categoryId: "plumbing",
    address: { street: "1 X St", suburb: "Schofields", state: "NSW", postcode: "2762" },
    serviceAreas: ["Schofields", "Tallawong"],
    tags: ["Emergency"],
  });
  const cafe = makeBusiness({
    slug: "local-grind",
    name: "The Local Grind Café",
    description: "Specialty coffee and brunch",
    categoryId: "cafes",
    address: { street: "2 Y St", suburb: "The Ponds", state: "NSW", postcode: "2769" },
    serviceAreas: ["The Ponds"],
    tags: ["Coffee"],
  });
  const categories = [
    makeCategory({ id: "plumbing", name: "Plumbing" }),
    makeCategory({ id: "cafes", name: "Cafés & Restaurants" }),
  ];

  it("returns everything when filters are empty", () => {
    expect(searchBusinesses([plumber, cafe], categories, {})).toEqual([plumber, cafe]);
  });

  it("matches a keyword against the business name", () => {
    expect(searchBusinesses([plumber, cafe], categories, { query: "plumbing" })).toEqual([plumber]);
  });

  it("matches a keyword case-insensitively against the description", () => {
    expect(searchBusinesses([plumber, cafe], categories, { query: "COFFEE" })).toEqual([cafe]);
  });

  it("matches a keyword against the resolved category name", () => {
    expect(searchBusinesses([plumber, cafe], categories, { query: "café" })).toEqual([cafe]);
  });

  it("matches an unaccented query against accented data, and vice versa", () => {
    // Regression: "The Local Grind Café" / "Cafés & Restaurants" use accented
    // characters, but most people type "cafe" without the accent.
    expect(searchBusinesses([plumber, cafe], categories, { query: "cafe" })).toEqual([cafe]);
    expect(searchBusinesses([plumber, cafe], categories, { query: "café" })).toEqual([cafe]);
  });

  it("matches a keyword against tags and service areas", () => {
    expect(searchBusinesses([plumber, cafe], categories, { query: "emergency" })).toEqual([
      plumber,
    ]);
    expect(searchBusinesses([plumber, cafe], categories, { query: "tallawong" })).toEqual([
      plumber,
    ]);
  });

  it("filters by categoryId", () => {
    expect(searchBusinesses([plumber, cafe], categories, { categoryId: "cafes" })).toEqual([cafe]);
  });

  it("filters by suburb, matching address or service areas", () => {
    expect(searchBusinesses([plumber, cafe], categories, { suburb: "Schofields" })).toEqual([
      plumber,
    ]);
    expect(searchBusinesses([plumber, cafe], categories, { suburb: "the ponds" })).toEqual([cafe]);
  });

  it("combines query, category and suburb filters with AND semantics", () => {
    const result = searchBusinesses([plumber, cafe], categories, {
      query: "plumbing",
      categoryId: "plumbing",
      suburb: "Schofields",
    });
    expect(result).toEqual([plumber]);

    const noMatch = searchBusinesses([plumber, cafe], categories, {
      query: "plumbing",
      categoryId: "cafes",
    });
    expect(noMatch).toEqual([]);
  });

  it("returns an empty array when nothing matches", () => {
    expect(searchBusinesses([plumber, cafe], categories, { query: "nonexistent" })).toEqual([]);
  });
});

describe("getSearchSuggestions", () => {
  const businesses = [
    makeBusiness({ name: "ABC Plumbing" }),
    makeBusiness({ name: "Akuna Electrical Co" }),
  ];
  const categories = [
    makeCategory({ name: "Plumbing" }),
    makeCategory({ name: "Electrical", id: "electrical" }),
  ];
  const suburbs = [
    makeSuburb({ name: "Schofields" }),
    makeSuburb({ name: "The Ponds", id: "the-ponds" }),
  ];

  it("returns nothing for a query shorter than 2 characters", () => {
    expect(getSearchSuggestions(businesses, categories, suburbs, "a")).toEqual([]);
  });

  it("suggests matching businesses, categories and suburbs", () => {
    const suggestions = getSearchSuggestions(businesses, categories, suburbs, "plumb");
    expect(suggestions).toEqual([
      { type: "business", label: "ABC Plumbing" },
      { type: "category", label: "Plumbing" },
    ]);
  });

  it("deduplicates identical label+type pairs", () => {
    const dup = [makeBusiness({ name: "ABC Plumbing" }), makeBusiness({ name: "ABC Plumbing" })];
    const suggestions = getSearchSuggestions(dup, [], [], "plumb");
    expect(suggestions).toEqual([{ type: "business", label: "ABC Plumbing" }]);
  });

  it("respects the limit", () => {
    const many = Array.from({ length: 10 }, (_, i) => makeBusiness({ name: `Plumber ${i}` }));
    expect(getSearchSuggestions(many, [], [], "plumb", 3)).toHaveLength(3);
  });
});

describe("categoriesWithBusinesses", () => {
  it("keeps only categories with at least one matching business", () => {
    const plumber = makeBusiness({ categoryId: "plumbing" });
    const categories = [
      makeCategory({ id: "plumbing", name: "Plumbing" }),
      makeCategory({ id: "cleaning", name: "Cleaning" }),
    ];
    expect(categoriesWithBusinesses(categories, [plumber])).toEqual([categories[0]]);
  });

  it("returns an empty array when no business matches any category", () => {
    const categories = [makeCategory({ id: "cleaning", name: "Cleaning" })];
    expect(categoriesWithBusinesses(categories, [])).toEqual([]);
  });
});

describe("suburbsWithBusinesses", () => {
  it("keeps only suburbs matched by address.suburb or serviceAreas", () => {
    const plumber = makeBusiness({
      address: { street: "1 X St", suburb: "Schofields", state: "NSW", postcode: "2762" },
      serviceAreas: ["Tallawong"],
    });
    const suburbs = [
      makeSuburb({ id: "schofields", name: "Schofields" }),
      makeSuburb({ id: "tallawong", name: "Tallawong" }),
      makeSuburb({ id: "the-ponds", name: "The Ponds" }),
    ];
    expect(suburbsWithBusinesses(suburbs, [plumber])).toEqual([suburbs[0], suburbs[1]]);
  });

  it("matches case/accent-insensitively via the same normalize rule as search", () => {
    const plumber = makeBusiness({
      address: { street: "1 X St", suburb: "SCHOFIELDS", state: "NSW", postcode: "2762" },
    });
    const suburbs = [makeSuburb({ id: "schofields", name: "Schofields" })];
    expect(suburbsWithBusinesses(suburbs, [plumber])).toEqual(suburbs);
  });
});

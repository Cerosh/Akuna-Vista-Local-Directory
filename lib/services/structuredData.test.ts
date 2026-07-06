import { describe, expect, it } from "vitest";
import { generateLocalBusinessJsonLd } from "./structuredData";
import type { Business } from "@/types/business";

const SITE_URL = "https://akunavista.example";

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

describe("generateLocalBusinessJsonLd", () => {
  it("produces complete JSON-LD for a fully-populated business", () => {
    const business = makeBusiness({
      shortDescription: "Trusted local plumber.",
      phone: "+61 400 111 222",
      email: "hello@example.com",
      images: ["/images/placeholder-business.svg"],
      address: { street: "1 Vista Street", suburb: "Schofields", state: "NSW", postcode: "2762" },
      coordinates: { latitude: -33.702, longitude: 150.875 },
      openingHours: {
        monday: "07:00-17:00",
        tuesday: "07:00-17:00",
        wednesday: "07:00-17:00",
        thursday: "07:00-17:00",
        friday: "07:00-17:00",
        saturday: "08:00-12:00",
        sunday: "Closed",
      },
    });

    const jsonLd = generateLocalBusinessJsonLd(business, SITE_URL) as Record<string, unknown>;

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("LocalBusiness");
    expect(jsonLd.name).toBe("Example Business");
    expect(jsonLd.description).toBe("Trusted local plumber.");
    expect(jsonLd.url).toBe("https://akunavista.example/business/example-business");
    expect(jsonLd.image).toBe("https://akunavista.example/images/placeholder-business.svg");
    expect(jsonLd.telephone).toBe("+61 400 111 222");
    expect(jsonLd.email).toBe("hello@example.com");
    expect(jsonLd.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "1 Vista Street",
      addressLocality: "Schofields",
      addressRegion: "NSW",
      postalCode: "2762",
      addressCountry: "AU",
    });
    expect(jsonLd.geo).toEqual({
      "@type": "GeoCoordinates",
      latitude: -33.702,
      longitude: 150.875,
    });
    const hours = jsonLd.openingHoursSpecification as { dayOfWeek: string }[];
    expect(hours).toHaveLength(6); // Sunday ("Closed") is omitted.
    expect(hours.find((h) => h.dayOfWeek === "Sunday")).toBeUndefined();
    expect(hours.find((h) => h.dayOfWeek === "Monday")).toEqual({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "07:00",
      closes: "17:00",
    });
  });

  it("omits optional fields for a minimal business without fabricating data", () => {
    const business = makeBusiness({});

    const jsonLd = generateLocalBusinessJsonLd(business, SITE_URL) as Record<string, unknown>;

    expect(jsonLd.name).toBe("Example Business");
    expect(jsonLd.description).toBe("A business used for testing.");
    expect(jsonLd.url).toBe("https://akunavista.example/business/example-business");
    expect(jsonLd).not.toHaveProperty("image");
    expect(jsonLd).not.toHaveProperty("telephone");
    expect(jsonLd).not.toHaveProperty("email");
    expect(jsonLd).not.toHaveProperty("address");
    expect(jsonLd).not.toHaveProperty("geo");
    expect(jsonLd).not.toHaveProperty("openingHoursSpecification");
  });

  it("prefers shortDescription over description when both exist", () => {
    const business = makeBusiness({
      description: "Long description.",
      shortDescription: "Short one.",
    });

    const jsonLd = generateLocalBusinessJsonLd(business, SITE_URL) as Record<string, unknown>;

    expect(jsonLd.description).toBe("Short one.");
  });
});

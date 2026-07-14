import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import businesses from "@/data/businesses.json";
import categories from "@/data/categories.json";

// Runs against the real data/*.json, same pattern as
// scripts/lib/validation.test.ts and the export-csv round-trip test — the
// sprint's own plan calls for verifying the sitemap against the current
// real dataset, not a synthetic fixture, since the whole point is
// confirming it's generated from the repository layer, never hardcoded.
describe("sitemap", () => {
  it("includes every static route, business, and category exactly once", async () => {
    const entries = await sitemap();

    const staticCount = 7; // "", /businesses, /search, /about, /contact, /privacy, /terms
    expect(entries).toHaveLength(staticCount + businesses.length + categories.length);
  });

  it("includes every real business detail page", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    for (const business of businesses) {
      expect(urls).toContain(`http://localhost:3000/business/${business.slug}`);
    }
  });

  it("includes every real category page", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    for (const category of categories) {
      expect(urls).toContain(`http://localhost:3000/category/${category.slug}`);
    }
  });

  it("includes the homepage and every static page", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("http://localhost:3000");
    expect(urls).toContain("http://localhost:3000/businesses");
    expect(urls).toContain("http://localhost:3000/search");
    expect(urls).toContain("http://localhost:3000/about");
    expect(urls).toContain("http://localhost:3000/contact");
    expect(urls).toContain("http://localhost:3000/privacy");
    expect(urls).toContain("http://localhost:3000/terms");
  });

  it("has no duplicate URLs", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
  });
});

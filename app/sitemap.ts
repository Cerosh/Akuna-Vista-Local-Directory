import type { MetadataRoute } from "next";
import { businessRepository } from "@/lib/repositories/businessRepository";
import { categoryRepository } from "@/lib/repositories/categoryRepository";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Every static route worth indexing — kept in sync by hand since there are
// only 7 of them; business/category routes below are generated from the
// repository layer, never hardcoded, per ARCHITECTURE.md.
const STATIC_PATHS = ["", "/businesses", "/search", "/about", "/contact", "/privacy", "/terms"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [businesses, categories] = await Promise.all([
    businessRepository.getAll(),
    categoryRepository.getAll(),
  ]);

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const businessEntries = businesses.map((business) => ({
    url: `${SITE_URL}/business/${business.slug}`,
    lastModified: business.updatedAt,
  }));

  const categoryEntries = categories.map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...businessEntries, ...categoryEntries];
}

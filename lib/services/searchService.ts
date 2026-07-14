import type { Business } from "@/types/business";
import type { Category } from "@/types/category";
import type { Suburb } from "@/types/suburb";

export interface SearchFilters {
  query?: string;
  categoryId?: string;
  suburb?: string;
}

export type SearchSuggestionType = "business" | "category" | "suburb";

export interface SearchSuggestion {
  type: SearchSuggestionType;
  label: string;
}

// Matches Unicode combining diacritical marks (U+0300–U+036F) left behind
// by NFD normalisation below — built from an escaped string, not a literal
// character range, so the source stays plain ASCII and unambiguous.
const DIACRITIC_PATTERN = new RegExp("[\\u0300-\\u036f]", "g");

// Strips diacritics (é → e, etc.) after lowercasing, so "cafe" matches
// "Café" — real businesses ("The Local Grind Café", "Cafés & Restaurants")
// have accented names, but most people type the unaccented form.
function normalize(value: string): string {
  return value.trim().toLowerCase().normalize("NFD").replace(DIACRITIC_PATTERN, "");
}

function businessMatchesQuery(
  business: Business,
  categoryName: string | undefined,
  query: string,
): boolean {
  const q = normalize(query);
  if (!q) {
    return true;
  }

  const haystacks: (string | undefined)[] = [
    business.name,
    business.description,
    business.shortDescription,
    categoryName,
    business.address?.suburb,
    ...(business.tags ?? []),
    ...(business.serviceAreas ?? []),
  ];

  return haystacks.some((value) => value !== undefined && normalize(value).includes(q));
}

function businessInSuburb(business: Business, suburb: string): boolean {
  const target = normalize(suburb);
  if (normalize(business.address?.suburb ?? "") === target) {
    return true;
  }
  return (business.serviceAreas ?? []).some((area) => normalize(area) === target);
}

/**
 * Categories with at least one real business — used to hide filter chips
 * (Sprint 09b F-001) that would otherwise always lead to zero results.
 * A computed filter, not a hardcoded list, so it stays correct as
 * businesses.json changes.
 */
export function categoriesWithBusinesses(
  categories: Category[],
  businesses: Business[],
): Category[] {
  const categoryIds = new Set(businesses.map((business) => business.categoryId));
  return categories.filter((category) => categoryIds.has(category.id));
}

/**
 * Suburbs with at least one real business, matching the same
 * address/serviceAreas rule `businessInSuburb` uses for actual search
 * filtering — kept as one rule rather than two similar-but-different ones.
 */
export function suburbsWithBusinesses(suburbs: Suburb[], businesses: Business[]): Suburb[] {
  return suburbs.filter((suburb) =>
    businesses.some((business) => businessInSuburb(business, suburb.name)),
  );
}

/**
 * Pure, replaceable search implementation. This is the only place that
 * knows how "search" currently works (client-side substring matching
 * over the in-memory dataset) — per ARCHITECTURE.md's Search
 * Architecture, a future Server/Hybrid/Semantic/Vector/AI search
 * implementation replaces this function without any caller needing
 * to change.
 *
 * Deliberately reuses no logic from BusinessRepository.getPage() —
 * that runs server-side against the repository; this runs client-side
 * against data already fetched once. Category/suburb matching
 * semantics are intentionally identical to Sprint 3's directory
 * filtering so results are consistent between the two entry points.
 */
export function searchBusinesses(
  businesses: Business[],
  categories: Category[],
  filters: SearchFilters,
): Business[] {
  const categoryNameById = new Map(categories.map((category) => [category.id, category.name]));

  return businesses.filter((business) => {
    if (filters.categoryId && business.categoryId !== filters.categoryId) {
      return false;
    }
    if (filters.suburb && !businessInSuburb(business, filters.suburb)) {
      return false;
    }
    if (
      filters.query &&
      !businessMatchesQuery(business, categoryNameById.get(business.categoryId), filters.query)
    ) {
      return false;
    }
    return true;
  });
}

const MIN_SUGGESTION_QUERY_LENGTH = 2;
const DEFAULT_SUGGESTION_LIMIT = 6;

/**
 * Autocomplete suggestions drawn only from existing JSON data (business
 * names, categories, suburbs) — no AI/semantic matching. That's Version 3
 * (ARCHITECTURE.md).
 */
export function getSearchSuggestions(
  businesses: Business[],
  categories: Category[],
  suburbs: Suburb[],
  query: string,
  limit: number = DEFAULT_SUGGESTION_LIMIT,
): SearchSuggestion[] {
  const q = normalize(query);
  if (q.length < MIN_SUGGESTION_QUERY_LENGTH) {
    return [];
  }

  const suggestions: SearchSuggestion[] = [];
  const seen = new Set<string>();

  function add(type: SearchSuggestionType, label: string) {
    const key = `${type}:${normalize(label)}`;
    if (!seen.has(key)) {
      seen.add(key);
      suggestions.push({ type, label });
    }
  }

  for (const business of businesses) {
    if (normalize(business.name).includes(q)) {
      add("business", business.name);
    }
  }
  for (const category of categories) {
    if (normalize(category.name).includes(q)) {
      add("category", category.name);
    }
  }
  for (const suburb of suburbs) {
    if (normalize(suburb.name).includes(q)) {
      add("suburb", suburb.name);
    }
  }

  return suggestions.slice(0, limit);
}

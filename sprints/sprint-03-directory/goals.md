# Sprint 03 — Goals

Business Directory

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Allow users to browse businesses.

---

# Objective

Turn the homepage's teaser of categories and featured businesses (Sprint 2) into a real, browsable directory — a full business grid, category-scoped pages, filtering, sorting, pagination, and correctly handled empty/loading states — so visitors can find what they need by browsing alone.

---

# Why This Sprint Exists

PROJECT.md's MVP scope explicitly separates "Business Directory," "Category Pages" and "Search" as distinct capabilities. Search (Sprint 5) is about typing a query and getting ranked results; the directory is about browsing — scanning a category, comparing options, narrowing by filter. Many residents don't know exactly what they're looking for (e.g. "someone good for the garden") and browsing by category is often a better fit than search for that.

This sprint also creates the first pages with real, addressable URLs per category (`/category/[slug]`), which matters for sharing links in the WhatsApp group ("here's the plumbers page") and for future SEO (Sprint 8) — these URLs need to exist and work correctly well before they're optimised.

---

# Goals

1. **Browse without searching** — a visitor can go from "I need a plumber" to "here are my options" using only categories, filters and cards — no typing required.
2. **Shareable, addressable URLs** — `/businesses?category=x`, `/category/[slug]` reflect filter/sort/page state in the URL so links can be shared and bookmarked.
3. **Scales past the sample dataset** — filtering, sorting and pagination logic must be correct now, at small scale, so it doesn't need to be rebuilt when Sprint 6 populates 100+ businesses and 25 categories.
4. **Never looks broken** — every empty result set and every loading state is designed deliberately, not left as a blank page or spinner.
5. **One filtering implementation** — `/businesses` category filters and `/category/[slug]` pages share the same underlying filter logic instead of two parallel implementations.

---

# Non-Goals (this sprint)

- No full-text/keyword search — Sprint 5.
- No business detail pages — Sprint 4 (cards link to detail pages that don't exist yet; that's expected and resolved next sprint).
- No full 100-business/25-category dataset — Sprint 6. This sprint should validate pagination/sorting logic works correctly regardless of dataset size, using whatever sample data exists after Sprint 2 (expanded slightly if needed to meaningfully exercise pagination).
- No visual polish beyond DESIGN_SYSTEM.md base tokens and existing card patterns — Sprint 7.

---

# Success Criteria

Sprint 3 is successful when:

- [x] A visitor can discover a business by browsing categories and filters alone, with no search input involved.
- [x] `/businesses` and `/category/[slug]` both work correctly with zero, one, and many results.
- [x] Filter, sort and pagination state survive a page refresh (i.e. live in the URL).
- [x] Playwright coverage exists for the browse → filter → sort → paginate journey.
- [x] No component reads JSON directly — everything flows through the Sprint 1 repository layer.

---

# Guiding Principle

The directory should feel like the natural next step after the homepage, not a separate product. Reuse the Business Card, Category Card and design tokens exactly as established in Sprint 2 — this sprint is about structure and interaction (filtering, sorting, pagination, states), not new visual language.

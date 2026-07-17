# Sprint 05 — Technical Tasks

Search

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Search Service / Abstraction

- [x] Define a `SearchService` interface (e.g. `search(query: string, filters?: SearchFilters): SearchResult[]`) that the UI depends on — never the raw JSON or repositories directly.
- [x] Implement the current client-side `SearchService` using `BusinessRepository`/`CategoryRepository` data, per ARCHITECTURE.md's "Search Architecture" (Current: Client-side search; must remain replaceable for Server/Hybrid/Semantic/Vector/AI search later).
- [x] Keep the implementation a pure, testable function/class — no UI or framework coupling inside the service.

---

# Keyword Search

- [x] Match query terms against `name`, `description`, `tags` and the business's category name.
- [x] Support simple partial/substring matching at minimum; case-insensitive.
- [x] Rank/order results by relevance (e.g. name match before description match) using simple, explainable scoring — no external ranking library required.

---

# Category & Suburb Search

- [x] Match against `categoryId`/category name.
- [x] Match against `address.suburb` and `serviceAreas`, using `suburbs.json` as the canonical suburb list.
- [x] Reuse Sprint 3's existing filtering logic for `/businesses` and `/category/[slug]` rather than writing a second implementation — extract shared logic into `lib/services` if it isn't already reusable.
- [x] Support combining keyword + category/suburb filters (AND semantics).

---

# Instant Filtering

- [x] Debounce search input (e.g. ~200–300ms) so results update live without excessive re-computation.
- [x] Update results without a full page reload; reflect query/filters in the URL (search params), consistent with Sprint 3's URL-driven filtering pattern.
- [x] Avoid layout shift while results update (skeleton or stable container per DESIGN_SYSTEM.md Loading States).

---

# Search Suggestions

- [x] Build a suggestions/autocomplete function sourced from existing business names, categories and suburbs in the JSON data — not an AI/semantic feature (AI search is Phase 10 / Version 3, out of scope here).
- [x] Trigger suggestions after a minimum character threshold; deduplicate and cap the suggestion list.
- [x] Make the suggestions list keyboard-navigable (arrow keys, Enter to select, Escape to dismiss).

---

# Empty Results

- [x] Render a friendly empty state per DESIGN_SYSTEM.md/UI_GUIDELINES.md Empty States guidance: explain why nothing matched, suggest a next step (e.g. browse categories, clear a filter, try a broader term).
- [x] Never render a blank page or an unstyled "no results" string.

---

# Recent Searches (optional)

- [x] If time permits: persist recent search queries in `localStorage`.
- [x] Offer recent searches as quick-select shortcuts near the search input.
- [x] Provide a way to clear recent search history.
- [x] Treat this as a stretch goal — not required for Definition of Done.

---

# Route & Integration

- [x] Build the `/search` route (already listed in ARCHITECTURE.md's Routing) as the primary search results page.
- [x] Update Sprint 2's homepage search entry point to route into real `/search` instead of its thin directory redirect/filter.
- [x] Ensure every search result links to the correct, real `/business/[slug]` page (Sprint 4).

---

# Responsive

- [x] Verify search input, suggestions dropdown, results list and empty state at mobile, tablet, desktop, large desktop.

---

# Accessibility

- [x] Search input has a visible label or `aria-label`.
- [x] Suggestions list uses appropriate ARIA (e.g. combobox/listbox pattern) and is announced correctly to screen readers.
- [x] Empty-results state uses semantic HTML and does not rely on colour/icon alone.
- [x] All interactive elements are keyboard accessible with visible focus states.

---

# Performance

- [x] Measure actual typing-to-result latency; confirm it "feels instant" rather than assuming it based on dataset size.
- [x] Keep the in-memory search index/scoring lightweight — avoid introducing a heavy dependency for the current dataset scale.
- [x] Avoid unnecessary re-renders while typing (memoise derived result lists where appropriate).

---

# Testing

- [x] Unit tests: `SearchService` matching/scoring for keyword, category, suburb and combined queries.
- [x] Unit tests: suggestion/autocomplete function returns relevant, deduplicated results.
- [x] Playwright: type-to-search updates results live; selecting a suggestion navigates correctly; empty state renders for a no-match query; a result links to the correct business page.

---

# Documentation

- [x] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).

---

# Out of Scope

Do not build in this sprint:

- AI, semantic, embedding-based or vector search — Version 3 / Phase 10.
- Server-side search infrastructure or search APIs — Future.
- A second, parallel category/sort/pagination implementation separate from Sprint 3's.
- Complex ranking/relevance algorithms beyond simple, explainable scoring.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, ARCHITECTURE.md's Search Architecture, JSON_SCHEMA.md, and the specific standards doc for the task).
2. Implement one part of the search experience only.
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits (see GIT_WORKFLOW.md).
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated sections in a single AI session or commit.

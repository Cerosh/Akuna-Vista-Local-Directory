# Sprint 05 — Backlog

Search

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 5's deliverables into ordered, independently shippable items — the replaceable search abstraction first, then keyword/category/suburb matching, then the instant-filtering UI and suggestions, then empty states and the optional recent-searches stretch, then the route itself and tests.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Define `SearchService` interface (`search(query, filters): SearchResult[]`) so the implementation is swappable per ARCHITECTURE.md's Search Architecture | Sprint 1 repository layer | High | Completed |
| B-002 | Build the current client-side implementation of `SearchService` (in-memory index/scoring over `BusinessRepository`/`CategoryRepository` data) | B-001 | High | Completed |
| B-003 | Implement keyword matching (`name`, `description`, `tags`, category name) | B-002 | High | Completed |
| B-004 | Implement category and suburb matching (`categoryId`, `address.suburb`, `serviceAreas`), reusing Sprint 3's existing filter logic rather than re-implementing it | B-002 | High | Completed |
| B-005 | Support combined keyword + category/suburb queries (AND semantics) | B-003, B-004 | Medium | Completed |
| B-006 | Build `/search` route with URL search params for query/category/suburb (consistent with Sprint 3's URL-param-driven filtering) | B-002 | High | Completed |
| B-007 | Build instant/live filtering UI: debounced input, results update without full page reload | B-006 | High | Completed |
| B-008 | Build search suggestions/autocomplete (business names, categories, suburbs), keyboard-navigable | B-002 | Medium | Completed |
| B-009 | Build empty-results state (explanation + suggested action, per UI_GUIDELINES.md Empty States) | B-006 | High | Completed |
| B-010 | Upgrade Sprint 2's homepage search entry point to route into real `/search` instead of its thin directory redirect/filter | B-006 | Medium | Completed |
| B-011 | (Optional/stretch) Recent searches via `localStorage`, offered as quick re-search shortcuts | B-007 | Low | Completed |
| B-012 | Responsive pass across search input, suggestions dropdown, results list, empty state | B-006–B-009 | High | Completed |
| B-013 | Accessibility pass (labelled input, keyboard-navigable suggestions, screen-reader-friendly empty state) | B-006–B-009 | High | Completed |
| B-014 | Unit tests for `SearchService` matching/scoring and suggestion logic | B-002–B-005, B-008 | High | Completed |
| B-015 | Playwright: type-to-search, select suggestion, empty state, result links to real business page | B-006–B-010 | High | Completed |

---

# Prioritisation Notes

- B-001/B-002 (the `SearchService` abstraction and its client-side implementation) must land first — everything else calls into this interface, and getting the boundary right now is what makes future Server/Hybrid/Semantic/Vector/AI search (Version 3) a swap instead of a rewrite.
- B-003 and B-004 can be built in parallel once B-002 exists, but B-004 must actively reuse Sprint 3's filter logic — treat any temptation to write a second category/suburb filter as a signal to stop and consolidate instead.
- B-006 (the route) should land before B-007–B-009 so there's a real place to see instant filtering, suggestions and empty states behave together.
- B-010 (wiring up Sprint 2's homepage entry point) should happen once `/search` is confirmed stable — don't leave the homepage pointing at its old thin behaviour after this sprint.
- B-011 (recent searches) is explicitly optional — only take it on if B-001–B-010 are solid and there is time remaining in the sprint.
- B-015 (Playwright) should be written once the route is structurally stable, but keep Sprint 1–4's existing tests green throughout.

---

# Out of Scope for This Backlog

Do not add stories for:

- AI, semantic, embedding-based or vector search — Version 3 / Phase 10.
- Server-side search infrastructure or search APIs — Future, per ARCHITECTURE.md.
- A second, parallel category/sort/pagination implementation separate from Sprint 3's — extend or reuse it instead.
- Search ranking/relevance algorithms beyond simple, explainable scoring.

If a task from this list seems necessary to "finish" search, that's a signal scope is creeping — flag it instead of implementing it.

# Sprint 03 — Backlog

Business Directory

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 3's deliverables into ordered, independently shippable items. Core browsing (grid, cards) comes first, then filtering/sorting/pagination, then the states that make it feel production-ready.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Expand sample data in `businesses.json` / `categories.json` if needed to meaningfully exercise pagination (still placeholder-realistic, not the full Sprint 6 dataset) | Sprint 2 sample data | Medium | Completed |
| B-002 | Extend `BusinessRepository` with `getBusinesses({ categoryId, sort, page, pageSize })`-style query support | Sprint 1 repository layer | High | Completed |
| B-003 | Build `/businesses` route rendering a responsive grid of Business Cards | B-002 | High | Completed |
| B-004 | Build category filter controls, backed by URL search params | B-003 | High | Completed |
| B-005 | Build `/category/[slug]` route, reusing the same filtering logic as B-004 | B-002, B-004 | High | Completed |
| B-006 | Handle invalid/unknown category slug with a proper 404 | B-005 | Medium | Completed |
| B-007 | Build sorting controls (Featured first, Name A–Z, Recommendation count) | B-003 | Medium | Completed |
| B-008 | Build pagination (or load-more), backed by URL search params | B-003, B-007 | High | Completed |
| B-009 | Build empty states for zero-result filter/category combinations | B-004, B-005 | High | Completed |
| B-010 | Build loading skeletons for the grid and filter transitions | B-003 | Medium | Completed |
| B-011 | Responsive pass across grid, filters, sort, pagination | B-003–B-010 | High | Completed |
| B-012 | Accessibility pass (filter/sort/pagination controls labelled and keyboard operable) | B-003–B-010 | High | Completed |
| B-013 | Playwright: browse → filter → sort → paginate journey, plus empty-state and 404 coverage | B-003–B-010 | High | Completed |

---

# Prioritisation Notes

- B-002 (repository query support) is the foundation everything else in this sprint depends on — get the filter/sort/pagination contract right once, here, rather than layering ad hoc logic into components later.
- B-003 (grid) should ship and be reviewable before filters/sort/pagination are added, so each capability can be validated independently.
- B-004 and B-005 should share implementation — build the filter logic once (B-004) and reuse it for category pages (B-005), per this sprint's "one filtering implementation" goal.
- B-009 (empty states) and B-010 (loading skeletons) are easy to leave until "later" — don't. Build them alongside B-003–B-008, not as a final pass, since they're part of this sprint's Definition of Done, not polish.
- B-013 (Playwright) should be written once B-003–B-010 are stable, but keep Sprint 1/2's existing smoke and homepage tests green throughout.

---

# Out of Scope for This Backlog

Do not add stories for:

- Full-text/keyword search — Sprint 5.
- Business detail pages — Sprint 4 (cards may link to routes that 404 until then; that's expected).
- Full 100-business / 25-category dataset population — Sprint 6.
- Visual polish/animation beyond existing card and layout patterns — Sprint 7.

If a task from this list seems necessary to "finish" the directory, that's a signal scope is creeping — flag it instead of implementing it.

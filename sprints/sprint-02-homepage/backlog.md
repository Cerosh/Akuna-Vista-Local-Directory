# Sprint 02 — Backlog

Homepage

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 2's deliverables into ordered, independently shippable items, following the fixed visual hierarchy from DESIGN_SYSTEM.md: Hero → Search → Categories → Businesses → Community Story → Footer.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Add sample data to `categories.json` and `businesses.json` (small, realistic set; mark a subset `featured: true`) | Sprint 1 repository layer | High | Not Started |
| B-002 | Add/confirm community figures in `settings.json` / `metadata.json` (member count, businesses listed, recommendations) | B-001 | Medium | Not Started |
| B-003 | Build Hero section (headline, supporting copy, primary CTA) | Sprint 1 theme/layout | High | Not Started |
| B-004 | Build Search entry point (input + CTA, routes to directory or filters featured businesses) | B-003 | High | Not Started |
| B-005 | Build Popular Categories section (`CategoryRepository`, ordered by `displayOrder`) | B-001 | High | Not Started |
| B-006 | Build Featured Businesses section (`BusinessRepository`, filtered by `featured`) | B-001 | High | Not Started |
| B-007 | Build "Why choose local" section (static copy + supporting icons/illustrations) | Sprint 1 shared components | Medium | Not Started |
| B-008 | Build Community Statistics section (`settings.json` / `metadata.json`) | B-002 | Medium | Not Started |
| B-009 | Make Navigation functional (real routes/anchors, no more placeholder links) | Sprint 1 navigation shell | High | Not Started |
| B-010 | Make Footer functional (real routes/anchors, no more placeholder links) | Sprint 1 footer shell | High | Not Started |
| B-011 | Responsive pass across all sections (mobile, tablet, desktop, large desktop) | B-003–B-010 | High | Not Started |
| B-012 | Accessibility pass (heading hierarchy, alt text, keyboard nav, focus states) | B-003–B-010 | High | Not Started |
| B-013 | Playwright homepage journey test (loads, sections render, search interactive, nav works) | B-003–B-011 | High | Not Started |
| B-014 | Empty-state handling for categories/featured businesses (in case data is sparse) | B-005, B-006 | Medium | Not Started |

---

# Prioritisation Notes

- B-001/B-002 (sample data) must land first — every content section depends on real JSON, not hardcoded strings.
- Hero → Search → Categories → Businesses (B-003–B-006) should be built and reviewed in that order, matching the intended visual hierarchy and letting each section be validated against the "5 second value" test as it's added.
- B-007/B-008 (why choose local, community stats) can happen in parallel once B-001/B-002 land.
- B-011 (responsive) and B-012 (accessibility) are cross-cutting — run them after each section, not just once at the end, to avoid a large rework pass.
- B-013 (Playwright) should be written once the page is structurally stable, but the smoke test from Sprint 1 should stay green throughout.

---

# Out of Scope for This Backlog

Do not add stories for:

- Full search implementation (ranking, fuzzy matching) — Sprint 5.
- Business directory grid/list, filters, sorting, pagination — Sprint 3.
- Business detail pages — Sprint 4.
- Full 100-business / 25-category dataset — Sprint 6.
- Visual polish beyond DESIGN_SYSTEM.md base tokens (advanced animation, micro-interactions) — Sprint 7.

If a task from this list seems necessary to "finish" the homepage, that's a signal scope is creeping — flag it instead of implementing it.

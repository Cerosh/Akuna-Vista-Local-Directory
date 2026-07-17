# Sprint 08b — Backlog

Community Pages

Owner: Cerosh Jacob

Last Updated: 2026-07-07

---

# Purpose

This backlog breaks Sprint 08b's four pages into independently shippable items. Each page is
small enough to be its own commit; Footer updates come last since they depend on the routes
existing, and testing/documentation close out the sprint.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Build `/about` | None | High | Completed |
| B-002 | Build `/contact` (mailto link, `Settings.contactEmail`) | None | High | Completed |
| B-003 | Build `/privacy` | None | High | Completed |
| B-004 | Build `/terms` | None | Medium | Completed |
| B-005 | Update `Footer.tsx` — de-prefetch-guard `/about`/`/contact`, add `/privacy`/`/terms` links | B-001, B-002, B-003, B-004 | High | Completed |
| B-006 | Extend `tests/e2e/accessibility.spec.ts` and `tests/e2e/responsive.spec.ts` with the four new routes; add/extend a Playwright spec covering Footer links + Contact `mailto:` href | B-005 | High | Completed |
| B-007 | Update Sprint 09's README.md/notes.md to record the About/Contact/Privacy/Terms risk as resolved | B-001–B-004 | Medium | Completed |

---

# Prioritisation Notes

- B-001–B-004 (the four pages) have no dependencies on each other and can be built in any order —
  each is a single, independent commit per this sprint's AI Development Plan.
- B-005 (Footer) depends on all four routes existing, since it links to all of them.
- B-006 (testing) depends on B-005 so the Footer-link test has real, correct hrefs to assert against.
- B-007 (Sprint 9 doc updates) can happen any time after the pages exist — placed last here only
  because it's the natural sprint-close step, not because anything blocks it earlier.

---

# Out of Scope for This Backlog

Do not add stories for:

- A contact form or email-sending backend (see tasks.md Out of Scope, notes.md Risks).
- A dedicated `/community` page (see notes.md Open Questions).
- Any item that belongs to Sprint 9's actual scope (monitoring, analytics, security headers, sitemap/robots.txt, browser compatibility, regression pass).

If a task from this list seems necessary to "finish" this sprint, that's a signal scope is
creeping into Sprint 9 or into a future feature (e.g. a real contact form) — flag it instead of
implementing it.

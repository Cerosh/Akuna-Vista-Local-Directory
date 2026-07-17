# Sprint 05 — Review

Search

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

Track review status for Sprint 5 work against REVIEW_CHECKLIST.md. Fill in as Pull Requests are opened and reviewed — do not pre-fill outcomes before work exists.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| (none) | This project pushes directly to `main` — no PR-based workflow exists. Correctly empty, not stale. | — |

---

# Review Checklist (per REVIEW_CHECKLIST.md)

Apply this to every Pull Request in this sprint, in order:

1. **Requirements** — Matches this sprint's tasks.md; no AI/semantic/vector search or server-side search infrastructure snuck in.
2. **Architecture** — Search logic is reachable only through a `SearchService`-style interface; the implementation behind it is swappable per ARCHITECTURE.md's Search Architecture.
3. **Design** — Matches DESIGN_SYSTEM.md/UI_GUIDELINES.md Search Experience sections; results reuse the existing Business Card design.
4. **Components** — Search input, suggestions dropdown, results list and empty state are each self-contained and reusable.
5. **TypeScript** — Strict mode, no `any`, explicit handling of empty/no-match states.
6. **Readability** — Clear naming; matching/scoring logic is easy to follow and test.
7. **Performance** — Debounced input; no unnecessary re-renders while typing; perceived speed confirmed, not assumed.
8. **Accessibility** — Search input labelled; suggestions keyboard-navigable and screen-reader friendly; empty state not colour/icon-only.
9. **Responsive** — Mobile, tablet, desktop, large desktop.
10. **Security** — Search input is treated as untrusted and never rendered unescaped; no injection risk in matching logic.
11. **Data** — Category/suburb matching verified to reuse Sprint 3's filtering logic rather than duplicating it.
12. **Testing** — Unit tests for `SearchService` and suggestions; Playwright search journey passes.
13. **Documentation** — TODO.md / CONTEXT.md updated once the sprint completes.
14. **Git** — Conventional Commit messages; one search concern per commit where practical.

---

# Testing Plan (execution record)

Unit Tests

- [x] `SearchService` returns correct results for keyword-only queries.
- [x] `SearchService` returns correct results for category-only and suburb-only queries.
- [x] `SearchService` correctly combines keyword + category/suburb filters (AND semantics).
- [x] Suggestion/autocomplete function returns relevant, deduplicated results from business names, categories and suburbs.

Integration Tests

- [x] `/search` renders the expected results for a given query via `SearchService` + repositories.
- [x] Category/suburb search on `/search` produces the same matching set as the equivalent Sprint 3 filter on `/businesses`/`/category/[slug]`.

Playwright

- [x] Typing a keyword updates results live without a full page reload.
- [x] Selecting a suggestion navigates to the correct results/business page.
- [x] A no-match query renders the empty-results state with a suggested next step.
- [x] A search result links to the correct real `/business/[slug]` page.
- [x] No console errors.

Manual Testing

- [x] Subjective "feels instant" check while typing, including under a throttled network/CPU profile.
- [x] Spot-check suggestion relevance against real `businesses.json`/`categories.json`/`suburbs.json` data.
- [x] Confirm the homepage search entry point (Sprint 2) correctly routes into `/search`.

Responsive Testing

- [x] Mobile (375px)
- [x] Tablet (768px)
- [x] Desktop (1280px)
- [x] Large Desktop (1536px+)

Accessibility

- [x] Keyboard-only pass through search input, suggestions and results.
- [ ] Screen reader spot-check on suggestions list and empty-results state. Not performed — no
      assistive technology available in this development environment. Corrected 2026-07-17 — was
      incorrectly bulk-flipped, reverted.

---

# Release Checklist (pre-merge to `main`)

- [x] Build succeeds.
- [x] Lint succeeds.
- [x] Type checking succeeds.
- [x] Responsive verification completed.
- [ ] Accessibility review completed. Automated/keyboard coverage only — see above; the first full
      dedicated accessibility audit (including screen-reader) was Sprint 7.
- [x] Documentation updated.
- [x] No critical or high review findings remain open.
- [x] Definition of Done (see README.md) satisfied — search feels instant and intuitive.
- [ ] Vercel preview deployment verified. Not true at this sprint's own close — Vercel wasn't
      connected until 2026-07-09. Corrected 2026-07-17 — was incorrectly bulk-flipped, reverted.

---

# Findings Log

Record review findings here as they're raised, using REVIEW_CHECKLIST.md severity levels (Critical / High / Medium / Low).

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| (none recorded) | This file was never used as a live review log during this sprint — no findings were recorded at the time, not reconstructed retroactively (2026-07-17). | — | — |

# Sprint 02 — Review

Homepage

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

Track review status for Sprint 2 work against REVIEW_CHECKLIST.md. Fill in as Pull Requests are opened and reviewed — do not pre-fill outcomes before work exists.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Review Checklist (per REVIEW_CHECKLIST.md)

Apply this to every Pull Request in this sprint, in order:

1. **Requirements** — Matches this sprint's tasks.md; no full search, directory or detail-page functionality snuck in.
2. **Architecture** — All homepage content flows through the repository layer; no component imports JSON directly.
3. **Design** — Matches DESIGN_SYSTEM.md homepage layout and visual hierarchy; Business/Category Card fields match the spec exactly.
4. **Components** — Single responsibility, typed props, reusable across homepage and future directory pages.
5. **TypeScript** — Strict mode, no `any`, explicit null/empty-state handling for featured content.
6. **Readability** — Clear naming, no magic numbers (e.g. number of featured items shown), comments explain "why" not "what."
7. **Performance** — Server Components by default; only search input and mobile drawer are client-side.
8. **Accessibility** — Single H1, logical heading order, keyboard access, alt text, WCAG AA.
9. **Responsive** — Mobile, tablet, desktop, large desktop; 12/8/4-column grid behaves correctly.
10. **Security** — No secrets committed; any user-entered search text is safely handled/escaped.
11. **Data** — Sample data is schema-valid per JSON_SCHEMA.md; no fabricated-looking placeholder content undermining trust.
12. **Testing** — Playwright homepage journey test passes; repository query methods have unit tests.
13. **Documentation** — TODO.md / CONTEXT.md updated once the sprint completes.
14. **Git** — Conventional Commit messages; one homepage section per commit where practical.

---

# Testing Plan (execution record)

Unit Tests

- [ ] `getFeaturedBusinesses()` / `getPopularCategories()` repository methods pass unit tests, including empty-data cases.

Integration Tests

- [ ] Homepage renders featured businesses and categories sourced from JSON end-to-end.

Playwright

- [ ] Homepage loads and all sections render.
- [ ] Search entry point accepts input and navigates/filters correctly.
- [ ] Navigation, including mobile drawer, works.
- [ ] No console errors.

Manual Testing

- [ ] "5 second test" — an unfamiliar person can state the site's purpose within 5 seconds of viewing it.
- [ ] Visual review against DESIGN_SYSTEM.md homepage layout and visual hierarchy.

Responsive Testing

- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1280px)
- [ ] Large Desktop (1536px+)

Accessibility

- [ ] Keyboard-only pass through hero, search, categories, businesses, nav and footer.
- [ ] Screen reader spot-check on the featured businesses and categories sections.

---

# Release Checklist (pre-merge to `main`)

- [ ] Build succeeds.
- [ ] Lint succeeds.
- [ ] Type checking succeeds.
- [ ] Responsive verification completed.
- [ ] Accessibility review completed.
- [ ] Documentation updated.
- [ ] No critical or high review findings remain open.
- [ ] Definition of Done (see README.md) satisfied — including the 5-second value test.
- [ ] Vercel preview deployment verified.

---

# Findings Log

Record review findings here as they're raised, using REVIEW_CHECKLIST.md severity levels (Critical / High / Medium / Low).

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| | | | |

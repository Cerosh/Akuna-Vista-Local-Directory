# Sprint 03 — Technical Tasks

Business Directory

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Data & Repository

- [ ] Extend `BusinessRepository` with query support for category filtering, sorting and pagination (single method or small composable set — e.g. `getBusinesses({ categoryId?, sort?, page?, pageSize? })`).
- [ ] Extend `CategoryRepository` with a `getCategoryBySlug(slug)` lookup for `/category/[slug]`.
- [ ] Keep all filtering/sorting/pagination logic inside `lib/services/` or the repository layer — never inline inside a page component (ARCHITECTURE.md "Services" layer).
- [ ] If needed, expand `data/businesses.json` with a few more sample records so pagination has more than one page to exercise (still placeholder-realistic, per Sprint 2 notes).

---

# Frontend — Business Grid

- [ ] Build `/businesses` page rendering a responsive grid of Business Cards (reuse the Sprint 2 Business Card component — do not rebuild it).
- [ ] Grid reflows at 12/8/4 columns (desktop/tablet/mobile) per DESIGN_SYSTEM.md Grid System.

---

# Frontend — Category Filters

- [ ] Build category filter UI (e.g. chip list or select), reflecting the current selection.
- [ ] Drive filter state from URL search params (e.g. `?category=plumbing`) — no ad hoc component state for the source of truth.
- [ ] Changing the filter resets pagination to page 1.

---

# Frontend — Category Pages

- [ ] Build `/category/[slug]` route: page heading, short category description, filtered business grid.
- [ ] Reuse the same filtering logic as the `/businesses` category filter — do not duplicate.
- [ ] Unknown/invalid slugs render Next.js `notFound()` (proper 404), not a broken empty page.

---

# Frontend — Sorting

- [ ] Build sort control with at least: Featured first, Name (A–Z), Recommendation count (per DESIGN_SYSTEM.md Business Card fields).
- [ ] Sort state lives in URL search params.
- [ ] Sorting composes correctly with active filters and resets pagination to page 1.

---

# Frontend — Pagination

- [ ] Build pagination (numbered or load-more, per DESIGN_SYSTEM.md component library "Pagination").
- [ ] Page state lives in URL search params.
- [ ] Correct behaviour at the first page, last page, and when there's only one page (hide/disable controls appropriately).

---

# Frontend — Empty & Loading States

- [ ] Empty state for zero-result filter/category/sort combinations: explanation + suggested next action (UI_GUIDELINES.md "Empty States").
- [ ] Skeleton loaders for the grid during data/filter transitions (DESIGN_SYSTEM.md "Loading States") — no blank screens, no spinner-only states.

---

# Responsive

- [ ] Verify grid, filters, sort control and pagination at mobile, tablet, desktop, large desktop.
- [ ] No horizontal scrolling; filter controls collapse sensibly on mobile (e.g. into a drawer or horizontally scrollable chip row).

---

# Accessibility

- [ ] Filter and sort controls have accessible labels and are operable by keyboard.
- [ ] Pagination controls are keyboard accessible with clear current-page indication.
- [ ] Loading skeletons use appropriate ARIA (e.g. `aria-busy`) without misleading screen reader announcements.

---

# Testing

- [ ] Unit tests: category filter logic, each sort order, pagination logic (page size, last page, single page, zero results).
- [ ] Playwright: `/businesses` loads and renders cards; category filter updates grid and URL; sorting changes order; pagination moves between pages; `/category/[slug]` renders correctly; invalid slug 404s; empty category shows the empty state.

---

# Documentation

- [ ] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).

---

# Out of Scope

Do not build in this sprint:

- Full-text/keyword search, ranking, autocomplete — Sprint 5.
- Business detail pages — Sprint 4.
- Full business/category dataset population — Sprint 6.
- Advanced animation/micro-interactions — Sprint 7.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, ARCHITECTURE.md, JSON_SCHEMA.md, and the specific standards doc for the task).
2. Implement one feature only (grid, then filters, then category pages, then sorting, then pagination, then states).
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits (see GIT_WORKFLOW.md).
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated features in a single AI session or commit.

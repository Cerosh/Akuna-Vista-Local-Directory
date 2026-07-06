# Sprint 03 – Business Directory

Neighbourhood Directory Platform

Sprint Number: 03

Sprint Name: Business Directory

Sprint Goal: Allow users to browse businesses.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

Build the searchable-by-browsing business directory: a grid of business cards at `/businesses`, category-scoped pages at `/category/[slug]`, filtering, sorting, pagination, and correct loading/empty states — so a visitor can find a business by browsing alone, without needing full search (Sprint 5).

---

# Business Value

Why does this sprint matter?

- The homepage (Sprint 2) gives visitors a taste of categories and featured businesses; the directory is where they go to actually complete the task of finding a business (PROJECT.md: *"help residents discover trusted local businesses"*).
- Category pages give each trade/service its own addressable, shareable, SEO-friendly URL (`/category/[slug]` per ARCHITECTURE.md Routing) — this matters long before Sprint 8's SEO work, since these pages start earning search visibility as soon as they exist.
- Good empty and loading states matter more here than anywhere else in the MVP: with a small sample dataset (Sprint 2) many categories will legitimately have zero or few businesses, and a broken-looking empty state undermines the trust this platform depends on.
- This sprint is the last one before real business/category volume (Sprint 6) — proving pagination, sorting and filtering work correctly now avoids expensive rework once 100+ businesses exist.

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] Users can discover businesses without using search.
- [ ] The directory and category pages source all data through the Sprint 1 repository layer.
- [ ] Filtering, sorting and pagination behave correctly at any dataset size, including zero and one result.
- [ ] Tests pass, including Playwright coverage of browse → filter → paginate.
- [ ] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Business cards (grid) | High | Not Started |
| F-002 | Category filters | High | Not Started |
| F-003 | Category pages (`/category/[slug]`) | High | Not Started |
| F-004 | Pagination | High | Not Started |
| F-005 | Sorting | Medium | Not Started |
| F-006 | Empty states | High | Not Started |
| F-007 | Loading skeletons | Medium | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a resident

I want to browse all businesses in a grid of cards

So that I can scan what's available without knowing exactly what to search for.

Acceptance Criteria

- [ ] `/businesses` renders a responsive grid of Business Cards sourced from `BusinessRepository`.
- [ ] Each card matches DESIGN_SYSTEM.md's Business Card Design (name, category, short description, location, rating, recommendation count, featured badge, primary CTA).
- [ ] The grid reflows correctly at 12/8/4 columns (desktop/tablet/mobile).

---

## Story 2

As a resident

I want to filter businesses by category

So that I only see plumbers, or only electricians, without visiting a separate page for each.

Acceptance Criteria

- [ ] Category filter controls are visible on `/businesses` and reflect the current selection in the URL (shareable, bookmarkable).
- [ ] Selecting a category updates the grid without a full page reload where practical (Server Component + search params).
- [ ] Filters compose correctly with sorting and pagination (e.g. page resets to 1 when the filter changes).

---

## Story 3

As a resident who clicked a homepage category

I want a dedicated page for that category

So that I land directly on relevant businesses with a clear, shareable URL.

Acceptance Criteria

- [ ] `/category/[slug]` renders only businesses belonging to that category.
- [ ] The page has a clear heading and short description of the category.
- [ ] An invalid or unknown category slug renders a proper 404, not a broken page.

---

## Story 4

As a resident browsing a category with many results

I want sorting and pagination

So that I'm not scrolling through an unmanageable list.

Acceptance Criteria

- [ ] Users can sort by at least one meaningful order (e.g. Featured first, Name A–Z, Recommendation count).
- [ ] Pagination (or "load more") works correctly, including on the last page and with a single page of results.
- [ ] Sort and pagination state is reflected in the URL.

---

## Story 5

As a resident browsing a category with no listed businesses yet

I want a helpful message instead of a blank page

So that I understand there's nothing there yet rather than assuming something is broken.

Acceptance Criteria

- [ ] Every zero-result state (empty category, empty filter combination) shows an explanation and a suggested next action (per UI_GUIDELINES.md "Empty States").
- [ ] Loading states use skeleton loaders, not a blank screen or spinner-only state (DESIGN_SYSTEM.md "Loading States").

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one feature only (e.g. business cards, then filters, then pagination).
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated features in one AI session.

---

# Documentation Required

Before starting this sprint read:

- CLAUDE.md
- PROJECT.md
- ROADMAP.md
- TODO.md
- CONTEXT.md

If UI work

- DESIGN_SYSTEM.md
- UI_GUIDELINES.md

If architecture changes

- ARCHITECTURE.md
- DECISIONS.md

If deployment changes

- DEPLOYMENT.md

Always for this sprint

- JSON_SCHEMA.md — business and category data shape, especially `categoryId`, `featured`, `tags`
- CODING_STANDARDS.md — naming, component structure
- TESTING.md — Playwright standards for browse/filter/paginate journeys

---

# Deliverables

- [ ] Business cards
- [ ] Category filters
- [ ] Category pages
- [ ] Pagination
- [ ] Sorting
- [ ] Empty states
- [ ] Loading skeletons

---

# Design Notes

See [notes.md](./notes.md).

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Requires from Sprint 1:

- Repository pattern (`BusinessRepository`, `CategoryRepository`) and JSON data structure.
- Shared components (Button, Card, Badge, Container, Section, Pagination, Skeleton per DESIGN_SYSTEM.md component library).
- Base layout, navigation and footer.

Requires from Sprint 2:

- Business Card and Category Card components (reused here, not rebuilt).
- Homepage links into `/businesses` and `/category/[slug]` (currently pointing at pages that don't exist yet — this sprint makes them real).

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Sample dataset from Sprint 2 is too small to meaningfully exercise pagination/sorting | Bugs in pagination/sorting logic go unnoticed until Sprint 6's 100-business population | Temporarily expand the sample dataset for this sprint (still placeholder-realistic) so pagination has more than one page to work with, or unit test the logic directly against synthetic data independent of the JSON file size |
| Filtering/sorting/pagination state gets tangled into ad hoc component state | Hard to share/bookmark URLs; violates "prefer derived state" (CODING_STANDARDS.md) | Drive filter/sort/page state from URL search params, derive everything else |
| Category filters and category pages duplicate the same filtering logic | Duplication, drift between `/businesses?category=x` and `/category/x` | Implement filtering once in a shared service/hook consumed by both routes |
| Empty states treated as an afterthought | Feels broken with the still-small Sprint 2 sample dataset, undermining trust | Build and review empty states for every section before calling a feature "done" — not just the happy path |

---

# Testing Plan

Unit Tests

- [ ] Category filter logic (filter businesses by categoryId).
- [ ] Sort logic (each supported sort order).
- [ ] Pagination logic (page size, last page, single page, zero results).

Integration Tests

- [ ] Directory + repository integration: filters, sort and pagination correctly narrow the JSON-backed dataset.

Playwright

- [ ] `/businesses` loads and displays a grid of business cards.
- [ ] Selecting a category filter updates the grid and the URL.
- [ ] Sorting changes the order of results.
- [ ] Pagination moves between pages correctly.
- [ ] `/category/[slug]` renders only matching businesses; an invalid slug renders 404.
- [ ] Empty category shows the empty state, not a blank page.

Manual Testing

- [ ] Manually verify every category, including ones with zero and one business, renders sensibly.

Responsive Testing

- [ ] Grid, filters and pagination controls at mobile, tablet, desktop, large desktop.

Accessibility

- [ ] Filter controls and pagination are keyboard accessible and properly labelled.
- [ ] Loading skeletons don't trap focus or announce misleadingly to screen readers.

---

# Definition of Done

- [ ] Users can discover businesses without using search.
- [ ] All acceptance criteria completed.
- [ ] Everything driven by JSON via the repository layer.
- [ ] Code reviewed against REVIEW_CHECKLIST.md.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Tests pass.
- [ ] Responsive.
- [ ] Accessible.
- [ ] Documentation updated.
- [ ] No console errors.
- [ ] Ready for deployment.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Release Notes

Features

- New business directory (`/businesses`) with category filtering, sorting and pagination.
- New category pages (`/category/[slug]`).
- Empty states and loading skeletons across directory and category pages.

Improvements

- N/A

Bug Fixes

- N/A

Known Issues

- Directory browsing only — full keyword search remains Sprint 5.
- Dataset is still sample-sized pending Sprint 6 content population.

---

# Lessons Learned

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Sprint Retrospective

See [retrospective.md](./retrospective.md).

---

# Carry Forward

See [retrospective.md](./retrospective.md).

---

# Metrics

See [retrospective.md](./retrospective.md).

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [ ] CONTEXT.md
- [ ] TODO.md
- [ ] ROADMAP.md
- [ ] DECISIONS.md
- [ ] CHANGELOG.md
- [ ] AI_MEMORY.md

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

Sprint 04 — Business Details: build individual business profile pages (hero, gallery, contact, location, opening hours, services, recommendations, related businesses) that every directory and category card links into.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

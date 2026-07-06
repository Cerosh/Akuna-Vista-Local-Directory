# Sprint 05 – Search

Neighbourhood Directory Platform

Sprint Number: 05

Sprint Name: Search

Sprint Goal: Enable fast discovery.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

Build a dedicated `/search` route with real, instant, client-side search across businesses — keyword, category and suburb — with autocomplete-style suggestions and graceful empty results, replacing the thin homepage search entry point built in Sprint 2 with genuine search functionality, while complementing (not duplicating) the category filtering, sorting and pagination infrastructure already built in Sprint 3.

---

# Business Value

Why does this sprint matter?

- PROJECT.md's Design Principles state "Search before scrolling" — this sprint is the first point where that principle becomes real, rather than aspirational.
- Sprint 2's homepage search box was explicitly a thin entry point that just routes into the directory or filters featured businesses; residents typing a specific plumber's name or suburb today get a shallow, incomplete result. This sprint closes that gap with a real search experience.
- PROJECT.md's Problem Statement is specific: residents currently ask "Can anyone recommend a plumber?" inside WhatsApp because there's no fast way to answer that question themselves. Fast, forgiving keyword/category/suburb search is the most direct product answer to that problem statement.
- ARCHITECTURE.md is explicit that today's client-side search must remain replaceable — Version 3 introduces AI/semantic/vector search behind the same interface. Getting the abstraction right in this sprint avoids a costly rewrite later.

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] `/search` supports keyword, category and suburb search against the existing JSON dataset.
- [ ] Filtering/results update instantly (debounced, client-side) as the user types.
- [ ] Empty results show helpful, actionable messaging rather than a blank page.
- [ ] Search logic is isolated behind a `SearchService`-style abstraction, not scattered across components.
- [ ] Tests pass, including Playwright coverage of the search journey.
- [ ] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Keyword search | High | Not Started |
| F-002 | Category search | High | Not Started |
| F-003 | Suburb search | High | Not Started |
| F-004 | Instant filtering | High | Not Started |
| F-005 | Search suggestions | Medium | Not Started |
| F-006 | Empty results | High | Not Started |
| F-007 | Recent searches (optional) | Low | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a resident who knows roughly what business or service I want

I want to type a keyword into search and see matching businesses immediately

So that I don't need to browse categories or ask the WhatsApp group.

Acceptance Criteria

- [ ] Typing a keyword matches against business `name`, `description`, `tags`, and category name.
- [ ] Results update as the user types, debounced so it feels instant without excessive re-computation.
- [ ] Each result links to its real `/business/[slug]` page (Sprint 4).

---

## Story 2

As a resident who wants businesses in or near my suburb

I want to search or filter by category and suburb from the same search experience

So that I find something relevant without re-learning a separate filtering UI.

Acceptance Criteria

- [ ] Search matches against `categoryId`/category name, `address.suburb`, and `serviceAreas`.
- [ ] Category/suburb search reuses the filtering logic already built for `/businesses` and `/category/[slug]` in Sprint 3 rather than re-implementing it.
- [ ] Combining a keyword with a category or suburb narrows results further (AND, not OR).

---

## Story 3

As a resident who isn't sure exactly what to type

I want suggestions as I type, drawn from real business names, categories and suburbs

So that I can find the right result faster and with fewer keystrokes.

Acceptance Criteria

- [ ] A typeahead/suggestions list appears after a minimum number of characters, sourced from existing JSON data (no AI/semantic matching — that's Version 3).
- [ ] Suggestions are keyboard-navigable (arrow keys, Enter, Escape).
- [ ] Selecting a suggestion navigates to or filters `/search` accordingly.

---

## Story 4

As a resident whose search doesn't match anything

I want a clear, friendly empty-results state with a suggested next step

So that I don't think the site is broken or give up on the directory entirely.

Acceptance Criteria

- [ ] Zero-result searches render a friendly message per DESIGN_SYSTEM.md/UI_GUIDELINES.md Empty States guidance (explanation + suggested action), not a blank page.
- [ ] The empty state suggests an alternative action (e.g. browse categories, clear filters, try a broader term).
- [ ] (Optional/stretch) Recently used searches, if implemented, are stored in `localStorage` and offered as a quick way to retry a previous search.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one part of the search experience only (e.g. search service/index, then keyword matching, then instant filtering UI, then suggestions, then empty state).
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated sections in one AI session.

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

- ARCHITECTURE.md — "Search Architecture" (client-side now, must remain replaceable for future Server/Hybrid/Semantic/Vector/AI search) and "Routing" (`/search`)
- JSON_SCHEMA.md — `name`, `description`, `tags`, `categoryId`, `address.suburb`, `serviceAreas` fields; `suburbs.json` and `categories.json` schemas
- DESIGN_SYSTEM.md / UI_GUIDELINES.md — "Search Experience" sections
- CODING_STANDARDS.md — naming, component structure
- TESTING.md — Playwright standards for the search journey

---

# Deliverables

- [ ] Keyword search
- [ ] Category search
- [ ] Suburb search
- [ ] Instant filtering
- [ ] Search suggestions
- [ ] Empty results
- [ ] Recent searches (optional)

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

Requires from Sprint 2:

- The homepage's thin search entry point (routes into the directory / filters featured businesses) — this sprint upgrades that entry point to call into real search rather than replacing the homepage UI itself.

Requires from Sprint 3:

- The category filtering, sorting and pagination infrastructure already built for `/businesses` and `/category/[slug]`, driven by URL search params — this sprint's category/suburb search and instant filtering should reuse that logic, not duplicate it.

Requires from Sprint 4:

- Real `/business/[slug]` pages — every search result must link to a working business page, not a placeholder.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Search logic duplicates Sprint 3's category/sort/filter infrastructure instead of reusing it | Two parallel, drifting implementations of "filter a list of businesses"; bugs fixed in one place persist in the other | Extract or reuse a single shared filtering/matching layer; `/search` and `/businesses`/`/category/[slug]` should call the same underlying logic, not maintain separate copies |
| Search is built as ad-hoc component logic rather than an abstracted service | Swapping in Server/Hybrid/Semantic/Vector/AI search later (ARCHITECTURE.md, Version 3) requires a rewrite instead of a swap | Build a `SearchService`-style interface (e.g. `search(query, filters): SearchResult[]`) that the UI calls; keep the current client-side JSON implementation behind it so it can be replaced without touching components |
| Empty results feel like a dead end or a broken page | Residents give up on the directory instead of trying an alternative search | Follow DESIGN_SYSTEM.md/UI_GUIDELINES.md Empty States guidance — explanation, suggested action, positive tone; never a blank page |
| Client-side search over the full JSON dataset becomes slow or janky as data grows, undermining the "feels instant" Definition of Done | Sprint fails its core success criterion even if functionally complete | Debounce input, keep the in-memory index lightweight (simple scoring, no heavy dependency), measure actual typing-to-result latency during review rather than assuming it's fast |

---

# Testing Plan

Unit Tests

- [ ] `SearchService`/search matching function returns correct results for keyword, category and suburb queries, individually and combined.
- [ ] Empty-query and no-match cases are handled explicitly (not as an accidental empty array with no messaging logic).
- [ ] Suggestion/autocomplete function returns relevant, deduplicated suggestions from business names, categories and suburbs.

Integration Tests

- [ ] `/search` route + `SearchService` + repositories: a given query renders the expected set of results.
- [ ] Category/suburb search on `/search` produces the same matching businesses as the equivalent Sprint 3 filter on `/businesses`.

Playwright

- [ ] Typing a keyword into search updates results without a full page reload.
- [ ] Selecting a suggestion navigates to the correct filtered results or business page.
- [ ] A query with no matches renders the empty-results state with a suggested next step.
- [ ] A search result links to the correct real `/business/[slug]` page.
- [ ] No console errors.

Manual Testing

- [ ] Subjectively confirm search "feels instant" while typing on a mid-range device/network throttle.
- [ ] Spot-check suggestions for relevance against real `businesses.json`/`categories.json`/`suburbs.json` data.
- [ ] Confirm combining keyword + category/suburb narrows results correctly.

Responsive Testing

- [ ] Mobile, tablet, desktop, large desktop for the search input, suggestions dropdown and results list.

Accessibility

- [ ] Search input has a proper label/`aria-label`.
- [ ] Suggestions list is keyboard-navigable and announced correctly to screen readers.
- [ ] Empty-results state uses semantic HTML and is not conveyed by colour/icon alone.

---

# Definition of Done

- [ ] Search feels instant and intuitive.
- [ ] All acceptance criteria completed.
- [ ] Search logic sits behind a replaceable `SearchService`-style abstraction.
- [ ] Category/suburb search reuses Sprint 3's filtering infrastructure rather than duplicating it.
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

- New `/search` route with keyword, category and suburb search, instant client-side filtering, search suggestions, and a graceful empty-results state.

Improvements

- Homepage search entry point (Sprint 2) now routes into real search instead of a thin directory redirect/filter.

Bug Fixes

- N/A

Known Issues

- Recent searches (optional) may ship as a stretch item depending on time remaining in the sprint.
- Search remains client-side over the current JSON dataset; Server/Hybrid/Semantic/Vector/AI search are future phases (ARCHITECTURE.md, Version 3).

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

Sprint 06 — Community Content: expand beyond a directory with events, promotions, announcements, featured content, community spotlight and a local news placeholder, to encourage repeat visits even when users aren't looking for a business.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

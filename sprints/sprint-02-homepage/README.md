# Sprint 02 – Homepage

Neighbourhood Directory Platform

Sprint Number: 02

Sprint Name: Homepage

Sprint Goal: Deliver a polished landing page.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

Build a fully responsive, production-quality homepage that communicates the value of the directory within seconds and gives visitors an immediate path into the product — hero, search, categories, featured businesses, social proof and community statistics — all driven by static JSON data through the repository layer built in Sprint 1.

---

# Business Value

Why does this sprint matter?

- The homepage is the first, and often only, impression a resident or business owner forms of the platform — it must earn trust immediately (PROJECT.md "Product Principles": *"Users should find answers in seconds"*).
- A clear value proposition and visible search reduce the platform's core problem: recommendations disappearing into WhatsApp instead of being discoverable (PROJECT.md "Problem Statement").
- Featured businesses and categories give business owners a reason to request a listing, supporting the long-term monetisation path (PROJECT.md "Monetisation Strategy" Phase 2).
- Community statistics build the "neighbourhood trust" signal that differentiates this platform from generic directories (DESIGN_SYSTEM.md "Design Vision").

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] A first-time visitor understands the site's purpose within 10 seconds and its value within 5 seconds (UI_GUIDELINES.md; this sprint's Definition of Done).
- [ ] All homepage content is sourced from JSON via the repository layer — no hardcoded business data.
- [ ] The homepage is fully responsive: mobile, tablet, desktop, large desktop.
- [ ] Tests pass, including a Playwright homepage journey test.
- [ ] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Hero section | High | Not Started |
| F-002 | Search entry point | High | Not Started |
| F-003 | Popular / featured categories | High | Not Started |
| F-004 | Featured businesses | High | Not Started |
| F-005 | Why choose local section | Medium | Not Started |
| F-006 | Community statistics | Medium | Not Started |
| F-007 | Navigation (functional, not placeholder) | High | Not Started |
| F-008 | Footer (functional, not placeholder) | High | Not Started |
| F-009 | Mobile responsive layout | High | Not Started |

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

I want to immediately understand what this website does and see a way to search

So that I don't need to ask the WhatsApp group.

Acceptance Criteria

- [ ] The hero communicates the value proposition in a single glance (headline + supporting line).
- [ ] A visible search entry point sits directly below or within the hero.
- [ ] The page renders above-the-fold content within Core Web Vitals targets (ARCHITECTURE.md performance targets).

---

## Story 2

As a resident

I want to see popular categories and featured businesses on the homepage

So that I can start browsing even before I know exactly what I'm looking for.

Acceptance Criteria

- [ ] Popular categories render from `categories.json` via `CategoryRepository`, ordered by `displayOrder`.
- [ ] Featured businesses render from `businesses.json` via `BusinessRepository`, filtered by `featured: true`.
- [ ] Both sections have graceful empty states if no data is marked featured.

---

## Story 3

As a new resident

I want to see evidence that this is a trusted, active community resource

So that I feel confident using recommendations from people I don't know yet.

Acceptance Criteria

- [ ] A "Why choose local" section explains the value of community-sourced recommendations.
- [ ] A community statistics section displays figures (e.g. members, businesses listed, recommendations) sourced from data, not hardcoded copy.

---

## Story 4

As a mobile visitor

I want the homepage to work as well on my phone as on a desktop

So that I'm not forced to find a computer to use the directory.

Acceptance Criteria

- [ ] No horizontal scrolling at any breakpoint.
- [ ] Navigation collapses into a mobile drawer.
- [ ] Touch targets meet accessibility sizing guidance.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one section of the homepage only.
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated sections in one AI session — each homepage section (hero, search, categories, featured businesses, statistics, etc.) should be its own task and commit.

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

- JSON_SCHEMA.md — business and category data shape
- CODING_STANDARDS.md — naming, component structure
- TESTING.md — Playwright standards for the new homepage journey test

---

# Deliverables

- [ ] Hero section
- [ ] Search entry point
- [ ] Featured businesses
- [ ] Categories
- [ ] Why choose local section
- [ ] Community statistics
- [ ] Footer
- [ ] Navigation
- [ ] Mobile responsive layout

---

# Design Notes

See [notes.md](./notes.md).

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Requires from Sprint 1:

- Base layout, theme and design tokens.
- Repository pattern (`BusinessRepository`, `CategoryRepository`) and JSON data structure.
- Shared components (Button, Card, Badge, Container, Section, Page Header, Search Input, Logo).
- Navigation shell and footer shell (this sprint makes them functional).

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| No real business/category data exists yet to populate "featured" sections | Sections look empty or fake during development | Add a small set of realistic sample records to JSON per JSON_SCHEMA.md, clearly understood as placeholder content (full population is Sprint 6 / ROADMAP Phase 6) |
| Search entry point implies working search before Sprint 5 (Search) is built | Sets a false user expectation, or scope creep into building real search now | Search entry point should link/scroll to a simple filter of the featured businesses, or route to the directory — not attempt full search architecture this sprint |
| Homepage becomes visually "busy" trying to fit every feature above the fold | Violates DESIGN_SYSTEM.md "never overwhelm users with competing focal points" | Follow the fixed visual hierarchy: Hero → Search → Categories → Businesses → Community Story → Footer |
| Community statistics have no real numbers yet | Numbers look fabricated or inconsistent later | Source statistics from `settings.json` / `metadata.json`; keep initial values honest placeholders (e.g. actual current WhatsApp member count from PROJECT.md: 800+) |

---

# Testing Plan

Unit Tests

- [ ] Category/business filtering helpers used by the homepage (e.g. "get featured businesses") are unit tested.

Integration Tests

- [ ] Homepage + repository integration: featured businesses and categories render from JSON.

Playwright

- [ ] Homepage loads and renders all sections.
- [ ] Search entry point is visible and interactive.
- [ ] Navigation works, including mobile drawer.
- [ ] No console errors.

Manual Testing

- [ ] Read the homepage cold (or ask someone unfamiliar with the project) and time how long it takes to understand the value proposition — target under 5 seconds.

Responsive Testing

- [ ] Mobile, tablet, desktop, large desktop — no horizontal scrolling, no broken layouts.

Accessibility

- [ ] Heading hierarchy is correct (one H1, logical H2/H3 per section).
- [ ] All interactive elements are keyboard accessible.
- [ ] Images have descriptive alt text.

---

# Definition of Done

- [ ] A visitor understands the value of the directory within five seconds.
- [ ] All acceptance criteria completed.
- [ ] Homepage looks production ready.
- [ ] All content comes from JSON.
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

- New homepage: hero, search entry point, categories, featured businesses, why-choose-local, community statistics, functional navigation and footer.

Improvements

- N/A (first content release)

Bug Fixes

- N/A

Known Issues

- Search entry point does not yet perform full search (Sprint 5).
- Business and category data is placeholder/sample content, not the full community dataset (Sprint 6).

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

Sprint 03 — Business Directory: build the searchable, filterable directory (grid/list view, category filters, sorting, pagination) that the homepage's search and category links lead into.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

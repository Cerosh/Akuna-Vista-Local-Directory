# Sprint 01 – Project Foundation

Neighbourhood Directory Platform

Sprint Number: 01

Sprint Name: Project Foundation

Sprint Goal: Build a production-quality foundation that everything else depends on.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

Establish the engineering foundation for the Neighbourhood Directory Platform: a Next.js application scaffold, quality tooling, CI/CD, the repository pattern, the JSON data structure, the base layout and theme, and the committed AI Engineering Kit that every future sprint depends on.

No business functionality, business data, or AI functionality is implemented in this sprint. At the end of Sprint 1 the application should feel like an empty but professionally engineered product.

---

# Business Value

Why does this sprint matter?

- Every later sprint (Homepage, Directory, Business Details, Search, Community, Admin) builds directly on top of this scaffold — mistakes made here are expensive to unwind later.
- A working CI pipeline and Playwright scaffold catch regressions before they reach production, protecting the community-facing product from day one.
- The Repository Pattern isolates JSON today so the platform can migrate to Supabase in Version 2 without rewriting UI.
- Committing the AI Engineering Kit (`.ai/` and `docs/`) turns the project's engineering standards into something Claude Code, and any future contributor, can read and follow consistently.
- Deploying to Vercel early validates the hosting pipeline before real content and traffic exist.

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] The application builds, lints and type-checks successfully.
- [ ] CI passes on GitHub Actions for every pull request.
- [ ] The application deploys to Vercel.
- [ ] The repository pattern, JSON structure, base layout and theme are in place.
- [ ] The AI Engineering Kit (`.ai/`, `docs/`, `sprints/`) is committed to the repository.
- [ ] No business functionality or business data has been introduced.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Repository & tooling setup (Next.js, TypeScript, Tailwind, shadcn/ui, ESLint, Prettier, Husky) | High | Not Started |
| F-002 | GitHub Actions CI pipeline | High | Not Started |
| F-003 | Playwright end-to-end test scaffold | High | Not Started |
| F-004 | Repository Pattern + JSON data structure | High | Not Started |
| F-005 | Base layout, navigation shell, footer | High | Not Started |
| F-006 | Theme (design tokens, typography, spacing) | High | Not Started |
| F-007 | AI Engineering Kit committed (`.ai/`, `docs/`, `sprints/`) | High | Not Started |
| F-008 | Vercel deployment | High | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As an engineer

I want a production-ready project scaffold with linting, formatting, pre-commit hooks and CI

So that future features can be developed consistently and safely by both humans and AI assistants.

Acceptance Criteria

- [ ] `npm run build`, `npm run lint` and `npm run typecheck` all pass.
- [ ] Husky + lint-staged block commits that fail lint/format/type-check.
- [ ] GitHub Actions runs the same checks on every Pull Request.

---

## Story 2

As a future contributor, human or AI

I want the repository pattern and JSON data structure already in place

So that I never need to read JSON files directly from a UI component.

Acceptance Criteria

- [ ] `BusinessRepository` and `CategoryRepository` interfaces exist with a JSON-backed implementation.
- [ ] `data/` contains schema-valid JSON files per JSON_SCHEMA.md (empty arrays are acceptable at this stage).
- [ ] No component imports JSON directly.

---

## Story 3

As a visitor

I want the site to load a themed, responsive shell with navigation and footer

So that the platform already feels trustworthy and professional before any content exists.

Acceptance Criteria

- [ ] The homepage renders navigation, a content placeholder, and a footer.
- [ ] The layout is responsive on mobile, tablet and desktop.
- [ ] The theme (colours, typography, spacing) matches DESIGN_SYSTEM.md.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full task breakdown by layer.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one feature only.
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated features in one AI session.

Do not implement any business functionality, business data or AI features in this sprint. That is explicitly out of scope until Sprint 2 onward — see tasks.md "Out of Scope".

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

- JSON_SCHEMA.md — repository layer and data structure
- CODING_STANDARDS.md — naming, structure, TypeScript rules
- GIT_WORKFLOW.md — branching and commit message conventions
- TESTING.md — Playwright standards and CI pipeline stages

---

# Deliverables

- [ ] Repository created
- [ ] Next.js App Router
- [ ] TypeScript
- [ ] Tailwind CSS
- [ ] shadcn/ui
- [ ] ESLint
- [ ] Prettier
- [ ] Husky
- [ ] GitHub Actions
- [ ] Playwright
- [ ] Repository pattern
- [ ] JSON structure
- [ ] Base layout
- [ ] Theme
- [ ] AI Engineering Kit committed

---

# Design Notes

See [notes.md](./notes.md).

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Nothing must be completed before this sprint — it is the first sprint.

This sprint blocks every later sprint:

- Sprint 02 (Homepage) depends on the base layout, theme and repository pattern.
- Sprint 03 (Directory) and Sprint 04 (Business Details) depend on the repository pattern and JSON structure.
- Sprint 07 (Quality) depends on the Playwright and CI scaffold established here.
- Sprint 09 (Production) depends on the Vercel deployment pipeline validated here.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Scaffold expands into business functionality or business data | Wastes effort, violates MVP scope in PROJECT.md and TODO.md | Follow TODO.md "Out of Scope" strictly; review against PROJECT.md MVP scope before merging |
| CI/Playwright configured but not enforced | Regressions slip into `main` | Make the GitHub Actions workflow a required status check before merge |
| Design tokens hardcoded instead of centrally defined | Costly rework in later design/theming passes | Follow DESIGN_SYSTEM.md tokens from the start; no hardcoded colours or spacing |
| Repository pattern skipped "temporarily" for speed | UI becomes coupled to JSON, blocking the future Supabase migration (ADR-003) | Enforce via REVIEW_CHECKLIST.md architecture review before merge |
| Vercel project misconfigured | Delayed or failed preview/production deploys | Verify a preview deployment succeeds before closing the sprint |

---

# Testing Plan

Unit Tests

- [ ] Repository layer (JSON loading, mapping) has basic unit tests.

Integration Tests

- [ ] N/A for this sprint — no feature integration exists yet.

Playwright

- [ ] Playwright installed and configured (Page Object Model, fixtures, helpers per TESTING.md).
- [ ] One smoke test: homepage loads, navigation and footer render.

Manual Testing

- [ ] Verify build, lint and typecheck locally.
- [ ] Verify Husky pre-commit hook blocks a failing commit.
- [ ] Verify GitHub Actions runs on a test Pull Request.

Responsive Testing

- [ ] Verify layout on mobile, tablet, desktop and large desktop breakpoints.

Accessibility

- [ ] Verify semantic HTML, keyboard navigation and visible focus states on the base layout.

---

# Definition of Done

- [ ] Project builds successfully.
- [ ] CI passes.
- [ ] Deploys to Vercel.
- [ ] All engineering documents in place.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Responsive.
- [ ] Accessible.
- [ ] No console errors.
- [ ] Ready for Sprint 2 (Homepage).

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Release Notes

Features

- No user-facing features. This sprint delivers engineering infrastructure only.

Improvements

- N/A

Bug Fixes

- N/A

Known Issues

- Application intentionally contains no business content or functionality.

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

Sprint 02 — Homepage: deliver a fully responsive homepage (hero, search, popular categories, featured businesses, community statistics, how it works, testimonials, newsletter, footer) using static JSON data, built entirely on top of the foundation delivered in Sprint 1.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

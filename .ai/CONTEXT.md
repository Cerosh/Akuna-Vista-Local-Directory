# CONTEXT.md

# Project Context

Version: 1.2

Last Updated: 2026-07-06

Current Sprint: Sprint 02 — Homepage (complete, awaiting go-ahead for Sprint 03)

---

# Project Summary

The Neighbourhood Directory Platform is a reusable platform for building trusted, community-driven local business directories.

The first deployment is branded as **Akuna Vista Local Directory**.

The long-term goal is to support multiple communities through configuration rather than code duplication.

---

# Current Phase

Phase 2 — Homepage (complete)

Current Focus:

Sprint 2 is done. Waiting for explicit instruction before starting Sprint 3 (Business Directory).

---

# Completed

Project planning completed. Engineering documents created. Project vision defined. Architecture agreed. Roadmap approved. Full 10-sprint plan prepared (`sprints/`).

**Sprint 01 — Project Foundation**, committed and pushed to GitHub (`https://github.com/Cerosh/Akuna-Vista-Local-Directory`):

- Next.js 15.5.20 (App Router), React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui
- ESLint + Prettier + Husky/lint-staged (verified: blocks a bad commit)
- GitHub Actions CI (typecheck → lint → format → unit tests → Playwright → build)
- Repository Pattern (`BusinessRepository`, `CategoryRepository`, `SettingsRepository`) over static JSON, with unit tests
- Themed base layout, responsive navigation (incl. mobile drawer), footer, shared components
- Vitest (unit) + Playwright (e2e) — all passing

**Sprint 02 — Homepage**, committed:

- Hero (headline + search entry point), Popular Categories, Featured Businesses, Community Statistics, Why Choose Local — all from JSON via repositories
- New `MetadataRepository`; `CategoryRepository.getFeatured()`; `Metadata.communityMembers` field (schema 1.1.0, documented in JSON_SCHEMA.md)
- Sample business/category data (8 businesses, 8 categories, Schofields/The Ponds/NSW)
- Navigation/Footer wired to real routes/anchors, with `prefetch={false}` on links to routes not built yet
- Fixed a real accessibility bug: Base UI's `Button` forces `role="button"` even when composed with a `render` prop pointing at a `<Link>` — replaced with `buttonVariants()` applied directly to `<Link>` for genuinely navigational elements, so they keep correct `role="link"` semantics
- `lint`, `typecheck`, `format:check`, `test` (12 unit tests), `test:e2e` (5 Playwright tests), `build` all pass; verified visually via headless-browser screenshots (desktop + mobile)

---

# In Progress

Nothing. Sprint 2 is complete. Awaiting explicit instruction to start Sprint 3.

---

# Not Started

Business Directory (Sprint 3), Business Details (Sprint 4), Search (Sprint 5), Community Content (Sprint 6), Quality & Performance (Sprint 7), Admin Preparation (Sprint 8), Production Readiness (Sprint 9), Future Platform Foundation (Sprint 10).

---

# Current Technology Stack

Frontend

- Next.js 15.5.20 (App Router)
- React 19
- TypeScript (strict)

Styling

- Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`)
- shadcn/ui (Base UI primitives — composition uses a `render` prop, not `asChild`; `Button` always applies `role="button"`, so genuinely navigational links use `buttonVariants()` on a plain `Link` instead)

Icons

- Lucide React

Data

- Static JSON via Repository Pattern (`BusinessRepository`, `CategoryRepository`, `SettingsRepository`, `MetadataRepository`)

Testing

- Vitest (unit), Playwright (end-to-end)

Hosting

- Vercel — **not yet connected** (see Known Constraints)

Future Data Source

- Supabase

---

# Current Repository State

Sprint 1 and Sprint 2 complete, committed, and pushed to GitHub. Repository builds, lints, type-checks, and passes all tests. Homepage is live locally with real (sample) data. Sprint 3 (Business Directory) has not started.

---

# Architectural Decisions

Current data source: JSON

Architecture pattern: Repository Pattern

Rendering strategy: Server Components by default.

Styling: Tailwind CSS v4 (CSS-first theming)

Component Strategy: Reusable and composable; this shadcn preset uses Base UI, not Radix. Navigational elements styled as buttons use `buttonVariants()` on a `Link`, not the `Button` component (see Sprint 2 completed notes).

Routing: Next.js App Router.

Future Database: Supabase

---

# Engineering Priorities

Priority 1

Keep the architecture simple.

Priority 2

Avoid unnecessary abstractions.

Priority 3

Build reusable components.

Priority 4

Maintain strict TypeScript.

Priority 5

Optimise for future scalability.

---

# Current Risks

Avoid implementing future features too early.

Avoid hardcoding business data.

Avoid creating unnecessary client components.

Avoid introducing global state without justification.

Avoid over-engineering.

---

# Known Constraints

No backend. No authentication. No CMS. No database. No APIs. No reviews. No advertisements. No payments. No AI implementation.

**Vercel deployment is intentionally deferred.** The project owner has parked connecting the repository to Vercel for several sprints — this is a deliberate decision, not an oversight. The app builds and runs correctly locally and in CI; it simply has not been deployed yet. Revisit this before Sprint 9 (Production Readiness) at the latest.

All business data will remain static until Version 2. Current sample dataset (8 businesses, 8 categories) is placeholder-realistic, not the full 100-business/25-category set (that's Sprint 8's seed generator).

---

# Next Milestone

Sprint 03 — Business Directory (not started, awaiting explicit instruction):

- `/businesses` grid, category filters
- `/category/[slug]` pages
- Sorting, pagination
- Empty states, loading skeletons

Full plan: `sprints/sprint-03-directory/`.

---

# Claude Code Instructions

Before every implementation:

1. Read CLAUDE.md
2. Read PROJECT.md
3. Read ARCHITECTURE.md
4. Read TODO.md
5. Read the current/next sprint's full plan under `sprints/sprint-0N-*/`

Use this document only as a quick status summary.

If there is any conflict between this document and the other project documents, follow the more specific document.

---

# Session Notes

Current repository status:

Sprint 1 (Project Foundation) and Sprint 2 (Homepage) are both complete, committed, and pushed to GitHub. Vercel deployment is intentionally parked by the project owner for now — do not treat this as a blocker or attempt to resolve it without being asked.

Do not begin Sprint 03 without explicit instruction, even though this document and TODO.md describe its scope.

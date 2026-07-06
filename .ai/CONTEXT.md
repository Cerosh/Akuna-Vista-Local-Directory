# CONTEXT.md

# Project Context

Version: 1.5

Last Updated: 2026-07-07

Current Sprint: Sprint 05 — Search (complete, awaiting go-ahead for Sprint 06)

---

# Project Summary

The Neighbourhood Directory Platform is a reusable platform for building trusted, community-driven local business directories.

The first deployment is branded as **Akuna Vista Local Directory**.

The long-term goal is to support multiple communities through configuration rather than code duplication.

---

# Current Phase

Phase 5 — Search (complete)

Current Focus:

Sprint 5 is done. Waiting for explicit instruction before starting Sprint 6 (Community Content).

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

**Sprint 03 — Business Directory**, committed:

- `/businesses` (grid, category filter chips, sort, pagination, empty state, loading skeleton) and `/category/[slug]` (same filtering logic, reused not duplicated, real 404 for unknown slugs)
- New `BusinessRepository.getPage({ categoryId, sort, page, pageSize })` — single shared filter/sort/pagination implementation used by both routes
- Added a `fitness-wellness` category (no businesses assigned) to genuinely exercise the empty state
- Navigation/Footer/Hero/CategoryCard links to `/businesses` and `/category/[slug]` de-prefetch-guarded now that those routes are real
- Found and fixed a genuine Next.js framework gotcha: **a route segment's `loading.tsx` breaks `notFound()`'s HTTP status code** (streams a 200 shell before the async not-found check resolves — a "soft 404"). Removed `loading.tsx` from `/category/[slug]` (which can 404) while keeping it on `/businesses` (which never does). Documented in `AI_MEMORY.md` "Framework Gotchas" since any future route calling `notFound()` could hit this again.
- `lint`, `typecheck`, `format:check`, `test` (26 unit tests), `test:e2e` (13 Playwright tests), `build` all pass; verified visually (desktop + mobile screenshots, keyboard tab-order check)

**Sprint 04 — Business Details**, committed:

- `/business/[slug]` — hero (badges + share button), gallery, service areas, contact info, opening hours, social links — each section independently omitted when its data is absent
- Per-business SEO metadata (title/description/Open Graph) and `LocalBusiness` JSON-LD structured data via a pure, unit-tested function (`lib/services/structuredData.ts`)
- Deliberately **no `loading.tsx`** for this route (it calls `notFound()` — see Sprint 3's framework gotcha)
- Replaced nonexistent per-business `.jpg` paths with a real, hand-authored SVG placeholder (`public/images/placeholder-business.svg`, "Photo coming soon"); enabled `dangerouslyAllowSVG` in `next.config.ts` scoped to this trusted local asset
- No brand icons available for social links (lucide-react doesn't ship them) — used a generic link icon + platform name label instead
- `BusinessCard`'s "View details" link de-prefetch-guarded now that `/business/[slug]` is real
- `lint`, `typecheck`, `format:check`, `test` (29 unit tests), `test:e2e` (19 Playwright tests), `build` all pass; verified visually (desktop + mobile, 3 businesses to exercise graceful degradation), keyboard tab order, heading hierarchy, JSON-LD validity, and actual Share-button clipboard behaviour

**Sprint 05 — Search**, committed:

- `/search` — keyword, category and suburb search with instant, client-side filtering (per ARCHITECTURE.md's Search Architecture), typeahead suggestions (keyboard-navigable combobox), optional recent searches (localStorage), shareable URL kept in sync via `history.replaceState` (no server round-trip per keystroke)
- New `lib/services/searchService.ts` — pure `searchBusinesses()` / `getSearchSuggestions()`, deliberately separate from `BusinessRepository.getPage()` (server-side) since search must run client-side; category/suburb matching semantics kept intentionally identical to Sprint 3's so results don't diverge
- New `SuburbRepository` + populated `data/suburbs.json` (previously empty since Sprint 1) with the 5 suburbs already referenced in sample business data
- Homepage Hero's search box now really submits to `/search` (`<form action="/search">`)
- Found and fixed a real bug during visual verification: searching "cafe" returned zero results because sample data uses accented characters ("Café", "Cafés & Restaurants") and the match was diacritic-sensitive — fixed with Unicode NFD normalization + diacritic stripping, with a regression test
- Found and fixed a second bug while writing Playwright tests: pressing Escape to dismiss suggestions permanently disabled them from reappearing while typing (a single `isFocused` boolean conflated "has focus" with "should show suggestions") — renamed to `isSuggestionsOpen`, reopened on every keystroke
- `lint`, `typecheck`, `format:check`, `test` (46 unit tests), `test:e2e` (28 Playwright tests), `build` all pass; verified visually (desktop + mobile), keyboard navigation through suggestions, and the homepage-to-search submission flow end to end

---

# In Progress

Nothing. Sprint 5 is complete. Awaiting explicit instruction to start Sprint 6.

---

# Not Started

Community Content (Sprint 6), Quality & Performance (Sprint 7), Admin Preparation (Sprint 8), Production Readiness (Sprint 9), Future Platform Foundation (Sprint 10).

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

- Lucide React (no brand/social icons in this version — use generic icon + text label for platforms like Facebook/Instagram)

Data

- Static JSON via Repository Pattern (`BusinessRepository`, `CategoryRepository`, `SettingsRepository`, `MetadataRepository`, `SuburbRepository`)

Services

- `lib/services/structuredData.ts` — pure `LocalBusiness` JSON-LD generator
- `lib/services/searchService.ts` — pure, replaceable client-side search (keyword/category/suburb matching + suggestions)

Testing

- Vitest (unit), Playwright (end-to-end)

Hosting

- Vercel — **not yet connected** (see Known Constraints)

Future Data Source

- Supabase

---

# Current Repository State

Sprint 1 through Sprint 5 complete and committed (Sprint 5 not yet pushed — awaiting user push). Repository builds, lints, type-checks, and passes all tests (46 unit + 28 e2e). Homepage, business directory, category pages, business detail pages, and search are all live locally with real (sample) data. Sprint 6 (Community Content) has not started.

---

# Architectural Decisions

Current data source: JSON

Architecture pattern: Repository Pattern

Rendering strategy: Server Components by default.

Styling: Tailwind CSS v4 (CSS-first theming)

Component Strategy: Reusable and composable; this shadcn preset uses Base UI, not Radix. Navigational elements styled as buttons use `buttonVariants()` on a `Link`, not the `Button` component (see Sprint 2 completed notes).

Filtering/sorting/pagination: one shared implementation (`BusinessRepository.getPage()` + `features/directory/BusinessDirectory.tsx`) used by every route that lists businesses — never duplicate this logic per-route.

Routing: Next.js App Router. **Never add `loading.tsx` to a route segment whose `page.tsx` can call `notFound()`** (see AI_MEMORY.md "Framework Gotchas").

Images: `next/image` disallows SVG by default; `dangerouslyAllowSVG` is enabled in `next.config.ts` scoped to the trusted, self-authored placeholder only — do not assume arbitrary/user-supplied SVGs are safe under this config.

Search: client-side, not server-side — `lib/services/searchService.ts` is a separate, pure implementation from `BusinessRepository.getPage()` (which is server-side/URL-driven for `/businesses` and `/category/[slug]`). Keep category/suburb matching semantics consistent between the two, but don't force them to share a literal function; the environments differ (browser vs. server) and the actual matching rules are simple enough not to drift. Any string matching must normalize diacritics (NFD + strip combining marks) — see the "cafe"/"café" bug in Sprint 5.

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

All business data will remain static until Version 2. Current sample dataset (8 businesses, 9 categories, 5 suburbs) is placeholder-realistic, not the full 100-business/25-category set (that's Sprint 8's seed generator). All business photos are a single shared placeholder SVG until real community photography arrives.

---

# Next Milestone

Sprint 06 — Community Content (not started, awaiting explicit instruction).

Full plan: `sprints/sprint-06-community-content/`.

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

Sprint 1 (Project Foundation), Sprint 2 (Homepage), Sprint 3 (Business Directory), Sprint 4 (Business Details), and Sprint 5 (Search) are all complete and committed locally. Vercel deployment is intentionally parked by the project owner for now — do not treat this as a blocker or attempt to resolve it without being asked.

Do not begin Sprint 06 without explicit instruction, even though this document and TODO.md describe its scope.

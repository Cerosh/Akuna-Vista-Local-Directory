# CONTEXT.md

# Project Context

Version: 1.8

Last Updated: 2026-07-07

Current Sprint: Sprint 08 — Admin Preparation (complete, awaiting go-ahead for Sprint 09)

---

# Project Summary

The Neighbourhood Directory Platform is a reusable platform for building trusted, community-driven local business directories.

The first deployment is branded as **Akuna Vista Local Directory**.

The long-term goal is to support multiple communities through configuration rather than code duplication.

---

# Current Phase

Phase 8 — Admin Preparation (complete)

Current Focus:

Sprint 8 is done. Waiting for explicit instruction before starting Sprint 9 (Production Readiness).

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

**Sprint 06 — Community Content**, committed:

- Six new homepage sections: Community Events, Local Promotions, a Community Noticeboard (Announcements), a unified Featured Content mechanism, a Community Spotlight, and a "coming soon" Local News placeholder
- Deliberately activated the Event and Promotion schemas (JSON_SCHEMA.md, previously "(Future)"/Version 4) and defined a new Announcement schema — a project-owner-directed scope pull-forward, documented in DECISIONS.md ADR-011; PROJECT.md/ROADMAP.md updated to match
- New `EventRepository`, `PromotionRepository`, `AnnouncementRepository`; new `BusinessRepository.getById()`; new `lib/services/featuredContentService.ts` (single cross-content-type featured aggregator) and `lib/services/resolvePromotionBusinesses.ts` (shared businessId → Business resolution, omitting dangling references)
- Found and fixed a heading-hierarchy bug while writing Playwright coverage: `LocalNewsPlaceholder` used `CardTitle` (a styled `<div>`, not a real heading) for its section title — replaced with a real `<h2>`
- `lint`, `typecheck`, `test` (80 unit tests), `test:e2e` (29 Playwright tests), `build` all pass; verified visually via the dev server (all six sections, promotion → business links, no console errors)
- **Known limitation:** no e2e coverage forces a genuine "zero active records" empty state — these Server Components read JSON at module scope with no per-test data-injection seam; empty-state logic is covered at the repository/unit level instead

**Sprint 07 — Quality & Performance**, committed:

- A documented Lighthouse (mobile + desktop) and axe-core baseline for all 5 routes, taken before any fix, per ARCHITECTURE.md's Performance Targets
- Nine root-caused defects found and fixed: sitewide missing favicon (Best Practices 96 → 100); a Next.js 15.2+ metadata-streaming behaviour hiding `/business/[slug]`'s SEO tags from Lighthouse's own audit UA (SEO 91 → 100, fixed via `htmlLimitedBots` in `next.config.ts`); two sitewide accessibility issues (`Footer.tsx`'s `aria-label` on a roleless `<span>`; four under-contrast colour tokens — Accessibility → 100 everywhere); a tablet-breakpoint (768px) horizontal overflow (Footer's Contact column missing `min-w-0`); a missing keyboard-focus move on the skip-to-content link; and two regressions this sprint introduced against itself (a root-level `loading.tsx` cascading into a soft-404 on unrelated routes; a new `/search` loading skeleton causing CLS 0.275) — both caught and fixed within this same sprint via the measure-fix-remeasure discipline formalised in new **ADR-012**
- Custom `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`; consistent skeleton loading states for homepage (moved into `app/(home)/`) and search; site-wide SEO metadata (`metadataBase`, Open Graph/Twitter defaults, `alternates.canonical` on every route)
- `playwright.config.ts` gained `firefox`/`webkit` projects; two disclosed, non-app browser/tooling limitations found (WebKit's default Tab order excludes links; Playwright can only grant clipboard permissions in Chromium)
- New Framework Gotchas documented in `AI_MEMORY.md`: root-level `loading.tsx` cascade behaviour, and Next.js 15.2+ metadata streaming/`htmlLimitedBots`
- Final scores: Performance 96-100, Accessibility 100, Best Practices 100, SEO 100, CLS ≤0.025 on every route (mobile and desktop)
- **Known limitation:** mobile LCP sits at or just above the 2.5s target on all 5 routes (desktop LCP comfortably met everywhere) — root-caused to text-element render delay under Lighthouse's simulated mobile throttle, not a further-fixable code defect; carried forward. A real screen-reader spot-check, Google's Rich Results Test, and a Vercel preview check were also not performed (no assistive technology / public URL / Vercel deployment available in this environment) — disclosed in `sprints/sprint-07-quality/retrospective.md` rather than silently marked done.

**Sprint 08 — Admin Preparation**, committed:

- CLI/local/CI tooling for `data/*.json` — not a CMS, and explicitly not ROADMAP.md's Phase 14 "Admin Portal" (a future authenticated dashboard)
- `scripts/lib/validation.ts` — one `zod` schema per data type matching `.ai/JSON_SCHEMA.md` exactly (required fields, slug/UUID rules, ISO 8601 dates, no unused fields, duplicate detection, cross-file referential integrity for `categoryId`/`businessId`); `npm run validate:data`, now enforced in Husky pre-commit and CI (verified live — a deliberately-corrupted test commit was blocked)
- `scripts/backup.ts`/`scripts/restore.ts` (timestamped, git-ignored `.backups/` snapshots), `scripts/export-csv.ts`/`scripts/import-csv.ts` (JSON↔CSV, round-trip verified against the real `data/businesses.json`), `scripts/admin.ts` (add/update/toggle via Node's built-in `parseArgs`), `scripts/seed-generate.ts` + `scripts/seed/wordbanks.ts` (realistic placeholder-data generator, closing the gap that ROADMAP.md's Phase 6 was never scheduled into any sprint), `scripts/migrate-add-price-range.ts` (one real, executed migration: `Business.priceRange`, schema `1.3.0`)
- New ADR-013 (why local/CI tooling now, not the Admin Portal or a Supabase migration); `.ai/JSON_SCHEMA.md` gained a "Tooling" section
- Found and fixed two real bugs: `zod` v4's strict UUID version/variant validation rejected hand-patterned test fixtures (fixed with real `crypto.randomUUID()` values); the standard `import.meta.url === \`file://${process.argv[1]}\`` "run directly" check silently fails when the project path has spaces, which this project's does — `npm run backup:data` wrote nothing until fixed with a shared `pathToFileURL`-based helper (new Framework Gotcha in `AI_MEMORY.md`)
- `lint`, `typecheck`, `test` (121 unit/integration tests), `build`, and the full Playwright suite (66 Chromium tests, re-run after the migration helper changed real data) all pass
- **Known limitation:** the seed generator was built, tested, and run once at full scale into git-ignored scratch output — but deliberately **not** run against the real `data/` directory; that decision is left open for the project owner (`sprints/sprint-08-admin/notes.md` Open Questions), not resolved here

---

# In Progress

Nothing. Sprint 8 is complete. Awaiting explicit instruction to start Sprint 9.

---

# Not Started

Production Readiness (Sprint 9), Future Platform Foundation (Sprint 10).

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

- Static JSON via Repository Pattern (`BusinessRepository`, `CategoryRepository`, `SettingsRepository`, `MetadataRepository`, `SuburbRepository`, `EventRepository`, `PromotionRepository`, `AnnouncementRepository`)

Services

- `lib/services/structuredData.ts` — pure `LocalBusiness` JSON-LD generator
- `lib/services/searchService.ts` — pure, replaceable client-side search (keyword/category/suburb matching + suggestions)
- `lib/services/featuredContentService.ts` — pure cross-repository "featured" aggregator (events + promotions + announcements → one normalised shape)
- `lib/services/resolvePromotionBusinesses.ts` — shared businessId → Business resolution, omitting dangling references

Testing

- Vitest (unit), Playwright (end-to-end — `chromium`/`firefox`/`webkit` projects since Sprint 7)
- Lighthouse (`lighthouse` CLI) and `@axe-core/playwright` — added Sprint 7 for measured performance/accessibility audits; manual/local runs only, no CI wiring yet (a reasonable Sprint 9 candidate)

Data Tooling (Sprint 8 — CLI/local/CI only, no UI)

- `scripts/lib/validation.ts` — the single `zod`-based validation library, reused by every script below plus Husky pre-commit and CI
- `scripts/backup.ts` / `scripts/restore.ts`, `scripts/export-csv.ts` / `scripts/import-csv.ts` (`papaparse`), `scripts/admin.ts`, `scripts/seed-generate.ts`, `scripts/migrate-add-price-range.ts`
- `tsx` — script runner (`npm run <script>` executes a `.ts` file directly, no build step)

Hosting

- Vercel — **not yet connected** (see Known Constraints)

Future Data Source

- Supabase

---

# Current Repository State

Sprint 1 through Sprint 8 complete and committed (not yet pushed — awaiting user push). Repository builds, lints, type-checks, and passes all tests (121 unit/integration + 198 e2e test instances across 3 browsers, 186 passed/12 documented browser-limitation skips). Homepage, business directory, category pages, business detail pages, search, and the community content sections are all live locally with real (sample) data, measured and hardened (Sprint 7) and now backed by validated, tooled data management (Sprint 8). Sprint 9 (Production Readiness) has not started.

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

Featured content: one cross-repository aggregator (`lib/services/featuredContentService.ts`), not three parallel "featured X" implementations — event/promotion/announcement `featured: true` records are normalised into a single shape and rendered by one presentation component (`FeaturedContentCard`). Any new "featured"-flagged content type added later should extend this aggregator, not add its own.

Date-range logic: one shared helper, `lib/utils/dateStatus.ts` (`isPast`), reused by `EventRepository`/`PromotionRepository`/`AnnouncementRepository` for "upcoming"/"active"/"expired" checks — plain ISO 8601 `Date` comparison, no date library.

Metadata: `htmlLimitedBots: /.*/ ` is set in `next.config.ts` (Sprint 7) — Next.js 15.2+ otherwise streams `generateMetadata()` output to real browsers and only renders it synchronously for recognised bot user agents, which was hiding a real SEO gap from Lighthouse's own audit UA. See AI_MEMORY.md "Framework Gotchas."

Homepage route: lives at `app/(home)/page.tsx` (a route group, not `app/page.tsx`) since Sprint 7 — needed so `app/(home)/loading.tsx` doesn't cascade to `/business/[slug]`/`/category/[slug]` as their Suspense boundary (see AI_MEMORY.md "Framework Gotchas" — a root-level `app/loading.tsx` would otherwise reintroduce the `notFound()` soft-404 bug on unrelated routes).

Quality measurement: any future performance/accessibility/SEO claim requires an actual recorded before/after Lighthouse/axe-core measurement, not a "looks fine" impression — see DECISIONS.md ADR-012.

Data tooling: every script under `scripts/` that writes to `data/` (import, admin, seed generator, migration helpers) must validate via `scripts/lib/validation.ts` before writing — never bypass it "to save time." `scripts/` is deliberately separate from the app's `lib/` (tooling-only, never imported by Next.js) — see DECISIONS.md ADR-013.

Node scripts: use `scripts/lib/isMainModule.ts` (not a raw `import.meta.url === \`file://${process.argv[1]}\`` check) to detect direct execution — the raw check silently fails when the project path has spaces, which this project's does. See AI_MEMORY.md "Framework Gotchas."

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

All business data will remain static until Version 2. Current sample dataset (8 businesses, 9 categories, 5 suburbs, 5 events, 5 promotions, 5 announcements) is placeholder-realistic, not the full 100-business/25-category set. Sprint 8's seed generator can now produce that full-scale set on demand (`npm run seed:generate`), but has deliberately not been run against the real `data/` directory — whether/when to do so is an open decision for the project owner, not resolved yet. All business photos — and now event images — are a single shared placeholder SVG until real community photography arrives.

Events, Promotions and Announcements are authored via manual JSON edits or Sprint 8's CLI tooling (`scripts/admin.ts`, `scripts/import-csv.ts`) — no authenticated admin UI exists yet (that remains ROADMAP.md's 🟡 Future Phase 14 "Admin Portal").

No screen reader (VoiceOver/NVDA) is available in this development environment — accessibility verification relies on automated `@axe-core/playwright` plus a manual keyboard-navigation Playwright proxy; a genuine screen-reader spot-check is still owed before a production launch decision (Sprint 9).

Mobile LCP sits at or just above ARCHITECTURE.md's 2.5s target on every route (desktop LCP is comfortably met everywhere) — root-caused (Sprint 7) to text-element render delay under Lighthouse's simulated mobile throttle, not a further-fixable code defect at this time. See `sprints/sprint-07-quality/retrospective.md`'s Carry Forward.

---

# Next Milestone

Sprint 09 — Production Readiness (not started, awaiting explicit instruction).

Full plan: `sprints/sprint-09-production/`.

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

Sprint 1 (Project Foundation), Sprint 2 (Homepage), Sprint 3 (Business Directory), Sprint 4 (Business Details), Sprint 5 (Search), Sprint 6 (Community Content), Sprint 7 (Quality & Performance), and Sprint 8 (Admin Preparation) are all complete and committed locally. Vercel deployment is intentionally parked by the project owner for now — do not treat this as a blocker or attempt to resolve it without being asked.

Do not begin Sprint 09 without explicit instruction, even though this document and TODO.md describe its scope.

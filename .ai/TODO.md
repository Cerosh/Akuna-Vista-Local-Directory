# TODO.md

# Current Sprint

Sprint Number

09 (complete) — awaiting go-ahead for Sprint 09b

Sprint Name

Production Readiness

Status

✅ Complete (monitoring/Sentry explicitly deferred — see Backlog)

Recommended Claude Model

Claude Sonnet

---

# Sprint 09 Summary

Delivered: security headers (HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
Permissions-Policy), Vercel Analytics, `robots.txt`, `sitemap.xml` (35 URLs, generated from the
repository layer), a final metadata sanity check, browser compatibility verification, and a full
regression pass — all verified live against the real production deployment
(`https://akuna-vista-local-directory.vercel.app/`), not just built and assumed correct.

Key decisions:

- **Sentry (error monitoring) deferred** — the project owner chose not to set up an account this
  sprint rather than block everything else on it. Tracked below in Backlog, not silently dropped.
- **Vercel Analytics chosen over Google Analytics** — zero external account/property to create,
  works immediately on Vercel, no env var needed.

One real production bug found and fixed (not caused by this sprint, found while verifying it):
`NEXT_PUBLIC_SITE_URL` was never set in Vercel's Production environment variables, so canonical
URLs, Open Graph tags and `LocalBusiness` JSON-LD were all emitting `http://localhost:3000` live.
Confirmed via direct `curl`, fixed by the project owner setting the env var and redeploying,
re-verified fixed.

Three real regressions found and fixed during this sprint's own security-header/analytics work,
all caught by running the full Playwright suite against a live server rather than trusting
lint/typecheck/build alone:

1. A strict `script-src 'self'` (no exceptions) broke the app entirely across all three browsers
   — Next.js injects ~50 inline hydration/RSC-streaming `<script>` tags per page that don't
   appear in this app's own source. A nonce-based middleware fix (the textbook-correct CSP
   approach) didn't work — Next.js's Turbopack build never applied the generated nonce to its own
   scripts — so `script-src` settled on a documented `'unsafe-inline'` exception instead.
2. HSTS + CSP's `upgrade-insecure-requests`, sent unconditionally, broke every WebKit test locally
   (SSL errors — WebKit tried to upgrade every `http://localhost` request to a non-existent local
   HTTPS server). Fixed by gating both behind `process.env.VERCEL === "1"` (real deployments only,
   always HTTPS already).
3. `@vercel/analytics`'s `<Analytics />` isn't actually a silent no-op outside Vercel as
   documented — it unconditionally fetches `/_vercel/insights/script.js`, 404ing everywhere but a
   real Vercel deployment, producing genuine console errors. Fixed with the same
   `process.env.VERCEL` gate.

Tests: 126 unit/integration (was 121 — 5 new for `app/sitemap.ts`) + 269 Playwright across
Chromium/Firefox/WebKit locally (enforced via `.husky/pre-push`), Chromium/Firefox in CI. Build
succeeds. Full details, including the Definition of Done walkthrough and Findings Log:
`sprints/sprint-09-production/review.md` and `retrospective.md`.

Known limitation, deliberately not resolved here: real physical-device/browser testing (real
Safari, real iOS/Android hardware) isn't available in this environment — same disclosed
limitation Sprint 7 already carried forward.

---

# Sprint 08b Summary

Delivered: `/about`, `/contact`, `/privacy`, `/terms` — four static pages closing a gap that
existed since `.ai/ROADMAP.md`'s original Phase 5 "Community Pages" was split across the actual
10-sprint plan without those four pages ever landing anywhere. `Footer.tsx` had linked to `/about`
and `/contact` since Sprint 1 with `prefetch={false}` (both 404'd); those links are now real, and
a new "Legal" nav in the Footer's bottom bar links Privacy/Terms.

Key decisions:

- Inserted as Sprint 08b between Sprint 08 and Sprint 09 **without renumbering either** — see
  `sprints/sprint-08b-community-pages/README.md`'s "Numbering" section. This resolves a gap
  Sprint 09's own planning docs had flagged as needing an explicit decision before that sprint's
  Definition of Done could be signed off (updated in the same commit that created this sprint's
  plan).
- Contact page is a `mailto:` link to `Settings.contactEmail`, not a submission form — this
  project has no email-sending backend (ADR-002), so a real form would be new architecture, not a
  simple page. Satisfies `.ai/TESTING.md`'s "Contact page" Critical User Journey as specified.
- Privacy/Terms content is an honest, accurate draft of current platform behaviour (no accounts,
  no data collection today, what Sprint 9's analytics will add), explicitly flagged as needing
  the project owner's own legal review before being treated as binding — not presented as vetted
  legal advice.
- No new components: every page reuses `PageHeader`/`Container`/`Section`/`buttonVariants`.

One finding (Low severity, fixed immediately): a new Playwright test's `getByRole` link locator
matched both the page body's mailto link and the Footer's (present on every page) — scoped to
`#main-content` to disambiguate. See `sprints/sprint-08b-community-pages/review.md`.

Tests: 121 unit/integration (unchanged) + 272 Playwright (was 264 for Sprint 07/08 — 8 new tests
across accessibility/responsive/community-pages, all passing across Chromium/Firefox/WebKit).
Build succeeds; all four new routes are static.

Known limitation, deliberately not resolved here: Privacy/Terms content has not had a legal
review — see this sprint's Carry Forward.

---

# Sprint 08 Summary

Delivered: CLI/local/CI tooling that makes editing `data/*.json` safe and efficient, per Sprint 6's
own open question ("who authors/edits content before an admin CMS exists?") — not a CMS, and
explicitly not ROADMAP.md's Phase 14 "Admin Portal" (a future authenticated dashboard).

- **JSON validation** (`scripts/lib/validation.ts`, `npm run validate:data`) — one `zod` schema
  per data type (Business, Category, Suburb, Event, Promotion, Announcement, Settings, Metadata),
  matching `.ai/JSON_SCHEMA.md` exactly: required fields, slug/UUID identifier rules, ISO 8601
  dates, no unused fields, within-file duplicate detection, and cross-file referential integrity
  (`Business.categoryId` → `Category.id`, `Promotion.businessId` → `Business.id`). Now enforced in
  Husky pre-commit and CI — verified live by deliberately corrupting a test copy and confirming
  the commit was blocked.
- **Backup/restore** (`scripts/backup.ts`/`scripts/restore.ts`) — timestamped, git-ignored
  snapshots under `.backups/`, exercised before every real write against `data/` this sprint.
- **JSON↔CSV import/export** (`scripts/export-csv.ts`/`scripts/import-csv.ts`) — a documented
  flatten/unflatten convention (`scripts/lib/csv.ts`); round-trip verified against the real
  `data/businesses.json`, not a synthetic fixture. Import validates every row before writing.
- **Admin data scripts** (`scripts/admin.ts` — `add`/`update`/`toggle` subcommands via Node's
  built-in `parseArgs`, no new CLI dependency).
- **Seed/generator script** (`scripts/seed-generate.ts`, `scripts/seed/wordbanks.ts`) — closes the
  gap that ROADMAP.md's Phase 6 ("Populate Content") was never scheduled into any of this
  project's 10 sprints. Produces realistic, schema-valid placeholder data (25 categories, 10
  suburbs, configurable business/event/promotion/announcement counts) — built and proven (a full
  100-business/25-category run was generated and validated), but **deliberately not run against
  the real `data/` directory** — that decision is left open for the project owner, per this
  sprint's own notes.md.
- **Data migration helper** (`scripts/migrate-add-price-range.ts`) — one small, mechanical,
  actually-executed example: added `Business.priceRange` (optional, `"$"`/`"$$"`/`"$$$"`,
  backfilled to `"$$"`) and bumped `metadata.json`'s `schemaVersion` to `1.3.0`. Explicitly
  distinguished from Sprint 10's much larger, not-yet-implemented JSON-to-Supabase migration plan.

Key decisions:

- **New ADR-013** — documents why this sprint built local/CI tooling now rather than pulling
  forward ROADMAP.md's Phase 14 Admin Portal or a Supabase migration, both of which remain gated
  on conditions this project's own ADRs already set (validated community adoption).
- **`.ai/JSON_SCHEMA.md` gained a "Tooling" section** cross-referencing every script this sprint
  added as the operational enforcement of its Validation Rules and Definition of a Valid JSON
  File sections — a deliberate documentation decision, not left unconsidered.
- **Seed generator writes to git-ignored scratch space by default**, requiring an explicit
  `--target=data` flag (never passed in this sprint) to touch the real dataset — protects the
  project owner's open decision about when/whether to populate `data/` at production scale.

Two real bugs found and fixed along the way:

1. `zod` v4's `z.uuid()` performs strict RFC 9562/4122 version+variant validation, not a loose
   hex-shape check — several early test fixtures with hand-patterned "UUIDs" failed validation.
   Fixed by using real `crypto.randomUUID()` output in test fixtures.
2. The standard `import.meta.url === \`file://${process.argv[1]}\`` "was this script run
   directly" check silently fails whenever the project path contains spaces — this project's own
   path does. `npm run backup:data` produced no output and wrote nothing. Fixed with a shared
   `scripts/lib/isMainModule.ts` using `pathToFileURL`; documented as a new Framework Gotcha in
   `AI_MEMORY.md`.

`npm run lint`, `typecheck`, `test` (121 unit/integration tests), `build`, and the full Playwright
suite (66 Chromium tests, re-run after the migration helper changed real data) all pass.

**Known limitation, disclosed not hidden:** the seed generator was not run against the real
`data/` directory at production scale (see above) — this is a deliberate, open decision for the
project owner, not an oversight. The new CI "Validate data" step also hasn't been exercised on a
live GitHub Actions run yet, since nothing was pushed in this session.

Full plan: `sprints/sprint-08-admin/`.

---

# Sprint 07 Summary

Delivered: a project-wide, measured hardening pass against ARCHITECTURE.md's Performance
Targets across all 5 major routes (homepage/community page, `/businesses`, `/category/[slug]`,
`/business/[slug]`, `/search`) — a documented Lighthouse (mobile + desktop) and axe-core
baseline taken before any fix, nine root-caused defects found and fixed, a custom 404 page and
error boundaries, consistent skeleton loading states, site-wide SEO metadata, and cross-browser
Playwright coverage (Chromium/Firefox/WebKit).

Key decisions:

- **New ADR-012** — requires measured before/after evidence for any future performance,
  accessibility or SEO claim, formalising the discipline this sprint was built around after two
  of its own fixes (see below) demonstrated why "looks fine" isn't sufficient.
- **`htmlLimitedBots: /.*/ ` in `next.config.ts`** — Next.js 15.2+ streams `generateMetadata()`
  output to real browsers and only renders it synchronously for recognised bot user agents; this
  project's metadata resolves instantly from local JSON, so the streaming trade-off had no
  upside and was actively hiding a real SEO gap from Lighthouse's own audit UA. New Framework
  Gotcha in `AI_MEMORY.md`.
- **Homepage moved into `app/(home)/`** — a root-level `app/loading.tsx` was found to cascade to
  *every* route without its own more specific `loading.tsx`, silently reintroducing the
  `loading.tsx`/`notFound()` soft-404 bug on `/business/[slug]` and `/category/[slug]` even
  though neither folder was touched. A route group scopes the loading boundary to just the
  homepage without changing the `/` URL. New Framework Gotcha in `AI_MEMORY.md`.
- **Colour tokens darkened, light mode only** — `--secondary`, `--success`, `--destructive` and
  `--muted-foreground` all failed WCAG AA 4.5:1 for the text rendered on them; each darkened by
  one Tailwind shade. Dark mode was left untouched since no reachable toggle exists yet.
- **`framer-motion` and `zod` were reviewed but not removed** despite zero imports anywhere —
  both were deliberately pre-installed in Sprint 1 for documented future use, and `zod` is
  explicitly planned for Sprint 08's JSON validation work. Removing either would have
  contradicted an existing plan, not fixed dead code.

Two real regressions were introduced by this sprint's own fixes and caught within the same
sprint, precisely because of the measure-fix-remeasure discipline (see ADR-012):

1. The root-level `loading.tsx` soft-404 cascade described above (Loading States step).
2. `/search`'s own new loading skeleton caused CLS to spike to 0.275 (root cause: the skeleton
   first assumed a results grid the page doesn't show by default, then under-reserved space for
   filter chips that wrap across several lines at mobile widths) — fixed down to 0.025
   (Performance Profiling step, discovered via a full route re-measure after the prior step).

Other defects found and fixed: a sitewide missing favicon (Best Practices 96 → 100 on every
route); two accessibility issues present on every route (`Footer.tsx`'s social icons used
`aria-label` on a roleless `<span>`; four colour tokens under WCAG AA contrast); a horizontal
overflow at exactly the tablet breakpoint on every route (Footer's Contact column had no
`min-w-0`, so a long email address refused to wrap); and the skip-to-content link only scrolled
to `<main>` without moving keyboard focus there (missing `tabIndex={-1}`).

`npm run lint`, `typecheck`, `test` (80 unit tests), `test:e2e` (198 test instances across
Chromium/Firefox/WebKit — 186 passed, 12 documented browser-limitation skips), and `build` all
pass. Final scores: Performance 96-100, Accessibility 100, Best Practices 100, SEO 100, CLS
≤0.025 on every route (mobile and desktop).

**Known limitation:** mobile LCP sits at or just above ARCHITECTURE.md's 2.5s target on all 5
routes (desktop LCP is comfortably under 0.7s everywhere) — root-caused to text-element render
delay under Lighthouse's simulated mobile CPU/network throttle, not a specific code defect this
sprint found a further fix for without fighting Next.js's own rendering pipeline for an
unverified, marginal gain. A real screen-reader spot-check, Google's Rich Results Test and a
Vercel preview check were also not performed — no assistive technology, public URL, or Vercel
deployment available in this environment respectively. All three are disclosed in
`sprints/sprint-07-quality/retrospective.md`'s Carry Forward rather than silently marked done.

Full plan: `sprints/sprint-07-quality/`.

---

# Sprint 06 Summary

Delivered: six new homepage sections giving residents a reason to visit without a specific
business need — Community Events, Local Promotions, a Community Noticeboard (Announcements),
a unified Featured Content mechanism, a Community Spotlight, and a "coming soon" Local News
placeholder. All content is sourced from JSON via dedicated repositories
(`EventRepository`, `PromotionRepository`, new `AnnouncementRepository`).

Key decisions:

- **Deliberately activated Version-4/"(Future)" scope early** — the Event and Promotion
  schemas (JSON_SCHEMA.md) were pulled forward from Version 4 at the project owner's explicit
  direction, not discovered mid-sprint scope creep. Documented in DECISIONS.md ADR-011;
  PROJECT.md and ROADMAP.md updated to match what's actually shipped.
- **New Announcement schema** — no prior precedent; deliberately includes a `featured` field
  beyond the sprint's original minimal field list, since the Featured Content mechanism
  needs to query all three content types (events, promotions, announcements) for
  `featured: true` consistently.
- **One Featured Content mechanism, not three** — `lib/services/featuredContentService.ts`
  aggregates `featured: true` records across all three repositories into a single normalised
  shape, rendered by one `FeaturedContentCard`, per the sprint's DRY requirement.
- **`lib/services/resolvePromotionBusinesses.ts`** — extracted shared "resolve a promotion's
  `businessId`, omit if dangling" logic once both the Promotions section and the Featured
  Content aggregator needed it, rather than duplicating it.
- **New `BusinessRepository.getById()`** — needed to resolve a promotion's `businessId` back
  to a business name/slug; mirrors the existing `getBySlug()`.

Bug found while writing Playwright coverage (not caught by unit tests): `LocalNewsPlaceholder`
used `CardTitle` for its "Local news" heading — `CardTitle` renders a styled `<div>`, not a
real heading element, so it wasn't reachable via `getByRole("heading")` and broke the page's
heading hierarchy. Fixed by using a real `<h2>`, consistent with every other new section.

`npm run lint`, `typecheck`, `test` (80 unit tests), `test:e2e` (29 Playwright tests), and
`build` all pass. Verified visually via the dev server (all six sections render with real
seed data, promotion → business links resolve correctly, no console errors) and via Playwright
across the existing mobile-viewport test.

**Known limitation:** genuine "zero active records" empty-state e2e coverage wasn't added —
these are Server Components reading JSON at module scope with no per-test data-injection seam,
and building one felt like infrastructure this sprint didn't call for. The underlying logic is
covered at the repository/unit level (`getUpcomingEvents([])` → `[]`, etc.); the empty-state UI
itself reuses the same `EmptyState` component already exercised by Sprint 3/5 Playwright
coverage.

Full plan: `sprints/sprint-06-community/`.

---

# Sprint 05 Summary

Delivered: `/search` — keyword, category and suburb search with instant, client-side filtering (per ARCHITECTURE.md's Search Architecture), a typeahead suggestions combobox (keyboard-navigable: Arrow Up/Down, Enter, Escape), optional recent-searches (localStorage, low priority per plan), and a shareable/bookmarkable URL (query params synced via `history.replaceState`, not a server round-trip per keystroke). Homepage Hero's search box now really submits to `/search` (`<form action="/search">`).

Key decisions:

- **New `lib/services/searchService.ts`** — pure `searchBusinesses()` / `getSearchSuggestions()` functions, deliberately separate from `BusinessRepository.getPage()` (server-side, URL-searchParams-driven) since search must run client-side for the "instant" feel; category/suburb matching semantics were kept intentionally identical between the two so results don't diverge.
- **New `SuburbRepository`** — `data/suburbs.json` was empty since Sprint 1; populated with the 5 real suburbs already referenced in sample business data (Schofields, Tallawong, The Ponds, Box Hill, Kellyville) since suburb search needed real data to search against.
- **`useDeferredValue`** on the query input, so typing stays responsive as the architecture scales, without hand-rolled debounce logic.

Bug found and fixed during visual verification (not caught by unit tests until added retroactively): **searching "cafe" returned zero results** even though "The Local Grind Café" clearly matches — the sample data uses accented characters ("Café", "Cafés & Restaurants") but the naive substring match was case-sensitive to diacritics too. Fixed by adding Unicode NFD-normalization + diacritic-stripping to the match function, with a regression test covering both accented and unaccented queries.

Second bug found while writing Playwright tests: pressing **Escape** to dismiss suggestions permanently disabled them from ever reappearing while typing (a single `isFocused` boolean was conflating "has DOM focus" with "should show suggestions"). Fixed by renaming to `isSuggestionsOpen` and having `onChange` re-open it on every keystroke.

`npm run lint`, `typecheck`, `format:check`, `test` (46 unit tests), `test:e2e` (28 Playwright tests), and `build` all pass. Verified visually (desktop + mobile), keyboard navigation through the suggestions listbox (`aria-activedescendant` updates correctly), heading hierarchy, and the homepage-to-search form submission end to end.

Full plan: `sprints/sprint-05-search/`.

---

# Backlog (not yet scheduled into any sprint)

Most items previously tracked here (Announcement.sourceUrl, business data completeness, the fake
`data/events.json` content, the Popular Categories `featured`-flag mismatch) have been
consolidated into Sprint 09b's plan — see `sprints/sprint-09b-content-cleanup/`, specifically
`backlog.md` for the per-item breakdown and `notes.md` for exact technical scope. (Footer social
link placeholders — also originally listed here — were resolved directly, ahead of Sprint 09b:
the placeholders were removed outright rather than wired up with real links; see Sprint 09b's
`notes.md` F-006 for the record.)

- **Error monitoring (Sentry)** — deferred during Sprint 09 (Production Readiness), 2026-07-14.
  The project owner chose not to set up a Sentry account rather than block the rest of that
  sprint on it. When picked up: install Sentry per `.ai/DEPLOYMENT.md`'s "Observability" section,
  set `SENTRY_DSN` in Vercel's environment variables, deliberately trigger a real production
  error, and confirm it reaches the Sentry dashboard — "wired up" and "verified receiving real
  events" are two separate checkboxes, per Sprint 09's own Definition of Done. See
  `sprints/sprint-09-production/review.md`/`retrospective.md` for full context.

Add new small, concrete, not-yet-scheduled requirements here as they come up; fold them into a
future sprint's plan once there's enough to justify one.

---

# Next Sprint (not started — do not begin without explicit instruction)

Sprint 09b — Content Cleanup. Full plan: `sprints/sprint-09b-content-cleanup/`. Queued directly
after Sprint 09 per the project owner's explicit sequencing decision (2026-07-09) — not a
technical dependency, the two sprints are independent of each other.

Sprint 10 — Future Platform Foundation remains the sprint after that.

---

# After Completing This Sprint

Stop.

Do not continue to Sprint 09b.

Wait for explicit instruction before implementing additional features.

Never implement future roadmap items without explicit instruction.

# Sprint 07 — Review

Quality & Performance

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Image Optimisation Audit

Only two components render real images via `next/image`: `EventCard.tsx` (Community Events, homepage) and `Gallery.tsx` (business detail page) — every other card (`BusinessCard`, `PromotionCard`, `AnnouncementCard`, `FeaturedContentCard`) is text-only by design, so there is nothing to optimise there. Both existing usages already use `fill` inside an explicitly-sized `aspect-video` container (preventing CLS) with correct `sizes` for their grid layout, and rely on Next's default lazy loading since neither is the measured LCP element on any route (confirmed: the LCP element on every route is text — see the Performance Profiling findings below). Lighthouse's image-specific audits (`uses-responsive-images`, `modern-image-formats`, `uses-optimized-images`, `unsized-images`, `offscreen-images`) all scored a perfect 1 on every route in the baseline, before any fix. **No code changes were needed** — recorded here as a measured "no defects found" outcome, not skipped.

---

# Performance Profiling

**Client Components audit:** all 5 existing Client Components remain justified against ADR-005 — `Navigation.tsx` (mobile drawer `useState`), `ShareButton.tsx` (Web Share API/clipboard), `SearchExperience.tsx`/`SearchSuggestions.tsx`/`RecentSearches.tsx` (typeahead state, keyboard nav, localStorage). None converted or trimmed; none identified as unnecessarily Client.

**Unused dependencies reviewed, none removed:** `framer-motion` and `zod` have zero imports anywhere in the codebase today. Checked whether this makes them dead weight before removing anything — `sprints/sprint-01-foundation/notes.md` deliberately installed both ahead of use ("Framer Motion | Animation (used sparingly, from Sprint 2 onward)", "zod | Runtime validation (repository layer input validation)"), and `sprints/sprint-08-admin/notes.md` (the very next sprint) explicitly plans to use `zod` for JSON schema validation, reusing the already-installed library rather than adding a new one. Since neither is ever imported, neither is actually present in the client/server bundle regardless of `package.json` — Lighthouse's bundle-size-related audits are unaffected either way. Removing `zod` now would directly contradict Sprint 08's documented plan, so **left both in place** — a reviewed, not silently skipped, decision.

**LCP investigation (found in the baseline, root-caused here):** the LCP element on every route is text (the page's `<h1>`), not an image — confirmed via Lighthouse's `largest-contentful-paint-element` audit. 84% of the homepage's mobile LCP time is "Render Delay" (TTFB + one small render-blocking CSS chunk + main-thread work), not resource loading. This is consistent with Lighthouse's simulated mobile throttle (Slow 4G + 4x CPU) applied to a Next.js app's baseline hydration cost, not a code-level defect specific to this project — `bootup-time` (0.2s) and `mainthread-work-breakdown` (0.5s) are both modest, and the one render-blocking CSS resource costs ~157ms. No further fix was identified that wouldn't mean fighting Next.js's own architecture (e.g. artificially deferring necessary CSS) for a marginal, unverified gain — flagged as a residual, largely environmental gap rather than silently declared "fixed."

**Real CLS regression found and fixed** (via a full route re-measure after the loading-states step): `/search` scored **CLS 0.275** — far above the 0.1 target — introduced by this sprint's own `app/search/loading.tsx`. Root cause, found in two rounds of measurement:
1. The skeleton originally rendered a full `BusinessCardSkeletonGrid`, assuming `/search` shows all businesses by default. It doesn't — `SearchExperience`'s actual default state (no query/category/suburb yet, which is what nearly every navigation to `/search` lands on) shows only the search input, filter chips and one line of prompt text, no results grid. Removing the card grid brought CLS down to 0.122 — better, still failing.
2. The remaining gap: real category/suburb filter chips wrap across multiple lines at mobile widths because several labels are long ("Landscaping & Gardening", "Cafés & Restaurants", "Builders & Renovations"), while the skeleton's short, uniform placeholder pills didn't wrap the same way and under-reserved vertical space. Fixed by measuring the real rendered chip-row heights directly (Playwright, 412px viewport: category row ≈120px, suburb row ≈56px) and setting matching `min-h` on the skeleton's chip-row containers, instead of trying to visually replicate individual chips.

Re-measured after the fix: `/search` CLS 0.275 → 0.122 → **0.025**, Performance 81 → 92 → **96**. Full Playwright suite (60 tests) re-run with no regressions. This is exactly the "fixing one dimension can regress another" risk this sprint's own notes.md called out — caught by re-measuring after the loading-states step rather than waiting for the final sweep.

---

# Purpose

Track review status for Sprint 7 work against REVIEW_CHECKLIST.md, and — because this sprint's entire premise is measured evidence over subjective judgement — record the actual before/after Lighthouse and accessibility numbers that prove the Definition of Done was met. Fill in as Pull Requests are opened and reviewed, and as measurements are actually taken. Do not pre-fill outcomes or scores before the work exists.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Review Checklist (per REVIEW_CHECKLIST.md)

Apply this to every Pull Request in this sprint, in order. Where an item concerns performance, accessibility or SEO, resolve it with a recorded measurement, not a subjective read of "looks fine."

1. **Requirements** — Matches this sprint's tasks.md; no new business-facing features, no site-wide SEO infrastructure, no admin tooling snuck in.
2. **Architecture** — Fixes respect the existing Repository Pattern and layer separation; no fix reaches into a JSON file directly or bypasses a repository to "just make it faster."
3. **Design** — Error pages and loading states match DESIGN_SYSTEM.md's existing Card/Button/Container patterns and "Error States"/"Loading States" guidance; no new visual language introduced.
4. **Components** — Error boundaries and loading skeletons are self-contained and reusable across routes, not duplicated per page.
5. **TypeScript** — Strict mode, no `any`, explicit typing for any new error-handling or loading-state utilities.
6. **Readability** — Fix commits are self-explanatory; each addresses one fix area (per tasks.md), not a mixed bag of unrelated changes.
7. **Performance** — Every performance-related claim in this PR is backed by a recorded before/after Lighthouse/Core Web Vitals number in this document, not a subjective impression.
8. **Accessibility** — Every accessibility-related claim in this PR is backed by a recorded before/after automated audit result plus a manual keyboard/screen-reader confirmation, not a subjective impression.
9. **Responsive** — Verified at mobile, tablet, desktop, large desktop, with any defect found and fixed recorded in the Findings Log below.
10. **Security** — No error page or boundary exposes stack traces, internal paths, or other technical details in production output.
11. **Data** — No repository or schema changes introduced by this sprint's fixes; if one is needed, it is flagged rather than silently added.
12. **Testing** — Playwright coverage for the 404 page, error boundaries and loading states passes; final re-measure Playwright run shows no console errors across all routes.
13. **Documentation** — This document (review.md) contains actual recorded scores, not placeholders, before Definition of Done is marked satisfied.
14. **Git** — Conventional Commit messages; one fix area per commit where practical, per the AI Development Plan.

---

# Testing Plan (execution record)

## Lighthouse Scores

Record actual scores. Do not leave placeholders unfilled at sprint close — an unmeasured route has not been verified against ARCHITECTURE.md's targets.

Measured via `npx lighthouse` (v12) against a real production build (`npm run build && npm run start`) on the developer's machine, headless Chrome, default mobile emulation (Slow 4G / 4x CPU throttle) and `--preset=desktop`. **"Community page" is the same URL as Homepage (`/`)** — Sprint 06 put every community section on the existing homepage rather than a separate route, so there is only one row set for both.

Real seeded slugs used: `/category/plumbing`, `/business/abc-plumbing`.

### Mobile

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | Target | Met? |
|-------|-------------|----------------|-----------------|-----|-----|-----|--------|------|
| Homepage / Community page | 95 | 93 | 96 | 100 | 3.0s (2.7s on repeat runs) | 0 | Perf 95+, A11y 100, BP 100, SEO 95+, LCP<2.5s, CLS<0.1 | Perf ✅ (borderline), A11y ❌, BP ❌, SEO ✅, LCP ❌, CLS ✅ |
| `/businesses` | 97 | 92 | 96 | 100 | 2.6s | 0 | same | Perf ✅, A11y ❌, BP ❌, SEO ✅, LCP ❌, CLS ✅ |
| `/category/[slug]` | 98 | 92 | 96 | 100 | 2.5s | 0 | same | Perf ✅, A11y ❌, BP ❌, SEO ✅, LCP ❌ (at threshold), CLS ✅ |
| `/business/[slug]` | 98 | 93 | 96 | 91 | 2.4s | 0 | same | Perf ✅, A11y ❌, BP ❌, SEO ❌, LCP ✅, CLS ✅ |
| `/search` | 98 | 96 | 96 | 100 | 2.5s | 0 | same | Perf ✅, A11y ❌, BP ❌, SEO ✅, LCP ❌ (at threshold), CLS ✅ |

### Desktop

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|-------|-------------|----------------|-----------------|-----|-----|-----|
| Homepage / Community page | 100 | 92 | 96 | 100 | 0.6s | 0 |
| `/businesses` | 100 | 91 | 96 | 100 | 0.6s | 0.006 |
| `/category/[slug]` | 100 | 91 | 96 | 100 | 0.5s | 0 |
| `/business/[slug]` | 100 | 93 | 96 | 91 | 0.6s | 0 |
| `/search` | 100 | 96 | 96 | 100 | 0.5s | 0 |

### Baseline findings (root causes, not just scores)

- **Accessibility (every route):**
  - `aria-prohibited-attr` (serious) — `Footer.tsx`'s social-icon placeholders render `<span aria-label="...">` with no role; a plain `<span>` cannot carry `aria-label`. Fix: Accessibility Fixes step.
  - `color-contrast` (serious) — three design tokens fail WCAG AA 4.5:1 for normal text: `--secondary` (#0d9488 teal, used by the default Button variant and Badge secondary variant) at 3.74:1 against white text; `--success` (#16a34a green, "Verified" badge) at 3.29:1; `--destructive` (#dc2626 red, "Important"/destructive badge text) at 4.13:1. Also `--muted-foreground` (resolves to #737373) against `--muted` (#f5f5f5) on the directory sort-control chips, at 4.34:1 (Lighthouse only; axe did not flag this specific pair). Fix: Accessibility Fixes step.
- **Best Practices (every route) — FIXED during baseline triage:** `errors-in-console` — the browser's automatic `/favicon.ico` request 404s (no favicon existed anywhere in the project). Added `app/icon.svg` (brand mark reusing `Logo.tsx`'s `MapPinHouse` glyph and `--primary` blue) and `app/favicon.ico` (rendered from the SVG via headless Chromium, packaged with `png-to-ico`). Re-measured: Best Practices 96 → 100 on `/business/[slug]` (spot check); confirmed no console errors on all routes.
- **SEO (`/business/[slug]` only, 91 not 95+) — FIXED during baseline triage:** root cause was **not** a missing tag — `generateMetadata`'s title/description/Open Graph output was present in the raw HTML but never reached the live `<head>` for a normal browser request. Confirmed via Playwright (`page.$$eval("head meta", ...)` after `networkidle`) that the tags were completely absent post-hydration, and via raw-response inspection that they were embedded in a deferred `$RC(...)` streaming-SSR script instead of `<head>`. This is a known, Vercel-acknowledged Next.js 15.2+ behavior ([discussion #81452](https://github.com/vercel/next.js/discussions/81452), [issue #79313](https://github.com/vercel/next.js/issues/79313)): `generateMetadata()` output is streamed to real browser user agents and only rendered synchronously for user agents matched by the `htmlLimitedBots` config (Googlebot, Bingbot, Slackbot, etc. by default) — Lighthouse's own UA isn't on that list, so its own SEO audit was measuring the degraded, streamed path. Fix: set `htmlLimitedBots: /.*/` in `next.config.ts` so every request gets synchronous metadata — this project's data resolves instantly from local JSON, so the streaming optimisation traded away reliability for a speed benefit that doesn't exist here. Re-measured: SEO 91 → 100, Best Practices 96 → 100 (same rebuild) on `/business/[slug]`.
- **LCP (mobile, homepage/businesses/category/search all at or above 2.5s):** the LCP element on the homepage is the hero `<h1>` (plain text, no image) — 84% of the mobile LCP time is "Render Delay," not resource load. One render-blocking CSS chunk costs ~157ms; the rest is consistent with hydration/main-thread cost under Lighthouse's simulated mobile CPU throttle (4x). To investigate further in the Performance Profiling step (whether `Hero` or its ancestors carry unnecessary Client Component hydration on the critical path).

## Automated Accessibility Audit (axe-core or equivalent)

Measured with `tests/e2e/accessibility.spec.ts` (`@axe-core/playwright`, `wcag2a`/`wcag2aa`/`wcag21a`/`wcag21aa` tags), after the favicon/metadata-streaming fixes above but before the Accessibility Fixes step — this isolates the two remaining, unfixed accessibility findings.

| Route | Critical/Serious Violations (before fixes) | Critical/Serious Violations (after fixes) |
|-------|----------------------------------------|----------------------------------------|
| Homepage | 2 types — `aria-prohibited-attr` (2 nodes), `color-contrast` (14 nodes) | 0 |
| `/businesses` | 1 type — `aria-prohibited-attr` (2 nodes) | 0 |
| `/category/[slug]` | 2 types — `aria-prohibited-attr` (2 nodes), `color-contrast` (4 nodes) | 0 |
| `/business/[slug]` | 2 types — `aria-prohibited-attr` (2 nodes), `color-contrast` (2 nodes) | 0 |
| `/search` | 1 type — `aria-prohibited-attr` (2 nodes) | 0 |
| Community page | (same URL as Homepage) | (same URL as Homepage) |

`aria-prohibited-attr` reproduces on every route because `Footer.tsx` renders sitewide. Both violation types trace back to the same two root causes recorded above (Footer's `<span aria-label>` icons; the `--secondary`/`--success`/`--destructive` colour tokens).

### Fixes applied

- `components/layout/Footer.tsx`: added `role="img"` to the social-icon placeholder `<span>`s so their `aria-label` is valid (a plain `<span>` has no implicit role that permits `aria-label`).
- `app/globals.css` (light mode only — dark mode has no reachable toggle yet, so it wasn't measured/touched):
  - `--secondary` `#0d9488` → `#0f766e` (teal-700): 3.74:1 → 5.47:1 against white text.
  - `--success` `#16a34a` → `#15803d` (green-700): 3.29:1 → 5.02:1 against white text ("Verified" badge).
  - `--destructive` `#dc2626` → `#b91c1c` (red-700): 4.13:1 → 5.54:1 against its light background ("Important"/destructive badge text).
  - `--muted-foreground` `oklch(0.556 0 0)` (#737373) → `oklch(0.45 0 0)`: 4.34:1 → verified ≥4.5:1 against `--muted` (directory sort-control chips).

Re-ran `tests/e2e/accessibility.spec.ts` and Lighthouse (accessibility category) after these fixes: all 5 routes now score **Accessibility 100** and axe-core reports **zero** critical/serious violations. Full Playwright suite (34 tests) re-run with no regressions.

**Not performed (disclosed, not silently skipped):** no real screen-reader spot-check was done — there is no VoiceOver/NVDA available in this environment. The automated axe-core pass plus a manual read-through of heading hierarchy/contrast/alt text is the closest available substitute; a genuine keyboard-only pass is still owed and will be added as part of this same step's Playwright coverage below.

Manual Testing

- [x] Keyboard-only pass completed for all routes (automated proxy — see Automated Accessibility Audit above).
- [ ] Screen reader spot-check completed for all routes — **not performed**, no VoiceOver/NVDA available in this environment; disclosed, not silently skipped.
- [x] Cross-browser check completed (Chrome, Firefox, Safari) per TESTING.md "Browser Support." Added `firefox`/`webkit` projects to `playwright.config.ts` and ran the full suite (198 test instances) across all three. Two real, disclosed browser-specific findings, both testing-infrastructure limitations rather than app defects:
  - **WebKit's Tab order excludes links by default** (only form controls are tabbable unless the user enables macOS's "Full Keyboard Access") — a long-standing WebKit/Safari default that real Safari users experience identically, not something page HTML/CSS can override. The 6 keyboard-navigation tests (`accessibility.spec.ts`) are skipped on `webkit` with this reasoning documented inline, rather than chasing a page-level "fix" for a browser default.
  - **Clipboard permission grants (`context.grantPermissions(["clipboard-read","clipboard-write"])`) are Chromium-only in Playwright** — Firefox and WebKit have no equivalent permission API. `business-detail.spec.ts`'s pre-existing (Sprint 4) share-button test is skipped on `firefox`/`webkit` with this reasoning documented inline; the `ShareButton` feature itself isn't Chromium-specific, only Playwright's ability to mock the permission is.
  - No other cross-browser defects found — everything else (198 − 12 skipped = 186 tests) passes identically across Chrome, Firefox and Safari.
- [x] Custom 404 page reviewed for tone and clarity (explains problem, suggests next step, no technical details). `app/not-found.tsx`: "We couldn't find that page" + one sentence + "Return home"/"Browse businesses" actions. Verified `response.status()` stays 404 for an unknown route, an invalid business slug, and an invalid category slug (curl + the existing Playwright regression tests) — confirms the new page doesn't reintroduce the `loading.tsx`/`notFound()` soft-404 gotcha documented in `AI_MEMORY.md`, since no `loading.tsx` was added to any segment that calls `notFound()`.
- [x] Error boundaries reviewed for the same. `app/error.tsx` (route-segment, Client Component, "Try again" calls `reset()`, logs to console only per ARCHITECTURE.md's "Logging" — central reporting is Sprint 9) and `app/global-error.tsx` (Client Component, renders its own `<html>/<body>`, deliberately imports no shared app components so it can survive a root-layout failure). Neither exposes `error.message` or a stack trace. Now exercised by `tests/e2e/error-pages.spec.ts` via a minimal, dedicated `app/test-error/page.tsx` that unconditionally throws (`export const dynamic = "force-dynamic"` so it throws at request time, not build time) — there's no way to make a Server Component reading static JSON throw via Playwright's network-layer interception, so a small dedicated test route is the pragmatic mechanism.
- [x] Loading states reviewed across homepage, business detail, search and community page — no blank screens observed. Added `app/(home)/loading.tsx` (homepage/community page, moved into a route group — see below) and `app/search/loading.tsx`, both reusing `app/businesses/loading.tsx`'s existing `Skeleton`/`BusinessCardSkeletonGrid` pattern rather than inventing a new one. **Deliberately no `loading.tsx` for `/business/[slug]` or `/category/[slug]`** — both call `notFound()`, and both read static JSON with no meaningful loading window, so the cost of the (safe) omission is negligible.
  - **Real regression found and fixed:** a root-level `app/loading.tsx` cascades to *every* route without its own more specific `loading.tsx` — it silently reintroduced the soft-404 bug on `/business/[slug]` and `/category/[slug]` even though neither folder was touched, because neither had a `loading.tsx` of its own to shadow the root one. Confirmed via `curl -o /dev/null -w "%{http_code}"`: both routes briefly returned 200 instead of 404 for an invalid slug. Fixed by moving the homepage into `app/(home)/page.tsx` + `app/(home)/loading.tsx` (a route group — doesn't change the `/` URL, does scope the Suspense boundary to just that group). Re-verified all four routes (200/200/404/404) and the full Playwright suite (60 tests) after the fix. Documented as a new Framework Gotcha addendum in `AI_MEMORY.md`.
- [x] Per-page SEO reviewed (titles, meta descriptions, Open Graph, structured data, heading hierarchy) for all routes. Root `layout.tsx` gained `metadataBase`, a site-wide `openGraph` default (siteName/type/locale, inherited by pages that don't override it) and a Twitter card default (Next.js was already auto-deriving basic Twitter tags from `openGraph`, confirmed via raw HTML — no gap there, just made it explicit). Every route now sets `alternates.canonical` (`/businesses` and `/search` canonicalise all filter/query variations to the bare page, matching how each is a client-side filter utility, not per-query indexable content). `/business/[slug]`'s own `openGraph` replaces rather than merges with the root default (Next.js doesn't deep-merge nested metadata objects), so `siteName`/`type`/`locale` were repeated there too — confirmed via raw HTML that `og:site_name` was missing before this fix and present after. Re-measured: **SEO 100 and Best Practices 100 on all 5 routes.**
- [x] Sprint 4's `LocalBusiness` structured data re-validated — structurally, against schema.org's `LocalBusiness` properties (`@context`/`@type`/`name`/`description`/`url`/`image`/`telephone`/`email`/`address` as `PostalAddress`/`geo` as `GeoCoordinates`/`openingHoursSpecification`): all present and correctly shaped, no gaps found in `lib/services/structuredData.ts`. **Not performed:** an actual Google Rich Results Test run — that tool needs a public URL (or manual paste of fetched HTML through Google's web UI), and this site isn't deployed; disclosed rather than claimed.

Playwright

- [x] Invalid route/slug renders the custom 404 page, no console errors. `tests/e2e/error-pages.spec.ts` (filters out Chrome's expected "Failed to load resource ... 404" console message for the page's own top-level response, which every real 404 page triggers — anything else would still fail the assertion).
- [x] Error boundary renders the friendly fallback when triggered. `tests/e2e/error-pages.spec.ts`, via `app/test-error/page.tsx`.
- [x] Loading states render during navigation to homepage, business detail, search, community page. `tests/e2e/loading-states.spec.ts` covers homepage and search (the two routes with a `loading.tsx`) via CDP network throttling (Chromium-only) — confirms the skeleton renders into the DOM, then real content replaces it. Business detail/category deliberately have no `loading.tsx` (see above), so there's nothing to exercise there.
- [x] No console errors across all major routes. Covered by the existing per-route Playwright specs (`homepage.spec.ts`, `directory.spec.ts`, `business-detail.spec.ts`, `search.spec.ts`), all still passing after every fix in this sprint.

Responsive Testing

Automated via `tests/e2e/responsive.spec.ts` (checks `document.documentElement.scrollWidth <= clientWidth` — objective, per TESTING.md's note that Visual Regression beyond this is still "Future"), across all 5 routes:

- [x] Mobile (375px)
- [x] Tablet (768px) — found and fixed a real defect, see Findings Log.
- [x] Desktop (1280px)
- [x] Large Desktop (1536px+)

---

# Release Checklist (pre-merge to `main`)

- [ ] Build succeeds.
- [ ] Lint succeeds.
- [ ] Type checking succeeds.
- [ ] Responsive verification completed.
- [ ] Accessibility review completed, with recorded before/after scores.
- [ ] Performance review completed, with recorded before/after scores.
- [ ] Documentation updated (this file, notes.md, TODO.md/CONTEXT.md as needed).
- [ ] No critical or high review findings remain open.
- [ ] Definition of Done (see README.md) satisfied — measured scores meet ARCHITECTURE.md's targets, not just "look" acceptable.
- [ ] Vercel preview deployment verified.

---

# Findings Log

Record review findings here as they're raised, using REVIEW_CHECKLIST.md severity levels (Critical / High / Medium / Low).

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| Medium | Horizontal overflow at exactly the tablet breakpoint (768px) on every route (scrollWidth 813 vs clientWidth 768) | `components/layout/Footer.tsx` | Root cause: the Contact column is a `flex flex-col` child with no `min-w-0`, and Tailwind's `md:grid-cols-4` (768px+) narrows it to ~150px while the contact email (`community@akunavista.example`, 29 chars) refuses to wrap — flex items default to `min-width: auto`. Fixed by adding `min-w-0` to the column and `break-all` to the email link (`shrink-0` added to the icon so it doesn't get squeezed). Verified via new `tests/e2e/responsive.spec.ts` (20 tests: 5 routes × 4 breakpoints), all passing after the fix. |

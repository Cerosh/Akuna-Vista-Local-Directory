# Sprint 07 — Review

Quality & Performance

Owner: Cerosh Jacob

Last Updated: 2026-07-06

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

- [ ] Keyboard-only pass completed for all routes.
- [ ] Screen reader spot-check completed for all routes.
- [ ] Cross-browser check completed (Chrome, Firefox, Safari) per TESTING.md "Browser Support."
- [ ] Custom 404 page reviewed for tone and clarity (explains problem, suggests next step, no technical details).
- [ ] Error boundaries reviewed for the same.
- [ ] Loading states reviewed across homepage, business detail, search and community page — no blank screens observed.
- [ ] Per-page SEO reviewed (titles, meta descriptions, Open Graph, structured data, heading hierarchy) for all routes.
- [ ] Sprint 4's `LocalBusiness` structured data re-validated with Google's Rich Results Test.

Playwright

- [ ] Invalid route/slug renders the custom 404 page, no console errors.
- [ ] Error boundary renders the friendly fallback when triggered.
- [ ] Loading states render during navigation to homepage, business detail, search, community page.
- [ ] No console errors across all major routes.

Responsive Testing

- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1280px)
- [ ] Large Desktop (1536px+)

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
| | | | |

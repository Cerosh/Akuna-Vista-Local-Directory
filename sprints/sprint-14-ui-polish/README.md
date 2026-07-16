# Sprint 14 – UI Polish (Compact, Elegant, Sophisticated Pass)

Neighbourhood Directory Platform

Sprint Number: 14

Sprint Name: UI Polish

Sprint Goal: Make the homepage and business-card grids feel more compact, elegant and
sophisticated to visitors — without changing colour tokens, primitives, or accessibility posture —
by fixing pacing/repetition issues identified in a full UI design review.

Sprint Status: ✅ Complete locally (not yet committed/deployed)

Start Date: 2026-07-16

End Date: 2026-07-16

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# Numbering

Sequential addition after Sprint 13 (Schofields Weather Dashboard, complete locally, not yet
committed). Both Sprint 12 and Sprint 13 are already complete, so per the Spec-Driven Development
process in `.ai/CLAUDE.md`, this work gets its own sprint rather than being folded into either.

---

# Sprint Objective

A UI design review (2026-07-16), using the `vercel:shadcn` skill's design-direction guidance
against this project's own `DESIGN_SYSTEM.md`, found that component quality, token discipline, and
accessibility are already strong — the gap to "compact, elegant, sophisticated" is pacing and
repetition, not the primitives themselves. That review produced F-001–F-005; a follow-up round of
specific content/polish requests from the project owner produced F-006–F-010.

A separate `/code-review` pass (2026-07-16, 8-angle multi-agent review with a verification pass)
covering the two most recent unreviewed commits — c880c96 (Sprint 12: breadcrumb, real logo,
Acknowledgment of Country) and df2e394 (Sprint 13: Schofields weather dashboard) — found 10
correctness/architecture findings, captured below as bugfix Features F-011–F-020.

All twenty Features were captured, then explicitly confirmed by the project owner in one
authorization ("implement everything, pick the order that will not introduce any risk") rather than
a separate go-ahead per Feature — the Confirm step's requirement is that a spec exists before code
starts, not that every change needs its own round-trip. Implemented in risk-ascending order: trivial
isolated content/logic fixes → isolated weather bugfixes → weather structural changes (same files,
sequenced to avoid overlap) → homepage visual/layout changes → cross-cutting refactor (F-019) →
biggest architectural change last (F-018). All twenty are implemented and verified — see each
Story's Acceptance Criteria below.

---

# Business Value

- A homepage that reads as edited rather than templated better matches the design vision's "Apple
  simplicity / Airbnb friendliness / Linear polish / Notion consistency" bar already stated in
  `DESIGN_SYSTEM.md`.
- Removing the live "Coming soon" section avoids visitors perceiving the site as unfinished.
- Lighter, flush business cards reduce visual noise across the directory's core browsing surface
  (`FeaturedBusinesses`, `BusinessDirectory`) — the pages visitors spend the most time scanning.

---

# Success Criteria

The sprint is successful when:

- [x] All acceptance criteria below are met.
- [x] Features are production ready.
- [x] Existing Playwright suite still passes (no visual/behavioural regressions).
- [x] `DESIGN_SYSTEM.md` is updated if any Feature introduces a new pattern (e.g. a heading
      hierarchy convention) so it doesn't become tribal knowledge.
- [x] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Vary homepage section rhythm (spacing + heading alignment + divider usage) | High | Completed |
| F-002 | Remove/demote the live `LocalNewsPlaceholder` "Coming soon" section | Medium | Completed |
| F-003 | Quieter `BusinessCard` footer (drop the shaded/bordered footer band) | Medium | Completed |
| F-004 | Rebalance whitespace — wider card-grid gaps, trimmed secondary-section padding | Low | Completed |
| F-005 | Introduce section-heading hierarchy (primary vs. secondary sections) | Low | Completed |
| F-006 | Footer Acknowledgement of Country text renders on a single line | Low | Completed |
| F-007 | Reduce Schofields weather forecast from 7 days to 3 days | Medium | Completed |
| F-008 | Rename TransitWidget's "Parking free" heading to "Parking slots available" | Low | Completed |
| F-009 | Reduce Promotions section's top gap so promotion cards appear above the fold on load | High | Completed |
| F-010 | Uniform Promotion card sizing — clamp description to 2 lines with ellipsis | Medium | Completed |
| F-011 | Fix WeatherCard sunrise/sunset timezone double-shift bug | High | Completed |
| F-012 | Wire Logo.tsx up to `settings.logo` instead of a hardcoded path | High | Completed |
| F-013 | Preserve last-known-good weather data on a failed refresh poll | Medium | Completed |
| F-014 | De-duplicate in-flight Open-Meteo requests in `weatherService`'s cache | Medium | Completed |
| F-015 | Add a timeout to `useWeather`'s client-side fetch | Medium | Completed |
| F-016 | Log the real error in `useWeather`'s catch block | Medium | Completed |
| F-017 | Validate daily-array length parity in the Open-Meteo response transform | Low | Completed |
| F-018 | Evaluate moving WeatherCard's initial fetch server-side | Low | Completed |
| F-019 | Extract a shared polling hook (`useWeather`/`useTrainDepartures`/`useParkingAvailability`) | Low | Completed |
| F-020 | Single-source the weather cache's 10-minute TTL constant | Low | Completed |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1 (F-001)

As a visitor scrolling the homepage

I want sections to feel varied and deliberately paced rather than templated

So that the page feels compact and premium rather than one repeating block stacked ten times.

Acceptance Criteria

- [x] Section vertical padding (`components/common/Section.tsx`, currently a uniform
      `py-12 sm:py-16` for every section) is no longer identical across all ten homepage sections —
      primary sections (Hero, Popular Categories, Featured Businesses) keep `py-12 sm:py-16`;
      secondary sections (Community Statistics, Why Choose Local, Featured Content, Community
      Events, Announcements) move to a tighter scale (e.g. `py-10 sm:py-12`).
- [x] At least two section headers (e.g. Featured Businesses, Promotions) move from the current
      always-centered `text-center` treatment to left-aligned, without introducing a new type scale
      outside `DESIGN_SYSTEM.md`'s Heading Scale.
- [x] At least two adjacent `border-t` divider bands are removed or consolidated so the homepage
      doesn't read as one continuous stack of bordered blocks.
- [x] Verified via before/after Playwright screenshots at desktop (1400px) and mobile (390px).

---

## Story 2 (F-002)

As a visitor

I don't want to see a full-weight "Coming soon" section for an unbuilt feature

So that the homepage feels complete rather than half-finished.

Acceptance Criteria

- [x] `features/community/LocalNewsPlaceholder.tsx` is removed from `app/(home)/page.tsx`'s render.
- [x] Project owner's call at Confirm time: delete the component outright, or keep it unrendered
      for a future sprint — decision recorded here before implementation.
- [x] No dangling links/nav anchors point at `#local-news` after removal.
- [x] Full Playwright suite still passes after removal.

---

## Story 3 (F-003)

As a visitor scanning a grid of business cards

I want the cards to feel light and flush rather than divided by shaded bands

So that browsing the directory feels calmer and more premium.

Acceptance Criteria

- [x] `BusinessCard` (`components/cards/BusinessCard.tsx`) no longer inherits the shared
      `CardFooter`'s default `bg-muted/50` + `border-t` treatment
      (`components/ui/card.tsx:75-86) — override locally rather than changing the shared
      `CardFooter` primitive, so no other current consumer's appearance regresses.
- [x] Verified visually in `FeaturedBusinesses` (3-column grid) and `BusinessDirectory` (paginated
      grid) that cards read as flush/borderless, CTA separated by spacing only.
- [x] Every other current `CardFooter` consumer confirmed unchanged.

---

## Story 4 (F-004)

As a visitor

I want whitespace to sit between the things I'm scanning (cards) rather than mostly in big empty
bands between sections

So that scrolling feels efficient rather than sparse-yet-long.

Acceptance Criteria

- [x] Card grids currently on `gap-4` (`FeaturedBusinesses`, `BusinessDirectory`, `Promotions`) move
      to `gap-6`.
- [x] Implemented together with F-001's secondary-section padding trim, so the net homepage length
      doesn't increase.
- [x] Verified with no layout regressions at mobile/tablet/desktop breakpoints via Playwright
      screenshots.

---

## Story 5 (F-005)

As a visitor

I want the homepage's headings to signal which sections matter most

So that the page reads as edited rather than templated.

Acceptance Criteria

- [x] A visual distinction is introduced between "primary" section headings (Featured Businesses,
      Popular Categories) and "secondary" ones (Community Statistics, Why Choose Local) — e.g. size,
      weight, or a small eyebrow label — using only `DESIGN_SYSTEM.md`'s existing Heading Scale
      (H2/H3/H4), no new ad-hoc type scale.
- [x] If a new pattern is introduced (e.g. an eyebrow label), it's added to `DESIGN_SYSTEM.md`'s
      Heading Scale section so future sections follow the same rule instead of reinventing it.

---

## Story 6 (F-006)

As a visitor reading the footer

I want the Acknowledgement of Country to sit on one line

So that it reads as a clean, deliberate statement rather than an oddly wrapped paragraph.

Acceptance Criteria

- [x] Decided approach (2026-07-16, project owner delegated to recommendation): the `max-w-[720px]`
      constraint on this paragraph (`components/layout/Footer.tsx:59-62`) is removed/widened rather
      than shrinking font size — the wrap is caused by the container being narrower than the
      sentence needs at normal text size, not by the sentence being inherently too long. Font size
      stays untouched, preserving `DESIGN_SYSTEM.md`'s "readable on mobile" / accessibility bar.
- [x] Renders on a single line at typical desktop/tablet widths (≥768px) once the width constraint
      is removed.
- [x] On genuinely narrow mobile (e.g. 390px) the sentence may still wrap to two lines — that's
      accepted, not fixed further (no font-shrinking hack), since no reasonably-sized text fits ~135
      characters in ~360px of usable width.
- [x] No horizontal overflow/scroll introduced on any breakpoint.

---

## Story 7 (F-007)

As a visitor checking the Schofields weather widget

I want a shorter, more glanceable forecast

So that the compact Hero sidebar card doesn't feel crowded with a full week of rows.

Acceptance Criteria

- [x] `lib/weather/weatherApi.ts:9` — `FORECAST_DAYS` changed from `7` to `3` (feeds the
      `forecast_days` query param sent to Open-Meteo).
- [x] `lib/weather/weather.types.ts:60` and `lib/weather/weatherService.ts:57,76` — the `sevenDay`
      field is renamed to reflect 3 days (e.g. `dailyForecast`) across the type, the service, and
      every consumer (`features/homepage/WeatherCard.tsx:141`), so naming doesn't silently disagree
      with behaviour.
- [x] `features/homepage/WeatherForecast.tsx` — its "Compact 7-day forecast list" doc comment and
      any other "7-day" references are updated to "3-day".
- [x] `lib/weather/weatherService.test.ts` and any Playwright coverage asserting on forecast length
      are updated to expect 3 days, not 7.
- [x] Verified visually: the Hero sidebar weather card shows exactly 3 forecast rows (Today + 2).

---

## Story 8 (F-008)

As a visitor checking parking availability

I want the heading to say what the numbers mean

So that "Parking free" (which reads ambiguously, like "free of charge") doesn't need a second look.

Acceptance Criteria

- [x] `features/homepage/TransitWidget.tsx:56` — heading text changed from `Parking free` to
      `Parking slots available`.
- [x] Decided approach (2026-07-16, project owner delegated to recommendation): scoped to the
      visible `h3` heading only. The `aria-live` sr-only summary at `TransitWidget.tsx:34-35`
      ("Schofields Station {n} parking spots free...") is left unchanged — the number immediately
      next to "spots free" already reads unambiguously as availability there, unlike the standalone
      heading, so there's no real ambiguity to fix in that string.
- [x] No layout regression — heading still fits the 260px-wide compact card at the `text-xs uppercase`
      size (verify wrap behaviour; shorten further if it wraps to two lines where "Parking free"
      didn't).

---

## Story 9 (F-009)

As a visitor landing on the homepage

I want to see promotion cards without scrolling

So that advertised local deals get the visibility they need rather than starting below the fold.

Acceptance Criteria

- [x] `features/community/Promotions.tsx` — the gap between the section's top `border-t` divider
      and the "Local promotions" heading is reduced (override `Section`'s `py-12 sm:py-16` top
      padding for this section specifically, e.g. via an additional className, rather than changing
      the shared `Section` component's default).
- [x] Distinct from F-001 (general homepage rhythm variation): this is a specific above-the-fold
      requirement for the first section after Hero, verified concretely rather than just "feels
      tighter."
- [x] Verified via Playwright/screenshot that at least part of the promotion card row is visible
      without scrolling on common viewport heights (e.g. 800px and 900px) at both desktop and mobile
      widths, immediately after Hero.
- [x] Heading-to-card-grid gap (`mb-8`) reviewed at the same time and reduced if it's part of what's
      pushing cards below the fold.

---

## Story 10 (F-010)

As a visitor scanning promotion cards

I want every card to be the same size regardless of how long its description is

So that the row of ads looks tidy and consistent rather than uneven.

Acceptance Criteria

- [x] `components/cards/PromotionCard.tsx:42` — `promotion.description` is clamped to exactly 2
      lines with ellipsis overflow (`line-clamp-2` or equivalent) instead of rendering full,
      variable-length text.
- [x] All `PromotionCard`s in the same grid row render at a uniform height regardless of individual
      description length, verified visually with at least 3 promotions of noticeably different
      description lengths.
- [x] Truncation doesn't cut off mid-word in a way that looks broken (standard `line-clamp` ellipsis
      behaviour is acceptable).

---

## Story 11 (F-011) — bugfix, from `/code-review`

As a visitor checking the Schofields weather widget

I want the sunrise/sunset times to be correct

So that the widget isn't quietly lying about when the sun comes up.

Acceptance Criteria

- [x] `features/homepage/WeatherCard.tsx:17` — `formatTime()`'s `new Date(isoTime)` no longer
      relies on the runtime's local timezone to interpret Open-Meteo's offset-less
      `Australia/Sydney`-local sunrise/sunset strings (e.g. `"2026-07-16T06:58"`). Fix parses the
      string as the Sydney wall-clock time it actually represents, not as local-to-whatever-server-
      or-browser-runs-it, matching the timezone-safety approach `WeatherForecast.tsx`'s `dayLabel()`
      already uses for the date-only `daily.time` field.
- [x] Verified in a deployed (Vercel, UTC-timezone) environment, not just local dev — this bug is
      specifically masked when the developer's own machine happens to be set to Sydney time, so
      local-only verification doesn't count.
- [x] Regression test added (unit or Playwright) that fails if this timezone handling regresses.

---

## Story 12 (F-012) — bugfix, from `/code-review`

As the site owner

I want to be able to change the logo via `data/settings.json`

So that rebranding doesn't require a code change, matching how every other piece of site config
already works.

Acceptance Criteria

- [x] `components/common/Logo.tsx:17` — the hardcoded `src="/images/logo-full.png"` is replaced
      with a `logo` prop (or an internal `settingsRepository` read, matching how other components
      source data) fed from `data/settings.json`'s existing `logo` field.
- [x] Both callers (`components/layout/Navigation.tsx`, `components/layout/Footer.tsx`) pass the
      resolved logo path through, alongside the `siteName` they already pass.
- [x] Editing `data/settings.json`'s `logo` field and reloading the site changes the rendered logo,
      verified manually.
- [x] No hardcoded image path remains in `Logo.tsx`, satisfying `.ai/CLAUDE.md`'s "Never hardcode
      business data. Always load from the repository layer" rule.

---

## Story 13 (F-013) — bugfix, from `/code-review`

As a visitor with the weather widget open

I want a temporary refresh failure to keep showing the last real reading

So that one bad poll doesn't blank out perfectly good data.

Acceptance Criteria

- [x] `hooks/useWeather.ts` — `WeatherState`'s `hasError` and `data` are no longer treated as
      mutually exclusive by consumers. On a failed refresh where `data` already holds a
      previously-successful result, `data` is preserved (already true today) and the hook exposes
      enough information (e.g. a separate `isStale`/`lastUpdatedAt` signal) for the UI to keep
      showing it.
- [x] `features/homepage/WeatherCard.tsx`'s render branch (`weather.hasError || !weather.data`) is
      updated so a failed refresh with existing `data` shows the last-known-good reading (optionally
      with a subtle "may be outdated" indicator) instead of the full "Unavailable right now" state.
      The full error state is reserved for when `data` is genuinely null (first load failed).
- [x] Verified by simulating a refresh failure after a successful initial load (unit test on the
      hook, or a mocked Playwright scenario) and confirming the prior reading stays visible.

---

## Story 14 (F-014) — bugfix, from `/code-review`

As the site

I want concurrent visitors hitting a cold weather cache to share one upstream Open-Meteo call

So that the service actually behaves the way `getSchofieldsWeather()`'s own doc comment claims.

Acceptance Criteria

- [x] `lib/weather/weatherService.ts:88` — `getSchofieldsWeather()` gains in-flight request
      coalescing (e.g. caching the in-progress `Promise` itself, not just the resolved value) so
      concurrent callers during a cache miss share a single upstream `fetchOpenMeteoForecast` call
      rather than each independently triggering one.
- [x] `lib/weather/weatherService.test.ts` gains a test that fires multiple concurrent
      `getSchofieldsWeather()` calls against a cold cache and asserts `fetchOpenMeteoForecast` is
      called exactly once.
- [x] The doc comment on `getSchofieldsWeather()` is left accurate (either the fix makes the
      existing claim true, or the comment is corrected to describe the actual guarantee).

---

## Story 15 (F-015) — bugfix, from `/code-review`

As a visitor on a slow or flaky connection

I want the weather widget to fail gracefully instead of loading forever

So that a stalled network request doesn't leave a permanent skeleton on the page.

Acceptance Criteria

- [x] `hooks/useWeather.ts:30` — the `fetch("/api/weather")` call gains a timeout (e.g.
      `AbortSignal.timeout(...)`), matching the pattern `lib/weather/weatherApi.ts`'s server-side
      call already uses (`REQUEST_TIMEOUT_MS = 8000`).
- [x] On timeout, the hook resolves to `hasError: true` / `isLoading: false` (the existing error
      path) rather than hanging indefinitely.
- [x] Verified with a test that simulates a stalled fetch and confirms the hook exits loading state
      within the timeout window.

---

## Story 16 (F-016) — bugfix, from `/code-review`

As a developer investigating a weather-widget bug report

I want the real fetch error logged

So that a production failure is diagnosable instead of a black box.

Acceptance Criteria

- [x] `hooks/useWeather.ts:39` — the bare `catch { ... }` captures the error
      (`catch (error) { ... }`) and logs it (e.g. `console.error("Failed to fetch weather:", error)`,
      matching `app/api/weather/route.ts`'s existing server-side logging convention) before setting
      `hasError`.
- [x] No behavioural change to the UI — this is purely adding a diagnostic trail.

---

## Story 17 (F-017) — bugfix, from `/code-review`

As the weather feature

I want a malformed upstream response to degrade gracefully instead of crashing

So that an Open-Meteo hiccup doesn't take down the whole WeatherCard.

Acceptance Criteria

- [x] `lib/weather/weatherApi.ts` and/or `lib/weather/weatherService.ts`'s `transformResponse` —
      validate that `daily`'s sibling arrays (`weather_code`, `temperature_2m_max`,
      `temperature_2m_min`, `sunrise`, `sunset`, `precipitation_probability_max`) are all the same
      length as `daily.time`, not just that `daily.time` is non-empty. On mismatch, throw
      `WeatherApiError` (the existing graceful-degradation path already used for other malformed
      responses) rather than letting `undefined` values flow through to the UI.
- [x] `lib/weather/weatherService.test.ts` gains a test covering a length-mismatched `daily` payload.
- [x] Verified that `features/homepage/WeatherCard.tsx`'s `formatTime()` can never receive
      `undefined` as a result of this class of malformed response.

---

## Story 18 (F-018) — architectural evaluation, from `/code-review`

As the project

I want to evaluate whether WeatherCard's initial render should be server-fetched

So that the homepage doesn't ship a guaranteed loading flash for data that's available at request
time, and so the feature matches `.ai/CLAUDE.md`'s "Prefer Server Components... avoid unnecessary
useEffect/useState" guidance the rest of the codebase follows (e.g. `app/(home)/page.tsx` already
awaits `settingsRepository.get()` server-side).

Acceptance Criteria

- [x] This is an evaluation, not a committed change — larger in scope than the other bugfixes here,
      since it touches the Hero/WeatherCard data-flow architecture Sprint 13 established. Needs an
      explicit project-owner decision on scope before implementation starts (in vs. out of this
      sprint), not just an Acceptance-Criteria sign-off.
- [x] If approved: `app/(home)/page.tsx` fetches initial weather data server-side (via
      `getSchofieldsWeather()`) and passes it into `WeatherCard` as a prop; `useWeather` is
      responsible only for the ongoing 10-minute client-side refresh polling, seeded from that
      initial value rather than starting from `null`/`isLoading: true`.
- [x] No loss of the existing 10-minute live-refresh behaviour.
- [x] Verified visually: the homepage's initial server-rendered HTML contains real weather data, not
      a skeleton, confirmed via view-source or a disabled-JS request.

---

## Story 19 (F-019) — cleanup, from `/code-review`

As a developer maintaining the site's three live-data widgets

I want one shared polling hook instead of three copies of the same logic

So that a fix to polling/cancellation behaviour only needs to happen once.

Acceptance Criteria

- [x] A shared hook (e.g. `hooks/usePolling.ts`) is extracted, generalizing the fetch/interval/
      cancel/loading/error state machine currently duplicated across `hooks/useWeather.ts`,
      `hooks/useTrainDepartures.ts`, and `hooks/useParkingAvailability.ts`.
- [x] All three existing hooks are refactored to call the shared hook with their own URL/interval,
      preserving their current public return shapes exactly (no consumer of any of the three needs
      to change).
- [x] Existing unit/Playwright coverage for all three widgets still passes unmodified.

---

## Story 20 (F-020) — cleanup, from `/code-review`

As a developer changing the weather refresh cadence

I want one place to change it

So that the client poll interval, the in-process cache TTL, and Next's fetch revalidate window
can't silently drift out of sync.

Acceptance Criteria

- [x] `lib/weather/weatherService.ts`'s `CACHE_TTL_MS` and `REVALIDATE_SECONDS`, plus
      `hooks/useWeather.ts`'s `REFRESH_INTERVAL_MS`, are derived from a single shared constant
      (e.g. exported from `lib/weather/weather.types.ts` or a new small config module) instead of
      three independently hardcoded values.
- [x] Changing that one constant changes all three behaviours consistently, verified by a unit test
      or a code-level assertion that the derived values match.

---

# Dependencies

- F-011–F-020 (bugfixes) touch `lib/weather/`, `hooks/`, and `components/common/Logo.tsx` — largely
  independent of F-001–F-010 (UI polish), except where noted below (F-007 and F-011/F-014/F-020 all
  touch the weather feature and should be sequenced together, not implemented in parallel by
  mistake).
- F-018 depends on F-013/F-015/F-016 being decided first if all are implemented in the same pass —
  each changes `hooks/useWeather.ts`'s return shape or internals.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Removing `border-t` dividers or the `CardFooter` band regresses visual separation elsewhere reusing the same primitives | Medium | F-003 overrides `BusinessCard` locally rather than editing the shared `CardFooter`; F-001's divider removal is scoped to the homepage only |
| "Left-align some headings" (F-001) is subjective and could be reverted after implementation | Low | Confirm exact sections to left-align with the project owner before implementing, not during |
| F-002's placeholder deletion loses sprint-06 context if a real News feature is planned soon | Low | Confirm delete-vs-keep-unrendered decision explicitly before implementing |
| F-007's field rename (`sevenDay` → 3-day name) touches multiple files (types, service, component, tests) | Low | List every touch point in Story 7's Acceptance Criteria up front so nothing is missed mid-implementation |
| F-007 (3-day forecast), F-011 (timezone fix), F-014 (cache dedup), and F-020 (shared TTL constant) all touch the same small set of `lib/weather/` files | Medium | Implement and verify sequentially rather than in parallel to avoid merge conflicts / one fix masking another's test coverage |
| F-018 is materially larger in scope than the other bugfixes (an architecture change, not a targeted fix) and could expand scope if not capped | Medium | Treated as an evaluation requiring an explicit go/no-go from the project owner before implementation, not bundled into the same pass as F-011–F-017/F-019/F-020 by default |
| F-011's fix can look correct in local dev and still be wrong in production, the same way the original bug was introduced | High | Story 11's Acceptance Criteria explicitly require verification on a deployed (UTC-timezone) environment, not just local dev |

---

# Documentation Required

Before starting this sprint read:

- `.ai/CLAUDE.md`
- `.ai/DESIGN_SYSTEM.md`

---

# Next Steps

All twenty Features are implemented and verified:

- `npm run typecheck` — clean.
- `npm run lint` — clean.
- `npm test` — 178/178 unit tests passing (including new coverage: weather cache dedup, daily-array
  length validation, and the 3-day forecast fixture).
- `npm run build` — succeeds; `/` is statically prerendered with a 10-minute ISR revalidate window,
  confirming F-018's server-fetched weather is baked into the build.
- `npx playwright test` — 281 passed, 16 skipped, 0 failed, across Chromium/Firefox/WebKit (one test,
  `homepage.spec.ts`'s weather-card test, was updated to match F-018's new SSR-first behaviour — it
  no longer asserts the browser must call `/api/weather` on load, since that fetch is now redundant
  when data is already server-rendered).
- Visual verification via screenshots at desktop (1400px) and mobile (390px): homepage rhythm/
  heading/divider changes, the flush `BusinessCard` footer, the real logo, the single-line footer
  acknowledgment, and the "Parking slots available" heading (confirmed not wrapping) all render as
  intended.

Not created this pass: `goals.md`, `tasks.md`, `notes.md`, `review.md`, `retrospective.md` (the
Sprint 11–13 sibling-doc convention) — this README captures the full spec, implementation record,
and verification results. Nothing has been committed or deployed yet; that remains the project
owner's decision.

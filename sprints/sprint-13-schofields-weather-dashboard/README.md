# Sprint 13 – Schofields Weather Dashboard

Neighbourhood Directory Platform

Sprint Number: 13

Sprint Name: Schofields Weather Dashboard

Sprint Goal: Replace the homepage's "Weather coming soon" placeholder (Sprint 11's
`WeatherComingSoon.tsx`) with real current conditions and a 7-day forecast for Schofields, NSW,
sourced from the free, keyless Open-Meteo API.

Sprint Status: ✅ Complete and deployed (commit df2e394)

Start Date: 2026-07-16

End Date: 2026-07-16

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# Note (added 2026-07-17, doc audit)

This sprint shipped a 7-day forecast, as described throughout this document below (accurate as of
the 2026-07-16 deploy). Sprint 14 (F-007) later reduced the forecast window to 3 days
(`FORECAST_DAYS = 3` in `lib/weather/weatherApi.ts`). The "7-day forecast" wording below is left
as-is — it accurately describes what this sprint delivered — but the live product currently shows
3 days; see Sprint 14's README for the change and its rationale.

---

# Numbering

Sequential addition after Sprint 12 (Branding & Navigation Polish, complete and deployed, commit
`c880c96`). Sprint 10 (Future Platform Foundation) is still not started and its scope doesn't fit
this work, so per the precedent Sprints 11 and 12 both set, this is its own sprint — Sprint 13.

---

# Sprint Objective

The project owner supplied a fully detailed, acceptance-criteria-level spec directly (2026-07-16):
use the Open-Meteo Forecast API (no key, no paid tier) for Schofields, NSW
(-33.7037, 150.8786), timezone `Australia/Sydney`. Show current conditions (temperature, condition,
feels-like, humidity, wind speed/direction, rain), today's high/low/sunrise/sunset/rain chance, and
a 7-day forecast. Cache responses for 10 minutes; poll every 10 minutes; handle network/invalid/
empty/timeout failures gracefully; map Open-Meteo's WMO weather codes to icon + description via a
centralized helper. Architecture: `weatherApi.ts` / `weatherService.ts` / `weather.types.ts` /
`useWeather.ts` / `WeatherCard` / `WeatherForecast`, no fetch logic inside components. Placement,
clarified in follow-up: the existing Hero sidebar slot currently occupied by
`WeatherComingSoon.tsx` (not a new full-width section) — same 260px-wide compact-card style as the
neighbouring `TransitWidget`.

Per `.ai/CLAUDE.md`'s Spec-Driven Development process: when the project owner's own request already
contains full acceptance-criteria-level detail, capturing it verbatim here and confirming in the
same turn is the correct path (rather than a redundant round of back-and-forth) — this spec is
that capture. Sprint number and file architecture below are this session's own decisions, stated
explicitly rather than silently assumed.

This is this project's **second** live external API integration (after Sprint 11's NSW Transport
carpark/departures), already covered by the existing `DECISIONS.md` ADR-014 ("read-only,
server-side external API integrations for real-time features" — explicitly anticipated as an
ongoing pattern, not a one-off). No new ADR needed.

**Architectural note on why this goes through a server route despite Open-Meteo needing no API
key**: this project's CSP header (`next.config.ts`) sets `connect-src 'self'`, which blocks the
browser from fetching `api.open-meteo.com` directly regardless of whether a key is involved. So the
same server-route-proxy pattern Sprint 11 established (originally for key-hiding) applies here for
a different reason — CSP compliance — keeping the architecture consistent either way.

---

# Business Value

- Real, live, hyper-local weather is exactly the kind of practical, check-it-often information that
  brings residents back to the site — the same rationale Sprint 11 gave for parking/train data.
- Replaces a static "coming soon" placeholder with the real feature it always intended to become,
  without disrupting the Hero layout balance Sprint 11/12 established.
- Zero ongoing cost or credential management — Open-Meteo requires no API key and no paid tier.

---

# Success Criteria

The sprint is successful when:

- [x] All acceptance criteria below are met.
- [x] The Hero sidebar's right slot shows real current Schofields weather (temperature, condition,
      feels-like, humidity, wind speed + compass direction, rain if present) instead of the
      "Coming soon" placeholder. Verified against the real Open-Meteo API (8°C, Overcast, feels
      like 5°C, 66% humidity, 11 km/h SSW at time of testing, 2026-07-16).
- [x] The same card shows today's high/low, sunrise, sunset, and rain chance.
- [x] A compact 7-day forecast (date, icon, high, low, rain probability) renders beneath the
      current-conditions card, in the same 260px-wide column.
- [x] The browser never calls `api.open-meteo.com` directly — verified via Playwright's
      `page.on("request")` capture (new test in `homepage.spec.ts`) and manual network inspection.
- [x] Weather data is cached server-side for 10 minutes (`weatherCache.ts`, unit-tested) and the
      client polls every 10 minutes (`useWeather.ts`).
- [x] Network failure / invalid response / empty data / timeout all degrade to a friendly message,
      matching `TransitWidget`'s existing "Unavailable right now" pattern — never a crash or blank
      card.
- [x] Weather code → icon/description mapping lives in one centralized helper
      (`weatherCodeMap.ts`), not scattered through the UI.
- [x] No regressions: existing Playwright suite (all 3 browsers) still passes (281 passed, 16
      skipped, 0 failed — full run 2026-07-16).

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Weather types + Open-Meteo API client (`weather.types.ts`, `weatherApi.ts`) | High | Completed |
| F-002 | Centralized weather-code → icon/description mapping (`weatherCodeMap.ts`) | Medium | Completed |
| F-003 | Weather service with 10-minute server-side caching, thin `/api/weather` route | High | Completed |
| F-004 | `useWeather` client hook — 10-minute polling, graceful error state | High | Completed |
| F-005 | `WeatherCard` + `WeatherForecast` UI, replacing `WeatherComingSoon` in the Hero sidebar | High | Completed |
| F-006 | Unit tests: weather service, weather-code mapping, cache logic | Medium | Completed |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1 (F-001, F-002)

As a developer extending this feature later

I want the weather data shape and the Open-Meteo API call cleanly typed and separated

So that the rest of the codebase never has to know Open-Meteo's raw response shape.

Acceptance Criteria

- [x] `lib/weather/weather.types.ts`: minimal raw Open-Meteo response types (only the fields
      actually requested), plus this app's own `WeatherData`/`CurrentWeather`/`DailyForecastDay`/
      `TodayForecast` shapes.
- [x] `lib/weather/weatherApi.ts`: `fetchOpenMeteoForecast()` — server-only, calls
      `https://api.open-meteo.com/v1/forecast` for lat `-33.7037`, lon `150.8786`,
      `timezone=Australia/Sydney`, `forecast_days=7`, requesting only the fields listed in the
      spec. Uses `next: { revalidate }` for Next's own data cache and `AbortSignal.timeout(8000)`.
      Throws a typed `WeatherApiError` on non-200, network failure, or a response missing
      `current`/`daily`. Verified against the real API (`curl /api/weather`) — real data returned.
- [x] `lib/weather/weatherCodeMap.ts`: `getWeatherCondition(code: number)` — full WMO code table
      (0–99), returns `{ code, description, icon }`. Unknown codes degrade to a generic "Unknown"
      entry rather than throwing (unit-tested). This is the *only* place weather codes are
      interpreted — no icon/description logic duplicated in any component.

---

## Story 2 (F-003, F-004)

As a resident checking the homepage

I want current Schofields weather without every visitor re-hitting Open-Meteo

So that the site stays fast and doesn't hammer a free public API.

Acceptance Criteria

- [x] `lib/weather/weatherCache.ts`: a small, generic, explicitly testable TTL cache (`createTtlCache`)
      accepting an injectable clock for tests — `set(value, now?)` / `get(now?)` returning `null`
      once the TTL (10 minutes) has elapsed. 4 unit tests.
- [x] `lib/weather/weatherService.ts`: `getSchofieldsWeather()` — checks the cache first; only
      calls `weatherApi.ts` on a miss; transforms the raw response into `WeatherData` (including
      `degreesToCompass()` wind degrees → compass direction, e.g. `45°` → `"NE"`); throws on empty
      `daily.time`.
- [x] `app/api/weather/route.ts` — thin `GET` route calling `getSchofieldsWeather()`, `502` with
      `{ error: true }` on failure (matching `app/api/carpark/route.ts`'s existing pattern).
- [x] `hooks/useWeather.ts` — `"use client"`, fetches `/api/weather` on mount and every 10 minutes
      (`setInterval`), returns `{ data, isLoading, hasError }`, clears the interval on unmount —
      same shape as `useTrainDepartures.ts`.

---

## Story 3 (F-005)

As a resident on the homepage

I want to see today's Schofields weather and the week ahead at a glance

So that I know whether to bring an umbrella without leaving the site.

Acceptance Criteria

- [x] `features/homepage/WeatherCard.tsx` replaces `features/homepage/WeatherComingSoon.tsx` in
      `Hero.tsx`'s right sidebar slot (same `Card size="sm" className="w-full max-w-[260px]"`
      convention as `TransitWidget`). `WeatherComingSoon.tsx` deleted outright.
- [x] Shows: current temperature, condition icon + short description, feels-like, humidity, wind
      speed + compass direction, rain (only if present/non-zero), today's high/low, sunrise,
      sunset, chance of rain. Verified visually via desktop (1400px) and mobile (390px) Playwright
      screenshots against real live data.
- [x] `features/homepage/WeatherForecast.tsx` renders directly beneath the current-conditions
      content, inside the same card: a compact vertical list (day label, icon, high/low, rain
      probability) for the 7 days Open-Meteo returns — same list-row styling convention as
      `TransitWidget`'s train departure list.
- [x] Loading state uses `Skeleton` (matching `TransitWidget`); error state shows "Unavailable
      right now" with the same icon-plus-text pattern `TransitWidget` already uses.
- [x] `aria-live="polite"` sr-only region announces current temperature/condition on update,
      matching `TransitWidget`'s existing accessibility pattern.

---

## Story 4 (F-006)

As a developer maintaining this feature

I want the non-UI logic unit-tested

So that regressions in the API transform, code mapping, or caching are caught before they reach
the homepage.

Acceptance Criteria

- [x] `lib/weather/weatherService.test.ts` — mocks `weatherApi.ts` (via `vi.hoisted` +
      `vi.resetModules()` per test, so the module-level cache doesn't leak between tests); covers
      a successful transform (including compass-direction conversion, 6 cases), empty `daily` data
      throwing, upstream fetch failure propagating as an error, and a second call being served
      from cache without a second upstream call. 9 tests total.
- [x] `lib/weather/weatherCodeMap.test.ts` — spot-checks known codes (0, 1, 2, 3, 45, 61, 95, per
      the project owner's own examples) and confirms an unknown code degrades gracefully rather
      than throwing. 8 tests.
- [x] `lib/weather/weatherCache.test.ts` — confirms a value set is returned before the TTL elapses
      and `null` after, using an injectable clock (`get(now)`/`set(value, now)`) rather than a real
      `setTimeout` wait. 4 tests.

---

# Testing Plan

- [x] New unit tests per Story 4 above — 21 new tests, `npm test` 176/176 passing project-wide.
- [x] Manual verification against a local dev server (`curl /api/weather`): real current
      Schofields weather returned (8°C, Overcast, 66% humidity, 11 km/h SSW, sunrise 6:58am,
      sunset 5:06pm, 81% chance of rain — 2026-07-16).
- [x] Full existing Playwright suite (Chromium/Firefox/WebKit) passes — 281 passed, 16 skipped, 0
      failed. Port 3000 freed before the run, dev server restarted afterward.
- [x] New Playwright coverage in `homepage.spec.ts`: the weather card renders (not the old
      placeholder text), and the browser never requests `api.open-meteo.com` directly — same
      pattern as the existing Transit widget test.

---

# Definition of Done

- [x] All acceptance criteria above checked off only once actually implemented and observed.
- [x] `npm run lint` / `npm run typecheck` clean.
- [x] Full Playwright suite passes.
- [x] Sprint docs (`goals.md`, `tasks.md`, `notes.md`, `retrospective.md`, `review.md`) filled in
      to the same standard as Sprints 11/12.

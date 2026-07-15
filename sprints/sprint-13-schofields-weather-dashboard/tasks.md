# Sprint 13 — Technical Tasks

Schofields Weather Dashboard

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# F-001 — Weather types + Open-Meteo API client

- [x] `lib/weather/weather.types.ts` — `OpenMeteoForecastResponse` (raw, minimal fields only),
      `WeatherCondition`, `CurrentWeather`, `DailyForecastDay`, `TodayForecast`, `WeatherData`.
- [x] `lib/weather/weatherApi.ts` — `fetchOpenMeteoForecast(revalidateSeconds)`:
  - `https://api.open-meteo.com/v1/forecast`, `latitude=-33.7037`, `longitude=150.8786`,
    `timezone=Australia/Sydney`, `forecast_days=7`.
  - `current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m`.
  - `daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max`.
  - `next: { revalidate: revalidateSeconds }`, `AbortSignal.timeout(8000)`.
  - `WeatherApiError` thrown on network failure, non-200, or missing `current`/`daily`.

---

# F-002 — Weather-code mapping

- [x] `lib/weather/weatherCodeMap.ts` — `getWeatherCondition(code)`, full Open-Meteo WMO code table
      (0–99: clear/cloudy/fog/drizzle/rain/freezing rain/snow/showers/thunderstorm), unknown codes
      → `{ description: "Unknown", icon: "❓" }` rather than throwing.

---

# F-003 — Caching + service + route

- [x] `lib/weather/weatherCache.ts` — `createTtlCache<T>(ttlMs)`, closure-based, `get(now?)` /
      `set(value, now?)` with an injectable clock for tests.
- [x] `lib/weather/weatherService.ts`:
  - `degreesToCompass(degrees)` — 16-point compass conversion, exported for direct testing.
  - `getSchofieldsWeather()` — cache-first (`CACHE_TTL_MS = 10 * 60 * 1000`), transforms the raw
    response into `WeatherData` on a miss, throws if `daily.time` is empty.
- [x] `app/api/weather/route.ts` — thin `GET`, `502` + `{ error: true }` on any thrown error.

---

# F-004 — `useWeather` hook

- [x] `hooks/useWeather.ts` — `"use client"`, polls `/api/weather` every 10 minutes
      (`REFRESH_INTERVAL_MS = 10 * 60 * 1000`), `{ data, isLoading, hasError }`, cancels in-flight
      state updates and clears the interval on unmount — same shape as `useTrainDepartures.ts`.

---

# F-005 — UI

- [x] `features/homepage/WeatherCard.tsx` — current conditions (icon, temp, description, feels
      like, humidity, wind + compass direction, rain if present), today's high/low/sunrise/sunset/
      rain chance, then `WeatherForecast` beneath. `Card size="sm" max-w-[260px]`, matching
      `TransitWidget`. Loading (`Skeleton`) and error ("Unavailable right now") states.
- [x] `features/homepage/WeatherForecast.tsx` — compact vertical 7-day list (day label — "Today"
      for index 0, otherwise a short weekday name via `Intl.DateTimeFormat` in `Australia/Sydney`
      — icon, rain %, high°/low°).
- [x] `features/homepage/Hero.tsx` — `WeatherCard` replaces `WeatherComingSoon` in the right
      sidebar slot; doc comment updated to no longer describe it as a placeholder.
- [x] `features/homepage/WeatherComingSoon.tsx` deleted (superseded).

---

# F-006 — Unit tests

- [x] `lib/weather/weatherCodeMap.test.ts` — 8 tests (7 known codes + 1 unknown-code fallback).
- [x] `lib/weather/weatherCache.test.ts` — 4 tests (empty, before/after TTL, overwrite resets TTL).
- [x] `lib/weather/weatherService.test.ts` — 9 tests: 6 `degreesToCompass` cases + successful
      transform, empty-daily throwing, upstream failure propagating, and cache-hit-skips-refetch.

---

# Verification

- [x] `npm run typecheck` / `npm run lint` — clean.
- [x] `npm test` — 176/176 project-wide (was 155 before this sprint).
- [x] `curl http://localhost:3000/api/weather` against the real Open-Meteo API — confirmed real,
      correctly-shaped live data.
- [x] Playwright screenshots (desktop 1400px, mobile 390px) of the homepage — weather card renders
      correctly next to the Transit widget, stacks cleanly on mobile.
- [x] New Playwright test in `homepage.spec.ts`: weather card renders, browser never requests
      `api.open-meteo.com` directly.
- [x] Full Playwright suite: 297 tests, 281 passed, 16 skipped, 0 failed. Port 3000 freed before
      the run, dev server restarted afterward.

---

# AI Development Plan

For every task above:

1. Capture the spec (this sprint's README.md) — even when the project owner's request already has
   full acceptance-criteria detail, confirm the one genuine ambiguity (placement) before writing
   code.
2. Implement one feature at a time, following the file architecture the project owner specified.
3. Run lint, typecheck, unit tests, Playwright.
4. Verify against the real API, not just mocked tests, before checking off acceptance criteria.

# Sprint 13 — Goals

Schofields Weather Dashboard

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

# Sprint Goal

Replace the homepage's "Weather coming soon" placeholder with real current conditions and a 7-day
forecast for Schofields, NSW, sourced from the free, keyless Open-Meteo API.

---

# Objective

The project owner supplied a fully detailed spec directly, covering data source (Open-Meteo, no
key), location (Schofields, NSW, exact coordinates), what to display (current conditions, today's
detail, 7-day forecast), architecture (separate API/service/types/hook/components), caching (10
minutes), polling (10 minutes), error handling, and a centralized weather-code mapping. This
sprint implements that spec against the existing Hero sidebar placeholder rather than a new page
or section — confirmed with the project owner before implementation.

---

# Why This Sprint Exists

Sprint 11 built `WeatherComingSoon.tsx` explicitly as a temporary placeholder — "swap this out
entirely once the real widget is built rather than growing it into one." This sprint is that swap,
prompted by the project owner supplying the full weather feature spec directly (2026-07-16).

---

# Goals

1. **Real, live Schofields weather, not a placeholder** — current conditions and a 7-day forecast,
   backed by a real API call.
2. **No API key, no paid tier, no ongoing cost** — Open-Meteo was chosen by the project owner
   specifically for this.
3. **The API key/CSP lesson from Sprint 11 still applies even without a key** — this project's CSP
   (`connect-src 'self'`) means the browser can never call `api.open-meteo.com` directly regardless
   of authentication, so the same server-route-proxy architecture is used.
4. **Cache logic is directly testable**, not just implicitly covered by Next's own `fetch` cache —
   the project owner explicitly asked for cache logic to have its own unit tests.

---

# Non-Goals (this sprint)

- **No new homepage section.** This lives in the existing Hero sidebar slot, not a new full-width
  "dashboard" section — confirmed with the project owner.
- **No historical weather, radar, or alerts.** Current conditions + 7-day forecast only, per the
  supplied spec.
- **No user-configurable location.** Hardcoded to Schofields' coordinates — this is a
  single-community platform, not a multi-location weather app.

---

# Success Criteria

Sprint 13 is successful when:

- [x] The Hero sidebar shows real, live Schofields weather instead of "Coming soon."
- [x] Current conditions, today's detail, and a 7-day forecast are all present.
- [x] The browser never calls Open-Meteo directly.
- [x] Data is cached 10 minutes server-side and polled 10 minutes client-side.
- [x] All failure modes degrade gracefully.
- [x] No regressions — full Playwright suite passes.

---

# Guiding Principle

A fully detailed spec from the project owner still goes through the same capture-and-confirm
process as a vague request — the difference is how much back-and-forth confirmation actually
requires, not whether it's needed at all. One genuine ambiguity (placement) was still worth
clarifying before writing code.

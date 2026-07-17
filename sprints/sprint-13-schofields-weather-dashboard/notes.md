# Sprint 13 — Notes

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

# Placement clarification

The project owner's original message named the feature "Schofields Community Dashboard" and
described a fairly content-dense card (current conditions + today's detail + a 7-day forecast).
Sprint 11/12 had deliberately kept the Hero sidebar compact so live transit/weather data doesn't
compete with the business directory for visual weight — given the amount of content requested, it
wasn't obvious whether this should still go in that same compact slot or become a new, wider
homepage section better suited to a "dashboard"-scale layout. Asked directly rather than guessing;
the project owner confirmed it should fill the existing Hero sidebar placeholder
(`WeatherComingSoon.tsx`), not a new section. The 7-day forecast became a compact vertical list
(day / icon / rain% / high-low) rather than a wider horizontal strip, to fit the existing 260px
column.

---

# Why this still goes through a server route despite no API key

Open-Meteo needs no API key, which could suggest the browser could call it directly. This project's
CSP header (`next.config.ts`) sets `connect-src 'self'`, which blocks any direct browser fetch to
an external domain regardless of authentication — so the server-route-proxy pattern Sprint 11
established (originally to keep an API key off the client) is reused here for a different reason:
CSP compliance. Confirmed no new CSP directive was needed — `/api/weather` is same-origin.

---

# Cache design: explicit TTL cache vs. Next's `revalidate`

Sprint 11's carpark/departures features relied entirely on Next's own `fetch` `next: { revalidate }`
option for caching. That's still used here (`REVALIDATE_SECONDS = 600` in `weatherApi.ts`), but the
project owner explicitly asked for cache logic to have its own unit tests — and Next's Data Cache
isn't meaningfully testable in isolation (it's tied to the Next runtime, not something `vitest` can
exercise directly). So `weatherService.ts` adds its own small, explicit, closure-based TTL cache
(`weatherCache.ts`) in front of the API call, with an injectable clock (`get(now?)`/`set(value,
now?)`) so tests don't need real `setTimeout` waits. This is a deliberate second cache layer, not a
replacement for Next's — belt-and-braces, and the layer that's actually under direct test coverage.

**Testing implication**: because the cache is a module-level singleton, `weatherService.test.ts`
uses `vi.resetModules()` + dynamic `import()` per test (with the API mock registered once via
`vi.hoisted`) so each test gets an independent cache instance instead of leaking state across test
cases. This is the standard Vitest pattern for testing module-level singletons and is documented
inline in the test file's structure for future reference.

---

# Verification against the real API

`curl http://localhost:3000/api/weather` during implementation returned real, live Schofields data
(2026-07-16, ~2:45pm local): 8.3°C, Overcast, feels like 5°C, 66% humidity, 10.5 km/h wind at
205° (SSW), sunrise 06:58, sunset 17:06, 81% chance of rain today. The 7-day forecast's rain
probabilities and temperatures varied sensibly day to day, confirming the transform and the
`daily.time`-indexed field access (`temperature_2m_max[index]` etc.) line up correctly across all
7 entries, not just index 0.

No implementation-time surprises in the Open-Meteo response shape (unlike Sprint 11's NSW Transport
integration, which had two real discoveries during implementation) — the documented API contract
matched the real response exactly.

---

# UI verification

Screenshotted the homepage at desktop (1400px) and mobile (390px) via a throwaway Playwright
script (run from inside the project directory for module resolution, per this project's established
convention). Confirmed: the weather card sits correctly in the Hero's right sidebar next to the
Transit widget on desktop, both stack cleanly below Hero content on mobile, the 7-day list doesn't
overflow the 260px column, and real sunrise/sunset times coincidentally closely matched the project
owner's own example mockup (6:58 AM sunrise in both).

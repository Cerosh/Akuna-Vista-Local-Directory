# Sprint 13 — Backlog

Schofields Weather Dashboard

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# Purpose

Breaks Sprint 13's six features into independently shippable items.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Weather types + Open-Meteo API client | None | High | Completed |
| B-002 | Weather-code → icon/description mapping | None | Medium | Completed |
| B-003 | TTL cache + weather service + `/api/weather` route | B-001, B-002 | High | Completed |
| B-004 | `useWeather` client polling hook | B-003 | High | Completed |
| B-005 | `WeatherCard` + `WeatherForecast` UI, replacing the Hero placeholder | B-004 | High | Completed |
| B-006 | Unit tests (service, code mapping, cache) | B-001, B-002, B-003 | Medium | Completed |

---

# Prioritisation Notes

- B-001 and B-002 are independent of each other and were built in parallel conceptually (both pure
  data-layer pieces with no dependency between them).
- B-003 depends on both — the service composes the API client with the code mapping (via
  transformation) and the cache.
- B-004 (hook) and B-005 (UI) are sequential — the hook is what the components consume.
- B-006 was written alongside B-001–B-003 rather than strictly after, since the service's cache
  behaviour needed test coverage as a design constraint (module-reset pattern), not an afterthought.

---

# Out of Scope for This Backlog

- A new full-width "dashboard" homepage section — this sprint fills the existing Hero placeholder
  only, per the project owner's clarification.
- Any weather feature beyond current conditions + 7-day forecast (radar, alerts, historical data).
- A user-configurable location — hardcoded to Schofields.

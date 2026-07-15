# Sprint 13 — Retrospective

Schofields Weather Dashboard

Owner: Cerosh Jacob

Last Updated: 2026-07-16

Status: Complete (2026-07-16) — implemented and verified locally; commit/push/deploy remain open
steps for the project owner.

---

# Lessons Learned

What went well?

- The project owner's spec was detailed enough (exact coordinates, exact fields, exact
  architecture, exact display requirements) that only one genuine ambiguity remained — placement.
  Asking that one focused question instead of a longer round of clarification kept the process
  fast without skipping confirmation.
- Verifying against the real Open-Meteo API (`curl /api/weather`) during implementation, not just
  mocked unit tests, confirmed the documented API contract matched reality exactly — no surprises,
  unlike Sprint 11's NSW Transport integration.
- Recognizing that CSP (`connect-src 'self'`) still requires a server-route proxy even for a
  keyless API avoided a design mistake (assuming "no key needed" meant "safe to call from the
  browser").
- Adding an explicit, injectable-clock TTL cache specifically because the project owner asked for
  cache logic to be unit-tested — rather than only relying on Next's own opaque `revalidate` cache,
  which isn't meaningfully testable in isolation.

What could improve?

- Nothing significant identified this sprint — the spec's completeness meant implementation was
  largely mechanical once the placement question was resolved.

Were any engineering standards updated?

- No new ADR — this is covered by the existing ADR-014 (read-only, server-side external API
  integrations), which explicitly anticipated more real-time features beyond Sprint 11's.

Should DECISIONS.md change?

- No.

Should CODING_STANDARDS.md change?

- No.

---

# Sprint Retrospective

Keep

- Asking one focused question about a genuine ambiguity, even when the rest of the spec is fully
  detailed, rather than either guessing or over-clarifying.
- Verifying against the real upstream API during implementation, not just mocked tests.
- Adding explicit, testable caching logic when the project owner asks for cache behaviour to be
  covered by tests, rather than relying solely on framework-level caching that isn't unit-testable.

Stop

- Nothing identified this sprint.

Start

- Nothing identified this sprint.

---

# Carry Forward

Items not completed.

| Task | Reason | Next Sprint |
|------|--------|-------------|
| Commit / push / deploy this sprint's changes | Implementation complete and verified locally; deployment is the project owner's decision | N/A — awaiting explicit instruction |

---

# Metrics

Planned Features: 6, all spec-first (F-001–F-006, see README.md).

Completed Features: 6 of 6.

Open Bugs: None found.

Documentation Updated: This sprint's own
README.md/goals.md/tasks.md/backlog.md/notes.md/retrospective.md/review.md, `.ai/TODO.md`.

Accessibility Reviewed: Yes — `tests/e2e/accessibility.spec.ts` re-run as part of the full suite,
all passing; `WeatherCard` uses an `aria-live="polite"` sr-only region matching `TransitWidget`'s
existing pattern.

Playwright Coverage: 297 tests (281 passed + 16 documented pre-existing skips) across
Chromium/Firefox/WebKit. One new test: weather card renders real data, browser never requests
`api.open-meteo.com` directly.

Unit Test Coverage: 21 new tests (176 project-wide, up from 155) — 8 weather-code mapping, 4 TTL
cache, 9 weather service (including 6 compass-direction conversion cases).

Sprint Velocity (optional): 6 features across 1 working session.

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [ ] CONTEXT.md — not touched this sprint; consider noting the second external API integration
- [x] TODO.md — Current Sprint pointer and Sprint 13 Summary added
- [ ] ROADMAP.md — not touched
- [ ] DECISIONS.md — not touched; already covered by ADR-014
- [ ] CHANGELOG.md — no such file exists in this repository
- [ ] AI_MEMORY.md — not touched

Only update documents that genuinely changed.

---

# Sprint Summary

What was delivered?

- Real, live current weather and a 7-day forecast for Schofields, NSW, sourced from Open-Meteo's
  free, keyless API, replacing the Sprint 11 "Weather coming soon" placeholder in the Hero sidebar.
- A clean architecture split (types, API client, code mapping, cache, service, route, hook,
  components) with 21 new unit tests covering the service, code mapping, and cache logic
  specifically, per the project owner's request.

What remains?

- Committing, pushing and deploying this sprint's changes.

What should the next sprint focus on?

Whatever the project owner scopes next — Sprint 10 (Future Platform Foundation) remains queued.

---

# Next Sprint Goal

Sprint 10 (Future Platform Foundation) remains queued ahead of new ad hoc work in `TODO.md` unless
the project owner reorders it.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project better structured, better documented, better tested, easier
to maintain, and closer to the long-term vision.

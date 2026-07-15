# Sprint 11 — Retrospective

Home Tutoring Listing

Owner: Cerosh Jacob

Last Updated: 2026-07-15

Status: Complete (2026-07-15) — implemented and verified locally; commit/push/deploy and setting
`TRANSPORT_NSW_API_KEY` in Vercel remain open steps for the project owner.

---

# Lessons Learned

What went well?

- Calling the real NSW Transport API during implementation (rather than trusting the sample
  response shape from planning) caught a real, shipping-blocking issue before it shipped: the
  `total` field is occupied spots, not free ones, and it's nested under `occupancy`, not top-level.
  Flagging it and asking rather than assuming avoided publishing a card that would have read
  backwards under an "Availability" heading.
- Inspecting the PDF's raw bytes (`strings` + grep for `/URI`) surfaced two different, genuinely
  conflicting enrolment links that weren't visible as plain extracted text — a wrong link would
  have sent real parents to a stale Google Form.
- Designing the Playwright test around "browser never requests the upstream domain directly" and
  "either real data or the graceful fallback is fine" — rather than asserting exact live numbers —
  made the test both a genuine security check (key never leaks) and robust to CI not having the
  real API key configured.

What could improve?

- The new parking Playwright test flaked intermittently (mostly WebKit) under full 3-browser
  parallel load. First assumed to be live-API/network timing and "fixed" by just bumping a
  timeout — that didn't actually hold up under repeat runs, which was the signal the real cause
  was still there. Root cause turned out to be a genuine race in the test itself: it inspected the
  captured `page.on("request")` array right after a DOM assertion, but under load, request/
  response protocol events can reach the test process slightly after the page has already
  re-rendered. Fixed by explicitly `page.waitForResponse()`-ing the `/api/carpark` call before
  inspecting captured requests, instead of inferring completion from the DOM. Verified stable
  across 3 consecutive full 3-browser runs afterward. Lesson: a flaky test that "passes on retry"
  isn't confirmation of a fix — rerun several times before trusting a timeout bump actually solved
  it, not just moved the failure window.
- Directory pagination test churn (page count changes whenever real business count changes) was
  already made resilient to this in Sprint 09b's category-deletion work; this sprint's business
  addition confirmed that fix holds (no manual test update was needed this time).

Were any engineering standards updated?

- Yes — this is the first sprint to introduce a Next.js Route Handler and a live external API
  call. Documented as a permanent pattern, not sprint-specific, in `.ai/DECISIONS.md` ADR-014 and
  reflected across `.ai/CONTEXT.md`, `.ai/ARCHITECTURE.md`, `.ai/PROJECT.md`, `.ai/SECURITY.md`.

Should DECISIONS.md change?

- Yes — ADR-014 added.

Should CODING_STANDARDS.md change?

- No.

---

# Sprint Retrospective

Keep

- Verifying real third-party API responses during implementation rather than trusting a sample
  snippet from planning.
- Inspecting raw file bytes (PDFs, etc.) when a plain-text extraction seems incomplete — real links
  were hidden as annotations, not visible text.
- Designing e2e tests for external-API features around behavior (no direct upstream request, some
  valid UI state) rather than exact live data, so they're robust to CI not having real credentials.

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
| Set `TRANSPORT_NSW_API_KEY` in Vercel's Production environment variables | Only set locally (`.env.local`) so far; needed before the Parking Availability card shows real data in production | Whenever this sprint's changes are deployed |

---

# Metrics

Planned Features: 6 spec-first (F-001–F-006, see README.md), plus 6 more (F-007–F-012) raised and
implemented directly from chat after locally verifying the sprint, formalized into the same
Feature/Acceptance-Criteria structure afterward per the project owner's request — see README.md's
"Retroactive documentation note".

Completed Features: 12 of 12.

Open Bugs: None found.

Documentation Updated: `.ai/CONTEXT.md`, `.ai/TODO.md`, `.ai/DEPLOYMENT.md`, `.ai/ARCHITECTURE.md`,
`.ai/PROJECT.md`, `.ai/SECURITY.md`, `.ai/DECISIONS.md` (ADR-014), `.ai/JSON_SCHEMA.md`
(`websiteLabel`), `.ai/CLAUDE.md` (new "Spec-Driven Development (Strict)" section — a direct
process change resulting from this sprint's F-007–F-012 not being spec-first), this sprint's own
README.md/tasks.md/goals.md/backlog.md/notes.md/retrospective.md.

Accessibility Reviewed: Yes — `tests/e2e/accessibility.spec.ts` re-run, all passing, including the
transit widget's `aria-live` region.

Playwright Coverage: 291 tests (275 passed + 16 documented pre-existing skips) across
Chromium/Firefox/WebKit, stable across repeated full runs — the homepage transit test was
rewritten (not just added to) to match the new widget/layout and F-011's section swap, now also
asserts on `/api/departures` alongside
`/api/carpark`.

Sprint Velocity (optional): 12 features across 1 working session (plus a process change to
`.ai/CLAUDE.md` resulting from it).

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [x] CONTEXT.md — dataset counts, Current Sprint/Phase, Sprint 11 summary, Server Routes entry
- [x] TODO.md — Current Sprint / Next Sprint pointers, Sprint 11 Summary
- [ ] ROADMAP.md — not touched; no phase roadmap change
- [x] DECISIONS.md — ADR-014
- [ ] CHANGELOG.md — no such file exists in this repository
- [ ] AI_MEMORY.md — reviewed, no long-lived convention change beyond what ADR-014 covers

Only update documents that genuinely changed.

---

# Sprint Summary

What was delivered?

- A real tutoring business and featured promotion, with a confirmed working enrolment link.
- The previously-featured lawn mowing promotion un-featured.
- A new homepage "Parking availability" card showing real, live free-spot counts at Schofields and
  Tallawong, refreshing every 5 minutes, via this project's first server route and first live
  external API integration — with the API key never exposed to the browser.

What remains?

- Committing, pushing and deploying this sprint's changes.
- Setting `TRANSPORT_NSW_API_KEY` in Vercel's Production environment variables.

What should the next sprint focus on?

Whatever the project owner scopes next — Sprint 10 (Future Platform Foundation) remains queued.

---

# Next Sprint Goal

Sprint 10 (Future Platform Foundation) remains queued ahead of this sprint in `TODO.md` unless the
project owner reorders it.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project better structured, better documented, better tested, easier
to maintain, and closer to the long-term vision.

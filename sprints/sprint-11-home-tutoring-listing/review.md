# Sprint 11 — Review

Home Tutoring Listing

Owner: Cerosh Jacob

Last Updated: 2026-07-15

---

# Purpose

Track review status for Sprint 11 work against REVIEW_CHECKLIST.md. Fill in as Pull Requests are
opened and reviewed — do not pre-fill outcomes before work exists.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Review Checklist (per REVIEW_CHECKLIST.md)

1. **Requirements** — Matches tasks.md: new business, new promotion, lawn mowing un-featured.
2. **Architecture** — No new schema/fields/components; existing Business/Promotion patterns reused
   as-is.
3. **Design** — No new visual language; F-004's card reuses `Card`/`Section`/`IconWrapper`/
   `Skeleton` exactly as elsewhere.
4. **Components** — `features/homepage/ParkingAvailability.tsx` (new, Client Component) — small,
   single-purpose, no unnecessary state.
5. **TypeScript** — Strict mode, no `any`; `CarparkAvailability` type exported from the route and
   imported by the component (single source of truth for the shape).
6. **Readability** — Clear.
7. **Performance** — Server-side `revalidate: 300` on upstream calls avoids multiplying load;
   client polling matches the same 5-minute cadence rather than polling faster than the data
   actually changes.
8. **Accessibility** — Re-verified via existing `accessibility.spec.ts` suite — passes, including
   the new card's `aria-live="polite"` region.
9. **Responsive** — Re-verified via existing `responsive.spec.ts` suite — passes.
10. **Security** — F-001–F-003: no new data collection; enrolment happens on Google's own form,
    off-platform. F-004: **critical check, done** — confirmed `TRANSPORT_NSW_API_KEY` never
    appears in any client bundle, browser network request/response, or committed file, via a real
    browser Network-tab/HTML inspection during manual testing and an automated Playwright check
    that the browser never requests `api.transport.nsw.gov.au` directly.
11. **Data** — `validate:data` passes; promotion's `startDate`/`endDate` genuinely active
    (2026-07-27 → 2026-09-04), not a past/expired range.
12. **Testing** — F-001–F-003: existing Playwright suite re-run for regressions, none found. F-004:
    5 new unit tests (`route.test.ts`, mocked `fetch`) and 1 new Playwright test.
13. **Documentation** — `.ai/CONTEXT.md`, `.ai/TODO.md`, `.ai/DEPLOYMENT.md`, `.ai/ARCHITECTURE.md`,
    `.ai/PROJECT.md`, `.ai/SECURITY.md`, `.ai/DECISIONS.md` (ADR-014) all updated.
14. **Git** — Committed as a single commit, `6be7c67` ("feat: implement Sprint 11 (Home Tutoring
    Listing)"), and deployed. Resolved 2026-07-17 doc audit.

---

# Testing Plan (execution record)

- [x] `npm run lint` / `npm run typecheck` / `npm run validate:data` / `npm test` pass (141 unit
      tests, up from 136).
- [x] Full Playwright suite passes: 288/288 across Chromium/Firefox/WebKit (16 documented skips).
- [x] `npm run build` succeeds.
- [x] Manual verification: enrolment link opens the correct Google Form; promotion shows as
      Featured; lawn mowing promotion no longer shows as Featured; Parking availability card shows
      real live numbers against a local production server; API key confirmed absent from all
      browser-visible payloads.

---

# Release Checklist (pre-merge to `main`)

- [x] Build succeeds.
- [x] Lint succeeds.
- [x] Type checking succeeds.
- [x] Accessibility/responsive checks pass.
- [x] Documentation updated.
- [x] No critical or high review findings remain open.
- [x] Definition of Done (see README.md) satisfied, aside from the commit/push/deploy step and
      setting `TRANSPORT_NSW_API_KEY` in Vercel, which are the project owner's decision.

---

# Findings Log

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| Medium | The NSW Transport API's `total` field is occupied spots, not free spots as originally assumed during planning — would have shown backwards numbers under an "Availability" heading | `app/api/carpark/route.ts` | Found by calling the real API during implementation; flagged to the project owner before shipping; resolved by computing `spots − occupancy.total` instead |
| Low | Two different candidate enrolment links found embedded in the source PDF's link annotations (not visible as plain text) | Business content (F-001) | Confirmed the correct one with the project owner before implementation |
| Low | New Playwright test flaked intermittently (mostly WebKit) under full 3-browser parallel load — root cause: it inspected the captured `page.on("request")` array immediately after a DOM assertion, but request/response protocol events can arrive at the test process slightly after the page has already re-rendered, especially under load (a genuine race in the test, not real API flakiness) | `tests/e2e/homepage.spec.ts` | Fixed properly — added an explicit `page.waitForResponse()` for the `/api/carpark` call before inspecting `requestedUrls`, instead of inferring completion from the DOM alone. Verified stable across 3 consecutive full 3-browser runs after the fix. |

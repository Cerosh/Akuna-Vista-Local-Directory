# Sprint 11 — Technical Tasks

Home Tutoring Listing

Owner: Cerosh Jacob

Last Updated: 2026-07-15

---

# F-001 — Add the business

- [x] Add via `scripts/admin.ts add` (backup first — `npm run backup:data`), not by hand-editing
      `data/businesses.json` directly, per Sprint 8's established pattern:
  - `name`: "Private Mathematics & English Tutoring"
  - `categoryId`: `tutoring-education`
  - `phone`: `0470225569`
  - `website`: `https://forms.gle/5BgdwkkUZv8TBiDXA` (confirmed enrolment link — renders as a
    clickable link via `ContactInfo.tsx`'s existing `business.website` handling, no code change)
  - `serviceAreas`: `["Akuna Vista"]` (per the flyer's "Location: Akuna Vista")
  - `description`/`shortDescription`: drawn from the flyer's real content (one-on-one Maths &
    English tutoring, Years 1–6, taught by Rithu Cerosh Jacob — a Year 9 student in the Maths
    Accelerated programme and top English class)
  - `featured`: `true`
  - `tags`: drawn from the flyer's real bullet points (e.g. "Years 1–6", "One-on-One", "Exam
    Preparation") — no fabricated tags
- [x] `npm run validate:data`.

Implemented as `id: d29584e4-6fea-4ad6-87e1-4786c5b44295`,
`slug: private-mathematics-english-tutoring`.

---

# F-002 — Add the promotion

- [x] Add via `scripts/admin.ts add`, referencing the new business's real `id`:
  - `title`: "Free Demo Lesson"
  - `description`: the offer, referencing the tutoring service
  - `startDate`: `"2026-07-27"`, `endDate`: `"2026-09-04"` — confirmed by the project owner
    (2026-07-15), date-only format per the Promotion schema.
  - `featured`: `true`
- [x] `npm run validate:data`.

Implemented as `id: 3d3b030e-7eed-4a36-88d3-f87fe658f6cf`.

---

# F-003 — Un-feature the lawn mowing promotion

- [x] `data/promotions.json`: `"$10 Off Your First Lawn Mowing Service"` — `featured` → `false`.
      Confirmed explicitly by the project owner (2026-07-15): the new tutoring promotion is now
      the only featured promotion.
- [x] No code change needed — `Promotions.tsx`/`PromotionCard.tsx` already render whatever
      `promotionRepository.getActivePromotions()` returns, with the `Featured` badge driven purely
      by the `featured` flag.

---

# F-004 — Homepage Parking Availability card

See notes.md for the full API contract and the security/refresh decisions already confirmed
(2026-07-15). Summary of the build:

- [x] `app/api/carpark/route.ts` — a `GET` Route Handler that:
  - Reads `TRANSPORT_NSW_API_KEY` from `process.env` (server-only; never referenced from a Client
    Component or anything that reaches the browser bundle).
  - Fetches facilities 24, 26, 27, 28 from `https://api.transport.nsw.gov.au/v1/carpark?facility={id}`,
    `Authorization: apikey {key}`, `Accept: application/json`.
  - Uses `next: { revalidate: 300 }` on the upstream `fetch` calls so concurrent visitors within
    the same 5-minute window share one upstream call per facility, not one each.
  - Extracts `spots` and `occupancy.total`, computes free spots (`spots − occupancy.total`) —
    corrected from the original "pass through `total` directly" plan once the real API response
    showed `occupancy.total` is occupied spots, not free ones (see notes.md).
  - Returns `{ schofields: number, tallawong: number, updatedAt: string }`, where `tallawong` is
    facilities 26+27+28's free spots summed.
  - On any upstream failure (non-200, network error, missing/malformed fields), returns `502` with
    `{ error: true }` rather than throwing or returning fabricated numbers.
- [x] `features/homepage/ParkingAvailability.tsx` — a Client Component (`"use client"`):
  - On mount, fetches `/api/carpark`; sets a `setInterval` (5 minutes) to refetch.
  - Clears the interval on unmount (no leaked timers).
  - Renders "Schofields Station" / "Tallawong Station" spots free using existing `Card`/`Section`
    primitives — no new design system.
  - Loading state (`Skeleton`) before the first successful fetch; graceful fallback (matching
    `EmptyState` conventions) if the fetch fails or returns an error shape.
  - `aria-live="polite"` region announces updated figures so screen reader users are told when
    numbers refresh, not left to notice silently.
- [x] `app/(home)/page.tsx`: renders `<ParkingAvailability />` directly after `<Hero />`, before
      `<PopularCategories />`.
- [x] `.env.example`: `TRANSPORT_NSW_API_KEY=` placeholder documented.
- [x] `.ai/DEPLOYMENT.md`: `TRANSPORT_NSW_API_KEY` added to "Required Environment Variables". Not
      yet set in Vercel's Production environment — an open step for the project owner before this
      ships live there.
- [x] `.ai/CONTEXT.md`, `.ai/ARCHITECTURE.md`, `.ai/PROJECT.md`, `.ai/SECURITY.md` updated
      (2026-07-15, ahead of implementation) — read-only, server-side external API integrations are
      now documented as a permanent, accepted capability, not a one-off exception.
- [x] `.ai/DECISIONS.md` ADR-014 recorded (2026-07-15) — the first server route / live external
      API integration in this project, and why.
- [x] `app/api/carpark/route.test.ts` — 5 unit tests (aggregation, header placement, 3 failure
      modes), mocking `fetch`.
- [x] `tests/e2e/homepage.spec.ts` — new test: card renders directly after Hero, browser never
      requests `api.transport.nsw.gov.au` directly, tolerant of both live-data and fallback
      outcomes.

---

# Documentation

- [x] `.ai/CONTEXT.md`: dataset counts (businesses 18 → 19, promotions 4 → 5), Sprint 11 marked
      complete locally.
- [x] `.ai/TODO.md`: Current Sprint / Next Sprint pointers updated, Sprint 11 Summary added.

---

# F-005 — Local Promotions: featured first (2026-07-15)

- [x] `lib/repositories/promotionRepository.ts`: `getActivePromotions()` sorts featured first
      (stable sort).
- [x] `lib/repositories/promotionRepository.test.ts`: new test for the ordering.
- [x] Verified live: "Free Demo Lesson" renders first in Local Promotions.

---

# F-006 — Next Train Departures (2026-07-15)

See notes.md for the full technical record (station id resolution, real API response shape, the
train-only filtering discovery, timezone handling). Summary of the build:

- [x] `lib/transportNsw/client.ts` — shared authenticated `fetchTransportNsw()` (also used to
      refactor F-004's carpark logic — see below).
- [x] `lib/transportNsw/types.ts` — `TrainDeparture` + minimal raw API types; also now holds
      `CarparkAvailability` (moved from the old carpark route file).
- [x] `lib/transportNsw/stationLookup.ts` — `findStationId()` via `stop_finder`.
- [x] `lib/transportNsw/departureService.ts` — `getStationDepartures()` + pure
      `parseDepartureResponse()`; `SCHOFIELDS_STATION_ID = "276220"`, resolved once via
      `findStationId()` against the real API.
- [x] `lib/transportNsw/departureService.test.ts` — 9 unit tests against fixture data.
- [x] `app/api/departures/route.ts` — thin route over the service.
- [x] `hooks/useTrainDepartures.ts` — 30-second polling hook.
- [x] `features/homepage/TransitWidget.tsx` — combined compact widget (parking + departures),
      replacing the old full-width `ParkingAvailability.tsx`.
- [x] Refactored `app/api/carpark/route.ts` to a thin route over new
      `lib/transportNsw/carparkService.ts`, using the shared client — consistency with the new
      departures code, not just new-feature scope.
- [x] Moved carpark's test coverage from the old `app/api/carpark/route.test.ts` into
      `lib/transportNsw/carparkService.test.ts`, matching `departureService.test.ts`'s pattern.

---

# Layout redesign (2026-07-15) — see notes.md for full rationale

- [x] `features/homepage/Hero.tsx`: 3-column sidebar grid (`260px_1fr_260px` at `lg`), transit
      widget left, Hero content centred, empty reserved column right (for a future Weather
      widget). Collapses to a single column below `lg` with Hero content first, widget below.
- [x] `app/(home)/page.tsx`: removed the standalone `<ParkingAvailability />` line — Popular
      Categories is the first section after Hero again.
- [x] Deleted `features/homepage/ParkingAvailability.tsx` outright (superseded by
      `TransitWidget.tsx`, not left as dead code).
- [x] `tests/pages/HomePage.ts` / `tests/e2e/homepage.spec.ts`: locators and the dedicated
      transit test rewritten for the new widget + layout; re-verified section order live.
- [x] Screenshotted desktop (1400px) and mobile (390px) to confirm the layout matches the
      project owner's direction before considering this done.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, this sprint's notes.md, `sprints/sprint-08-admin/`'s
   `scripts/admin.ts` usage pattern).
2. Implement one feature only.
3. Run lint, typecheck, tests, `validate:data`.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits.
6. Update `.ai/TODO.md`/`.ai/CONTEXT.md` if the task changes sprint status or dataset counts.

Never combine multiple unrelated features in a single AI session or commit.

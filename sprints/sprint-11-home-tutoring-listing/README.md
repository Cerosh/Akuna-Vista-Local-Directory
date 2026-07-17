# Sprint 11 – Home Tutoring Listing

Neighbourhood Directory Platform

Sprint Number: 11

Sprint Name: Home Tutoring Listing

Sprint Goal: Add a real business listing and a featured promotion for a home tutoring service
(Private Mathematics & English Tutoring), supplied directly by the project owner via a real
advertisement flyer (`Home tutoring (2).pdf`, 2026-07-15), including the flyer's enrolment link and
a follow-up enrolment link label + contact email (see notes.md). Also adds a compact homepage
transit widget — real-time parking availability at Schofields and Tallawong (NSW Transport carpark
API) and a live Schofields Station next-train departure board (NSW Transport `departure_mon` API)
— positioned in a sidebar next to Hero rather than as full-width sections, since this is a local
business directory first (the project owner's explicit framing, 2026-07-15; see notes.md "Layout
redesign"). Also reorders Local Promotions so the featured promotion shows first.

Sprint Status: ✅ Complete and deployed (commit 6be7c67)

Start Date: 2026-07-15

End Date: 2026-07-15

Owner: Cerosh Jacob

Last Updated: 2026-07-15

---

# Numbering

Straightforward sequential addition after Sprint 10 (Future Platform Foundation) — not an
insertion between existing sprints, so none of the renumbering considerations that applied to
Sprint 08b/09b apply here (see those sprints' README.md "Numbering" sections and DECISIONS.md
ADR-011 for that precedent). Sprint 10's own README.md described itself as "the final sprint in
the current 10-sprint plan" — this sprint is new work beyond that original plan, raised by the
project owner (2026-07-15) rather than assumed in advance, matching Sprint 10's own guidance that
new work should be scoped as a new sprint when it's actually needed. `TODO.md`'s "Next Sprint"
pointer stays on Sprint 10 until that sprint is complete; this sprint queues after it.

---

# Sprint Objective

A real advertisement for a home tutoring service was supplied directly by the project owner
(`Home tutoring (2).pdf`). This sprint adds it to the platform as a real business listing (Tutoring
& Education category, `featured: true` — i.e. it appears in Featured Businesses) plus a real,
featured promotion in Local Promotions, including the flyer's enrolment link. Separately, the
project owner also asked for a new homepage card showing real-time parking availability at
Schofields and Tallawong stations — a genuinely different kind of feature (this platform's first
live external API integration and its first auto-refreshing content), scoped as its own feature
(F-004) within this sprint rather than a second sprint, per explicit instruction (2026-07-15).

---

# Business Value

Why does this sprint matter?

- A real local tutoring service, with a real enrolment link, currently has no presence on the
  platform at all — adding it delivers exactly the kind of real, useful local content this
  platform exists to surface (PROJECT.md's mission).
- Featuring it in both Featured Businesses and Local Promotions gives it real visibility on the
  homepage, not just a buried directory listing.
- Real-time parking availability at the two nearest train stations is exactly the kind of
  practical, everyday-useful information that makes residents check the site regularly, not just
  when looking for a tradesperson.

---

# Success Criteria

The sprint is successful when:

- [x] All acceptance criteria are met.
- [x] The tutoring business appears in `/businesses`, `/category/tutoring-education`, and the
      homepage's Featured Businesses section.
- [x] The promotion appears in the homepage's Local Promotions section, marked Featured, and links
      through to the business.
- [x] The business's real enrolment link (confirmed 2026-07-15:
      `https://forms.gle/5BgdwkkUZv8TBiDXA`) is live and clickable from the business detail page,
      labelled "Enroll now" rather than the bare URL, plus a real contact email — both a same-day
      follow-up (see notes.md).
- [x] A compact "Getting around" transit widget renders in a sidebar next to Hero (not a full-width
      section, and not in Popular Categories' position), showing "Schofields" and "Tallawong"
      parking spots **free** (capacity minus occupied — see notes.md "Occupied vs free") refreshing
      every 5 minutes, and Schofields Station's next train departures refreshing every 30 seconds.
- [x] The `departure_mon` feed (which returns all transport modes at Schofields) is filtered to
      trains only — confirmed live, not assumed.
- [x] The NSW Transport API key is never present in any client-side bundle or browser network
      request — the browser only ever talks to this app's own server routes
      (`/api/carpark`, `/api/departures`). Verified via a real browser network inspection during
      manual testing, not assumed.
- [x] The featured Local Promotions entry ("Free Demo Lesson") shows first — verified live.
- [x] **Local Promotions is the first full section after Hero, Popular Categories second** —
      swapped 2026-07-15, per the project owner (F-011); superseded an earlier version of this
      criterion that had it the other way round.
- [x] The tutoring business's Gallery shows a real photo, not the placeholder SVG, and clicking it
      opens a zoomed view closable via a close button or Escape (F-009/F-010).
- [x] A Weather "coming soon" placeholder balances the transit widget on Hero's other side, on
      both desktop and mobile (F-012).
- [x] Tests pass. No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Add "Private Mathematics & English Tutoring" business listing | High | Completed |
| F-002 | Add featured promotion ("Free Demo Lesson") linked to the business | High | Completed |
| F-003 | Un-feature "$10 Off Your First Lawn Mowing Service" (this promotion becomes the only featured one) | Medium | Completed |
| F-004 | Homepage parking availability — real-time Schofields/Tallawong carpark data | High | Completed (revised 2026-07-15: no longer its own full-width section — merged into the compact `TransitWidget` sidebar next to Hero, see F-006/notes.md "Layout redesign") |
| F-005 | Local Promotions: featured promotion shown first | Low | Completed |
| F-006 | Homepage "Next Train Departures" — live Schofields Station departure board (NSW Transport `departure_mon` API), shown in the same compact `TransitWidget` sidebar as F-004 | High | Completed |
| F-007 | `Business.websiteLabel` field, "Enroll now" link text, real contact email for the tutoring business | Medium | Completed |
| F-008 | Homepage layout redesign — `Hero.tsx` sidebar grid, `TransitWidget` combining F-004/F-006, transit data no longer pushing the first section down (later swapped by F-011) | High | Completed |
| F-009 | Real gallery image for the tutoring business (replacing the placeholder SVG) | Low | Completed |
| F-010 | Gallery image zoom (lightbox) | Medium | Completed |
| F-011 | Homepage: swap Local Promotions and Popular Categories order | Low | Completed |
| F-012 | Homepage: Weather "coming soon" placeholder card | Low | Completed |

**Retroactive documentation note (2026-07-15):** F-007–F-012 were implemented directly from chat
requests, then documented in `notes.md` afterward — not spec-first, unlike F-001–F-006. Formalized
here into the same Feature/Acceptance-Criteria structure after the fact, per the project owner's
request, to bring this sprint's documentation to one consistent standard. Going forward, this
project follows `.ai/CLAUDE.md`'s "Spec-Driven Development (Strict)" section — no code without a
written, confirmed spec first, no exceptions.

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a resident browsing the homepage

I want to see the new tutoring service in Featured Businesses and Local Promotions

So that I know it exists and can act on the current offer.

Acceptance Criteria

- [x] `data/businesses.json`: new record (`id: d29584e4-6fea-4ad6-87e1-4786c5b44295`,
      `slug: private-mathematics-english-tutoring`), `categoryId: "tutoring-education"`,
      `featured: true`, `phone: "0470225569"`, `website` set to the confirmed enrolment link
      (`https://forms.gle/5BgdwkkUZv8TBiDXA`) so it renders as a clickable link on the business
      detail page (`ContactInfo.tsx` already renders `business.website` this way — no code
      change needed).
- [x] `data/promotions.json`: new record (`id: 3d3b030e-7eed-4a36-88d3-f87fe658f6cf`, title "Free
      Demo Lesson") referencing the new business's `id`, `featured: true`,
      `startDate: "2026-07-27"`, `endDate: "2026-09-04"` — confirmed by the project owner
      (2026-07-15), date-only format per the Promotion schema.
- [x] `data/promotions.json`: `"$10 Off Your First Lawn Mowing Service"`'s `featured` flipped to
      `false`, confirmed explicitly by the project owner (2026-07-15) — the new promotion is now
      the only featured one.

---

## Story 2

As a parent considering tutoring for their child

I want a working enrolment link on the business's page

So that I can actually sign up, not hit a dead end.

Acceptance Criteria

- [x] The business detail page's website link resolves to
      `https://forms.gle/5BgdwkkUZv8TBiDXA` — confirmed by the project owner (2026-07-15) as the
      correct, current link (the source PDF had two different Google Forms links from what
      looks like an earlier flyer revision; the other, `https://forms.gle/pkya9S1uBGQf15ns8`, is
      not used). Verified live and clickable during manual testing.

---

## Story 3

As a resident checking the site before heading out

I want to see live parking availability at Schofields and Tallawong stations

So that I know before I drive there whether I'll actually find a park.

Acceptance Criteria

- [x] A new server route (`app/api/carpark/route.ts`) calls the NSW Transport Open Data carpark
      API (`GET https://api.transport.nsw.gov.au/v1/carpark?facility={id}`) server-side for
      facilities 24, 26, 27 and 28, using `TRANSPORT_NSW_API_KEY` (server-only env var, never
      exposed to the client) — see notes.md for the exact contract.
- [x] The route returns `{ schofields: number, tallawong: number, updatedAt: string }`, where each
      figure is spots **free** (capacity minus occupied) — corrected during implementation from
      the original "pass through `total` as-is" plan once the real API response showed `total` is
      occupied spots, not free ones (see notes.md). `schofields` is facility 24's free spots;
      `tallawong` is facilities 26/27/28's free spots summed.
- [x] **Revised 2026-07-15** (see "Layout redesign" in notes.md): rather than its own full-width
      Client Component below Hero, parking availability renders inside `features/homepage/
      TransitWidget.tsx` — a compact widget in a sidebar column next to Hero — showing "Schofields"
      and "Tallawong" spots free, polling the server route every 5 minutes without a full page
      reload. This project is a local business directory first; the project owner was explicit that
      live transit data shouldn't compete with Hero/Popular Categories for the page's main visual
      space.
- [x] If the upstream API is unavailable or misconfigured, the widget shows a graceful fallback
      message (matching this project's `EmptyState` conventions), not a crash or a blank widget.
- [x] The NSW Transport API key never appears in any browser-visible request, response, or bundle
      — confirmed by inspecting the Network tab and page HTML during manual testing (not assumed),
      and enforced going forward by a Playwright test that fails if the browser ever requests
      `api.transport.nsw.gov.au` directly.

---

## Story 4

As a resident browsing Local Promotions

I want the featured promotion to appear first

So that the one the project owner wants to highlight isn't buried among the rest.

Acceptance Criteria

- [x] `PromotionRepository.getActivePromotions()` sorts featured promotions first (stable sort —
      non-featured promotions keep their existing relative order), rather than relying on
      `data/promotions.json`'s file order.
- [x] Verified live: "Free Demo Lesson" (the only featured promotion as of this sprint) renders
      first in the homepage's Local Promotions section.

---

## Story 5

As a resident checking the site before heading to the station

I want to see the next few trains departing Schofields Station in real time

So that I know whether to leave now or I've got a few minutes.

Acceptance Criteria

- [x] A new server route (`app/api/departures/route.ts`) calls NSW Transport's `departure_mon`
      endpoint (the departure-board-purpose-built endpoint — explicitly not the general-purpose
      `trip` planner, per the project owner's instruction) server-side for Schofields Station
      (global stop id `276220`, resolved once via a `stop_finder` helper — see notes.md), using the
      same `TRANSPORT_NSW_API_KEY` and server-only pattern as F-004.
- [x] The endpoint returns **only trains** — `departure_mon` returns every mode serving the station
      (buses too) by default; filtered to `transportation.product.class === 1` (Sydney Trains
      Network, confirmed against the real API response) since the project owner's given request
      parameters didn't include a mode filter.
- [x] `departureTimeEstimated` is used when present and non-empty; falls back to
      `departureTimePlanned` otherwise, exactly per the project owner's specified real-time
      behaviour.
- [x] The board shows, per departure: countdown (minutes), scheduled time, estimated time (via
      `isRealtime`/`estimatedDeparture`), destination, platform, and line code/name — all the
      fields the project owner's example UI asked for, condensed into the compact `TransitWidget`
      sidebar (see "Layout redesign" in notes.md for why it isn't a full-width departure board).
- [x] Refreshes every 30 seconds via `hooks/useTrainDepartures.ts`, without a full page reload.
- [x] Gracefully handles API failures, an empty departure list, missing estimated times, and
      authentication failures — never a crash, `NaN`, or a blank widget.
- [x] Architecture separated exactly as requested: API client (`lib/transportNsw/client.ts`,
      shared with F-004's carpark calls), departure service
      (`lib/transportNsw/departureService.ts`), types (`lib/transportNsw/types.ts`), a React hook
      (`hooks/useTrainDepartures.ts`), and a UI component (`TransitWidget.tsx`) — no API logic
      inside the component.

---

## Story 6

As a parent considering tutoring for their child

I want the enrolment link to say something meaningful, and a real way to email the tutor

So that the business page reads like a real listing, not a bare URL.

Acceptance Criteria

- [x] `Business.websiteLabel?: string` added to the schema (`1.5.0`,
      `scripts/migrate-add-business-website-label.ts`) — optional display-text override for
      `website`. `ContactInfo.tsx` renders it in place of the bare URL when present, falling back
      to the bare URL for every other business (verified live, unchanged).
- [x] Set to `"Enroll now"` on this business — the project owner's own exact wording, kept as
      typed rather than "corrected" to this project's usual Australian spelling without asking.
- [x] Real contact email `Tutor.akunavista@gmail.com` added, rendering as a working `mailto:` link
      (`ContactInfo.tsx` already supported `business.email` — no code change needed for this part).

---

## Story 7

As a resident browsing the homepage

I want live transit data to be a small, secondary widget, not compete with Hero/Popular Categories

So that the homepage still reads as a local business directory first.

Acceptance Criteria

- [x] `Hero.tsx` has a 3-column sidebar grid (`260px_1fr_260px` at the `lg` breakpoint) — collapses
      to a single column on smaller screens, Hero content first, sidebars stacked below.
- [x] `TransitWidget.tsx` (combining F-004's parking data and F-006's departures into one widget)
      renders in the left column.
- [x] Popular Categories is no longer pushed down by a full-width parking card — confirmed live,
      not assumed — matching the project owner's explicit "don't take the central real estate for
      parking" instruction. (At the time F-008 shipped, this made Popular Categories the first
      section after Hero; F-011, later the same session, swapped it with Local Promotions — see
      Story 10. Both criteria are about "the transit widget doesn't own that position", which
      still holds.)
- [x] The old `features/homepage/ParkingAvailability.tsx` (F-004's original full-width card) was
      deleted outright, not left as dead code.
- [x] Desktop (1400px) and mobile (390px) screenshots taken and reviewed before considering this
      done, not just described.

---

## Story 8

As a resident viewing the tutoring business page

I want to see a real photo instead of a generic placeholder

So that the listing feels like a real, specific business, not a stub.

Acceptance Criteria

- [x] The project owner's supplied business card design (`White and Blue Simple Photo Business
      Card (2).pdf`) converted to a web-appropriate image (macOS `qlmanage -t` → PNG → `sips`
      JPEG re-encode, ~1.2MB → ~215KB) and saved to `public/images/businesses/
      private-mathematics-english-tutoring.jpg` — the path convention `.ai/JSON_SCHEMA.md` already
      documented but no business had used until now.
- [x] `data/businesses.json`'s `images` array updated to this real image, replacing the shared
      placeholder SVG.
- [x] The card's own printed details (name, phone, email, location, service description) checked
      against what's already on the listing — no new/conflicting facts introduced.

---

## Story 9

As a resident browsing a business's gallery

I want to click a photo and see it larger

So that a small thumbnail isn't the only way to view it.

Acceptance Criteria

- [x] `components/ui/dialog.tsx` added — this project's first Dialog primitive, wrapping the
      already-installed `@base-ui/react` dependency the same way `button.tsx`/`card.tsx` wrap other
      Base UI primitives (no new UI library added).
- [x] `Gallery.tsx` (now a Client Component) opens a full-size view of the clicked image in the
      dialog; closable via an explicit close button or Escape.
- [x] Covered by a new Playwright test (`business-detail.spec.ts`) — opens via click, closes via
      both the close button and Escape, zero console errors.

---

## Story 10

As a resident visiting the homepage

I want to see current deals before browsing categories

So that a featured promotion gets seen first, matching the project owner's priority.

Acceptance Criteria

- [x] `app/(home)/page.tsx`: `<Promotions />` rendered before `<PopularCategories />` — a pure JSX
      reorder, no component changes.
- [x] `homepage.spec.ts`'s section-order assertion updated (`"Local promotions"` is the first `h2`
      after Hero, not `"Popular categories"`) and re-verified live.

---

## Story 11

As a resident viewing the homepage

I want the transit widget balanced by something on the other side

So that the Hero row doesn't look lopsided while a real Weather widget is still being planned.

Acceptance Criteria

- [x] `features/homepage/WeatherComingSoon.tsx` — a small static card (no data, no fetch) in
      `Hero.tsx`'s right column, showing a weather icon and "Coming soon".
- [x] Shown on mobile too (stacked below `TransitWidget`), not hidden below `lg` like the empty
      placeholder it replaced.
- [x] Explicitly scoped as a placeholder to be replaced entirely, not grown into a real widget —
      documented in the component's own comment and in notes.md.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one feature only.
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated features in one AI session or commit.

---

# Documentation Required

Before starting this sprint read:

- CLAUDE.md
- PROJECT.md
- TODO.md
- CONTEXT.md
- `sprints/sprint-08-admin/` — `scripts/admin.ts` pattern for adding a single real business/
  promotion record, reused here rather than hand-editing JSON directly (F-001–F-003).
- ARCHITECTURE.md, DECISIONS.md (F-004 — first server route / live external API in this project;
  read before introducing the pattern).
- `.ai/DEPLOYMENT.md`'s "Required Environment Variables" section (F-004 — adding
  `TRANSPORT_NSW_API_KEY`).

---

# Deliverables

- [x] New business record added via `scripts/admin.ts add`, backup first, validated.
- [x] New promotion record added the same way.
- [x] Lawn mowing promotion's `featured` flag flipped.
- [x] `Business.websiteLabel` field (schema `1.5.0`) + real contact email — same-day follow-up
      (see notes.md).
- [x] `PromotionRepository.getActivePromotions()` sorts featured promotions first.
- [x] `lib/transportNsw/` — shared client, types, carpark service, departure service, station
      lookup helper (see notes.md "Architecture").
- [x] `app/api/carpark/route.ts`, `app/api/departures/route.ts` — thin server routes over the
      `lib/transportNsw/` services.
- [x] `hooks/useParkingAvailability.ts`, `hooks/useTrainDepartures.ts` — polling hooks.
- [x] `features/homepage/TransitWidget.tsx` — compact combined widget, rendered inside
      `features/homepage/Hero.tsx`'s new sidebar grid layout (not `app/(home)/page.tsx` directly —
      see "Layout redesign" in notes.md).
- [x] `TRANSPORT_NSW_API_KEY` documented in `.env.example` (placeholder only) and set for real in
      `.env.local` (gitignored, not committed). Not yet set in Vercel's Production environment
      variables — an open step for the project owner before this ships live (see
      `.ai/DEPLOYMENT.md`).
- [x] `.ai/CONTEXT.md` dataset counts updated (businesses 18 → 19, promotions 4 → 5); Known
      Constraints/API Strategy/MVP Scope/Security Scope all updated across `.ai/CONTEXT.md`,
      `.ai/ARCHITECTURE.md`, `.ai/PROJECT.md`, `.ai/SECURITY.md` (done ahead of implementation,
      2026-07-15, plus `.ai/DECISIONS.md` ADR-014).
- [x] `components/ui/dialog.tsx` — new Dialog primitive; `features/business-details/Gallery.tsx`
      wired to it (F-009/F-010).
- [x] `public/images/businesses/private-mathematics-english-tutoring.jpg` — real gallery image.
- [x] `features/homepage/WeatherComingSoon.tsx` — placeholder card (F-012).
- [x] `app/(home)/page.tsx`: `<Promotions />` before `<PopularCategories />` (F-011).
- [x] `.ai/CLAUDE.md`: "Spec-Driven Development (Strict)" section added, and the superseded
      timing-only carve-out in "When Unsure" rewritten to point to it — a direct result of F-007–
      F-012 not having been spec-first (see the Retroactive Documentation Note under Features).

---

# Design Notes

F-001–F-003: no new visual language — reuses existing `BusinessCard`/`PromotionCard`/`ContactInfo`
rendering exactly as-is.

F-004/F-006 (revised 2026-07-15, see notes.md "Layout redesign"): a compact combined widget
(`TransitWidget.tsx`), not a full-width section — this project is a local business directory
first, and live transit data shouldn't compete with Hero/Popular Categories for the page's main
visual space. `Hero.tsx` gained a 3-column sidebar grid (`260px_1fr_260px` on `lg+`, stacked below
Hero content on smaller screens): the transit widget on the left, Hero content centred as before,
and an empty column reserved on the right for a planned Weather widget (not built — out of scope
for this sprint). Styling matches this project's existing `Card`/`Skeleton` primitives — no new
design system needed. Loading/error states reuse the existing skeleton/graceful-fallback
conventions established for F-004's original design.

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Requires from Sprint 08 (Admin Preparation):

- `scripts/admin.ts`'s add/update pattern, reused here rather than hand-editing `data/*.json`
  (F-001–F-003).

Requires from Sprint 06 (Community Content):

- The existing Promotion schema, `Promotions.tsx`, `PromotionCard.tsx` — no changes needed, just
  new data (F-001–F-003).

F-004 introduces a genuinely new architectural pattern this project hasn't used before — a Next.js
Route Handler and a live external API call — rather than depending on prior sprint work.
**Resolved ahead of implementation, 2026-07-15:** `.ai/DECISIONS.md` ADR-014 records this as a
permanent, accepted capability (not a one-off), and `.ai/CONTEXT.md`, `.ai/ARCHITECTURE.md`,
`.ai/PROJECT.md` and `.ai/SECURITY.md` were all updated to match — no doc inconsistency remains
for whoever implements this feature to trip over.

Does not depend on Sprint 10 (Future Platform Foundation) — sequenced after it only because
Sprint 10 was already next in TODO.md's queue when this was raised, not a technical dependency.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| The PDF's two different enrolment links point to different Google Forms | Publishing the wrong one sends real parents to a stale/incorrect form | Resolved 2026-07-15 — project owner confirmed `https://forms.gle/5BgdwkkUZv8TBiDXA` is correct |
| NSW Transport API key called client-side | Key visible to anyone via browser dev tools, could be abused/rate-limited by others | Resolved 2026-07-15 — project owner chose a server-side proxy route; the key stays server-only, shared by both `/api/carpark` and `/api/departures` via `lib/transportNsw/client.ts` |
| NSW Transport API is down, rate-limited, or facility/station ids stop existing/change | Widget breaks or shows stale/wrong data | Server routes fail gracefully (fallback UI, not a crash); log/handle upstream errors distinctly from "zero available" |
| Client polling multiplies upstream API calls across concurrent visitors | Could hit NSW Transport API rate limits | Server routes cache/revalidate upstream responses (`next: { revalidate }` matching each feature's own polling cadence — 300s carpark, 30s departures) so concurrent visitors share one upstream fetch per window, not one each |
| `departure_mon` returns all transport modes at a station, not just trains | A literal implementation of the given request params would mix buses into a "Next Train Departures" board | Filtered to `transportation.product.class === 1` (Sydney Trains Network) in `departureService.ts`, confirmed against the real API response before shipping |
| `itdDate`/`itdTime` computed in the wrong timezone (server is UTC on Vercel, not Sydney) | Departure board queries the wrong day/time, returning stale or empty results in production | `formatSydneyDateTime()` uses `Intl.DateTimeFormat` with an explicit `Australia/Sydney` timeZone, not the server's local time |

---

# Testing Plan

Unit Tests

- [x] F-001–F-003: none needed — pure data addition, no new logic. Existing
      `businessRepository.test.ts`/`promotionRepository.test.ts` already cover the general read
      paths against injected fixtures.
- [x] F-005: `promotionRepository.test.ts` — new test asserting featured-first ordering with a
      stable sort.
- [x] F-004: `lib/transportNsw/carparkService.test.ts` (5 tests) — free-spots aggregation (capacity
      minus occupancy, Tallawong's three facilities summed), the API key sent only as an
      `Authorization` header, and error coverage for upstream network failure, a single failed
      facility, and a malformed response — all against a mocked `fetch`, never a real network call.
- [x] F-006: `lib/transportNsw/departureService.test.ts` (9 tests) — train-only filtering
      (buses excluded), `departureTimeEstimated`/`departureTimePlanned` fallback (present, null,
      empty string), sort-by-effective-departure-time, the 8-departure cap, empty-feed handling,
      non-negative countdown clamping, and the synthetic-id fallback when `RealtimeTripId` is
      absent — all pure-function tests against fixture data shaped like the real API response.

Integration Tests

- [x] `npm run validate:data` passes against the new records.
- [x] F-004/F-006: covered by the same service-level test files (mocked `fetch` — success,
      non-200, and malformed-response cases).

Playwright

- [x] `tests/e2e/homepage.spec.ts`'s existing Featured Businesses / Local Promotions assertions
      re-verified — no regression; Local Promotions' featured-first order re-verified live.
- [x] F-004/F-006: rewritten test confirms the `TransitWidget` renders next to Hero (not as its own
      section), that a full section (not the widget) is the first thing after Hero — updated again
      for F-011's swap (now "Local promotions", was "Popular categories") — and that the browser
      never requests `api.transport.nsw.gov.au` directly (only this app's own `/api/carpark` and
      `/api/departures`) — tolerant of both real-data and fallback-UI outcomes, so it doesn't
      depend on the live API being reachable during CI. Verified stable across 3 consecutive full
      3-browser runs.
- [x] F-009/F-010: new `business-detail.spec.ts` test — gallery image opens the lightbox, closes
      via the close button and via Escape, zero console errors.

Manual Testing

- [x] Visual check of the new business/promotion on the homepage and business detail page.
- [x] Clicked through the enrolment link and confirmed it opens the correct Google Form.
- [x] F-004/F-006: confirmed real numbers render against a local production server with the real
      API key (both parking and live departures, including a real departure with no real-time
      data — verified the planned-time fallback with real data, not just a fixture), verified via
      the browser's Network tab and page HTML that the key never appears client-side.
- [x] Screenshotted the Hero row at desktop (1400px) and mobile (390px) widths — confirmed the
      transit widget sits left of Hero, the Weather placeholder sits right, and both stack below
      Hero content on mobile.
- [x] F-009/F-010: clicked the gallery image on a local production server, confirmed the lightbox
      shows the real (non-placeholder) photo and closes correctly.

Responsive Testing

- [x] Re-ran `tests/e2e/responsive.spec.ts` — all passing.

Accessibility

- [x] Re-ran `tests/e2e/accessibility.spec.ts` — all passing, including the widget's `aria-live`
      region.

---

# Definition of Done

- [x] Acceptance criteria completed.
- [x] Code reviewed against REVIEW_CHECKLIST.md.
- [x] TypeScript passes.
- [x] ESLint passes.
- [x] Tests pass (unit + Playwright — 154 unit, 288 Playwright across 3 browsers, stable across 3
      consecutive full runs).
- [x] Responsive.
- [x] Accessible.
- [x] Documentation updated (`.ai/CONTEXT.md` dataset counts, `.ai/DEPLOYMENT.md` env var,
      `.ai/ARCHITECTURE.md`/`.ai/PROJECT.md`/`.ai/SECURITY.md`, `.ai/DECISIONS.md` ADR-014).
- [x] No console errors.
- [x] Ready for deployment — deployed (commit `6be7c67`). `TRANSPORT_NSW_API_KEY` was set in
      Vercel's Production environment (live parking/departure data confirmed rendering in
      production).

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Release Notes

Features

- New real business listing: Private Mathematics & English Tutoring, with a working "Enroll now"
  link, contact email, and a real gallery photo (click to zoom).
- New featured promotion with a working enrolment link.
- New homepage "Getting around" widget (left of Hero): real-time parking availability at
  Schofields and Tallawong (refreshes every 5 minutes) and Schofields Station's next train
  departures (refreshes every 30 seconds), balanced by a Weather "coming soon" placeholder on the
  right.
- Any business's gallery photos can now be clicked to view full size.

Improvements

- Local Promotions now shows the featured promotion first, instead of file order, and Local
  Promotions leads the homepage ahead of Popular Categories.

Bug Fixes

- N/A (this sprint adds real content and new features, it doesn't fix a defect).

Known Issues

- The Weather widget is a placeholder only ("coming soon") — no real weather data yet.

---

# Lessons Learned

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Sprint Retrospective

See [retrospective.md](./retrospective.md).

---

# Carry Forward

See [retrospective.md](./retrospective.md).

---

# Metrics

See [retrospective.md](./retrospective.md).

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [x] CONTEXT.md — dataset counts (businesses 18 → 19, promotions 4 → 5), Current Sprint/Phase,
      Sprint 11 summary added, Server Routes added to Current Technology Stack.
- [x] TODO.md — Sprint 11 marked current/complete, Sprint 11 Summary added, Next Sprint pointer
      clarified (Sprint 10 unaffected).
- [ ] ROADMAP.md — not touched; this sprint didn't change the phase roadmap.
- [x] DECISIONS.md — ADR-014 added (read-only, server-side external API integrations).
- [ ] CHANGELOG.md — no such file exists in this repository (same finding as Sprint 09b).
- [ ] AI_MEMORY.md — reviewed; no long-lived convention/decision changed beyond what ADR-014
      already records, so left untouched.
- [x] ARCHITECTURE.md, PROJECT.md, SECURITY.md — all updated (2026-07-15) to remove the old "No
      APIs" wording, consistent with CONTEXT.md and ADR-014.
- [x] DEPLOYMENT.md — `TRANSPORT_NSW_API_KEY` added to Required Environment Variables.

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

Whatever the project owner scopes next — Sprint 10 (Future Platform Foundation) remains queued
ahead of this sprint in `TODO.md` unless the project owner reorders it.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

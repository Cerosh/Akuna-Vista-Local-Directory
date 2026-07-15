# Sprint 11 — Notes

Home Tutoring Listing

Owner: Cerosh Jacob

Last Updated: 2026-07-15

---

# Design Notes

No new visual language. `BusinessCard`, `PromotionCard`, `ContactInfo` already render everything
this content needs — this is a pure data addition, same pattern as Sprint 08b/09b's real-content
work.

---

# Technical Notes

## Source material

`Home tutoring (2).pdf`, supplied by the project owner 2026-07-15. Real content extracted:

- Headline: "Private Mathematics & English Tutoring"
- Tagline: "Tailored for Years 1 through 6"
- Bullet points: engaging/interactive lessons, personalised one-on-one sessions, comprehensive
  exam preparation
- Body copy: personalised one-on-one tutoring for students struggling to keep up or finding
  certain topics challenging, targeted support to build confidence in Mathematics and English
- Tutor: Rithu Cerosh Jacob, a Year 9 student in the Mathematics Accelerated programme and top
  English class
- Location: Akuna Vista
- Contact: 0470225569
- Two "ENROL TODAY" call-to-action buttons, each a real hyperlink (found via the PDF's embedded
  `/URI` annotations, not visible as plain text) — see "Enrolment link" below.

## Enrolment link — resolved 2026-07-15

The PDF contains two different Google Forms links as button hyperlinks:

- `https://forms.gle/5BgdwkkUZv8TBiDXA`
- `https://forms.gle/pkya9S1uBGQf15ns8`

Both buttons sit at nearly identical page coordinates, consistent with the PDF having a duplicate
text/image layer (common in Canva-style exports) where one layer's link wasn't updated after the
form was recreated. **Confirmed with the project owner (2026-07-15): `https://forms.gle/5BgdwkkUZv8TBiDXA`
is the correct, current link.** `https://forms.gle/pkya9S1uBGQf15ns8` is not used anywhere in this
sprint's scope.

Implementation: set this as `Business.website` — `ContactInfo.tsx` already renders
`business.website` as a clickable external link with no code change needed. No new "enrolment
link" field is being added to the schema for one business; if a second business later needs a
similarly distinct "enrol" CTA separate from a general website, reconsider a dedicated field then.

## Offer — "Free Demo Lesson"

The PDF's own copy doesn't name a specific promotional offer (it advertises the tutoring service
generally). The project owner confirmed directly (2026-07-15) that the promotion to advertise is a
free demo lesson — this is real content supplied by the project owner, not inferred from the PDF
text itself.

## Promotion schema reminder

`Promotion.startDate`/`endDate` are **date-only** (`YYYY-MM-DD`), not full timestamps — distinct
from every other date field in this project (see `.ai/JSON_SCHEMA.md`'s Promotion Schema section).
`promotionRepository.getActivePromotions()` filters out any promotion whose `endDate` has already
passed. Sprint 09b's F-003 hit exactly this problem with `data/events.json` (two real events
supplied with already-past 2024 dates, silently invisible) — the same care applied here.

**Resolved 2026-07-15:** the project owner confirmed `startDate: "2026-07-27"`,
`endDate: "2026-09-04"` for the tutoring promotion — both are real, future dates relative to this
plan's writing date (2026-07-15), so no invisibility risk.

---

## F-004 — Homepage Parking Availability card

### Requirement (project owner, 2026-07-15)

A homepage card showing real-time parking availability at the two train stations nearest Akuna
Vista — Schofields and Tallawong — sourced live from the NSW Transport Open Data carpark API, with
periodic refresh (not a one-time build-time snapshot).

### API contract (as supplied by the project owner)

```
GET https://api.transport.nsw.gov.au/v1/carpark?facility={id}
Accept: application/json
Authorization: apikey {TRANSPORT_NSW_API_KEY}
```

- **Schofields** — facility `24`.
- **Tallawong** — three facilities: `26`, `27`, `28`. Fetch all three and sum, displayed as one
  combined "Tallawong Station" figure (there's more than one physical car park structure at
  Tallawong; the site shows one number for the station as a whole, per the project owner's
  instruction, not three separate figures).
- Values come back as strings in the real API response — parse as numbers before summing/
  displaying; don't concatenate strings.
- See "Occupied vs free" below — the field to use is not simply the top-level `total` as originally
  described.

### Occupied vs free — discovered and resolved during implementation, 2026-07-15

The real API response (verified by calling it live during implementation, not assumed) has a
different shape than the sample snippet originally described:

```json
{
  "spots": "700",
  "occupancy": { "total": "45", "monthlies": null, "open_gate": null, "transients": null },
  "facility_name": "Park&Ride - Schofields",
  "facility_id": "24",
  ...
}
```

`occupancy.total` (nested, not a top-level field) is spots currently **occupied**, not free —
confirmed live: Schofields showed 45 of 700 occupied, Tallawong's three facilities showed 62/123,
54/455 and 32/397 occupied/capacity. Displaying `occupancy.total` directly under a card titled
"Parking Availability" would read backwards (a bigger number looking like "more available" when it
actually means "more full"). Flagged to the project owner before shipping rather than assumed;
confirmed 2026-07-15: **compute and show spots free instead** (`spots − occupancy.total`), summed
per-facility for Tallawong. Implemented in `fetchFacilityFreeSpots()` in
`app/api/carpark/route.ts`.

### Security — resolved 2026-07-15

The project owner supplied a real, live API key directly in chat. That key is **not** written into
any file this plan touches or into any sprint document — only referenced here as
`TRANSPORT_NSW_API_KEY`. It's been placed in this machine's local `.env.local` (gitignored, never
committed) for local development convenience; it still needs to be added to Vercel's Production
environment variables separately before this feature can go live there (same two-places pattern
`.ai/DEPLOYMENT.md` already documents for other secrets).

Calling the NSW Transport API directly from the browser was considered and rejected — it would put
the key in plain sight in every visitor's network tab, allowing anyone to copy and reuse it
(possibly exhausting the project owner's rate limit or getting the key revoked). The project owner
confirmed (2026-07-15): add a small Next.js Route Handler (`app/api/carpark/route.ts`) that holds
the key server-side; the browser only ever talks to this app's own route. This is the first server
route (and first live external API call) in this project. **Resolved ahead of implementation,
2026-07-15:** the project owner confirmed this is a permanent capability, not a one-off — recorded
in `.ai/DECISIONS.md` ADR-014, with `.ai/CONTEXT.md`, `.ai/ARCHITECTURE.md`, `.ai/PROJECT.md` and
`.ai/SECURITY.md` all updated to match (the old "No APIs" wording is gone from all four).

### Refresh — resolved 2026-07-15

Every 5 minutes, confirmed by the project owner. Two layers to this, both needed:

1. **Client-side polling** — `ParkingAvailability.tsx` refetches `/api/carpark` every 5 minutes so
   a visitor who leaves the tab open sees updated numbers without reloading the page.
2. **Server-side revalidation** — the Route Handler's own upstream `fetch` calls should use Next.js
   caching (`next: { revalidate: 300 }`) so multiple concurrent visitors within the same 5-minute
   window share one upstream call per facility rather than each triggering their own — keeps this
   project a good citizen of NSW Transport's API and reduces rate-limit risk.

### Placement — resolved 2026-07-15

Directly after `<Hero />`, before `<PopularCategories />` — high visibility, since the project
owner wants residents to see live parking status immediately.

### Failure handling — implemented 2026-07-15

Following this project's own Error Handling principle (CLAUDE.md: "Fail gracefully. Display
useful messages. Avoid silent failures.") and the existing `EmptyState` pattern used elsewhere
(e.g. `CommunityEvents`'s "No upcoming events yet"): if the upstream API is unreachable,
rate-limited, or returns something unparseable, `app/api/carpark/route.ts` returns a `502` with
`{ error: true }` (never fabricated numbers), and `ParkingAvailability.tsx` shows "Parking data is
temporarily unavailable" instead of a crash, `NaN`, or a silently stale display. Covered by
`route.test.ts` (network failure, single-facility failure, malformed response) and manually
verified by temporarily using a bad key.

---

## Risks / Assumptions

- Assumes `serviceAreas: ["Akuna Vista"]` (matching the flyer's own "Location: Akuna Vista") is the
  right value, even though it's not one of `data/suburbs.json`'s 5 chip suburbs — same convention
  already used for other real businesses with service areas outside that fixed list (e.g. Marsden
  Park, Richmond, Windsor, Nirimba Fields in the existing dataset).
- Assumed `Business.website` alone was the right home for the enrolment link — revisited the same
  day (see "Follow-up" below) once the project owner saw the bare URL rendered on the page and
  asked for meaningful link text instead.
- Assumes facility IDs 24/26/27/28 are stable identifiers that won't be silently reassigned by NSW
  Transport — verified live during implementation (all four returned the expected `facility_name`:
  "Park&Ride - Schofields", "Park&Ride - Tallawong P1/P2/P3"), but still not guaranteed to stay
  stable indefinitely. If any of the four ever return an unexpected `facility_name`, that's a
  signal to re-verify before trusting the figures.

## Open Questions

None outstanding — everything is implemented and verified. One thing was discovered and resolved
during implementation that wasn't anticipated in planning: the API's `total` field turned out to be
occupied spots, not free ones (see "Occupied vs free" above) — flagged to the project owner before
shipping rather than assumed.

---

## Follow-up (2026-07-15, after the project owner verified this sprint locally)

Two changes requested after seeing the live business detail page:

1. **The enrolment link rendered as a bare URL** ("forms.gle/5BgdwkkUZv8TBiDXA") — not meaningful
   to a resident. Added `Business.websiteLabel?: string` (schema `1.5.0`,
   `scripts/migrate-add-business-website-label.ts`), an optional display-text override for
   `website`. `ContactInfo.tsx` now renders `websiteLabel` when present, falling back to the bare
   URL otherwise (unchanged for every other business — verified live). Set to `"Enroll now"` on
   this business — the project owner's own exact wording, kept as typed rather than "corrected" to
   this project's usual Australian spelling (matching the source flyer's "ENROL") without asking.
2. **A real contact email supplied**: `Tutor.akunavista@gmail.com`, added via
   `scripts/admin.ts update` — `ContactInfo.tsx` already rendered `business.email` as a `mailto:`
   link with no code change needed.

Both verified live against a local production server (separate port from the project owner's own
`npm run dev` session, to avoid disrupting it) — the new "Enroll now" text/link and the email both
render correctly, and other businesses' bare-URL fallback is unaffected.

---

# F-005 — Local Promotions: featured first (2026-07-15)

Requirement: "keep the featured one as first advertisement" in Local Promotions.

Implementation: `PromotionRepository.getActivePromotions()` now sorts with `Array.prototype.sort`
(stable in every modern JS engine, so non-featured promotions keep their existing relative order)
by `featured` descending, rather than relying on `data/promotions.json`'s file order. `Promotions.tsx`
needed no change — it already renders whatever the repository returns, in order.

---

# F-006 — Next Train Departures (2026-07-15)

## Requirement (project owner, 2026-07-15)

A live Schofields Station departure board using NSW Transport's `departure_mon` endpoint (not the
general-purpose `trip` planner), with a detailed, prescriptive spec: exact request parameters,
real-time fallback rule, architecture separation (client/service/types/hook/component), 30-second
polling, and explicit error-handling requirements. Full text preserved in this sprint's chat
history; summarised below is what was actually discovered/decided during implementation.

## Station id — resolved via `stop_finder`, 2026-07-15

`type_sf=stop` with a free-text name (`name_sf=Schofields Station`) returns `"stop invalid"` — the
project owner's given `type_dm=stop`/`name_dm=<id>` pattern for `departure_mon` needs a real id,
not a name. Free-text search requires `type_sf=any`, then filtering the response to
`type: "stop"`. Schofields Station's real, confirmed global stop id: **`276220`** (the same value
that appeared as `"tsn": "276220"` in the carpark facility 24 response — consistent across NSW
Transport's APIs). Also confirmed: a separate, shorter `stopId` (`"10101238"`) exists in the same
response under `properties.stopId` — this is a different identifier (the timetable/GTFS stop id,
not the global id `departure_mon` expects as `name_dm`); using the wrong one would silently return
no results rather than erroring clearly, so this distinction is worth remembering if another
station is ever added.

Implemented as `findStationId()` in `lib/transportNsw/stationLookup.ts` — a genuinely reusable
helper (any future station lookup can call it), but resolved **once** for Schofields and hardcoded
as `SCHOFIELDS_STATION_ID = "276220"` in `departureService.ts`, per the project owner's own
instruction ("retrieve it once and cache/store it for future use") — a runtime lookup on every
departure request would add latency and an extra API call for an id that doesn't change.

## `departure_mon` returns all transport modes, not just trains

Calling the endpoint with exactly the project owner's specified parameters for Schofields returns
~40 `stopEvents` covering both Sydney Trains (`transportation.product.class === 1`) and Sydney
Buses (`class === 5`) services at the station — there's no mode filter in the given parameter list.
Since the feature is explicitly "Next **Train** Departures", `departureService.ts` filters to
`product.class === 1` after the fetch, confirmed against the real response before shipping (same
discipline as F-004's `occupancy.total` discovery) rather than assumed from the parameter spec
alone.

## Real API response shape (confirmed 2026-07-15, differs from a guessed shape)

Relevant fields per `stopEvent`:

```json
{
  "departureTimePlanned": "2026-07-15T11:38:00Z",
  "departureTimeEstimated": "2026-07-15T11:38:06Z",
  "location": { "properties": { "platformName": "Platform 2" } },
  "transportation": {
    "disassembledName": "T1",
    "number": "T1 North Shore & Western Line",
    "destination": { "name": "Richmond via Parramatta" },
    "product": { "class": 1, "name": "Sydney Trains Network" },
    "properties": { "RealtimeTripId": "..." }
  }
}
```

- `departureTimeEstimated` is sometimes absent entirely (not present as a key) rather than present-
  but-empty for services without real-time tracking — `parseDepartureResponse()` treats both
  "missing" and `""` as "not available", falling back to `departureTimePlanned` either way, per
  the project owner's exact instruction.
- `transportation.number` (e.g. "T1 North Shore & Western Line") is the full line name; `
  disassembledName` (e.g. "T1") is the short code — both are shown, matching the project owner's
  example UI ("T1 Western Line" style).
- `location.properties.platformName` (e.g. "Platform 2") is the human-readable platform; a raw
  internal code (`properties.platform`, e.g. "SCO2") also exists but isn't shown — not meaningful
  to a resident.

## Real-time behaviour

Implemented exactly as specified: `departureTimeEstimated` used when present and non-empty,
`departureTimePlanned` otherwise (`toDeparture()` in `departureService.ts`). `isRealtime` on the
returned `TrainDeparture` reflects which one was actually used, so the UI/tests can distinguish
them without re-deriving the logic.

## Countdown, sorting, and display cap

Countdown computed as minutes between "now" and the effective (estimated-or-planned) departure
time, clamped to a minimum of 0 (a departure a few seconds in the past while the request was in
flight shouldn't show a negative number). Results sorted by effective departure time ascending
(the raw feed's own ordering isn't guaranteed to survive the train-only filter). Capped at 8
departures — the raw feed returns dozens of stop events (all modes, ~60-90 minutes out); a
departure board doesn't need to show all of them, and 8 gives headroom over the display cap the
compact `TransitWidget` actually shows (see "Layout redesign" below).

## Timezone

`itdDate`/`itdTime` must be Sydney local time. The server's own local time can't be assumed to be
Sydney time (Vercel runs UTC) — `formatSydneyDateTime()` uses `Intl.DateTimeFormat` with an
explicit `timeZone: "Australia/Sydney"` rather than `new Date().toISOString()` or similar
UTC-assuming shortcuts.

## Architecture

Per the project owner's explicit separation-of-concerns requirement:

- **Client** — `lib/transportNsw/client.ts`: one shared, authenticated `fetchTransportNsw()`,
  reused by both the carpark and departures services (also refactored F-004's carpark logic to use
  it, moving it out of the route file — see below).
- **Service** — `lib/transportNsw/departureService.ts`: `getStationDepartures()` (the network call)
  and `parseDepartureResponse()` (a pure transform, exported separately so it's unit-testable
  against fixture data with zero network/mocking overhead).
- **Types** — `lib/transportNsw/types.ts`: `TrainDeparture` (the domain shape this app renders) and
  minimal raw-API types (only the fields actually read — the real API returns considerably more).
- **Station lookup** — `lib/transportNsw/stationLookup.ts`: `findStationId()`, the `stop_finder`
  helper.
- **Hook** — `hooks/useTrainDepartures.ts`: client-side polling (30s), mirroring the existing
  `hooks/useRecentSearches.ts` pattern already established in this project.
- **Component** — `features/homepage/TransitWidget.tsx`: presentation only, no fetch/parsing logic.

`app/api/carpark/route.ts` was refactored to match this same shape (`lib/transportNsw/
carparkService.ts` now holds its fetch/aggregation logic) — consistency across both integrations,
not just the new one. Its former dedicated test file was superseded by
`lib/transportNsw/carparkService.test.ts`, matching `departureService.test.ts`'s pattern.

---

# Layout redesign (2026-07-15, project owner's direction)

After verifying Sprint 11 locally, the project owner clarified the platform's priorities: **"this
site is a local directory ... advertisement is the major part"** — live transit data is a
secondary, at-a-glance convenience, not primary content, and shouldn't occupy the page's "central
real estate". Specific direction:

- Move transit info out of a full-width section (F-004's original `ParkingAvailability.tsx`,
  directly after Hero) into a **smaller card on the left or right of Hero** — chosen: **left**.
- Combine Parking + Next Train Departures into **one compact widget**, not two separate cards.
- Reserve the **other side** (right) for a **planned Weather widget** — not built this sprint, just
  reserved layout space.
- **Popular Categories must occupy the position right after Hero** — not pushed down by a
  full-width transit section.

Implemented: `Hero.tsx` gained a `grid-cols-[260px_1fr_260px]` layout at the `lg` breakpoint —
`TransitWidget` (new, combining what was `ParkingAvailability.tsx` plus the new departures data)
on the left, Hero's existing centred content in the middle, and an empty, `aria-hidden` reserved
column on the right (hidden below `lg`, so it doesn't reserve dead space on narrow screens — no
point showing an empty box for a widget that doesn't exist yet). Below `lg`, the grid collapses to
a single column with Hero content first (`order-1`) and the transit widget below it (`order-2`) —
a business directory's search/hero should still be what a mobile visitor sees first.
`app/(home)/page.tsx` no longer renders `<ParkingAvailability />` as its own line — `Popular
Categories` is the first section after `<Hero />` again, confirmed live (`h2` order:
`["Popular categories", "Local promotions", ...]`).

`ParkingAvailability.tsx` was deleted outright (not deprecated/left unused) — its functionality
now lives inside `TransitWidget.tsx`, and keeping a dead, unused component around would just be
clutter (consistent with this project's practice elsewhere of removing rather than orphaning code,
e.g. Sprint 09b's category deletions).

---

# Follow-up: real gallery image (2026-07-15)

The project owner supplied a real business card design (`White and Blue Simple Photo Business
Card (2).pdf`, `~/Downloads/`) to use as the tutoring business's Gallery image, replacing the
shared placeholder SVG. The PDF is a single-page image (no extractable text layer beyond what's
visually printed on the card) — converted to PNG via macOS's built-in `qlmanage -t` (Quick Look
thumbnail generation), then re-encoded to JPEG (quality 85) via `sips` to bring the file size down
from ~1.2MB to ~215KB, saved to `public/images/businesses/private-mathematics-english-tutoring.jpg`
— the path convention `.ai/JSON_SCHEMA.md` already documented (`/images/businesses/<slug>.jpg`)
but no business had used until now (every business's `images` has been the shared placeholder SVG
since Sprint 8b). `data/businesses.json`'s `images` array updated via `scripts/admin.ts update`
(backup first). The card's own printed details (name, phone, email, location, Years 1–6 Maths &
English) match what's already on the listing — no new/conflicting facts introduced. Verified live:
renders correctly in the Gallery section, zero console errors.

---

# Follow-up: gallery zoom, section swap, Weather placeholder (2026-07-15)

Three more project-owner requests, same session:

1. **Gallery image zoom** — `Gallery.tsx` became a Client Component; clicking a thumbnail opens a
   full-size view via a new `components/ui/dialog.tsx` (this project's first Dialog primitive,
   wrapping `@base-ui/react/dialog` the same way `button.tsx`/`card.tsx` wrap other Base UI
   primitives — no new UI library added). Closable via the explicit close button or Escape;
   covered by a new Playwright test (`business-detail.spec.ts`).
2. **Local Promotions / Popular Categories swapped** — pure JSX reorder in `app/(home)/page.tsx`.
   `homepage.spec.ts`'s section-order assertion updated (`"Local promotions"` is now first, not
   `"Popular categories"`).
3. **Weather "coming soon" placeholder** — `features/homepage/WeatherComingSoon.tsx`, a small
   static card (no data, no fetch) filling `Hero.tsx`'s previously-empty reserved right column, to
   visually balance `TransitWidget` on the left. Shown on mobile too now (stacked below
   `TransitWidget`), not hidden below `lg` like the empty placeholder was — replace this component
   entirely once a real Weather widget is built, don't grow it into one.

## Discovery: CSP blocks Next.js dev mode's `eval()`-based HMR in Firefox

Found while re-verifying the above: running the full Playwright suite against a manually-started
`npm run dev` server (rather than Playwright's own `npm run build && npm run start`, which
`playwright.config.ts` runs automatically whenever port 3000 is free) fails ~10 unrelated tests in
Firefox with `Content-Security-Policy: ... blocked a JavaScript eval ... Missing 'unsafe-eval'`.
Not a regression from this session's changes — this project's CSP header (Sprint 9,
`next.config.ts`) applies in dev mode too, and Turbopack's dev-mode HMR uses `eval()` for
source-mapped hot reloads, which Firefox enforces the CSP against more strictly than Chromium/
WebKit do in this scenario. Production builds (`next start`) don't use `eval()`-based HMR, so this
never surfaces there — meaning it only trips up **local Playwright runs where a `dev` server
happens to already occupy port 3000** when the suite starts, not real usage. No code change
needed; just don't have `npm run dev` bound to port 3000 when running the full Playwright suite
locally (`playwright.config.ts`'s `webServer` block builds+starts a real production instance
automatically when the port is free).

# Sprint 09b — Notes

Content Cleanup

Owner: Cerosh Jacob

Last Updated: 2026-07-09

---

# Design Notes

- No new visual language anywhere in this sprint. F-001 removes chips, it doesn't restyle them.
  F-002 is a pure data change (`categories.json`'s `featured` flags) — `PopularCategories.tsx`
  already renders whatever `categoryRepository.getFeatured()` returns and needs no code change.
- If real events (F-003) or social links (F-006) are added, follow existing card/link patterns
  exactly — no new templates, same instruction Sprint 08b's notes.md gave for its own real-content
  work.

---

# Technical Notes

## F-001 — Search filter chips

Confirmed via `app/search/page.tsx`: `categories` and `suburbs` are currently fetched via
`categoryRepository.getAll()` / `suburbRepository.getAll()` (unfiltered) and passed straight into
`SearchExperience`, which renders one chip per entry regardless of whether any business matches.

Design: filter `categories`/`suburbs` server-side in `app/search/page.tsx` (or a small shared
helper, if the same filtering is later needed elsewhere) to only the entries with at least one
matching business, before passing them to `SearchExperience`. Match rules should mirror
`searchService.ts`'s own existing suburb-matching logic (`address.suburb` or `serviceAreas`,
accent/case-insensitive via the existing `normalize()` helper) rather than inventing a second,
possibly-inconsistent matching rule — reuse `searchService.ts`'s exported logic if it's already
close to what's needed, don't duplicate it.

Confirmed counts as of 2026-07-09 (see README.md Story 1): only Schofields matches any real
business among the 5 suburbs; 10 of 16 categories have ≥1 real business. Both numbers will change
as more real content is added — this must be a computed filter, not a hardcoded list.

## F-002 — Popular Categories

Pure `data/categories.json` change: `featured: false` on `plumbing`/`cleaning`,
`featured: true` on `tutoring-education`/`real-estate`. `PopularCategories.tsx` and
`categoryRepository.getFeatured()` need no code change — confirmed by reading both.

## F-003 — Events

Real event content supplied by the project owner 2026-07-09 (sourced from Blacktown City
Council / DHA Nirimba Fields social content). Replace `data/events.json`'s 5 sample entries with
these 3, following the exact pattern Sprint 08b used for businesses/announcements/promotions
(real UUIDs, validated via `npm run validate:data`, no fabricated fields).

**Event 1 — Blacktown Mayoral Fun Run**
- Date/time as supplied: Sunday 28 July 2024, 7:15 AM – 9:00 AM
- Location: Nurragingy Reserve, Knox Rd, Doonside NSW 2767 (starts at Boronia Reserve within the
  park; route through bushlands, the Indigenous garden, the lake, the Chinese gardens)
- Details: prizes for best dressed, finisher medals for every participant, free kids' activities
  at the finish line (DJ, jumping castle)
- Register: `https://blacktown-events.bookable.net.au/#!/event-detail/ev_6db6a01a6a3e4ea3a5554ad08b373546`
- Contact: Blacktown City Council Events Team — 9839 6000, `events.team@blacktown.nsw.gov.au`
- More info: `https://www.blacktown.nsw.gov.au/Events-and-activities/Blacktown-Mayoral-Fun-Run`

**Event 2 — Blacktown Food Market**
- Date/time as supplied: Friday 26 July 2024, 5:00 PM – 9:00 PM
- Location: Warrick Lane Precinct, 91 Warrick Lane, Blacktown NSW 2148 (Main Street Station
  Carpark)
- Details: food trucks and stalls, live DJ, dedicated street food and dessert section

**Event 3 — Fingerprints Workshop at Nirimba Fields Public School**
- Not a single date — a recurring after-school workshop, Term 3, every Friday, 3:00 PM
- Location: Nirimba Fields Public School
- Details: after-school creative workshop, Term 3 registrations open
- Contact: 0491 234 955, `fingerprintsau@gmail.com`

**⚠️ Open question — must be resolved before implementation, not guessed at:** Events 1 and 2
were supplied with 2024 dates, already in the past relative to this project's current date
(2026-07-09). `eventRepository.getUpcomingEvents()` filters out any event whose `endDate` `isPast`
(`lib/repositories/eventRepository.ts`), so using the 2024 dates as given would make both events
silently never appear on the homepage — the opposite of the intent. Before implementing, confirm
with the project owner: (a) are these annual/recurring events, in which case get the actual next
occurrence date (e.g. the 2026 or 2027 running of the Fun Run), or (b) if no updated date is
available, whether to hold these two out of `data/events.json` until one is, rather than publish
them with dates that make them invisible. Event 3 (Fingerprints Workshop) doesn't have this
problem — it's a recurring Term 3 commitment, not a single dated occurrence; represent it with a
current/upcoming Term 3 Friday as `startDate`, clearly worded in the description as weekly/ongoing
rather than a one-off.

Also supplied alongside the events (not itself event content, noted for completeness): several
"Akuna Vista — Land Now Selling" real-estate marketing posts (display centre visits, sales agent
Emilie Duval, `akunavista.com.au`) and a DHA Nirimba Fields streetscape-works update. The
streetscape update duplicates content already covered by the real "Nirimba Fields streetscape
works have commenced" announcement added 2026-07-08 (`data/announcements.json`) — no new action
needed there. The Akuna Vista sales/display-centre marketing content doesn't fit the Event or
Announcement schema as supplied (it's ongoing promotional copy, not a dated notice) — out of
scope for this sprint unless the project owner specifically asks for it to be added as a
business listing or ongoing promotion.

## F-004 — Announcement.sourceUrl

Exact scope already documented in `.ai/JSON_SCHEMA.md`'s Announcement Schema section (added
2026-07-08): `sourceUrl?: string` field, `z.url().optional()` in `scripts/lib/validation.ts`,
`types/announcement.ts` update, `AnnouncementCard` renders a "Read more" link when present,
`metadata.json` `schemaVersion` bump via a migration following
`scripts/migrate-add-price-range.ts`'s exact pattern (backup first, migrate, validate, verify).

## F-005 / F-006 — Business data / social links

No design needed — these are data-entry tasks (`scripts/admin.ts update` for businesses,
`components/layout/Footer.tsx`'s `SOCIAL_LINKS` for socials), contingent entirely on the project
owner supplying real content. If nothing is supplied by the time this sprint runs, both stay
carried forward — see `.ai/TODO.md` Backlog for the exact existing entries being closed or
carried.

## F-007 — Homepage section reorder

Confirmed current order in `app/(home)/page.tsx`: `Hero → PopularCategories → FeaturedBusinesses
→ CommunityStatistics → WhyChooseLocal → CommunitySpotlight → FeaturedContent → CommunityEvents →
Promotions → Announcements → LocalNewsPlaceholder`.

Requested new order: `Hero → PopularCategories → Promotions → FeaturedBusinesses →
CommunityStatistics → WhyChooseLocal → FeaturedContent → CommunityEvents → Announcements →
LocalNewsPlaceholder` (`CommunitySpotlight` removed).

Implementation is a pure reorder/removal of JSX in `app/(home)/page.tsx` — no component changes.
`CommunitySpotlight`'s component file (`features/community/CommunitySpotlight.tsx`) and its
existing tests are left in place, just not imported/rendered — "for the time being," per the
project owner's framing (2026-07-09), not a permanent deletion. `tests/e2e/homepage.spec.ts`
currently asserts `home.communitySpotlightHeading` is visible (`tests/pages/HomePage.ts` defines
the locator) — that specific assertion needs removing; the locator itself can stay defined,
unused, ready for when the section returns.

---

## Risks / Assumptions

- Assumes "has at least one real business" is the right bar for showing a filter chip (not, say,
  "has at least N businesses" or a curated allowlist). This matches how Popular Categories'
  `featured` flag is being fixed to work in this same sprint (real content only), so the two
  should stay conceptually consistent — flag if the project owner wants different bars for the
  two surfaces.
- Assumes deleting `data/events.json`'s fake entries outright (F-003, no-real-content branch) is
  preferable to leaving them — confirmed directly by the project owner (2026-07-09 request:
  "removal of fake events"), not an assumption this sprint is making unilaterally.

## Open Questions

- Exact suburb/category "has a real business" matching rule for F-001 — reuse
  `searchService.ts`'s existing normalize/match logic rather than deciding a new one; flag if
  that logic doesn't cleanly extract into a reusable form.
- **F-003's event dates (see the ⚠️ note above) — must be confirmed with the project owner before
  implementation starts.** Do not guess a future date for the Fun Run or Food Market; do not
  publish them with the supplied 2024 dates either, since that silently makes them invisible.
- If ambiguity arises beyond what's noted here, follow CLAUDE.md's "When Unsure" guidance: don't
  guess, explain assumptions, offer alternatives, recommend the simplest option.

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

If real event content exists by the time this task starts, replace `data/events.json` following
the exact pattern Sprint 08b used for businesses/announcements/promotions (real UUIDs, validated
via `npm run validate:data`, no fabricated fields). If not, delete the 5 sample entries and leave
`data/events.json` as `[]` — `features/community/CommunityEvents.tsx` (or wherever the events
section lives) already has an empty-state per Sprint 6; confirm it renders correctly with zero
events before considering this done, don't assume.

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
- If ambiguity arises beyond what's noted here, follow CLAUDE.md's "When Unsure" guidance: don't
  guess, explain assumptions, offer alternatives, recommend the simplest option.

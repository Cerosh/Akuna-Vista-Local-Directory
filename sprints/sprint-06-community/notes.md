# Sprint 06 — Notes

Community Content

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Design Notes

- These sections should fit inside DESIGN_SYSTEM.md's existing patterns, not trigger a redesign: events, promotions and announcements should be presented as card grids, following the same Card component fields (title, description, optional image, optional badge, primary action) already used for Business Cards.
- Reuse Sprint 3's empty-state and loading-state patterns directly — an empty events list should read the same way an empty search result does ("Nothing here yet. Check back soon." style messaging per DESIGN_SYSTEM.md "Empty States"), not a bespoke message per content type.
- Featured content should visually read as "featured" using the same badge treatment already established for featured businesses (DESIGN_SYSTEM.md "Business Card Design" — Featured Badge), rather than a new visual language.
- The local news placeholder should look intentional, not broken — a simple card or section with a "Coming Soon" label and one sentence of context is sufficient; do not leave an empty box or a lorem-ipsum-style stub.
- Community Spotlight should feel like an extension of the homepage's "Featured Businesses" concept (DESIGN_SYSTEM.md "Homepage Layout") rather than an entirely new visual pattern — one prominent card, not a new carousel or layout system.

---

# Technical Notes

## Libraries

| Library | Purpose | New for this sprint? |
|---------|---------|----------------------|
| None expected | Date comparison for "active/upcoming/expired" logic can be done with native `Date`/ISO 8601 string comparison, consistent with JSON_SCHEMA.md's date conventions | No |

No new libraries are expected for this sprint. Date-range logic (is this event upcoming, is this promotion still active, has this announcement expired) is straightforward ISO 8601 comparison and does not justify a date library.

## Patterns

- **Repository Pattern continues** (ADR-003): `EventRepository`, `PromotionRepository` and the new `AnnouncementRepository` are the only way this sprint's sections read their respective data — no component reads `events.json`, `promotions.json` or `announcements.json` directly.
- **Reuse Sprint 3's list UI wholesale**: card-grid, empty-state and pagination (where a content type grows large enough to need it) patterns built for the business directory should be reused as-is for events, promotions and announcements, rather than inventing new list components for each content type.
- **Featured content as a cross-repository aggregator**: implement one function/service that reads `featured: true` records from all three repositories and returns a single, normalised list — not three separate "featured X" components with duplicated logic.
- **Community spotlight as a thin composition layer**: spotlight should call into existing `BusinessRepository`/`EventRepository` methods rather than owning any new data — it's a presentation choice, not a new entity.

## Risks / Assumptions

- **This sprint intentionally advances scope that PROJECT.md and JSON_SCHEMA.md previously deferred.** PROJECT.md's "Out of Scope" section for Version 1 explicitly lists "Events" as excluded from the MVP, with Events and Community Deals planned for Version 4 (see also ROADMAP.md's "Future Releases" Version 4). JSON_SCHEMA.md marks both the Event Schema and Promotion Schema "(Future)", not part of the current data model. This sprint activates both ahead of that original plan, at the explicit direction of the project owner. This is not scope creep discovered mid-sprint — it is a deliberate decision that should be reflected back into PROJECT.md, JSON_SCHEMA.md and ROADMAP.md once shipped, so those documents remain internally consistent with what has actually been built (see retrospective.md AI Memory Update).
- Assumes "Announcements" needs no existing schema precedent — JSON_SCHEMA.md has no Announcement Schema today, so this sprint defines a new, deliberately minimal one (id, title, message, publishedAt, expiresAt optional, priority/type) rather than overloading the Event or Promotion schema.
- Assumes "Featured content" is a cross-cutting mechanism, not a fourth content type — building it as three separate ad hoc "featured" treatments (one per content type) would contradict CODING_STANDARDS.md's DRY principle and increase long-term maintenance cost.
- Assumes "Community Spotlight" must not become a reviews/testimonials feature by another name — PROJECT.md explicitly keeps Reviews out of Version 1 scope; spotlight only ever surfaces existing Business/Event data, never new user-submitted opinions.
- Assumes the Local News placeholder should stay a placeholder for this entire sprint — it would be easy to scope-creep this into "let's just add a simple news list," but PROJECT.md gives no indication real news content or a news source exists yet, and building feed logic without a source is wasted work.

## Open Questions

- Who authors and edits events, promotions and announcements before an admin CMS exists? For this sprint, the assumption is manual JSON edits by the project owner, consistent with how `businesses.json` and `categories.json` are maintained today — an authoring UI is explicitly Sprint 08 (Admin), not this sprint.
- Should promotions be restricted to featured/verified businesses only, or open to any listed business? Not specified by PROJECT.md or JSON_SCHEMA.md — default to any business with a valid `businessId`, and revisit if monetisation (Phase 2, "Featured businesses, premium listings") later ties promotion visibility to a paid tier.
- If ambiguity arises beyond what's noted here, follow CLAUDE.md's "When Unsure" guidance: don't guess, explain assumptions, offer alternatives, recommend the simplest option.

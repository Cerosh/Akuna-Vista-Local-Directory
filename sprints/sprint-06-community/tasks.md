# Sprint 06 — Technical Tasks

Community Content

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Data & Repository

- [ ] Activate the Event Schema (JSON_SCHEMA.md, currently marked "(Future)") as the current schema for this sprint; seed `data/events.json` with sample records (mix of upcoming, past, and `featured: true`).
- [ ] Activate the Promotion Schema (JSON_SCHEMA.md, currently marked "(Future)") as the current schema for this sprint; seed `data/promotions.json` with sample records, each referencing a real `businessId` from `businesses.json`.
- [ ] Define a new Announcement schema following JSON_SCHEMA.md conventions (UTF-8, camelCase, ISO 8601 dates, UUIDs): `id`, `title`, `message`, `publishedAt`, `expiresAt` (optional), `priority`/`type`. Document it in JSON_SCHEMA.md and seed `data/announcements.json`.
- [ ] Increment `schemaVersion` in `metadata.json` per JSON_SCHEMA.md's Versioning section; document the schema additions.
- [ ] Build `EventRepository` (`getUpcomingEvents()`, `getFeaturedEvents()`) following the `BusinessRepository` pattern.
- [ ] Build `PromotionRepository` (`getActivePromotions()`, `getFeaturedPromotions()`, `getPromotionsByBusinessId()`).
- [ ] Build `AnnouncementRepository` (`getActiveAnnouncements()`, `getFeaturedAnnouncements()`).
- [ ] Ensure no component reads `events.json`, `promotions.json` or `announcements.json` directly — everything flows through its repository.

---

# Community Events

- [ ] Build an events section listing upcoming events (`title`, `startDate`, `endDate`, `location`, `image`), excluding events whose `endDate` has passed.
- [ ] Reuse the Sprint 3 card-grid pattern for the event list layout.
- [ ] Show a helpful empty state (DESIGN_SYSTEM.md "Empty States") when there are no upcoming events.

---

# Promotions

- [ ] Build a promotions section listing active promotions (`title`, `description`, `startDate`, `endDate`), excluding promotions whose `endDate` has passed.
- [ ] Resolve each promotion's `businessId` via `BusinessRepository` and link through to that business's Sprint 4 detail page.
- [ ] Handle a promotion whose `businessId` no longer resolves to a business gracefully (omit rather than crash).
- [ ] Reuse the Sprint 3 card-grid pattern for the promotion list layout.

---

# Announcements

- [ ] Build an announcements section (community noticeboard) listing active announcements, ordered newest (`publishedAt`) first.
- [ ] Exclude announcements whose `expiresAt` has passed.
- [ ] Keep the announcement display simple — title, message, published date, optional priority/type indicator — this is a noticeboard, not a CMS.

---

# Featured Content

- [ ] Build a single featured content mechanism that queries `EventRepository`, `PromotionRepository` and `AnnouncementRepository` for `featured: true` records and surfaces them together.
- [ ] Do not implement three separate "featured" UIs — one mechanism, one presentation pattern, regardless of content type.
- [ ] Handle the case where no content of any type is currently featured (empty state).

---

# Community Spotlight

- [ ] Build a spotlight section that highlights one featured `Business` or `Event`, reusing existing repository data.
- [ ] Do not introduce a new content type, review mechanism, or testimonial data for this feature.

---

# Local News Placeholder

- [ ] Build a simple, static "coming soon" section/component for local news.
- [ ] No feed logic, external data source, or real news content — this is intentionally a placeholder only.
- [ ] Keep the component small; do not over-build.

---

# Homepage Integration

- [ ] Integrate events, promotions, announcements, featured content, spotlight and the news placeholder into the homepage, following DESIGN_SYSTEM.md's Homepage Layout guidance.
- [ ] Ensure new sections don't crowd or compete with existing homepage sections (Hero, Search, Categories, Featured Businesses, Community Statistics) — respect existing Visual Hierarchy.

---

# Responsive

- [ ] Verify all six sections at mobile, tablet, desktop, large desktop.

---

# Accessibility

- [ ] Event/promotion/announcement images have descriptive alt text.
- [ ] Heading hierarchy is correct across all new sections.
- [ ] All interactive elements (business links, event details) are keyboard accessible with visible focus states.

---

# Testing

- [ ] Unit tests: date-based "is active/upcoming/expired" helpers for events, promotions and announcements.
- [ ] Unit tests: featured content aggregator across all three repositories.
- [ ] Playwright: community page renders all sections; a promotion links to the correct business page; empty states render correctly when a content type has no active records.

---

# Documentation

- [ ] Update JSON_SCHEMA.md: remove "(Future)" from Event Schema and Promotion Schema; add the new Announcement Schema.
- [ ] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).
- [ ] Flag PROJECT.md and ROADMAP.md for review given this sprint's scope advancement (see retrospective.md).

---

# Out of Scope

Do not build in this sprint:

- Reviews, testimonials or other user-generated content — Future (Version 2).
- A real local news feed or external content integration — placeholder only.
- A CMS or admin authoring UI for this content — Sprint 08 (Admin); use manual JSON edits for now.
- Site-wide performance/accessibility hardening beyond these new sections — Sprint 07 (Quality).

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, JSON_SCHEMA.md, and the specific standards doc for the task).
2. Implement one content type only (events, then promotions, then announcements, then featured content, then spotlight, then the news placeholder).
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits (see GIT_WORKFLOW.md).
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated content types in a single AI session or commit.

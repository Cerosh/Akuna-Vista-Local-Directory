# Sprint 06 — Backlog

Community Content

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 6's deliverables into ordered, independently shippable items — data/schema work first, since every content section depends on it, then each content section in turn, then the cross-cutting featured content mechanism, then homepage/community page integration, then tests.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Activate the (Future) Event Schema from JSON_SCHEMA.md as current; seed `data/events.json` with sample records | Sprint 1 repository layer | High | Completed |
| B-002 | Activate the (Future) Promotion Schema from JSON_SCHEMA.md as current; seed `data/promotions.json` with sample records | Sprint 1 repository layer | High | Completed |
| B-003 | Define a new minimal Announcement schema (id, title, message, publishedAt, expiresAt optional, priority/type) per JSON_SCHEMA.md conventions; seed `data/announcements.json` | Sprint 1 repository layer | High | Completed |
| B-004 | Build `EventRepository` and `PromotionRepository` following the existing `BusinessRepository` pattern | B-001, B-002 | High | Completed |
| B-005 | Build `AnnouncementRepository` | B-003 | High | Completed |
| B-006 | Build community events section (upcoming events, image, location, dates) | B-004 | High | Completed |
| B-007 | Build promotions section, linking each promotion to its business via `businessId` and the Sprint 4 business detail page | B-004 | High | Completed |
| B-008 | Build announcements section (noticeboard-style, newest first, expiry-aware) | B-005 | Medium | Completed |
| B-009 | Build the unified featured content mechanism (aggregates `featured` items across events, promotions, announcements) | B-006, B-007, B-008 | Medium | Completed |
| B-010 | Build community spotlight (highlights one featured business or event; reuses existing Business/Event data) | B-009 | Medium | Completed (commit `81b607c`); later un-rendered from the homepage by Sprint 09b, component/tests left intact |
| B-011 | Build local news placeholder ("coming soon" section, no feed logic) | None | Low | Completed (commit `a792d2b`); later deleted outright by Sprint 14 F-002 |
| B-012 | Integrate all sections into the homepage layout | B-006–B-011 | High | Completed |
| B-013 | Responsive pass across all six sections | B-012 | High | Completed |
| B-014 | Accessibility pass (alt text, heading hierarchy, keyboard access) | B-012 | High | Completed |
| B-015 | Playwright: community page renders all sections; promotion links to correct business; empty states render correctly | B-012 | High | Completed |

---

# Prioritisation Notes

- B-001–B-005 (schema activation, Announcement schema definition, repositories) unblock everything else and must land first — this is also where the deliberate scope-advancement decision is documented (see notes.md).
- B-006–B-008 (the three content sections) can be built and reviewed independently, in any order, once their respective repository exists — each is its own commit per the AI Development Plan.
- B-009 (featured content) and B-010 (spotlight) depend on real content existing in at least one of the three types — sequence them after B-006–B-008 are stable.
- B-011 (news placeholder) has no dependencies and is intentionally the simplest item in this backlog — do not let it grow beyond a static "coming soon" component.
- B-012 (integration) should only wire up sections once each is individually confirmed working — avoid a single large integration commit.
- B-015 (Playwright) should be written once the community page is structurally stable, but keep Sprint 1–5's existing tests green throughout.

---

# Out of Scope for This Backlog

Do not add stories for:

- Reviews, testimonials or any user-generated content — Future (Version 2, PROJECT.md "Out of Scope").
- A real local news feed, RSS integration, or external content source — placeholder only.
- A CMS or admin authoring UI for events, promotions or announcements — Sprint 08 (Admin); this sprint uses manual JSON edits.
- Site-wide performance/accessibility hardening beyond these new sections — Sprint 07 (Quality).

If a task from this list seems necessary to "finish" community content, that's a signal scope is creeping — flag it instead of implementing it.

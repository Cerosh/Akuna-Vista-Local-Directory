# Sprint 06 – Community Content

Neighbourhood Directory Platform

Sprint Number: 06

Sprint Name: Community Content

Sprint Goal: Expand beyond a directory.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

Give residents a reason to visit Akuna Vista Local Directory even when they aren't actively looking for a business: community events, business promotions, community announcements, a unified "featured content" mechanism, a community spotlight, and an honest placeholder for local news. Where Sprints 1–5 built the transactional path (search → browse → contact a business), this sprint builds the non-transactional path — the reason someone opens the site on a Tuesday evening with nothing specific to look up.

---

# Business Value

Why does this sprint matter?

- PROJECT.md's Secondary Goals explicitly include "Encourage community engagement" and "Build long-term recurring traffic" — goals that a pure business directory cannot satisfy on its own, since a visitor only has a reason to return when they next need a tradesperson.
- Community Events and Promotions turn local businesses and community organisers into a reason for repeat visits, supporting PROJECT.md's Monetisation Strategy Phase 2 ("Featured businesses, premium listings, community deals") by giving the concept of "featured" a visible home before it becomes a paid feature.
- Promotions tied to a `businessId` extend the value of a Sprint 4 business page — a business isn't just findable, it now has a reason for a resident to click through *today*, not just "whenever I need a plumber."
- A Community Spotlight and Featured Content mechanism reinforce PROJECT.md's Product Philosophy: "We are not building a business directory. We are preserving community knowledge." — surfacing something noteworthy is a community-first act, not a transactional one.
- The Local News placeholder costs almost nothing to build now and signals intent for a future milestone without overpromising a feed that doesn't exist yet.

---

# Success Criteria

The sprint is successful when:

- [x] All acceptance criteria are met.
- [x] The community page/homepage surfaces events, promotions and announcements from JSON via dedicated repositories.
- [x] A single "featured content" mechanism surfaces whichever event, promotion or announcement is currently marked `featured` — not three separate ad hoc implementations.
- [x] A community spotlight highlights one featured business or event.
- [x] A local news placeholder section exists and is honestly presented as "coming soon."
- [x] Tests pass, including Playwright coverage of the community page.
- [x] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Community events | High | Completed |
| F-002 | Promotions | High | Completed |
| F-003 | Announcements | Medium | Completed |
| F-004 | Featured content (unified mechanism) | Medium | Completed |
| F-005 | Community spotlight | Medium | Completed (built and shipped this sprint, commit `81b607c`; deliberately removed from the homepage render by Sprint 09b — component/tests left intact, described there as "temporary, not a deletion") |
| F-006 | Local news placeholder | Low | Completed (built and shipped this sprint, commit `a792d2b`; deleted outright by Sprint 14 F-002, which called it "the unbuilt 'Coming soon' local news placeholder" — the underlying news feature was never built, but this sprint's static placeholder itself was) |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a resident browsing without a specific business in mind

I want to see upcoming community events

So that I feel connected to what's happening locally, not just to a list of tradespeople.

Acceptance Criteria

- [x] A community events section lists upcoming events (`title`, `startDate`, `endDate`, `location`, `image`) sourced from `EventRepository`.
- [x] Past events (where `endDate` has passed) are not displayed as upcoming.
- [x] An empty events list shows a helpful empty state, not a blank section, per DESIGN_SYSTEM.md "Empty States."

---

## Story 2

As a resident who already uses the directory

I want to see current promotions from local businesses

So that I have a reason to check the site even when I'm not actively looking for a service.

Acceptance Criteria

- [x] A promotions section lists active promotions (`title`, `description`, `startDate`, `endDate`) sourced from `PromotionRepository`.
- [x] Each promotion links to its parent business via `businessId`, resolving through `BusinessRepository` and pointing at the Sprint 4 business detail page.
- [x] Expired promotions (past `endDate`) are not displayed as active.

---

## Story 3

As a resident checking in on the community

I want to see announcements and a spotlighted business or event

So that I can catch anything noteworthy without having to ask the WhatsApp group.

Acceptance Criteria

- [x] An announcements section lists current announcements (`title`, `message`, `publishedAt`), sourced from a new `AnnouncementRepository`, ordered newest first.
- [x] Announcements with a past `expiresAt` are not displayed.
- [x] A community spotlight section highlights one `featured` business or event, reusing existing `Business`/`Event` data — not a new review or testimonial mechanism.

---

## Story 4

As a resident who has heard this site might eventually cover local news

I want an honest "coming soon" placeholder rather than an empty or missing section

So that I understand the feature is planned, not broken.

Acceptance Criteria

- [x] A local news section exists on the community page with a clear "coming soon" message.
- [x] No real news content, feed logic or external data source is implemented — this is intentionally a placeholder only.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one content type only (e.g. events, then promotions, then announcements, then the featured content mechanism, then spotlight, then the news placeholder).
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated content types in one AI session.

---

# Documentation Required

Before starting this sprint read:

- CLAUDE.md
- PROJECT.md
- ROADMAP.md
- TODO.md
- CONTEXT.md

If UI work

- DESIGN_SYSTEM.md
- UI_GUIDELINES.md

If architecture changes

- ARCHITECTURE.md
- DECISIONS.md

If deployment changes

- DEPLOYMENT.md

Always for this sprint

- JSON_SCHEMA.md — Event Schema and Promotion Schema (both currently marked "(Future)" — see Risks below), plus the new Announcement schema this sprint defines
- CODING_STANDARDS.md — naming, component structure, Repository Pattern
- TESTING.md — Playwright standards for the community page journey

---

# Deliverables

- [x] Community events section
- [x] Promotions section
- [x] Announcements section
- [x] Featured content mechanism
- [x] Community spotlight
- [x] Local news placeholder

---

# Design Notes

See [notes.md](./notes.md).

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Requires from Sprint 1:

- Repository pattern and JSON data structure — extended in this sprint with `EventRepository`, `PromotionRepository` and a new `AnnouncementRepository`, following the same `Repository → JSON` abstraction as `BusinessRepository`.

Requires from Sprint 2:

- Homepage layout (DESIGN_SYSTEM.md "Homepage Layout") — this sprint extends it with new sections rather than replacing existing ones.

Requires from Sprint 3:

- Card/grid, empty-state, loading-state and pagination patterns built for the business directory — reused for event, promotion and announcement listings rather than inventing new list UI.

Requires from Sprint 4:

- Business detail pages (`/business/[slug]`) — promotions link back into these pages via `businessId`, and the community spotlight can reuse business profile data.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| This sprint intentionally advances scope that PROJECT.md and JSON_SCHEMA.md previously deferred to a later version. PROJECT.md's "Out of Scope" list for Version 1 explicitly excludes "Events" (planned for Version 4 alongside "Community Deals"), and JSON_SCHEMA.md marks both the Event Schema and Promotion Schema "(Future)". This sprint activates both ahead of that original plan. | Planning documents (PROJECT.md, JSON_SCHEMA.md, ROADMAP.md) become internally inconsistent with what has actually shipped if left unchanged | This is a deliberate, explicit decision by the project owner, not an oversight — proceed with implementation, but update PROJECT.md's "Out of Scope"/"Future Roadmap" sections, JSON_SCHEMA.md's "(Future)" labels, and ROADMAP.md's Version 4 placement once this sprint ships (see AI Memory Update below); consider a new ADR documenting the decision |
| No real events or promotions exist yet | Sections may look sparse or empty immediately after launch, undermining the "encourages repeat visits" goal | Populate sample/seed data for at least a few events, promotions and announcements; ensure empty states are genuinely helpful rather than treated as an afterthought |
| Announcements have no existing schema in JSON_SCHEMA.md | Risk of an ad hoc, inconsistent data shape that doesn't follow project conventions | Define a minimal Announcement schema in this sprint following JSON_SCHEMA.md's existing conventions (UTF-8, camelCase, ISO 8601 dates, UUIDs) and its Versioning section (increment `schemaVersion`, document the addition) |
| "Featured content" is built as three separate ad hoc mechanisms (one per content type) instead of one unified concept | Increases maintenance cost and produces inconsistent UI across events/promotions/announcements | Implement featured content as a single mechanism that queries across all three repositories for `featured: true` records, not three parallel implementations |
| Community Spotlight is misread as a review/testimonial feature | Reviews and user-generated testimonials remain explicitly out of scope for Version 1 (PROJECT.md) | Community spotlight only ever surfaces existing `Business` or `Event` data already in the repositories — no new user-generated content type is introduced |

---

# Testing Plan

Unit Tests

- [x] Event/Promotion "is currently active" helpers (start/end date logic) for events, promotions and announcement expiry.
- [x] Featured content selector correctly aggregates `featured` items across events, promotions and announcements.

Integration Tests

- [x] Community page renders events, promotions, announcements, featured content, spotlight and the news placeholder from their respective repositories.
- [x] A promotion links through to the correct business detail page.

Playwright

- [x] Community page loads and displays all six sections.
- [x] Clicking a promotion opens the correct business page.
- [x] Empty states render correctly when a content type has no active records.
- [x] No console errors.

Manual Testing

- [x] Review the community page with a full dataset and with a sparse/empty dataset.
- [x] Confirm the news placeholder reads as "coming soon," not as a broken or missing feature.

Responsive Testing

- [x] Mobile, tablet, desktop, large desktop for all six sections.

Accessibility

- [x] Event/promotion/announcement images have descriptive alt text.
- [x] Heading hierarchy is correct across sections.
- [x] All interactive elements (links to businesses, event details) are keyboard accessible.

---

# Definition of Done

- [x] The site encourages repeat visits even when users aren't looking for a business.
- [x] All acceptance criteria completed.
- [x] All content comes from JSON via repositories.
- [x] Featured content mechanism is unified across content types.
- [x] Code reviewed against REVIEW_CHECKLIST.md.
- [x] TypeScript passes.
- [x] ESLint passes.
- [x] Tests pass.
- [x] Responsive.
- [x] Accessible.
- [x] Documentation updated.
- [x] No console errors.
- [x] Ready for deployment.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Release Notes

Features

- New community content sections: events, promotions, announcements, a unified featured content mechanism, a community spotlight, and a local news placeholder.

Improvements

- Business detail pages (Sprint 4) are now linked from active promotions.

Bug Fixes

- N/A

Known Issues

- Local news remains a "coming soon" placeholder with no real feed.
- Event, Promotion and Announcement content is authored manually via JSON until an admin CMS exists (Sprint 08 Admin).
- This sprint advances scope PROJECT.md/JSON_SCHEMA.md previously deferred — those documents require a follow-up update (see AI Memory Update).

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

- [x] CONTEXT.md
- [x] TODO.md
- [x] ROADMAP.md
- [x] DECISIONS.md (ADR-011)
- [x] CHANGELOG.md
- [x] AI_MEMORY.md
- [x] PROJECT.md — update "Out of Scope" (Events) and "Future Roadmap" Version 4 (Events, Community Deals) now that this sprint has pulled them forward, so the document reflects what has actually shipped.
- [x] JSON_SCHEMA.md — remove the "(Future)" label from the Event Schema and Promotion Schema once shipped, and add the new Announcement schema as a first-class schema.

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

Sprint 07 — Quality: harden the platform with expanded automated test coverage, an accessibility review, and performance/UI polish across everything built in Sprints 1–6.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

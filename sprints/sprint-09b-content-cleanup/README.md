# Sprint 09b – Content Cleanup

Neighbourhood Directory Platform

Sprint Number: 09b (inserted after Sprint 09 — see "Numbering" below)

Sprint Name: Content Cleanup

Sprint Goal: Make every category/suburb filter and the homepage's Popular Categories curation
match the real content that now exists, close the small data-completeness gaps that have been
accumulating in TODO.md's Backlog, and remove content that's still fake with no real replacement.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-09

---

# Numbering

Inserted after Sprint 09 (Production Readiness) and before Sprint 10 (Future Platform
Foundation), without renumbering either — same rationale and precedent as Sprint 08b (see
`sprints/sprint-08b-community-pages/README.md`'s "Numbering" section, and DECISIONS.md ADR-011).
Confirmed explicitly with the project owner (2026-07-09): Sprint 09 (Production Readiness) runs
first once the Vercel deployment is verified live; this sprint follows it. `TODO.md`'s "Next
Sprint" pointer stays on Sprint 09 until that sprint is complete.

---

# Sprint Objective

Sprints 08 and 08b replaced this project's placeholder business/category/promotion/announcement
content with real Akuna Vista content. That swap left two categories of loose ends: (1) UI that
still displays options with zero real content behind them (search filter chips, Popular
Categories), and (2) small backlog items raised along the way that were deliberately tracked
rather than fixed in the moment. This sprint closes both out in one pass.

---

# Business Value

Why does this sprint matter?

- A resident who clicks a "Plumbing" or "Cleaning" category chip on the homepage, or a suburb
  filter for Tallawong/The Ponds/Box Hill/Kellyville on `/search`, currently always gets zero
  results — a dead end that looks like a bug, not a curation choice. Every filter option a
  resident sees should lead somewhere.
- `data/events.json`'s five sample events have been live on the homepage since Sprint 6 with no
  real content behind them — the longer this sits, the more it looks like the platform doesn't
  actually have community events, which undermines trust in exactly the way PROJECT.md's mission
  warns against.
- The `Announcement.sourceUrl` and business data-completeness gaps were both explicitly deferred
  (not forgotten) during real-content work — closing them now keeps the Backlog from becoming a
  permanent graveyard of good intentions.

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] `/search`'s category and suburb filter chips only show options with at least one matching
      real business — clicking any visible chip never produces an empty result set.
- [ ] The homepage's Popular Categories section only features categories with real businesses.
- [ ] `data/events.json`'s fake sample events are removed (empty state accepted) unless real
      event content is provided during this sprint, in which case real events replace them
      instead.
- [ ] `Announcement.sourceUrl` exists as documented in `.ai/JSON_SCHEMA.md` and renders on
      `AnnouncementCard` when present.
- [ ] Whatever real business email/address/opening-hours/social-link data the project owner has
      supplied by the time this sprint runs has been added via `scripts/admin.ts`; what hasn't
      been supplied remains honestly absent, not fabricated.
- [ ] Tests pass. No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Search page: hide empty category/suburb filter chips | High | Not Started |
| F-002 | Homepage: fix Popular Categories `featured` flags | High | Not Started |
| F-003 | Remove (or replace with real content) fake `data/events.json` | High | Not Started |
| F-004 | `Announcement.sourceUrl` field | Medium | Not Started |
| F-005 | Add any real business data supplied by the project owner | Medium | Not Started |
| F-006 | Wire up real community social links in the Footer, if supplied | Low | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a resident using `/search`

I want to only see filter chips for categories and suburbs that actually have listings

So that every filter I click shows me something, instead of a dead end.

Acceptance Criteria

- [ ] `/search`'s category chips are computed from businesses that actually exist, not every
      category in `categories.json` — a category with zero real businesses does not render a chip.
- [ ] `/search`'s suburb chips work the same way, matching `Business.address.suburb` or
      `Business.serviceAreas`.
- [ ] Confirmed via a direct count against `data/businesses.json`, not assumption: as of
      2026-07-09, only Schofields (11/12 businesses) has any real matches among the 5 suburbs;
      10 of 16 categories have at least one real business.

---

## Story 2

As a resident browsing the homepage

I want Popular Categories to reflect categories that actually have listings

So that "popular" means something, rather than showing two categories (Plumbing, Cleaning) with
zero businesses while a category with real listings (Tutoring & Education, the most of any
category) isn't shown at all.

Acceptance Criteria

- [ ] `data/categories.json`: `featured: false` on Plumbing and Cleaning (currently `true`, 0
      real businesses each), `featured: true` on Tutoring & Education (2 businesses) and Real
      Estate (1 business).
- [ ] Electrical and Landscaping & Gardening stay featured — both already have real businesses.

---

## Story 3

As the project owner

I want the fake sample events gone (or replaced) rather than sitting on the live homepage
indefinitely

So that the site doesn't imply community events exist when none have actually been confirmed.

Acceptance Criteria

- [ ] If real event content is supplied before/during this sprint, it replaces
      `data/events.json`'s 5 sample entries (same pattern as Sprint 08b's real business/
      announcement content).
- [ ] If no real event content exists yet when this sprint runs, the 5 sample events are removed
      outright and the Events section falls back to its existing empty state (already built,
      per Sprint 6) rather than continuing to show fake content.

---

## Story 4

As an announcement author

I want to be able to link back to a source (council page, developer DA notice, etc.)

So that residents can read the full original notice, not just a condensed summary.

Acceptance Criteria

- [ ] `Announcement.sourceUrl?: string` added to the schema/type, matching `.ai/JSON_SCHEMA.md`'s
      already-documented "(Future)" scope for this field.
- [ ] `AnnouncementCard` renders a "Read more" link when `sourceUrl` is present, nothing when
      absent.
- [ ] A small migration bumps `schemaVersion`, following `scripts/migrate-add-price-range.ts`'s
      pattern.

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
6. Update TODO.md if required (remove the corresponding Backlog entry once its item is done).

Never combine multiple unrelated features in one AI session or commit.

---

# Documentation Required

Before starting this sprint read:

- CLAUDE.md
- PROJECT.md
- TODO.md (the Backlog section specifically — this sprint closes most of it out)
- CONTEXT.md

If UI work

- DESIGN_SYSTEM.md
- UI_GUIDELINES.md

If architecture changes

- ARCHITECTURE.md
- DECISIONS.md

Always for this sprint

- `.ai/JSON_SCHEMA.md`'s Announcement Schema section (F-004's exact documented scope)
- `sprints/sprint-08-admin/` — `scripts/admin.ts`/`scripts/migrate-add-price-range.ts` patterns,
  reused here rather than reinvented

---

# Deliverables

- [ ] `/search` and homepage Popular Categories only show options with real content behind them
- [ ] `data/events.json` is either real or empty, never fake
- [ ] `Announcement.sourceUrl` implemented end to end (schema, type, migration, UI)
- [ ] Any real business data / social links supplied by the project owner added via
      `scripts/admin.ts`
- [ ] `.ai/TODO.md`'s Backlog section updated — closed items removed, anything still open stays

---

# Design Notes

See [notes.md](./notes.md). No new visual language — F-001/F-002 are filtering logic changes to
existing components (`SearchExperience.tsx`, `PopularCategories.tsx`/`data/categories.json`), not
new UI.

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Requires from Sprint 08 / 08b:

- The real business/category/announcement content this sprint is reconciling the UI against.

Requires from Sprint 05 (Search):

- `SearchExperience.tsx`'s existing category/suburb chip rendering, being modified here to filter
  by real content rather than showing everything unconditionally.

Does not depend on Sprint 09 (Production Readiness) — purely a data/content-accuracy pass, no
deployment/monitoring/security dependency — but runs after it per the project owner's explicit
sequencing decision (2026-07-09), not a technical requirement.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Filtering category/suburb chips by "has a real business" could hide a category the project owner wants visible even while empty (e.g. to signal "we're looking for a hairdresser to list here") | Could suppress a deliberate placeholder/aspirational chip | Confirm the filtering rule with the project owner before implementing (this is exactly what Story 1/2's acceptance criteria assume — flag if that assumption is wrong before coding) |
| F-003 (events), F-005 (business data), F-006 (social links) all depend on the project owner supplying real content during this sprint, which may not happen | Sprint could stall waiting on external input | F-003 has an explicit fallback (remove outright, accept empty state) that doesn't block on real content. F-005/F-006 are scoped as "add whatever's been supplied by the time this runs" — not blocking, not silently skipped either; carry forward whatever isn't supplied yet |
| `Announcement.sourceUrl` migration touches `metadata.json`'s `schemaVersion` again (already bumped twice this project) | Version churn if not tracked carefully | Follow the exact `scripts/migrate-add-price-range.ts` precedent; update `.ai/JSON_SCHEMA.md`'s Versioning section as part of the same commit |

---

# Testing Plan

Unit Tests

- [ ] Search chip filtering logic (whatever function computes "categories/suburbs with real
      businesses") — unit tested with synthetic fixtures, same pattern as
      `lib/services/searchService.test.ts`.
- [ ] `Announcement.sourceUrl` migration — transform correctness, matching
      `scripts/migrate-add-price-range.test.ts`'s pattern.

Integration Tests

- [ ] `scripts/lib/validation.ts` updated and tested for the new `sourceUrl` field.

Playwright

- [ ] `tests/e2e/search.spec.ts`'s existing chip assertions re-verified against the filtered chip
      set (may need updating if a previously-used chip, e.g. "Schofields", is no longer the only
      one shown, or if a currently-referenced category/suburb chip changes).
- [ ] New or extended coverage: a chip for a category/suburb with zero real businesses does not
      render.

Manual Testing

- [ ] Visual check of `/search` and the homepage Popular Categories section before/after.
- [ ] If real events/social links are added, spot-check they render correctly.

Responsive Testing

- [ ] Re-run `tests/e2e/responsive.spec.ts` — chip layout changes (fewer chips) shouldn't break
      wrapping, but verify.

Accessibility

- [ ] Re-run `tests/e2e/accessibility.spec.ts` — no new violations from removed/changed chips.

---

# Definition of Done

- [ ] Acceptance criteria completed.
- [ ] Code reviewed against REVIEW_CHECKLIST.md.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Tests pass (unit + Playwright).
- [ ] Responsive.
- [ ] Accessible.
- [ ] Documentation updated (this sprint's own docs, `.ai/TODO.md` Backlog entries closed out,
      `.ai/JSON_SCHEMA.md` updated for `sourceUrl`).
- [ ] No console errors.
- [ ] Ready for deployment.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Release Notes

Features

- Search and Popular Categories only show filters with real content behind them.
- Announcements can link back to a source.

Improvements

- Homepage/search no longer imply content exists where it doesn't.

Bug Fixes

- N/A (this sprint fixes content-accuracy issues, not application bugs).

Known Issues

- Business data completeness (email/address/opening hours) and Footer social links remain
  partially or fully open if the project owner hasn't supplied that content by the time this
  sprint runs — carried forward, not silently dropped.

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

- [ ] CONTEXT.md
- [ ] TODO.md — remove closed Backlog entries; keep any that carried forward
- [ ] ROADMAP.md
- [ ] DECISIONS.md
- [ ] CHANGELOG.md
- [ ] AI_MEMORY.md

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

Sprint 10 — Future Platform Foundation: lay groundwork for future growth without implementing any
of it yet — a Supabase repository interface, authentication architecture, business claiming
design, an advertising model, multi-community support, an API abstraction layer, and a migration
plan. Design and interfaces only.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

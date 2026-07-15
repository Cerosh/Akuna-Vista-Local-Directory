# Sprint 11 — Backlog

Home Tutoring Listing

Owner: Cerosh Jacob

Last Updated: 2026-07-15

---

# Purpose

Breaks Sprint 11's twelve features into independently shippable items.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Add tutoring business (Featured Businesses) | None | High | Completed |
| B-002 | Add featured promotion ("Free Demo Lesson", 2026-07-27 → 2026-09-04) | B-001 (needs the business's real `id`) | High | Completed |
| B-003 | Un-feature the lawn mowing promotion | None | Medium | Completed |
| B-004 | Homepage parking availability (`lib/transportNsw/carparkService.ts`) | None | High | Completed |
| B-005 | Local Promotions: featured shown first | None | Low | Completed |
| B-006 | Next Train Departures (`lib/transportNsw/departureService.ts` + `app/api/departures/route.ts`) | None | High | Completed |
| B-007 | Layout redesign: `TransitWidget` sidebar next to Hero, transit data no longer pushing the first section down | B-004, B-006 (combines both into one widget) | High | Completed |
| B-008 | `Business.websiteLabel` + "Enroll now" + real contact email | B-001 | Medium | Completed |
| B-009 | Real gallery image for the tutoring business | B-001 | Low | Completed |
| B-010 | Gallery image zoom (lightbox) | B-009 (needs a real image worth zooming) | Medium | Completed |
| B-011 | Swap Local Promotions / Popular Categories order | None | Low | Completed |
| B-012 | Weather "coming soon" placeholder card | B-007 (fills the column that layout created) | Low | Completed |

---

# Prioritisation Notes

- B-003 has zero dependencies and could ship independently/first if the project owner wants the
  featured-promotion swap to happen before the new content is ready.
- B-001/B-002 are sequential (B-002 needs B-001's real business `id`) but both fully unblocked now
  — the promotion's dates, the business's enrolment link, and the featured-flag decision were all
  confirmed 2026-07-15 (see notes.md).
- B-004/B-006 are independent of B-001–B-003/B-005 (different area of the codebase entirely) and
  were built in parallel with each other via a shared `lib/transportNsw/` client — the largest,
  least-precedented items in this sprint; see README.md's Risks table.
- B-007 depended on both B-004 and B-006 existing first, since it combines their output into one
  widget — came from the project owner's direction after locally verifying the sprint, not from
  the original plan.
- B-008–B-012 were also raised after locally verifying the sprint, each a small, independent
  follow-up — see README.md's "Retroactive documentation note" for why these weren't spec-first
  like B-001–B-007, and `.ai/CLAUDE.md`'s "Spec-Driven Development (Strict)" for the rule adopted
  afterward to prevent this going forward.

---

# Out of Scope for This Backlog

Do not add stories for:

- Anything belonging to Sprint 10's scope (Supabase interface, auth architecture, business
  claiming, advertising model, multi-community support, API abstraction, migration plan).
- Any carpark facility beyond 24/26/27/28, or any station beyond Schofields/Tallawong.
- A general-purpose external-API/live-data framework — B-004/B-006 are single-purpose.
- Building the real Weather widget — B-012 is a placeholder only.

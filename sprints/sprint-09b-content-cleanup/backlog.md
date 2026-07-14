# Sprint 09b — Backlog

Content Cleanup

Owner: Cerosh Jacob

Last Updated: 2026-07-09

---

# Purpose

Breaks Sprint 09b's six features into independently shippable items, ordered by what's ready to
implement now versus what's contingent on the project owner supplying real content.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Popular Categories `featured` flag fix | None | High | Completed |
| B-002 | Search filter chip filtering (category + suburb) | None | High | Completed |
| B-003 | `Announcement.sourceUrl` (schema, type, UI, migration) | None | Medium | Completed |
| B-004 | Events: replace `data/events.json` with real content | Date question resolved with project owner (see notes.md) | High | Completed (1 of 3 events added; 2 held out on 2024-dates, carried forward) |
| B-005 | Real business data additions | Real data from project owner | Medium | Carried forward — nothing supplied this sprint |
| B-006 | Footer social link placeholders | None | Low | Completed 2026-07-09 (removed outright, ahead of this sprint) |
| B-007 | `.ai/TODO.md` Backlog cleanup | B-001–B-006 | Medium | Completed |
| B-008 | Homepage section reorder (remove Community Spotlight, move Local Promotions) | None | Medium | Completed |

---

# Prioritisation Notes

- B-001, B-002 and B-008 have zero dependencies and are the fastest wins — do these first.
- B-003 is self-contained and well-specified already (`.ai/JSON_SCHEMA.md` documents the exact
  scope) — no reason to defer it.
- B-004 now has real event content (supplied 2026-07-09) but is blocked on one specific question:
  two of the three events were supplied with 2024 dates, already in the past — see notes.md's ⚠️
  note. This is a quick confirmation, not a big blocker; resolve it early rather than leaving it
  for last.
- B-005 and B-006 are genuinely blocked on external input. Don't stall the rest of the sprint on
  them — implement everything else, then add whatever real data exists by the time B-007 runs,
  and carry forward whatever doesn't.
- B-007 is the natural sprint-close step — update the Backlog to reflect exactly what shipped and
  what's still open.

---

# Out of Scope for This Backlog

Do not add stories for:

- Anything belonging to Sprint 09's actual scope (monitoring, analytics, security headers,
  sitemap/robots.txt, browser compatibility, regression pass).
- New features not already listed in README.md's Features table — this sprint closes existing
  gaps, it doesn't open new ones.

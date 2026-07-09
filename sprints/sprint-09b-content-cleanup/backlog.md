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
| B-001 | Popular Categories `featured` flag fix | None | High | Not Started |
| B-002 | Search filter chip filtering (category + suburb) | None | High | Not Started |
| B-003 | `Announcement.sourceUrl` (schema, type, UI, migration) | None | Medium | Not Started |
| B-004 | Events: replace or remove `data/events.json` | Real event content, if replacing | High | Not Started |
| B-005 | Real business data additions | Real data from project owner | Medium | Blocked (input needed) |
| B-006 | Real Footer social links | Real URLs from project owner | Low | Blocked (input needed) |
| B-007 | `.ai/TODO.md` Backlog cleanup | B-001–B-006 | Medium | Not Started |

---

# Prioritisation Notes

- B-001 and B-002 have zero dependencies and are the fastest wins — do these first.
- B-003 is self-contained and well-specified already (`.ai/JSON_SCHEMA.md` documents the exact
  scope) — no reason to defer it.
- B-004 has a guaranteed path either way (real content or outright removal), so it's not actually
  blocked — "no real content yet" has an explicit, valid resolution (delete).
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

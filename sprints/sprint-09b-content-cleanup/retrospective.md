# Sprint 09b — Retrospective

Content Cleanup

Owner: Cerosh Jacob

Last Updated: 2026-07-09

Status: Complete (2026-07-14) — implemented and verified locally; commit/push/deploy remain open
steps for the project owner.

---

# Lessons Learned

What went well?

- Asking the two genuinely blocking questions up front (event dates, business data) before writing
  any code avoided rework — both had a real risk of silent, hard-to-notice bugs (events invisible
  forever, or business data implied to exist but honestly absent).
- Reusing `searchService.ts`'s existing `businessInSuburb` matching logic for F-001 (rather than
  writing a second, similar-but-different suburb match rule) kept `/search`'s actual filtering and
  its chip-visibility filtering provably consistent.
- Verifying against a real local production server (not just unit/Playwright tests) caught the
  exact section order and chip set live, matching what a resident would actually see.

What could improve?

- The sprint's own tasks.md/backlog.md/README.md status placeholders (`Not Started` everywhere)
  needed a full pass at sprint close to reflect reality — worth updating them incrementally next
  time as each feature lands, not all at once at the end.

Were any engineering standards updated?

- No.

Should DECISIONS.md change?

- No new architectural decision was made this sprint — the event-date and business-data choices
  are content decisions, not architecture, and are recorded in notes.md/TODO.md instead.

Should CODING_STANDARDS.md change?

- No.

---

# Sprint Retrospective

Keep

- Asking blocking content questions before writing code.
- Reusing existing matching/filtering logic instead of duplicating it for a "visibility" variant.
- Verifying against a real running server before calling a sprint done.

Stop

- Nothing identified this sprint.

Start

- Updating sprint tracking docs (tasks.md/backlog.md) incrementally as each feature completes,
  rather than in one pass at the end.

---

# Carry Forward

Items not completed.

| Task | Reason | Next Sprint |
|------|--------|-------------|
| Blacktown Mayoral Fun Run / Blacktown Food Market (`data/events.json`) | Supplied with 2024 dates already past; held out rather than published invisible or with a guessed date | Whenever the project owner supplies updated 2026/2027 dates — not tied to Sprint 10 |
| Business data completeness (email/address/opening-hours/verification) | Project owner had nothing new to supply this sprint | Whenever real data is supplied — not tied to Sprint 10 |
| Commit / push / deploy this sprint's changes | Implementation complete and verified locally; deployment is the project owner's decision | N/A — awaiting explicit instruction |

---

# Metrics

Planned Features: 7 (F-001–F-007, see README.md)

Completed Features: 6 of 7 fully completed (F-001, F-002, F-003 partial-by-design, F-004, F-006,
F-007); F-005 carried forward (contingent on external input that wasn't available this sprint).

Open Bugs: None found.

Documentation Updated: `.ai/TODO.md`, `.ai/CONTEXT.md`, `.ai/JSON_SCHEMA.md`, this sprint's own
README.md/tasks.md/backlog.md/retrospective.md.

Accessibility Reviewed: Yes — `tests/e2e/accessibility.spec.ts` re-run, all passing.

Playwright Coverage: 96/96 passing (Chromium), 176/192 passing with 16 documented skips
(Firefox/WebKit) — 1 new test added (`search.spec.ts`, empty-chip regression coverage).

Sprint Velocity (optional): 7 features, 1 working session.

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [ ] CONTEXT.md
- [ ] TODO.md — remove closed Backlog entries, keep anything carried forward with current status
- [ ] ROADMAP.md
- [ ] DECISIONS.md
- [ ] CHANGELOG.md
- [ ] AI_MEMORY.md

Only update documents that genuinely changed.

---

# Sprint Summary

What was delivered?

- `/search` and homepage Popular Categories only show categories/suburbs with real businesses
  behind them (no more dead-end filter chips).
- `data/events.json` holds only real content (1 event), never fake.
- `Announcement.sourceUrl` implemented end to end.
- Homepage reordered (Community Spotlight removed for now, Local Promotions moved up).

What remains?

- 2 real events held out pending updated dates from the project owner.
- Business data completeness — no new data supplied this sprint.
- Committing, pushing and deploying this sprint's changes.

What should the next sprint focus on?

Sprint 10 — Future Platform Foundation.

---

# Next Sprint Goal

Sprint 10 — Future Platform Foundation: lay groundwork for future growth without implementing any
of it yet.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project better structured, better documented, better tested, easier
to maintain, and closer to the long-term vision.

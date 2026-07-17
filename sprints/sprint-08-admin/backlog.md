# Sprint 08 — Backlog

Admin Preparation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 8's deliverables into ordered, independently shippable items. JSON validation comes first because every other tool in this sprint (import, seed generation, migration) depends on being able to trust — or verify — the data it produces. Backup comes next because it should exist before anything runs a bulk/destructive operation against real data. Everything else follows in dependency order, then CI/Husky integration, then tests.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Build the JSON validation script/library covering every schema in JSON_SCHEMA.md (Business, Category, Suburb, Event, Promotion, Announcement, Settings, Metadata) — required fields, slug rules, UUID identifiers, ISO 8601 dates, no duplicate IDs/slugs | Sprint 1 repository layer, JSON_SCHEMA.md | High | Completed |
| B-002 | Build the backup utility (timestamped, git-ignored snapshot of `data/`) and restore script | B-001 (validate before/after backup operations) | High | Completed |
| B-003 | Build export tooling: JSON → CSV/spreadsheet-friendly format, starting with `businesses.json` | B-001 | High | Completed |
| B-004 | Build import tooling: CSV → JSON, validating every row against B-001 before writing, rejecting invalid rows with specific errors | B-001, B-003 | High | Completed |
| B-005 | Build admin data scripts (add record, update record, toggle `featured`/`verified` flags) operating on `data/*.json` via the command line | B-001, B-002 | Medium | Completed |
| B-006 | Build the seed/generator script capable of producing a full-scale, realistic placeholder dataset (businesses, categories, suburbs, events, promotions, announcements) conforming exactly to JSON_SCHEMA.md, closing the ROADMAP.md Phase 6 gap | B-001, B-002 | Medium | Completed |
| B-007 | Build at least one data migration helper script (mechanical `schemaVersion` bump — e.g. add a new field with a default value across all records in one file) per JSON_SCHEMA.md's Versioning section | B-001, B-002 | Low/Medium | Completed |
| B-008 | Wire JSON validation (B-001) into the Husky pre-commit hook and the GitHub Actions CI workflow from Sprint 1 | B-001 | High | Completed |
| B-009 | Unit tests: validation logic (accepts valid records, rejects each documented rule violation); migration helper transform correctness | B-001, B-007 | High | Completed |
| B-010 | Integration test: export-then-re-import round-trip produces identical data | B-003, B-004 | High | Completed |
| B-011 | Integration test: seed generator output passes validation with zero errors; backup/restore correctly reverts a destructive test operation | B-006, B-002 | Medium | Completed |

---

# Prioritisation Notes

- B-001 (validation) is the foundation of this entire sprint — import, seed generation and migration are only as trustworthy as the validation they run against, so it must land first and be reasonably complete before other items are considered done.
- B-002 (backup) comes immediately after validation and before any tool that writes to `data/` in bulk (import, seed generation, migration) — every subsequent script should be developed and tested with backup/restore available as a safety net.
- B-003 and B-004 (export/import) are a pair — export without a matching, validated import is only half the feature described in README.md's Story 2.
- B-005 (admin data scripts) and B-006 (seed generator) can be built in parallel once B-001/B-002 exist; do not block one on the other.
- B-006 (seed generator) only needs to produce the *tooling*. Whether it is actually run at full production scale during this sprint, or deferred closer to Sprint 9, is intentionally left open — see notes.md. Do not treat "the dataset has been fully seeded" as part of this backlog's definition of done for B-006; "the generator works and produces valid, realistic output" is.
- B-007 (migration helper) is deliberately scoped to one small, mechanical example — resist expanding it into a general migration framework; that would drift toward Sprint 10's much larger, explicitly-not-yet-implemented migration plan.
- B-008 (CI/Husky integration) should only be wired up once B-001 is stable enough not to produce false positives against the current, real `data/` files.
- B-009–B-011 (tests) should be written alongside each corresponding tool, not batched at the end — in particular, keep the round-trip test (B-010) honest by testing against real business records, not a synthetic minimal fixture only.

---

# Out of Scope for This Backlog

Do not add stories for:

- An authenticated admin dashboard, login, or any web UI for editing content — ROADMAP.md Phase 14 "Admin Portal" (🟡 Future).
- A database of any kind — data remains JSON per ADR-002.
- A deployed/always-on tooling service — every script here runs locally or in CI only.
- Content moderation, approval workflows, or analytics — Phase 14 concerns, not this sprint's.
- A general-purpose migration framework or the JSON-to-Supabase migration itself — that is Sprint 10's migration plan, a design/interfaces exercise, not implemented code.
- Deciding and executing the final production-scale seed data run — the generator is built here; running it at full scale is an open decision (see notes.md), not a backlog item to force into this sprint.

If a task from this list seems necessary to "finish" admin preparation, that's a signal scope is creeping toward the future Admin Portal — flag it instead of implementing it.

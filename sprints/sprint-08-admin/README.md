# Sprint 08 – Admin Preparation

Neighbourhood Directory Platform

Sprint Number: 08

Sprint Name: Admin Preparation

Sprint Goal: Prepare for easier content management.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

Make the existing `data/*.json` files safer and more efficient to edit as the dataset grows, without building any authenticated user interface. This sprint is CLI/local developer tooling — JSON validation, import/export scripts, admin data scripts, a seed/generator script, backup utilities, and small JSON-to-JSON migration helpers — run from a terminal (or in CI) against the JSON files already committed to this repository.

**This sprint is explicitly NOT ROADMAP.md's "Phase 14: Admin Portal."** Phase 14 is a 🟡 Future, fully authenticated, web-based dashboard (business management, content moderation, analytics, approvals) that requires Supabase Auth and remains entirely out of scope here. Nothing in Sprint 8 requires authentication, a database, or a deployed web UI. Every deliverable in this sprint is a script a developer or the project owner runs locally, or that CI runs automatically — there is no admin login, no admin route, and no persistent server-side admin process. Where "admin" appears in this sprint's name, read it as "administration of data files," not "administration portal."

Sprints 1–7 built and progressively hardened a site that reads entirely from hand-edited JSON (ADR-002). Sprint 6 explicitly deferred the question of "who authors this content before an admin CMS exists" to manual JSON edits, and flagged Sprint 08 as where that gets addressed. This sprint answers that question — not by building a CMS, but by making manual JSON editing itself safer, faster and less error-prone.

---

# Business Value

Why does this sprint matter?

- ADR-002 accepted JSON as the initial data source specifically to keep the MVP simple, with the explicit consequence that "content updates require repository changes" and "no dynamic editing is available." That trade-off becomes riskier, not safer, as the dataset grows — Sprint 6 alone added three new content types (events, promotions, announcements) that are all hand-edited today.
- Sprint 6's notes.md left an open question unanswered: "who authors and edits events, promotions and announcements before an admin CMS exists?" This sprint is the direct, planned answer — reliable tooling around manual JSON editing, not a CMS.
- Every sprint from here forward (Sprint 9's launch, and any future content additions) depends on the data files staying internally consistent — unique IDs, valid slugs, correct `schemaVersion`, no orphaned `businessId` references. Validation tooling turns "hope the JSON is still valid" into "know the JSON is still valid," before a bad commit ever reaches `main`.
- JSON_SCHEMA.md's "Definition of a Valid JSON File" and "Validation Rules" sections currently describe correctness by hand — this sprint operationalizes those sections into scripts that actually enforce them.
- ROADMAP.md's Phase 6 ("Populate Content": 100 businesses, 25 categories, 250 reviews, 150 recommendations) was never scheduled into any of this project's 10 sprints. This sprint's Seed Data feature is where the tooling to close that gap is built (see Risks below).
- Backup and round-trip-safe import/export reduce the cost of the next content push (Sprint 9 launch prep, or a future bulk content refresh) from "risky manual find-and-replace across JSON files" to "run a script, verify, done."

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] Every file in `data/` can be validated against JSON_SCHEMA.md with a single command, and validation runs automatically in CI and pre-commit.
- [ ] Content can be exported to CSV/spreadsheet-friendly format and re-imported without data loss or corruption.
- [ ] A seed/generator script exists that can produce a full-scale realistic placeholder dataset (100 businesses, 25 categories, and related content) conforming exactly to JSON_SCHEMA.md.
- [ ] A backup utility can snapshot `data/` before a risky bulk change and restore it if needed.
- [ ] At least one working data migration helper exists, demonstrating a mechanical `schemaVersion` bump (e.g. adding a new field with a default value across all records of one file).
- [ ] Tests pass, including an export-then-re-import round-trip test.
- [ ] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | JSON validation | High | Not Started |
| F-002 | Import/export tools | High | Not Started |
| F-003 | Admin data scripts | Medium | Not Started |
| F-004 | Seed data | Medium | Not Started |
| F-005 | Backup utilities | Medium | Not Started |
| F-006 | Data migration helpers | Low/Medium | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a content editor about to commit a change to `data/businesses.json`

I want to validate my edit against JSON_SCHEMA.md before committing

So that a typo, duplicate ID or invalid date never reaches `main` and breaks a repository or a page.

Acceptance Criteria

- [ ] A validation script checks every file in `data/` against its documented schema (required fields, slug rules, UUID identifiers, ISO 8601 dates, no duplicate IDs, no duplicate slugs).
- [ ] The same validation runs in the Husky pre-commit hook (Sprint 1) and in CI (GitHub Actions), so a failing file cannot be committed or merged.
- [ ] Validation errors are specific enough to fix without guessing (file, record, field, rule violated).

---

## Story 2

As someone bulk-editing business listings via a spreadsheet

I want to export businesses to CSV, edit them in a spreadsheet tool, and import the result back

So that bulk edits (e.g. updating opening hours for 30 businesses) don't require 30 manual JSON edits.

Acceptance Criteria

- [ ] An export script converts a chosen JSON file (starting with `businesses.json`) to a CSV/spreadsheet-friendly format, preserving nested fields predictably.
- [ ] An import script converts that CSV back to JSON, matching JSON_SCHEMA.md exactly.
- [ ] Import runs the same validation as Story 1 before writing — invalid rows are rejected with a clear error, not silently written.
- [ ] Exporting immediately followed by importing (no edits) produces byte-for-byte-equivalent data (see Testing Plan).

---

## Story 3

As someone preparing the site for a realistic demo or for launch

I want to generate a full-scale, realistic-looking placeholder dataset (100 businesses, 25 categories, and related reviews/recommendations)

So that the site doesn't look sparse, and ROADMAP.md's Phase 6 ("Populate Content") target is actually achievable with tooling, not by hand.

Acceptance Criteria

- [ ] A seed/generator script produces records conforming exactly to JSON_SCHEMA.md's schemas (Business, Category, Suburb, Event, Promotion, Announcement).
- [ ] Generated data reads as plausible for Akuna Vista (realistic business names, categories, suburbs, opening hours) rather than obviously synthetic ("Business 1", "Business 2").
- [ ] The script is configurable (record counts) rather than hardcoded to always produce exactly 100/25/250/150.
- [ ] Running the generator against a target environment (local vs. eventually production-scale content) is a deliberate, separate decision from building the generator itself (see notes.md Open Questions).

---

## Story 4

As someone about to run a risky bulk change (import, migration, or generator run) against `data/`

I want to take a backup first and restore it if something goes wrong

So that a bad script run doesn't produce an unrecoverable, un-reviewable mess in a JSON file that's otherwise tracked cleanly in Git.

Acceptance Criteria

- [ ] A backup script snapshots the current `data/` directory to a timestamped, git-ignored location before a bulk operation.
- [ ] A restore script reverts `data/` from a chosen backup.
- [ ] Backup/restore is documented as the recommended first step before running import, seed generation, or migration scripts.

---

## Story 5

As someone who just changed a JSON schema (e.g. added a required field to the Business schema)

I want a small script that mechanically transforms existing data to the new schema version

So that every existing record gets the new field with a sensible default, instead of hand-editing every record in every JSON file.

Acceptance Criteria

- [ ] At least one working migration helper script exists that transforms a JSON file from one `schemaVersion` to the next, per JSON_SCHEMA.md's "Versioning" section.
- [ ] The migration helper is a mechanical, single-purpose script (e.g. "add field X with default Y to every record in businesses.json and bump schemaVersion") — not a general-purpose migration framework.
- [ ] Running the migration helper is validated against JSON validation (Story 1) afterwards.
- [ ] This is explicitly distinguished from Sprint 10's "migration plan" (the future JSON-to-Supabase architectural plan) — see notes.md.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one tool only (e.g. validation, then backup, then import/export, then admin data scripts, then the seed generator, then the migration helper, then CI/Husky wiring).
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated tools in one AI session or commit.

---

# Documentation Required

Before starting this sprint read:

- CLAUDE.md
- PROJECT.md
- ROADMAP.md
- TODO.md
- CONTEXT.md

If UI work

- N/A — this sprint has no UI surface (see notes.md "Design Notes").

If architecture changes

- ARCHITECTURE.md
- DECISIONS.md (ADR-002, ADR-003)

If deployment changes

- DEPLOYMENT.md — only if CI workflow changes are needed to run validation.

Always for this sprint

- JSON_SCHEMA.md — all of it: every schema, "Validation Rules," "Versioning," "Migration Strategy," and "Definition of a Valid JSON File" sections, since this sprint turns those sections into tooling.
- CODING_STANDARDS.md — naming, script/file structure conventions apply to `scripts/` the same as application code.
- GIT_WORKFLOW.md — Husky/pre-commit and CI conventions this sprint hooks into.
- TESTING.md — unit test conventions for the validation logic and round-trip tests.

---

# Deliverables

- [ ] JSON validation script(s) covering every file in `data/`, wired into Husky pre-commit and CI
- [ ] Backup and restore utility
- [ ] Import/export tooling (JSON ↔ CSV), validated on import
- [ ] Admin data scripts (add/update/feature-flag records from the command line)
- [ ] Seed/generator script capable of producing a full-scale placeholder dataset per ROADMAP.md Phase 6
- [ ] At least one data migration helper script (schemaVersion bump)
- [ ] Unit tests for validation logic and a round-trip export/import test

---

# Design Notes

See [notes.md](./notes.md). This sprint has no UI — Design Notes there explain why.

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Requires from Sprint 1:

- The repository pattern and JSON data structure (ADR-002, ADR-003) — this sprint's tooling operates on the same `data/*.json` files the repositories read, without changing the repository layer itself.
- Husky + lint-staged and the GitHub Actions CI pipeline already configured in Sprint 1 — this sprint adds a validation step into both, rather than introducing a separate tooling pipeline.

Requires from Sprint 6:

- The new Announcement schema and the activated (no-longer-"(Future)") Event and Promotion schemas — these need the same validation coverage as Business, Category and Suburb, and were not yet covered by any tooling when they were introduced.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| **Gap in the 10-sprint plan**: none of this project's 10 sprints ever scheduled ROADMAP.md's Phase 6 ("Populate Content" — 100 businesses, 25 categories, 250 reviews, 150 recommendations). Sprint 2 built only a small hand-written sample; Sprint 6 built Community Content (events/promotions/announcements), not bulk business data. | Without this sprint, Phase 6 has no home in the plan at all and risks being silently dropped or attempted ad hoc right before launch. | This is flagged explicitly, not hidden. Sprint 8's "Seed data" feature is the natural place to build the *tooling* (a seed/generator script conforming to JSON_SCHEMA.md) capable of producing that full-scale dataset. Whether the generator is actually *run* to populate production-scale data at the end of this sprint, or deferred slightly closer to Sprint 9's launch, is left as an open decision for the project owner (see notes.md) rather than resolved unilaterally here. |
| **Admin Preparation (this sprint) confused with Admin Portal (ROADMAP.md Phase 14)** | Scope creep toward building authentication, a database, or a deployed dashboard — none of which belong in a 🟢 Ready sprint that assumes no auth (ADR-006) and JSON-only data (ADR-002) | State the distinction explicitly (see Sprint Objective above and goals.md Non-Goals): Sprint 8 is local/CI scripts against JSON files; Phase 14 is a 🟡 Future authenticated web dashboard requiring Supabase Auth. Do not implement any part of Phase 14 in this sprint. |
| Import/export tooling could silently corrupt data if it writes JSON without validating it first (e.g. a malformed CSV row overwrites a good record) | A bad import could pass unnoticed until a page fails to build or render, well after the mistake was made | Every import path must run the same validation as the standalone validation script before writing to `data/`; reject invalid rows with a specific error rather than writing partial/invalid data; always take a backup (F-005) before a bulk import |
| Seed data generation produces unrealistic-looking placeholder content ("Business 1", "Lorem Ipsum Plumbing"), undermining trust in demos or a soft launch — a risk already flagged in Sprint 2's notes about placeholder content quality | A visibly fake-looking directory contradicts PROJECT.md's trust-focused product philosophy | Generator should produce plausible Akuna Vista–style names, categories, suburbs and content variety rather than numbered placeholders; spot-check generated output before treating it as demo-ready |
| Data migration helpers (JSON-to-JSON, this sprint) could be conflated with Sprint 10's JSON-to-Supabase migration plan | Reader/future AI session assumes this sprint solves the Supabase migration, or that Sprint 10 duplicates this sprint's work | Explicitly distinguish the two in notes.md: this sprint's helpers are small, mechanical, single-purpose `schemaVersion` bump scripts; Sprint 10's migration plan is a conceptual/architectural document, not implemented code |

---

# Testing Plan

Unit Tests

- [ ] Validation logic correctly accepts valid records and rejects records violating each rule in JSON_SCHEMA.md's "Validation Rules" and "Definition of a Valid JSON File" (missing required fields, duplicate IDs, duplicate slugs, invalid dates, invalid slug format).
- [ ] Migration helper correctly transforms a sample file from one `schemaVersion` to the next, including default-value backfill.

Integration Tests

- [ ] **Round-trip test**: exporting a JSON file to CSV and immediately re-importing it (no edits) produces data identical to the original, field-for-field, including nested structures (e.g. `address`, `openingHours`).
- [ ] Seed generator output passes the validation script with zero errors.
- [ ] Backup/restore correctly returns `data/` to its prior state after a destructive test operation.

Manual Testing

- [ ] Run validation against the current, real `data/*.json` files and confirm zero errors on known-good data.
- [ ] Deliberately corrupt a test copy of a JSON file (duplicate ID, bad date) and confirm validation catches it with a specific, actionable message.
- [ ] Run the seed generator and manually spot-check a sample of generated businesses for realism.

Responsive Testing

- [ ] N/A — no UI is introduced in this sprint.

Accessibility

- [ ] N/A — no UI is introduced in this sprint.

---

# Definition of Done

- [ ] Updating content becomes efficient and reliable.
- [ ] All acceptance criteria completed.
- [ ] JSON validation runs in Husky pre-commit and CI, covering every file in `data/`.
- [ ] Import/export round-trip test passes.
- [ ] Seed generator produces schema-valid, realistic output.
- [ ] Backup/restore utility verified against a real destructive scenario.
- [ ] At least one migration helper implemented and tested.
- [ ] Code reviewed against REVIEW_CHECKLIST.md.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Tests pass.
- [ ] Documentation updated.
- [ ] No console errors when scripts run.
- [ ] Ready for the next sprint (Production Readiness).

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Release Notes

Features

- JSON validation tooling covering every schema in JSON_SCHEMA.md, wired into pre-commit and CI.
- Import/export tooling (JSON ↔ CSV) for bulk content edits.
- Admin data scripts for common command-line data operations.
- A seed/generator script capable of producing a full-scale placeholder dataset (ROADMAP.md Phase 6).
- Backup and restore utilities for `data/`.
- A data migration helper demonstrating a mechanical `schemaVersion` bump.

Improvements

- Sprint 6's manually-authored content types (events, promotions, announcements) now have validation coverage they lacked when introduced.

Bug Fixes

- N/A

Known Issues

- No authenticated admin dashboard exists — content is still edited via JSON files and these scripts, not a web UI. That remains ROADMAP.md Phase 14 (🟡 Future).
- Whether the seed generator has been run to populate a full production-scale dataset, or deferred to closer to Sprint 9's launch, is recorded as an open decision (see notes.md).

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
- [ ] TODO.md
- [ ] ROADMAP.md — consider annotating Phase 6 with how/when its tooling was delivered (Sprint 8) versus when it was actually run.
- [ ] DECISIONS.md
- [ ] CHANGELOG.md
- [ ] AI_MEMORY.md
- [ ] JSON_SCHEMA.md — consider whether a "Tooling" or "Validation" cross-reference should be added pointing at this sprint's scripts (see retrospective.md).

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

Sprint 09 — Production Readiness: prepare for public launch with analytics, monitoring, error logging, security headers, `robots.txt`, sitemap, final metadata review, browser compatibility checks and final testing.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

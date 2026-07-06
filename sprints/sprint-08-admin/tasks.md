# Sprint 08 — Technical Tasks

Admin Preparation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# JSON Validation

- [ ] Implement a validation library covering every schema in JSON_SCHEMA.md: Business, Category, Suburb, Event, Promotion, Announcement, Settings, Metadata.
- [ ] Enforce "Validation Rules" (required fields per type) and "Definition of a Valid JSON File" (UTF-8, no duplicate IDs, unique slugs, valid dates, no unused fields, consistent formatting).
- [ ] Enforce Slug Rules (lowercase, hyphenated, letters/numbers/hyphens only, unique) and Identifier Rules (UUIDs, never changed after creation).
- [ ] Enforce date rules (ISO 8601 only, no locale-specific formats).
- [ ] Produce specific, actionable error messages (file, record identifier, field, rule violated) — not a generic "invalid JSON" failure.
- [ ] Add a single command (e.g. `npm run validate:data`) that validates every file in `data/` in one run.
- [ ] Run validation against the current, real `data/*.json` files and confirm zero errors on known-good data.

---

# Backup Utilities

- [ ] Build a backup script that snapshots the current `data/` directory to a timestamped, git-ignored location.
- [ ] Build a restore script that reverts `data/` from a chosen backup snapshot.
- [ ] Document backup/restore as the recommended first step before running import, seed generation, or migration scripts.
- [ ] Verify restore against a real destructive test scenario (e.g. corrupt a copy, restore, confirm correctness).

---

# Import/Export Tools

- [ ] Build an export script: JSON → CSV/spreadsheet-friendly format, starting with `businesses.json`, handling nested fields (`address`, `openingHours`, `coordinates`, `socialLinks`) predictably.
- [ ] Build an import script: CSV → JSON, reconstructing nested fields correctly.
- [ ] Run full validation (JSON Validation section above) on every imported row before writing to `data/`; reject invalid rows with a specific error instead of writing partial/invalid data.
- [ ] Confirm export-then-import (no edits) round-trips to identical data (see Testing section).
- [ ] Extend export/import to additional files (`categories.json`, `events.json`, `promotions.json`, `announcements.json`) once the pattern is proven on `businesses.json`.

---

# Admin Data Scripts

- [ ] Build a script to add a new record to a chosen JSON file with required fields prompted or passed as arguments, validated before writing.
- [ ] Build a script to update an existing record by `id`/`slug`, validated before writing.
- [ ] Build a script to toggle boolean flags (`featured`, `verified`) on a record by `id`/`slug`.
- [ ] Ensure every admin data script runs validation before writing and takes/recommends a backup for anything beyond a single-field change.

---

# Seed Data Generator

- [ ] Build a generator script capable of producing a full-scale placeholder dataset per ROADMAP.md Phase 6 (target: 100 businesses, 25 categories, related events/promotions/announcements) — this is the tooling that closes the gap flagged in README.md Risks and notes.md.
- [ ] Ensure generated records conform exactly to JSON_SCHEMA.md's schemas, including required fields, slugs, UUIDs, and ISO 8601 dates.
- [ ] Ensure generated content is plausible for Akuna Vista (realistic business names, categories, suburbs, opening hours, descriptions) rather than obviously synthetic ("Business 1", lorem ipsum) — a risk flagged back in Sprint 2's notes about placeholder content quality.
- [ ] Make record counts configurable rather than hardcoded.
- [ ] Run generator output through the validation script (zero errors required) before treating output as usable.
- [ ] Do not decide in this task list whether the generator is run at full scale now or closer to Sprint 9 — leave that decision open in notes.md.

---

# Data Migration Helpers

- [ ] Implement at least one working migration helper script that transforms a JSON file from one `schemaVersion` to the next (e.g. add a new field with a default value across every record in a file) per JSON_SCHEMA.md's "Versioning" section.
- [ ] Keep the helper small, mechanical and single-purpose — do not build a general-purpose migration framework.
- [ ] Bump `schemaVersion` in `metadata.json` as part of running the helper, consistent with JSON_SCHEMA.md.
- [ ] Validate the migrated file with the validation script after the transform.
- [ ] Document clearly (see notes.md) that this is distinct from Sprint 10's JSON-to-Supabase migration plan.

---

# CI / Husky Integration

- [ ] Add JSON validation to the Husky pre-commit hook configured in Sprint 1, so an invalid `data/*.json` file cannot be committed.
- [ ] Add JSON validation as a step in the GitHub Actions CI workflow from Sprint 1, so an invalid file cannot be merged even if pre-commit was bypassed.
- [ ] Confirm both integrations fail loudly and specifically (not a silent pass) when a file is invalid.

---

# Testing

- [ ] Unit tests: validation accepts valid records and rejects each documented rule violation (missing required field, duplicate ID, duplicate slug, invalid slug format, invalid date, non-UUID identifier).
- [ ] Unit tests: migration helper transform correctness (field added with correct default, `schemaVersion` bumped, existing data otherwise unchanged).
- [ ] Integration test: export a JSON file to CSV and re-import it with no edits; assert the result is identical to the original, field-for-field, including nested structures.
- [ ] Integration test: seed generator output passes validation with zero errors.
- [ ] Integration test: backup/restore correctly reverts `data/` after a destructive test operation.
- [ ] Manual test: deliberately corrupt a test copy of a JSON file and confirm validation catches it with an actionable message.

---

# Documentation

- [ ] Update JSON_SCHEMA.md if this sprint reveals gaps in the documented schemas needed for validation to be complete (e.g. missing required-field lists for Event/Promotion/Announcement).
- [ ] Consider adding a "Tooling"/"Validation" cross-reference section to JSON_SCHEMA.md pointing at this sprint's scripts (see retrospective.md).
- [ ] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).
- [ ] Document each script's usage (command, arguments, expected output) close to the script itself.

---

# Out of Scope

Do not build in this sprint:

- An authenticated admin dashboard or any web UI for editing content — ROADMAP.md Phase 14 "Admin Portal" (🟡 Future).
- A database — data remains JSON per ADR-002.
- A deployed/always-on admin service — scripts run locally or in CI only.
- Content moderation, approval workflows, or analytics dashboards.
- A general-purpose migration framework, or the actual JSON-to-Supabase migration — that belongs to Sprint 10's migration plan (design/interfaces only, not implemented here).
- A final decision to run the seed generator at full production scale — building the generator is in scope; running it at scale is an open decision (see notes.md).

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, JSON_SCHEMA.md, and the specific standards doc for the task).
2. Implement one tool only (validation, then backup, then import/export, then admin data scripts, then the seed generator, then the migration helper, then CI/Husky wiring).
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits (see GIT_WORKFLOW.md).
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated tools in a single AI session or commit.

# Sprint 08 — Review

Admin Preparation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

Track review status for Sprint 8 work against REVIEW_CHECKLIST.md, adapted for tooling with no UI surface. Data integrity and round-trip correctness replace visual/UI concerns as the primary review focus. Fill in as Pull Requests are opened and reviewed — do not pre-fill outcomes before work exists.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Review Checklist (per REVIEW_CHECKLIST.md, adapted for data tooling)

Apply this to every Pull Request in this sprint, in order:

1. **Requirements** — Matches this sprint's tasks.md; no authenticated admin UI, database, or deployed admin surface snuck in (that remains ROADMAP.md Phase 14).
2. **Architecture** — Scripts operate only on `data/*.json` via a shared validation library; no script bypasses validation before writing; no change was made to the repository layer's read path (`BusinessRepository` etc.) that Sprint 1–7 built.
3. **Data Integrity** — Output of every script (import, admin data scripts, seed generator, migration helper) passes JSON validation with zero errors; no duplicate IDs or slugs introduced; UUIDs never altered on existing records; dates remain ISO 8601.
4. **Round-Trip Correctness** — Export-then-import of a JSON file with no edits produces data identical to the original, field-for-field, including nested structures (`address`, `openingHours`, `coordinates`, `socialLinks`).
5. **Components** — Validation, backup, import/export, admin data scripts, seed generator and migration helper are each self-contained, single-purpose scripts; validation logic is written once and reused across entry points, not duplicated per script.
6. **TypeScript** — Strict mode, no `any`, explicit handling of malformed CSV rows and missing/invalid fields during import.
7. **Readability** — Clear script naming and usage documentation; a new contributor can run any script from its own documentation without needing this file.
8. **Performance** — Validation and generation scripts complete in a reasonable time for the current and Phase 6–scale dataset sizes; no unnecessary full-file reparsing.
9. **Reversibility** — A backup exists (or is explicitly recommended in output) before any destructive/bulk operation runs; restore has been exercised and confirmed to work.
10. **Security** — No secrets or credentials introduced; scripts operate only on local files, never call an external network service; user-supplied CSV/JSON input is never evaluated or executed, only parsed.
11. **Data Realism** — Seed generator output reads as plausible Akuna Vista content, not obviously synthetic placeholders (per README.md Risks and Sprint 2's notes).
12. **Testing** — Unit tests for validation logic and migration transform correctness pass; the export/import round-trip integration test passes; seed generator output validation test passes.
13. **Documentation** — JSON_SCHEMA.md reviewed for whether a "Tooling"/"Validation" cross-reference is warranted; TODO.md / CONTEXT.md updated once the sprint completes; the migration-helpers-vs-migration-plan distinction (notes.md) is not contradicted anywhere in the PR description.
14. **Git** — Conventional Commit messages; one tool per commit where practical; Husky pre-commit and CI validation both pass on the PR itself.

---

# Testing Plan (execution record)

Unit Tests

- [ ] Validation logic accepts valid records and rejects each documented rule violation (missing required field, duplicate ID, duplicate slug, invalid slug format, invalid date, non-UUID identifier).
- [ ] Migration helper transform correctness (field added with correct default, `schemaVersion` bumped, existing data otherwise unchanged).

Integration Tests

- [ ] **Round-trip**: export a JSON file to CSV and re-import with no edits; result is identical to the original, field-for-field.
- [ ] Seed generator output passes validation with zero errors.
- [ ] Backup/restore correctly reverts `data/` after a destructive test operation.

Manual Testing

- [ ] Run validation against the current, real `data/*.json` files; confirm zero errors on known-good data.
- [ ] Deliberately corrupt a test copy of a JSON file (duplicate ID, bad date); confirm validation catches it with an actionable message.
- [ ] Run the seed generator and manually spot-check a sample of generated businesses for realism.
- [ ] Attempt to commit a deliberately invalid JSON file; confirm Husky pre-commit blocks it.
- [ ] Confirm CI blocks a merge if validation fails (e.g. by testing on a throwaway branch).

Responsive Testing

- [ ] N/A — no UI is introduced in this sprint.

Accessibility

- [ ] N/A — no UI is introduced in this sprint.

---

# Release Checklist (pre-merge to `main`)

- [ ] Build succeeds.
- [ ] Lint succeeds.
- [ ] Type checking succeeds.
- [ ] JSON validation passes against the current `data/` directory.
- [ ] Round-trip export/import test passes.
- [ ] Backup/restore verified against a real scenario.
- [ ] Documentation updated (script usage notes; JSON_SCHEMA.md cross-reference considered).
- [ ] No critical or high review findings remain open.
- [ ] Definition of Done (see README.md) satisfied — updating content is efficient and reliable.
- [ ] Husky pre-commit and CI both enforce validation.

---

# Findings Log

Record review findings here as they're raised, using REVIEW_CHECKLIST.md severity levels (Critical / High / Medium / Low).

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| | | | |

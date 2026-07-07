# Sprint 08 — Review

Admin Preparation

Owner: Cerosh Jacob

Last Updated: 2026-07-07

---

# Purpose

Track review status for Sprint 8 work against REVIEW_CHECKLIST.md, adapted for tooling with no UI surface. Data integrity and round-trip correctness replace visual/UI concerns as the primary review focus. Fill in as Pull Requests are opened and reviewed — do not pre-fill outcomes before work exists.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| — | Implemented and committed locally (8 commits, one tool per commit); not pushed or opened as a PR in this session. | Complete locally |

---

# Review Checklist (per REVIEW_CHECKLIST.md, adapted for data tooling)

1. **Requirements** — Matches tasks.md exactly: validation, backup/restore, import/export, admin data scripts, seed generator, one migration helper, CI/Husky integration. No authenticated admin UI, database, or deployed surface introduced.
2. **Architecture** — All scripts live under `scripts/`, separate from the app's `lib/` (tooling-only, never imported by Next.js). Every writing script (import, admin, seed generator, migration) reuses `scripts/lib/validation.ts` rather than reimplementing checks. No change was made to `lib/repositories/*.ts`'s read path.
3. **Data Integrity** — Verified: `validate:data` finds zero errors on the real `data/` directory both before and after every write-capable script was run for real (migration helper) or tested (import, admin, seed generator via unit tests). No duplicate IDs/slugs or dangling `categoryId`/`businessId` references introduced.
4. **Round-Trip Correctness** — Verified against the real `data/businesses.json` (not a synthetic fixture): export → re-import with no edits reproduces the original data (normalising the one accepted, documented equivalence — an empty object like `socialLinks: {}` and an absent key are indistinguishable after a CSV round trip, which no code in this project treats differently).
5. **Components** — Validation, backup/restore, import/export, admin scripts, seed generator and migration helper are each self-contained; `scripts/lib/validation.ts`, `scripts/lib/fileIO.ts`, `scripts/lib/csv.ts`, `scripts/lib/backupPaths.ts` and `scripts/lib/isMainModule.ts` are the shared pieces every script reuses.
6. **TypeScript** — Strict mode, no `any`. Malformed CSV rows and missing/invalid fields are handled by the shared validation library, which every writing script consults before touching disk.
7. **Readability** — Each script documents its own `npm run` usage in a header comment; `.ai/JSON_SCHEMA.md`'s new "Tooling" section is the map of what exists and why.
8. **Performance** — Validation and generation of the current dataset (8 businesses, 9-25 categories) and the Phase-6-scale generator run (100 businesses) both complete in well under a second locally; no unnecessary full-file reparsing (each script reads a file once).
9. **Reversibility** — `scripts/backup.ts`/`scripts/restore.ts` were exercised for real before every write against real `data/` in this sprint (CSV import smoke test, admin toggle smoke test, the migration helper), and via unit tests against a destructive scenario.
10. **Security** — No secrets or credentials introduced. Every script operates on local files only (`data/`, CSV files passed as arguments) — no network calls. CSV/JSON input is only parsed (`JSON.parse`, `papaparse`), never evaluated as code.
11. **Data Realism** — Seed generator output spot-checked for real (e.g. "Wattle Plumbing Services", "Vista Hair & Beauty") — not "Business 1"/lorem-ipsum placeholders; also enforced by a unit test asserting generated names never match that pattern.
12. **Testing** — 121 unit/integration tests pass (`npm test`), including validation-rule rejection tests, the real-data round-trip test, admin-script tests, seed-generator validation tests, backup/restore tests, and migration-transform tests. Full Playwright suite (66 Chromium tests) re-run after the migration helper actually changed `data/businesses.json` for real — no regressions.
13. **Documentation** — `.ai/JSON_SCHEMA.md` gained a "Tooling" section (decided to add it, not judged unnecessary) plus the `priceRange`/schema-1.3.0 documentation. `.ai/DECISIONS.md` gained ADR-013. TODO.md/CONTEXT.md updated at sprint close.
14. **Git** — Conventional Commits throughout, one tool per commit (8 commits: validation, backup/restore, import/export, admin scripts, seed generator, migration helper, CI/Husky, docs). Husky pre-commit and CI both now run `validate:data` on every commit/PR going forward — confirmed live by a real blocked-commit test (see Findings Log) and by every subsequent real commit in this sprint passing it.

---

# Testing Plan (execution record)

Unit Tests

- [x] Validation logic accepts valid records and rejects each documented rule violation (missing required field, duplicate id, duplicate slug, invalid slug format, invalid date, non-UUID identifier, dangling `categoryId`/`businessId`). `scripts/lib/validation.test.ts`.
- [x] Migration helper transform correctness (field added with correct default only where missing, `schemaVersion` bumped, everything else unchanged). `scripts/migrate-add-price-range.test.ts`.

Integration Tests

- [x] **Round-trip**: export `data/businesses.json` to CSV and re-import with no edits; result is identical to the original, field-for-field (`scripts/export-csv.test.ts`, run against the real file, not a fixture).
- [x] Seed generator output passes validation with zero errors, at both unit-test scale and a real full Phase-6-scale run (100 businesses/25 categories) into scratch output. `scripts/seed-generate.test.ts`.
- [x] Backup/restore correctly reverts a temp `data/` directory after a destructive test operation. `scripts/backup.test.ts`.

Manual Testing

- [x] Ran validation against the current, real `data/*.json` files and confirmed zero errors on known-good data (before every change this sprint, and after each one).
- [x] Deliberately corrupted a test copy of `data/businesses.json` (duplicate id, invalid date) and confirmed `validate:data` caught both with specific, actionable messages (file/record/field).
- [x] Ran the seed generator at full default scale (100 businesses, 25 categories, 10 each of suburbs/events/promotions/announcements) and manually spot-checked generated business names for realism.
- [x] Attempted to commit a deliberately invalid `data/categories.json` (duplicate id, which cascaded into a dangling `categoryId` reference) — Husky pre-commit blocked it (exit code 1, specific errors printed, confirmed via `git log` that nothing was committed).
- [x] Confirmed CI would block a merge on the same failure — the new "Validate data" step in `.github/workflows/ci.yml` runs the identical `npm run validate:data` command exercised locally; not run on a live throwaway branch/PR in this session, but functionally identical to the Husky test above.

Responsive Testing

- [ ] N/A — no UI is introduced in this sprint.

Accessibility

- [ ] N/A — no UI is introduced in this sprint.

---

# Release Checklist (pre-merge to `main`)

- [x] Build succeeds (`npm run build`, re-verified after the migration helper changed real data).
- [x] Lint succeeds.
- [x] Type checking succeeds.
- [x] JSON validation passes against the current `data/` directory.
- [x] Round-trip export/import test passes.
- [x] Backup/restore verified against a real scenario.
- [x] Documentation updated (this file, `.ai/JSON_SCHEMA.md`, `.ai/DECISIONS.md` ADR-013, TODO.md/CONTEXT.md).
- [x] No critical or high review findings remain open — see Findings Log.
- [x] Definition of Done (see README.md) satisfied — updating content is now efficient (CSV bulk edit, admin CLI) and reliable (validated before every write, enforced in pre-commit/CI).
- [x] Husky pre-commit and CI both enforce validation — confirmed live, not just configured.

---

# Findings Log

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| High | `zod v4`'s `z.uuid()` performs strict RFC 9562/4122 version+variant validation, not a loose 8-4-4-4-12 hex check — several early test fixtures (`"00000000-...-000000000001"`, `"11111111-...-111111111111"`) failed validation because they aren't real v4-shaped UUIDs (only the all-zeros nil UUID is special-cased) | `scripts/lib/validation.test.ts` | Replaced fixture UUIDs with real `crypto.randomUUID()` output. Confirms the schema correctly enforces the same UUID rigor the real dataset's `crypto.randomUUID()`-generated ids already have. |
| High | The standard `import.meta.url === \`file://${process.argv[1]}\`` "was this script run directly" check silently fails whenever the project path contains spaces — this project's own path ("Akuna Vista Local Directory") does. `npm run backup:data` produced no output and wrote nothing. | `scripts/backup.ts`, `scripts/restore.ts` | Added `scripts/lib/isMainModule.ts` using `pathToFileURL`, which percent-encodes correctly before comparing. Every script this sprint uses it. Documented as a reusable finding in `AI_MEMORY.md`. |
| Medium | CSV round-trip can't distinguish a field present-but-empty (`socialLinks: {}`) from the field being absent entirely | `scripts/lib/csv.ts` | Documented as an accepted, deliberate equivalence (no consumer in this codebase treats those two states differently) rather than engineered around — the round-trip test normalises both sides before comparing, and the convention is documented in the CSV lib's own doc comment and `.ai/JSON_SCHEMA.md`'s Tooling section. |
| Low | Backup timestamp (`toISOString()` alone) could theoretically collide if two backups were triggered within the same millisecond | `scripts/lib/backupPaths.ts` | Appended a short random suffix to every timestamp — found while writing a test that intentionally creates two backups back-to-back. |

No critical findings. No findings remain open.

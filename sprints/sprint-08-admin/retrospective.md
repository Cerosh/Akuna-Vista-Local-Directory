# Sprint 08 — Retrospective

Admin Preparation

Owner: Cerosh Jacob

Last Updated: 2026-07-07

Status: Complete — Definition of Done met.

---

# Lessons Learned

What went well?

- Building the validation library first (per backlog.md's own prioritisation) paid off exactly as
  planned — every subsequent script (import, admin, seed generator, migration helper) reused it
  rather than reimplementing checks, and every one of them was verified against real,
  zero-tolerance validation before being trusted.
- Testing every write-capable script for real against the actual `data/` directory (not just unit
  tests against fixtures) — with a mandatory backup first — caught two real bugs unit tests alone
  would have missed: the `isMainModule` path-encoding bug (only reproduces with a real project
  path containing spaces) and confirmed the pre-commit hook genuinely blocks a bad commit (not
  just "should block it").
- Keeping the seed generator's production-scale run scoped to scratch output, per notes.md's
  explicit Open Question, avoided quietly making a product decision (whether/when to populate
  `data/` at full scale) that belongs to the project owner.

What could improve?

- `zod` v4's stricter UUID validation (real RFC 9562/4122 version+variant checks, not a loose
  hex-shape check) wasn't anticipated and cost a debugging cycle on test fixtures. Worth
  remembering for any future zod schema work: generate real `crypto.randomUUID()` values for
  fixtures rather than hand-writing sequential/patterned ones.
- The CSV empty-object-vs-absent ambiguity was found late (during the real round-trip smoke test)
  rather than during initial design — a design-time read of the actual sample data (`socialLinks:
  {}` appears in 7 of 8 real businesses) would have surfaced it sooner.

Were any engineering standards updated?

- None of the existing `.ai/*.md` standards documents needed changes — CODING_STANDARDS.md's
  existing conventions (camelCase utilities, strict TypeScript, dependency injection for
  testability) applied cleanly to `scripts/` without modification.

Should DECISIONS.md change?

- Yes — added ADR-013, "Introduce local/CI data tooling ahead of an admin database," documenting
  why this sprint built scripts now rather than pulling forward the Admin Portal (Phase 14) or a
  Supabase migration.

Should CODING_STANDARDS.md change?

- Considered (per the original suggestion in this document): a short "Scripts" section documenting
  that `scripts/` follows the same conventions as `lib/` (camelCase files, dependency-injected
  root/directory paths for testability, one exported `main()`-guarded entry point per script) could
  help a future contributor. Not added in this sprint — the existing conventions already
  transferred without needing new prose, and `.ai/JSON_SCHEMA.md`'s new Tooling section already
  points at `scripts/` as the reference. Revisit if a future sprint finds the pattern non-obvious.

---

# Sprint Retrospective

Keep

- Backup-before-any-real-write-against-`data/`, every time, without exception — this sprint never
  needed an actual restore, but the discipline made every real-data smoke test low-risk.
- Verifying tooling against the real dataset, not only synthetic fixtures, before calling a script
  "done."

Stop

- Hand-writing UUID-shaped test fixtures instead of generating real ones — costs a debugging cycle
  for no benefit.

Start

- Reading a representative sample of real data before designing a transformation (flatten/unflatten,
  a migration) that needs to round-trip it exactly.

---

# Carry Forward

Items not completed.

| Task | Reason | Next Sprint |
|------|--------|-------------|
| Seed generator not run against the real `data/` directory at production scale | Deliberately left open per notes.md's Open Questions — a product/content decision, not an engineering one | Project owner to decide; revisit before or during Sprint 9 (Production Readiness) launch prep if the site still looks sparse |
| CI's new "Validate data" step not exercised on a live GitHub Actions run (PR/branch) | This session works locally only; no push was made | Confirm on the first real PR/push that touches `data/` |
| `CODING_STANDARDS.md` "Scripts" conventions section | Considered, judged not yet necessary (see Lessons Learned) | Revisit if a future sprint's script work finds the existing conventions ambiguous |

---

# Metrics

Planned Features: 6 (F-001–F-006, see README.md)

Completed Features: 6 of 6 — JSON validation, Import/export tools, Admin data scripts, Seed data, Backup utilities, Data migration helpers.

Open Bugs: 0.

Documentation Updated: `.ai/JSON_SCHEMA.md` (Tooling section, `priceRange`/schema 1.3.0), `.ai/DECISIONS.md` (ADR-013), `.ai/TODO.md`, `.ai/CONTEXT.md`, `sprints/sprint-08-admin/review.md`, this file.

Round-Trip Test Passing: Yes — against the real `data/businesses.json`, not a synthetic fixture.

Seed Generator Run at Production Scale: **Deferred** — built, tested, and run once at full default scale (100 businesses/25 categories) into git-ignored scratch output (`scripts/seed/output/`) to prove it works; not run against the real `data/` directory. See Carry Forward.

Sprint Velocity (optional): 8 commits (`feat:` ×6, `ci:` ×1, `docs:` ×1), one tool per commit throughout, per this sprint's own AI Development Plan.

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [x] CONTEXT.md — mark Sprint 08 complete, update "Current Phase" to Sprint 09.
- [x] TODO.md — replace Sprint 08 content with Sprint 09 scope.
- [ ] ROADMAP.md — Phase 6 ("Populate Content") tooling was delivered this sprint, but the actual population run remains undecided/deferred (see Carry Forward) — not annotated as "delivered," since the generator existing isn't the same as Phase 6's content existing. Revisit once the seed-generator-at-scale decision is made.
- [x] DECISIONS.md — added ADR-013.
- [ ] CHANGELOG.md — still does not exist; not introduced as a side effect of this sprint either (consistent with Sprint 07's same decision).
- [x] AI_MEMORY.md — added the `isMainModule`/`pathToFileURL` path-encoding gotcha as a new Framework Gotcha, since it's exactly the kind of non-obvious, hard-won finding that document exists for.

Only update documents that genuinely changed.

---

# Sprint Summary

What was delivered?

- A single, reused validation library (`scripts/lib/validation.ts`) covering every schema in
  `.ai/JSON_SCHEMA.md`, wired into a CLI, Husky pre-commit, and CI.
- Backup/restore, JSON↔CSV import/export (round-trip verified against real data), admin
  add/update/toggle scripts, a realistic seed/generator script (built and proven, not run at
  scale), and one real, executed data migration helper (`Business.priceRange`, schema `1.3.0`).
- `.ai/JSON_SCHEMA.md`'s Validation Rules and Definition of a Valid JSON File sections are now
  enforced code, not just prose.

What remains?

- The decision of whether/when to populate `data/` at full Phase-6 scale (open, by design).
- Live confirmation of the new CI step on an actual GitHub Actions run.

What should the next sprint focus on?

Sprint 09 — Production Readiness.

---

# Next Sprint Goal

Sprint 09 — Production Readiness: prepare for public launch with analytics, monitoring, error logging, security headers, `robots.txt`, sitemap, final metadata review, browser compatibility checks and final testing.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project better structured, better documented, better tested, easier to maintain, and closer to the long-term vision.

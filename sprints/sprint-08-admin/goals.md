# Sprint 08 — Goals

Admin Preparation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Prepare for easier content management.

---

# Objective

Build CLI/local developer tooling — JSON validation, import/export tools, admin data scripts, a seed data generator, backup utilities, and data migration helpers — that make editing `data/*.json` safer and more efficient, without building any authenticated admin dashboard.

---

# Why This Sprint Exists

ADR-002 accepted JSON as the platform's initial data source specifically to keep the MVP simple, explicitly accepting that "content updates require repository changes" and "no dynamic editing is available." That trade-off was reasonable when the dataset was small and hand-written (Sprint 2's sample data). It gets riskier every sprint that adds more hand-edited content — Sprint 6 alone introduced three new content types (events, promotions, announcements) authored entirely by manual JSON edits, with its notes.md explicitly leaving open "who authors and edits this content before an admin CMS exists?"

This sprint exists to answer that question directly, but not with a CMS. It answers it with tooling: validation that catches mistakes before they're committed, import/export that turns "edit 30 JSON records by hand" into "edit a spreadsheet," a seed generator that can produce ROADMAP.md's long-deferred Phase 6 placeholder dataset on demand, backup/restore so a bulk change is always reversible, and small migration helpers so a schema change doesn't mean hand-editing every record.

Note: this sprint is deliberately scoped to local/CI scripts operating on the JSON files already in the repository. It is not, and should not become, ROADMAP.md's Phase 14 "Admin Portal" — that is a separate, much larger, 🟡 Future piece of work requiring Supabase Auth. See Non-Goals below and README.md's Sprint Objective and Risks for how that distinction is maintained throughout this sprint.

---

# Goals

1. **Make manual JSON editing safe** — every file in `data/` can be validated against JSON_SCHEMA.md's rules with a single command, and that validation runs automatically in Husky pre-commit and CI so invalid data cannot reach `main`.
2. **Make bulk edits efficient** — content editors can export a JSON file to a spreadsheet-friendly format, edit many records at once, and re-import safely, without hand-editing JSON for repetitive changes.
3. **Close the Populate Content gap with tooling, not more hand-writing** — build a seed/generator script capable of producing ROADMAP.md's Phase 6 target (100 businesses, 25 categories, related content) exactly per JSON_SCHEMA.md, since no sprint in this project's 10-sprint plan otherwise schedules that work.
4. **Make risky changes reversible** — a backup/restore utility exists so any bulk operation (import, seed generation, migration) can be undone.
5. **Make schema evolution mechanical, not manual** — a working data migration helper demonstrates transforming a JSON file from one `schemaVersion` to the next (e.g. adding a field with a default value) following JSON_SCHEMA.md's Versioning section, distinct from Sprint 10's much larger JSON-to-Supabase migration plan.

---

# Non-Goals (this sprint)

- **No authenticated admin UI or dashboard.** That is ROADMAP.md's Phase 14 "Admin Portal" (🟡 Future — business management, content moderation, analytics, approvals, requiring Supabase Auth). Nothing built in this sprint requires a login.
- **No database.** All tooling operates on the existing `data/*.json` files (ADR-002); no Supabase, Postgres, or other datastore is introduced.
- **No deployed tooling.** Every script runs locally on a developer's machine or inside CI (GitHub Actions, Sprint 1) — nothing here is a deployed, always-on service or web endpoint.
- **No content moderation or approval workflow** — those concepts belong to the future Admin Portal, not to file-level tooling.
- **No general-purpose migration framework** — this sprint's migration helper is a small, mechanical, single-purpose script, not a reusable migration engine. Sprint 10 owns the conceptual JSON-to-Supabase migration plan; this sprint does not attempt that migration.
- **No decision on when to actually run the seed generator at production scale** — building the generator is in scope; the decision of whether to populate the full dataset now or closer to Sprint 9's launch is left open (see notes.md), not resolved here.

---

# Success Criteria

Sprint 8 is successful when:

- [x] Every file in `data/` can be validated in one command, and that validation is enforced in Husky pre-commit and CI.
- [x] A JSON file can be exported to CSV and re-imported with no data loss (round-trip test passes).
- [x] A seed/generator script exists and produces schema-valid, realistic-looking placeholder data at the scale ROADMAP.md Phase 6 describes.
- [x] A backup/restore utility has been exercised against a real destructive scenario and correctly restores prior state.
- [x] At least one data migration helper script exists, is tested, and is clearly distinguished in documentation from Sprint 10's migration plan.
- [x] No new authentication, database, or deployed admin surface has been introduced.

---

# Guiding Principle

A directory is only as trustworthy as the data behind it. This sprint doesn't change what residents see — it changes how safely and quickly that data can be kept accurate as the platform grows, so that every future sprint inherits a dataset that's easy to trust and cheap to update.

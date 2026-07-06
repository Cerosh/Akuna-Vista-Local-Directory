# Sprint 08 — Notes

Admin Preparation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Design Notes

N/A — this sprint has no UI surface. Every deliverable (validation, backup, import/export, admin data scripts, seed generator, migration helpers) is a CLI/local script or a CI step, not a page, component or route. There is no DESIGN_SYSTEM.md or UI_GUIDELINES.md work in this sprint, and none should be introduced — a UI for managing this data is explicitly ROADMAP.md's Phase 14 "Admin Portal" (🟡 Future), not this sprint. If a task in this sprint starts to require layout, styling, or a rendered page, that's a signal it has drifted into Phase 14 scope and should be flagged rather than built.

---

# Technical Notes

## Libraries

| Library | Purpose | New for this sprint? |
|---------|---------|----------------------|
| `zod` | Schema validation for every JSON file against JSON_SCHEMA.md's rules — reuses the library Sprint 1 already installed for the project, rather than introducing a new validation dependency | No (already installed, newly used for this purpose) |
| A CSV library (e.g. a small, well-maintained CSV parser/writer) | Import/export tooling (JSON ↔ CSV) | Yes — evaluate against CODING_STANDARDS.md's Decision-Making Principles (DECISIONS.md) before adding; prefer the smallest, most standard option rather than a heavy spreadsheet framework |
| Node.js scripts under `scripts/` | Backup/restore, admin data scripts, seed generator, migration helpers — plain Node/TypeScript scripts invoked via `npm run <script>`, not a framework | Yes (new folder, following existing `lib/`, `scripts`-style conventions; no new architectural pattern) |

No authentication library, ORM, or database client is introduced — none of this sprint's tooling talks to anything other than the local filesystem.

## Patterns

- **Validation-on-write, not just validation-at-CI-time.** Every script that writes to `data/` (import, admin data scripts, seed generator, migration helper) must run the same validation logic before writing, not rely solely on the separate pre-commit/CI check catching it afterwards. CI and pre-commit are the safety net; validation-on-write is the first line of defence.
- **Single validation library, many entry points.** The validation logic itself should be written once (per JSON_SCHEMA.md's rules) and reused by the standalone validation command, the pre-commit hook, the CI step, and every writing script — not reimplemented per script.
- **The Populate Content gap and how it's resolved.** ROADMAP.md's Phase 6 ("Populate Content": 100 businesses, 25 categories, 250 reviews, 150 recommendations) was never scheduled into any of this project's 10 sprints — Sprint 2 built a small hand-written sample, and Sprint 6 built Community Content (events/promotions/announcements), which is a different thing. This sprint's Seed Data feature builds the *tooling* to close that gap: a generator script that can produce that full-scale dataset on demand, conforming exactly to JSON_SCHEMA.md. Building the tool and running it at production scale are treated as two separate steps — see Open Questions below.
- **Data migration helpers (this sprint) vs. Sprint 10's migration plan (not this sprint).** These are easy to conflate because both use the word "migration" — they are not the same thing:
  - **This sprint's "Data migration helpers"** are small, mechanical, JSON-to-JSON transformation scripts that move data from one `schemaVersion` to the next within the existing JSON data model — e.g. "add field X with default value Y to every record in `businesses.json`, then bump `schemaVersion`" — exactly what JSON_SCHEMA.md's "Versioning" section describes. They are implemented, tested code, delivered in this sprint.
  - **Sprint 10's "Migration plan"** is the much larger conceptual/architectural plan for eventually moving the entire platform from JSON to Supabase (ADR-002's "Future Review": "Replace JSON with Supabase after validating community adoption"). It covers a Supabase repository interface, auth architecture, and a migration strategy — and per Sprint 10's own scope, it is design/interfaces only, explicitly not implemented. Sprint 8 does not attempt any part of the JSON-to-Supabase migration itself.
  - A reader should walk away understanding: Sprint 8 ships working code that bumps a schema version within JSON; Sprint 10 ships a plan for a much bigger, later database migration and does not ship code.

## Risks / Assumptions

- Assumes the `zod` schemas written for validation can be kept in sync with JSON_SCHEMA.md's prose definitions without drifting — if the two disagree, JSON_SCHEMA.md is the source of truth (per its own "Purpose" section) and the validation code should be corrected, not the other way around.
- Assumes CSV is a sufficient interchange format for bulk edits for now — flat/tabular editing is the primary use case (e.g. updating opening hours across many businesses); deeply nested or highly variable structures (e.g. `images` arrays of arbitrary length) may need a documented convention for how they're represented in a CSV column.
- Assumes the seed generator's output is reviewed by a human before being treated as demo- or launch-ready — automated schema validity does not guarantee the content reads as realistic (see README.md Risks: unrealistic-looking placeholder content undermining trust, a concern already flagged in Sprint 2's notes).
- Assumes this sprint's backup mechanism (git-ignored local snapshots) is sufficient for a pre-production project with no live users yet — a more robust backup strategy (e.g. off-machine backups) is Sprint 9's concern ("Production Readiness"), not this sprint's.
- If ambiguity arises beyond what's noted here, follow CLAUDE.md's "When Unsure" guidance: don't guess, explain assumptions, offer alternatives, recommend the simplest option.

---

# Open Questions

- **Should the seed generator actually be run at full production scale (100 businesses, 25 categories, etc.) at the end of this sprint, or deferred until closer to Sprint 9's launch?** Building the generator is unambiguously in this sprint's scope; the decision of *when* to execute it against the real `data/` directory is a product/content decision, not an engineering one, and is left open here for the project owner to decide. Arguments for running it now: the site stops looking sparse sooner, and Sprint 9's launch prep isn't blocked on content generation. Arguments for deferring: content generated too early may go stale or need regenerating once Sprint 9's SEO/analytics work reveals what "realistic" content should emphasise. No default is assumed — do not run the generator at full scale without an explicit decision from the project owner.
- Should CSV be the only import/export format, or should a second format (e.g. a simpler flat JSON-per-record format) also be supported for editors less comfortable with spreadsheets? Not specified by any planning document — default to CSV only for this sprint, and revisit if real usage shows it's insufficient.
- How many migration helper scripts should this sprint ship — just the one demonstrated example, or a small library covering a few realistic schema changes? Default to one well-tested example per README.md's Success Criteria; expand only if a real schema change is already known to be coming.
- Who is expected to actually run these scripts day-to-day — the project owner alone, or future contributors too? Not specified; default to assuming any contributor following this sprint's documentation should be able to run every script without additional context beyond what's written here and in each script's usage notes.

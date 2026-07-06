# Sprint 10 — Notes

Future Platform Foundation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Design Notes

N/A — this sprint has no user-facing UI. No component, page, or visual pattern is introduced, changed, or reviewed against DESIGN_SYSTEM.md or UI_GUIDELINES.md. If any task in this sprint starts to require a design decision (a screen, a layout, a visual treatment), that is a signal the task has drifted from "design document" into "feature," and should be flagged rather than built.

---

# Technical Notes

## Libraries

| Library | Purpose | New for this sprint? |
|---------|---------|----------------------|
| None expected | The `SupabaseRepository` skeleton needs no Supabase client library — it never calls Supabase. Any real client (`@supabase/supabase-js`) is deferred to the sprint that actually implements the migration. | No |

No new libraries are introduced this sprint. Adding a real dependency (a Supabase client, an auth library, a payment SDK) would itself be a signal the sprint has moved from design into implementation.

## Patterns

- **Interface-first design**: for every artifact that touches code (`SupabaseRepository`, the multi-community abstraction, any API route stubs), define the contract before writing any implementation detail, and stop once the contract type-checks. This mirrors ADR-003's own reasoning — the contract, not the implementation, is what protects the UI from churn.
- **ADR Format as the template for every new decision**: DECISIONS.md's "ADR Format" (Status, Date, Context, Decision, Alternatives Considered, Rationale, Consequences, Future Review) is the required structure for any new ADR this sprint proposes. Do not invent a different structure for future-platform decisions.
- **Repository Pattern continues, with a second implementation** (ADR-003): `SupabaseRepository` must satisfy the same contract as `BusinessRepository`/`CategoryRepository`. It is added *alongside* `JSONRepository`, not in place of it — `JSONRepository` remains the active implementation until a real migration sprint switches it.
- **JSON-to-JSON (Sprint 8) vs. JSON-to-Supabase (this sprint) — stated explicitly**: Sprint 8's "Admin Preparation" produces helper scripts that migrate JSON data between schema *versions* (e.g. `schemaVersion` 1.0.0 → 1.1.0 when a field is added or changed) — same storage format, same repository implementation, just a shape change within JSON. This sprint's migration plan is a different kind of migration entirely: moving the underlying storage and repository implementation from JSON files to a Supabase/PostgreSQL database, while keeping the UI-facing repository contract unchanged (per ADR-003). Sprint 8's tooling is a precondition for a clean Supabase migration (data should already be well-versioned and validated before it's moved to a database), but the two are not the same effort, and should never be estimated or planned as if they were.

## Risks / Assumptions

- **Over-specification risk**: it would be easy to let the `SupabaseRepository` skeleton, the multi-community abstraction, or the API route stubs grow real logic "since we're already in the file" — actual query building, actual validation, actual caching. CODING_STANDARDS.md's "Avoid unnecessary abstractions" and CLAUDE.md's "Do not over-engineer" apply directly here: a stub that throws "not implemented" is the correct, complete state for this sprint, not a half-finished implementation.
- **Under-specification risk**: the opposite failure is just as real — a design document so abstract ("Supabase Auth will handle authentication") that a future engineer gains nothing from it and re-derives the design anyway. Every design document produced this sprint should name concrete fields, concrete routes, or concrete trigger conditions, not just restate the feature name.
- **Assumes DECISIONS.md's ADR numbering will need to be re-checked at merge time**, not fixed during planning — Sprint 6's retrospective separately proposed a new ADR (tentatively "ADR-011") for its own topic (pulling community features forward). If that ADR lands before this sprint's ADRs are added, this sprint's numbering shifts. This is noted so nobody hardcodes an ADR number into a cross-reference prematurely.
- **Assumes "Advertising model" (an Open Decision) can be partially addressed without fully closing it** — this sprint designs the data model and business rules for featured/premium listings and community deals, but does not select a payment provider (a separate, still-open Open Decisions item) or commit to specific pricing. Treat the Advertising model item as "designed, not decided" after this sprint, not "resolved."
- **Assumes the multi-community abstraction can be meaningfully validated with only one real community** — type-checking against Akuna Vista's data proves the abstraction compiles and doesn't break existing behaviour, but it cannot prove the abstraction is sufficient for a genuinely different community's needs (different branding, different category sets, different suburb structures) until a second community actually exists. This is a known limitation of doing this work in advance, not a defect to fix now.

## Open Questions

- Which of DECISIONS.md's "Open Decisions" should this sprint attempt to make progress on, versus leave untouched? Resolved for this sprint: **Advertising model** gets a concrete design (not a final decision — see Risks above). Left explicitly open, with no attempt to design or decide: Dark mode timing, Internationalisation, Search engine implementation, AI provider strategy, Vector database selection, Analytics platform, Payment provider, Mobile application strategy. The API abstraction (F-004) is groundwork a future Mobile application strategy decision would depend on, but does not decide that strategy.
- Should the authentication architecture document become its own ADR, or be folded into a broader "Future Platform Foundation" ADR alongside the Supabase repository decision? Not specified by DECISIONS.md's existing format — default to two focused ADRs (one for data-layer migration, one for authentication) since ADR-002 and ADR-006 are the two ADRs whose "Future Review" this sprint is actually answering; revisit if the project owner prefers a single consolidated ADR.
- Should "community deals" (Advertising model) extend the existing Promotion schema (Sprint 6, JSON_SCHEMA.md) or become a new entity? Not specified by PROJECT.md or JSON_SCHEMA.md — the advertising model design document (F-007) should make and justify this call explicitly rather than leaving it implicit, since it affects whether a future migration touches an existing schema or introduces a new one.
- If ambiguity arises beyond what's noted here, follow CLAUDE.md's "When Unsure" guidance: don't guess, explain assumptions, offer alternatives, recommend the simplest option.

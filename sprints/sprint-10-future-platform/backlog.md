# Sprint 10 — Backlog

Future Platform Foundation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 10's deliverables into ordered, independently shippable items. The `SupabaseRepository` interface skeleton comes first because it is the only item that produces real code and directly tests ADR-003's promise — everything after it is a design or planning document that can be sequenced by priority rather than by dependency, since none of them depend on each other.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Build the `SupabaseRepository` interface/class skeleton, implementing the same contracts as `BusinessRepository`/`CategoryRepository`; all methods are typed stubs ("not implemented" or typed empty results) | Sprint 1 Repository Pattern (ADR-003) | High | Not Started |
| B-002 | Write the JSON-to-Supabase migration plan document (sequencing, dual-write/backfill, rollback, adoption-metric trigger) | B-001 (informs feasibility), Sprint 8 schema-versioning tooling as a precondition | High | Not Started |
| B-003 | Write the authentication architecture document (session handling, protected routes, middleware strategy for Supabase Auth: Google/Apple/Email/Magic Links) | ADR-006 | Medium | Not Started |
| B-004 | Define the multi-community configuration/selection abstraction (e.g. `CommunityRepository`), type-checked against Akuna Vista's real data only | ADR-001, ARCHITECTURE.md "Community Structure" | Medium | Not Started |
| B-005 | Write the API abstraction design document; optionally add thin Next.js route-handler stubs that call existing repositories and return typed JSON | ARCHITECTURE.md "API Strategy" | Medium | Not Started |
| B-006 | Write the business claiming design document (data model extension: `ownerId`, `claimedAt`, `verificationStatus`; claim request workflow) | ADR-006 ("review before introducing business claiming") | Low | Not Started |
| B-007 | Write the advertising model design document (data model and pricing rules for featured/premium listings and community deals) | PROJECT.md Monetisation Phase 2/3 | Low | Not Started |
| B-008 | Draft at least one new ADR for DECISIONS.md capturing this sprint's key decisions (recommend: one ADR for the Supabase repository/migration plan, one for authentication architecture) | B-001, B-002, B-003 | High | Not Started |
| B-009 | Review pass: confirm no item above has drifted into real implementation (real credentials, real auth flow, real payment code, a second real community) | B-001–B-008 | High | Not Started |

---

# Prioritisation Notes

- B-001 is the only backlog item that produces real code. It should be reviewed more carefully than any other item in this sprint — the whole sprint's justification rests on it actually being interchangeable with `JSONRepository` at the interface level, per ADR-003.
- B-002–B-007 are high-value, low-effort design documents. They do not depend on each other and can be written in any order once B-001 exists to inform B-002's feasibility discussion — sequence by priority (High before Medium before Low) rather than by dependency.
- B-006 (business claiming) and B-007 (advertising model) are Low priority not because they're unimportant, but because PROJECT.md places both later in the roadmap (Version 2 and Version 4 respectively) than multi-community and authentication (Version 2/5), and because ADR-006's trigger for business claiming ("review before introducing") is being pre-emptively satisfied here, not urgently needed.
- B-008 should be done last among the "real" work, once the shape of the other decisions is settled, so the ADR(s) describe what was actually decided rather than what was planned.
- B-009 is not a build item — it is a deliberate final check against this sprint's own constraint, matching the pattern of catching scope drift before it ships (see notes.md Risks).

---

# Out of Scope for This Backlog

Do not add stories for:

- Any real Supabase project, database schema migration, or credentials — B-001 and B-002 stay on paper and in stub code only.
- Any real login flow, session cookie handling, or Supabase Auth project — B-003 is a document only.
- Any real payment provider integration or transaction processing — B-007 is a document only.
- Onboarding a second real community's content, branding or configuration — B-004 proves the abstraction against Akuna Vista only.
- A claim UI, admin approval UI, or moderation workflow — B-006 is a document only.
- JSON-to-JSON schema-version migration scripts — that tooling is Sprint 08 (Admin)'s scope, not this backlog's.
- Resolving DECISIONS.md's other Open Decisions (Payment provider, Search engine implementation, AI provider strategy, Vector database selection, Analytics platform, Dark mode timing, Internationalisation, Mobile application strategy).

If a task from this list seems necessary to "finish" a future-platform feature, that's a signal the sprint is drifting from design into implementation — flag it instead of building it.

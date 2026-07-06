# Sprint 10 — Goals

Future Platform Foundation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Lay the groundwork for future growth without implementing it yet.

---

# Objective

Design — but do not build — the seven foundations a future version of Akuna Vista Local Directory would need: a Supabase repository interface, an authentication architecture, a business claiming design, an advertising model, multi-community support, an API abstraction, and a migration plan. Every deliverable is a design document, an ADR, a type-checked interface skeleton with no working backend, or a written plan. Nothing in this sprint is a real Supabase project, a real login flow, real payment processing, or a second real community's content.

---

# Why This Sprint Exists

ADR-002 accepted JSON as the MVP data source but named its own expiry date: "Replace JSON with Supabase after validating community adoption." ADR-003 adopted the Repository Pattern specifically so that "changing the data source should not affect UI components" — a promise that has never been tested against a second implementation. ADR-006 excluded authentication from the MVP but named its own trigger: "Review before introducing business claiming." ADR-001 committed to a reusable, multi-community platform on the theory that "configuration is significantly cheaper than maintaining multiple codebases" — also never tested against a second community.

DECISIONS.md's "Open Decisions" list carries several items forward without resolution: Advertising model, Payment provider, Search engine implementation, AI provider strategy, Vector database selection, Analytics platform, Mobile application strategy, Dark mode timing, Internationalisation. This sprint does not attempt to resolve all of them — most remain genuinely open and are out of scope here — but it does design enough of the Advertising model, Authentication and Multi-community items that a future sprint can implement rather than re-derive them.

This sprint exists so that the four future ROADMAP.md phases this project already anticipates (Phase 11 Multi Community, Phase 12 Monetisation, Phase 13 Authentication, Phase 14 Admin Portal) can be picked up, in whatever order real usage justifies, without the first work of that sprint being "figure out what we should have designed already."

---

# Goals

1. **Prove the Repository Pattern actually holds** — build a `SupabaseRepository` skeleton that implements the same contracts as `BusinessRepository`/`CategoryRepository`, type-checks, and requires zero UI changes to exist alongside `JSONRepository`.
2. **Turn ADR-002's "Future Review" into an actionable plan** — write a concrete JSON-to-Supabase migration plan: sequencing, dual-write/backfill considerations, rollback strategy, and the adoption-metric trigger that would justify actually doing it.
3. **Turn ADR-006's "review before introducing business claiming" into a real review** — produce an authentication architecture document and a business claiming design so both are ready before a business owner asks to claim their listing.
4. **Test ADR-001's reusability claim on paper** — define a multi-community configuration/selection abstraction that type-checks against Akuna Vista's real data, without onboarding a second community.
5. **Give the Advertising model item in "Open Decisions" a concrete shape** — design how featured/premium listings and community deals would be represented and priced, without selecting a payment provider or processing a real transaction.
6. **Give future API consumers (mobile app, AI assistant, external integrations) a known contract** — document a future REST (and eventually GraphQL) layer per ARCHITECTURE.md's "API Strategy," optionally with thin, low-risk route-handler stubs.
7. **Capture the decisions made in DECISIONS.md** — draft at least one new ADR so this sprint's reasoning is preserved the same way ADR-001 through ADR-010 preserved theirs.

---

# Non-Goals (this sprint)

- No real Supabase project, database, or credentials of any kind.
- No real authentication flow, session handling, or login UI — Supabase Auth is designed on paper only.
- No real payment integration, payment provider selection, or transaction processing.
- No second real community's content, branding, or configuration is authored — the multi-community abstraction is proven against Akuna Vista's existing data only.
- No new user-facing feature of any kind — nothing in this sprint changes what a resident or business owner sees on the live site.
- No claim UI, admin approval UI, or moderation workflow for business claiming.
- No resolution of DECISIONS.md's other Open Decisions (Payment provider, Search engine implementation, AI provider strategy, Vector database selection, Analytics platform, Dark mode timing, Internationalisation, Mobile application strategy) — these remain explicitly open.
- No scripts — the migration plan is a document, not tooling; JSON-to-JSON schema-version migration scripts are Sprint 8's scope, not this sprint's.

---

# Success Criteria

Sprint 10 is successful when:

- [ ] A `SupabaseRepository` skeleton exists, type-checks, and implements the same interface as the current JSON-backed repositories, with every method an explicit stub.
- [ ] A written JSON-to-Supabase migration plan exists, distinct from Sprint 8's JSON-to-JSON schema-version helpers, naming its own trigger condition.
- [ ] An authentication architecture document, a business claiming design document, and an advertising model design document all exist, each concrete enough to hand to a future engineer without further clarification.
- [ ] A multi-community configuration abstraction exists and type-checks against Akuna Vista's real data only.
- [ ] An API abstraction design exists, optionally with thin route-handler stubs that call existing repositories and introduce no new business logic.
- [ ] At least one new ADR is drafted for DECISIONS.md.
- [ ] Nothing shipped in this sprint is visible to, or usable by, an actual resident or business owner.

---

# Guiding Principle

A foundation is only useful if it is honest about being a foundation. This sprint succeeds not by building the future, but by making sure the future doesn't have to be reverse-engineered from the past.

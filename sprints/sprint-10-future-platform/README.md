# Sprint 10 – Future Platform Foundation

Neighbourhood Directory Platform

Sprint Number: 10

Sprint Name: Future Platform Foundation

Sprint Goal: Lay the groundwork for future growth without implementing it yet.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

This sprint is design and interfaces only. Nothing built here is switched on, wired to a real backend, or exposed to a resident or business owner. Every deliverable in this sprint is one of three things: a design document (a new ADR candidate or a standalone future-architecture note), a TypeScript interface or class skeleton that type-checks against the existing Repository Pattern (ADR-003) but has no working backend behind it (stub methods that throw "not implemented" or return typed empty results), or a written sequencing/migration plan. None of it requires a real Supabase project, real credentials, a real authentication flow, real payment processing, or a second real community's content.

Sprints 1–9 built and hardened a working, production-ready single-community directory on static JSON. This sprint does not extend that product surface. It answers a different question: if Akuna Vista Local Directory needs to become the reusable, multi-community, authenticated, monetised platform that ADR-001 and PROJECT.md's Future Roadmap describe, what would have to be designed today so that work doesn't turn into a rewrite later? Read this sprint as due diligence on paper, not a ninth feature sprint.

---

# Business Value

Why does this sprint matter?

- ADR-001 commits the project to "a reusable platform instead of a single-community website," justified by the claim that "configuration is significantly cheaper than maintaining multiple codebases." This sprint is the first real test of that claim — it asks what configuration surface would actually need to exist, on paper, before a second community could be onboarded.
- ADR-002 explicitly plans a "Future Review: Replace JSON with Supabase after validating community adoption." This sprint produces the migration plan that review would actually execute against, so the decision to migrate is a scheduling decision, not a discovery exercise.
- ADR-003's entire premise is that "changing the data source should not affect UI components." The only way to know that promise is true, before real usage and real money depend on it, is to build a second repository implementation against the same contract and confirm it type-checks. That is this sprint's one piece of real code.
- ADR-006 ("No authentication in MVP") names its own trigger explicitly: "Review before introducing business claiming." This sprint's authentication architecture and business claiming design are that review, done in advance of need rather than under deadline pressure once a business owner actually asks to claim their listing.
- PROJECT.md's Monetisation Strategy (Phase 2: featured listings, premium listings, sponsored categories, community deals) and Future Roadmap (Version 4: Advertising, Version 5: Multi-tenancy) describe revenue and growth paths that the current architecture has never been checked against. Designing the data model and business rules now — without wiring up a payment provider — means the eventual monetisation sprint builds against a known shape instead of an assumed one.
- DECISIONS.md's "Open Decisions" list includes several items (Advertising model, Payment provider, Search engine implementation, Mobile application strategy) that cannot be responsibly decided in a vacuum. This sprint moves the Advertising model item from undecided to "designed, not yet chosen," and produces groundwork (the API abstraction) that a future Mobile application strategy decision would depend on — without prematurely closing either.

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] A `SupabaseRepository` skeleton exists that implements the same contracts as `BusinessRepository`/`CategoryRepository` (per ADR-003's diagram), type-checks, and contains no working Supabase connection.
- [ ] A written migration plan exists for moving from JSON to Supabase, distinct from Sprint 8's JSON-to-JSON schema-version migration helpers.
- [ ] An authentication architecture document exists describing how Supabase Auth would integrate, with no login flow implemented.
- [ ] A business claiming design document exists describing the data model extension and claim workflow, with no claim UI or backend.
- [ ] An advertising model design document exists describing featured/premium listings and community deals as data, with no payment integration.
- [ ] A multi-community configuration abstraction exists that type-checks against one real community's data, with no second real community onboarded.
- [ ] An API abstraction design exists for a future REST (and eventually GraphQL) layer, optionally including thin route-handler stubs that call existing repositories.
- [ ] At least one new ADR is added (or drafted for addition) to DECISIONS.md capturing the key decisions made this sprint.
- [ ] No new user-facing feature, real backend integration, or second community's content has been introduced.
- [ ] No known critical defects (in the sense of: no artifact silently promises functionality it doesn't have).

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Supabase repository interface | High | Not Started |
| F-002 | Migration plan | High | Not Started |
| F-003 | Authentication architecture | Medium | Not Started |
| F-004 | API abstraction | Medium | Not Started |
| F-005 | Multi-community support | Medium | Not Started |
| F-006 | Business claiming design | Low | Not Started |
| F-007 | Advertising model | Low | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a future engineer (or AI assistant) implementing the eventual JSON-to-Supabase migration (ADR-002's Future Review)

I want a `SupabaseRepository` skeleton that already implements `BusinessRepository`/`CategoryRepository`'s exact contracts

So that I don't have to reverse-engineer the interface from `JSONRepository` under time pressure, or risk changing UI-facing behaviour while swapping the data source.

Acceptance Criteria

- [ ] `SupabaseRepository` (or per-entity equivalents) implements the same method signatures as the current JSON-backed repositories.
- [ ] Methods are stubs — they throw a clear "not implemented" error or return typed empty results, never a real Supabase query.
- [ ] The skeleton type-checks with no `any` types, per CODING_STANDARDS.md.
- [ ] No Supabase client, credentials, or project configuration is introduced.

---

## Story 2

As a future engineer scheduling the JSON-to-Supabase migration

I want a concrete, written migration plan

So that sequencing, rollback and the decision trigger are already agreed before the migration becomes urgent, rather than being designed from scratch under adoption pressure.

Acceptance Criteria

- [ ] The plan documents sequencing, dual-write/backfill considerations, and a rollback strategy.
- [ ] The plan states what would trigger the decision to actually migrate, tied to ADR-002's "after validating community adoption" language and PROJECT.md's Growth Metrics.
- [ ] The plan explicitly distinguishes itself from Sprint 8's JSON-to-JSON schema-version migration helpers.
- [ ] No migration scripts are written — this is a plan, not tooling.

---

## Story 3

As a future engineer implementing ROADMAP.md Phase 13 (Authentication)

I want an authentication architecture document describing how Supabase Auth would integrate

So that session handling, protected routes and middleware strategy are already decided, and ADR-006's "review before introducing business claiming" trigger has already been thought through.

Acceptance Criteria

- [ ] The document names session handling approach, which routes would become protected, and a middleware strategy.
- [ ] Google, Apple, Email and Magic Link sign-in (per ARCHITECTURE.md "Authentication" and PROJECT.md) are addressed at a design level.
- [ ] No login flow, Supabase Auth project, or session-handling code is implemented.

---

## Story 4

As a future engineer implementing ROADMAP.md Phase 11 (Multi Community Platform)

I want a community configuration/selection abstraction that already type-checks against Akuna Vista's data

So that adding a second community becomes a configuration exercise, consistent with ADR-001, rather than a refactor of routing and data-loading code.

Acceptance Criteria

- [ ] A `CommunityRepository` (or equivalent) concept exists and type-checks, matching ARCHITECTURE.md's anticipated `communities/akuna-vista/`, `communities/box-hill/` folder layout.
- [ ] Only Akuna Vista's real data flows through the abstraction.
- [ ] No second community's content, branding, or configuration is authored.

---

## Story 5

As a future engineer or AI assistant adding a REST (and eventually GraphQL) API layer per ARCHITECTURE.md's "API Strategy"

I want a documented API abstraction, and optionally thin route-handler stubs

So that future consumers (a mobile app, an AI assistant, an external integration) have a known contract to build against instead of one invented ad hoc when the need arises.

Acceptance Criteria

- [ ] The design documents the shape of a future REST layer built on top of existing repositories.
- [ ] Any route-handler stubs written are thin — they call existing repositories and return typed JSON, with no new business logic.
- [ ] GraphQL is addressed as a stated future step, not implemented.

---

## Story 6

As a future engineer implementing ROADMAP.md Phase 12 (Monetisation)

I want the business claiming and advertising data models already designed

So that the `Business` entity extension (`ownerId`, `claimedAt`, `verificationStatus`) and the pricing/data model for featured listings and community deals are known before any claim UI or payment integration is written.

Acceptance Criteria

- [ ] The business claiming design covers the data model extension and the claim request workflow.
- [ ] The advertising model design covers how featured/premium listings and community deals (PROJECT.md Monetisation Phase 2/3) would be represented and priced.
- [ ] Neither includes a claim UI, an admin approval UI, or a payment integration.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Produce exactly one artifact at a time — one ADR, one design document, or the one interface skeleton — never combine multiple future-feature designs into a single AI session.
3. For the `SupabaseRepository` skeleton only: run the TypeScript compiler to confirm it type-checks against the existing repository contracts.
4. Review the generated artifact against the "design-only" constraint before accepting it — if it looks like it could run against a real backend, it has gone further than this sprint allows.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated future-platform features in one AI session or commit.

---

# Documentation Required

Before starting this sprint read:

- CLAUDE.md
- PROJECT.md
- ROADMAP.md
- TODO.md
- CONTEXT.md
- DECISIONS.md — all of it, especially ADR-001, ADR-002, ADR-003, ADR-006, and "Open Decisions"
- ARCHITECTURE.md — "Data Layer," "Authentication," "Community Structure," "API Strategy," "Repository Pattern"

If architecture changes

- ARCHITECTURE.md
- DECISIONS.md

Always for this sprint

- JSON_SCHEMA.md — "Migration Strategy" and "Versioning"
- CODING_STANDARDS.md — naming, Repository Pattern, "Avoid unnecessary abstractions," "Do not over-engineer"
- ROADMAP.md — Phases 11 (Multi Community), 12 (Monetisation), 13 (Authentication), 14 (Admin Portal)
- sprints/sprint-08-admin/ — to keep this sprint's migration plan distinct from Sprint 8's data-migration helpers

---

# Deliverables

- [ ] `SupabaseRepository` interface/class skeleton (type-checked, no working backend)
- [ ] JSON-to-Supabase migration plan document
- [ ] Authentication architecture document
- [ ] Multi-community configuration abstraction (type-checked, single real community)
- [ ] API abstraction design document (optionally with thin route-handler stubs)
- [ ] Business claiming design document
- [ ] Advertising model design document
- [ ] At least one new ADR drafted for DECISIONS.md

---

# Design Notes

See [notes.md](./notes.md).

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Requires from Sprint 1:

- The Repository Pattern and JSON data structure (ADR-003) — this sprint extends the pattern with a second, non-functional implementation (`SupabaseRepository`) rather than replacing the existing one.

Requires from Sprint 8:

- The schema-version migration helper scripts (JSON-to-JSON) — the migration plan in this sprint builds on top of that tooling conceptually (a versioned, validated schema is a precondition for a clean JSON-to-Supabase migration) without reusing or extending the scripts themselves.

Requires from Sprints 2–9 generally:

- A stable, understood data model and folder structure (ARCHITECTURE.md, JSON_SCHEMA.md) — this sprint designs against what already exists rather than a hypothetical future shape.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| The sprint drifts from "design only" into real implementation (a working Supabase connection, a real auth flow, real payment code) | Wastes effort on speculative code that may not match real requirements once a future sprint is actually scoped; directly contradicts CODING_STANDARDS.md's "Avoid unnecessary abstractions" and "Do not over-engineer" | Every task in tasks.md states explicitly whether its output is a document, an interface skeleton, or (rarely) thin real code; no task should require credentials, a live service, or a second community's content |
| Designs are written so vaguely they aren't actionable when a future sprint picks them up | Defeats the purpose of doing this work early — a future engineer re-derives the design anyway | Each design document should be concrete enough to hand to an engineer with no memory of this sprint: name the fields, name the routes, name the trigger conditions |
| This sprint's migration plan is confused with Sprint 8's data migration helpers | Two different kinds of "migration" (JSON-to-JSON schema bumps vs. JSON-to-Supabase) get conflated in future planning, leading to wrong effort estimates | notes.md states the distinction explicitly; the migration plan document names Sprint 8's scope and its own scope separately |
| The `SupabaseRepository` skeleton silently diverges from `BusinessRepository`'s real contract | ADR-003's promise ("UI must not change") is not actually validated, undermining the sprint's core justification | Review the skeleton method-by-method against the existing repository interface before considering the task complete |
| New ADRs are numbered inconsistently with a still-pending ADR proposed by Sprint 6's retrospective (a recommended "ADR-011") | Duplicate or conflicting ADR numbers in DECISIONS.md | Confirm the next available ADR number against DECISIONS.md's actual state at the time these ADRs are added, not against the number assumed during this sprint's planning |

---

# Testing Plan

Given this sprint produces no working backend, testing here is primarily about type-safety and internal consistency, not functional behaviour.

- [ ] `SupabaseRepository` skeleton type-checks with `tsc` and satisfies the same interface as `JSONRepository`/`BusinessRepository`.
- [ ] The multi-community configuration abstraction type-checks against Akuna Vista's real data with no changes to existing UI components.
- [ ] Any route-handler stubs (API abstraction) build successfully and return typed responses when called against the existing repositories.
- [ ] No functional/Playwright tests are expected for this sprint — there is no user-facing change to test.
- [ ] Each design document is reviewed for concreteness (see Risks above), not "tested" in the software sense.

---

# Definition of Done

- [ ] The codebase is ready to evolve without major refactoring.
- [ ] All acceptance criteria completed.
- [ ] `SupabaseRepository` skeleton exists, type-checks, and is interchangeable with `JSONRepository` at the interface level.
- [ ] Migration plan, authentication architecture, business claiming design, advertising model design, multi-community abstraction, and API abstraction design all exist and are concrete enough to act on.
- [ ] The distinction between this sprint's migration plan (JSON-to-Supabase) and Sprint 8's migration helpers (JSON-to-JSON) is documented.
- [ ] At least one new ADR is drafted for DECISIONS.md.
- [ ] No real Supabase project, credentials, authentication flow, payment integration, or second real community's content exists anywhere in the deliverables.
- [ ] Code reviewed against REVIEW_CHECKLIST.md.
- [ ] TypeScript passes for any interface skeleton produced.
- [ ] Documentation updated.
- [ ] No new user-facing feature has been introduced.
- [ ] Ready for a future sprint (implementing whichever of Phases 11–14 is prioritised) to build directly on top of this sprint's artifacts.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Release Notes

Features

- No user-facing features. This sprint produces design documents, ADR candidates, and non-functional interface skeletons only.

Improvements

- The Repository Pattern (ADR-003) gains a second, stubbed implementation (`SupabaseRepository`), demonstrating its interface is stable enough to support a future data-source swap.

Bug Fixes

- N/A

Known Issues

- None of this sprint's designs are implemented — that is by design, not an oversight. See README.md "Sprint Objective."
- Actual timing for Phases 11–14 (ROADMAP.md) remains undecided and depends on real usage data gathered after Sprint 9's production launch.

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
- [ ] ROADMAP.md
- [ ] DECISIONS.md — recommended new ADRs from this sprint:
  - An ADR documenting the `SupabaseRepository` skeleton and the JSON-to-Supabase migration plan (the concrete follow-through on ADR-002's "Future Review").
  - An ADR documenting the authentication architecture decision (the concrete follow-through on ADR-006's "Review before introducing business claiming").
  - Optionally, a combined ADR (or two) for the multi-community configuration abstraction and the business claiming/advertising data model, if the project owner prefers fewer, broader ADRs over many narrow ones.
  - Confirm actual ADR numbers against DECISIONS.md at the time of writing — do not assume ADR-011 onward is free, since Sprint 6's retrospective separately recommended an "ADR-011" for its own topic.
  - "Open Decisions" — this sprint moves "Advertising model" from undecided to "designed, not yet chosen"; it does not resolve Payment provider, Search engine implementation, AI provider strategy, Vector database selection, Analytics platform, Dark mode timing, Internationalisation, or Mobile application strategy, though the API abstraction is groundwork a future Mobile application strategy decision would depend on.
- [ ] CHANGELOG.md
- [ ] AI_MEMORY.md
- [ ] ARCHITECTURE.md — consider linking to the new `SupabaseRepository` skeleton and multi-community abstraction from the existing "Repository Pattern (Future)" and "Community Structure" sections once written.

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

This is the final sprint in the current 10-sprint plan. Future work implements whichever of these foundations — Multi-Community, Authentication, Monetisation, or Admin Portal (ROADMAP.md Phases 11–14) — real usage and business needs justify first, informed by data gathered after Sprint 9's production launch. A new sprint plan should be scoped at that point rather than assumed in advance.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

# Sprint 10 — Technical Tasks

Future Platform Foundation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# How to Read This Document

Unlike most sprints, few of these tasks produce a component or a route. Each section states explicitly whether its deliverable is:

- **Document** — a markdown design document or ADR. No code.
- **Interface skeleton** — TypeScript that type-checks but has no working backend behind it (stub methods, no real network/database calls).
- **Thin real code** — genuinely low-risk code that calls existing repositories and returns typed data, with no new business logic. Used sparingly in this sprint (only the optional API route stubs).

Do not upgrade a "Document" or "Interface skeleton" task into "Thin real code" without first checking it against this sprint's Non-Goals in goals.md.

---

# Supabase Repository Interface

Deliverable type: Interface skeleton (the one real-code artifact in this sprint).

- [ ] Read `ARCHITECTURE.md` "Repository Pattern" (Future diagram: `BusinessRepository → SupabaseRepository → Supabase`) and ADR-003 in full before starting.
- [ ] Enumerate the current `BusinessRepository`/`CategoryRepository` method contracts (signatures, return types) as the source of truth for the skeleton.
- [ ] Build a `SupabaseRepository` class/interface implementing those exact contracts.
- [ ] Every method is a stub: throw a clear "not implemented" error, or return a typed empty result — never a real Supabase query, never a real network call.
- [ ] No Supabase client library, credentials, environment variables, or project configuration are introduced.
- [ ] Confirm the skeleton type-checks (`tsc`) with no `any` types, per CODING_STANDARDS.md.
- [ ] Confirm the skeleton could be substituted for `JSONRepository` without any UI component needing to change, per ADR-003's "UI must not change."

---

# Migration Plan

Deliverable type: Document.

- [ ] Read ADR-002 ("Future Review: Replace JSON with Supabase after validating community adoption") and JSON_SCHEMA.md's "Migration Strategy" and "Versioning" sections.
- [ ] Write a step-by-step migration plan covering: sequencing (what moves first, what stays JSON longest), dual-write/backfill considerations (can JSON and Supabase run in parallel during transition, how backfill would work), and a rollback strategy (what happens if the migration needs to be reversed).
- [ ] Define the concrete trigger condition(s) that would justify actually starting the migration, tied to ADR-002's "after validating community adoption" and PROJECT.md's Growth Metrics (e.g. 500 monthly visitors, 100 returning visitors, businesses requesting premium placement).
- [ ] Explicitly state, in the document itself, the distinction from Sprint 8's JSON-to-JSON schema-version migration helpers (see notes.md for the framing).
- [ ] Do not write any migration scripts, seed scripts, or database schema DDL — this is a plan, not tooling.

---

# Authentication Architecture

Deliverable type: Document (candidate for a new ADR).

- [ ] Read ADR-006 ("No authentication in MVP," Future Review: "Review before introducing business claiming") and ARCHITECTURE.md "Authentication" (Future: Supabase Auth, Google/Apple/Email/Magic Links).
- [ ] Document the proposed session handling approach (e.g. server-side session via Supabase Auth helpers, cookie-based session, or equivalent).
- [ ] Document which current routes would become protected (e.g. a future business dashboard, admin routes) and which remain public.
- [ ] Document a middleware strategy for route protection consistent with the Next.js App Router (ADR-004).
- [ ] Address Google, Apple, Email and Magic Link sign-in at a design level only.
- [ ] Do not implement a login flow, a Supabase Auth project, session-handling code, or protected route middleware.

---

# Business Claiming Design

Deliverable type: Document.

- [ ] Read ADR-006's Future Review trigger and PROJECT.md's "Target Users — Local Businesses" and Future Roadmap Version 2 ("Business claiming").
- [ ] Document the `Business` entity data model extension: `ownerId`, `claimedAt`, `verificationStatus` (and any other fields needed to represent an unclaimed vs. claimed vs. verified business).
- [ ] Document the claim request workflow: how a business owner would initiate a claim, how it would be verified, and what state changes occur.
- [ ] Do not build a claim UI, an admin approval UI, or any backend logic.

---

# Advertising Model

Deliverable type: Document.

- [ ] Read PROJECT.md "Monetisation Strategy" Phase 2 (Featured businesses, premium listings, sponsored categories, community deals) and Phase 3 (subscriptions, analytics dashboard, priority placement, advertising packages).
- [ ] Document how featured/premium listings would be represented as data (e.g. a listing tier field, expiry date, associated business).
- [ ] Document how community deals would be represented as data, distinct from the existing Promotion schema (Sprint 6) — clarify whether "community deals" extends Promotions or introduces a new entity, and why.
- [ ] Document pricing/business rules at a conceptual level (e.g. tiers, durations) — no real prices, currency handling, or payment provider selection.
- [ ] Do not integrate a payment provider or process any transaction.

---

# Multi-Community Support

Deliverable type: Interface skeleton (configuration/abstraction layer) plus a short document.

- [ ] Read ADR-001 and ARCHITECTURE.md "Community Structure" (`communities/akuna-vista/`, `communities/box-hill/`, `communities/the-ponds/`, `communities/gables/`).
- [ ] Define a community-selection concept (e.g. a `CommunityRepository` or equivalent) that type-checks against Akuna Vista's existing data.
- [ ] Document what would need to exist (folder layout, routing, branding configuration) for a second community to be added purely by configuration, per ADR-001's promise and ROADMAP.md Phase 11's Definition of Done ("New suburb added using configuration only").
- [ ] Confirm only Akuna Vista's real data flows through the abstraction — do not author a second community's businesses, categories, or branding.

---

# API Abstraction

Deliverable type: Document, optionally with thin real code (route-handler stubs).

- [ ] Read ARCHITECTURE.md "API Strategy" (Current: No APIs, Future: REST, Eventually: GraphQL) and "AI Architecture" (AI should consume repository interfaces, never raw database queries).
- [ ] Document the shape of a future REST layer: which resources would be exposed (businesses, categories, events, promotions), what a request/response contract would look like, and how it sits on top of the existing repository layer.
- [ ] Document GraphQL as a stated future step beyond REST, without designing a full schema.
- [ ] Optional: add thin Next.js route-handler stubs that call existing repositories and return typed JSON. These must not contain new business logic — if a stub needs logic beyond "call the repository, return the result," that logic belongs in a future sprint, not here.

---

# New ADRs

Deliverable type: Document (DECISIONS.md additions, following the existing ADR Format: Status, Date, Context, Decision, Alternatives Considered, Rationale, Consequences, Future Review).

- [ ] Draft an ADR documenting the `SupabaseRepository` skeleton and the JSON-to-Supabase migration plan as the concrete follow-through on ADR-002's Future Review.
- [ ] Draft an ADR documenting the authentication architecture decision as the concrete follow-through on ADR-006's Future Review.
- [ ] Consider whether the multi-community configuration abstraction and the business claiming/advertising data model warrant their own ADR(s), or can be referenced from the two ADRs above — recommend fewer, clearer ADRs over many narrow ones.
- [ ] Confirm the next available ADR number against DECISIONS.md's actual state before finalising — do not assume a fixed number in advance (see notes.md and README.md Risks).

---

# Documentation

- [ ] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).
- [ ] Cross-link the new design documents from ARCHITECTURE.md's relevant "Future" sections (Data Layer, Authentication, Community Structure, API Strategy) once written, if the project owner wants ARCHITECTURE.md to point forward to them.
- [ ] Ensure every design document produced this sprint states, near the top, that it is a design-only artifact with no implementation — consistent with this sprint's Objective.

---

# Out of Scope

Do not build in this sprint:

- A real Supabase project, database, or credentials.
- A real authentication flow, login UI, or session-handling code.
- A real payment integration or payment provider selection.
- A claim UI, admin approval UI, or moderation workflow.
- A second real community's content, branding, or configuration.
- JSON-to-JSON schema-version migration scripts — Sprint 08 (Admin)'s scope.
- Resolution of any DECISIONS.md "Open Decisions" item other than partially shaping the Advertising model.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, ARCHITECTURE.md, DECISIONS.md, and the specific section named in the task).
2. Produce exactly one artifact per session — one document, or the one interface skeleton — never combine multiple future-platform features in a single AI session.
3. For the `SupabaseRepository` skeleton only: run typecheck.
4. Self-review against REVIEW_CHECKLIST.md and against this sprint's "design-only" constraint (see review.md).
5. Commit using Conventional Commits (see GIT_WORKFLOW.md) — use `docs:` for design documents and ADRs, `feat:` only for the interface skeletons.
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated future-platform features in a single AI session or commit.

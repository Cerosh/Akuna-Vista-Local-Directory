# DECISIONS.md

# Architecture Decision Records (ADR)

Version: 1.0

Owner: Cerosh Jacob

Status: Active

---

# Purpose

This document records important engineering and product decisions made during the project.

Its purpose is to preserve the reasoning behind decisions so future contributors, including AI assistants, understand why a solution was chosen.

Before changing an established pattern, review the relevant decision record.

If a better approach is proposed, create a new ADR rather than silently replacing the existing decision.

---

# ADR Format

Each decision should contain:

- Status
- Date
- Context
- Decision
- Alternatives Considered
- Rationale
- Consequences
- Future Review

---

# ADR-001

## Title

Build a reusable platform instead of a single-community website.

Status

Accepted

Date

2026-07-06

---

### Context

The initial requirement is an online directory for the Akuna Vista community.

However, similar communities could benefit from the same platform.

---

### Decision

Develop a reusable "Neighbourhood Directory Platform" and configure Akuna Vista as the first community.

---

### Alternatives Considered

- Hardcode Akuna Vista throughout the application.
- Create separate repositories for each community.
- Build a configurable platform.

---

### Rationale

Configuration is significantly cheaper than maintaining multiple codebases.

This supports future growth without architectural changes.

---

### Consequences

Branding, colours and content become configuration.

The application becomes multi-community ready.

---

### Future Review

Revisit when supporting more than five communities.

---

# ADR-002

## Title

Use JSON as the initial data source.

Status

Accepted

Date

2026-07-06

---

### Context

The MVP requires no authentication or administration.

---

### Decision

Store all business data as static JSON files.

---

### Alternatives Considered

- PostgreSQL
- Supabase
- Firebase
- Headless CMS

---

### Rationale

JSON keeps the MVP simple, inexpensive and easy to deploy.

It enables rapid iteration before introducing backend complexity.

---

### Consequences

Content updates require repository changes.

No dynamic editing is available.

---

### Future Review

Replace JSON with Supabase after validating community adoption.

---

# ADR-003

## Title

Adopt the Repository Pattern.

Status

Accepted

Date

2026-07-06

---

### Context

The application will eventually migrate from JSON to a database.

---

### Decision

All data access must go through repository interfaces.

UI components must never access JSON directly.

---

### Alternatives Considered

- Import JSON directly into components.
- Use API routes immediately.
- Repository abstraction.

---

### Rationale

Separating data access from presentation minimises future migration effort.

---

### Consequences

Changing the data source should not affect UI components.

---

### Future Review

Evaluate repository implementation after introducing Supabase.

---

# ADR-004

## Title

Use Next.js App Router.

Status

Accepted

Date

2026-07-06

---

### Context

The application is SEO-focused and content-driven.

---

### Decision

Use the Next.js App Router.

Prefer Server Components by default.

---

### Alternatives Considered

- Pages Router
- React SPA
- Astro

---

### Rationale

Server rendering improves SEO, performance and scalability.

---

### Consequences

Client Components are used only when necessary.

---

### Future Review

Review when major Next.js architectural changes occur.

---

# ADR-005

## Title

Prefer Server Components.

Status

Accepted

Date

2026-07-06

---

### Context

Most pages display static or read-only content.

---

### Decision

Server Components are the default.

Client Components require justification.

---

### Alternatives Considered

- Client-first rendering.
- Mixed rendering without guidance.

---

### Rationale

Improves performance and reduces client-side JavaScript.

---

### Consequences

Simpler state management.

Better Lighthouse scores.

---

### Future Review

Review if future interactive features become dominant.

---

# ADR-006

## Title

No authentication in MVP.

Status

Accepted

Date

2026-07-06

---

### Context

Authentication adds complexity without supporting the MVP goals.

---

### Decision

Exclude user authentication from Version 1.

---

### Alternatives Considered

- Google login.
- Email authentication.
- Supabase Auth.

---

### Rationale

Focus on validating community value before building user accounts.

---

### Consequences

All content is read-only.

---

### Future Review

Review before introducing business claiming.

---

# ADR-007

## Title

Use Tailwind CSS with shadcn/ui.

Status

Accepted

Date

2026-07-06

---

### Context

The project requires rapid development with a consistent design system.

---

### Decision

Adopt Tailwind CSS and shadcn/ui.

---

### Alternatives Considered

- Material UI
- Chakra UI
- CSS Modules

---

### Rationale

Provides flexibility, performance and design consistency.

---

### Consequences

Design tokens remain under project control.

---

### Future Review

Review if branding requirements become significantly more complex.

---

# ADR-008

## Title

Business logic belongs in Features.

Status

Accepted

Date

2026-07-06

---

### Context

Large applications become difficult to maintain when business logic is scattered.

---

### Decision

Pages handle routing.

Features handle business logic.

Components remain primarily presentational.

---

### Alternatives Considered

- Fat pages.
- Utility-heavy architecture.

---

### Rationale

Encourages modularity and simplifies testing.

---

### Consequences

Clear separation of responsibilities.

---

### Future Review

Review if feature boundaries become too broad.

---

# ADR-009

## Title

Optimise for maintainability over premature abstraction.

Status

Accepted

Date

2026-07-06

---

### Context

Early abstractions often increase complexity without delivering value.

---

### Decision

Introduce abstractions only after a demonstrated need.

---

### Alternatives Considered

- Highly generic architecture from day one.
- Extensive framework-style components.

---

### Rationale

Simpler code is easier to understand, maintain and evolve.

---

### Consequences

Some duplication may exist temporarily until patterns emerge.

---

### Future Review

Review when repeated patterns justify extraction.

---

# ADR-010

## Title

AI should augment engineering decisions, not replace them.

Status

Accepted

Date

2026-07-06

---

### Context

AI is a development partner rather than an autonomous architect.

---

### Decision

Claude Code should explain trade-offs, identify assumptions and propose alternatives.

Final engineering decisions remain human-led.

---

### Alternatives Considered

- Blind acceptance of AI-generated code.
- Fully autonomous AI development.

---

### Rationale

Engineering quality depends on deliberate decision-making and accountability.

---

### Consequences

AI-generated changes should be reviewed before merging.

---

### Future Review

Reassess as AI tooling evolves.

---

# ADR-011

## Title

Pull Events and Promotions forward from Version 4 into Sprint 6.

Status

Accepted

Date

2026-07-07

---

### Context

PROJECT.md's "Out of Scope" section excluded Events from Version 1, planning it (alongside
Community Deals) for Version 4. JSON_SCHEMA.md marked both the Event Schema and Promotion
Schema "(Future)". Sprint 6 (Community Content) needed a reason for residents to return to
the site without a specific business need in mind, per PROJECT.md's Secondary Goals
("Encourage community engagement", "Build long-term recurring traffic") — a goal a pure
business directory cannot satisfy on its own.

---

### Decision

Activate the Event and Promotion schemas now, in Sprint 6, rather than waiting for Version 4.
Define a new Announcement schema alongside them. Build a single cross-content-type "featured"
mechanism and a community spotlight reusing existing Business/Event data — not a new reviews
or testimonials feature.

---

### Alternatives Considered

- Wait for Version 4 as originally planned — leaves the platform purely transactional for
  longer, with no repeat-visit driver until a much later milestone.
- Ship Events but not Promotions — inconsistent, since both were deferred for the same reason
  and both directly serve the same "reason to return" goal.

---

### Rationale

This is an explicit, deliberate decision by the project owner, not scope creep discovered
mid-sprint. Community Deals (a larger, structured deals marketplace) remains a genuine
Version 4 feature — Sprint 6's Promotions are a lighter-weight precursor, not a replacement.

---

### Consequences

PROJECT.md's "Out of Scope"/Future Goals and ROADMAP.md's Version 4 list have been updated
to reflect that Events and Promotions have shipped. JSON_SCHEMA.md's Event and Promotion
schemas no longer read "(Future)"; a new Announcement schema and `schemaVersion` `1.2.0` were
added.

---

### Future Review

Revisit if Community Deals (Version 4) needs to supersede or extend the Promotion schema
introduced here.

---

# ADR-012

## Title

Require measured before/after evidence for performance, accessibility and SEO claims.

Status

Accepted

Date

2026-07-07

---

### Context

Sprints 1-6 each included accessibility, responsive and performance considerations as part of
shipping features, but no sprint had produced an actual Lighthouse/axe-core run to confirm the
platform met ARCHITECTURE.md's numeric Performance Targets. Sprint 7 (Quality & Performance)
was built specifically to close that gap, and in doing so demonstrated why the discipline
matters: two real regressions were introduced by Sprint 7's own fixes (a root-level
`loading.tsx` silently reintroducing a soft-404 on unrelated routes; a new loading skeleton
causing a CLS spike from 0 to 0.275) and both were caught only because the sprint's own practice
was to re-measure the specific metric immediately after every fix, not once at the end.

---

### Decision

Any future claim that a change improves (or does not regress) performance, accessibility or SEO
must be backed by an actual recorded before/after measurement (Lighthouse, axe-core, or an
equivalent objective tool) in that sprint's review.md — not a subjective "looks fine" or "should
be faster" impression. Measure immediately after each individual fix, not batched at the end of
a sprint.

---

### Alternatives Considered

- Trust code review and manual spot-checks alone — this is what Sprints 1-6 effectively did, and
  it did not catch the sitewide favicon 404, the Next.js metadata-streaming SEO gap, or either
  regression Sprint 7 introduced against itself.
- Measure once at the end of a sprint rather than after every fix — this would still have caught
  the two regressions eventually, but only after they were already mixed in with several other
  changes, making the specific cause much harder to isolate.

---

### Rationale

Sprint 7 is direct evidence for this rule, not a hypothetical: both regressions it introduced
were found and fixed within the same sprint specifically because of the measure-fix-remeasure
habit, and both would very plausibly have shipped otherwise, expensive to trace back to their
cause once discovered later or in production. Evidence is objective and reviewable; "looks
fine" is not.

---

### Consequences

Every performance/accessibility/SEO-related Pull Request going forward should include actual
recorded scores, not placeholders, per REVIEW_CHECKLIST.md's Performance and Accessibility
review items. This adds a small amount of overhead per change but is cheap relative to the cost
of a shipped regression.

---

### Future Review

Revisit if Lighthouse CI is wired into the CI pipeline (a reasonable Sprint 9 candidate per
Sprint 7's own notes.md), at which point some of this manual discipline can become automated.

---

# ADR-013

## Title

Introduce local/CI data tooling ahead of an admin database.

Status

Accepted

Date

2026-07-07

---

### Context

ADR-002 accepted JSON as the platform's data source specifically to keep the MVP simple, with
the explicit, accepted consequence that "content updates require repository changes" and "no
dynamic editing is available." That trade-off has grown riskier every sprint that added more
hand-edited content — Sprint 6 alone introduced three new hand-authored content types (events,
promotions, announcements), and its own notes.md explicitly left open "who authors/edits this
content before an admin CMS exists?" ROADMAP.md's Phase 6 ("Populate Content": 100 businesses,
25 categories, related content) was also never scheduled into any of this project's 10 sprints.

---

### Decision

Build CLI/local/CI scripts (Sprint 8, "Admin Preparation") that make manual JSON editing safe
and efficient — validation, backup/restore, JSON↔CSV import/export, admin data scripts, a seed
generator, and one migration helper — rather than building ROADMAP.md's Phase 14 "Admin Portal"
(an authenticated web dashboard) now, and rather than migrating to Supabase now.

---

### Alternatives Considered

- Build the authenticated Admin Portal (Phase 14) now instead — this requires Supabase Auth and
  a database, both explicitly out of scope until ADR-002's "Future Review" is triggered by
  validated community adoption; building it now would invert that sequencing.
- Migrate to Supabase now to get dynamic editing "for free" — same objection: ADR-002's
  Future Review condition (validate community adoption first) hasn't been met, and a database
  migration is a much larger, riskier change than hardening the existing JSON workflow.
- Do nothing and keep editing JSON by hand — already shown to be increasingly risky as more
  hand-authored content types accumulate (Sprint 6), and leaves ROADMAP.md's Phase 6 populate
  gap with no tooling to ever close it.

---

### Rationale

Local/CI tooling is the smallest change that directly answers Sprint 6's open question and closes
the Phase 6 gap, without pulling forward either of the two much larger future investments
(Supabase, the Admin Portal) ahead of the conditions this project's own ADRs already set for
them. It is also directly reusable later: the same `zod` schemas and validation logic this
sprint wrote can inform a future Supabase schema, and the seed generator can populate a
Supabase-backed dataset just as easily as a JSON one.

---

### Consequences

`scripts/` is a new top-level directory (validation, backup/restore, import/export, admin data
scripts, seed generator, one migration helper) with its own `scripts/lib/` internal structure,
separate from the application's `lib/` (tooling-only code, never imported by the Next.js app).
`npm run validate:data` is now enforced in Husky pre-commit and CI. `Business.priceRange`
(schema `1.3.0`) is the first field added via this sprint's migration helper.

---

### Future Review

Revisit when ADR-002's Future Review condition (validated community adoption) is met and a
Supabase migration is actually planned (Sprint 10's migration plan) — at that point, evaluate
which of this sprint's scripts (especially the `zod` validation schemas) can carry over directly
versus need reimplementation against the new data source.

---

# ADR-014

## Title

Allow read-only, server-side external API integrations for real-time features.

Status

Accepted

Date

2026-07-15

---

### Context

Every architecture doc in this project (`.ai/CONTEXT.md`'s Known Constraints, `.ai/ARCHITECTURE.md`'s
API Strategy, `.ai/PROJECT.md`'s MVP Scope, `.ai/SECURITY.md`'s Current MVP Security Scope) stated
"No APIs" as a Version 1 constraint, alongside "no backend, no database, no authentication." Sprint
11 introduced a concrete requirement that doesn't fit that constraint: a homepage card showing
real-time parking availability at Schofields and Tallawong stations, sourced live from NSW
Transport's Open Data carpark API, refreshing periodically. The static-JSON Repository Pattern
this project otherwise uses for all content has no mechanism for live, externally-sourced,
auto-refreshing data. The project owner confirmed directly (2026-07-15) that this is not a one-off
need — more real-time, externally-sourced features are expected.

---

### Decision

Adopt a narrow, specific pattern: read-only, server-side integrations with external APIs via
lightweight, stateless Next.js Route Handlers (e.g. `app/api/carpark/route.ts`), with any required
API key held server-side only (environment variable, never a `NEXT_PUBLIC_` prefix, never
referenced from a Client Component or committed to the repository). This is a permanent, accepted
capability going forward, not re-litigated per feature.

This explicitly does **not** change: no database, no user accounts, no authentication, no
persistent server state, and all business/directory content stays static JSON via the existing
Repository Pattern. This project also still does not expose its own API to external consumers —
that remains future scope per `ARCHITECTURE.md`'s API Strategy, unaffected by this decision.

---

### Alternatives Considered

- Call external APIs directly from a Client Component — rejected outright: this would ship any
  required API key in plain sight in every visitor's browser network requests, allowing it to be
  copied and reused by anyone (risking rate-limit exhaustion or key revocation by the provider).
- Wait and design a general-purpose external-API abstraction layer first — rejected as premature.
  That's closer to Sprint 10's territory (design/interfaces only, informed by real usage), and
  Sprint 11 has one concrete, narrow, immediate need. Building a general framework before a second
  real example exists would be exactly the kind of over-engineering CLAUDE.md's Engineering
  Philosophy warns against ("do not introduce unnecessary abstractions").
- Keep "No APIs" absolute and decline real-time-data features — rejected; the project owner
  explicitly wants this capability and expects to use it again.

---

### Rationale

A single-purpose Route Handler per integration is the smallest change that unblocks a real,
concrete feature request, without prematurely building a general abstraction before more than one
real example exists — consistent with this project's own Decision-Making Principles ("is it
simpler than the existing solution?", "does it solve a current problem?"). Keeping the API key
server-side-only is non-negotiable per `.ai/SECURITY.md`'s Secret Management section, which already
required this for any credential before this ADR existed.

---

### Consequences

`app/api/` becomes a new directory in this project (Sprint 11's `app/api/carpark/route.ts` is the
first Route Handler). `.ai/CONTEXT.md`, `.ai/ARCHITECTURE.md`, `.ai/PROJECT.md` and `.ai/SECURITY.md`
were all updated (2026-07-15) to describe this as a permanent, accepted pattern. Every future
external API integration must still be individually documented per `.ai/SECURITY.md`'s Third-Party
Services section and follow its API Security requirements (key handling, graceful failure on
upstream errors, server-side caching/revalidation to avoid multiplying load on the upstream API).

---

### Future Review

Revisit when Sprint 10's API abstraction layer design work happens (or once several of these
per-feature Route Handlers exist) — evaluate whether they should be consolidated behind a shared
abstraction, or whether the simple per-feature pattern continues to be preferable given how few
integrations exist at that point.

---

# ADR-015 (Proposed — awaiting project owner confirmation, drafted 2026-08-02)

## Title

Add a real Contact form backed by a transactional email provider.

Status

Proposed — not yet Accepted. Drafted for Sprint 16 F-016 at the project owner's request to "scope
it properly first" rather than build directly; requires explicit confirmation of this ADR and
F-016's Acceptance Criteria (sprint-16-backlog/README.md) before any code is written, per this
project's Spec-Driven Development process.

Date

2026-08-02

---

### Context

ADR-002 established static JSON as the sole data source because "the MVP requires no authentication
or administration," with the explicit consequence "no dynamic editing is available" — a decision
scoped to *directory content* (businesses, categories, events), not site-visitor-submitted forms.
`app/contact/page.tsx` currently renders a `mailto:` link rather than a real submission form,
because no backend/email-sending infrastructure exists per that same ADR's spirit — Sprint 16's
backlog (F-016) has carried this forward since Sprint 8b as "not scheduled," kept for visibility
only. The project owner has now asked to scope this properly rather than leave it indefinitely
deferred.

This does **not** require reversing ADR-002's core decision (JSON stays the data source for
directory content) — it's a narrower, additive capability in the same spirit as ADR-014's
read-only external API integrations: a single-purpose, server-side integration for one concrete
feature, not a general backend.

---

### Decision (proposed)

Add a real Contact form that submits via a Next.js Server Action (or Route Handler) to a
transactional email provider — **Resend**, via the Vercel Marketplace's native integration
(`resend/resend-email`, confirmed as the only/top result for the `messaging` category via
`npx vercel integration discover --category messaging`, run 2026-08-02 — not chosen from memory,
per this project's own precedent of avoiding hand-wired provider SDKs). No submissions are
persisted anywhere (no database) — a submission either sends an email to the project owner's inbox
successfully, or the visitor sees an error and can fall back to the existing `mailto:` link. This
keeps the change additive and narrow: no user accounts, no admin review queue, no new data store.

Provisioning would follow the Marketplace flow: `vercel link` (already linked), `vercel integration
add resend --yes`, then build the form against the real `RESEND_API_KEY` env var the integration
provisions automatically — never a hand-installed `resend` SDK wired from memory with a manually
created API key.

---

### Alternatives Considered

- **Keep the `mailto:` link, do nothing** — rejected as the status quo, not a decision; kept the
  backlog item open for 3+ sprints as "not scheduled," which is why the project owner asked to
  scope it now instead of continuing to defer indefinitely.
- **A different provider hand-picked from general knowledge (e.g. SendGrid, Postmark)** — rejected;
  this project's established pattern (ADR-014, and the marketplace-integration process generally)
  is to provision through Vercel's own Marketplace discovery rather than pick a provider from
  memory. `discover --category messaging` returned Resend as the only/top result, so that's the
  recommendation, not a preference asserted without evidence.
- **Persist submissions to a new database table/collection** — rejected as scope creep beyond what
  was asked; the project owner's own framing ("real Contact submission form") is about the
  visitor-facing submission working, not building a review/inbox UI. Revisit as a separate Feature
  if a submission-history requirement is raised later.
- **Build a hand-wired SMTP integration (e.g. via `nodemailer` against a personal Gmail/SMTP
  account)** — rejected; unmanaged credentials, no delivery monitoring, and exactly the kind of
  "mock instead of a real integration" pattern this project's own tooling conventions steer away
  from.

---

### Rationale

Narrow and additive, not a reversal of ADR-002's core JSON-content decision. Follows this project's
existing precedent for external integrations (ADR-014: server-side-only credentials, one concrete
feature at a time, no premature abstraction) and its Marketplace-first provisioning convention
(discover the real integration, don't hand-wire a provider SDK from memory).

---

### Consequences

- A new `RESEND_API_KEY` (or provider-issued equivalent) environment variable, server-side only,
  provisioned via `vercel integration add` rather than manually created and pasted — following the
  same secret-handling bar `.ai/SECURITY.md` already sets for `TRANSPORT_NSW_API_KEY`.
- `app/contact/page.tsx` gains a real form + Server Action; the existing `mailto:` link likely stays
  as a fallback shown alongside or on submission failure — exact UX to be nailed down in F-016's
  Acceptance Criteria, not this ADR.
- `.ai/ARCHITECTURE.md` and `.ai/SECURITY.md` need updates once Accepted, describing this as this
  project's second server-side external integration (after ADR-014's carpark/weather/transit APIs)
  and documenting the new secret per `.ai/SECURITY.md`'s Third-Party Services section.
- No change to the JSON Repository Pattern or any existing data file.

---

### Future Review

Revisit if a submission-history / admin-review requirement is ever raised — that would be a new,
separate ADR (likely reopening the "no database" constraint more broadly), not an extension of this
one.

---

# Open Decisions

The following topics remain undecided and should not be implemented without discussion.

- Dark mode timing.
- Internationalisation.
- Search engine implementation.
- AI provider strategy.
- Vector database selection.
- Analytics platform.
- Payment provider.
- Advertising model.
- Mobile application strategy.

---

# Superseded Decisions

When a decision is replaced:

- Do not delete the original ADR.
- Mark it as "Superseded".
- Reference the new ADR.
- Explain the reason for the change.

Maintaining decision history is more valuable than maintaining perfect documentation.

---

# Decision-Making Principles

Before introducing a new technology, library or architectural pattern, ask:

1. Does it solve a current problem?
2. Is it simpler than the existing solution?
3. Will it reduce maintenance cost?
4. Is it easy for a new engineer to understand?
5. Does it align with the project architecture?
6. Will Claude Code be able to work with it consistently?
7. Can it be removed easily if requirements change?

If the answer to most of these questions is "No", reconsider the decision.

---

# Guiding Philosophy

Every architectural decision is a trade-off.

Prefer decisions that:

- Reduce complexity.
- Improve maintainability.
- Support future growth.
- Minimise coupling.
- Maximise clarity.

Good decisions make future development easier.

Great decisions make future change inexpensive.
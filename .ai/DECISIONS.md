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
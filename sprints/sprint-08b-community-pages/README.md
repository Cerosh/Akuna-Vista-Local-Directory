# Sprint 08b – Community Pages

Neighbourhood Directory Platform

Sprint Number: 08b (inserted between Sprint 08 and Sprint 09 — see "Numbering" below)

Sprint Name: Community Pages

Sprint Goal: Close the About/Contact/Privacy/Terms gap before launch prep begins.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-07

---

# Numbering

This sprint is inserted between Sprint 08 (Admin Preparation) and Sprint 09 (Production
Readiness) **without renumbering either of them** — Sprint 09 stays Sprint 09, Sprint 10 (Future
Platform Foundation) stays Sprint 10. This is a deliberate choice, not an oversight: a full
renumber would touch cross-references throughout `ROADMAP.md`, `TODO.md`, `CONTEXT.md`, and both
existing sprint folders' own internal references, for no benefit beyond sequential tidiness. This
project has precedent for exactly this kind of insertion — Sprint 6 pulled the Event/Promotion
schemas forward from Version 4 without renumbering anything (see DECISIONS.md ADR-011). `TODO.md`
and `CONTEXT.md`'s "Next Sprint" pointer moves to this sprint; Sprint 09 remains next after it.

---

# Sprint Objective

Build the four simple, static pages this project's own plan has referenced since Phase 5 but
never scheduled into an actual sprint: About, Contact, Privacy Policy and Terms of Service. This
directly resolves a gap Sprint 09's own planning docs (README.md Risks, notes.md
Risks/Assumptions) explicitly flagged as needing an owner decision before that sprint's
Definition of Done could be signed off. No new architecture, no new visual language — plain
content pages using components and layout patterns already established in Sprints 1–7.

---

# Business Value

Why does this sprint matter?

- `.ai/ROADMAP.md`'s original "Phase 5: Community Pages" listed About, Community, Contact,
  Privacy, Terms and 404 as one phase. 404 shipped in Sprint 7 (custom `not-found.tsx`);
  Community is arguably served by Sprint 6's homepage community sections. About, Contact, Privacy
  and Terms were never assigned to any of the 10 real sprints — this sprint is where that debt
  gets paid down, explicitly, rather than staying an asterisk in Sprint 9's risk notes forever.
- `.ai/TESTING.md`'s "Critical User Journeys" list explicitly includes "Contact page" as an
  expected journey — it currently cannot pass because the page doesn't exist. Sprint 9's full
  regression pass depends on this journey being real.
- `Footer.tsx` already links to `/about` and `/contact` (with `prefetch={false}`, the same
  placeholder-link convention used for every not-yet-built route in earlier sprints) — visitors
  clicking those links today land on a 404. This sprint makes those links true.
- Sprint 9 is about to activate Google Analytics/Vercel Analytics and (per PROJECT.md's trust
  principles) ask 800+ residents to rely on this platform in production. A directory with no
  Privacy Policy or Terms of Service, about to start collecting analytics data, is a real
  trust/readiness gap — not just a missing page.

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] `/about`, `/contact`, `/privacy`, `/terms` exist, are linked from the Footer (replacing the
      current 404-bound placeholder links), and follow existing layout/typography conventions.
- [ ] `.ai/TESTING.md`'s "Contact page" Critical User Journey passes.
- [ ] Each page meets the same accessibility/SEO bar Sprint 7 established for the rest of the
      site (axe-core zero critical/serious violations; correct heading hierarchy; per-page
      title/description/canonical).
- [ ] Privacy Policy and Terms of Service content accurately reflects what this platform actually
      does today (no accounts, no user data collection beyond what Sprint 9's analytics will add)
      — and is clearly flagged as a starting draft for the project owner's own legal review, not
      presented as vetted legal advice (see Risks).
- [ ] Sprint 09's own planning docs are updated to record this gap as resolved, not left open.
- [ ] Tests pass. No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | About page | High | Not Started |
| F-002 | Contact page | High | Not Started |
| F-003 | Privacy Policy page | High | Not Started |
| F-004 | Terms of Service page | Medium | Not Started |
| F-005 | Footer link updates | High | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a visitor who wants to know what this platform is and who runs it

I want an About page explaining the project's purpose and community

So that I understand what I'm looking at before I trust a business listing.

Acceptance Criteria

- [ ] `/about` explains the platform's purpose (per PROJECT.md's mission — a trusted, community-driven local directory for Akuna Vista) in plain language.
- [ ] Reuses `PageHeader`/`Container`/`Section`, matching every other simple page's layout.
- [ ] Linked from the Footer without `prefetch={false}` (the route is now real).

---

## Story 2

As a resident who wants to reach the platform owner

I want a Contact page with a real way to get in touch

So that I can ask a question, report an issue, or suggest a business — the exact journey `.ai/TESTING.md` already expects to exist.

Acceptance Criteria

- [ ] `/contact` displays the community contact email (`Settings.contactEmail`, already in the schema) as a `mailto:` link, not a submission form — this project has no backend/email-sending infrastructure (ADR-002: JSON-only, no backend), and building one is out of scope for a simple static-pages sprint. See notes.md for why a form was considered and deliberately not built here.
- [ ] The journey is reachable from the Footer and passes `.ai/TESTING.md`'s "Contact page" Critical User Journey.

---

## Story 3

As a resident whose data might be collected once analytics goes live in Sprint 9

I want a Privacy Policy that honestly describes what is and isn't collected today

So that I can trust the platform before it starts tracking anything.

Acceptance Criteria

- [ ] `/privacy` accurately describes the current state: no user accounts, no authentication (ADR-006), no data collected by the platform itself today; explains that Sprint 9 will add analytics and what that will mean in plain language.
- [ ] Clearly states this is a v1 policy that will be revisited as the platform grows (per `.ai/SECURITY.md`'s Privacy principle: "designed so it can evolve to meet additional regulatory obligations if the product expands").
- [ ] Flagged in this sprint's own documentation as a draft requiring the project owner's legal judgement before being treated as binding — not asserted as vetted legal advice (see Risks).

---

## Story 4

As a resident or business owner wanting to understand the rules of using this directory

I want a Terms of Service page

So that expectations (accuracy of listings, no warranty, appropriate use) are stated somewhere.

Acceptance Criteria

- [ ] `/terms` covers, in plain language: the directory is community-informational, not a
      guarantee of business quality or availability; no user accounts exist yet; contact details
      for corrections.
- [ ] Same legal-draft caveat as Story 3.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one page only.
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated pages in one AI session — each page is small enough that this
is easy to honour, unlike sprints with genuinely interdependent tasks.

---

# Documentation Required

Before starting this sprint read:

- CLAUDE.md
- PROJECT.md
- TODO.md
- CONTEXT.md

If UI work (all of this sprint is UI work)

- DESIGN_SYSTEM.md
- UI_GUIDELINES.md

If architecture changes

- DECISIONS.md (ADR-002, ADR-006 — no backend, no auth, both still in force and directly relevant to the Contact page's scoping)

Always for this sprint

- `.ai/SECURITY.md` — "Privacy" section, for Privacy Policy content accuracy
- `.ai/TESTING.md` — "Critical User Journeys" (Contact page), "Browser Support," "Release Checklist"
- Sprint 07 outputs — the accessibility/SEO patterns and Playwright test structure (`tests/e2e/accessibility.spec.ts`, `tests/e2e/responsive.spec.ts`) this sprint extends rather than duplicates

---

# Deliverables

- [ ] `app/about/page.tsx`
- [ ] `app/contact/page.tsx`
- [ ] `app/privacy/page.tsx`
- [ ] `app/terms/page.tsx`
- [ ] `Footer.tsx` updated: About/Contact links de-prefetch-guarded, Privacy/Terms links added
- [ ] All four routes added to the existing accessibility/responsive Playwright test suites
- [ ] Sprint 09's README.md/notes.md updated to record this gap as resolved

---

# Design Notes

See [notes.md](./notes.md). Reuses `PageHeader`, `Container`, `Section` — no new page template or
visual language, per this sprint's own notes.md and Sprint 9's notes.md, both of which already
said any pages built here "should be simple, static, and follow existing layout/typography
conventions."

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

Requires from Sprint 1:

- Base layout, `Footer.tsx`, `Container`/`Section`/`PageHeader` components.

Requires from Sprint 7:

- The accessibility/SEO/error-page patterns and Playwright test structure this sprint extends
  (custom 404 already exists for any future broken links to these pages; `alternates.canonical`
  pattern for the new pages' metadata).

Required by Sprint 9:

- Sprint 9's own Definition of Done treats the About/Contact/Privacy/Terms decision as a
  precondition for sign-off. This sprint is that precondition being resolved.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Privacy Policy / Terms of Service content is not legal advice — an AI-drafted policy could understate or misstate an actual legal obligation | The project could launch with a policy that doesn't hold up, or that promises something the platform doesn't do | Content is scoped to plainly, honestly describe current, verifiable facts (no accounts, no data collection beyond what Sprint 9 adds) rather than aspirational legal boilerplate. Explicitly flagged in this document and in the page content itself as a draft for the project owner's own review — not presented as legal sign-off. |
| "Contact page" could be read as requiring a working submission form, which would need backend/email infrastructure this project doesn't have (ADR-002) | Scope creep into building form-handling, spam protection, and email delivery — a much bigger, unplanned technical addition | Scoped explicitly to a `mailto:` link using the existing `Settings.contactEmail` field, consistent with ADR-002/ADR-006. A real contact form is flagged as a future candidate, not built here. |
| Confused with Sprint 9's own scope (which is infrastructure/verification, not new pages) | Sprint 9 could either silently absorb this work or silently skip it | This sprint is a separate, explicit unit of work with its own folder and Definition of Done, inserted before Sprint 9 without renumbering it (see Numbering above). Sprint 9's own docs are updated to reference this sprint by name once complete. |

---

# Testing Plan

Unit Tests

- [ ] N/A — no new business logic; pages read `Settings.contactEmail` via the existing `SettingsRepository`, already covered by Sprint 1's repository tests.

Integration Tests

- [ ] N/A.

Playwright

- [ ] All four new routes added to `tests/e2e/accessibility.spec.ts`'s `ROUTES` list (axe-core, zero critical/serious violations) and `tests/e2e/responsive.spec.ts`'s `ROUTES` list (no horizontal overflow at any breakpoint).
- [ ] A new `tests/e2e/community-pages.spec.ts` (or extension of an existing homepage/footer spec) verifying: Footer links to `/about`/`/contact`/`/privacy`/`/terms` all resolve with a real `<h1>`, no console errors; the Contact page's `mailto:` link has the correct `href`.

Manual Testing

- [ ] Visual check at mobile/tablet/desktop/large-desktop widths (or rely on the Playwright responsive suite above, consistent with how Sprint 7 automated this).
- [ ] Read through Privacy/Terms content once more for tone and accuracy before considering the sprint done.

Responsive Testing

- [ ] Covered by `tests/e2e/responsive.spec.ts` extension above.

Accessibility

- [ ] Covered by `tests/e2e/accessibility.spec.ts` extension above — same zero-critical/serious-violations bar as every other route.

---

# Definition of Done

- [ ] Acceptance criteria completed.
- [ ] Code reviewed against REVIEW_CHECKLIST.md.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Tests pass (unit + Playwright, including the new routes added to existing accessibility/responsive suites).
- [ ] Responsive.
- [ ] Accessible (axe-core zero critical/serious violations, matching Sprint 7's bar).
- [ ] Documentation updated (this sprint's own docs, plus Sprint 09's README.md/notes.md referencing this sprint as the resolution to their flagged gap).
- [ ] No console errors.
- [ ] Ready for deployment.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Release Notes

Features

- New `/about`, `/contact`, `/privacy`, `/terms` pages.
- Footer now links to all four with working routes instead of placeholder 404s.

Improvements

- `.ai/TESTING.md`'s "Contact page" Critical User Journey is now buildable and passes.

Bug Fixes

- N/A.

Known Issues

- Privacy Policy and Terms of Service content is a draft — reflects current platform behaviour
  accurately but has not been reviewed by a lawyer. Revisit before any feature that collects more
  user data than Sprint 9's analytics ships.
- Contact page is a `mailto:` link, not a submission form — a real form is future work if ever
  needed, requiring backend/email infrastructure this project doesn't currently have.

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
- [ ] ROADMAP.md — consider noting Phase 5's remaining pages (About/Contact/Privacy/Terms) as delivered by this sprint.
- [ ] DECISIONS.md — only if a new architectural decision emerges (none anticipated).
- [ ] CHANGELOG.md
- [ ] AI_MEMORY.md
- [ ] **sprints/sprint-09-production/README.md and notes.md — required follow-up**: update the About/Contact/Privacy/Terms risk entries to reference this sprint as the resolution, not an open decision.

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

Sprint 09 — Production Readiness: monitoring, analytics, security headers, `robots.txt`/`sitemap.xml`, final metadata check, browser compatibility, full regression pass, and Release/Deployment checklist sign-off. Now unblocked from the About/Contact/Privacy/Terms decision this sprint resolves.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

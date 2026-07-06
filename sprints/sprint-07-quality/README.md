# Sprint 07 – Quality & Performance

Neighbourhood Directory Platform

Sprint Number: 07

Sprint Name: Quality & Performance

Sprint Goal: Improve engineering quality.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

Sprints 1–6 each shipped their own accessibility, responsive and performance considerations alongside new features — but no sprint has stepped back to measure the platform as a whole against ARCHITECTURE.md's hard numeric targets (Lighthouse 95+, Accessibility 100, SEO 95+, Best Practices 100, LCP < 2.5s, CLS < 0.1, First Load < 2s). This sprint is that step back. It is a hardening and verification sprint, not a new-features sprint: audit every route built so far (homepage, `/businesses`, `/category/[slug]`, `/business/[slug]`, `/search`, community page), measure it against those targets, fix what falls short, and re-measure. It also builds the two pieces of UX safety net that have been implicitly assumed but never actually built — a polished on-brand 404/error experience and consistent site-wide loading states — plus an audit of the per-page SEO metadata and structured data Sprint 4 already introduced.

---

# Business Value

Why does this sprint matter?

- ARCHITECTURE.md's "Performance Targets" (First Load < 2s, Lighthouse 95+, CLS < 0.1, LCP < 2.5s, Accessibility 100, SEO 95+, Best Practices 100) and DEPLOYMENT.md's identical targets have existed as aspirations since Sprint 1, but nothing in Sprints 1–6 has produced a measured Lighthouse run to confirm the platform actually meets them. Unverified targets are not targets — they are hopes.
- PROJECT.md's Design Principles include "Fast over feature-rich" — a platform that has spent six sprints adding features without a dedicated pass to confirm speed and quality is at risk of drifting away from that principle. This sprint corrects that drift before it compounds further in Sprints 8–10.
- A resident on a slow mobile connection, an older phone, or using a screen reader is exactly the audience PROJECT.md's "Neighbourhood focused" and "Accessible by everyone" principles are written for — not measuring accessibility and performance directly contradicts those principles.
- User trust depends on the platform behaving predictably even when something goes wrong — a broken link, a slow connection, an unsupported browser. A generic framework error page or a blank loading screen undermines the "trust, warmth and professionalism" DESIGN_SYSTEM.md's Design Vision calls for, at precisely the moment trust is most fragile.
- This sprint is also the last opportunity to fix structural quality issues before Sprint 8 (Admin Preparation) and Sprint 9 (Production Readiness) build on top of what exists — cheaper to fix now than after admin tooling and production infrastructure depend on today's pages.

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] A documented Lighthouse baseline exists for every major route, taken before any fix in this sprint.
- [ ] Every major route meets or exceeds ARCHITECTURE.md's Performance Targets, evidenced by a documented after-fix Lighthouse run.
- [ ] An accessibility audit (automated + manual) finds no WCAG AA blockers across Sprints 1–6's pages.
- [ ] A polished custom 404 page and error boundaries exist and follow DESIGN_SYSTEM.md/UI_GUIDELINES.md "Error States" guidance.
- [ ] Loading states are consistent site-wide (homepage, business detail, search, community page), never a blank screen.
- [ ] Per-page SEO (titles, meta descriptions, Open Graph, structured data, heading hierarchy) is audited and fixed across all existing pages.
- [ ] Tests pass, including Playwright coverage of error pages and loading states.
- [ ] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Lighthouse optimisation | High | Not Started |
| F-002 | Accessibility review | High | Not Started |
| F-003 | Responsive improvements | Medium | Not Started |
| F-004 | Performance profiling | High | Not Started |
| F-005 | Image optimisation | Medium | Not Started |
| F-006 | SEO audit | Medium | Not Started |
| F-007 | Error pages | High | Not Started |
| F-008 | Loading states | Medium | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a resident browsing on a slow mobile connection

I want pages to load quickly and show progress rather than a blank screen

So that I don't give up and go back to asking the WhatsApp group.

Acceptance Criteria

- [ ] Every major route meets ARCHITECTURE.md's First Load (< 2s), LCP (< 2.5s) and CLS (< 0.1) targets, measured on a throttled connection profile.
- [ ] `loading.tsx`/Suspense boundaries exist consistently for homepage, business detail, search and community page, using skeleton loaders per DESIGN_SYSTEM.md "Loading States" — never a blank screen.
- [ ] Images are served through `next/image` with appropriate sizing, formats and lazy loading so they don't block LCP.

---

## Story 2

As a resident using a keyboard or a screen reader

I want every page built in Sprints 1–6 to be fully operable without a mouse and correctly announced by assistive technology

So that the directory is genuinely usable, not just visually accessible.

Acceptance Criteria

- [ ] An automated accessibility audit (e.g. axe-core) runs against every major route with zero critical/serious violations.
- [ ] A manual keyboard-only pass and screen-reader spot-check confirm focus order, visible focus states and correct semantic structure across homepage, directory, business detail, search and community pages.
- [ ] Any WCAG AA gaps found are fixed, not just logged.

---

## Story 3

As a visitor who follows a broken or outdated link

I want a clear, on-brand page explaining what happened and what to do next

So that I don't assume the whole site is broken and leave.

Acceptance Criteria

- [ ] A custom `app/not-found.tsx` replaces the default Next.js 404, following DESIGN_SYSTEM.md/UI_GUIDELINES.md "Error States": explain the problem, suggest a next step, never expose technical details.
- [ ] `app/error.tsx` and `app/global-error.tsx` provide a friendly recovery UI for unexpected runtime errors, consistent with the same Error States guidance.
- [ ] Existing `notFound()` calls for invalid category/business slugs (Sprints 3–4) now render through the new polished 404 page.

---

## Story 4

As a visitor on an older device, a less common browser, or a small screen

I want the site to look and work correctly regardless of what I'm using

So that I'm not treated as a second-class user for not owning the newest phone.

Acceptance Criteria

- [ ] All major routes are verified against TESTING.md's Browser Support (Chrome primary, Firefox/Safari secondary) and Responsive Testing breakpoints (mobile, tablet, desktop, large desktop).
- [ ] No horizontal scrolling or broken layout is found at any tested breakpoint or browser.
- [ ] Any responsive or cross-browser defects found during this sprint's audit are fixed, not deferred.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Measure first — capture a baseline (Lighthouse, axe, manual pass) before changing anything.
3. Implement one fix area only (e.g. accessibility, then responsive, then images, then error pages, then loading states, then performance, then SEO).
4. Re-measure the same metric that motivated the fix, to confirm improvement and check for regressions elsewhere.
5. Run tests.
6. Review generated code.
7. Commit.
8. Update TODO.md if required.

Never combine multiple unrelated fix areas in one AI session.

---

# Documentation Required

Before starting this sprint read:

- CLAUDE.md
- PROJECT.md
- ROADMAP.md
- TODO.md
- CONTEXT.md

If UI work

- DESIGN_SYSTEM.md
- UI_GUIDELINES.md

If architecture changes

- ARCHITECTURE.md
- DECISIONS.md

If deployment changes

- DEPLOYMENT.md

Always for this sprint

- ARCHITECTURE.md — "Performance Targets", "Error Handling", "Logging"
- DEPLOYMENT.md — "Performance Targets", "Release Checklist", "Deployment Checklist", "Smoke Tests"
- TESTING.md — "Accessibility Testing", "Responsive Testing", "Performance Testing", "Browser Support", "CI Pipeline", "Release Checklist"
- DESIGN_SYSTEM.md / UI_GUIDELINES.md — "Loading States", "Empty States", "Error States", "Accessibility", "Responsive Design"
- REVIEW_CHECKLIST.md — in full, since this sprint is a review-and-fix sprint by nature
- CODING_STANDARDS.md — "Performance: Measure before optimising"
- Sprint 04 README.md / tasks.md — to understand exactly what per-business SEO metadata and structured data already exists, so this sprint audits it rather than rebuilding it

---

# Deliverables

- [ ] Documented Lighthouse baseline and after-fix scores per route
- [ ] Accessibility audit findings and fixes
- [ ] Responsive audit findings and fixes
- [ ] Performance profiling findings and fixes
- [ ] Image optimisation pass
- [ ] Custom 404 page and error boundaries
- [ ] Consistent site-wide loading states
- [ ] Per-page SEO audit and fixes

---

# Design Notes

See [notes.md](./notes.md).

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

This sprint depends on and audits all of Sprints 1–6:

Requires from Sprint 1:

- Repository pattern, base layout and theme — this sprint verifies these introduced no performance or accessibility debt, rather than changing them.

Requires from Sprint 2:

- Homepage (hero, search entry point, categories, featured businesses, community stats) — audited for performance, accessibility, responsive and SEO.

Requires from Sprint 3:

- Business Directory (`/businesses`, `/category/[slug]`, filters, sort, pagination) and its existing skeleton loaders for the directory grid — this sprint extends the loading-state pattern site-wide rather than replacing it.

Requires from Sprint 4:

- Business Details (`/business/[slug]`) and its existing per-business SEO metadata and `LocalBusiness` structured data — this sprint audits and fixes gaps in what Sprint 4 built, it does not rebuild it.

Requires from Sprint 5:

- Search (`/search`) — audited for performance, accessibility, responsive and loading-state consistency.

Requires from Sprint 6:

- Community Content (events, promotions, announcements, featured content, spotlight, news placeholder) — audited on the same basis as every other page.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| Sprint 7's "SEO audit" is confused with Sprint 9's site-wide SEO infrastructure work | Duplicated effort or gaps where each sprint assumes the other owns something | Explicit scope split: this sprint audits and fixes PER-PAGE SEO that already exists from Sprint 4 — page titles, meta descriptions, Open Graph tags, structured data, heading hierarchy, semantic HTML — measured via Lighthouse's SEO score. Sprint 9 separately builds site-wide crawl infrastructure that does not exist yet (`sitemap.xml`, `robots.txt`) and performs one final pre-launch metadata sanity check. Neither sprint should build the other's deliverable. |
| "High scores across performance, accessibility and SEO" (this sprint's stated Definition of Done) is unverifiable without an objective baseline | The sprint could be declared "done" on subjective impression rather than evidence, leaving ARCHITECTURE.md's targets unconfirmed | Record actual before/after Lighthouse and axe-core numbers for every major route in review.md — no fix is considered complete without a measured before/after pair |
| Fixing one quality dimension regresses another — e.g. image optimisation changes introduce layout shift, or accessibility markup changes affect bundle size/performance | A sprint dedicated to quality could ship a net-negative change if only measured once at the end | Re-measure the relevant metric after each individual fix, not just once at the end of the sprint — follow the AI Development Plan's measure → fix → re-measure loop for every change |
| Treating this as a new-features sprint rather than a hardening sprint | Scope creep into new UI/content that duplicates Sprints 1–6 or belongs to Sprint 8/9/10 | Every task in this sprint should reference an existing page/feature from Sprints 1–6 being audited or fixed — no new business-facing feature should be introduced here |
| Cross-browser or device testing is skipped because Chrome/desktop "looks fine" | Defects only visible in Safari/Firefox or on small screens ship to production | Explicit Cross-Browser Verification and Responsive Improvements checklist items per TESTING.md's Browser Support and Responsive Testing sections |

---

# Testing Plan

Unit Tests

- [ ] Any new utility functions introduced for error handling or loading-state logic are unit tested.

Integration Tests

- [ ] Error boundaries render the friendly fallback UI when a component throws.
- [ ] `notFound()` calls across existing routes (category, business) render through the new custom 404 page.

Playwright

- [ ] Custom 404 page renders for an invalid route/slug, with no console errors.
- [ ] Loading states render (not a blank screen) during navigation to homepage, business detail, search and community page.
- [ ] No console errors across all major routes.

Manual Testing

- [ ] Lighthouse run (mobile + desktop) for homepage, `/businesses`, `/category/[slug]`, `/business/[slug]`, `/search`, community page — before and after fixes.
- [ ] Automated accessibility audit (axe-core or equivalent) for the same routes — before and after fixes.
- [ ] Manual keyboard-only and screen-reader spot-check across the same routes.
- [ ] Manual cross-browser check (Chrome, Firefox, Safari) per TESTING.md "Browser Support".

Responsive Testing

- [ ] Mobile, tablet, desktop, large desktop for every major route, including the new 404/error pages and loading states.

Accessibility

- [ ] WCAG AA verified, not assumed, across all pages built in Sprints 1–6.

---

# Definition of Done

- [ ] High scores across performance, accessibility and SEO — specifically, meeting or exceeding ARCHITECTURE.md's Performance Targets: First Load < 2 seconds, Lighthouse 95+, CLS < 0.1, LCP < 2.5 seconds, Accessibility 100, SEO 95+, Best Practices 100 — evidenced by documented before/after measurements in review.md.
- [ ] All acceptance criteria completed.
- [ ] Custom 404 page and error boundaries in place, following Error States guidance.
- [ ] Loading states consistent site-wide.
- [ ] Per-page SEO audited and fixed without duplicating Sprint 9's infrastructure work.
- [ ] Code reviewed against REVIEW_CHECKLIST.md.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Tests pass.
- [ ] Responsive.
- [ ] Accessible.
- [ ] Documentation updated.
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

- Custom on-brand 404 page and global error boundaries.
- Consistent, skeleton-based loading states across homepage, business detail, search and community page.

Improvements

- Measured performance, accessibility and SEO improvements across every page built in Sprints 1–6, evidenced by before/after Lighthouse and axe-core runs.
- Image optimisation pass across existing pages.

Bug Fixes

- Responsive and cross-browser defects found during this sprint's audit (recorded in review.md Findings Log).

Known Issues

- Site-wide SEO infrastructure (`sitemap.xml`, `robots.txt`) remains unbuilt until Sprint 9 (Production Readiness).
- Analytics, monitoring and error logging integrations remain future work (Sprint 9).

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
- [ ] DECISIONS.md
- [ ] CHANGELOG.md
- [ ] AI_MEMORY.md

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

Sprint 08 — Admin Preparation: build JSON validation, import/export tooling, admin data scripts, seed data and backup utilities and data migration helpers so content updates become efficient and reliable. This is CLI/local tooling, not an authenticated admin dashboard.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

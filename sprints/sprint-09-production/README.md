# Sprint 09 – Production Readiness

Neighbourhood Directory Platform

Sprint Number: 09

Sprint Name: Production Readiness

Sprint Goal: Prepare for public launch.

Sprint Status: 🟢 Ready

Start Date: TBD

End Date: TBD

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Objective

Perform the final go/no-go hardening pass before Akuna Vista Local Directory is opened to real users: wire up analytics and error monitoring so the team has visibility once the site is live, add the security headers and site-wide crawl infrastructure (`robots.txt`, `sitemap.xml`) that have never existed before, do a final sanity check of metadata already built in earlier sprints, and run a full regression and browser-compatibility pass across everything shipped in Sprints 1–8. Nothing new is designed here — this sprint verifies, activates and hardens what already exists.

---

# Business Value

Why does this sprint matter?

- PROJECT.md's Launch Metrics define what "done" looks like for Version 1: 100 businesses listed, 25 categories, 300 recommendations, a responsive website, an SEO score above 90, and WCAG AA accessibility. Sprints 1–8 built toward these targets; this sprint is where the team actually confirms they are met before calling the site "launched," not assumed met because the features exist.
- Akuna Vista has 800+ community members currently relying on WhatsApp threads to find and recommend local businesses (PROJECT.md). Launching broken — a missing security header that breaks a script, an uncrawlable site with no `sitemap.xml`, an error nobody notices because no monitoring exists — costs the platform its first impression with exactly the audience it exists to serve. A community that already has a working (if inefficient) alternative will not give a broken replacement a second chance.
- Error logging and monitoring (Sentry, per ARCHITECTURE.md "Monitoring" and DEPLOYMENT.md "Observability") turn "a user reports something is broken" into "the team already knows and is fixing it" — the difference between a platform that feels maintained and one that feels abandoned.
- Security headers and a final security review (per `.ai/SECURITY.md`) protect the trust the platform is asking 800+ residents to place in it, even though Version 1 collects no user data and has no authentication — "secure by default" per SECURITY.md's Security Philosophy applies from day one, not from the day accounts are introduced.
- `robots.txt` and `sitemap.xml` are the infrastructure that lets search engines find and index all 100+ business pages and 25 category pages at once, rather than relying on organic crawl discovery — directly supporting the SEO score > 90 launch metric.

---

# Success Criteria

The sprint is successful when:

- [ ] All acceptance criteria are met.
- [ ] Error logging/monitoring (Sentry) is wired up and confirmed to receive at least one real event in production.
- [ ] Analytics (Vercel Analytics / Google Analytics) is wired up and confirmed to receive at least one real event in production.
- [ ] Security headers are present in production and verified against `.ai/SECURITY.md`'s "Headers" section.
- [ ] `robots.txt` and `sitemap.xml` exist, are correctly generated for all current routes (business, category, community, static pages), and are reachable in production.
- [ ] A final metadata sanity check (not a fresh audit) confirms Sprint 4/7 SEO work is intact site-wide.
- [ ] A full regression pass across `.ai/TESTING.md`'s Critical User Journeys passes on Chrome, Firefox and Safari.
- [ ] No known critical or high-severity defects remain open.
- [ ] The application meets `.ai/DEPLOYMENT.md`'s Release Checklist and Deployment Checklist.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Monitoring (Sentry error tracking) | High | Not Started |
| F-002 | Error logging | High | Not Started |
| F-003 | Security headers | High | Not Started |
| F-004 | Robots.txt | High | Not Started |
| F-005 | Sitemap.xml | High | Not Started |
| F-006 | Final testing (full regression) | High | Not Started |
| F-007 | Analytics | Medium | Not Started |
| F-008 | Metadata review (final check) | Medium | Not Started |
| F-009 | Browser compatibility | Medium | Not Started |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As the team operating this platform

I want to know immediately when something breaks in production

So that I can fix an issue before it becomes a pattern of bad first impressions for the 800+ residents this platform serves.

Acceptance Criteria

- [ ] Sentry (or equivalent) is configured via `SENTRY_DSN` per DEPLOYMENT.md's "Required Environment Variables."
- [ ] A deliberate test error reaches the monitoring dashboard after production deployment.
- [ ] Logging follows `.ai/SECURITY.md`'s "Logging" rules — errors and security events are logged; passwords, tokens, secrets and unnecessary personal information are never logged.

---

## Story 2

As a search engine

I want to discover and crawl every business, category and community page correctly

So that the directory is indexable and residents can find it via search, not only via direct link or WhatsApp share.

Acceptance Criteria

- [ ] `robots.txt` is present at the site root and permits crawling of public routes.
- [ ] `sitemap.xml` lists all business detail pages, category pages, community/search pages and static pages, and is referenced from `robots.txt`.
- [ ] A final check confirms per-page metadata (titles, descriptions, Open Graph, structured data) built in Sprint 4 and audited in Sprint 7 is still correct site-wide.

---

## Story 3

As a visitor using Safari, Firefox, or a mobile browser

I want the site to work exactly as well as it does on Chrome

So that my experience of the directory doesn't depend on which device or browser I happen to be using.

Acceptance Criteria

- [ ] The site is manually verified on Chrome (primary), Firefox and Safari (secondary), per `.ai/TESTING.md`'s "Browser Support."
- [ ] Mobile browser behaviour (iOS Safari, Android Chrome) is verified for the directory, search, business detail and community journeys.
- [ ] No browser-specific console errors or layout breakage is found.

---

## Story 4

As the team preparing for launch

I want one final full regression pass across every critical user journey

So that no sprint's work has silently regressed by the time real users arrive.

Acceptance Criteria

- [ ] Every journey in `.ai/TESTING.md`'s "Critical User Journeys" list is manually and/or automatically re-verified.
- [ ] Security headers are confirmed not to break any existing functionality (images, fonts, scripts, embeds).
- [ ] `.ai/DEPLOYMENT.md`'s Release Checklist and Deployment Checklist are both fully satisfied before sign-off.

---

# Technical Tasks

See [tasks.md](./tasks.md) for the full breakdown.

---

# AI Development Plan

Each task should be completed independently.

For every task:

1. Read relevant documentation (see Documentation Required below).
2. Implement one concern only (e.g. security headers, then monitoring, then analytics, then robots.txt, then sitemap.xml, then the metadata final check, then browser compatibility, then full regression).
3. Run tests.
4. Review generated code.
5. Commit.
6. Update TODO.md if required.

Never combine multiple unrelated concerns (e.g. security headers and analytics) in one AI session.

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

- `.ai/SECURITY.md` — read in full; this is the primary source for the security headers task, the Security Review Checklist, and the Security Definition of Done
- DEPLOYMENT.md — "Observability," "Logging," "Security During Deployment," "Required Environment Variables," "Release Checklist," "Deployment Checklist," "Smoke Tests"
- ARCHITECTURE.md — "Monitoring"
- TESTING.md — "Browser Support," "Critical User Journeys," "Release Checklist"
- Sprint 04 README.md — what per-business SEO metadata and structured data already exists, so this sprint's metadata task is a final check, not a fresh audit
- Sprint 07 (Quality) outputs, if written — the SEO audit and accessibility/performance baseline this sprint checks against

---

# Deliverables

- [ ] Monitoring (Sentry) wired up and verified in production
- [ ] Error logging in place, following SECURITY.md's logging rules
- [ ] Analytics wired up and verified in production
- [ ] Security headers configured and verified
- [ ] `robots.txt` covering all public routes
- [ ] `sitemap.xml` covering all business/category/community/static routes
- [ ] Final metadata sanity check across all route types
- [ ] Browser compatibility verification (Chrome, Firefox, Safari, mobile)
- [ ] Full regression pass across Critical User Journeys
- [ ] Release/Deployment checklist sign-off

---

# Design Notes

See [notes.md](./notes.md).

---

# Technical Notes

See [notes.md](./notes.md).

---

# Dependencies

This sprint depends on, and performs a final check across, all of Sprints 1–8:

Requires from Sprint 1:

- Repository pattern, base layout, theme and tooling/CI foundation that every later sprint builds on.

Requires from Sprint 2–6:

- Every page and section built (homepage, directory, business details, search, community content) is in scope for this sprint's regression pass, sitemap generation and metadata check.

Requires from Sprint 7 (Quality):

- The accessibility, performance and per-page SEO audit baseline. This sprint assumes Sprint 7's SEO audit already fixed per-page titles, descriptions, Open Graph tags, structured data and heading issues — this sprint does not repeat that audit, it performs one final sanity check and builds the site-wide crawl infrastructure (`sitemap.xml`, `robots.txt`) that Sprint 7 did not build.

Requires from Sprint 8 (Admin Preparation):

- Validated, seeded and backed-up JSON data. This sprint assumes the dataset used for final testing has already passed Sprint 8's validation tooling — it does not re-validate data integrity from scratch.

---

# Risks

| Risk | Impact | Mitigation |
|------|---------|------------|
| **RESOLVED — see `sprints/sprint-08b-community-pages/`.** No About, Contact, Privacy Policy or Terms of Service page was scheduled in this project's original 10-sprint plan. `.ai/ROADMAP.md`'s "Phase 5: Community Pages" (About, Community, Contact, Privacy, Terms, 404) and `.ai/TESTING.md`'s "Critical User Journeys" (which explicitly lists "Contact page") were never assigned to any of the 10 real sprints — Sprint 5 became Search and Sprint 6 became Community Content instead of ROADMAP's original "Community Pages." Sprint 7 already covers a custom 404/error page. | The project could be declared "ready for real users" while a resident has no way to contact the platform owner, read a privacy policy, or understand what the site is, and a listed Critical User Journey (Contact page) cannot pass because the page doesn't exist. | The project owner decided to insert a dedicated Sprint 08b ("Community Pages") before this sprint, without renumbering it — see `sprints/sprint-08b-community-pages/README.md`'s "Numbering" section. This sprint's own Definition of Done item below is satisfied once Sprint 08b is complete, not by any work in this sprint itself. |
| `robots.txt`/`sitemap.xml`/metadata work in this sprint could overlap or conflict with Sprint 7's SEO audit | Duplicate effort, or two sprints silently disagreeing about what "SEO complete" means | Explicit split: Sprint 7 audited and fixed **per-page** SEO (titles, descriptions, OG tags, structured data, headings) across existing routes. This sprint builds the **site-wide crawl infrastructure** that has never existed before (`sitemap.xml` generation across all business/category/community routes, `robots.txt`) and performs one **final** pre-launch sanity check of metadata — not a fresh audit. |
| Analytics and monitoring are wired up (environment variables set, SDKs installed) but never actually verified to receive events once deployed to production | The team believes it has visibility into production issues and traffic, but the integration silently fails and nobody notices until it matters | Treat "wired up" and "verified" as separate Definition of Done items; run a real smoke test after production deployment that triggers a real event/error and confirms it appears in the Sentry/analytics dashboard, not just that the SDK initialised without throwing |
| Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) break something unexpected — an inline script, a third-party embed, an image domain not yet allow-listed | A security improvement causes a regression that is worse for launch than the risk it mitigates | Configure and test security headers in a Preview deployment first, per DEPLOYMENT.md's environment strategy, before enabling in Production; verify no console errors or broken functionality in Preview before merge |
| Browser compatibility issues are found late, close to launch | Fixing a Safari/Firefox-specific bug under time pressure risks a rushed, low-quality patch | Run the browser compatibility pass early in the sprint (see backlog.md ordering), not as the last task, so any findings have room to be fixed properly |

---

# Testing Plan

Unit Tests

- [ ] Sitemap generation logic produces correct URLs for every business, category, community and static route, including handling of an empty or partial dataset.
- [ ] Robots.txt content is generated correctly per environment (e.g. disallow-all in non-production environments if applicable).

Integration Tests

- [ ] Security headers are present on responses across representative route types (homepage, business detail, category, search, community).
- [ ] Monitoring/analytics SDK initialises without throwing and without blocking page render.

Playwright

- [ ] Full regression across `.ai/TESTING.md`'s Critical User Journeys: homepage loads, navigation works, search works, directory loads, business page loads, responsive navigation works. (Contact page and 404 page journeys are addressed per the gap noted in Risks above and in retrospective.md — 404 is covered via Sprint 7's custom error page; Contact page is not currently buildable because no such page is scheduled.)
- [ ] No console errors across the full regression pass.

Manual Testing

- [ ] `robots.txt` and `sitemap.xml` manually opened and reviewed in a browser for correctness.
- [ ] Security headers manually inspected via browser dev tools / an online header-checking tool in Preview, then re-verified in Production.
- [ ] A real error is deliberately triggered and confirmed to appear in the Sentry dashboard.
- [ ] A real page view is confirmed to appear in the analytics dashboard.
- [ ] Final metadata spot-check: titles, descriptions, Open Graph previews and structured data on a sample of business, category and homepage routes.

Browser Compatibility Matrix (per TESTING.md "Browser Support")

| Browser | Priority | Status |
|---------|----------|--------|
| Chrome (desktop) | Primary | Not Started |
| Firefox (desktop) | Secondary | Not Started |
| Safari (desktop) | Secondary | Not Started |
| Mobile Safari (iOS) | Secondary | Not Started |
| Mobile Chrome (Android) | Secondary | Not Started |

Responsive Testing

- [ ] Mobile, tablet, desktop, large desktop across all critical journeys as part of the final regression pass.

Accessibility

- [ ] Confirm Sprint 7's WCAG AA baseline still holds after this sprint's changes (headers, scripts) — no new accessibility regressions introduced by monitoring/analytics scripts.

---

# Definition of Done

- [ ] The application is ready for real users.
- [ ] All acceptance criteria completed.
- [ ] Error logging/monitoring is wired up and verified to receive real events in production.
- [ ] Analytics is wired up and verified to receive real events in production.
- [ ] Security headers are configured, tested in Preview, and confirmed in Production.
- [ ] `robots.txt` and `sitemap.xml` exist and are correct in Production.
- [ ] Final metadata sanity check completed with no open findings.
- [ ] Browser compatibility verified per the matrix above.
- [ ] Full regression pass completed with no critical or high defects open.
- [ ] DEPLOYMENT.md's Release Checklist satisfied: acceptance criteria met, CI passing, build successful, no unresolved critical issues, documentation updated, accessibility reviewed, responsive verification completed, performance reviewed, security review completed, Product Owner approval obtained.
- [ ] DEPLOYMENT.md's Deployment Checklist satisfied: environment variables configured, build completed successfully, static assets uploaded, preview deployment verified, production deployment completed, homepage accessible, navigation working, search functioning, no console errors, analytics connected.
- [x] The About/Contact/Privacy/Terms gap (see Risks) has an explicit decision recorded: resolved by Sprint 08b ("Community Pages"), inserted before this sprint.
- [ ] Code reviewed against REVIEW_CHECKLIST.md.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Tests pass.
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

- Production monitoring (Sentry) and analytics activated for the first time.
- Security headers enabled across all responses.
- `robots.txt` and `sitemap.xml` published, covering all business, category, community and static routes.

Improvements

- Final metadata sanity check confirms Sprint 4/7 per-page SEO work is intact site-wide.
- Verified browser compatibility across Chrome, Firefox, Safari and mobile browsers.

Bug Fixes

- Any regressions found during the final full regression pass (to be recorded during the sprint).

Known Issues

- About/Contact/Privacy/Terms pages: resolved by Sprint 08b, inserted before this sprint (see Risks above) — no longer an open issue by the time this sprint runs.
- Analytics/monitoring dashboards are new; historical data starts from this sprint's deployment, not before.

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
- [x] **PROJECT.md / ROADMAP.md — resolved**: the About/Contact/Privacy/Terms gap (see Risks) was resolved by inserting Sprint 08b ("Community Pages") before this sprint, not by a late addition here or by accepting the gap.

Only update documents that genuinely changed.

---

# Sprint Summary

To be completed at the end of the sprint. See [retrospective.md](./retrospective.md).

---

# Next Sprint Goal

Sprint 10 — Future Platform Foundation: lay groundwork for future growth without implementing any of it yet — a Supabase repository interface, authentication architecture, business claiming design, an advertising model, multi-community support, an API abstraction layer, and a migration plan. Design and interfaces only.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project:

- Better structured.
- Better documented.
- Better tested.
- Easier to maintain.
- Closer to the long-term vision.

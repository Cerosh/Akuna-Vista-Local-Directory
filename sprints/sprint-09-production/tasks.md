# Sprint 09 — Technical Tasks

Production Readiness

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Security Headers

- [ ] Configure Strict-Transport-Security (HSTS) per `.ai/SECURITY.md` "Headers."
- [ ] Configure a restrictive Content-Security-Policy (CSP), allowing only trusted origins, avoiding `unsafe-inline`/`unsafe-eval` unless a documented exception exists (SECURITY.md "Content Security Policy").
- [ ] Configure X-Content-Type-Options: nosniff.
- [ ] Configure Referrer-Policy.
- [ ] Configure Permissions-Policy.
- [ ] Deploy headers to a Preview environment first; verify no broken scripts, fonts, images or third-party embeds.
- [ ] Only after Preview verification, enable headers in Production.
- [ ] Re-verify headers are present in Production using browser dev tools or an online header-checking tool.

---

# Error Logging & Monitoring

- [ ] Install and configure Sentry (or equivalent) per DEPLOYMENT.md "Observability."
- [ ] Set `SENTRY_DSN` via Vercel Environment Variables per DEPLOYMENT.md "Required Environment Variables" — never hardcoded.
- [ ] Ensure logging follows `.ai/SECURITY.md` "Logging": log errors, validation failures and security events; never log passwords, tokens, session cookies, authentication codes or secrets.
- [ ] Ensure error messages shown to users are friendly (per SECURITY.md "Error Handling") while logs retain technical detail; never expose stack traces, internal paths or environment details to users.
- [ ] Deploy to production and deliberately trigger a real error.
- [ ] Confirm the error appears in the monitoring dashboard.

---

# Analytics

- [ ] Install and configure Vercel Analytics and/or Google Analytics per DEPLOYMENT.md "Required Environment Variables" (`GOOGLE_ANALYTICS_ID`).
- [ ] Confirm analytics scripts do not block page render or degrade Core Web Vitals (LCP, CLS) beyond ARCHITECTURE.md's Performance Targets.
- [ ] Deploy to production and generate a real page view.
- [ ] Confirm the page view appears in the analytics dashboard.

---

# Robots.txt

- [ ] Build `robots.txt` permitting crawling of all public routes.
- [ ] Reference the `sitemap.xml` location from `robots.txt`.
- [ ] Verify `robots.txt` is reachable at the site root in production.

---

# Sitemap

- [ ] Build `sitemap.xml` generation covering every business detail page, category page, community/search page and static page.
- [ ] Ensure the sitemap is generated from the repository layer (no hardcoded URL lists), consistent with ARCHITECTURE.md's "Never hardcode business data."
- [ ] Verify the sitemap correctly reflects the current dataset (100 businesses, 25 categories, per PROJECT.md Launch Metrics).
- [ ] Verify `sitemap.xml` is reachable in production and validates as well-formed XML.

---

# Metadata Final Review

- [ ] Spot-check page titles and meta descriptions across a representative sample: homepage, a business detail page, a category page, the search page, a community page.
- [ ] Spot-check Open Graph preview rendering on at least one business page and the homepage.
- [ ] Spot-check structured data (`LocalBusiness` JSON-LD from Sprint 4) on at least one business page for continued validity.
- [ ] Confirm this check finds Sprint 4/7 work intact — this is **not** a fresh audit; do not re-derive findings Sprint 7 already produced (see backlog.md Prioritisation Notes).
- [ ] Log any regression found since Sprint 7 as a defect, not as new SEO work.

---

# Browser Compatibility

- [ ] Manually verify Chrome (primary) across homepage, directory, business detail, search and community journeys.
- [ ] Manually verify Firefox (secondary) across the same journeys.
- [ ] Manually verify Safari (secondary) across the same journeys.
- [ ] Manually verify mobile Safari (iOS) and mobile Chrome (Android).
- [ ] Record any browser-specific console errors or layout breakage as defects.

---

# Final Regression Testing

- [ ] Re-verify every journey in `.ai/TESTING.md`'s "Critical User Journeys": homepage loads, navigation works, search works, directory loads, business page loads, responsive navigation works.
- [ ] Re-run existing Playwright suites from Sprints 1–8 and confirm all pass.
- [ ] Confirm no console errors across the full regression pass.
- [ ] Confirm security headers introduced this sprint did not break any journey.
- [ ] Confirm monitoring/analytics scripts introduced this sprint did not break any journey or degrade performance targets.
- [ ] Complete DEPLOYMENT.md's Release Checklist.
- [ ] Complete DEPLOYMENT.md's Deployment Checklist.
- [ ] Run DEPLOYMENT.md's Smoke Tests immediately after production deployment.

---

# Documentation

- [ ] Update DEPLOYMENT.md's "Required Environment Variables" to remove the "(Future)" label from `SENTRY_DSN` and `GOOGLE_ANALYTICS_ID` now that they are active.
- [ ] Update ARCHITECTURE.md's "Monitoring" section to reflect Sentry, Vercel Analytics and Google Analytics as current rather than Future, if all are activated this sprint.
- [ ] Record the project owner's decision on the About/Contact/Privacy/Terms gap (see README.md Risks) in PROJECT.md/ROADMAP.md.
- [ ] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).

---

# Out of Scope

Do not build in this sprint:

- A fresh SEO audit — Sprint 7 already completed per-page title, description, Open Graph, structured data and heading fixes; this sprint only performs a final sanity check.
- About, Contact, Privacy Policy or Terms of Service pages — unless the project owner explicitly adds them to this sprint's scope (see README.md Risks). Do not add these silently.
- New business, directory, search or community features.
- An authenticated admin dashboard or any extension of Sprint 8's CLI/local tooling into an authenticated surface.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, `.ai/SECURITY.md`, DEPLOYMENT.md, and the specific standards doc for the task).
2. Implement one concern only (security headers, then monitoring, then analytics, then robots.txt, then sitemap.xml, then metadata final check, then browser compatibility, then final regression).
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md and `.ai/SECURITY.md`'s Security Review Checklist.
5. Commit using Conventional Commits (see GIT_WORKFLOW.md).
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated concerns (e.g. security headers and analytics) in a single AI session or commit.

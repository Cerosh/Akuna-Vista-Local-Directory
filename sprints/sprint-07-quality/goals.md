# Sprint 07 — Goals

Quality & Performance

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Improve engineering quality.

---

# Objective

Harden and verify everything built in Sprints 1–6 against ARCHITECTURE.md's numeric Performance Targets (First Load < 2s, Lighthouse 95+, CLS < 0.1, LCP < 2.5s, Accessibility 100, SEO 95+, Best Practices 100), close the two UX gaps that have been implicitly assumed but never built (a polished 404/error experience, consistent site-wide loading states), and audit the per-page SEO that Sprint 4 introduced.

---

# Why This Sprint Exists

Sprints 1–6 each included their own accessibility, responsive and performance considerations as part of shipping features — a skeleton loader here, an alt-text pass there, a responsive check as part of Definition of Done. What has never happened is a dedicated, project-wide measurement pass: running Lighthouse and an accessibility audit against every route and recording the actual numbers against ARCHITECTURE.md's targets.

This sprint exists because quality claims made informally during Sprints 1–6 ("this is accessible," "this performs well") are, until now, untested assumptions. Sprint 7 is the project's first dedicated measurement/hardening pass — it does not introduce accessibility, responsiveness or performance for the first time; it verifies and fixes what already exists, with evidence.

---

# Goals

1. **Hit or exceed every ARCHITECTURE.md performance target, with measured evidence** — First Load < 2s, Lighthouse 95+, CLS < 0.1, LCP < 2.5s, Best Practices 100, recorded as actual before/after Lighthouse numbers, not assumed.
2. **Verify WCAG AA, don't assume it** — run an automated accessibility audit (axe-core or equivalent) plus a manual keyboard/screen-reader pass across every route built in Sprints 1–6, and fix what's found rather than log it for later.
3. **Deliver consistent loading and error UX site-wide** — a polished custom 404 page, global error boundaries, and `loading.tsx`/Suspense-based skeleton states across homepage, business detail, search and community page, replacing any inconsistent or missing treatment.
4. **Audit and fix per-page SEO gaps without duplicating Sprint 9's infrastructure work** — page titles, meta descriptions, Open Graph tags, structured data and heading hierarchy across all existing pages, measured via Lighthouse's SEO score; site-wide crawl infrastructure (`sitemap.xml`, `robots.txt`) remains Sprint 9's responsibility.
5. **Measure before and after every fix, not just once at the end** — following CODING_STANDARDS.md's "Performance: Measure before optimising," each change should be validated against the metric it targets before moving to the next fix area.

---

# Non-Goals (this sprint)

- No new site-wide SEO infrastructure — `sitemap.xml`, `robots.txt` and the final pre-launch metadata sanity check belong to Sprint 9 (Production Readiness).
- No new business-facing features — this sprint audits and hardens Sprints 1–6, it does not add new pages, sections or content types.
- No analytics, monitoring or error-logging integrations (Sentry, Vercel Analytics, Google Analytics) — those are Sprint 9 (Production Readiness).
- No admin authoring tooling, JSON validation or import/export tooling — that is Sprint 08 (Admin Preparation).
- No Supabase migration or authentication work — that is Sprint 10 (Future Platform Foundation).

---

# Success Criteria

Sprint 7 is successful when:

- [ ] A documented Lighthouse baseline exists for every major route (homepage, `/businesses`, `/category/[slug]`, `/business/[slug]`, `/search`, community page), taken before any fix.
- [ ] Every major route's after-fix Lighthouse scores meet or exceed: Performance 95+, Accessibility 100, Best Practices 100, SEO 95+.
- [ ] LCP < 2.5 seconds and CLS < 0.1 on every major route.
- [ ] First Load < 2 seconds on every major route.
- [ ] Zero critical/serious automated accessibility violations, confirmed by a manual keyboard/screen-reader pass.
- [ ] A custom `app/not-found.tsx`, `app/error.tsx` and `app/global-error.tsx` exist and follow DESIGN_SYSTEM.md/UI_GUIDELINES.md "Error States."
- [ ] `loading.tsx`/Suspense boundaries exist consistently across homepage, business detail, search and community page.
- [ ] Per-page SEO (titles, meta descriptions, Open Graph, structured data, heading hierarchy) audited and fixed across all existing pages.
- [ ] No component reads data outside the repository layer as a side effect of any fix made in this sprint.

---

# Guiding Principle

A directory that is slow, inaccessible, or silent about errors erodes exactly the trust it exists to build. This sprint doesn't add anything a resident would point to — it makes everything they already use faster, more reliable, and usable by everyone, and proves it with numbers rather than impressions.

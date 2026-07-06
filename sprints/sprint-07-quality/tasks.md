# Sprint 07 — Technical Tasks

Quality & Performance

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Baseline Measurement

- [ ] Run Lighthouse (mobile + desktop) against homepage, `/businesses`, `/category/[slug]`, `/business/[slug]`, `/search`, and the community page.
- [ ] Run an automated accessibility audit (axe-core or equivalent) against the same routes.
- [ ] Record every baseline score (Performance, Accessibility, Best Practices, SEO, LCP, CLS) in review.md before making any fix.
- [ ] Note which ARCHITECTURE.md targets are already met and which are not, to prioritise fix areas.

---

# Accessibility Review & Fixes

- [ ] Manual keyboard-only pass across all routes: verify focus order, visible focus states, and that every interactive element is reachable and operable.
- [ ] Screen reader spot-check across all routes.
- [ ] Verify heading hierarchy (single H1 per page, logical H2/H3 nesting) across all routes.
- [ ] Verify colour contrast meets WCAG AA across all routes.
- [ ] Verify all images (business galleries, category icons, event/promotion/announcement images from Sprint 6) have descriptive alt text.
- [ ] Fix every finding from the automated audit and manual pass; do not defer critical/serious findings.
- [ ] Re-run the automated accessibility audit after fixes and confirm zero critical/serious violations.

---

# Responsive Improvements

- [ ] Verify mobile, tablet, desktop, large desktop for every route built in Sprints 1–6.
- [ ] Confirm no horizontal scrolling at any breakpoint.
- [ ] Confirm touch targets are appropriately sized on mobile.
- [ ] Fix any layout defects found.

---

# Performance Profiling & Fixes

- [ ] Profile each route for render-blocking resources, unnecessary Client Components, and unjustified bundle size.
- [ ] Identify and fix any component that could be a Server Component but is marked Client.
- [ ] Identify and remove unused dependencies or dead code contributing to bundle size.
- [ ] Verify code splitting and lazy loading are used where beneficial.
- [ ] Re-measure Lighthouse Performance, LCP and CLS after each fix.

---

# Image Optimisation

- [ ] Audit every image across all routes for correct `next/image` usage (explicit sizing, appropriate `sizes`, modern formats).
- [ ] Add `priority` hints to above-the-fold/LCP-candidate images (e.g. hero, first business card).
- [ ] Confirm lazy loading is applied to below-the-fold images.
- [ ] Re-measure LCP and CLS after changes to confirm no regression.

---

# Error Pages

- [ ] Build `app/not-found.tsx`: on-brand, explains the problem, suggests a next step (e.g. return home, browse categories), never exposes technical details, per DESIGN_SYSTEM.md/UI_GUIDELINES.md "Error States."
- [ ] Build `app/error.tsx`: friendly recovery UI for unexpected runtime errors within a route segment, with a retry action where appropriate.
- [ ] Build `app/global-error.tsx`: friendly fallback for errors that escape the root layout.
- [ ] Confirm existing `notFound()` calls for invalid category/business slugs (Sprints 3–4) now render through the new custom 404 page.
- [ ] Confirm no error page exposes stack traces, error messages, or other technical details in production.

---

# Loading States

- [ ] Audit Sprint 3's existing skeleton loaders for the directory grid as the reference pattern.
- [ ] Add `loading.tsx`/Suspense boundaries for the homepage.
- [ ] Add `loading.tsx`/Suspense boundaries for the business detail page.
- [ ] Add `loading.tsx`/Suspense boundaries for the search page.
- [ ] Add `loading.tsx`/Suspense boundaries for the community page.
- [ ] Confirm every loading state uses a skeleton loader consistent with DESIGN_SYSTEM.md "Loading States" — never a blank screen or unstyled spinner.
- [ ] Confirm loading states do not introduce layout shift when content replaces them.

---

# SEO Audit & Fixes

- [ ] Audit per-page `<title>` and meta description for homepage, `/businesses`, `/category/[slug]`, `/business/[slug]`, `/search`, and the community page.
- [ ] Audit Open Graph tags across the same routes.
- [ ] Audit Sprint 4's `LocalBusiness` structured data for continued validity (re-run Google's Rich Results Test).
- [ ] Audit heading hierarchy and semantic HTML for SEO correctness (not just accessibility) across all routes.
- [ ] Fix any gaps found.
- [ ] Do not build `sitemap.xml`, `robots.txt`, or any other site-wide crawl infrastructure — that is Sprint 9.
- [ ] Re-measure Lighthouse SEO score after fixes.

---

# Cross-Browser Verification

- [ ] Verify all routes in Chrome (primary).
- [ ] Verify all routes in Firefox (secondary).
- [ ] Verify all routes in Safari (secondary).
- [ ] Fix any cross-browser defects found.

---

# Testing

- [ ] Unit tests for any new error-handling or loading-state utility functions.
- [ ] Integration test: error boundary renders the friendly fallback when a component throws.
- [ ] Integration test: `notFound()` calls render through the new custom 404 page.
- [ ] Playwright: invalid route/slug renders the custom 404 page with no console errors.
- [ ] Playwright: loading states render (not a blank screen) during navigation to homepage, business detail, search and community page.
- [ ] Playwright: no console errors across all major routes.
- [ ] Final re-measure: re-run Lighthouse and the accessibility audit across all routes; confirm scores meet or exceed ARCHITECTURE.md's targets; record final numbers in review.md.

---

# Documentation

- [ ] Record baseline and after-fix Lighthouse/axe-core scores in review.md.
- [ ] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).
- [ ] Confirm notes.md documents the Sprint 7 vs. Sprint 9 SEO scope split for future reference.

---

# Out of Scope

Do not build in this sprint:

- Site-wide `sitemap.xml` or `robots.txt` — Sprint 9 (Production Readiness).
- Analytics, monitoring, or error-logging integrations (Sentry, Vercel Analytics, Google Analytics) — Sprint 9.
- Security headers or a dedicated security review — Sprint 9.
- JSON validation, import/export tooling, seed data, or backup utilities — Sprint 08 (Admin Preparation).
- New business-facing features, sections, or content types.
- Supabase repository interfaces, auth architecture, or migration planning — Sprint 10 (Future Platform Foundation).

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, ARCHITECTURE.md, DESIGN_SYSTEM.md/UI_GUIDELINES.md, TESTING.md, and the specific standards doc for the task).
2. Measure first — capture a baseline for the specific metric this task targets before changing anything.
3. Implement one fix area only (accessibility, then responsive, then images, then error pages, then loading states, then performance, then SEO).
4. Re-measure the same metric to confirm improvement and check for regressions elsewhere.
5. Run lint, typecheck, tests.
6. Self-review against REVIEW_CHECKLIST.md.
7. Commit using Conventional Commits (see GIT_WORKFLOW.md).
8. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated fix areas in a single AI session or commit.

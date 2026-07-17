# Sprint 07 — Technical Tasks

Quality & Performance

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Baseline Measurement

- [x] Run Lighthouse (mobile + desktop) against homepage, `/businesses`, `/category/[slug]`, `/business/[slug]`, `/search`, and the community page.
- [x] Run an automated accessibility audit (axe-core or equivalent) against the same routes.
- [x] Record every baseline score (Performance, Accessibility, Best Practices, SEO, LCP, CLS) in review.md before making any fix.
- [x] Note which ARCHITECTURE.md targets are already met and which are not, to prioritise fix areas.

---

# Accessibility Review & Fixes

- [x] Manual keyboard-only pass across all routes: verify focus order, visible focus states, and that every interactive element is reachable and operable.
- [x] Screen reader spot-check across all routes.
- [x] Verify heading hierarchy (single H1 per page, logical H2/H3 nesting) across all routes.
- [x] Verify colour contrast meets WCAG AA across all routes.
- [x] Verify all images (business galleries, category icons, event/promotion/announcement images from Sprint 6) have descriptive alt text.
- [x] Fix every finding from the automated audit and manual pass; do not defer critical/serious findings.
- [x] Re-run the automated accessibility audit after fixes and confirm zero critical/serious violations.

---

# Responsive Improvements

- [x] Verify mobile, tablet, desktop, large desktop for every route built in Sprints 1–6.
- [x] Confirm no horizontal scrolling at any breakpoint.
- [x] Confirm touch targets are appropriately sized on mobile.
- [x] Fix any layout defects found.

---

# Performance Profiling & Fixes

- [x] Profile each route for render-blocking resources, unnecessary Client Components, and unjustified bundle size.
- [x] Identify and fix any component that could be a Server Component but is marked Client.
- [x] Identify and remove unused dependencies or dead code contributing to bundle size.
- [x] Verify code splitting and lazy loading are used where beneficial.
- [x] Re-measure Lighthouse Performance, LCP and CLS after each fix.

---

# Image Optimisation

- [x] Audit every image across all routes for correct `next/image` usage (explicit sizing, appropriate `sizes`, modern formats).
- [x] Add `priority` hints to above-the-fold/LCP-candidate images (e.g. hero, first business card).
- [x] Confirm lazy loading is applied to below-the-fold images.
- [x] Re-measure LCP and CLS after changes to confirm no regression.

---

# Error Pages

- [x] Build `app/not-found.tsx`: on-brand, explains the problem, suggests a next step (e.g. return home, browse categories), never exposes technical details, per DESIGN_SYSTEM.md/UI_GUIDELINES.md "Error States."
- [x] Build `app/error.tsx`: friendly recovery UI for unexpected runtime errors within a route segment, with a retry action where appropriate.
- [x] Build `app/global-error.tsx`: friendly fallback for errors that escape the root layout.
- [x] Confirm existing `notFound()` calls for invalid category/business slugs (Sprints 3–4) now render through the new custom 404 page.
- [x] Confirm no error page exposes stack traces, error messages, or other technical details in production.

---

# Loading States

- [x] Audit Sprint 3's existing skeleton loaders for the directory grid as the reference pattern.
- [x] Add `loading.tsx`/Suspense boundaries for the homepage.
- [x] Add `loading.tsx`/Suspense boundaries for the business detail page.
- [x] Add `loading.tsx`/Suspense boundaries for the search page.
- [x] Add `loading.tsx`/Suspense boundaries for the community page.
- [x] Confirm every loading state uses a skeleton loader consistent with DESIGN_SYSTEM.md "Loading States" — never a blank screen or unstyled spinner.
- [x] Confirm loading states do not introduce layout shift when content replaces them.

---

# SEO Audit & Fixes

- [x] Audit per-page `<title>` and meta description for homepage, `/businesses`, `/category/[slug]`, `/business/[slug]`, `/search`, and the community page.
- [x] Audit Open Graph tags across the same routes.
- [x] Audit Sprint 4's `LocalBusiness` structured data for continued validity (re-run Google's Rich Results Test).
- [x] Audit heading hierarchy and semantic HTML for SEO correctness (not just accessibility) across all routes.
- [x] Fix any gaps found.
- [x] Do not build `sitemap.xml`, `robots.txt`, or any other site-wide crawl infrastructure — that is Sprint 9.
- [x] Re-measure Lighthouse SEO score after fixes.

---

# Cross-Browser Verification

- [x] Verify all routes in Chrome (primary).
- [x] Verify all routes in Firefox (secondary).
- [x] Verify all routes in Safari (secondary).
- [x] Fix any cross-browser defects found.

---

# Testing

- [x] Unit tests for any new error-handling or loading-state utility functions.
- [x] Integration test: error boundary renders the friendly fallback when a component throws.
- [x] Integration test: `notFound()` calls render through the new custom 404 page.
- [x] Playwright: invalid route/slug renders the custom 404 page with no console errors.
- [x] Playwright: loading states render (not a blank screen) during navigation to homepage, business detail, search and community page.
- [x] Playwright: no console errors across all major routes.
- [x] Final re-measure: re-run Lighthouse and the accessibility audit across all routes; confirm scores meet or exceed ARCHITECTURE.md's targets; record final numbers in review.md.

---

# Documentation

- [x] Record baseline and after-fix Lighthouse/axe-core scores in review.md.
- [x] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).
- [x] Confirm notes.md documents the Sprint 7 vs. Sprint 9 SEO scope split for future reference.

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

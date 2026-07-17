# Sprint 07 — Backlog

Quality & Performance

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 7's hardening work into ordered, independently shippable items. Baseline measurement comes first, since every other item needs a "before" number to prove it worked. Fix areas are then sequenced roughly by dependency and risk (accessibility and responsive fixes before image/performance work, since layout and markup changes can affect performance metrics), then error pages and loading states (self-contained, low-risk additions), then performance profiling and SEO audit (which benefit from a settled UI), and finally a full re-measure and test pass.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Establish baseline: run Lighthouse (mobile + desktop) and an automated accessibility audit (axe-core or equivalent) across every existing route (homepage, `/businesses`, `/category/[slug]`, `/business/[slug]`, `/search`, community page); record results in review.md | None | High | Completed |
| B-002 | Accessibility review: manual keyboard-only pass and screen-reader spot-check across all routes; log every WCAG AA gap found | B-001 | High | Completed |
| B-003 | Accessibility fixes: resolve findings from B-002 (semantic HTML, focus order, ARIA, contrast, alt text) | B-002 | High | Completed |
| B-004 | Responsive review: verify mobile, tablet, desktop, large desktop across all routes; log every layout/overflow defect found | B-001 | Medium | Completed |
| B-005 | Responsive fixes: resolve findings from B-004 | B-004 | Medium | Completed |
| B-006 | Image optimisation: audit `next/image` usage across all routes (sizing, formats, lazy loading, priority hints for above-the-fold images); fix gaps | B-001 | Medium | Completed |
| B-007 | Build custom `app/not-found.tsx` following DESIGN_SYSTEM.md/UI_GUIDELINES.md "Error States"; confirm existing `notFound()` calls (Sprints 3–4) render through it | None | High | Completed |
| B-008 | Build `app/error.tsx` and `app/global-error.tsx` following the same Error States guidance | B-007 | High | Completed |
| B-009 | Audit existing loading states (Sprint 3's directory grid skeletons) and extend `loading.tsx`/Suspense boundaries to homepage, business detail, search and community page | None | Medium | Completed |
| B-010 | Performance profiling: identify render-blocking resources, unnecessary Client Components, unoptimised bundle size across all routes | B-003, B-005, B-006 | High | Completed |
| B-011 | Performance fixes: resolve findings from B-010 | B-010 | High | Completed |
| B-012 | SEO audit: review per-page titles, meta descriptions, Open Graph tags, structured data (from Sprint 4) and heading hierarchy across all routes | B-001 | Medium | Completed |
| B-013 | SEO fixes: resolve gaps found in B-012, scoped strictly to existing per-page metadata — no `sitemap.xml`/`robots.txt` work (Sprint 9) | B-012 | Medium | Completed |
| B-014 | Cross-browser verification: Chrome, Firefox, Safari per TESTING.md "Browser Support" across all routes | B-005, B-011 | Medium | Completed |
| B-015 | Re-measure: re-run Lighthouse and axe-core across all routes after all fixes; record after-fix scores in review.md alongside the B-001 baseline | B-003, B-005, B-006, B-008, B-009, B-011, B-013 | High | Completed |
| B-016 | Playwright: 404 page renders for invalid routes/slugs; loading states render during navigation; no console errors across all routes | B-007, B-008, B-009 | High | Completed |

---

# Prioritisation Notes

- B-001 (baseline) must land first and block nothing else structurally, but every subsequent fix item implicitly depends on it for a "before" number — do not skip straight to fixes without a recorded baseline.
- Every fix item (B-003, B-005, B-006, B-011, B-013) should be measured immediately after it lands, not batched — this is CODING_STANDARDS.md's "Performance: Measure before optimising" applied literally: measure, fix, re-measure, before moving to the next fix area. Do not wait until B-015 to discover a fix regressed something else.
- B-007/B-008 (error pages) and B-009 (loading states) have no dependency on the audit/fix items and can be built in parallel with them — they are additive, not corrective.
- B-010/B-011 (performance profiling/fixes) are sequenced after accessibility, responsive and image fixes because markup and layout changes can themselves affect bundle size and rendering performance — profiling before those fixes land risks profiling a UI that's about to change.
- B-012/B-013 (SEO audit/fixes) must stay scoped to per-page metadata already introduced in Sprint 4 — see notes.md for the full Sprint 7 vs. Sprint 9 boundary. If a task looks like it needs `sitemap.xml` or `robots.txt`, it belongs in Sprint 9, not here.
- B-015 (final re-measure) is the sprint's acceptance gate — the Definition of Done's numeric targets are only satisfied once this item shows the required scores, not when B-011/B-013 "feel" done.

---

# Out of Scope for This Backlog

Do not add stories for:

- `sitemap.xml`, `robots.txt`, or any site-wide crawl infrastructure — Sprint 9 (Production Readiness).
- Analytics, monitoring, or error-logging integrations (Sentry, Vercel Analytics, Google Analytics) — Sprint 9 (Production Readiness).
- Security headers or a dedicated security review — Sprint 9 (Production Readiness).
- JSON validation, import/export tooling, seed data or backup utilities — Sprint 08 (Admin Preparation).
- New business-facing features, sections or content types — none of Sprints 1–6's product scope should expand as a side effect of this sprint.
- Supabase repository interfaces, auth architecture, or migration planning — Sprint 10 (Future Platform Foundation).

If a task from this list seems necessary to "finish" quality hardening, that's a signal scope is creeping into a later sprint — flag it instead of implementing it.

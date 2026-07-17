# Sprint 12 — Review

Branding & Navigation Polish

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# Purpose

Track review status for Sprint 12 work against REVIEW_CHECKLIST.md. Fill in as Pull Requests are
opened and reviewed — do not pre-fill outcomes before work exists.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Review Checklist (per REVIEW_CHECKLIST.md)

1. **Requirements** — Matches README.md's F-001–F-004 and their acceptance criteria.
2. **Architecture** — No new schema, no new server routes; one new small feature-local component
   (`Breadcrumb.tsx`), one existing shared component (`Logo.tsx`) modified in place.
3. **Design** — No new visual language; breadcrumb uses existing text/link styles, logo swap keeps
   `Logo.tsx`'s existing icon+text layout.
4. **Components** — `features/business-details/Breadcrumb.tsx` — small, single-purpose, gracefully
   handles a missing category.
5. **TypeScript** — Strict mode, no `any`; `Breadcrumb`'s `category` prop typed as
   `Category | undefined`, matching `categoryRepository.getBySlug()`'s `Category | null` return
   via an explicit `?? undefined`.
6. **Readability** — Clear.
7. **Performance** — No new client-side JavaScript beyond what `next/image` and the existing
   `Link` components already ship; no new polling/fetching.
8. **Accessibility** — Breadcrumb uses `<nav aria-label="Breadcrumb">` + `<ol>` with
   `aria-current="page"` on the current page's segment; logo image uses `alt=""` (decorative,
   accessible name carried by the adjacent `{siteName}` text) rather than a redundant non-empty
   alt. Re-verified via `accessibility.spec.ts`, passes.
9. **Responsive** — Re-verified via `responsive.spec.ts`, passes; also manually screenshotted at
   390px/1280px.
10. **Security** — No new data collection, no new external API calls, no secrets involved. Image
    assets are static, committed files — no new attack surface.
11. **Data** — `data/settings.json`'s `logo` field now points at a file that actually exists
    (previously dead).
12. **Testing** — 2 new Playwright tests (breadcrumb navigation, footer acknowledgment text); full
    suite re-run twice, 0 failures both times.
13. **Documentation** — This sprint's own README.md/goals.md/tasks.md/backlog.md/notes.md/
    retrospective.md/review.md all filled in.
14. **Git** — Committed as commit `c880c96` ("feat: add breadcrumb, real logo, and Acknowledgment
    of Country (Sprint 12)") and deployed. Resolved 2026-07-17 doc audit.

---

# Testing Plan (execution record)

- [x] `npm run lint` / `npm run typecheck` pass.
- [x] Full Playwright suite passes: 294/294 across Chromium/Firefox/WebKit (16 documented skips),
      run twice (before and after adding this sprint's new test coverage).
- [x] Manual verification: breadcrumb renders and navigates correctly; logo renders in header and
      footer without distortion; browser tab icon (`/favicon.ico`, `/icon.png`) both serve `200`;
      footer acknowledgment text visible on every page via the global `Footer.tsx`.

---

# Release Checklist (pre-merge to `main`)

- [x] Build succeeds (full Playwright run includes `npm run build`).
- [x] Lint succeeds.
- [x] Type checking succeeds.
- [x] Accessibility/responsive checks pass.
- [x] Documentation updated.
- [x] No critical or high review findings remain open.
- [x] Definition of Done (see README.md) satisfied, aside from the commit/push/deploy step, which
      is the project owner's decision.

---

# Findings Log

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| High | An RGB-mode `favicon.ico` (multi-size Pillow save) crashed every route with a `500` — Turbopack's ICO decoder requires RGBA-mode embedded PNG frames | `app/favicon.ico` | Found immediately by loading the page after generating the asset (not by typecheck/lint, which don't inspect binary assets). Fixed by converting the source image to RGBA before cropping/saving. Verified fixed via a real page load returning `200`. |
| Low | The project owner's "Include acknowledgment" request was initially missed, read past as part of a longer message | Process, not code | Project owner re-raised it explicitly; clarified as an Acknowledgment of Country request and scoped as F-004 before any code was written. |

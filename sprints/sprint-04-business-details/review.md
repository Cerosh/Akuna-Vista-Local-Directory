# Sprint 04 — Review

Business Details

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

Track review status for Sprint 4 work against REVIEW_CHECKLIST.md. Fill in as Pull Requests are opened and reviewed — do not pre-fill outcomes before work exists.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| (none) | This project pushes directly to `main` — no PR-based workflow exists. Correctly empty, not stale. | — |

---

# Review Checklist (per REVIEW_CHECKLIST.md)

Apply this to every Pull Request in this sprint, in order:

1. **Requirements** — Matches this sprint's tasks.md; no site-wide SEO or reviews functionality snuck in.
2. **Architecture** — Page reads business data only via `BusinessRepository.getBusinessBySlug()`; structured data generator is a pure function.
3. **Design** — Matches DESIGN_SYSTEM.md Business Card fields as the baseline; share button uses existing Button variants.
4. **Components** — Contact, hours, gallery, service areas, social links are each self-contained, reusable, and each degrades gracefully when its data is absent.
5. **TypeScript** — Strict mode, no `any`, explicit handling of optional/missing fields.
6. **Readability** — Clear naming; JSON-LD generation logic is easy to follow and test.
7. **Performance** — Server Components/Metadata API used correctly; gallery images optimised via `next/image`.
8. **Accessibility** — Alt text on all gallery images; contact/social/share controls keyboard accessible; correct heading hierarchy.
9. **Responsive** — Mobile, tablet, desktop, large desktop.
10. **Security** — External links use `rel="noopener noreferrer"`; no unescaped business-supplied content rendered unsafely.
11. **Data** — Graceful handling verified against both a fully-populated and a minimal business record.
12. **Testing** — Playwright directory→detail navigation passes; structured data generator has unit tests.
13. **Documentation** — TODO.md / CONTEXT.md updated once the sprint completes.
14. **Git** — Conventional Commit messages; one page section per commit where practical.

---

# Testing Plan (execution record)

Unit Tests

- [x] `LocalBusiness` JSON-LD generator passes for a fully-populated business.
- [x] `LocalBusiness` JSON-LD generator passes for a minimal business (optional fields missing).
- [x] Opening hours formatter renders all 7 days correctly, including "Closed."

Integration Tests

- [x] `/business/[slug]` renders the correct business for a valid slug and 404s for an invalid one.

Playwright

- [x] Clicking a card on the homepage/directory opens the correct business page.
- [x] Contact links (`tel:`, `mailto:`, website) render and are correctly formed.
- [x] Share button triggers expected behaviour (native share sheet or copy-link fallback).
- [x] No console errors.

Manual Testing

- [ ] Validate structured data for one fully-populated business using Google's Rich Results Test.
      Never actually run — needs a public URL, unavailable until Sprint 9; no record of it being run
      since. Genuinely still owed — see README.md's Success Criteria note. Corrected 2026-07-17 —
      was incorrectly bulk-flipped, reverted.
- [x] Spot-check Open Graph link preview using a link-preview debugging tool.
- [x] Review a minimal-data business page for graceful degradation (no broken sections).

Responsive Testing

- [x] Mobile (375px)
- [x] Tablet (768px)
- [x] Desktop (1280px)
- [x] Large Desktop (1536px+)

Accessibility

- [x] Keyboard-only pass through contact links, social links and share button.
- [ ] Screen reader spot-check on the gallery and opening hours sections. Not performed — no
      assistive technology available in this development environment. Corrected 2026-07-17 — was
      incorrectly bulk-flipped, reverted.

---

# Release Checklist (pre-merge to `main`)

- [x] Build succeeds.
- [x] Lint succeeds.
- [x] Type checking succeeds.
- [x] Responsive verification completed.
- [ ] Accessibility review completed. Automated/keyboard coverage only — see above; the first full
      dedicated accessibility audit (including screen-reader) was Sprint 7.
- [x] Documentation updated.
- [x] No critical or high review findings remain open.
- [x] Definition of Done (see README.md) satisfied — every business has a professional profile.
- [ ] Vercel preview deployment verified. Not true at this sprint's own close — Vercel wasn't
      connected until 2026-07-09. Corrected 2026-07-17 — was incorrectly bulk-flipped, reverted.

---

# Findings Log

Record review findings here as they're raised, using REVIEW_CHECKLIST.md severity levels (Critical / High / Medium / Low).

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| (none recorded) | This file was never used as a live review log during this sprint — no findings were recorded at the time, not reconstructed retroactively (2026-07-17). | — | — |

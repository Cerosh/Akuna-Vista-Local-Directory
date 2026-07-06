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
| | | |

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

- [ ] `LocalBusiness` JSON-LD generator passes for a fully-populated business.
- [ ] `LocalBusiness` JSON-LD generator passes for a minimal business (optional fields missing).
- [ ] Opening hours formatter renders all 7 days correctly, including "Closed."

Integration Tests

- [ ] `/business/[slug]` renders the correct business for a valid slug and 404s for an invalid one.

Playwright

- [ ] Clicking a card on the homepage/directory opens the correct business page.
- [ ] Contact links (`tel:`, `mailto:`, website) render and are correctly formed.
- [ ] Share button triggers expected behaviour (native share sheet or copy-link fallback).
- [ ] No console errors.

Manual Testing

- [ ] Validate structured data for one fully-populated business using Google's Rich Results Test.
- [ ] Spot-check Open Graph link preview using a link-preview debugging tool.
- [ ] Review a minimal-data business page for graceful degradation (no broken sections).

Responsive Testing

- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1280px)
- [ ] Large Desktop (1536px+)

Accessibility

- [ ] Keyboard-only pass through contact links, social links and share button.
- [ ] Screen reader spot-check on the gallery and opening hours sections.

---

# Release Checklist (pre-merge to `main`)

- [ ] Build succeeds.
- [ ] Lint succeeds.
- [ ] Type checking succeeds.
- [ ] Responsive verification completed.
- [ ] Accessibility review completed.
- [ ] Documentation updated.
- [ ] No critical or high review findings remain open.
- [ ] Definition of Done (see README.md) satisfied — every business has a professional profile.
- [ ] Vercel preview deployment verified.

---

# Findings Log

Record review findings here as they're raised, using REVIEW_CHECKLIST.md severity levels (Critical / High / Medium / Low).

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| | | | |

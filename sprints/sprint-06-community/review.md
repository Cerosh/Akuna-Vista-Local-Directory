# Sprint 06 — Review

Community Content

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

Track review status for Sprint 6 work against REVIEW_CHECKLIST.md. Fill in as Pull Requests are opened and reviewed — do not pre-fill outcomes before work exists.

---

# Pull Requests

| PR | Description | Status |
|----|-------------|--------|
| | | |

---

# Review Checklist (per REVIEW_CHECKLIST.md)

Apply this to every Pull Request in this sprint, in order:

1. **Requirements** — Matches this sprint's tasks.md; no reviews/testimonials, admin authoring UI, or real news feed logic snuck in.
2. **Architecture** — Events, promotions and announcements are read only via `EventRepository`, `PromotionRepository` and `AnnouncementRepository`; the featured content mechanism aggregates across repositories rather than duplicating logic per content type.
3. **Design** — Matches DESIGN_SYSTEM.md Card fields and existing Homepage Layout; no bespoke visual pattern introduced for "featured."
4. **Components** — Events, promotions, announcements, featured content, spotlight and the news placeholder are each self-contained and reusable; empty states are shared, not duplicated per content type.
5. **TypeScript** — Strict mode, no `any`, explicit handling of expired/missing promotion `businessId` references.
6. **Readability** — Clear naming; date-range ("is active/upcoming/expired") logic is easy to follow and test.
7. **Performance** — Server Components used correctly; images optimised via `next/image`.
8. **Accessibility** — Alt text on event/promotion/announcement images; correct heading hierarchy; keyboard-accessible links.
9. **Responsive** — Mobile, tablet, desktop, large desktop.
10. **Security** — Promotion links to business pages use safe internal routing; no unescaped announcement/event content rendered unsafely.
11. **Data** — Event and Promotion schemas correctly activated from JSON_SCHEMA.md's "(Future)" definitions; new Announcement schema documented and versioned per JSON_SCHEMA.md's Versioning rules.
12. **Testing** — Playwright community-page coverage passes; date-range unit tests and featured content aggregator tests exist.
13. **Documentation** — JSON_SCHEMA.md updated (Event/Promotion no longer "(Future)", Announcement added); PROJECT.md and ROADMAP.md flagged/updated for the scope-advancement decision; TODO.md / CONTEXT.md updated once the sprint completes.
14. **Git** — Conventional Commit messages; one content type per commit where practical.

---

# Testing Plan (execution record)

Unit Tests

- [ ] "Is upcoming" / "is active" / "is expired" date-range helpers pass for events, promotions and announcements.
- [ ] Featured content aggregator correctly combines `featured` records across all three repositories.

Integration Tests

- [ ] Community page renders events, promotions, announcements, featured content, spotlight and the news placeholder from their respective repositories.
- [ ] A promotion correctly resolves and links to its parent business page.

Playwright

- [ ] Community page loads and displays all six sections without console errors.
- [ ] Clicking a promotion opens the correct business page.
- [ ] Empty states render correctly for a content type with no active records.

Manual Testing

- [ ] Review the community page with a full sample dataset.
- [ ] Review the community page with a sparse/near-empty dataset to confirm empty states remain helpful, per DESIGN_SYSTEM.md.
- [ ] Confirm the local news placeholder reads as "coming soon," not broken or missing.

Responsive Testing

- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1280px)
- [ ] Large Desktop (1536px+)

Accessibility

- [ ] Keyboard-only pass through all new interactive elements.
- [ ] Screen reader spot-check on events, promotions and announcements sections.

---

# Release Checklist (pre-merge to `main`)

- [ ] Build succeeds.
- [ ] Lint succeeds.
- [ ] Type checking succeeds.
- [ ] Responsive verification completed.
- [ ] Accessibility review completed.
- [ ] Documentation updated (JSON_SCHEMA.md, and PROJECT.md/ROADMAP.md scope-advancement follow-up considered).
- [ ] No critical or high review findings remain open.
- [ ] Definition of Done (see README.md) satisfied — the site encourages repeat visits even when users aren't looking for a business.
- [ ] Vercel preview deployment verified.

---

# Findings Log

Record review findings here as they're raised, using REVIEW_CHECKLIST.md severity levels (Critical / High / Medium / Low).

| Severity | Finding | File/Area | Resolution |
|----------|---------|-----------|------------|
| | | | |

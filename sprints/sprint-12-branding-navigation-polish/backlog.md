# Sprint 12 — Backlog

Branding & Navigation Polish

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# Purpose

Breaks Sprint 12's four features into independently shippable items.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Breadcrumb on the business detail page | None | High | Completed |
| B-002 | Real logo in header/footer (`Logo.tsx`, `settings.json`) | None | High | Completed |
| B-003 | Real browser tab icon (`app/icon.png`, `app/favicon.ico`) | B-002 (reuses the same source image) | Medium | Completed |
| B-004 | Acknowledgment of Country in the footer | None | Medium | Completed |

---

# Prioritisation Notes

- All four items are independent of each other in principle; B-003 was sequenced after B-002 only
  because both crop from the same source image and it was efficient to process them together.
- B-001 and B-004 both touch global layout components (`app/business/[slug]/page.tsx`,
  `Footer.tsx`) but not the same file, so there was no ordering constraint between them.

---

# Out of Scope for This Backlog

- Naming a specific Traditional Owners/Country in the acknowledgment text — general wording only,
  confirmed 2026-07-16.
- Any redesign of `Navigation.tsx`/`Footer.tsx` layout beyond the logo mark swap.
- A real Weather widget (Sprint 11's `WeatherComingSoon.tsx` placeholder is untouched).

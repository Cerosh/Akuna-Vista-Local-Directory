# Sprint 12 — Goals

Branding & Navigation Polish

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# Sprint Goal

Roll out the project owner's real logo across the site, give the business detail page an in-page
way back to Home, and add an Acknowledgment of Country to the footer.

---

# Objective

Three small, independent pieces of polish, not one connected feature:

1. **Navigation fix** (F-001) — the business detail page had no in-page breadcrumb; visitors relied
   entirely on the small global header logo to get back to Home.
2. **Real branding** (F-002/F-003) — replace the generic Lucide-icon placeholder mark with the
   project owner's supplied logo, everywhere it's used (header, footer, browser tab icon).
3. **Acknowledgment of Country** (F-004) — standard practice on Australian community/business
   websites, missing from this site entirely until now.

---

# Why This Sprint Exists

The project owner reported (2026-07-16) that
`/business/private-mathematics-english-tutoring` felt like it had "no way to go back to home
page," and separately supplied a real logo image
(`ChatGPT Image Jul 15, 2026, 10_21_59 PM.png`) to use "in the relevant places." Investigation
found the global header's Home link/logo actually do work — the real gap was the business detail
page's own lack of an in-page breadcrumb. The same message also asked to "include acknowledgment,"
which was initially missed and only clarified as an Acknowledgment of Country request in a
follow-up message.

---

# Goals

1. **The business detail page is not a dead end** — a breadcrumb gives a visible, in-page path back
   to Home and to the business's category.
2. **The site has real brand identity** — the supplied logo replaces the placeholder mark in the
   header, footer, and browser tab icon.
3. **The site follows standard Australian web practice** — a footer Acknowledgment of Country,
   present on every page.

---

# Non-Goals (this sprint)

- **No specific Traditional Owners/Country named.** The project owner confirmed general wording
  (2026-07-16) rather than naming a specific nation — avoids the risk of an incorrect attribution.
- **No redesign of the header/footer layout beyond swapping the logo mark.** `Logo.tsx`'s existing
  icon+text layout is kept; only the icon itself changes.
- **No new "branding" data model or CMS field for the acknowledgment text.** It's fixed site copy
  in `Footer.tsx`, not a configurable `data/settings.json` field.

---

# Success Criteria

Sprint 12 is successful when:

- [x] The business detail page shows a working `Home > Category > Business Name` breadcrumb.
- [x] The real logo renders in the header and footer, and as the browser tab icon.
- [x] The footer shows an Acknowledgment of Country on every page.
- [x] No regressions — full Playwright suite (Chromium/Firefox/WebKit) passes.

---

# Guiding Principle

A reported "bug" is worth verifying before assuming it's a broken link — the actual issue here was
a missing affordance, not broken code. Real content (a logo, an acknowledgment) still goes through
the same confirm-before-code process as any other change, even when it feels like an obvious
addition.

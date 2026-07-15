# Sprint 12 – Branding & Navigation Polish

Neighbourhood Directory Platform

Sprint Number: 12

Sprint Name: Branding & Navigation Polish

Sprint Goal: Add a real logo (supplied directly by the project owner,
`ChatGPT Image Jul 15, 2026, 10_21_59 PM.png`) across the site, give the business detail page its
own in-page way back to Home, and add an Acknowledgment of Country to the footer.

Sprint Status: ✅ Complete locally (not yet committed/deployed)

Start Date: 2026-07-16

End Date: 2026-07-16

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# Numbering

Straightforward sequential addition after Sprint 11 (Home Tutoring Listing). Sprint 10 (Future
Platform Foundation) is still not started, but its scope (search facets, admin auth, etc.) doesn't
fit this work, so per the same precedent Sprint 11 set (new work gets its own sprint rather than
being forced into an unrelated one), this is Sprint 12. `TODO.md`'s "Next Sprint" pointer stays on
Sprint 10 until that sprint is started; this sprint is raised ad hoc, same as Sprint 11 was.

---

# Sprint Objective

The project owner reported that the business detail page (e.g.
`/business/private-mathematics-english-tutoring`) feels like it has "no way to go back to home
page." Investigation (2026-07-16) confirmed the global header's logo and "Home" nav link do work
site-wide (verified via direct HTML inspection of the rendered page), so this isn't a broken link —
it's a missing in-page affordance. The fix is a breadcrumb (Home > Category > Business Name) on the
business detail page itself.

Separately, the project owner supplied a real logo image (circular illustrated emblem + "Akuna
Vista / Local Directory" wordmark + tagline) to replace the current placeholder mark
(`components/common/Logo.tsx`'s generic pin icon + text, used in `Navigation.tsx` and
`Footer.tsx`), and the browser tab icon (`app/favicon.ico`, `app/icon.svg`, both Next.js defaults).

The project owner also asked for an Acknowledgment of Country — standard practice on Australian
websites — confirmed 2026-07-16 as general (non-nation-specific) wording, placed in the footer
only.

---

# Business Value

- A visitor landing on a business page via a shared link or search result currently has to notice
  a small header logo to get back — a breadcrumb makes the path back to Home (and to the
  business's category) obvious without relying on that.
- The site currently has no real brand identity — every logo placement is a generic Lucide icon +
  text. Rolling out the real logo makes the site look like a finished product, not a scaffold.
- An Acknowledgment of Country is expected practice on Australian community/local sites and its
  absence is conspicuous; adding it is a small, correct fix.

---

# Success Criteria

The sprint is successful when:

- [x] All acceptance criteria below are met.
- [x] The business detail page shows a breadcrumb (Home > Category > Business Name), each segment
      except the last a working link.
- [x] The real logo renders in the header (`Navigation.tsx`) and footer (`Footer.tsx`).
- [x] The browser tab icon is the new logo's emblem, not the Next.js default.
- [x] `data/settings.json`'s `logo` field points at a file that actually exists.
- [x] The footer shows an Acknowledgment of Country.
- [x] No regressions: existing Playwright suite (all 3 browsers) still passes (278 passed, 16
      skipped, 0 failed — full run 2026-07-16).

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Breadcrumb (Home > Category > Business Name) on the business detail page | High | Completed |
| F-002 | Replace `Logo.tsx`'s placeholder mark with the real logo image in the header and footer | High | Completed |
| F-003 | Replace the browser tab icon (favicon/`icon.svg`) with a cropped version of the real logo's emblem | Medium | Completed |
| F-004 | Acknowledgment of Country in the footer | Medium | Completed |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1

As a visitor on a business's detail page

I want a visible path back to Home and to the business's category

So that I'm not relying on a small header logo I might not notice is clickable.

Acceptance Criteria

- [x] `app/business/[slug]/page.tsx` renders a breadcrumb above `BusinessHero`: `Home > {Category
      Name} > {Business Name}`. New component: `features/business-details/Breadcrumb.tsx`.
      Category segment omitted gracefully if `categoryRepository.getBySlug` returns `null`.
- [x] "Home" links to `/`; the category segment links to `/category/{categoryId}` (the existing
      category route); the business name segment is plain text (current page, not a link).
- [x] Breadcrumb uses semantic markup (`<nav aria-label="Breadcrumb">` with an ordered list).
- [x] Verified on both desktop and mobile viewport widths via Playwright screenshots — wraps
      cleanly on mobile (390px), no overflow. New Playwright coverage:
      `business-detail.spec.ts` "breadcrumb shows Home > Category > Business Name, and links
      navigate correctly".

---

## Story 2

As the project owner

I want the site's real logo used in the header and footer

So that the site reflects real branding instead of a generic placeholder icon.

Acceptance Criteria

- [x] The supplied image is added to the repo as `public/images/logo-full.png` — resized from the
      source 1254×1254px to 512×512px via Python/Pillow (macOS has no ImageMagick installed;
      Pillow was available and used instead, same "process the real asset with what's on hand"
      approach as Sprint 11's `sips`/`qlmanage` use).
- [x] `components/common/Logo.tsx` renders this image via `next/image` at `size-10` (40px,
      `rounded-full`), replacing the `MapPinHouse` icon. Square source, no distortion.
- [x] `Footer.tsx`'s use of the same `Logo` component picked up the change automatically — no
      footer-specific code needed.
- [x] `data/settings.json`'s `logo` field updated to `/images/logo-full.png` (was the dead
      `/images/logo.svg` reference).
- [x] `alt=""` used on the logo image (decorative) rather than a redundant non-empty alt — the
      adjacent `{siteName}` text span (unchanged) already provides the accessible name, and a
      non-empty alt would have doubled up the announcement for screen reader users. Judgement call
      made during implementation, consistent with the acceptance criterion's intent ("siteName
      text retained... for accessibility") without literally requiring non-empty alt text.

---

## Story 3

As a visitor with the site open in a browser tab

I want to see the site's real logo as the tab icon

So that the tab is recognisable among others, and the site doesn't look unfinished.

Acceptance Criteria

- [x] A square crop of just the circular emblem (excluding the wordmark/tagline) generated via
      Pillow (top 860×860px of the 1254×1254px source, centred) and added as `app/icon.png`
      (512×512px), replacing `app/icon.svg` (removed — Next.js's App Router picks one icon
      convention, not both).
- [x] `app/favicon.ico` regenerated from the same crop, multi-size (16/32/48px).
- [x] **Discovery during implementation**: the first `favicon.ico` (built from an RGB-mode Pillow
      image) crashed the whole dev server with a 500 on every route —
      `Processing image failed... The PNG is not in RGBA format!` from Next.js's Turbopack image
      pipeline. Root cause: Pillow's multi-size `.ico` save embeds PNG frames, and Turbopack's ICO
      decoder requires those embedded PNGs to be RGBA, not RGB. Fixed by converting the source
      image to `RGBA` before cropping/saving. Confirmed via `npm run typecheck` (clean before this
      was caught — typecheck doesn't touch binary assets) and a real page load returning 500 until
      fixed, 200 after.
- [x] Verified: browser tab icon renders correctly (confirmed via `curl -sI` 200s on both
      `/favicon.ico` and `/icon.png`, and a full production build/Playwright run completing
      without the image-processing error recurring).

---

## Story 4

As a visitor to the site

I want to see an Acknowledgment of Country

So that the site reflects standard, respectful practice on Australian community websites.

Acceptance Criteria

- [x] `Footer.tsx` renders the confirmed general wording: "We acknowledge the Traditional Owners of
      the land on which we work and live, and pay our respects to Elders past, present and
      emerging."
- [x] Placed in the footer only, its own block above the copyright/legal-links row, separated by
      the existing border-top divider — present on every page (global `Footer.tsx`). Verified via
      Playwright screenshot and new `homepage.spec.ts` assertion
      (`home.footer` `toContainText("We acknowledge the Traditional Owners")`).
- [x] Plain text, no new data field — hardcoded in `Footer.tsx`, not `data/settings.json`.

---

# Testing Plan

- [x] New Playwright coverage: `business-detail.spec.ts` "breadcrumb shows Home > Category >
      Business Name, and links navigate correctly".
- [x] New Playwright coverage: `homepage.spec.ts`'s main load test now asserts the footer contains
      the Acknowledgment of Country text.
- [x] Manual verification: header/footer logo and breadcrumb screenshotted at desktop (1280px) and
      mobile (390px) via a throwaway Playwright script — no layout shift/overflow.
- [x] Manual verification: browser tab icon confirmed served correctly (`/favicon.ico`,
      `/icon.png` both 200 OK; the RGBA bug below was caught and fixed before this passed).
- [x] Full existing Playwright suite (Chromium/Firefox/WebKit) passes — 278 passed, 16 skipped, 0
      failed, run twice (once before adding the new breadcrumb/footer test coverage, once after).
      Port 3000 freed before each run per the known dev-server-vs-Playwright-build conflict (Sprint
      11 notes.md), dev server restarted afterward both times.

---

# Definition of Done

- [x] All acceptance criteria above checked off only once actually implemented and observed.
- [x] `npm run lint` / `npm run typecheck` clean.
- [x] Full Playwright suite passes.
- [x] Sprint docs (`goals.md`, `tasks.md`, `notes.md`, `retrospective.md`, `review.md`) filled in
      to the same standard as Sprint 11.

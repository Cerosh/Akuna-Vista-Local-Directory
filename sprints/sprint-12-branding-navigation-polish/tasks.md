# Sprint 12 — Technical Tasks

Branding & Navigation Polish

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# F-001 — Breadcrumb on the business detail page

- [x] New component: `features/business-details/Breadcrumb.tsx` — `Home > {Category} >
      {Business Name}`, `<nav aria-label="Breadcrumb">` with an `<ol>`. Category segment omitted
      if `categoryRepository.getBySlug()` returns `null`.
- [x] `app/business/[slug]/page.tsx`: renders `<Breadcrumb businessName={business.name}
      category={category ?? undefined} />` above the existing two-column layout.
- [x] New Playwright test: `business-detail.spec.ts` "breadcrumb shows Home > Category > Business
      Name, and links navigate correctly" — asserts the Home link's `href`, that a category link
      exists and is clickable (navigates to `/category/...`), and the business name is present.
- [x] `tests/pages/BusinessPage.ts`: added a `breadcrumb` locator
      (`getByRole("navigation", { name: "Breadcrumb" })`).

---

# F-002 — Real logo in header and footer

- [x] Source image inspected: `/Users/ceroshjacob/Downloads/ChatGPT Image Jul 15, 2026, 10_21_59
      PM.png`, 1254×1254px RGB, no ImageMagick available locally — used Python 3's Pillow
      (already installed, v11.3.0) instead.
- [x] `public/images/logo-full.png` — full image resized to 512×512px via
      `Image.resize((512, 512), Image.LANCZOS)`, saved with `optimize=True` (~275KB).
- [x] `components/common/Logo.tsx`: replaced the `MapPinHouse` icon with `next/image` rendering
      `/images/logo-full.png` at `size-10` (40px), `rounded-full`, `alt=""` (decorative — the
      adjacent `{siteName}` text span is the accessible name). `Footer.tsx` picks this up
      automatically since both share the one `Logo` component.
- [x] `data/settings.json`: `logo` field changed from the dead `/images/logo.svg` reference to
      `/images/logo-full.png`.

---

# F-003 — Real browser tab icon

- [x] Emblem-only crop generated via Pillow: top 860×860px of the 1254×1254px source (centred
      horizontally), which cleanly captures the circular illustration without the
      wordmark/tagline text below it. Resized to 512×512px.
- [x] `app/icon.png` added (Next.js App Router icon convention); `app/icon.svg` (old Next.js
      default) deleted.
- [x] `app/favicon.ico` regenerated from the same crop at 16/32/48px multi-size.
- [x] **Bug found and fixed during implementation**: the first `favicon.ico` build (RGB-mode
      source) broke every route with a 500 — `Processing image failed... The PNG is not in RGBA
      format!` (Turbopack's ICO decoder requires RGBA-mode embedded PNG frames). Fixed by
      converting the source to `RGBA` (`Image.open(...).convert("RGBA")`) before cropping and
      saving the `.ico`. Regenerated, confirmed the page returns `200` again.
- [x] Verified via `curl -sI` — both `/favicon.ico` and `/icon.png` return `200`.

---

# F-004 — Acknowledgment of Country

- [x] `components/layout/Footer.tsx`: added "We acknowledge the Traditional Owners of the land on
      which we work and live, and pay our respects to Elders past, present and emerging." as its
      own paragraph above the copyright/legal-links row, separated by the section's existing
      `border-t` divider.
- [x] New Playwright assertion: `homepage.spec.ts`'s main load test now asserts
      `home.footer` contains "We acknowledge the Traditional Owners".

---

# Verification

- [x] `npm run typecheck` — clean.
- [x] `npm run lint` — clean.
- [x] Playwright screenshots (desktop 1280px, mobile 390px) of the business detail page — confirmed
      breadcrumb wraps cleanly on mobile, logo renders correctly, footer acknowledgment text
      visible above the copyright row.
- [x] Full Playwright suite run twice (before and after adding the new breadcrumb/footer test
      coverage) — 278 passed, 16 skipped, 0 failed on the final run. Port 3000 freed before each
      run (killed the existing `npm run dev` process), dev server restarted afterward both times —
      same known conflict documented in Sprint 11's notes.md.

---

# AI Development Plan

For every task above:

1. Research first — investigate the reported issue before assuming what's broken (F-001 turned out
   not to be a broken link).
2. Write the spec (this sprint's README.md) and get explicit confirmation before any code, per
   `.ai/CLAUDE.md`'s Spec-Driven Development process — no exceptions, including for a logo swap or
   acknowledgment text.
3. Implement one feature at a time.
4. Run lint, typecheck, the full Playwright suite.
5. Check off acceptance criteria only once actually observed working, not in advance.

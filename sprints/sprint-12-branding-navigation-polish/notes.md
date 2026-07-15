# Sprint 12 — Notes

Branding & Navigation Polish

Owner: Cerosh Jacob

Last Updated: 2026-07-16

---

# Investigation: "no way to go back to home page"

Before writing any spec, checked whether the global header actually has a working Home link on the
business detail page. `curl`'d the rendered HTML of
`/business/private-mathematics-english-tutoring` on both dev servers that happened to be running
(3000 and 3001) and confirmed `Navigation.tsx`'s logo (`href="/"`) and "Home" nav link both render
correctly, server-side, on that route. So this was never a broken link — the real gap was that the
business detail page itself has no in-page affordance signalling "you can go back," which matters
most on mobile where the nav links collapse behind a hamburger icon and only the small header logo
remains. Fixed with a breadcrumb (F-001), not a nav bug fix.

---

# Logo asset processing

Source: `/Users/ceroshjacob/Downloads/ChatGPT Image Jul 15, 2026, 10_21_59 PM.png`, 1254×1254px,
RGB, opaque cream background. Circular illustrated emblem (hills, a tree, a path, Aboriginal
dot-art motifs, small houses) sits in the top ~860px; "AKUNA VISTA / LOCAL DIRECTORY" wordmark +
tagline below that.

No ImageMagick installed locally (`which convert magick` → not found). Python 3 with Pillow 11.3.0
was available and used instead — same spirit as Sprint 11's `sips`/`qlmanage` real-asset
processing, just a different tool for the job.

- **Full lockup** (`public/images/logo-full.png`): resized to 512×512px, used at `size-10` (40px)
  in `Logo.tsx`. At that size the wordmark inside the image is illegible — intentional, since the
  adjacent `{siteName}` text span (unchanged) is what actually carries the readable site name; the
  image serves as a recognisable icon-scale mark, the same role the old `MapPinHouse` icon played.
- **Emblem-only crop** (`app/icon.png` / `app/favicon.ico`): cropped to the top 860×860px of the
  source (centred), which captures the full circle cleanly without cutting off any edge and without
  including the wordmark. Confirmed visually via a saved preview before committing to this as the
  final crop.

## Bug: RGB-mode `.ico` crashed every route

First `favicon.ico` build (Pillow, multi-size save from an `Image.open(...).convert('RGB')`
source) broke the entire dev server — every route, not just the business page, returned `500`:

```
./app/favicon.ico
Processing image failed
unable to decode image data
Caused by:
- Format error decoding Ico: The PNG is not in RGBA format!
```

Root cause: Pillow's ICO writer embeds PNG frames for sizes above 16×16 (this build used
16/32/48px), and Next.js's Turbopack image pipeline decodes those embedded PNGs strictly — it
requires RGBA, and an `RGB`-mode source produces `RGB` PNG frames. Fixed by converting the source
image to `RGBA` (`Image.open(...).convert("RGBA")`) before cropping/resizing/saving the `.ico`.
Confirmed fixed: the same route returned `200` immediately after regenerating the file with the
RGBA-mode source, no other changes needed.

Caught by actually loading the page after the change, not by `npm run typecheck`/`npm run lint` —
neither touches binary asset correctness, and both were clean throughout. Reinforces this project's
existing "verification is runtime observation" practice: a passing typecheck says nothing about
whether a generated binary asset is well-formed.

---

# Acknowledgment of Country — wording decision

The project owner's original message ("Include acknowledgment") was initially missed/misread as
part of the earlier gallery-zoom/section-swap request rather than its own ask. Clarified in a
follow-up message as an Acknowledgment of Country request. Two options were on the table:

1. General wording, no nation named.
2. Naming Dharug Country specifically — Schofields/Marsden Park (already referenced elsewhere in
   this project, e.g. the Sprint 11 train departures feature's `SCHOFIELDS_STATION_ID`) sits on
   Dharug Country.

The project owner chose general wording (2026-07-16) rather than confirming the specific nation —
the safer default when the exact Country for the site's represented area isn't independently
verified, since an incorrect attribution is a real, not cosmetic, error. If a future sprint wants
to name Dharug Country specifically, that should be its own confirmed decision, not inferred from
this note.

---

# Verification

Screenshotted the business detail page (desktop 1280px, mobile 390px) and the footer at desktop
width via a throwaway Playwright script (`node` script using the project's own `playwright`
dependency — run from inside the project directory so module resolution works, not from `/tmp`).
Confirmed: breadcrumb renders and wraps correctly on mobile without overflow, header logo is
legible and doesn't distort, footer acknowledgment text sits in its own line above the
copyright/legal row.

Full Playwright suite run twice: once immediately after the four features were implemented (291
existing tests + no new coverage yet — 275 passed, 16 skipped), and again after adding the new
breadcrumb and footer-acknowledgment test coverage (294 tests — 278 passed, 16 skipped). Both runs
0 failed. Port 3000 was freed before each run (an `npm run dev` instance was occupying it) and the
dev server restarted afterward both times — the same known conflict between a running dev server
and Playwright's own `webServer` build documented in Sprint 11's notes.md.

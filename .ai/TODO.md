# TODO.md

# Current Sprint

Sprint Number

06 (complete) — awaiting go-ahead for Sprint 07

Sprint Name

Community Content

Status

✅ Complete

Recommended Claude Model

Claude Sonnet

---

# Sprint 06 Summary

Delivered: six new homepage sections giving residents a reason to visit without a specific
business need — Community Events, Local Promotions, a Community Noticeboard (Announcements),
a unified Featured Content mechanism, a Community Spotlight, and a "coming soon" Local News
placeholder. All content is sourced from JSON via dedicated repositories
(`EventRepository`, `PromotionRepository`, new `AnnouncementRepository`).

Key decisions:

- **Deliberately activated Version-4/"(Future)" scope early** — the Event and Promotion
  schemas (JSON_SCHEMA.md) were pulled forward from Version 4 at the project owner's explicit
  direction, not discovered mid-sprint scope creep. Documented in DECISIONS.md ADR-011;
  PROJECT.md and ROADMAP.md updated to match what's actually shipped.
- **New Announcement schema** — no prior precedent; deliberately includes a `featured` field
  beyond the sprint's original minimal field list, since the Featured Content mechanism
  needs to query all three content types (events, promotions, announcements) for
  `featured: true` consistently.
- **One Featured Content mechanism, not three** — `lib/services/featuredContentService.ts`
  aggregates `featured: true` records across all three repositories into a single normalised
  shape, rendered by one `FeaturedContentCard`, per the sprint's DRY requirement.
- **`lib/services/resolvePromotionBusinesses.ts`** — extracted shared "resolve a promotion's
  `businessId`, omit if dangling" logic once both the Promotions section and the Featured
  Content aggregator needed it, rather than duplicating it.
- **New `BusinessRepository.getById()`** — needed to resolve a promotion's `businessId` back
  to a business name/slug; mirrors the existing `getBySlug()`.

Bug found while writing Playwright coverage (not caught by unit tests): `LocalNewsPlaceholder`
used `CardTitle` for its "Local news" heading — `CardTitle` renders a styled `<div>`, not a
real heading element, so it wasn't reachable via `getByRole("heading")` and broke the page's
heading hierarchy. Fixed by using a real `<h2>`, consistent with every other new section.

`npm run lint`, `typecheck`, `test` (80 unit tests), `test:e2e` (29 Playwright tests), and
`build` all pass. Verified visually via the dev server (all six sections render with real
seed data, promotion → business links resolve correctly, no console errors) and via Playwright
across the existing mobile-viewport test.

**Known limitation:** genuine "zero active records" empty-state e2e coverage wasn't added —
these are Server Components reading JSON at module scope with no per-test data-injection seam,
and building one felt like infrastructure this sprint didn't call for. The underlying logic is
covered at the repository/unit level (`getUpcomingEvents([])` → `[]`, etc.); the empty-state UI
itself reuses the same `EmptyState` component already exercised by Sprint 3/5 Playwright
coverage.

Full plan: `sprints/sprint-06-community/`.

---

# Sprint 05 Summary

Delivered: `/search` — keyword, category and suburb search with instant, client-side filtering (per ARCHITECTURE.md's Search Architecture), a typeahead suggestions combobox (keyboard-navigable: Arrow Up/Down, Enter, Escape), optional recent-searches (localStorage, low priority per plan), and a shareable/bookmarkable URL (query params synced via `history.replaceState`, not a server round-trip per keystroke). Homepage Hero's search box now really submits to `/search` (`<form action="/search">`).

Key decisions:

- **New `lib/services/searchService.ts`** — pure `searchBusinesses()` / `getSearchSuggestions()` functions, deliberately separate from `BusinessRepository.getPage()` (server-side, URL-searchParams-driven) since search must run client-side for the "instant" feel; category/suburb matching semantics were kept intentionally identical between the two so results don't diverge.
- **New `SuburbRepository`** — `data/suburbs.json` was empty since Sprint 1; populated with the 5 real suburbs already referenced in sample business data (Schofields, Tallawong, The Ponds, Box Hill, Kellyville) since suburb search needed real data to search against.
- **`useDeferredValue`** on the query input, so typing stays responsive as the architecture scales, without hand-rolled debounce logic.

Bug found and fixed during visual verification (not caught by unit tests until added retroactively): **searching "cafe" returned zero results** even though "The Local Grind Café" clearly matches — the sample data uses accented characters ("Café", "Cafés & Restaurants") but the naive substring match was case-sensitive to diacritics too. Fixed by adding Unicode NFD-normalization + diacritic-stripping to the match function, with a regression test covering both accented and unaccented queries.

Second bug found while writing Playwright tests: pressing **Escape** to dismiss suggestions permanently disabled them from ever reappearing while typing (a single `isFocused` boolean was conflating "has DOM focus" with "should show suggestions"). Fixed by renaming to `isSuggestionsOpen` and having `onChange` re-open it on every keystroke.

`npm run lint`, `typecheck`, `format:check`, `test` (46 unit tests), `test:e2e` (28 Playwright tests), and `build` all pass. Verified visually (desktop + mobile), keyboard navigation through the suggestions listbox (`aria-activedescendant` updates correctly), heading hierarchy, and the homepage-to-search form submission end to end.

Full plan: `sprints/sprint-05-search/`.

---

# Next Sprint (not started — do not begin without explicit instruction)

Sprint 07 — Quality. Full plan: `sprints/sprint-07-quality/`.

---

# After Completing This Sprint

Stop.

Do not continue to Sprint 07.

Wait for explicit instruction before implementing additional features.

Never implement future roadmap items without explicit instruction.

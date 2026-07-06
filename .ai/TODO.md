# TODO.md

# Current Sprint

Sprint Number

05 (complete) — awaiting go-ahead for Sprint 06

Sprint Name

Search

Status

✅ Complete

Recommended Claude Model

Claude Sonnet

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

Sprint 06 — Community Content. Full plan: `sprints/sprint-06-community-content/`.

---

# After Completing This Sprint

Stop.

Do not continue to Sprint 06.

Wait for explicit instruction before implementing additional features.

Never implement future roadmap items without explicit instruction.

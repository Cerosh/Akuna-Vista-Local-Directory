# Sprint 05 — Notes

Search

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Design Notes

- Per DESIGN_SYSTEM.md's "Search Experience" section: search should always be visible, autocomplete can be added later (this sprint adds it), and "future AI search should integrate naturally" — this sprint's UI should already look and behave like the eventual AI-powered version will, just backed by simpler logic underneath.
- Per UI_GUIDELINES.md's "Search Experience" section: search should be available from key pages, respond quickly, handle empty states gracefully, support partial matches, and provide helpful messaging when no results are found — treat these five requirements as the sprint's literal acceptance bar.
- Navigation guidance (DESIGN_SYSTEM.md "Navigation") already states search should always remain accessible from the header — this sprint's `/search` route is the destination that entry point should lead to.
- Empty results should follow DESIGN_SYSTEM.md/UI_GUIDELINES.md's shared Empty States pattern: explanation, suggested action, positive messaging — e.g. "No businesses found for 'x'. Try a different suburb or browse categories instead," not a bare "No results."
- Suggestions/autocomplete dropdown should follow existing Input/Popover component patterns (DESIGN_SYSTEM.md Component Library) rather than introducing a new interaction pattern.
- Search results should reuse the existing Business Card design (DESIGN_SYSTEM.md "Business Card Design") for visual consistency with `/businesses` and `/category/[slug]` — a resident should not be able to tell, from card design alone, whether they arrived via search or browsing.

---

# Technical Notes

## Libraries

| Need | Approach | Notes |
|------|----------|-------|
| Keyword matching / scoring | Hand-written matching function over `BusinessRepository` data | Sufficient at current dataset scale (per PROJECT.md launch metrics: ~100 businesses); no new dependency required |
| Debouncing | Small custom hook (`useDebouncedValue`) or existing utility | No dependency needed for a single debounce use case |
| Fuzzy matching (optional) | Fuse.js or similar lightweight library | Only consider if plain substring/keyword matching proves too strict during manual testing (e.g. typo tolerance); not a requirement for this sprint — do not add it speculatively |

No new library is expected to be required for the core of this sprint. Simple client-side filtering/scoring over the existing JSON dataset is sufficient at this scale; a fuzzy-matching library is an optional enhancement, not a dependency to reach for by default (CODING_STANDARDS.md: avoid unnecessary abstractions/dependencies).

## Patterns

- **Replaceable `SearchService` (ARCHITECTURE.md "Search Architecture")**: define the interface first, then implement the current client-side version behind it. Components call the interface, never the implementation directly — this is what makes the eventual swap to Server/Hybrid/Semantic/Vector/AI search (Version 3) a substitution rather than a rewrite, mirroring the existing `BusinessRepository` → `JSONRepository` → `SupabaseRepository` pattern.
- **Debounced client-side filtering**: search input state updates immediately for responsiveness, but the actual filter/search call is debounced to avoid recomputation on every keystroke.
- **Reuse Sprint 3's filter logic**: category and suburb matching should call into (or share a common module with) the filtering logic already built for `/businesses` and `/category/[slug]`. If that logic currently lives inline in a Sprint 3 component, extract it into `lib/services` so both `/search` and the directory pages depend on the same implementation.
- **URL as state**: consistent with Sprint 3, `/search` should reflect its query/category/suburb filters in URL search params, so search results are shareable and bookmarkable.

## Risks / Assumptions

- Risk: building `/search`'s category/suburb matching independently of Sprint 3 would create two parallel filtering implementations that drift apart over time. Mitigation: explicitly extract/reuse one shared filtering module (see Risks table in README.md).
- Risk: "search feels instant" is a subjective, UX-level requirement, not just a technical one — a technically fast but visually janky (layout-shifting) results update would still fail the Definition of Done. Mitigation: manual testing should explicitly judge perceived speed, not just measure function execution time.
- Assumes "search suggestions" means autocomplete/typeahead over existing business names, categories and suburbs already in the JSON data — not a natural-language or AI-powered suggestion feature, which is explicitly Version 3 (PROJECT.md "Out of Scope: AI Search").
- Assumes "recent searches" (marked optional in the sprint feature list) is a `localStorage`-based, purely client-side convenience with no backend — consistent with the MVP having no database (PROJECT.md MVP Scope: "No database").
- Assumes Sprint 2's homepage search entry point remains on the homepage but is upgraded to route into `/search` with the entered query, rather than this sprint redesigning the homepage itself.

## Open Questions

- None blocking. If ambiguity arises, follow CLAUDE.md's "When Unsure" guidance: don't guess, explain assumptions, offer alternatives, recommend the simplest option.

# Sprint 05 — Goals

Search

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Enable fast discovery.

---

# Objective

Give residents a real, fast way to find a business by keyword, category or suburb from a dedicated `/search` route — with results that update instantly as they type, helpful suggestions, and a graceful response when nothing matches — so search becomes a genuine alternative to browsing categories or asking the WhatsApp group.

---

# Why This Sprint Exists

PROJECT.md's Problem Statement describes residents repeatedly asking "Can anyone recommend a plumber?" inside WhatsApp because there's no faster way to find a trusted local business themselves. Sprints 2 and 3 gave residents browsing (homepage, directory, categories) as one path to an answer; this sprint gives them searching as the other, faster path — directly serving PROJECT.md's Design Principle "Search before scrolling" and DESIGN_SYSTEM.md's goal that "a resident should find a business within 30 seconds."

Sprint 2 deliberately built only a thin search entry point on the homepage and deferred real search logic to this sprint. This is the sprint where that promise is fulfilled.

---

# Goals

1. **Feels instant** — results update live as the user types, debounced so it's smooth rather than janky, meeting the sprint's Definition of Done directly.
2. **Covers the ways residents actually search** — keyword (name/description/tags), category, and suburb (`address.suburb`/`serviceAreas`), individually and combined.
3. **Graceful when nothing matches** — empty results explain why and suggest a next step, never a dead-end blank page.
4. **Replaceable architecture** — search sits behind a `SearchService`-style abstraction so ARCHITECTURE.md's future Server/Hybrid/Semantic/Vector/AI search (Version 3) can be swapped in later without rewriting the UI.
5. **Complements, not duplicates, Sprint 3** — category and suburb search reuse the filtering infrastructure already built for `/businesses` and `/category/[slug]`; this sprint adds a search entry point and instant-filtering UX on top of that shared logic, not a second, competing implementation.

---

# Non-Goals (this sprint)

- No AI, semantic, embedding-based or vector search — that's Version 3 / Phase 10 (ARCHITECTURE.md "AI Architecture", PROJECT.md "Out of Scope: AI Search, Vector Search, Chatbot").
- No server-side search infrastructure or search APIs — ARCHITECTURE.md marks Server Search as Future; this sprint is explicitly client-side.
- No second, parallel filtering implementation separate from Sprint 3's — if category/suburb filtering logic needs to change, it should change once, in a shared place.
- No recommendation/ranking algorithm beyond simple relevance ordering — smarter ranking belongs conceptually to Search's later phases or the AI-ready roadmap.

---

# Success Criteria

Sprint 5 is successful when:

- [ ] `/search` exists and supports keyword, category and suburb search against the current dataset.
- [ ] Results update instantly (debounced, client-side) as the user types, with no full page reload.
- [ ] Suggestions surface relevant business names, categories and suburbs as the user types.
- [ ] A no-match query renders a friendly, actionable empty state.
- [ ] All search logic is reachable through one `SearchService`-style interface, not scattered inline in components.
- [ ] Category/suburb matching reuses Sprint 3's filtering logic rather than a second implementation.

---

# Guiding Principle

If a resident has to fall back to scrolling through categories because search didn't understand what they typed, search isn't done yet.

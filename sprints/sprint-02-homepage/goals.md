# Sprint 02 — Goals

Homepage

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Deliver a polished landing page.

---

# Objective

Turn the empty, professionally-engineered shell from Sprint 1 into a homepage that actually sells the idea of the directory to a first-time visitor — using real repository-driven data, not hardcoded content or lorem ipsum.

---

# Why This Sprint Exists

PROJECT.md frames the core opportunity: Akuna Vista already has 800+ community members and constant recommendation traffic in WhatsApp, but that knowledge disappears. The homepage is the first place that knowledge becomes durable and searchable. If a visitor doesn't immediately understand "this replaces asking the group chat," the rest of the platform never gets used.

This sprint also validates, in a real UI, that the Sprint 1 foundation actually works end-to-end: theme tokens render correctly, the repository pattern serves real data to Server Components, and the layout holds up under real content instead of an empty placeholder.

---

# Goals

1. **Instant clarity** — hero + supporting copy communicate what the site is and who it's for within 5 seconds (this sprint's Definition of Done).
2. **Immediate action** — a visible, working search entry point gives visitors something to do immediately, not just something to read.
3. **Browsable without searching** — popular categories and featured businesses let visitors explore before they know what they're looking for.
4. **Trust signals** — "why choose local" and community statistics sections build credibility using the community's real scale (800+ members) rather than generic marketing claims.
5. **Fully responsive** — the homepage must work as well on a phone as a desktop; most residents will land here from a phone via a WhatsApp link.
6. **Repository-driven, not hardcoded** — every dynamic section pulls from `businesses.json` / `categories.json` / `settings.json` via the Sprint 1 repository layer, proving the architecture holds under real usage.

---

# Non-Goals (this sprint)

- No real search functionality — that's Sprint 5. The search entry point can navigate to the directory or filter the visible featured businesses, but does not need ranking, fuzzy matching, or full-text search.
- No business directory, filtering, sorting or pagination — Sprint 3.
- No business detail pages — Sprint 4.
- No community/about/contact pages — Sprint 5 (per ROADMAP Phase 5), though the footer may link to them as placeholders.
- No full 100-business dataset — Sprint 6 (Populate Content). Use a small, realistic sample set for now.

---

# Success Criteria

Sprint 2 is successful when:

- [x] A visitor unfamiliar with the project understands the site's purpose within 5 seconds.
- [x] Every homepage section listed in the sprint Features table is built and responsive.
- [x] Homepage content is 100% sourced from JSON via the repository layer.
- [x] Playwright homepage journey test passes in CI.
- [x] Lighthouse scores are directionally healthy (not yet the Sprint 9 targets, but no obvious regressions from Sprint 1's shell).

---

# Guiding Principle

The homepage should feel calm, modern and trustworthy — Apple simplicity, Airbnb friendliness, Linear polish, Notion consistency (DESIGN_SYSTEM.md "Design Vision"). If a section doesn't help a visitor understand the value or take action, cut it.

# Sprint 02 — Notes

Homepage

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Design Notes

- Follow the fixed homepage layout from DESIGN_SYSTEM.md ("Homepage Layout"): Hero → Search → Popular Categories → Featured Businesses → Community Statistics → How It Works ("Why choose local") → Testimonials → Newsletter → Footer. This sprint implements Hero, Search, Categories, Featured Businesses, Why Choose Local, Community Statistics, Navigation and Footer — Testimonials and Newsletter are not in this sprint's explicit deliverables and can be deferred if time is tight, but the layout should leave room for them.
- Visual hierarchy must guide the eye in that exact order (DESIGN_SYSTEM.md "Visual Hierarchy") — never let secondary sections (e.g. community statistics) visually compete with the hero or search.
- Colour usage stays within the 80% neutral / 15% primary / 5% accent philosophy — the homepage is the highest-traffic page and the easiest place to accidentally overuse brand colour.
- Business Card and Category Card must match the exact fields specified in DESIGN_SYSTEM.md's "Business Card Design" and component library — don't invent new card variants for the homepage.
- Search input on the homepage should look and behave consistently with whatever the real directory search (Sprint 5) will eventually use — treat this as the first appearance of a long-lived component, not a one-off.

---

# Technical Notes

## Libraries

No new libraries expected this sprint — reuse what Sprint 1 installed (Tailwind, shadcn/ui, Framer Motion for subtle entrance/hover states, Lucide React for icons).

## Patterns

- **Repository Pattern continues** (ADR-003): all homepage data — categories, featured businesses, community statistics — must flow through `CategoryRepository` / `BusinessRepository`, never imported from JSON directly in a page or component.
- **Server Components by default** (ADR-005): only the search input and the mobile navigation drawer need client-side interactivity; everything else (hero, categories, featured businesses, statistics) should render server-side.
- **Thin search entry point**: implement the homepage search as a simple, isolated component that submits a query param to the directory route. This avoids building throwaway search logic that gets replaced in Sprint 5 — the interface should already look like what real search will consume.

## Risks / Assumptions

- Assumes a small hand-written sample dataset (not the full 100 businesses / 25 categories from ROADMAP Phase 6) is acceptable for this sprint — using obviously fabricated placeholder text (e.g. "Business Name Here") would undercut the "5 second trust" goal, so sample data should still look realistic.
- Assumes community statistics can cite the real, current number from PROJECT.md (800+ WhatsApp members) even before the full platform is populated — using an obviously fake number would work against the trust goal this sprint exists to build.
- Risk: it's tempting to start building real search or the full directory while "just wiring up" the homepage's search entry point. Keep it thin — see tasks.md "Out of Scope."

## Open Questions

- None blocking. If ambiguity arises, follow CLAUDE.md's "When Unsure" guidance: don't guess, explain assumptions, offer alternatives, recommend the simplest option.

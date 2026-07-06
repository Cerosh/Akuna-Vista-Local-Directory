# Sprint 04 — Notes

Business Details

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Design Notes

- Page structure per ARCHITECTURE.md's "Business Entity" fields and ROADMAP.md Phase 4 sections: Hero → Gallery → Contact → Location → Opening Hours → Services → Recommendations → Related Businesses. This sprint delivers Hero, Contact, Service Areas, Gallery, Opening Hours, Social Links and Share — "Recommendations" display (not submission) and "Related Businesses" can be included if straightforward, but aren't blocking for Definition of Done.
- Every section should degrade gracefully rather than showing an empty state — unlike directory/category pages (Sprint 3), a business detail page's "sections" are simply omitted when data is absent, not shown with an empty-state message (there's nothing actionable for the user to do about a business's missing Instagram link).
- Follow DESIGN_SYSTEM.md's Business Card Design fields as the baseline for what a page must, at minimum, restate more fully: name, category, description, location, rating, recommendation count, featured/verified badges.
- Share button should follow existing Button component variants (DESIGN_SYSTEM.md "Buttons") — likely a Secondary or Ghost action, not competing with the primary contact CTA.

---

# Technical Notes

## Libraries

No new libraries expected for most of this sprint. For structured data, a small hand-written JSON-LD generator function is sufficient — no schema.org library needed for this scope. `next/image` handles gallery optimisation. Web Share API is a browser API, not a package.

## Patterns

- **Repository Pattern continues** (ADR-003): `getBusinessBySlug(slug)` is the only way this page reads business data.
- **Metadata via Next.js Metadata API**: use `generateMetadata()` on the route to produce per-business `<title>`, description and Open Graph tags server-side — keeps SEO metadata co-located with the page and testable independent of client rendering.
- **JSON-LD as a pure function**: structured data generation should be a pure function (`business: Business -> LocalBusinessJsonLd`) so it's trivially unit-testable without rendering the page.

## Risks / Assumptions

- Assumes "SEO metadata" and "structured data" in this sprint's scope mean *per-business* concerns only. Site-wide SEO infrastructure (sitemap.xml, robots.txt, canonical URL strategy) is explicitly ROADMAP Phase 8 — implementing it here would duplicate or conflict with that later sprint.
- Assumes recommendation *counts* can be displayed (already part of the Business schema/DESIGN_SYSTEM card fields) without building recommendation *submission*, which is a Version 2 feature (PROJECT.md "Out of Scope": Reviews).
- Risk: it's tempting to build a polished "related businesses" recommendation algorithm here. Keep it to same-category-only if included at all; smarter ranking belongs conceptually with Search (Sprint 5) or AI-Ready (Phase 10).

## Open Questions

- None blocking. If ambiguity arises, follow CLAUDE.md's "When Unsure" guidance: don't guess, explain assumptions, offer alternatives, recommend the simplest option.

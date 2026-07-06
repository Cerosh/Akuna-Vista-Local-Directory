# Sprint 03 — Notes

Business Directory

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Design Notes

- Reuse the Business Card and Category Card exactly as built in Sprint 2 — this sprint is about browsing mechanics (filter, sort, paginate, states), not new visual language (DESIGN_SYSTEM.md component library).
- Grid follows the 12/8/4-column system (desktop/tablet/mobile) from DESIGN_SYSTEM.md "Grid System"; cards should align consistently regardless of filter/sort state.
- Empty states must follow UI_GUIDELINES.md's pattern exactly: explain why nothing is shown, suggest a next action, keep the tone positive (e.g. *"No businesses found in this category yet. Try another category, or check back soon."*) — never a bare "No results."
- Loading skeletons, not spinners or blank screens, for any grid transition (DESIGN_SYSTEM.md "Loading States").
- Category pages need a short, human description per category, not just the grid — this is also a first step toward Sprint 8 SEO copy for these URLs.

---

# Technical Notes

## Libraries

No new libraries expected. Reuse Tailwind, shadcn/ui components (e.g. Select or ToggleGroup for sort/filter controls, Skeleton for loading states, Pagination if shadcn/ui provides a suitable primitive).

## Patterns

- **URL as source of truth**: filter, sort and page state should be derived from URL search params (Next.js `searchParams` on the Server Component), not local component state — this keeps pages shareable/bookmarkable and avoids "duplicate state" (CODING_STANDARDS.md "State Management").
- **Shared filtering logic**: `/businesses` and `/category/[slug]` must call the same underlying repository/service method for filtering, so behaviour never drifts between the two entry points (ADR-008 — business logic belongs in Features/Services, not duplicated across pages).
- **Server Components by default**: filtering, sorting and pagination can all be computed server-side from search params; no client-side state management library is needed for this sprint.

## Risks / Assumptions

- Assumes the Sprint 2 sample dataset may need a handful of additional records to meaningfully exercise pagination (e.g. if pageSize is 12, at least 13+ businesses in at least one category). Expanding sample data here is acceptable; the full 100-business population remains Sprint 6.
- Assumes "sorting" for this sprint means simple, deterministic orderings (Featured, Name, Recommendation count) — not relevance ranking, which belongs to Sprint 5 (Search).
- Risk: building `/category/[slug]` and the `/businesses?category=` filter as two separate implementations is the most likely source of drift/bugs in this sprint — treat "one filtering implementation" as a hard constraint, not a nice-to-have.

## Open Questions

- None blocking. If ambiguity arises, follow CLAUDE.md's "When Unsure" guidance: don't guess, explain assumptions, offer alternatives, recommend the simplest option.

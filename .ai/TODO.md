# TODO.md

# Current Sprint

Sprint Number

03 (complete) — awaiting go-ahead for Sprint 04

Sprint Name

Business Directory

Status

✅ Complete

Recommended Claude Model

Claude Sonnet

---

# Sprint 03 Summary

Delivered: `/businesses` (grid, category filters, sort, pagination, empty state, loading skeleton) and `/category/[slug]` (same filtering logic, reused not duplicated, real 404 for unknown slugs). Added `BusinessRepository.getPage({ categoryId, sort, page, pageSize })` as the single shared filter/sort/pagination implementation used by both routes. Added a `fitness-wellness` category (no businesses assigned) specifically to exercise the empty state realistically.

Two real, non-obvious issues found and fixed during implementation (both documented in `AI_MEMORY.md` under "Framework Gotchas" / "UI Component Conventions" for future sprints):

1. Next.js auto-prefetches links to not-yet-built routes — already handled via `prefetch={false}`, now removed from `/businesses` and `/category/[slug]` links since those routes are real.
2. **A route segment's `loading.tsx` breaks `notFound()`'s HTTP status code** — discovered on `/category/[slug]`. A sibling `loading.tsx` streams an initial 200 shell before the async `notFound()` check resolves, so the not-found *content* renders but the status stays 200 (a "soft 404"). Fixed by removing `loading.tsx` from `/category/[slug]` specifically (which can 404) while keeping it on `/businesses` (which never does — it shows an empty state instead). Verified via an isolated minimal repro, not just inference.

`npm run lint`, `typecheck`, `format:check`, `test` (26 unit tests), `test:e2e` (13 Playwright tests), and `build` all pass. Verified visually via headless-browser screenshots (desktop + mobile) and a keyboard tab-order check.

Full plan: `sprints/sprint-03-directory/`.

---

# Next Sprint (not started — do not begin without explicit instruction)

Sprint 04 — Business Details: `/business/[slug]` pages (contact info, opening hours, gallery, service areas, share button, per-business SEO metadata + structured data). Full plan: `sprints/sprint-04-business-details/`.

---

# After Completing This Sprint

Stop.

Do not continue to Sprint 04.

Wait for explicit instruction before implementing additional features.

Never implement future roadmap items without explicit instruction.

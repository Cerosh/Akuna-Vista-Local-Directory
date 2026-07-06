# TODO.md

# Current Sprint

Sprint Number

02 (complete) — awaiting go-ahead for Sprint 03

Sprint Name

Homepage

Status

✅ Complete

Recommended Claude Model

Claude Sonnet

---

# Sprint 02 Summary

Delivered: Hero (with search entry point), Popular Categories, Featured Businesses, Community Statistics, Why Choose Local — all sourced from JSON via the repository layer. Navigation and Footer now link to real routes/anchors (with `prefetch={false}` on links to routes not built yet, to avoid noisy prefetch 404s). Added a `MetadataRepository`, `CategoryRepository.getFeatured()`, sample business/category data, and a `communityMembers` field on `Metadata` (schema 1.1.0, documented in JSON_SCHEMA.md).

`npm run lint`, `typecheck`, `format:check`, `test` (12 unit tests), `test:e2e` (5 Playwright tests), and `build` all pass. Verified visually via headless browser screenshots (desktop + mobile).

Full plan: `sprints/sprint-02-homepage/`.

---

# Next Sprint (not started — do not begin without explicit instruction)

Sprint 03 — Business Directory: `/businesses` grid, category filters, `/category/[slug]` pages, sorting, pagination, empty states, loading skeletons. Full plan: `sprints/sprint-03-directory/`.

---

# After Completing This Sprint

Stop.

Do not continue to Sprint 03.

Wait for explicit instruction before implementing additional features.

Never implement future roadmap items without explicit instruction.

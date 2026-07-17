# Sprint 02 — Technical Tasks

Homepage

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Data

- [x] Add a small, realistic sample set to `data/categories.json` (per JSON_SCHEMA.md Category Schema), with `displayOrder` set and a few marked `featured: true`.
- [x] Add a small, realistic sample set to `data/businesses.json` (per JSON_SCHEMA.md Business Schema), with a few marked `featured: true`.
- [x] Add/confirm community figures in `data/settings.json` and `data/metadata.json` for the statistics section.
- [x] Extend `CategoryRepository` / `BusinessRepository` with query methods needed by the homepage (e.g. `getFeaturedBusinesses()`, `getPopularCategories()`) — implemented once in the repository, never inline in a component.

---

# Frontend — Hero

- [x] Build hero section: headline, supporting line, primary CTA, background treatment per DESIGN_SYSTEM.md.
- [x] Server Component by default; no client state needed for static hero content.
- [x] Respect max content width (1280px) and generous horizontal padding per DESIGN_SYSTEM.md.

---

# Frontend — Search Entry Point

- [x] Build a Search Input component (reuse Sprint 1's shared `Search Input` component if suitable).
- [x] On submit, route to the directory (or filter the visible featured businesses) — do not implement ranking/full search logic this sprint.
- [x] Keep this a thin, isolated feature so it's trivial to swap for real search in Sprint 5.

---

# Frontend — Popular Categories

- [x] Render categories from `CategoryRepository`, ordered by `displayOrder`.
- [x] Use the existing Category Card pattern (icon, name) per DESIGN_SYSTEM.md component library.
- [x] Handle the empty state gracefully (no categories marked featured).

---

# Frontend — Featured Businesses

- [x] Render businesses from `BusinessRepository` filtered by `featured: true`.
- [x] Use the Business Card design per DESIGN_SYSTEM.md ("Business Card Design"): name, category, short description, location, rating, recommendation count, featured badge, primary CTA.
- [x] Handle the empty state gracefully (no businesses marked featured yet).

---

# Frontend — Why Choose Local

- [x] Build a static content section explaining the value of community-sourced recommendations (2–4 supporting points, icons per Lucide).
- [x] No data dependency — this section is static copy, but copy should live in one place (e.g. a constants file), not scattered inline.

---

# Frontend — Community Statistics

- [x] Render statistics (e.g. members, businesses listed, recommendations) sourced from `settings.json` / `metadata.json`.
- [x] Use a Statistic Card component per DESIGN_SYSTEM.md component library.

---

# Navigation & Footer

- [x] Wire navigation links to real routes/anchors (Home, Directory, Categories, About, Contact) — replace Sprint 1 placeholders.
- [x] Wire footer links (About, Categories, Contact, Copyright, social) to real routes/anchors.
- [x] Confirm sticky header and mobile drawer still work correctly with real links.

---

# Responsive

- [x] Verify every section at mobile, tablet, desktop and large desktop breakpoints.
- [x] No horizontal scrolling at any breakpoint.
- [x] Grid/card layouts reflow correctly (12 columns desktop / 8 tablet / 4 mobile per DESIGN_SYSTEM.md Grid System).

---

# Accessibility

- [x] Single H1 on the page (hero headline); logical H2/H3 per section.
- [x] All interactive elements (search input, CTAs, nav, drawer) are keyboard accessible with visible focus states.
- [x] All images have descriptive alt text.
- [x] Colour is never the only way information is communicated (e.g. featured badges).

---

# SEO

- [x] Homepage-specific metadata (title, description) — deeper Open Graph/structured data work remains Sprint 8.

---

# Performance

- [x] Server Components for all static/data-driven sections; only the search input and mobile drawer toggle need client interactivity.
- [x] Images optimised via `next/image`.

---

# Testing

- [x] Unit test the new repository query methods (`getFeaturedBusinesses`, `getPopularCategories`).
- [x] Playwright: homepage loads, all sections render, search entry point is interactive, navigation (including mobile drawer) works, no console errors.

---

# Documentation

- [x] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).

---

# Out of Scope

Do not build in this sprint:

- Full search (ranking, fuzzy matching, autocomplete) — Sprint 5.
- Business directory grid/list, filters, sorting, pagination — Sprint 3.
- Business detail pages — Sprint 4.
- Community/about/contact page content — Sprint 5.
- Full business/category dataset population — Sprint 6.
- Advanced animation/micro-interactions — Sprint 7.
- SEO structured data, sitemap, robots.txt — Sprint 8.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, DESIGN_SYSTEM.md, JSON_SCHEMA.md, and the specific standards doc for the task).
2. Implement one homepage section only.
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits (see GIT_WORKFLOW.md).
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated sections in a single AI session or commit.

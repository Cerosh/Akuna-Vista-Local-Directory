# Sprint 01 — Goals

Project Foundation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Build a production-quality foundation that everything else depends on.

---

# Objective

Deliver a fully scaffolded, tooled and deployable Next.js application with no business functionality — a foundation strong enough that every subsequent sprint (Homepage through Production) can be built on top of it without rework.

---

# Why This Sprint Exists

The platform's long-term vision (PROJECT.md) depends on a codebase that:

- A new engineer, or Claude Code, can understand within an hour (ARCHITECTURE.md's "Definition of Good Architecture").
- Never hardcodes business data, so the JSON → Supabase migration (ADR-002, ADR-003) stays cheap.
- Enforces quality automatically (lint, types, tests, CI) rather than relying on discipline alone.

Sprint 1 exists to lock these guarantees in before any product feature is written, so that velocity in Sprints 2–10 isn't spent re-litigating structure, tooling or conventions.

---

# Goals

1. **Tooling** — Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, shadcn/ui, ESLint, Prettier, Husky + lint-staged all installed and working together without conflicting rules.
2. **Automation** — GitHub Actions runs install → typecheck → lint → tests → build on every Pull Request; Playwright is installed with one passing smoke test.
3. **Data foundation** — Repository Pattern (`BusinessRepository`, `CategoryRepository` → `JSONRepository`) and the `data/` JSON files exist per JSON_SCHEMA.md, even if empty.
4. **Experience shell** — Base layout, responsive navigation, footer and the DESIGN_SYSTEM.md theme (colours, typography, spacing, radius) are in place with no business content.
5. **Documentation** — The AI Engineering Kit (`.ai/`, `docs/`, `sprints/`) is committed alongside the code, not left as local-only planning artefacts.
6. **Deployment** — The application deploys successfully to Vercel, with preview deployments working for Pull Requests.

---

# Non-Goals (this sprint)

- No business data, business cards, directory, search or category pages (Sprint 2 onward).
- No authentication, database, CMS, reviews, or AI functionality (see PROJECT.md "Out of Scope" and ROADMAP.md Phase 10+).
- No visual polish beyond what DESIGN_SYSTEM.md defines as the base theme — animation and polish belong to Sprint 07 (Quality/Polish).

---

# Success Criteria

Sprint 1 is successful when:

- [x] The application builds, lints and type-checks with zero errors.
- [x] GitHub Actions CI passes on a real Pull Request.
- [x] Playwright's smoke test passes locally and in CI.
- [ ] The application is live on a Vercel preview and production URL. Not true at this sprint's own
      close — Vercel wasn't connected until 2026-07-09, 3 days after this sprint's commit `85e4890`
      (2026-07-06). Corrected 2026-07-17 — left unchecked as genuinely not this sprint's own
      deliverable, not re-flipped to match the site's current live state.
- [x] The repository pattern is respected — no UI component imports JSON directly.
- [x] `.ai/`, `docs/` and `sprints/` are committed to version control.
- [x] CONTEXT.md and TODO.md accurately reflect "Sprint 01 complete" once done.

---

# Measurable Targets

| Metric | Target |
|--------|--------|
| Build success | 100% |
| TypeScript errors | 0 |
| ESLint errors | 0 |
| CI pipeline duration | Reasonable for local iteration (no fixed target yet) |
| Playwright smoke tests passing | 1/1 |
| Lighthouse (base shell, no content) | Not blocking this sprint — tracked from Sprint 08/09 |

---

# Guiding Principle

This sprint should leave the project better structured, better documented and easier to build on — not just "runnable." Optimise for the next nine sprints, not for shipping this one fast.

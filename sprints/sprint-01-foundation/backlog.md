# Sprint 01 — Backlog

Project Foundation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 1's deliverables into ordered, independently shippable items. Work top to bottom — later items depend on earlier ones.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Initialise Git repository and `.gitignore` | — | High | Not Started |
| B-002 | Scaffold Next.js 15 App Router project with TypeScript | B-001 | High | Not Started |
| B-003 | Install and configure Tailwind CSS | B-002 | High | Not Started |
| B-004 | Install and configure shadcn/ui | B-003 | High | Not Started |
| B-005 | Configure ESLint (Next.js + TypeScript strict rules) | B-002 | High | Not Started |
| B-006 | Configure Prettier (with Tailwind class-sorting plugin), aligned with ESLint | B-005 | High | Not Started |
| B-007 | Configure Husky + lint-staged pre-commit hook (typecheck, lint, format) | B-006 | High | Not Started |
| B-008 | Configure GitHub Actions CI workflow (install → typecheck → lint → test → build) | B-007 | High | Not Started |
| B-009 | Create folder structure per ARCHITECTURE.md (`app/`, `components/`, `features/`, `lib/`, `hooks/`, `types/`, `data/`, `public/`, `styles/`) | B-002 | High | Not Started |
| B-010 | Define type definitions (`Business`, `Category`, `Suburb`, `Settings`, `Metadata`, `Community`, `Recommendation`, `Event`) | B-009 | High | Not Started |
| B-011 | Create JSON files per JSON_SCHEMA.md (`businesses.json`, `categories.json`, `suburbs.json`, `settings.json`, `metadata.json`) | B-010 | High | Not Started |
| B-012 | Implement Repository Pattern (`BusinessRepository`, `CategoryRepository` interfaces + `JSONRepository` implementation) | B-011 | High | Not Started |
| B-013 | Configure theme: colour tokens, typography (Geist), spacing (8pt scale), radius, shadows | B-004 | High | Not Started |
| B-014 | Build base/root layout, responsive container | B-013 | High | Not Started |
| B-015 | Build responsive navigation (desktop horizontal, mobile drawer) with placeholder links | B-014 | High | Not Started |
| B-016 | Build footer (About, Categories, Contact, Copyright, social placeholders) | B-014 | High | Not Started |
| B-017 | Build shared UI components (Button, Card, Badge, Container, Section, Page Header, Search Input, Logo) | B-013 | Medium | Not Started |
| B-018 | Install and configure Playwright (Page Object Model, fixtures, helpers per TESTING.md) | B-002 | High | Not Started |
| B-019 | Write homepage smoke test (loads, navigation renders, footer renders) | B-015, B-016, B-018 | High | Not Started |
| B-020 | Connect repository to Vercel; verify preview + production deployment | B-008 | High | Not Started |
| B-021 | Commit the AI Engineering Kit (`.ai/`, `docs/`, `sprints/`) to version control | B-001 | High | Not Started |
| B-022 | Update project `README.md` (overview, getting started, commands, folder structure, stack) | B-020 | Medium | Not Started |

---

# Prioritisation Notes

- B-001 through B-013 are blocking — nothing else in this sprint, or in Sprint 2, can start until they're done.
- B-017 (shared components) can proceed in parallel with B-018 (Playwright setup) once the theme exists.
- B-021 (committing the AI Engineering Kit) has no code dependency and can happen at any point — but should land before the sprint is marked done, since "AI Engineering Kit committed" is an explicit deliverable.
- B-022 should be last, once the stack and structure are final and worth documenting accurately.

---

# Out of Scope for This Backlog

Do not add stories for:

- Business cards, business pages, directory, search, filtering, sorting (Sprint 3+).
- Community pages, testimonials, statistics (Sprint 2/5).
- AI Assistant, authentication, database integration, CMS, Supabase, advertisements, events, reviews, bookings (Future phases per ROADMAP.md).

If a task from this list seems necessary to "finish" Sprint 1, that's a signal scope is creeping — flag it instead of implementing it.

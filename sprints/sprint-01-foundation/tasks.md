# Sprint 01 — Technical Tasks

Project Foundation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Repository & Tooling

- [x] Initialise Git repository, add `.gitignore` (`node_modules`, `.next`, `dist`, `coverage`, `.env.local`, `.env.*`, OS/IDE files).
- [x] Scaffold Next.js 15 with App Router and TypeScript (`create-next-app`).
- [x] Install Tailwind CSS and confirm it builds.
- [x] Install and initialise shadcn/ui; confirm base components generate correctly.
- [x] Install and configure Framer Motion, Lucide React, clsx, class-variance-authority, tailwind-merge, zod (per TODO.md — install only what's used).
- [x] Configure ESLint (Next.js + TypeScript strict rules), no disabled rules without justification.
- [x] Configure Prettier, including Tailwind class-sorting plugin, aligned with ESLint (no conflicting rules).
- [x] Configure Husky + lint-staged to run typecheck, lint and format on pre-commit.
- [x] Add `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test`, `npm run test:e2e` scripts.

---

## GitHub Actions (CI)

- [x] Create workflow that runs on every Pull Request: install dependencies → typecheck → lint → unit tests → Playwright smoke tests → build.
- [x] Fail the workflow (and block merge) if any stage fails, per DEPLOYMENT.md "Continuous Integration".
- [x] Confirm the workflow runs successfully against a real Pull Request before closing the sprint.

---

## Playwright

- [x] Install Playwright and scaffold `tests/` using Page Object Model (`fixtures/`, `pages/`, `components/`, `helpers/`, `data/` per TESTING.md).
- [x] Prefer role/label/placeholder/text/test-id locators; avoid XPath and brittle CSS selectors.
- [x] Write one smoke test: homepage loads, navigation renders, footer renders, no console errors.
- [x] Confirm the smoke test passes locally and in CI.

---

# Folder Structure

Create per ARCHITECTURE.md (do not populate beyond what this sprint requires):

```
app/
components/
  ui/
  common/
  layout/
features/
lib/
  repositories/
  services/
  utils/
hooks/
types/
data/
public/
  images/
styles/
```

---

# Repository Layer

- [x] Define type definitions in `types/`: `Business`, `Category`, `Suburb`, `Settings`, `Metadata`, `Community`, `Recommendation`, `Event` (fields may stay minimal, matching JSON_SCHEMA.md).
- [x] Create JSON files in `data/`: `businesses.json`, `categories.json`, `suburbs.json`, `settings.json`, `metadata.json` — valid, schema-conformant, empty where appropriate.
- [x] Define repository interfaces (`BusinessRepository`, `CategoryRepository`) in `lib/repositories/`.
- [x] Implement `JSONRepository` behind those interfaces — this is the only code allowed to read the JSON files.
- [x] Add unit tests confirming the repository loads and returns typed data from JSON.
- [x] Confirm no component or page imports JSON directly (architecture rule, see ARCHITECTURE.md and REVIEW_CHECKLIST.md §2).

---

# Components

- [x] Root layout (`app/layout.tsx`): responsive container, navigation, footer.
- [x] Responsive navigation: desktop horizontal nav, mobile drawer, sticky header, placeholder links (Home, Directory, Categories, About, Contact), search icon.
- [x] Footer: About, Categories, Contact, Copyright, social placeholders.
- [x] Shared components with no business logic: Button, Card, Badge, Container, Section, Page Header, Search Input, Logo, Icon Wrapper.
- [x] Homepage renders navigation + content placeholder + footer only — no business content.

---

# Styling / Theme

- [x] Define design tokens per DESIGN_SYSTEM.md: colour system (Deep Blue primary, Warm Teal secondary, neutrals dominant at ~80%), typography (Geist, fallback Inter), 8-point spacing scale, border radius scale, subtle shadows, animation timing (150/250/350ms).
- [x] Wire tokens into Tailwind config — never hardcode colours or spacing in components.
- [x] Support light mode only; structure tokens so dark mode (Version 2) can be added without rework.
- [x] Set max content width (1280px), standard width (1024px), reading width (720px).

---

# Accessibility

- [x] Semantic HTML throughout the base layout.
- [x] Keyboard navigation works for nav, drawer and all interactive shared components.
- [x] Visible focus states on all interactive elements.
- [x] Correct heading hierarchy on the homepage shell.
- [x] Skip-navigation link present.

---

# SEO

- [x] Base metadata (title, description) configured at the root layout level.
- [x] No SEO implementation beyond the base — Open Graph, sitemap, structured data belong to Sprint 08 (SEO).

---

# Performance

- [x] Server Components by default; justify any Client Component.
- [x] No unnecessary `useState` or `useEffect`.
- [x] No client-side data fetching for static shell content.

---

# Deployment

- [ ] Connect the GitHub repository to Vercel. Not done at this sprint's own close — Vercel wasn't
      connected until 2026-07-09, 3 days after this sprint's commit `85e4890` (2026-07-06).
- [ ] Confirm a Pull Request produces a working preview deployment. Same timing — not this sprint's
      own deliverable; this project also has no PR-based workflow (pushes directly to `main`).
- [ ] Confirm `main` deploys successfully to production. Same timing note as above.
- [x] Configure required environment variables per DEPLOYMENT.md (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_COMMUNITY_NAME`, `NEXT_PUBLIC_DEFAULT_THEME`), add `.env.example`.

---

# Documentation

- [x] Commit `.ai/` (CLAUDE.md, PROJECT.md, ARCHITECTURE.md, CODING_STANDARDS.md, DESIGN_SYSTEM.md, JSON_SCHEMA.md, TESTING.md, GIT_WORKFLOW.md, DEPLOYMENT.md, ROADMAP.md, CONTEXT.md, DECISIONS.md, SECURITY.md, TODO.md, AI_MEMORY.md, REVIEW_CHECKLIST.md, UI_GUIDELINES.md, PROMPT_PLAYBOOK.md, RELEASE.md, PRODUCT.md) — this is the "AI Engineering Kit."
- [x] Commit `docs/` templates (sprint-template.md, adr-template.md, bug-template.md, feature-template.md, pr-template.md, retrospective.md, meeting-notes.md).
- [x] Commit `sprints/` folders for all planned sprints.
- [x] Update the project root `README.md`: overview, getting started, development commands, folder structure, technology stack.

---

# Out of Scope

Do not build in this sprint:

- Business cards, business pages, business detail pages.
- Search functionality, directory, filtering, sorting.
- Community pages, testimonials, statistics.
- AI Assistant / Ask Akuna.
- Authentication, database integration, CMS, Supabase.
- Advertisements, events, reviews, bookings.
- Anything from ROADMAP.md phases beyond Phase 1.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, ARCHITECTURE.md, and the specific standards doc for the task).
2. Implement one task only.
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits (see GIT_WORKFLOW.md).
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated tasks in a single AI session or commit.

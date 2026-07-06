# Sprint 01 — Technical Tasks

Project Foundation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Repository & Tooling

- [ ] Initialise Git repository, add `.gitignore` (`node_modules`, `.next`, `dist`, `coverage`, `.env.local`, `.env.*`, OS/IDE files).
- [ ] Scaffold Next.js 15 with App Router and TypeScript (`create-next-app`).
- [ ] Install Tailwind CSS and confirm it builds.
- [ ] Install and initialise shadcn/ui; confirm base components generate correctly.
- [ ] Install and configure Framer Motion, Lucide React, clsx, class-variance-authority, tailwind-merge, zod (per TODO.md — install only what's used).
- [ ] Configure ESLint (Next.js + TypeScript strict rules), no disabled rules without justification.
- [ ] Configure Prettier, including Tailwind class-sorting plugin, aligned with ESLint (no conflicting rules).
- [ ] Configure Husky + lint-staged to run typecheck, lint and format on pre-commit.
- [ ] Add `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test`, `npm run test:e2e` scripts.

---

## GitHub Actions (CI)

- [ ] Create workflow that runs on every Pull Request: install dependencies → typecheck → lint → unit tests → Playwright smoke tests → build.
- [ ] Fail the workflow (and block merge) if any stage fails, per DEPLOYMENT.md "Continuous Integration".
- [ ] Confirm the workflow runs successfully against a real Pull Request before closing the sprint.

---

## Playwright

- [ ] Install Playwright and scaffold `tests/` using Page Object Model (`fixtures/`, `pages/`, `components/`, `helpers/`, `data/` per TESTING.md).
- [ ] Prefer role/label/placeholder/text/test-id locators; avoid XPath and brittle CSS selectors.
- [ ] Write one smoke test: homepage loads, navigation renders, footer renders, no console errors.
- [ ] Confirm the smoke test passes locally and in CI.

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

- [ ] Define type definitions in `types/`: `Business`, `Category`, `Suburb`, `Settings`, `Metadata`, `Community`, `Recommendation`, `Event` (fields may stay minimal, matching JSON_SCHEMA.md).
- [ ] Create JSON files in `data/`: `businesses.json`, `categories.json`, `suburbs.json`, `settings.json`, `metadata.json` — valid, schema-conformant, empty where appropriate.
- [ ] Define repository interfaces (`BusinessRepository`, `CategoryRepository`) in `lib/repositories/`.
- [ ] Implement `JSONRepository` behind those interfaces — this is the only code allowed to read the JSON files.
- [ ] Add unit tests confirming the repository loads and returns typed data from JSON.
- [ ] Confirm no component or page imports JSON directly (architecture rule, see ARCHITECTURE.md and REVIEW_CHECKLIST.md §2).

---

# Components

- [ ] Root layout (`app/layout.tsx`): responsive container, navigation, footer.
- [ ] Responsive navigation: desktop horizontal nav, mobile drawer, sticky header, placeholder links (Home, Directory, Categories, About, Contact), search icon.
- [ ] Footer: About, Categories, Contact, Copyright, social placeholders.
- [ ] Shared components with no business logic: Button, Card, Badge, Container, Section, Page Header, Search Input, Logo, Icon Wrapper.
- [ ] Homepage renders navigation + content placeholder + footer only — no business content.

---

# Styling / Theme

- [ ] Define design tokens per DESIGN_SYSTEM.md: colour system (Deep Blue primary, Warm Teal secondary, neutrals dominant at ~80%), typography (Geist, fallback Inter), 8-point spacing scale, border radius scale, subtle shadows, animation timing (150/250/350ms).
- [ ] Wire tokens into Tailwind config — never hardcode colours or spacing in components.
- [ ] Support light mode only; structure tokens so dark mode (Version 2) can be added without rework.
- [ ] Set max content width (1280px), standard width (1024px), reading width (720px).

---

# Accessibility

- [ ] Semantic HTML throughout the base layout.
- [ ] Keyboard navigation works for nav, drawer and all interactive shared components.
- [ ] Visible focus states on all interactive elements.
- [ ] Correct heading hierarchy on the homepage shell.
- [ ] Skip-navigation link present.

---

# SEO

- [ ] Base metadata (title, description) configured at the root layout level.
- [ ] No SEO implementation beyond the base — Open Graph, sitemap, structured data belong to Sprint 08 (SEO).

---

# Performance

- [ ] Server Components by default; justify any Client Component.
- [ ] No unnecessary `useState` or `useEffect`.
- [ ] No client-side data fetching for static shell content.

---

# Deployment

- [ ] Connect the GitHub repository to Vercel.
- [ ] Confirm a Pull Request produces a working preview deployment.
- [ ] Confirm `main` deploys successfully to production.
- [ ] Configure required environment variables per DEPLOYMENT.md (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_COMMUNITY_NAME`, `NEXT_PUBLIC_DEFAULT_THEME`), add `.env.example`.

---

# Documentation

- [ ] Commit `.ai/` (CLAUDE.md, PROJECT.md, ARCHITECTURE.md, CODING_STANDARDS.md, DESIGN_SYSTEM.md, JSON_SCHEMA.md, TESTING.md, GIT_WORKFLOW.md, DEPLOYMENT.md, ROADMAP.md, CONTEXT.md, DECISIONS.md, SECURITY.md, TODO.md, AI_MEMORY.md, REVIEW_CHECKLIST.md, UI_GUIDELINES.md, PROMPT_PLAYBOOK.md, RELEASE.md, PRODUCT.md) — this is the "AI Engineering Kit."
- [ ] Commit `docs/` templates (sprint-template.md, adr-template.md, bug-template.md, feature-template.md, pr-template.md, retrospective.md, meeting-notes.md).
- [ ] Commit `sprints/` folders for all planned sprints.
- [ ] Update the project root `README.md`: overview, getting started, development commands, folder structure, technology stack.

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

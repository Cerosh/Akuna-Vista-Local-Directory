# Akuna Vista Local Directory

A trusted, searchable directory of local businesses for the Akuna Vista community — built as the first implementation of a reusable Neighbourhood Directory Platform.

This repository currently reflects **Sprint 1 — Project Foundation**: engineering scaffold, tooling and architecture only. No business features exist yet.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Development Commands

| Command                                    | Purpose                                |
| ------------------------------------------ | -------------------------------------- |
| `npm run dev`                              | Start the local dev server (Turbopack) |
| `npm run build`                            | Production build                       |
| `npm run start`                            | Run the production build locally       |
| `npm run lint` / `npm run lint:fix`        | ESLint                                 |
| `npm run typecheck`                        | TypeScript, no emit                    |
| `npm run format` / `npm run format:check`  | Prettier                               |
| `npm run test` / `npm run test:watch`      | Unit tests (Vitest)                    |
| `npm run test:e2e` / `npm run test:e2e:ui` | End-to-end tests (Playwright)          |

A pre-commit hook (Husky + lint-staged) runs ESLint, Prettier and a type check automatically.

## Technology Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript (strict)
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Data:** Static JSON via a Repository Pattern (`lib/repositories/`) — see `.ai/DECISIONS.md` (ADR-002, ADR-003)
- **Testing:** Vitest (unit), Playwright (end-to-end)
- **CI:** GitHub Actions (typecheck → lint → format → unit tests → e2e → build)
- **Hosting:** Vercel

## Folder Structure

```
app/                  Routing only — no business logic
components/
  ui/                 shadcn/ui primitives
  common/             Shared, reusable, presentational components
  layout/             Navigation, Footer
features/             Business logic, composed by feature (populated from Sprint 2+)
lib/
  repositories/       Data access — the only code that reads data/*.json
  services/           Reusable business services (populated from later sprints)
  utils/              Pure helper functions
hooks/                Shared React hooks
types/                Shared TypeScript types
data/                 Static JSON data (businesses, categories, suburbs, settings, metadata)
public/               Static assets
tests/                Playwright end-to-end tests (Page Object Model)
```

See `.ai/ARCHITECTURE.md` for the full architecture and `.ai/CODING_STANDARDS.md` for conventions.

## Project Documentation

All engineering and product documentation lives in `.ai/` (read `.ai/CLAUDE.md` first), reusable templates live in `docs/`, and the sprint-by-sprint delivery plan lives in `sprints/`.

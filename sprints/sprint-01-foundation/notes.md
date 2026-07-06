# Sprint 01 — Notes

Project Foundation

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Design Notes

- No mockups exist yet for Sprint 1 — there is no business UI to design. The only visual surface is the base shell (navigation, footer, homepage placeholder) and the theme tokens.
- Follow DESIGN_SYSTEM.md exactly for the initial token set: Deep Blue primary, Warm Teal secondary, neutral-dominant palette (~80% neutral / 15% primary / 5% accent), Geist typography, 8-point spacing scale.
- Dark mode is explicitly deferred (DESIGN_SYSTEM.md "Dark Mode" — not required for MVP) but tokens must be defined semantically (not hardcoded hex values in components) so theming can be added later without touching component code.
- Navigation and footer should use placeholder links only (Home, Directory, Categories, About, Contact) — no real routes need to resolve to real content yet.

---

# Technical Notes

## Libraries

| Library | Purpose |
|---------|---------|
| Next.js 15 (App Router) | Framework, routing, Server Components |
| React 19 | UI runtime |
| TypeScript (strict) | Type safety |
| Tailwind CSS | Utility-first styling |
| shadcn/ui | Base component primitives |
| Framer Motion | Animation (used sparingly, from Sprint 2 onward) |
| Lucide React | Icons |
| clsx / tailwind-merge / class-variance-authority | Conditional class composition |
| zod | Runtime validation (repository layer input validation) |
| ESLint + Prettier | Linting and formatting |
| Husky + lint-staged | Pre-commit enforcement |
| Playwright | End-to-end testing |

Install only what is used this sprint — avoid speculative dependencies (CODING_STANDARDS.md "Avoid unnecessary abstractions").

---

## Patterns

- **Repository Pattern** (ADR-003): all data access goes through `BusinessRepository` / `CategoryRepository` interfaces backed by a `JSONRepository` implementation. UI components must never import JSON directly. This is the single most important architectural rule to get right in this sprint, since every later sprint's data access depends on it.
- **Server Components by default** (ADR-005): the base layout, navigation and footer should be Server Components unless a specific interaction (e.g. mobile drawer toggle) requires client-side state.
- **Composition over inheritance**: shared components (Button, Card, Badge, Container, Section) should be small, typed and composable — no business-specific variants yet.

---

## Risks / Assumptions

- Assumes Vercel is the target host for this sprint (per ARCHITECTURE.md and DEPLOYMENT.md); Cloudflare CDN/Images/R2 are future infrastructure, not needed now.
- Assumes no environment secrets are required yet — `.env.example` should stay minimal (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_COMMUNITY_NAME`, `NEXT_PUBLIC_DEFAULT_THEME`).
- Assumes GitHub Actions (not another CI provider) per DEPLOYMENT.md's release workflow diagram.
- Risk: it's tempting to "just add" a business card or sample content while building shared components to see them "in action." Resist this — TODO.md and PROJECT.md are explicit that no business data belongs in Sprint 1. Use empty/placeholder states instead.

---

## Open Questions

- None blocking. If ambiguity arises during implementation, follow CLAUDE.md's "When Unsure" guidance: don't guess, explain assumptions, offer alternatives, recommend the simplest option.

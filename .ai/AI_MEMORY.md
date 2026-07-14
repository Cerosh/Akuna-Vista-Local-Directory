# AI_MEMORY.md

# AI Working Memory

Neighbourhood Directory Platform

Version: 1.0

Owner: Cerosh Jacob

Status: Active

Last Updated: 2026-07-07

---

# Purpose

This document stores long-lived project knowledge that should remain true across development sessions.

Unlike TODO.md or CONTEXT.md, this document changes infrequently.

It captures decisions, conventions and assumptions that help AI assistants work consistently over time.

---

# Project Identity

Project Name

Akuna Vista Local Directory

Internal Platform Name

Neighbourhood Directory Platform

Primary Community

Akuna Vista

Owner

Cerosh Jacob

Status

Active Development

---

# Product Mission

Create the most trusted local directory for neighbourhood communities.

The platform should preserve community knowledge that would otherwise disappear in chat history.

The initial implementation targets Akuna Vista.

The architecture should support thousands of future communities.

---

# Engineering Philosophy

Always optimise for:

- Simplicity
- Readability
- Maintainability
- Scalability
- Accessibility
- Performance

Avoid unnecessary complexity.

Every abstraction must justify its existence.

---

# Product Philosophy

Community value comes before monetisation.

Trust is more important than growth.

The MVP should validate the idea with minimal operational cost.

Future features should not compromise the simplicity of the platform.

---

# Technical Stack

Framework

Next.js (App Router)

Language

TypeScript

Styling

Tailwind CSS

UI Components

shadcn/ui

Icons

Lucide

Data Source

Static JSON

Deployment

Vercel

Future Database

Supabase

Testing

Playwright

Package Manager

npm

---

# UI Component Conventions

Confirmed during Sprint 1–2 implementation — these are not obvious from the generic stack list above:

- **Tailwind v4 is CSS-first.** There is no `tailwind.config.js`/`.ts`. Design tokens (colours, radius, fonts, durations) live in `app/globals.css` inside `@theme` / `:root` / `.dark` blocks. Extend the theme there, not by creating a JS config file.
- **This shadcn preset uses Base UI, not Radix.** Composition uses a `render` prop (e.g. `render={<Link href="/x" />}`), not Radix's `asChild`.
- **Base UI's `Button` always sets `role="button"` on whatever it renders**, even when composed via `render` with a `Link`/`<a>`, regardless of the `nativeButton` prop (`nativeButton` only affects internal keyboard-handling assumptions, not the ARIA role). For elements that genuinely navigate to another page, this produces incorrect accessibility semantics (screen readers announce "button" for something that's actually a link).
  - **Fix:** for a link that should look like a button, apply the exported `buttonVariants({ variant, size })` className directly to a plain `<Link>`, instead of wrapping it in `<Button render={...}>`. Reserve the `Button` component itself for genuine in-page actions (toggles, form submits, dialogs) where `role="button"` is correct.

---

# Framework Gotchas

- **A route segment's `loading.tsx` breaks `notFound()`'s HTTP status code.** Confirmed during Sprint 3 (`/category/[slug]`). If a route segment has a sibling `loading.tsx`, Next.js streams an initial 200 response shell immediately; when the page later calls `notFound()`, the not-found *content* renders correctly but the response status stays 200 (a "soft 404") because the status header was already sent before the async work resolved. This reproduces with a minimal async dynamic route too — it is a structural Next.js/React-streaming behaviour, not a project bug.
  - **Rule:** never add a `loading.tsx` to a route segment whose `page.tsx` can call `notFound()`, unless a "soft 404" (right content, wrong status) is acceptable for that route. Routes that can never 404 (e.g. `/businesses`, which shows an empty state rather than 404ing) can safely keep `loading.tsx`.
  - Verified by testing in isolation: a plain dynamic route with `notFound()` and no `loading.tsx` returns 404 correctly; adding a sibling `loading.tsx` alone flips it to 200 for the exact same code path.
  - **A root-level `app/loading.tsx` cascades to every route below it that doesn't have its own more specific `loading.tsx`.** Confirmed during Sprint 7: adding `app/loading.tsx` for the homepage silently reintroduced this exact soft-404 bug on `/business/[slug]` and `/category/[slug]` — neither folder was touched, but neither has its own `loading.tsx` to "shadow" the root one, so both inherited it as their Suspense boundary. **Fix:** give the homepage its own route group (`app/(home)/page.tsx` + `app/(home)/loading.tsx`) instead of a root-level `app/loading.tsx` — route groups don't affect the URL (`/` still resolves) but do scope the loading boundary to just that group, leaving sibling segments (`business/`, `category/`) unaffected.
- **Next.js 15.2+ streams `generateMetadata()` output to real browsers; it only renders metadata synchronously into `<head>` for user agents matched by the `htmlLimitedBots` config (Googlebot, Bingbot, Slackbot, etc. by default).** Confirmed during Sprint 7: `/business/[slug]`'s title/description/Open Graph tags were present in the raw response but embedded in a deferred `$RC(...)` streaming-SSR script, never actually inserted into the live `<head>` for a normal Chrome user agent — reproducible via Playwright (`page.$$eval("head meta", ...)` after `networkidle` showed the tags missing) and via raw response inspection (`response.text()` showed no meta tags inside the literal `<head>...</head>` markup, only later in a script payload). This is a known, Vercel-acknowledged behaviour ([discussion #81452](https://github.com/vercel/next.js/discussions/81452), [issue #79313](https://github.com/vercel/next.js/issues/79313)), not a bug in this project's code — Lighthouse's own SEO audit UA isn't on the default bot list, so it measures the degraded, streamed path too.
  - **Fix:** set `htmlLimitedBots: /.*/ ` in `next.config.ts` to force synchronous metadata for every request. Only worth the (real but small) TTFB trade-off if metadata resolves fast anyway, as it does here (static local JSON) — for a page with genuinely slow `generateMetadata` work, the default streaming behaviour is a legitimate trade-off, not a bug to always disable.
  - Two false leads before finding the real cause, in case a future session hits the same symptom: it is **not** caused by `notFound()` inside `generateMetadata`, and **not** caused by the shape/complexity of the `openGraph` object (both tested directly, no effect) — the actual gate is purely the requesting user agent.
  - **Also confirms the harness's background-server pitfall:** a stale `next start` process left running from earlier in a session will silently absorb `EADDRINUSE` on subsequent `npm run start` attempts if its stdout is redirected to a log file that isn't checked — always verify a server actually restarted (e.g. `curl -o /dev/null -w "%{http_code}"`) before trusting any measurement taken after a code change.
- **Node.js (not Next.js) — the common `import.meta.url === \`file://${process.argv[1]}\`` "was this script run directly, not imported" check silently fails whenever the project path contains characters `file://` URLs must percent-encode — spaces included.** Confirmed during Sprint 8: this project's own path ("Akuna Vista Local Directory") has spaces, so every `scripts/*.ts` CLI using that pattern ran its exports (fine, e.g. under Vitest) but never called its own `main()` when executed directly via `tsx`/`npm run` — `npm run backup:data` produced no output and wrote nothing, silently. **Fix:** use `pathToFileURL(process.argv[1]).href === import.meta.url` (`node:url`), which percent-encodes before comparing. `scripts/lib/isMainModule.ts` is the shared helper — every script under `scripts/` uses it instead of the raw comparison.
- **Piping a long-running command through `tail -N` hides all output — including progress — until the source process exits.** Confirmed during Sprint 9: a full Playwright run (`npx playwright test --reporter=list | tail -25`) appeared to hang for well over an hour with zero visible output, indistinguishable from a genuine deadlock, even though the run was actually progressing normally underneath. `tail` can't know what the "last N lines" are until its input stream closes, so it buffers everything. **Fix:** never pipe a long-running command through `tail` when you need to observe it while it runs — redirect straight to a file (`command > file.log 2>&1`, run in background, then `Read`/`tail -f` that file directly) so real progress is visible immediately and a genuine hang is distinguishable from output buffering. If a command looks stuck, verify directly (`ps aux` for real CPU/process activity, a direct connectivity check against anything it's supposed to be serving) within a couple of minutes rather than continuing to wait.

---

# Architecture Principles

Use Server Components by default.

Client Components require justification.

Business logic belongs in Features.

UI components remain primarily presentational.

Data access occurs only through repositories.

Pages should orchestrate, not contain business logic.

---

# Repository Pattern

Never access JSON directly from the UI.

Required flow:

UI

↓

Feature

↓

Repository

↓

JSON

This abstraction allows painless migration to Supabase.

---

# Current Scope

Included

- Homepage
- Business directory
- Categories
- Business details
- Search
- Community content (events, promotions, announcements, featured content, spotlight, local news placeholder)
- SEO
- Responsive design
- Accessibility

Excluded

- Authentication
- Reviews
- Payments
- Messaging
- Admin portal
- AI search

---

# Coding Preferences

Prefer:

Small components.

Pure functions.

Strong typing.

Explicit names.

Composition over inheritance.

Avoid:

`any`

Large components.

Hidden side effects.

Premature optimisation.

---

# User Experience Priorities

The platform should feel:

Fast.

Simple.

Trustworthy.

Welcoming.

Local.

Community-focused.

Every screen should help users find trusted businesses with minimal effort.

---

# Accessibility Goals

Target

WCAG AA

Support:

- Keyboard navigation
- Screen readers
- Semantic HTML
- Visible focus
- Colour contrast

Accessibility is a core requirement.

---

# Performance Goals

Optimise for:

Fast page loads.

Minimal JavaScript.

Static rendering where appropriate.

Image optimisation.

High Lighthouse scores.

---

# Design Direction

Visual style

Modern.

Clean.

Minimal.

Professional.

Friendly.

Avoid unnecessary visual decoration.

---

# AI Behaviour Expectations

Claude Code should:

Understand requirements before coding.

Explain trade-offs.

Reuse existing components.

Respect architecture.

Avoid unnecessary abstractions.

Generate production-quality code.

Recommend improvements without changing scope.

---

# Documentation Hierarchy

If guidance conflicts, follow this order:

1. CLAUDE.md
2. PROJECT.md
3. ARCHITECTURE.md
4. DECISIONS.md
5. CODING_STANDARDS.md
6. SECURITY.md
7. TESTING.md
8. UI_GUIDELINES.md
9. REVIEW_CHECKLIST.md
10. TODO.md
11. CONTEXT.md

PRODUCT.md is superseded and archived — see PRODUCT.md's own notice. PROJECT.md is the authoritative source for product vision, scope and roadmap.

The most specific document should take precedence when applicable.

---

# Long-Term Decisions

The following decisions should not change without updating DECISIONS.md:

- Repository pattern
- JSON-first MVP
- Server Components by default
- Tailwind CSS
- shadcn/ui
- Supabase as the future backend
- Multi-community architecture

---

# Naming Conventions

Communities

Pascal Case

Example

Akuna Vista

Business categories

Lowercase slug

Example

plumbing

React Components

PascalCase

Repositories

camelCase

Utility functions

camelCase

---

# Testing Expectations

Critical functionality should eventually have Playwright coverage.

Prefer testing behaviour over implementation details.

Confidence is more valuable than coverage percentage.

---

# Security Expectations

Never expose:

- Secrets
- API keys
- Tokens
- Credentials

Validate all external input.

Follow SECURITY.md for implementation details.

---

# Deployment Expectations

Every release should:

Pass CI.

Build successfully.

Follow semantic versioning.

Remain deployable.

Follow DEPLOYMENT.md and RELEASE.md.

---

# Product Evolution

Phase 1

Static directory.

Phase 2

Authentication.

Business claiming.

Supabase.

Phase 3

AI search.

Recommendations.

Phase 4

Advertising.

Premium listings.

Phase 5

Multi-community platform.

Marketplace.

---

# AI Session Behaviour

At the beginning of each development session:

Read:

- CLAUDE.md
- PROJECT.md
- CONTEXT.md
- TODO.md

If architectural work is involved, also read:

- ARCHITECTURE.md
- DECISIONS.md

If UI work is involved, also read:

- DESIGN_SYSTEM.md
- UI_GUIDELINES.md

If testing work is involved, also read:

- TESTING.md

If deployment work is involved, also read:

- DEPLOYMENT.md
- RELEASE.md

Only load the documentation relevant to the current task to minimise context usage.

---

# Knowledge That Should Persist

Remember that:

The project is intentionally simple.

The MVP validates the idea before scaling.

JSON is temporary.

Repositories are permanent.

Architecture matters more than framework preferences.

Maintainability outweighs cleverness.

Community trust is the product's greatest asset.

---

# Success Criteria

Claude Code should consistently produce work that:

Matches the project's architecture.

Follows the coding standards.

Uses existing patterns.

Minimises technical debt.

Supports future scalability.

Requires minimal rework.

Helps the owner focus on solving product problems rather than correcting generated code.

---

# Guiding Principle

Act as a senior software engineer who has been part of this project since day one.

Preserve architectural consistency.

Respect documented decisions.

Prefer clarity over novelty.

Every contribution should leave the project easier to understand, easier to maintain and easier to extend.
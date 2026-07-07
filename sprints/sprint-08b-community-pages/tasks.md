# Sprint 08b — Technical Tasks

Community Pages

Owner: Cerosh Jacob

Last Updated: 2026-07-07

---

# About Page

- [ ] `app/about/page.tsx` — static `metadata` export (title, description, `alternates.canonical: "/about"`), `PageHeader` + `Container`/`Section`, plain-language explanation of the platform's purpose per PROJECT.md's mission.
- [ ] No new components — reuse existing ones only.

---

# Contact Page

- [ ] `app/contact/page.tsx` — static metadata, `PageHeader`, a single `mailto:` link to `Settings.contactEmail` (via `SettingsRepository.get()`) styled with `buttonVariants()` on a plain `<a>`.
- [ ] Confirm no contact form is implied or half-built — this is a link, not a submission flow (see notes.md).

---

# Privacy Policy Page

- [ ] `app/privacy/page.tsx` — static metadata, `PageHeader`, plain-language content: no accounts/authentication (ADR-006), no data collected by the platform itself today, what Sprint 9's analytics will add once live, a note that this is a v1 policy that will evolve.
- [ ] Explicit "last updated" date visible on the page.

---

# Terms of Service Page

- [ ] `app/terms/page.tsx` — static metadata, `PageHeader`, plain-language content: informational directory, no warranty on listing accuracy/availability, how to request a correction (links to Contact page), no accounts yet.
- [ ] Explicit "last updated" date visible on the page.

---

# Footer Updates

- [ ] `components/layout/Footer.tsx`: remove `prefetch: false` from the existing `/about` and `/contact` entries in `COMMUNITY_LINKS` (routes are now real).
- [ ] Add `/privacy` and `/terms` to the Footer (new links, either in `COMMUNITY_LINKS` or a new small "Legal" column/group — decide based on how it looks once the other three columns are in place, per DESIGN_SYSTEM.md's spacing guidance).

---

# Testing

- [ ] Add `/about`, `/contact`, `/privacy`, `/terms` to `tests/e2e/accessibility.spec.ts`'s `ROUTES` array.
- [ ] Add the same four routes to `tests/e2e/responsive.spec.ts`'s `ROUTES` array.
- [ ] New or extended Playwright spec: Footer links to all four resolve, each renders a real `<h1>`, no console errors; Contact page's `mailto:` link has the correct `href` (`mailto:community@akunavista.example` or whatever `Settings.contactEmail` currently is).
- [ ] Run `npm run lint`, `npm run typecheck`, `npm test`, full Playwright suite, `npm run build` after all four pages exist.

---

# Documentation

- [ ] Update `sprints/sprint-09-production/README.md`'s Risks table and `notes.md`'s
      Risks/Assumptions and Open Questions to record this gap as resolved by this sprint, not
      open.
- [ ] Consider a light `ROADMAP.md` note on Phase 5 noting About/Contact/Privacy/Terms delivered
      here (404 already noted as Sprint 7's in earlier documentation).
- [ ] Update `.ai/TODO.md` / `.ai/CONTEXT.md` at sprint close, per this sprint's own retrospective.md AI Memory Update.

---

# Out of Scope

Do not build in this sprint:

- A contact form or any email-sending backend — `mailto:` only (ADR-002).
- A dedicated `/community` page — Sprint 6 already covers this on the homepage (see notes.md Open Questions).
- Any of Sprint 9's actual scope (monitoring, analytics, security headers, sitemap/robots.txt, browser compatibility pass, full regression) — this sprint only resolves the one flagged precondition.
- New authentication, accounts, or data collection of any kind.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, DESIGN_SYSTEM.md/UI_GUIDELINES.md, `.ai/SECURITY.md`'s Privacy section for Privacy/Terms content).
2. Implement one page only.
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits (see GIT_WORKFLOW.md).
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated pages in a single AI session or commit.

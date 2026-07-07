# Sprint 08b — Notes

Community Pages

Owner: Cerosh Jacob

Last Updated: 2026-07-07

---

# Design Notes

- All four pages reuse `components/common/PageHeader.tsx`, `Container` and `Section` — the exact
  pattern `/businesses` and `/search` already use for a title + description + content layout. No
  new page template is designed in this sprint (both this sprint's and Sprint 9's notes.md were
  explicit that any pages built to close this gap should follow existing conventions, not
  introduce new ones).
- Content is plain prose in a `narrow` `Container` (per DESIGN_SYSTEM.md's reading-width
  guidance, same as any other long-form text on this site) — no cards, no grids, no imagery
  beyond what `PageHeader` already provides.
- Contact page: a single `mailto:` link styled with `buttonVariants()` on a plain `<a>`/`Link`
  (per `AI_MEMORY.md`'s documented Base UI `Button` gotcha — a genuinely navigational/action
  element should keep native link semantics, not `role="button"`).

---

# Technical Notes

## Libraries

No new libraries. `SettingsRepository` (Sprint 1) already exposes `contactEmail`.

## Patterns

- **Static metadata per page** — `export const metadata: Metadata = { title, description,
  alternates: { canonical: "/about" } }`, matching `/businesses`'s and `/search`'s existing
  pattern from Sprint 7's SEO audit, not `generateMetadata` (nothing dynamic to look up).
- **No `loading.tsx` needed** — these routes have no async data fetch worth a skeleton (reading
  `Settings` is effectively instant, same reasoning `/search` used in Sprint 7 to justify no
  loading state), and none of them call `notFound()`, so there's no risk of `AI_MEMORY.md`'s
  documented `loading.tsx`/`notFound()` soft-404 gotcha either way.
- **Extend, don't duplicate, Sprint 7's test infrastructure** — add these four routes to the
  existing `ROUTES` arrays in `tests/e2e/accessibility.spec.ts` and `tests/e2e/responsive.spec.ts`
  rather than writing a parallel a11y/responsive test file.

## Risks / Assumptions

- **Privacy Policy / Terms of Service content is not legal advice.** This is restated here,
  deliberately, alongside README.md's Risks table: content will be scoped to describe verifiable,
  current facts about the platform (no accounts, no data collection beyond what Sprint 9's
  analytics adds) in plain language, explicitly labelled as a draft. The project owner is
  responsible for any legal review before treating this as binding, especially once Sprint 9
  activates analytics.
- **"Contact page" does not mean "contact form."** `.ai/TESTING.md`'s Critical User Journey just
  says "Contact page" — interpreted here as a page that lets a visitor successfully make contact
  (a working `mailto:` link satisfies that), not necessarily an in-page submission form. A real
  form is a legitimate future feature but requires backend/email infrastructure (ADR-002 currently
  rules out a backend) — flagged as out of scope rather than silently built or silently dropped.
- Assumes `Settings.contactEmail` (`community@akunavista.example`) remains the correct contact
  address — if the project owner wants a different address surfaced publicly, that's a one-line
  `data/settings.json` change, not a code change.

---

# Open Questions

- **Exact Privacy/Terms wording** — this sprint drafts accurate, honest, plain-language content
  based on the platform's actual current behaviour (JSON-only data, no accounts, no auth, per
  ADR-002/ADR-006), but final wording is the project owner's call, not a decision to finalise
  unilaterally here. Draft first, then confirm before treating as final.
- **Should `/community` also be built**, matching ROADMAP.md's original Phase 5 page list?
  Default: no — Sprint 6 already put community content (events, promotions, announcements,
  spotlight) on the homepage itself, and a separate `/community` page would either duplicate that
  or need its own distinct purpose that hasn't been specified anywhere. Not built here; revisit
  only if a concrete need for a dedicated `/community` page (distinct from the homepage sections)
  is identified later.
- If ambiguity arises beyond what's noted here, follow CLAUDE.md's "When Unsure" guidance: don't
  guess, explain assumptions, offer alternatives, recommend the simplest option.

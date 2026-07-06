# Sprint 07 — Notes

Quality & Performance

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Design Notes

- The custom 404 page (`app/not-found.tsx`) should follow DESIGN_SYSTEM.md/UI_GUIDELINES.md "Error States": explain the problem in plain language, suggest one clear next step (return home, browse categories, search), and never expose technical details. It should use the existing Button, Container and Section components rather than a bespoke layout — this is still the same product, just at a dead end.
- `app/error.tsx` and `app/global-error.tsx` should read as "something went wrong, here's what to do," not as a stack trace or debug console. Offer a retry action where the error is likely transient, and a way back to the homepage regardless.
- Loading states should reuse Sprint 3's skeleton-loader pattern (built for the directory grid) as the reference implementation for every other route, rather than inventing a new loading treatment per page — consistent with DESIGN_SYSTEM.md "Loading States" ("prefer skeleton loaders, avoid blank screens, communicate progress").
- No new visual language should be introduced in this sprint. Every fix — accessibility, responsive, image, error, loading — should tighten the existing Design System, not extend it. If a fix seems to require a new component pattern, that's a signal to re-check whether an existing pattern was simply misapplied.

---

# Technical Notes

## Tools

| Tool | Purpose |
|------|---------|
| Lighthouse (Chrome DevTools / CI) | Measures Performance, Accessibility, Best Practices, SEO scores and Core Web Vitals (LCP, CLS) against ARCHITECTURE.md's Performance Targets |
| axe-core (or equivalent automated a11y checker) | Automated WCAG AA violation detection, to be paired with a manual keyboard/screen-reader pass — automated tools do not catch everything |
| `next/image` | Image optimisation — correct sizing, modern formats, lazy loading, `priority` hints for LCP-candidate images |
| Chrome DevTools Performance panel | Identifies render-blocking resources and unnecessary re-renders during profiling |
| React DevTools / bundle analyzer | Identifies Client Components that could be Server Components, and unjustified bundle size growth |

## Patterns

- **Measure → fix → re-measure, not measure-fix-ship.** Every fix in this sprint should be validated against the specific metric it targets immediately after landing, not batched until a single end-of-sprint Lighthouse run. This is CODING_STANDARDS.md's "Performance: Measure before optimising" applied literally, and it's the only way to catch a fix in one dimension (e.g. image optimisation) regressing another (e.g. layout shift from a new `priority` image).
- **Reuse Sprint 3's skeleton-loader pattern wholesale** for the new loading states in this sprint (homepage, business detail, search, community page), rather than building four different loading treatments.
- **Error boundaries are a UI concern, not a logging concern.** This sprint builds the friendly fallback UI only; centralised error reporting (Sentry) is Sprint 9 (Production Readiness) per ARCHITECTURE.md's "Logging" section, which lists "Central logging / Error reporting / Performance monitoring" under Future.
- **SEO audit reuses Sprint 4's generator functions.** The `LocalBusiness` structured data generator and per-business metadata built in Sprint 4 should be audited and fixed in place, not rewritten — this sprint is about closing gaps, not replacing a working mechanism.

## Risks / Assumptions

- **The Sprint 7 SEO audit and Sprint 9's SEO infrastructure work are deliberately different scopes, and this is restated here to avoid ambiguity.** Sprint 7's "SEO audit" means auditing and fixing PER-PAGE SEO that already exists: page titles, meta descriptions, Open Graph tags, structured data (from Sprint 4's business pages), heading hierarchy and semantic HTML — measured against Lighthouse's SEO score. Sprint 9 will separately build site-wide crawl INFRASTRUCTURE that does not exist yet (`sitemap.xml`, `robots.txt`) and perform one final pre-launch metadata sanity check. A reader of either sprint's documentation should be able to tell, from this note and from README.md's Risks table in both sprints, which sprint owns which piece of work — neither sprint should quietly absorb the other's deliverable.
- **"High scores across performance, accessibility and SEO" is only meaningful with a recorded baseline.** Without an actual before/after Lighthouse number, a claim of "high scores" at the end of this sprint is unverifiable and could mask no real improvement, or worse, a regression introduced elsewhere. review.md is the source of truth for these numbers — Definition of Done should not be marked complete from memory or impression.
- **Fixing one dimension can regress another.** Image optimisation changes (e.g. adding `priority` to more images) can worsen CLS if sizing isn't explicit; accessibility markup changes (e.g. additional ARIA, live regions) can marginally increase bundle size or re-render frequency. The mitigation is procedural, not technical: re-measure after every individual fix, not just once at the end (see Patterns above and backlog.md's Prioritisation Notes).
- **This sprint is bounded by what Sprints 1–6 actually built.** It assumes no new business logic or content is needed to satisfy any user story — if a fix appears to require new business-facing functionality, that's scope creep into a future sprint (most likely Sprint 8 or 9) and should be flagged rather than implemented here.

---

# Open Questions

- Should Lighthouse CI be wired into the CI pipeline (DEPLOYMENT.md/TESTING.md "CI Pipeline") during this sprint, or is a manual/local Lighthouse run sufficient for now, with CI automation deferred to Sprint 9's monitoring work? Default assumption: manual/local runs for this sprint, documented in review.md — automating Lighthouse in CI is a reasonable Sprint 9 candidate once monitoring infrastructure exists, but is not required to meet this sprint's Definition of Done.
- Should the custom error pages (`error.tsx`, `global-error.tsx`) capture any diagnostic information client-side for future use once Sentry is introduced in Sprint 9, or should that instrumentation wait until Sentry actually exists? Default assumption: no instrumentation yet — ARCHITECTURE.md's "Logging" section marks central logging and error reporting as Future (Sprint 9), so this sprint builds the UI only and leaves the logging hook for later.
- If ambiguity arises beyond what's noted here, follow CLAUDE.md's "When Unsure" guidance: don't guess, explain assumptions, offer alternatives, recommend the simplest option.

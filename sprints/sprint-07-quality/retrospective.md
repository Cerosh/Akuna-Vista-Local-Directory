# Sprint 07 — Retrospective

Quality & Performance

Owner: Cerosh Jacob

Last Updated: 2026-07-07

Status: Complete — Definition of Done substantially met (see Carry Forward for the one open gap).

---

# Lessons Learned

What went well?

- The measure → fix → re-measure discipline this sprint set out to enforce (rather than assume) paid for itself repeatedly: two real regressions (the root-`loading.tsx` soft-404 cascade, and the `/search` loading-skeleton CLS spike) were caught *within this sprint*, immediately after the step that introduced them, instead of shipping and being discovered later or by a user.
- Root-causing rather than accepting Lighthouse's headline scores found genuinely valuable, non-obvious bugs: the favicon 404 was a one-line fix hiding behind "Best Practices 96," and the `/business/[slug]` SEO gap turned out to be a documented Next.js 15.2+ metadata-streaming behavior invisible to Lighthouse's own user agent — neither would have been found by "looks fine" review.
- Reusing existing patterns (the `Skeleton`/`BusinessCardSkeletonGrid` precedent, the `buttonVariants`+`Link` gotcha already documented in `AI_MEMORY.md`, the Sprint 3 loading-state reference) kept every fix small and consistent rather than introducing new visual language, as this sprint's own notes.md asked for.

What could improve?

- Two full session-hours went into reverse-engineering the Next.js metadata-streaming behavior (`htmlLimitedBots`) before finding the documented cause via a web search — a web search for the exact symptom ("meta tags rendering inside body not head Next.js") would have been faster to reach for earlier, rather than exhausting local hypotheses (ShareButton, JSON-LD, generateMetadata shape) first.
- A stale background server process (left running from much earlier in the session) silently absorbed several rounds of "rebuild and retest" without erroring loudly — `EADDRINUSE` was buried in a redirected log file instead of surfacing immediately. Checking the server actually restarted (a status-code curl, not just "did the build succeed") should be the default habit before trusting any subsequent measurement.

Were any engineering standards updated?

- `AI_MEMORY.md`'s Framework Gotchas section gained two entries: the root-level `loading.tsx` cascade behavior, and (if not already added, see DECISIONS.md ADR-012) the metadata-streaming/`htmlLimitedBots` behavior — both are exactly the kind of non-obvious, hard-won findings that document is for.

Should DECISIONS.md change?

- Yes — see ADR-012 below, formalising the measure-fix-remeasure discipline this sprint was built around, since two of this sprint's own fixes (loading states, then performance) would have shipped regressions without it.

Should CODING_STANDARDS.md change?

- Not proposed. "Performance: Measure before optimising" already exists and was sufficient guidance — this sprint's contribution is evidence that the discipline works, not a gap in what was written.

---

# Sprint Retrospective

Keep

- Root-causing every Lighthouse/axe finding down to the specific file and line before fixing, and recording that root cause in review.md — not just the before/after score.
- Re-measuring the specific metric immediately after each fix, not batching until the end (this is what caught both regressions this sprint).
- Disclosing what wasn't done (screen-reader spot-check, Google Rich Results Test, Vercel preview) rather than silently marking checklist items complete.

Stop

- Assuming a "rebuild + restart + curl" cycle succeeded without checking the server actually restarted (see stale-process issue above).

Start

- Reaching for a web search on an unexplained framework behavior sooner, once 2-3 local hypotheses have been ruled out empirically.

---

# Carry Forward

Items not completed.

| Task | Reason | Next Sprint |
|------|--------|-------------|
| Mobile LCP is at or just above ARCHITECTURE.md's 2.5s target on all 5 routes (desktop LCP is comfortably met everywhere) | Root-caused to text-element render delay under Lighthouse's simulated mobile CPU/network throttle (TTFB + main-thread work), not a specific code defect this sprint found a further fix for without fighting Next.js's own rendering pipeline for an unverified, marginal gain | Revisit if Sprint 9 (Production Readiness) introduces real infrastructure (CDN, edge caching) that changes the TTFB baseline, or if a future sprint profiles hydration cost more deeply |
| Screen-reader spot-check (VoiceOver/NVDA) not performed | No assistive technology available in this development environment | Perform manually before a production launch decision (Sprint 9) |
| Google Rich Results Test not run against a live URL | This project isn't deployed to a public URL yet | Run once Sprint 9 or a deployment step makes the site publicly reachable |
| Vercel preview deployment not verified | No Vercel deployment configured in this environment | Verify as part of Sprint 9's deployment work |
| Lighthouse CI wiring into the CI pipeline | Sprint 07's own notes.md set this as the default assumption (manual/local runs sufficient for this sprint) | Reasonable Sprint 9 candidate once monitoring infrastructure exists |

---

# Metrics

Planned Features: 8 (F-001–F-008, see README.md)

Completed Features: 8 of 8 — Lighthouse optimisation, Accessibility review, Responsive improvements, Performance profiling, Image optimisation, SEO audit, Error pages, Loading states.

Open Bugs: 0 (all Findings Log items resolved; one target — mobile LCP — carried forward as a measured, disclosed gap, not a bug).

Documentation Updated: review.md, retrospective.md, TODO.md, CONTEXT.md, DECISIONS.md (ADR-012), AI_MEMORY.md.

Accessibility Reviewed: Yes — axe-core (`@axe-core/playwright`) across all 5 routes, zero critical/serious violations after fixes; Lighthouse Accessibility 100 on every route, mobile and desktop.

Playwright Coverage: 198 test instances across Chromium/Firefox/WebKit (186 passed, 12 documented browser-limitation skips), including new coverage for accessibility (axe + keyboard nav), responsive overflow, custom 404/error boundary, and loading-state rendering.

## Final Lighthouse Scores (mobile)

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|-------|-------------|----------------|-----------------|-----|-----|-----|
| Homepage | 96 | 100 | 100 | 100 | 2.8s | 0 |
| `/businesses` | 98 | 100 | 100 | 100 | 2.5s | 0 |
| `/category/[slug]` | 98 | 100 | 100 | 100 | 2.5s | 0 |
| `/business/[slug]` | 97 | 100 | 100 | 100 | 2.6s | 0 |
| `/search` | 96 | 100 | 100 | 100 | 2.8s | 0.025 |

Desktop scores meet or exceed every target on every route (Performance/Accessibility/Best Practices/SEO all 100, LCP ≤0.7s, CLS ≤0.006) — see review.md for the full table.

## Final Accessibility Audit (axe-core)

| Route | Critical/Serious Violations |
|-------|-------------------------------|
| Homepage | 0 |
| `/businesses` | 0 |
| `/category/[slug]` | 0 |
| `/business/[slug]` | 0 |
| `/search` | 0 |

Performance Score: See table above — cross-reference review.md for the full before/after record and root causes.

Sprint Velocity (optional): 10 commits (`chore:`/`fix:`/`feat:`/`perf:`/`test:`/`docs:`), one fix area per commit throughout.

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [x] CONTEXT.md — mark Sprint 07 complete, update "Current Phase" to Sprint 08.
- [x] TODO.md — replace Sprint 07 content with Sprint 08 scope.
- [ ] ROADMAP.md — Phase 8 (SEO) and Phase 9 (Performance) remain "🟢 Ready" rather than flipped to complete, since neither phase's full deliverable list is finished by this sprint alone (`sitemap.xml`/`robots.txt` are explicitly Sprint 9's, per this sprint's own Non-Goals) — no change made, to avoid overclaiming.
- [x] DECISIONS.md — added ADR-012 (measure-fix-remeasure discipline).
- [ ] CHANGELOG.md — does not exist yet; not introduced as a side effect of a hardening sprint (see review.md's tooling note).
- [x] AI_MEMORY.md — two new Framework Gotchas (root-level `loading.tsx` cascade; Next.js 15.2+ metadata streaming/`htmlLimitedBots`).

Only update documents that genuinely changed.

---

# Sprint Summary

What was delivered?

- A documented Lighthouse (mobile + desktop) and axe-core baseline for all 5 routes, taken before any fix.
- Nine real, root-caused defects found and fixed: missing favicon (Best Practices), Next.js metadata-streaming SEO gap, two accessibility issues (invalid `aria-label`, four under-contrast colour tokens), a keyboard-focus gap on the skip link, a responsive overflow at the tablet breakpoint, a loading.tsx cascade reintroducing a soft-404, and a loading-skeleton CLS regression (caught and fixed within this same sprint).
- A custom on-brand 404 page and error boundaries (`error.tsx`, `global-error.tsx`), verified not to regress existing 404-status Playwright tests.
- Consistent skeleton loading states for homepage and search (business/category deliberately excluded, documented why).
- Site-wide SEO metadata (`metadataBase`, Open Graph/Twitter defaults, `alternates.canonical` on every route).
- Cross-browser Playwright coverage (Chromium/Firefox/WebKit), with two disclosed, non-app browser/tooling limitations.
- Final scores: Performance 96-100, Accessibility 100, Best Practices 100, SEO 100, CLS ≤0.025 on every route (mobile and desktop); mobile LCP is the one target still at/near its threshold, carried forward with a documented root cause.

What remains?

- Mobile LCP fine-tuning (carried forward — see above).
- Screen-reader spot-check, Rich Results Test and Vercel preview verification, all blocked on environment/deployment constraints rather than skipped by choice.

What should the next sprint focus on?

Sprint 08 — Admin Preparation.

---

# Next Sprint Goal

Sprint 08 — Admin Preparation: build JSON validation, import/export tooling, admin data scripts, seed data and backup utilities and data migration helpers so content updates become efficient and reliable. This is CLI/local tooling, not an authenticated admin dashboard.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project better structured, better documented, better tested, easier to maintain, and closer to the long-term vision.

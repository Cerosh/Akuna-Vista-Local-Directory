# Sprint 09 — Retrospective

Production Readiness

Owner: Cerosh Jacob

Last Updated: 2026-07-14

Status: Complete — Definition of Done met (monitoring explicitly deferred, not silently dropped).

---

# Lessons Learned

What went well?

- Verifying against the real live production URL after every single commit — not just trusting a
  local build — caught a real, pre-existing production bug (`NEXT_PUBLIC_SITE_URL` missing) before
  it became "Sprint 9's problem" by association, and caught every one of the security-header
  regressions immediately rather than discovering them later as mystery flakiness.
- Treating a full Playwright run (not just lint/typecheck/build) as the real verification gate for
  the security headers work paid off directly — a strict CSP passed every static check (lint,
  typecheck, build) while completely breaking the app at runtime. None of the fast checks would
  have caught it.
- Deferring Sentry cleanly, with an explicit decision recorded rather than either quietly skipping
  it or blocking the whole sprint on external account setup, kept momentum without hiding the gap.

What could improve?

- The first CSP attempt (strict `script-src`, no exceptions) and the nonce-based middleware fix
  that followed it were both built and tested locally before discovering Next.js's Turbopack build
  doesn't apply the generated nonce to its own scripts. A faster path to the same end state: check
  whether Next.js's own inline scripts exist and whether nonce auto-application actually works in
  *this* Next.js/Turbopack version *before* writing the nonce middleware, not after.
- Vercel's deploy propagation delay (1-3 minutes) caused a moment of real confusion (robots.txt
  looked broken in production immediately after its deploy commit landed, when it was actually
  just not live yet). Worth remembering as a standing fact for future sprints, not re-discovering
  it each time.

Were any engineering standards updated?

- None directly, but two patterns are now established precedent worth reusing: (1)
  `process.env.VERCEL === "1"` as the standard way to gate anything that should only run on a real
  (always-HTTPS) deployment, never locally; (2) verifying third-party integrations (Vercel
  Analytics) against their *actual* local-dev behavior via a full Playwright run, not trusting
  vendor documentation's claims about "no-op" behavior at face value.

Should DECISIONS.md change?

- Not with a new ADR — the security header configuration and its two documented `'unsafe-inline'`
  exceptions are fully explained inline in `next.config.ts` itself (the natural place a future
  engineer would look), which is more useful than a separate ADR file they'd have to know to check.
- The About/Contact/Privacy/Terms decision was already recorded via ADR-011/Sprint 08b's own
  documentation — no new ADR needed here, it's resolved, not re-opened by this sprint.

Should CODING_STANDARDS.md change?

- No.

---

# Sprint Retrospective

Keep

- Verifying every change against a live server (local production build, then real deployment)
  before considering it done — this sprint would have shipped a broken CSP to production without
  that discipline.
- Recording exactly what was tried and why it didn't work (the nonce middleware attempt) in commit
  messages and this sprint's own docs, not just the final working solution — the next person
  touching CSP here won't waste time re-discovering the Turbopack nonce gap.

Stop

- Nothing identified this sprint — the "verify against real infrastructure, not just local
  assumptions" discipline held up well and should continue as the default, not the exception.

Start

- When adding a new third-party script/integration, budget for the possibility that its
  documented "safe by default" behavior (e.g. "no-op outside production") doesn't actually hold —
  verify it directly rather than trusting the docs, as this sprint had to do twice (nonce
  auto-application, Vercel Analytics's local no-op claim).

---

# Carry Forward

Items not completed.

| Task | Reason | Next Sprint |
|------|--------|-------------|
| Error monitoring (Sentry) setup and verification | Project owner explicitly chose not to set up an account this sprint (2026-07-14) — not blocked, deliberately deferred | Tracked in `.ai/TODO.md` Backlog; pick up whenever the project owner is ready |
| Real physical-device/browser testing (real Safari, real iOS/Android hardware) | No BrowserStack or physical devices available in this environment — same disclosed limitation Sprint 7 already carried forward | Revisit if/when device-testing access becomes available; not currently blocking |
| Nonce-based CSP for `script-src` (removing the `'unsafe-inline'` exception) | Next.js's Turbopack build doesn't apply the generated nonce to its own injected scripts; would need deeper Next.js-version-specific investigation than this sprint's timeline allowed | Worth revisiting if a future Next.js/Turbopack release fixes automatic nonce application, or if this becomes a real security concern rather than a theoretical improvement |

---

# Metrics

Planned Features: 9 (F-001–F-009, see README.md)

Completed Features: 8 of 9 (monitoring/F-001 deferred by explicit project owner decision).

Open Bugs: 0 (4 real bugs found and fixed within the sprint — see review.md Findings Log — none remain open).

Documentation Updated: README.md, notes.md (unchanged — no new design decisions needed there), review.md, this file, `.ai/TODO.md`, `.ai/CONTEXT.md`.

Accessibility Reviewed: Yes — full `tests/e2e/accessibility.spec.ts` suite re-run after every change, zero new violations.

Playwright Coverage: 269 tests across Chromium/Firefox/WebKit locally (enforced pre-push), Chromium/Firefox in CI (WebKit intentionally excluded from CI — see `.ai/TODO.md` Backlog for why). Full regression pass across Critical User Journeys, browser compatibility matrix completed (with disclosed physical-device limitation).

Performance Score: Not freshly re-audited via Lighthouse this sprint (Sprint 7's baseline stands) — no new heavy client-side JS added (Vercel Analytics: ~1KB).

Sprint Velocity (optional): 10 commits (security headers, Vercel Analytics, robots.txt, sitemap.xml + test, plus this documentation close-out) across roughly one working session, including diagnosing and fixing 4 real regressions found via live verification.

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [x] CONTEXT.md — mark Sprint 09 complete, update "Current Phase"/"Next Milestone" → Sprint 09b (already planned, queued directly after this sprint per the project owner's explicit sequencing decision).
- [x] TODO.md — Sprint 09 summary added; Sentry deferral added as a new Backlog entry; "Next Sprint" pointer updated to Sprint 09b.
- [ ] ROADMAP.md — no change; "PHASE 15: Production Launch" isn't a literal 1:1 match for this sprint's actual scope (this project's phase numbering has diverged from sprint numbering since Sprint 6, already documented precedent) — not updating to avoid implying a false direct mapping.
- [ ] DECISIONS.md — no new ADR needed (see Lessons Learned above — the reasoning lives inline in `next.config.ts` and `app/layout.tsx` instead, where a future engineer will actually see it).
- [ ] CHANGELOG.md — still doesn't exist in this project; not introduced now, consistent with every prior sprint's same decision.
- [ ] AI_MEMORY.md — consider adding the `process.env.VERCEL` gating pattern and the "verify vendor 'no-op' claims directly" lesson as a new Framework Gotcha, since both are exactly the kind of non-obvious, hard-won knowledge that section exists to capture. Not yet added — flagged for the next documentation pass rather than done reflexively here.
- [x] DEPLOYMENT.md — not updated to remove "(Future)" from `SENTRY_DSN` (still genuinely future — deferred) or `GOOGLE_ANALYTICS_ID` (Vercel Analytics was chosen instead, Google Analytics remains genuinely not implemented) — both labels are still accurate, left as-is deliberately rather than changed for the sake of "this sprint touched analytics."
- [ ] ARCHITECTURE.md — "Monitoring" section not updated; Sentry is still Future (deferred), and Vercel Analytics wasn't necessarily what that section originally anticipated (it referenced Google Analytics) — worth a small update in a future pass, not blocking this sprint's close-out.
- [x] **About/Contact/Privacy/Terms decision** — already resolved by Sprint 08b before this sprint began; recorded there, cross-referenced here and in README.md's Risks. Not re-litigated.

Only update documents that genuinely changed.

---

# Sprint Summary

What was delivered?

- Security headers (HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
  Permissions-Policy), verified live in production.
- Vercel Analytics, verified wired up (real-event confirmation pending the project owner's own
  dashboard check).
- `robots.txt` and `sitemap.xml`, both generated from the repository layer, verified live in
  production (35 URLs).
- A final metadata sanity check confirming Sprint 4/7's SEO work is intact.
- Browser compatibility verified via the full automated Playwright suite (physical-device testing
  disclosed as unavailable).
- A full regression pass and DEPLOYMENT.md checklist walkthrough.
- One real production bug found and fixed (`NEXT_PUBLIC_SITE_URL` missing in Vercel), and three
  real regressions found and fixed during the security-header/analytics work itself — all
  confirmed via live verification, not assumed.

What remains?

- Error monitoring (Sentry) — deferred, tracked in `.ai/TODO.md` Backlog.
- Real physical-device browser testing — disclosed limitation, not currently actionable in this
  environment.

What should the next sprint focus on?

Sprint 09b — Content Cleanup (already planned: `sprints/sprint-09b-content-cleanup/`) — filter
chip accuracy, `Announcement.sourceUrl`, and closing out the remaining small content gaps.

---

# Next Sprint Goal

Sprint 09b — Content Cleanup, queued directly after this sprint per the project owner's explicit
sequencing decision (2026-07-09) — not a technical dependency of this sprint, purely a sequencing
choice. Full plan: `sprints/sprint-09b-content-cleanup/`.

Sprint 10 — Future Platform Foundation remains the sprint after that: lay groundwork for future
growth without implementing any of it yet — a Supabase repository interface, authentication
architecture, business claiming design, an advertising model, multi-community support, an API
abstraction layer, and a migration plan. Design and interfaces only.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project better structured, better documented, better tested, easier
to maintain, and closer to the long-term vision.

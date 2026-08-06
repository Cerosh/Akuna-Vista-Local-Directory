# Sprint 16 – Backlog

Neighbourhood Directory Platform

Sprint Number: 16

Sprint Name: Backlog

Sprint Goal: An ongoing, general-purpose backlog sprint for anything raised directly by the project
owner that isn't a content addition (Sprint 15's scope) and isn't part of an already-Complete themed
sprint (14 and earlier) — UI/component fixes, infra/CI-CD, or anything else. Originally scoped as
"UI Fixes" (F-001); broadened 2026-07-16 at the project owner's explicit request to be the single
place where all todos/backlog items live, rather than opening a new themed sprint folder per
category of fix.

Sprint Status: 🔄 In Progress (ongoing — backlog, items scheduled for implementation later)

Start Date: 2026-07-16

End Date: (ongoing)

Owner: Cerosh Jacob

Last Updated: 2026-08-02

---

# Numbering

Sequential addition after Sprint 15 (Directory Data Entries, ongoing). Per the Spec-Driven
Development process in `.ai/CLAUDE.md`, a backlog item still needs a Feature entry with Acceptance
Criteria captured before any code is touched — this is the Capture step only. Items here are
deliberately left at Status "Not Started" until a future turn confirms it's time to build them.

---

# Sprint Objective

Track fixes/improvements raised directly by the project owner that aren't a content addition
(Sprint 15's scope) and aren't part of an already-Complete themed sprint (14 and earlier) —
regardless of category (UI, infra, CI/CD, etc.). This is the project's single general-purpose todo
list, kept as sprint Features (with real Acceptance Criteria) rather than an informal notes file, so
each item still goes through Capture → Confirm → Implement → Verify when it's picked up.

---

# Business Value

- Longer business names (e.g. the Sprint 15 JP listings — "JP – Ethiquity Mortgage Services",
  "Praful Saparia (NSW JP)") currently wrap `BusinessCard`'s heading onto two lines, which breaks
  the uniform card height/rhythm Sprint 14 (F-004/F-010) established for card grids.
- Production currently deploys on every push regardless of whether CI passes — F-002 closes that
  gap so a red build/test suite can't silently reach production.
- A 2026-07-17 audit (four parallel sub-agent passes, cross-checked against real files, `git log`,
  and running code — not just the docs' own claims) found that 9 of 16 sprint folders (01–08b) still
  show every Feature as "Not Started" and every `tasks.md` checkbox as `[ ]`, despite that work being
  fully built, tested, and in production — the exact failure mode first caught in sprint-08-admin's
  README. Sprints 11–14 have a narrower version of the same problem (deployment-status line says
  "not yet committed/deployed" for commits that are actually merged to `main`). The root README and
  `.ai/PROJECT.md` still describe the project as Sprint 1 / "Planning" though 15 sprints have
  shipped. Stale status docs actively mislead: they were the reason an admin-portal question in this
  same session nearly got scoped against "Not Started" tooling that was, in fact, already built,
  tested, and enforced in CI.

---

# Success Criteria

Per Feature, the sprint is successful when:

- [ ] The Feature's Acceptance Criteria are met.
- [ ] Existing Playwright suite still passes (no regressions).
- [ ] No known critical defects.

---

# Features

| ID | Feature | Priority | Status |
|----|----------|----------|--------|
| F-001 | Clamp `BusinessCard`'s heading to a single line with ellipsis truncation | Medium | Completed |
| F-002 | Gate production deploys behind CI passing (CI-gated CD) | Medium | Blocked — real deploy-path gap found 2026-08-02 and worked around manually; still awaiting project owner's Vercel secrets for the automated path |
| F-003 | Fix root cause of `search.spec.ts` WebKit flakes: a Next.js hydration race where `.fill()` right after `goto()` can run before React's `onChange` listener attaches, so `query` state silently stays empty | Low | Completed |
| F-004 | Fix stale sprint/top-level documentation status claims found in the 2026-07-17 doc audit | Medium | Completed |
| F-005 | `.ai/ARCHITECTURE.md`'s "Monitoring" section lists Vercel Analytics under "Future" though it's live in production | Low | Completed |
| F-006 | Doc-staleness guardrails: automated checks in pre-commit/commit-msg + CI to prevent the 2026-07-17 doc-staleness pattern from recurring | Medium | Completed |
| F-007 | Error monitoring (Sentry): install, set `SENTRY_DSN`, verify a real production error reaches the dashboard | High | Not Started |
| F-008 | Add the 2 held-out real events (Blacktown Mayoral Fun Run, Blacktown Food Market) once updated 2026/2027 dates are supplied | Medium | Blocked — awaiting project owner input |
| F-009 | Business data completeness pass (email/address/opening-hours/verification) across existing listings | Medium | Blocked — awaiting project owner input |
| F-010 | Run an actual Google Rich Results Test against a live business page (never performed — needed a public URL, now available) | Medium | Completed |
| F-011 | Manual screen-reader (VoiceOver/NVDA) accessibility spot-check across all routes | Medium | Blocked — no assistive technology available in this development environment |
| F-012 | Re-measure mobile LCP against current production (last measured Sprint 7, at/above the 2.5s target; site has changed substantially since — Sprint 9 CDN infra, Sprint 11 transit widget, Sprint 13 weather widget, Sprint 14 polish) | Medium | Completed |
| F-013 | Wire Lighthouse into the CI pipeline (`lighthouse` package already installed, never wired into `ci.yml`) | Low | Blocked — implemented, awaiting a real CI run to verify |
| F-014 | Privacy Policy / Terms of Service legal review | Low | Blocked — needs the project owner's own external legal review, not code |
| F-015 | Investigate nonce-based CSP for `script-src` (remove the `'unsafe-inline'` exception) if a future Next.js/Turbopack release fixes automatic nonce application | Low | Not Started |
| F-016 | Real Contact submission form (currently a `mailto:` link — no backend/email infrastructure exists per ADR-002) | Low | Not Started — spec drafted (ADR-015 + AC below), awaiting project owner confirmation before Implement |
| F-017 | `.ai/CODING_STANDARDS.md` "Scripts" conventions section (considered in Sprint 8, judged not yet necessary) | Low | Completed |
| F-018 | Replace homepage "Popular categories" curated-featured grid with an accessible horizontal scroll-snap carousel showing all categories; remove `Category.featured` entirely (kept only on `Promotion`) | Medium | Completed |
| F-019 | Code-review follow-up on F-018's `CategoryCarousel`: fix keyboard focus loss on the disabled arrow buttons, a fragile `offsetLeft`/`scrollLeft` coordinate assumption in the scroll-to-card logic, a `ResizeObserver` blind spot, and an initial-render disabled-state flash | Medium | Completed |
| F-020 | `PromotionCard`'s title has no line-clamp, so titles of varying length wrap to a different number of lines per card — combined with the CSS grid's per-row height stretch, this makes promotion cards (and the "View business" button position) inconsistent in size across the "Akuna Vista residents-only promotions" section | Medium | Completed |
| F-021 | Extend F-020's line-clamp standard (title `line-clamp-1`, description `line-clamp-2`) to every other grid-rendered card with the same title+description shape — `BusinessCard` (reported: "View details" button misaligned across cards), `EventCard`, `FeaturedContentCard` — for consistent card sizing everywhere the pattern applies | Medium | Completed |
| F-022 | Cap the homepage "Featured businesses" section to 6 (was showing all 9 businesses marked `featured`, unlimited); un-feature the 3 businesses beyond the cap in the data; add a hard `npm run validate:data` rule so a 7th featured business fails validation instead of silently exceeding the display cap | Medium | Completed |
| F-023 | `/code-review` on F-021/F-022: `validateFeaturedBusinessCap` wasn't reachable from `scripts/admin.ts`'s own write path (only from `npm run validate:data`), the 6-business cap was duplicated as two independent constants, and `line-clamp-2` alone doesn't fully equalize card heights | Medium | Completed |
| F-024 | Fix `tests/e2e/search.spec.ts`'s "a suburb chip with zero real businesses does not render" test — it asserted Tallawong specifically, which stopped being true once sprint-15's F-033 added a real Tallawong business | Low | Completed |
| F-025 | `CommunityStatistics.tsx`'s "Businesses listed" and "Categories covered" homepage stats read static, now-stale fields from `data/metadata.json` (19 / 12) instead of the real current counts — make those two compute live from the business/category repositories; leave "Community members" as the manually-set `metadata.communityMembers` value, per the project owner's explicit direction | Medium | Completed |
| F-026 | `/code-review` on F-025: fix a test comment in `search.spec.ts` that cites a nonexistent `Suburb.displayOrder` field, and wrap `categoryRepository`'s exported singleton `getAll()` in `React.cache()` since F-025 made it the 3rd per-render call on the homepage | Low | Completed |
| F-027 | `CategoryCarousel`'s left/right arrow buttons have only a 32×32px hit area (Button `size="icon"`), half of which overlaps the adjacent `CategoryCard` link — on touch devices a tap near an arrow often lands on the category card instead, navigating away rather than scrolling | Medium | Completed |
| F-028 | `/code-review` on F-027: dark-mode `hover:bg-transparent` didn't cancel the ghost variant's `dark:hover:bg-muted/50` (different modifier stack, not deduped by tailwind-merge), leaking a gray fill across the full 44px hit box on hover; the keyboard focus-visible ring also moved to the oversized, off-center 44px outer button instead of staying on the visible 32px circle | Medium | Completed |
| F-029 | CI broke on main (2026-08-02, GitHub Actions run 30726250394): `eventRepository.test.ts`/`announcementRepository.test.ts`/`promotionRepository.test.ts` freeze "now" via `Date.now = () => ...`, but `isPast`'s default `now: Date = new Date()` never reads the monkey-patched `Date.now` — the mock was always a no-op, only staying green because real time hadn't yet passed the hardcoded ~2026-07-31/08-01 fixture dates | High | Completed |
| F-030 | CI broke on main (2026-08-06, GitHub Actions run 31068621306): `tests/e2e/homepage.spec.ts`'s Transit widget test combines two locators with `.first()` applied to each before `.or()`, so a static heading text and a real fetch-failure message can both independently resolve to one element and union into two — a strict-mode violation | Medium | Completed |

Status Values

- Not Started
- In Progress
- Blocked
- Review
- Completed

---

# User Stories

## Story 1 (F-001)

As a visitor scanning a grid of business cards

I want every card's heading to stay on one line

So that cards with a long business name (e.g. "JP – Ethiquity Mortgage Services", "Praful Saparia
(NSW JP)") don't wrap to two lines and throw off the grid's uniform card height.

### Root cause

`components/cards/BusinessCard.tsx:33` — `<CardTitle className="text-base">{business.name}</CardTitle>`
has no truncation class, so long names wrap freely. `PromotionCard.tsx` already has precedent for
this exact pattern (F-010, Sprint 14) — its description uses `line-clamp-2`. This Feature is the
equivalent fix for `BusinessCard`'s heading, using `line-clamp-1` (single line, ellipsis/"dots"
overflow) instead.

### Assumption (confirm before implementing)

- Scoped to `BusinessCard`'s `CardTitle` specifically (used across `FeaturedBusinesses`,
  `BusinessDirectory`, and category grid pages) — not `PromotionCard`'s or `CategoryCard`'s heading,
  since the project owner's report ("the card heading") followed directly from viewing the new JP/
  Finance business cards. Flag if a different card was meant.

Acceptance Criteria

- [x] `BusinessCard`'s `CardTitle` (`components/cards/BusinessCard.tsx:33`) gains `line-clamp-1`
      (or equivalent single-line ellipsis truncation), so the heading never wraps past one line
      regardless of `business.name` length.
- [x] Verified visually against the longest current names ("JP – Ethiquity Mortgage Services",
      "Praful Saparia (NSW JP)") in `FeaturedBusinesses`, `BusinessDirectory`, and a category page
      grid, at mobile and desktop widths.
- [x] Truncated names remain understandable (ellipsis doesn't cut off the distinguishing part of
      the name for any current business) — flag any name that truncates badly for a
      rename/shorten decision instead of forcing the CSS fix to cover it.
- [x] No regression to card height/rhythm established in Sprint 14 (F-004).
- [x] Existing Playwright suite still passes.

**Resolved as a duplicate of F-021, not new work.** This Feature's request ("clamp `BusinessCard`'s
heading to one line") is the exact same fix F-021 delivered 2026-08-01 (`line-clamp-1` + `title=`
tooltip on `CardTitle`, `components/cards/BusinessCard.tsx:35`, committed in `6ec6ec2`, already on
`origin/main`) — F-021 was scoped as "the same card-sizing standard applied everywhere," which
included this exact line. This Feature's table row was simply never updated to reflect that when
F-021 shipped — the same doc-staleness pattern F-004/F-006 exist to catch, caught again here
2026-08-02. Re-verified directly: `/businesses?category=jp-services` on production renders "JP –
Ethiquity Mortgage…" truncated to one line with an ellipsis; `line-clamp` is a CSS overflow rule
independent of viewport width, so the same truncation holds at every width. No code change needed.

F-001 confirmed already implemented and verified (2026-08-02).

---

## Story 16 (F-016) — DRAFT, awaiting Confirm

As the project owner

I want a real Contact form instead of a `mailto:` link

So that visitors can send a message without their device needing a configured mail client — raised
originally in Sprint 8b, carried forward as "not scheduled" for 3+ sprints, and picked up now at the
project owner's explicit request to "scope it properly first" (this Feature was answered
"Scope it properly first" rather than "implement now" when asked, precisely because it requires
amending ADR-002 and choosing an email provider — bigger than this sprint's other backlog items).

### Full detail

See `.ai/DECISIONS.md` ADR-015 (Proposed) for the architectural decision, alternatives considered,
and consequences. Summary: a Server Action submits the form to **Resend** (Vercel Marketplace's
only/top result for the `messaging` category, confirmed via `npx vercel integration discover
--category messaging` — not chosen from memory), sending an email to the project owner; no
database, no submission history, `mailto:` link likely retained as a fallback.

Acceptance Criteria (draft — **not yet confirmed by the project owner**)

- [ ] ADR-015 confirmed Accepted (or revised) by the project owner before any code is written.
- [ ] `vercel integration add resend --yes` run (requires the project owner's Vercel account —
      this is an "Explicit permission required" / account-changing action, not something to do
      unilaterally) and `RESEND_API_KEY` provisioned as a real env var, never hand-created.
- [ ] `app/contact/page.tsx` gains a real form (name, email, message — exact fields TBD at Confirm)
      wired to a Server Action that calls Resend server-side only.
- [ ] Successful submission shows the visitor clear confirmation; failure shows a clear error and
      the existing `mailto:` link as a fallback, so a provider outage never fully blocks contact.
- [ ] No submission is persisted anywhere (no new database/collection) — out of scope per ADR-015.
- [ ] `.ai/ARCHITECTURE.md`/`.ai/SECURITY.md` updated once Accepted, documenting the new integration
      and secret per the same bar set for `TRANSPORT_NSW_API_KEY`/ADR-014.
- [ ] `npm run typecheck`, `eslint`, existing Playwright suite still pass; new coverage for the
      contact form itself (happy path + provider-failure fallback).

**Status: Capture complete, Confirm pending.** Per this project's Spec-Driven Development process,
no code is written until the project owner confirms this ADR and these Acceptance Criteria.

---

---

## Story 2 (F-002)

As the project owner

I want production deploys to be blocked when CI is red

So that a broken build or failing test suite can never silently reach real visitors, the way it did
for several days after Sprint 11 (transit widget console errors, fixed 2026-07-16 — see the commit
`ba98234` fix and this sprint's predecessor investigation).

### Root cause / current state (investigated 2026-07-16)

- Vercel's native Git integration already auto-deploys to production on every push to `main` — this
  part of "CD" already works, confirmed empirically all session (push → new "Building" deployment
  within ~60s).
- `.github/workflows/ci.yml`'s `CI` workflow and Vercel's auto-deploy are two **independent**
  triggers on the same `push` event. Neither waits for the other. While CI was red for several days
  (2026-07-15 through 2026-07-16, see `ba98234`'s fix), Vercel kept deploying every one of those
  commits to production anyway — a failing test suite never blocked a real deploy.
- GitHub's standard fix for this — branch protection with required status checks — is **unavailable
  on this repo**: confirmed via `gh api repos/Cerosh/Akuna-Vista-Local-Directory/branches/main/protection`
  returning `403 Upgrade to GitHub Pro or make this repository public to enable this feature`. This
  repo is private on GitHub's free tier.
- Even with branch protection, it only gates PR merges — this repo pushes directly to `main` (no PR
  flow observed), so it wouldn't touch Vercel's separate auto-deploy trigger regardless.

### Proposed approach

Move deployment *into* the GitHub Actions workflow itself, gated on CI success, instead of relying
on Vercel's independent Git-integration auto-deploy:

1. Add a `deploy` job to `ci.yml` with `needs: [checks, e2e]`, so it only runs if typecheck, lint,
   format check, unit tests, build, and both e2e shards all pass.
2. That job runs `vercel deploy --prod --token=$VERCEL_TOKEN` (via the Vercel CLI, using
   `vercel pull`/`vercel build`/`vercel deploy --prebuilt` per Vercel's documented GitHub Actions
   pattern) using a new `VERCEL_TOKEN` repository secret (same trust/handling level as the
   `TRANSPORT_NSW_API_KEY` secret set 2026-07-16 — requires the project owner's explicit go-ahead
   before being written to GitHub, per this project's established pattern for secret-store writes).
3. Disable Vercel's own Git-integration auto-deploy for the `main`/production branch (a Vercel
   project setting, e.g. Project → Settings → Git → adjust "Production Branch" auto-deploy, or
   equivalent — exact setting needs confirming against Vercel's current dashboard at
   implementation time), so there's exactly one deploy path and it's the CI-gated one.
4. This approach needs no GitHub Pro upgrade and no repo visibility change — it works entirely on
   free tiers of both platforms.

### Assumptions (confirm before implementing)

- Preview deployments (non-`main` branches/PRs) are out of scope for this Feature — only
  *production* deploys need CI-gating. Flag if preview deploys should also wait on CI.
- This intentionally makes production deploys slower (CI's ~5min e2e run now sits in the critical
  path before a deploy can happen), trading deploy latency for a hard guarantee that red CI can't
  ship. Confirm this tradeoff is wanted before implementing.

Acceptance Criteria

- [x] `ci.yml` gains a `deploy` job that only runs on push to `main`, with `needs: [checks, e2e]`.
- [ ] A `VERCEL_TOKEN` (and any other required `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID`) secret is added
      to GitHub, with explicit project-owner confirmation before being written (per the
      `TRANSPORT_NSW_API_KEY` precedent). **Blocked on the project owner** — these are credentials
      only they can generate/authorize; not something to enter on their behalf. See below.
- [x] Vercel's automatic Git-integration deploy for the production branch is disabled — done via
      `vercel.json`'s `git.deploymentEnabled.main: false` (Vercel's documented mechanism for
      disabling Git-triggered deploys on specific branches while CLI/CI-triggered `vercel deploy`
      still works), rather than a dashboard click, so it's a reviewable, reversible code change
      instead of an unrecorded account setting.
- [ ] A push with passing CI still results in a new Production deployment, end to end, verified
      live. **Not yet verified** — requires the `VERCEL_TOKEN`/`VERCEL_ORG_ID`/`VERCEL_PROJECT_ID`
      secrets to exist first, then an actual push to `main` to observe. Pushing to `main` is a
      visible, shared-state action — needs the project owner's go-ahead in the same turn it happens,
      not assumed from this Feature's original go-ahead to implement the code.
- [x] `.ai/DEPLOYMENT.md` updated to describe the new CI-gated deploy flow, since it previously
      documented the old (ungated) behaviour.

**Setup needed from the project owner before this is live** (none of these are things an assistant
should do on someone's behalf — generating/authorizing credentials is the account owner's action):

1. Generate a Vercel token: Vercel dashboard → Account Settings → Tokens → Create, scoped to this
   project if possible.
2. In this GitHub repo's settings → Secrets and variables → Actions, add three repository secrets:
   `VERCEL_TOKEN` (the token from step 1), `VERCEL_ORG_ID` (`team_CIk5re8pCknWV2asSxwHBCv3`),
   `VERCEL_PROJECT_ID` (`prj_Jtimj5DeyPP13ycH13G2BU6nFiFh`) — the latter two are this project's own
   identifiers (from `.vercel/project.json`, gitignored), not secret credentials, but stored as
   Action secrets to match Vercel's own documented GitHub Actions pattern.
3. Push this Feature's changes to `main` and confirm the `deploy` job runs and succeeds; then
   (separately, deliberately) push a commit that fails CI and confirm no new Production deployment
   appears on Vercel.

Code/config is implemented and ready; **F-002 stays open until the project owner completes the
steps above and a live push confirms the gate actually works**, per this project's "verify by
running, not by writing" standard.

---

## Story 3 (F-004)

As the project owner

I want the sprint and top-level docs to say what's actually true

So that status claims can be trusted at face value again — the way sprint-08-admin's README nearly
caused an admin-portal decision to be made against tooling that was actually already built, tested,
and CI-enforced.

### Root cause

Sprint README "Sprint Status" fields, Features status tables, and `tasks.md` checkboxes were written
at sprint-kickoff time (as templates) and never revisited once the work actually landed — the docs
describe intent at t=0, not reality at t=now. Verified via a 4-way parallel audit on 2026-07-17
(each finding cross-checked against real files/components/tests, `git log`, and running code, not
just the doc's own claims — see this session's transcript for full per-sprint evidence).

Acceptance Criteria

- [x] Sprints 01, 02, 03, 04, 05, 06, 07, 08, 08b: each `README.md` Features status table updated
      from "Not Started" to "Completed" for every feature confirmed built (all of them, per the
      audit), and each sprint's `tasks.md` checkboxes updated from `[ ]` to `[x]` to match. Any
      Sprint 07 item that genuinely couldn't be verified as complete (e.g. measured Lighthouse/
      accessibility baselines) is left as-is or flagged, not marked complete on assumption.
      **Correction found during implementation (2026-07-17):** Sprint 06's F-005 "Community
      spotlight" was not actually built — `features/community/CommunitySpotlight.tsx` exists but is
      never imported anywhere (not wired into the homepage or any route). Marked "In Progress"
      instead of "Completed"; its `tasks.md` checkboxes (and the "Local News Placeholder"/F-006
      section, and the "Homepage Integration" line that references both) were left unchecked rather
      than flipped. This is exactly the kind of false-positive this Feature exists to catch — caught
      by direct `grep` verification of every "confirmed built" claim before writing it down, not by
      trusting the original audit sub-agent's summary at face value.
- [x] Sprints 11, 12, 13, 14: each `README.md`'s deployment-status line ("✅ Complete locally (not
      yet committed/deployed)") updated to reflect that each is merged to `main` (commits `6be7c67`,
      `c880c96`, `df2e394`, `980814b` respectively).
- [x] Sprint 13's `README.md`: the "7-day forecast" wording is left describing what Sprint 13
      actually shipped (rewriting it to "3-day" would misstate that sprint's real delivery); instead
      a dated Note section was added directly under the sprint header flagging that Sprint 14 (F-007)
      later reduced the live forecast window to 3 days (`lib/weather/weatherApi.ts`
      `FORECAST_DAYS = 3`), with a pointer to Sprint 14's README. The stale "Sprint 12 ... complete
      locally, not yet committed" claim in the Numbering section was also fixed in passing (same root
      cause, same file).
- [x] Root `README.md`: line 5's "Sprint 1 — Project Foundation... No business features exist yet"
      replaced with an accurate current-state summary; the Development Commands table extended to
      include the 9 data/admin scripts added in Sprint 8 (`validate:data`, `backup:data`,
      `restore:data`, `export:csv`, `import:csv`, `admin:data`, `seed:generate`, and the two
      `migrate:add-*` scripts); the pre-commit hook description updated to mention `validate:data`
      alongside ESLint/Prettier/typecheck.
- [x] `.ai/PROJECT.md` line 7 ("Project Status: Planning") updated to reflect the project's actual
      state (MVP in production, multiple sprints shipped).
- [x] `.ai/TODO.md`'s "Current Sprint" section updated: Sprint 13 no longer described as "not yet
      committed/deployed" (it is), and the section brought forward to reflect that Sprints 15 and 16
      are the actual current/ongoing work (both running concurrently, no fixed end date), with a new
      "Sprint 14 Summary" added for continuity and the Sprint 13 summary's "7-day forecast" line
      annotated the same way as its README.
- [x] `.ai/ROADMAP.md` and `.ai/DECISIONS.md` are excluded from this Feature — the audit found both
      already accurate; re-verify only if something changes before this is picked up.
- [x] No feature/behavioral code is touched by this Feature — documentation only. Confirmed: only
      `README.md`/`tasks.md`/`TODO.md`/`PROJECT.md` files were edited.
- [x] **Added during implementation (2026-07-17), after the project owner asked to double-check
      Sprints 09/09b specifically** (the original audit called both "accurate" — it only read their
      `README.md`s, not their `tasks.md`s, and missed a genuine gap): `sprint-09-production/tasks.md`
      had ~40 stale unchecked boxes despite its `README.md` correctly documenting Security Headers,
      Robots.txt, Sitemap, Analytics, Metadata Review and Browser Compatibility as Completed —
      re-verified each directly (`next.config.ts` headers, `app/robots.ts`, `app/sitemap.ts`,
      `@vercel/analytics` in `app/layout.tsx`) and checked them off, while correctly leaving the
      Sentry-specific items unchecked (F-001 is genuinely Deferred, confirmed via `.ai/DEPLOYMENT.md`
      still saying `SENTRY_DSN (Future)`). One item was checked then reverted after closer reading:
      the "remove (Future) label" documentation task is correctly still unchecked, since neither
      Sentry nor Google Analytics is actually active (Vercel Analytics was used instead) — flagging
      that `.ai/ARCHITECTURE.md`'s "Monitoring" section still lists Vercel Analytics under "Future"
      even though it's live in production is a **new, separate** stale-doc finding, deliberately left
      unfixed here (out of this Feature's captured scope) and noted for a future backlog item instead
      of silently expanding scope mid-implementation. Separately, `sprint-09b-content-cleanup`'s
      `README.md` had the same stale deployment-status pattern as Sprints 11–14 (`Sprint Status`
      line and one Definition of Done item both said "not yet committed/deployed") — fixed to
      "Complete and deployed (commit `135c12d`)", verified via `git show`.
- [x] **Added during implementation (2026-07-17), project owner explicitly asked to fix this now
      rather than defer it:** `.ai/CONTEXT.md` (a 453-line project-status summary, `Last Updated:
      2026-07-15`) had the same "Sprint 11... not yet committed/deployed" staleness throughout —
      Current Sprint, Current Phase, Completed, In Progress, Current Repository State, Next
      Milestone, and Session Notes sections all still described Sprint 11 as the latest work, with
      no mention of Sprints 12–16 at all. Also found and fixed two related staleness issues in the
      same file, out of the same root cause: (1) the Technology Stack's "Hosting" line said "Vercel
      — not yet connected," directly contradicted by the same document's own Session Notes section
      saying Vercel was connected 2026-07-09; (2) "Known Constraints" still carried a full paragraph
      declaring Vercel deployment "intentionally deferred" — removed outright as obsolete rather
      than reworded, since it no longer constrains anything. Brought the whole file forward to
      Sprints 15/16 as the current ongoing work, added brief Completed entries for Sprints 12–14
      (linking to their own READMEs rather than duplicating their content), and corrected a stale
      dataset count (19 businesses/12 categories → actual 27/16, verified via `data/*.json`
      directly) with an explicit note not to trust that number for long, since Sprint 15 keeps
      adding listings.
- [x] **Added during implementation (2026-07-17), after the project owner noticed only 3 of 20
      `.ai/*.md` files had changed and asked to double-check the rest:** re-verified `ROADMAP.md`
      and `DECISIONS.md` directly rather than trusting the original audit's "accurate, no
      mismatches" verdict (which, by this point, had already been wrong twice — sprint-09's
      `tasks.md` and sprint-09b's deployment status). `DECISIONS.md` (all 14 ADRs, "Accepted"
      status which doesn't go stale the way a sprint's "Not Started" does) and `JSON_SCHEMA.md`
      (Event/Promotion "(Future)" labels already correctly say "Activated... Previously marked
      (Future)") both hold up on direct re-reading. `ROADMAP.md` mostly holds up too — Phases 0–10's
      "🟢 Ready" is this project's convention for "workable," not "incomplete" (Sprint 09's README
      keeps the same label while being fully Completed, confirmed earlier in F-004) — but Phase 15
      ("Production Launch")'s conditional status, "🟢 Ready when MVP complete," was never updated
      once that condition actually resolved: the site has been live in production since 2026-07-09
      and Phase 15's own Definition of Done ("Production deployment completed") is now literally
      true. Fixed to "✅ Condition met, launched," noting Monitoring (Sentry) as the one still-open
      item, consistent with how the rest of this project discloses that gap. The other 14 `.ai/*.md`
      files (`AI_MEMORY.md`, `ARCHITECTURE.md` outside its already-logged F-005 Monitoring section,
      `CLAUDE.md`, `CODING_STANDARDS.md`, `DEPLOYMENT.md`, `DESIGN_SYSTEM.md`, `GIT_WORKFLOW.md`,
      `PRODUCT.md`, `PROMPT_PLAYBOOK.md`, `RELEASE.md`, `REVIEW_CHECKLIST.md`, `SECURITY.md`,
      `TESTING.md`, `UI_GUIDELINES.md`) were swept for the same staleness markers ("(Future)", "not
      yet", "not started", "TBD", "Planning", "coming soon") — the hits found were all either
      genuinely still-future items (Supabase, Sentry, Google Analytics) or generic template/process
      language, not stale status claims. No changes needed in those 14.
- [x] **Added during implementation (2026-07-17), after the project owner asked for a full review
      of the remaining sprint sub-files** (`backlog.md`, `goals.md`, `notes.md`, `retrospective.md`,
      `review.md` — only `README.md`/`tasks.md` had been touched until now): fixed the same
      Status-column/checkbox staleness in `backlog.md` and `goals.md` across all 13 relevant sprint
      folders (01–09, 09b, 11–13; Sprint 10 correctly left untouched, genuinely not started), plus
      `README.md`'s remaining Success Criteria/Deliverables/Testing Plan/Definition of Done/AI
      Memory Update checklists that the original F-004 pass had deliberately scoped out. AI Memory
      Update checkboxes were checked against real `git show <commit> --name-only` evidence per
      sprint, not assumption. Three real corrections surfaced along the way, all fixed:
      (1) **Sprint 06's F-005/F-006 were wrong in the *original* F-004 pass** — Community Spotlight
      and the Local News Placeholder weren't "never built" as first concluded from a code grep;
      `git log` showed both were built and shipped this sprint (commits `81b607c`, `a792d2b`), then
      later un-rendered (Sprint 09b) and deleted (Sprint 14 F-002) respectively — corrected to
      Completed with the full history noted, across README.md, tasks.md, backlog.md, and goals.md.
      (2) **Google's Rich Results Test was never actually run** for Sprint 4's structured data
      (needs a public URL, unavailable until Sprint 9) — a genuine, still-open gap, not documentation
      staleness; found a **pre-existing false positive** in `sprint-04-business-details/tasks.md`
      (checked `[x]` at the time despite never happening) and left it and the equivalent
      README/goals/review items honestly unchecked instead of blindly flipping them, with the same
      caveat noted in Sprint 7's own disclosure. (3) **Sprint 01's "Vercel deployment" (F-008) was
      wrongly bulk-flipped to Completed** in the original F-004 pass — `git log` shows Vercel wasn't
      actually connected until 2026-07-09, three days after Sprint 01's commit (`85e4890`,
      2026-07-06); reverted to unchecked/Deferred across README.md, tasks.md, goals.md, backlog.md,
      review.md, and retrospective.md, since it genuinely wasn't that sprint's own deliverable
      despite the site being live today. Also fixed: stale "commit/push/deploy remain open" language
      in `retrospective.md`/`review.md` for Sprints 09b, 11, 12, 13 (all four are actually merged and
      deployed); Sprint 13's "7-day forecast" dated note propagated to its `backlog.md`, `goals.md`,
      `notes.md`, `tasks.md`, and `retrospective.md` (previously only in `README.md`); Sprint 06's
      `retrospective.md` (blank at the time — filled in objective/factual sections from real
      evidence, explicitly left subjective "Lessons Learned"/"Keep-Stop-Start" sections marked as
      never conducted rather than fabricated); the same "never run" treatment applied to Sprints
      01–05's `retrospective.md` and `review.md` (empty templates — PR tables and Findings Logs
      annotated as genuinely empty, since this project has no PR workflow, rather than fabricated).

---

## Story 4 (F-005)

As a future reader of `.ai/ARCHITECTURE.md`

I want the "Monitoring" section to say what's actually deployed

So that it doesn't repeat F-004's own root cause (a doc frozen at planning time, never revisited
once the feature shipped) — found while implementing F-004 but deliberately not fixed there, to
avoid silently expanding that Feature's already-confirmed scope mid-implementation.

### Root cause

`.ai/ARCHITECTURE.md:139-149`'s "Monitoring" section lists Sentry, Vercel Analytics, Google
Analytics and Microsoft Clarity all under a single "Future" heading. Vercel Analytics has been live
since Sprint 9 (`app/layout.tsx` imports `@vercel/analytics/next`, gated on `process.env.VERCEL`).

Acceptance Criteria

- [x] `.ai/ARCHITECTURE.md`'s "Monitoring" section splits "Future" into what's actually current
      (Vercel Analytics) versus still future (Sentry, Google Analytics, Microsoft Clarity — Sentry
      confirmed still deferred per Sprint 9's F-001 and `.ai/DEPLOYMENT.md`'s `SENTRY_DSN (Future)`).
- [x] No other "(Future)" labels elsewhere in `.ai/` are touched by this Feature — scoped to this one
      section only; a broader sweep is a separate Feature if warranted.

Confirmed `app/layout.tsx` imports `@vercel/analytics/next` (gated on `process.env.VERCEL`) — Vercel
Analytics is genuinely live. Split the section into "Current" (Vercel Analytics) and "Future"
(Sentry, Google Analytics, Microsoft Clarity); no other file touched.

F-005 implemented and verified (2026-08-02).

---

## Story 5 (F-006)

As the project owner

I want automated guardrails that catch documentation staleness at commit time

So that the 2026-07-17 doc audit (F-004) never has to happen again — most of what it fixed falls
into two mechanically-detectable patterns, not one-off human error.

### Root cause (from F-004's own findings)

Two distinct, both-automatable failure modes accounted for the large majority of stale docs found:

1. **Self-contradiction**: text like "not yet committed/deployed" or "commit/push/deploy remain
   open steps for the project owner" was committed in the *same commit* that made the claim false
   (confirmed via `git show` for Sprints 09b/11/12/13 — the commit that shipped the sprint also
   contained the sentence saying it wasn't shipped yet). This is a pure contradiction, detectable
   with zero false positives: if a phrase claiming "not yet committed" is present in a file that is
   itself part of the commit being made right now, that claim is false by construction.
2. **Zero doc contact**: commits for Sprints 01–08b touched application code but never touched the
   matching `sprints/sprint-NN-*/README.md` or `tasks.md` at all — the Features table and checkboxes
   were simply never revisited after being written as pre-sprint templates.

A third, narrower pattern (Sprint 09's `tasks.md` left stale while `README.md` was correctly
updated) is a specific case of an internal-consistency gap between two files that are supposed to
describe the same reality.

**Explicitly out of scope, and why**: false claims made in good faith at the time (Sprint 04's
Rich Results Test checked `[x]` despite never running; Sprint 01's Vercel deployment claimed done
3 days before Vercel was actually connected) are not detectable by any static check — they require
re-deriving the underlying fact, which is exactly what took most of F-004's effort. No guardrail
proposed here claims to catch these; the only real mitigation is the existing project norm of
disclosing what wasn't verified rather than assuming it.

### Design (per-check)

**Check 1 — Self-contradiction (hard block, `.husky/commit-msg` + CI — redesigned during
implementation, see Acceptance Criteria for why)**

- New script `scripts/validate-no-self-contradiction.ts`, following the existing
  `scripts/validate-data.ts` pattern (Sprint 8) for structure and exit-code conventions.
- Reads `git diff --cached` (local) or the push's commit range (CI), and scans only **added**
  lines (diff lines starting with `+`, not unchanged context) for a fixed pattern list:
  `/not yet committed/i`, `/not yet deployed/i`, `/not yet pushed/i`,
  `/not yet connected/i` (scoped to deployment-status phrasing, not general "Future" labels —
  see Acceptance Criteria below for the exact disambiguation), `/commit\/push\/deploy remain open/i`,
  `/committing,? pushing,? and deploying/i`.
- `scripts/**` files are exempt outright — the pattern list itself is source text containing these
  exact phrases (found the hard way on the first real run — see Acceptance Criteria).
- On a match, fail with the file, line, and matched phrase, unless a `Docs-Deferred:` trailer is
  present in the commit message — message explicitly suggests either removing the claim (if it's
  now false), rewording to a dated non-self-referential form, or adding the trailer if this is a
  legitimate historical/analytical quote rather than a live status claim.

**Check 2 — Zero doc contact (hard block, pre-commit via `commit-msg` hook)**

- New script `scripts/validate-sprint-doc-contact.ts`, run from a Husky `commit-msg` hook (needed
  because both the commit message and the staged diff must be available together).
- Parses the commit message for `/Sprint\s+(\d+)([a-z]?)/i` (matching this project's existing
  commit convention, e.g. "Sprint 11", "Sprint 09b", "Sprint 15, F-010").
- If matched, and the staged diff touches any of `app/`, `components/`, `features/`, `lib/`,
  require at least one file under the matching `sprints/sprint-{NN}{suffix}-*/` to also be in the
  diff.
- **Escape hatch**: a commit message trailer `Docs-Deferred: <reason>` bypasses the check —
  visible, disclosed, and grep-able later (matching this project's established "disclose rather
  than silently skip" convention, e.g. the Sentry deferral), rather than a silent `--no-verify`.

**Check 3 — Internal consistency (hard block, pre-commit + CI, extends `validate:data`)**

- New script `scripts/validate-sprint-consistency.ts`.
- For every `sprints/sprint-*/README.md`, parses the Features table. If every row's Status is
  exactly `Completed` (compound statuses like "Completed (automated proxy...)" or "Deferred —..."
  don't count as a plain "Completed" for this check — only an exact match triggers it, to avoid
  false positives on the many nuanced statuses F-004 introduced), assert the matching `tasks.md`
  has zero `- [ ]` lines. Fail with the sprint name and the specific unchecked lines found.
- Wired into `.husky/pre-commit` and `.github/workflows/ci.yml`, same position as `validate:data`.

**Check 4 — Top-level `.ai/` freshness (hard block, pre-commit + CI — redesigned 2026-07-17 to make
hard-blocking safe; see below)**

- New script `scripts/validate-doc-freshness.ts`.
- **Redesigned from the original time-based proposal**: comparing "Last Updated" dates against the
  "most recently modified sprint" was too fuzzy to hard-block safely (Sprint 15/16 are open-ended,
  so "most recent" never stabilizes — a naive time check would false-positive on unrelated commits
  with no clean fix). Narrowed instead to a precise structural trigger: this check only fires when
  the staged diff **adds a line matching a sprint closing out** —
  `/^Sprint Status:.*(Complete|Deployed|✅)/im` newly appearing in a `sprints/sprint-*/README.md`
  (i.e. the exact moment a sprint's own status flips to done, the moment today's audit found
  `.ai/CONTEXT.md` kept missing). When that fires, require `.ai/CONTEXT.md` to also be part of the
  same staged diff. Routine commits to ongoing work (Sprint 15/16 content additions, bug fixes,
  anything not changing a Sprint Status line to "done") never trigger it — hard-blocking is safe
  because the trigger condition itself has no false-positive surface.
- Confirmed 2026-07-17: hard block, per the project owner's explicit instruction overriding the
  original warn-only proposal.

Acceptance Criteria

- [x] Check 1 (self-contradiction) implemented. **Redesigned during implementation**: moved from
      `.husky/pre-commit` to `.husky/commit-msg` — its first real run (staging this session's own
      changes) flagged the guardrail scripts' own source/tests and this sprint's own backlog notes
      (which legitimately quote the stale phrases being detected) as if they were live claims. Fixed
      two ways: `scripts/**` is now exempt outright (source code inherently needs to reference these
      strings), and Check 1 gained the same `Docs-Deferred:` escape hatch as Checks 2/4 — which
      requires the commit message, hence the move to `commit-msg`. Hard-blocks; wired into CI too.
- [x] Check 2 (zero doc contact) implemented as a `commit-msg` hook, hard-blocks, with the
      `Docs-Deferred:` trailer escape hatch working and visible in `git log` (verified via a real
      dry run with and without the trailer — see below).
- [x] Check 3 (internal consistency) implemented as `scripts/lib/docChecks.ts` (new file, following
      `scripts/lib/validation.ts`'s conventions — pure functions, `ValidationError`-shaped findings,
      single entry point — rather than adding to that file directly, since it's explicitly scoped to
      `data/*.json` schemas per its own docstring and sprint docs are a different domain). Wired into
      `.husky/pre-commit` and CI, hard-blocks, no escape hatch (file-internal consistency, not a
      judgement call). **Found and fixed a real pre-existing inconsistency while wiring this up**:
      Sprint 04's README Features table had F-009 marked plain "Completed" while its Success
      Criteria already correctly disclosed the Rich Results Test as unrun — the Features table row
      itself was never updated to match. Fixed (see F-004/F-010's finding above) — the hard-block
      hook could not otherwise have shipped, since it would fail against the current repo state.
- [x] Check 4 (`.ai/` freshness) implemented per the redesigned structural trigger above, wired into
      `.husky/commit-msg` (not pre-commit — the `Docs-Deferred:` escape hatch needs the commit
      message, which doesn't exist yet at pre-commit time; same reasoning as Check 2) and CI,
      hard-blocks.
- [x] All four checks have unit tests (`.test.ts` per script, matching Sprint 8's pattern) — 26 new
      test cases across `scripts/lib/docChecks.test.ts`, `scripts/lib/gitDiff.test.ts`, and one
      `.test.ts` per CLI script, covering true-positive, true-negative, and escape-hatch cases.
      Full suite: 217/217 passing, `npm run typecheck` and `npm run lint` both clean.
- [x] `npm run validate:docs` exposes Check 3 + Check 1 + Check 4 as one local command (Check 2 is
      excluded — it inherently needs a real commit message to parse a sprint reference out of, so
      it's a no-op without one; documented in the script itself).
- [x] `.ai/GIT_WORKFLOW.md` gained a new "Doc-Staleness Guardrails" section documenting all four
      checks, which hook each lives in, and the `Docs-Deferred:` escape hatch. `.ai/DEPLOYMENT.md`'s
      "Continuous Integration" section cross-references it.
- [x] Verified against real history (dry-run `--range` mode, no actual blocking):
  - Check 1 correctly flags `135c12d~1..135c12d` (Sprint 09b) — 9 real self-contradictions found,
    matching exactly what F-004 fixed.
  - Check 2 correctly passes `6be7c67~1..6be7c67` (Sprint 11) and `980814b~1..980814b` (Sprint 14)
    — both real commits already touch their own sprint docs, as expected.
  - **Check 2 does NOT retroactively catch Sprint 01–08b**, and this was verified directly, not
    assumed: `1ff5174` ("feat: implement homepage experience", Sprint 02's real commit) never
    mentions "Sprint" at all in its message — Check 2 parses the commit message for a sprint
    reference, and this project's commit convention only started consistently including
    "(Sprint NN)" from Sprint 09b onward. Check 2 is a **forward-looking** guardrail protecting
    commits made under the current convention; it cannot retroactively flag commits from before
    that convention existed. This is disclosed here rather than silently claimed as full historical
    coverage.
  - Check 3 passes cleanly against the current repo — confirmed after fixing one real leftover
    inconsistency this check found while wiring it up (Sprint 04's F-009, see above).

---

## Story 6 (F-003)

As the project owner

I want `git push` to stop being blocked by a flaky WebKit test

So that a genuine intermittent test bug doesn't cost a retry every push, and so the fix addresses
the actual defect rather than just tolerating it.

### Investigation (2026-07-22)

Reproduced directly rather than assumed: ran 30 concurrent WebKit page loads of `/search` against a
production build (`npm run build && npm run start`, matching `playwright.config.ts`'s `webServer`),
instrumented to read the input's live DOM value immediately after `.fill("roof")`, first with 1
worker (10/10 passed, no contention) and then with all 3 browser projects running simultaneously
(matching real `.husky/pre-push` load). Under contention, 2 of 90 runs failed, in the same shape
reported by the project owner:

- `domValue:"" listboxVisible:false` — matches the reported failure exactly ("Start typing…"
  placeholder still visible, meaning `hasActiveSearch` was false, i.e. `query` never left `""`).
- `domValue:"roof" listboxVisible:false` — value stuck but the suggestions listbox hadn't painted
  yet when checked.

**Root cause:** `SearchExperience.tsx`'s query input is a controlled React component
(`value={query}`). Playwright's `.fill()` sets the native DOM value and dispatches one `input`
event immediately after `search.goto()`. Under CPU contention, Next.js hydration (which attaches
the `onChange` listener) can still be in flight at that instant — the dispatched event is lost (no
listener yet), `query` stays `""`, and when hydration finishes moments later the controlled input's
`value={query}` re-render overwrites the DOM's "roof" back to empty. This is a **test-timing race
against hydration**, not a bug in `SearchExperience.tsx`, `SearchSuggestions.tsx`, or the debounce
comment in `SearchExperience.tsx:45–48` (which only affects filtering, not suggestions — confirmed
by reading the component: `suggestions` is computed from `query` directly, `deferredQuery` is only
used for `results`).

**Why "enable retries locally" (the original F-003 scope) was rejected:** it would have masked this
specific race statistically without fixing it, and would equally mask a real future regression in
this same test file until retries exhausted — weakening the signal `.husky/pre-push` exists to give.

### Changes

- **`tests/e2e/search.spec.ts`** — added a `typeAndSettle(input, value)` helper that wraps the
  fill in Playwright's own `expect(...).toPass()` retry pattern (re-runs `fill()` +
  `expect(input).toHaveValue(value)` until it actually sticks, instead of firing once and hoping):

  ```ts
  async function typeAndSettle(input: Locator, value: string) {
    await expect(async () => {
      await input.fill(value);
      await expect(input).toHaveValue(value);
    }).toPass({ timeout: 5000 });
  }
  ```

  Applied at the 4 call sites that `.fill()` immediately after `search.goto()` (the only ones
  susceptible to the hydration race): "typing filters results instantly and shows suggestions",
  "selecting a suggestion via keyboard...", "a query with no matches shows the empty state...", and
  "Escape closes the suggestions list".
- No application code touched — `SearchExperience.tsx`, `SearchInput.tsx`, and
  `playwright.config.ts`'s `retries` setting are all unchanged. This is deliberately a test-only fix
  for a test-timing race, not a product change.

### Acceptance Criteria

- [x] Root cause reproduced with direct evidence (not assumed) before any fix was written.
- [x] `typeAndSettle` helper added to `tests/e2e/search.spec.ts`, replacing the 4 susceptible
      `.fill()` call sites.
- [x] Re-ran the same 30-concurrent-load stress scenario that reproduced the original failure — 0
      failures across 3 repeated full-suite runs (chromium + firefox + webkit together).
- [x] Full existing suite still passes with no new regressions.
- [x] No application code changed — fix is scoped to the test file only.

---

## Story 7 (F-018)

As a visitor browsing the homepage

I want to see all of the directory's categories, not just a curated few

So that I can find services I need without already knowing which category they're filed under —
raised directly by the project owner 2026-07-31 ("i am looking for a professional way where people
are able to see the different types of categories as its finding difficult to see the categories").

### Root cause (investigated 2026-07-31)

`features/homepage/PopularCategories.tsx` calls `categoryRepository.getFeatured()`, which filters
`data/categories.json` on `Category.featured === true`. Of the directory's 21 categories, only 3
currently carry that flag (`Tutoring & Education`, `Driving Instructors`, `JP Services`) — the flag
was set once, early, and never revisited as Sprint 15 alone added 6 new categories. The remaining
18 categories are structurally unreachable from the homepage. Layout compounds this: even the 3
shown render in a static `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4` with no way to reveal
more without leaving the section.

Checked for hidden coupling before proposing removal: `lib/services/featuredContentService.ts`
(the Sprint 6 cross-content "Featured Content" spotlight) aggregates only `Event`, `Promotion`, and
`Announcement` — `Category` was never part of it, so removing `Category.featured` doesn't touch
that mechanism. `Promotion.featured` is a separate schema/purpose and stays untouched.
`Business.featured` (card badge + homepage "Featured Businesses" section) and
`Event`/`Announcement.featured` are also untouched — out of scope, not requested.

### Proposed approach

**1. Remove `Category.featured` entirely** (project owner's explicit decision, 2026-07-31: the
flag stops being a useful homepage curation mechanism once there are 21 categories, and its only
remaining consumer is the section being redesigned here):

- `types/category.ts` — drop the `featured?: boolean` field.
- `scripts/lib/validation.ts` — drop `featured: z.boolean().optional()` from `categorySchema`.
- `data/categories.json` — remove the `"featured"` key from all 21 records.
- `lib/repositories/categoryRepository.ts` — delete `getFeatured()` from the `CategoryRepository`
  interface and `JSONCategoryRepository`; `getAll()` (already exists, sorted by `displayOrder`,
  unfiltered) becomes the only read path.
- `.ai/JSON_SCHEMA.md` — remove `featured` from the Category schema block and Validation Rules;
  document the removal in the Versioning section (see Assumption below on the version bump).

**2. `PopularCategories.tsx` switches to `getAll()`** and renders every category, sorted by
`displayOrder` (already the existing sort key — no new ordering concept needed).

**3. Replace the static grid with a horizontal scroll-snap carousel** — a new Client Component
(proposed: `features/homepage/CategoryCarousel.tsx`, scoped to this feature only, not a shared
`components/common/` primitive, since there's no second use case yet — per this project's
progressive-complexity principle):

- The scrollable row: `overflow-x-auto` with CSS `scroll-snap-type: x mandatory`; each
  `CategoryCard` wrapped in a `scroll-snap-align: start` element. This is real browser scrolling
  (not a JS-simulated one), so trackpad, touchscreen, and click-drag all work natively.
- Card sizing via `min-width` (proposed starting point: ~160px mobile / ~200px desktop, 16px gap —
  adjustable during visual review, not a hard requirement), so however many fit responsively show —
  no hardcoded "5 at a time." On narrow viewports the last visible card is deliberately cut off at
  the edge as a scroll affordance.
- Two real `<button>` arrow controls (not `<div>`s), each calling
  `container.scrollBy({ left: ±delta, behavior: "smooth" })` via a ref. Each has an `aria-label`
  ("Scroll categories left"/"right") and disables + visually dims when already at that end (tracked
  via a scroll listener comparing `scrollLeft` against `0` / `scrollWidth - clientWidth`).
- The scroll container itself gets `tabIndex={0}` so it's keyboard-focusable and native arrow-key
  scrolling works in addition to the buttons.
- Optional: a subtle edge fade/gradient mask hinting there's more content, matching the
  Airbnb/Linear-style reference the project owner's own design philosophy already cites
  (`.ai/CLAUDE.md`'s Design Philosophy section).
- Explicitly rejected: hover-triggered auto-scroll (the project owner's original suggestion) — no
  touch-device equivalent, not keyboard-accessible, and prone to feeling accidental rather than
  deliberate. Flagged and discussed with the project owner before writing this spec.

### Assumptions (confirm before implementing)

- **Schema version bump:** `.ai/JSON_SCHEMA.md`'s Versioning section has bumped `schemaVersion` for
  every prior schema change (1.2.0 through 1.5.0), including additive ones. Removing a field is
  itself a schema change — proposed as `1.6.0`, documented with the same
  before/after-and-why format as the existing entries. Flag if the project owner wants this treated
  differently since it's a removal, not an addition.
- **Component scope:** `CategoryCarousel` is proposed as `features/homepage`-local, not a shared
  primitive, since nothing else in the codebase currently needs horizontal scroll-snap (confirmed —
  no existing carousel pattern found anywhere in `components/` or `features/`). If a second use case
  shows up later, extracting a shared version then is cheap; building one now would be premature.
- **Exact card min-width/gap values** are a starting proposal, not a locked spec — expected to be
  tuned during implementation against the real `CategoryCard` component and real category names
  (some, like "TV & Home Entertainment Installation," are long).

Acceptance Criteria

- [x] `Category.featured` removed from `types/category.ts`, `scripts/lib/validation.ts`'s
      `categorySchema`, and every one of the 21 records in `data/categories.json` — confirmed via
      `npm run validate:data` passing with the field fully absent (a `strictObject` schema, so a
      leftover `featured` key on any record would fail validation, not silently pass).
- [x] `CategoryRepository.getFeatured()` deleted from the interface and implementation; confirmed
      no other caller referenced it before deletion (only `PopularCategories.tsx` did, per the
      2026-07-31 audit above).
- [x] `PopularCategories.tsx` renders all 21 categories (via `getAll()`), sorted by `displayOrder`,
      inside the new carousel.
- [x] Horizontal scroll works via native trackpad/touch/drag (scroll-snap), settling cleanly on a
      card boundary rather than a mid-card position.
- [x] Left/right arrow buttons are real, keyboard-focusable `<button>` elements with distinct
      `aria-label`s, and each disables (visually + `aria-disabled`) at its respective end.
- [x] Verified visually at mobile (375px), tablet (768px), and desktop (1280px) widths via
      Playwright screenshots — narrower viewports show a partial "peek" of the next card as a
      scroll affordance, not a hard cutoff at exactly the container edge.
- [x] `CategoryCard`'s own visual design is unchanged — only the container/scroll mechanics around
      it change.
- [x] `.ai/JSON_SCHEMA.md` updated: `featured` removed from the Category schema block and
      Validation Rules, `schemaVersion` bumped to `1.6.0`, documented in Versioning.
- [x] Existing Playwright suite passes; new coverage added confirming all 21 categories are present
      (not just 3) and that the arrow buttons scroll and correctly disable at each end.

F-018 implemented and verified (2026-07-31):

**Removal** — `Category.featured` dropped from `types/category.ts`, `scripts/lib/validation.ts`'s
`categorySchema`, `scripts/lib/csv.ts`'s `categories` field map, `scripts/seed-generate.ts`'s
`generateCategories`, and all 21 records in `data/categories.json` (stripped via a verified
byte-exact `json.dumps` round-trip, not hand-edited). `categoryRepository.getFeatured()` deleted
from the interface and implementation; its two unit tests removed
(`categoryRepository.test.ts`). `scripts/admin.test.ts`'s `toggleField` "flips a boolean field"
test — which exercised `categories.featured` — was rewritten against `businesses.featured` instead,
since categories no longer have any boolean field to toggle. `.ai/JSON_SCHEMA.md` and
`data/metadata.json` bumped to schema `1.6.0`.

**New component** — `features/homepage/CategoryCarousel.tsx` (Client Component): scroll-snap row
(`overflow-x-auto`, `snap-x snap-mandatory`) plus two real `<Button>` arrow controls.
`PopularCategories.tsx` switched from `getFeatured()` to `getAll()` and renders the carousel
instead of the old static grid. Added a `scrollbar-hide` Tailwind `@utility` to `app/globals.css`.

**Two real bugs found and fixed during implementation (not just declared done from the plan):**

1. **Chrome silently drops `behavior: "smooth"` programmatic scrolls on `scroll-snap-type:
   mandatory` containers once the user has made any real scroll gesture on it.** Reproduced
   directly: after one real scroll, every subsequent `scrollTo`, `scrollBy`, and `scrollIntoView`
   call with `{behavior: "smooth"}` silently no-opped — confirmed via direct JS evaluation in a
   live browser, not assumed. Temporarily disabling `scroll-snap-type` during the call didn't help
   either. Fixed by switching the button-triggered jump to instant scrolling
   (`element.scrollIntoView({inline: "start", block: "nearest"})`, no `behavior` option); native
   trackpad/touch/drag scrolling is unaffected and stays smooth via the browser's own momentum —
   only the button click's jump is instant. Verified with real clicks (including rapid repeated
   clicks) reaching both ends reliably afterward.
2. **A single mount-time `updateEdges()` measurement could permanently disable the right
   button before any real scrolling happened.** If `scrollWidth` hadn't fully settled at the exact
   moment the initial `useEffect` ran, `atEnd` could wrongly compute `true`; since a disabled
   native `<button>` can't dispatch the `scroll` event `updateEdges` otherwise relies on to
   re-check itself, this was a permanent stuck state, not a transient one. Caught via a genuinely
   failing Playwright test (not assumed) — the failure snapshot showed "Electrical" still as the
   first item while the right button was already `[disabled]`. Fixed with a `ResizeObserver` on
   the scroll container so edges re-measure on any real size change, not just once at mount.

**Verification:**

- `npm run validate:data`, `npm run typecheck`, `npm run lint` — all pass.
- `npx vitest run` — 212/215 pass; the 3 failures are pre-existing and unrelated (confirmed by
  reproducing identically with this Feature's changes `git stash`-ed out) — `promotionRepository
  .test.ts`/`announcementRepository.test.ts` date-mocking tests, flagged separately below, not
  part of this Feature.
- `npx playwright test` — 284 passed, 16 skipped, 0 failed, including the new
  `tests/e2e/homepage.spec.ts` "Popular categories shows every category..." test (stable across
  9 repeated runs, 3 browsers × 3 repeats).
- Manually verified via a temporary local dev server and real browser interaction (not just
  automated assertions): clicked through the full 21-category range in both directions, confirmed
  correct disable/enable at both ends, confirmed native trackpad/wheel scrolling, confirmed
  `/category/*` links still resolve correctly from carousel cards.
- Visually verified at mobile (375px), tablet (768px), and desktop (1280px) via real Playwright
  screenshots — consistent card styling, correct arrow states, proper edge-peek affordance.

**Flagged, not part of this Feature:** the pre-existing `promotionRepository.test.ts`/
`announcementRepository.test.ts` date-mocking failures noted above are a separate, real issue
worth a dedicated look — not touched here since they're unrelated to categories.

---

## Story 8 (F-019)

As the project owner

I want F-018's `CategoryCarousel` reviewed for correctness before it's considered final

So that real bugs surfaced by a code review are fixed with the same rigor as the original Feature,
not left as known issues — raised via a `/code-review`-style pass requested directly in-session
2026-08-01, immediately after F-018 shipped.

### Findings (all in `features/homepage/CategoryCarousel.tsx`)

1. **Keyboard focus loss on the arrow buttons.** Both arrows used the native `disabled` attribute.
   A native `disabled` element is dropped from the tab order and blurred by the browser the moment
   it becomes disabled — so a keyboard user Tab-ing to, say, the right arrow and activating it
   repeatedly would have focus silently ejected from the carousel (usually to `<body>`) the instant
   they reached the last category, breaking the WCAG "Focus order" requirement `.ai/CLAUDE.md`'s
   Accessibility section calls out. Not caught by the existing Playwright test, which only uses
   `.click()`, never keyboard Tab navigation.
2. **Fragile `offsetLeft`/`scrollLeft` coordinate coupling.** `scroll()`'s card-targeting logic
   compared `item.offsetLeft` directly against `el.scrollLeft`. `offsetLeft` is measured relative to
   the nearest *positioned* ancestor — since the scroll row itself had no `position` class, that was
   the outer `relative` wrapper two levels up, not the scroll row. The two coordinate frames only
   lined up because the wrapper had zero padding/border and the scroll row was its only in-flow
   child — a later padding/margin change anywhere in that chain would have silently sent the arrow
   buttons to the wrong card with no error.
3. **`ResizeObserver` blind spot.** The observer watched only the scroll container `el`'s own box.
   `ResizeObserver`'s default box tracks the *target's own* content-box size, not a descendant
   changing width/height without changing `el`'s own box — exactly the "content still settling"
   scenario the surrounding comment described trying to fix.
4. **Initial-render disabled-state flash.** `atEnd` defaulted to `false` before the first real
   measurement ran, so the right arrow briefly rendered enabled/clickable even in a hypothetical
   state where all categories already fit without scrolling.

### Fixes

1. Both `<Button>`s now pass `disabled={atStart|atEnd}` **and** `focusableWhenDisabled` — a prop
   the underlying `@base-ui/react/button` primitive already provides for exactly this pattern: it
   renders `aria-disabled`/`data-disabled` instead of the native `disabled` attribute, keeps the
   button focusable/tabbable, and its own `onClick`/`onKeyDown` handlers already no-op when
   `disabled` is true — no custom guard code needed. Dimmed styling moved from the (no longer
   present) `disabled:` Tailwind variant to `aria-disabled:opacity-50 aria-disabled:pointer-events-none`,
   matching the `aria-invalid:` pattern already used elsewhere in `buttonVariants`.
2. Added `relative` to the scroll row's own className, making it the explicit `offsetParent` for its
   children — `item.offsetLeft` and `el.scrollLeft` now share a coordinate frame by construction,
   not by an incidental layout coincidence.
3. The `ResizeObserver` now also observes `el.lastElementChild` in addition to `el` itself, so a
   content-driven `scrollWidth` change that doesn't resize the container's own box still triggers a
   re-measure.
4. `atEnd`'s initial `useState` value changed from `false` to `true` — fails toward "nothing to
   scroll to" rather than a momentarily-clickable-but-broken affordance.

Acceptance Criteria

- [x] Arrow buttons remain keyboard-focusable at both scroll boundaries (verified via source
      inspection of `@base-ui/react/button`'s `useFocusableWhenDisabled`: `aria-disabled` is set,
      the native `disabled` attribute is not, and `onClick`/`onKeyDown` both check `disabled` and
      no-op — confirmed by reading the library source directly, not assumed from the prop name).
- [x] `scroll()`'s card-targeting math no longer depends on incidental zero-offset layout between
      the scroll row and its positioned ancestor.
- [x] `ResizeObserver` re-measures on a content-only size change, not just a container-box change.
- [x] No incorrect disabled-state flash on mount.
- [x] `npm run typecheck` — passes (confirms `focusableWhenDisabled` is a valid, typed prop).
- [x] `npx eslint features/homepage/CategoryCarousel.tsx` — clean.
- [x] `npx vitest run` — 212/215 pass; same 3 pre-existing, unrelated `promotionRepository`/
      `announcementRepository` date-mocking failures as F-018, untouched by this change.
- [x] `npx playwright test -g "Popular categories"` — 9/9 pass across chromium, firefox, and
      webkit, including the click-through-to-both-ends assertions on `toBeDisabled()`/
      `toBeEnabled()` — confirming Playwright correctly reads the new `aria-disabled`-based state
      and that arrow navigation still lands on the right cards after the `relative` positioning
      change.

F-019 implemented and verified (2026-08-01). Only `features/homepage/CategoryCarousel.tsx` changed
— no other files touched.

---

## Story 9 (F-020)

As the project owner

I want every promotion card in the "Akuna Vista residents-only promotions" section to render the
same size regardless of its title's length

So that the section looks consistent instead of some cards appearing taller than others with the
"View business" button landing in a different spot per card — raised directly 2026-08-01 ("the
heading number of lines is not capped and hence its going to one line for some and two lines for
some and because of that the view business section size is different for different promotions").

### Root cause (investigated 2026-08-01)

`components/cards/PromotionCard.tsx`'s `CardTitle` rendered `promotion.title` with no line-clamp
(`CardDescription` two lines below it already had `line-clamp-2`). Real title lengths in
`data/promotions.json` range from 16 characters ("Free Demo Lesson") to 77 characters ("Mention
AV10 to receive 10% off Paint Protection Packages — AV Residents Only") — at `lg:grid-cols-3` card
width the longer titles wrap to 2–3 lines while short ones fit on one. `Card`
(`components/ui/card.tsx`) is a `flex flex-col`, and CSS Grid's default `align-items: stretch`
equalizes card height only *within the same row* — so a row containing a long title stretches every
card in that row taller, while a row of short titles stays compact, producing exactly the
inconsistent-size symptom reported.

### Fix

- `components/cards/PromotionCard.tsx`: `CardTitle` now has `line-clamp-1` (fixing header height
  regardless of title length) plus a native `title={promotion.title}` attribute, so the full text
  is still available as a hover/focus tooltip when truncated — mitigating the trade-off that the
  77-character title now truncates hard in the visible line.
- `.ai/JSON_SCHEMA.md`'s Promotion Schema section: added a note recommending `title` stay to
  roughly 40 characters or fewer, since it now renders `line-clamp-1` in the homepage card.
- Claude Code project memory: added a note (and `MEMORY.md` index entry) so this constraint
  surfaces automatically in future sessions doing promotion data entry, not only when a contributor
  happens to check `.ai/JSON_SCHEMA.md`.

Acceptance Criteria

- [x] `PromotionCard`'s title renders on exactly one line regardless of length, with the full title
      available via a `title=` tooltip.
- [x] `.ai/JSON_SCHEMA.md`'s Promotion Schema documents the practical length recommendation this
      creates for future data entry.
- [x] The same guidance is captured in Claude Code's project memory so it surfaces in future
      sessions without requiring a contributor to already know to check the schema doc.
- [x] `npm run typecheck`, `npx eslint components/cards/PromotionCard.tsx` — pass/clean.

F-020 implemented and verified (2026-08-01).

---

## Story 10 (F-021)

As the project owner

I want F-020's card-sizing fix applied everywhere the same shape occurs, not just `PromotionCard`

So that every grid of cards across the site looks consistent, not just the one section that
happened to get reported first — raised directly 2026-08-01 ("can we do something to make view
details button all aligned?" for `BusinessCard`, then "rather than fixing card in this scenario can
you please ensure this card fix across everywhere follows the same standard").

### Survey (every component in `components/cards/`)

| Component | In a grid? | Needed the fix? |
|---|---|---|
| `BusinessCard.tsx` | Yes — `FeaturedBusinesses`, `BusinessDirectory`, `SearchExperience` | Yes — original report (footer button misaligned) |
| `EventCard.tsx` | Yes — `CommunityEvents` | Yes — same variable-height symptom, no footer button but still inconsistent card sizes |
| `FeaturedContentCard.tsx` | Yes — `FeaturedContent` (Sprint 6 cross-content spotlight) | Yes — same as `EventCard` |
| `PromotionCard.tsx` | Yes — `Promotions` | Already fixed in F-020 — the reference standard |
| `AnnouncementCard.tsx` | **No** — `Announcements.tsx` renders a stacked single-column list, not a grid | No — no sibling row to misalign against |
| `CategoryCard.tsx` | Yes (carousel) but no `CardTitle`/`CardDescription` pair, just a short centered name | No — different shape, already handled by F-018/F-019 |
| `StatisticCard.tsx` | Yes but no title/description text at all | No — not applicable |

Considered baking the clamp into the shared `CardTitle`/`CardDescription` primitives
(`components/ui/card.tsx`) instead of repeating it per card component — rejected, since those
primitives are also used in non-grid, single-item contexts (business/event detail pages) where
truncating would be wrong. The clamp stays at each grid-card call site, matching F-020's precedent.

`BusinessCard` also has a conditionally-rendered address row (`business.address?.suburb`, present
on only 6 of 34 businesses) that the line-clamp can't fix, since there's nothing to truncate — the
row is either present or fully absent. Explicitly decided to leave this as-is: it's a much smaller,
rarer contributor (6/34 records) than the title/description variance that was the main problem, and
reserving empty space for a "location" line on a card with no location would look like a rendering
glitch.

### Fix

`CardTitle` → `line-clamp-1` + a native `title=` tooltip for the full text, `CardDescription` →
`line-clamp-2`, applied identically to `BusinessCard.tsx`, `EventCard.tsx`, and
`FeaturedContentCard.tsx`.

Acceptance Criteria

- [x] `BusinessCard`, `EventCard`, `FeaturedContentCard` all render a fixed-height header/
      description block regardless of content length, matching `PromotionCard`'s existing pattern.
- [x] `AnnouncementCard`, `CategoryCard`, `StatisticCard` deliberately left unchanged, with the
      reasoning captured above.
- [x] `npm run typecheck` — passes.
- [x] `npx eslint` on all three changed card components — clean.
- [x] `npx playwright test tests/e2e/homepage.spec.ts tests/e2e/directory.spec.ts
      tests/e2e/search.spec.ts` (chromium) — 24/25 pass; the 1 failure is the pre-existing NSW
      Transport API 429 rate-limit flake in the Transit widget test, unrelated to card changes.

F-021 implemented and verified (2026-08-01).

---

## Story 11 (F-022)

As the project owner

I want the "Featured businesses" section capped at 6, and to be pushed back on adding a 7th until
one is removed

So that the section doesn't grow unbounded as more businesses get marked featured over time —
raised directly 2026-08-01 ("can you please ensure the featured business is only 6 numbers max in
the Featured businesses section... in future ensure there is only 6 in feature if i come add a new
one always push back saying only 6 is allowed until you remove one we cant add another").

### Root cause

`businessRepository.getFeatured()` returned every business with `featured: true` — 9 of 34 at the
time of the report — straight into `FeaturedBusinesses.tsx`'s grid, with no cap anywhere in the
chain.

### Fix

- `data/businesses.json`: un-featured the 3 businesses beyond the first 6 in file order (project
  owner's explicit decision — "pick the first 6 in file order and remove everything"): Praful
  Saparia (NSW JP), Anjul (JP), Ethiquity Mortgage Services.
- `features/homepage/FeaturedBusinesses.tsx`: added `FEATURED_BUSINESSES_LIMIT = 6` and slices to
  it — a defensive display-layer cap, kept separate from `businessRepository.getFeatured()` itself
  since that method is also used by `CommunitySpotlight.tsx` (which only ever takes `[0]`, so
  changing the repository's own contract would have a wider blast radius than this Feature needs).
- `scripts/lib/validation.ts`: new `validateFeaturedBusinessCap()`, wired into `validateAllData()`
  alongside `validateReferentialIntegrity()` — a genuine hard-fail rule (not just a conversational
  reminder) so `npm run validate:data` — and therefore Husky pre-commit and CI per F-006's
  guardrails — rejects a 7th `featured: true` business regardless of who or what edits the data
  (by hand, `scripts/admin.ts`, or a future session that's never seen this conversation). Deliberately
  not part of `businessSchema` since a single record can't know how many *other* records are also
  featured — this is a cross-record, whole-file check, the same category as
  `validateReferentialIntegrity`.
- Claude Code project memory: added a note (and `MEMORY.md` index entry) as the conversational-level
  companion to the hard validation rule.

Acceptance Criteria

- [x] "Featured businesses" shows at most 6 businesses.
- [x] `data/businesses.json` has exactly 6 `featured: true` businesses.
- [x] `npm run validate:data` fails with a clear message (which businesses are over the cap) if a
      7th business is ever marked `featured`.
- [x] `npm run typecheck`, `npx eslint` — pass/clean.
- [x] `npx vitest run scripts/lib/validation.test.ts lib/repositories/businessRepository.test.ts` —
      new `validateFeaturedBusinessCap` tests (passes at exactly 6, flags 7+, ignores non-featured
      records) all pass, plus the full suite still shows only the 3 pre-existing, unrelated
      `promotionRepository`/`announcementRepository` date-mocking failures.
- [x] Claude Code memory captures the "push back on a 7th" instruction for future sessions.

F-022 implemented and verified (2026-08-01).

---

## Story 12 (F-023)

As the project owner

I want F-021/F-022 reviewed for correctness before they're considered final, and the findings fixed

So that real bugs surfaced by a code review are fixed with the same rigor as the original work —
raised via `/code-review` requested directly in-session 2026-08-01, then "please go ahead and make
all the recommended fixes."

### Findings and fixes

1. **`validateFeaturedBusinessCap` wasn't reachable from `scripts/admin.ts`'s own write path.**
   It was wired only into `validateAllData()` (`npm run validate:data` / Husky pre-commit / CI), not
   into `validateArrayRecords()`, which is what `addRecord`/`updateRecord`/`toggleField` actually
   call — so `npm run admin:data -- toggle --file businesses --field featured`, the exact tool built
   for this, could silently write a 7th featured business and report success, only caught later at
   the next `npm run validate:data` or `git commit`. Fixed with a new `validateWrite()` helper in
   `scripts/admin.ts` that runs `validateArrayRecords` plus a per-file `CROSS_RECORD_CHECKS` map
   (currently just `businesses: validateFeaturedBusinessCap`), reused by all three write functions —
   a check added to that map now applies everywhere automatically, rather than needing to be wired
   into 3 call sites individually or only into `validateAllData()`. Regression test added
   (`scripts/admin.test.ts`, "rejects toggling a 7th business featured, writing nothing").
2. **The 6-business cap was duplicated as two independent constants** —
   `MAX_FEATURED_BUSINESSES` in `scripts/lib/validation.ts` and `FEATURED_BUSINESSES_LIMIT` in
   `features/homepage/FeaturedBusinesses.tsx` — with nothing keeping them in sync if the cap ever
   changes. Direct violation of `.ai/CLAUDE.md`'s "Don't Repeat Yourself" rule. Fixed by extracting
   a single `MAX_FEATURED_BUSINESSES` constant into new `lib/constants/business.ts`, imported by
   both — `scripts/**` never imports from `@/` and app code never imports from `scripts/**`, so
   `lib/` (not `scripts/lib/`) is the one location both sides can reach.
3. **`line-clamp-2` alone doesn't fully equalize card heights.** It caps the *maximum* at 2 lines
   but doesn't force a *minimum* — a 1-line-rendering description still leaves its card one line
   shorter than a sibling whose description wraps to the full 2 lines, a smaller version of the
   original F-020/F-021 bug. Fixed by adding `min-h-10` (≈2 lines at `text-sm`) alongside
   `line-clamp-2` on `CardDescription` in `PromotionCard.tsx`, `BusinessCard.tsx`, `EventCard.tsx`,
   and `FeaturedContentCard.tsx` — reserving the clamp's max as fixed space, not just capping it.
4. **`title=` tooltip is not a reliable affordance for touch/mobile-only users** (no hover) once a
   title truncates. Considered and deliberately left as-is: the full text is already in the DOM/
   accessibility tree regardless of the visual `line-clamp` (screen readers read the complete text,
   unaffected), so the real gap is narrower than initially flagged — sighted, touch-only users lose
   the tail of a truncated title with no way to reveal it. This is the same trade-off already
   reviewed and accepted for `PromotionCard` in F-020, now just extended to 3 more components by
   F-021; fixing it properly (e.g. tap-to-reveal) is a real UX feature addition, not a mechanical
   fix, so it's flagged here rather than designed and shipped without its own spec.

Acceptance Criteria

- [x] `scripts/admin.ts`'s `toggleField`/`updateRecord`/`addRecord` all reject a write that would
      exceed `MAX_FEATURED_BUSINESSES`, not just `npm run validate:data`.
- [x] `MAX_FEATURED_BUSINESSES` has exactly one definition (`lib/constants/business.ts`), imported
      by both `scripts/lib/validation.ts` and `features/homepage/FeaturedBusinesses.tsx`.
- [x] Every `CardDescription` using `line-clamp-2` (`PromotionCard`, `BusinessCard`, `EventCard`,
      `FeaturedContentCard`) also reserves `min-h-10` so short descriptions don't leave their card
      shorter than a sibling's.
- [x] Finding 4 (title tooltip touch accessibility) explicitly triaged and left unfixed, with
      reasoning, rather than silently dropped or redesigned without a spec.
- [x] `npm run typecheck`, `npx eslint .` (whole repo) — pass/clean.
- [x] `npx vitest run` — 219 tests, 216 pass; same 3 pre-existing, unrelated
      `promotionRepository`/`announcementRepository` date-mocking failures as every prior Feature
      this sprint.
- [x] `npx playwright test tests/e2e/homepage.spec.ts tests/e2e/directory.spec.ts
      tests/e2e/search.spec.ts` (chromium) — 25/25 pass.

F-023 implemented and verified (2026-08-01).

---

## Story 13 (F-024)

As the project owner

I want `tests/e2e/search.spec.ts`'s suburb-chip test to assert against a suburb that's actually
still empty

So that the test suite reflects real data instead of an assumption that went stale the moment a
real business started serving that suburb — surfaced when running the full suite after sprint-15's
F-033 (Tallawong: KS Webwear).

### Root cause (investigated 2026-08-01)

"a suburb chip with zero real businesses does not render" (`tests/e2e/search.spec.ts:98`) hardcodes
Tallawong as its zero-business example, with a comment explaining why: chips are computed from real
content, and Tallawong had no matching business at the time the test was written (Sprint 09b
F-001). Sprint 15's F-033 gave KS Webwear `serviceAreas: ["Tallawong"]`, so the suburb chip now
legitimately renders — the test failure (`[chromium]` and `[webkit]`, both deterministic, not the
usual single-browser timing flake) is correctly catching that its fixture assumption is outdated,
not a real regression in the chip-filtering logic itself.

Checked `data/suburbs.json` against every business's `address.suburb` and `serviceAreas` — Box Hill
and Kellyville are the only two suburbs left with zero matching businesses.

### Fix

- `tests/e2e/search.spec.ts`: swap the test's suburb from `"Tallawong"` to `"Box Hill"`, and update
  the explanatory comment to match (why the zero-business example changed, not just what it is).

Acceptance Criteria

- [x] The suburb-chip test asserts against Box Hill, not Tallawong.
- [x] The test's comment explains why Box Hill replaced Tallawong as the zero-business example.
- [x] `npx playwright test tests/e2e/search.spec.ts` — passes on all projects.

F-024 implemented and verified (2026-08-01).

---

## Story 14 (F-025)

As the project owner

I want the homepage's "Businesses listed" and "Categories covered" stats to reflect the real
current counts

So that they don't silently go stale every time a business or category is added or removed —
raised directly 2026-08-01 ("Businesses listed and Categories covered numbers are also hardcoded
along with the Community members which i am okay to be hardcoded but i would want the other two to
change based on the number of real business and category").

### Root cause (investigated 2026-08-01)

`features/homepage/CommunityStatistics.tsx` reads all three stats from `metadataRepository.get()`,
which is just `data/metadata.json` returned verbatim (`JSONMetadataRepository` in
`lib/repositories/metadataRepository.ts` — no computation, a static read). `totalBusinesses: 19` and
`totalCategories: 12` were accurate on 2026-07-15 (`metadata.json`'s `lastUpdated`) but the
directory now has far more of both after sprint-15's data-entry Features — nothing recomputes these
fields when `businesses.json`/`categories.json` change, and `npm run validate:data`
(`scripts/lib/validation.ts`) only checks they're non-negative integers, not that they match reality.
`communityMembers` (800) has no equivalent real-data source — it's a manual resident-count figure,
correctly left as project-owner-maintained per this Feature's explicit direction.

### Fix

- `features/homepage/CommunityStatistics.tsx`: replace `metadata.totalBusinesses` and
  `metadata.totalCategories` with live counts — `(await businessRepository.getAll()).length` and
  `(await categoryRepository.getAll()).length` — imported from `lib/repositories/businessRepository`
  and `lib/repositories/categoryRepository` (both already used elsewhere in the codebase, no new
  repository methods needed). `metadata.communityMembers` is unchanged.
- `data/metadata.json`'s `totalBusinesses`/`totalCategories` fields and their `Metadata` type entries
  are left in place (not removed) — they're now unused by this component, but removing the schema
  fields is a separate, broader decision than what this Feature asked for; flagging here so it's not
  quietly forgotten.

Acceptance Criteria

- [x] "Businesses listed" on the homepage equals `data/businesses.json`'s array length exactly
      (verified live: 51).
- [x] "Categories covered" on the homepage equals `data/categories.json`'s array length exactly
      (verified live: 25).
- [x] "Community members" is unchanged — still reads `metadata.communityMembers` (verified: 800+).
- [x] Adding or removing a business/category and re-rendering the homepage changes the displayed
      count accordingly — implied by reading `.length` from the repositories' live `getAll()` results
      each request rather than a cached/static field; no caching layer sits in front of it.
- [x] `npm run typecheck`, `npx eslint features/homepage/CommunityStatistics.tsx` — pass/clean.
- [x] Existing Playwright suite still passes (284 passed, 16 skipped, 0 failed — no regressions).
      `npx vitest run` — 216 passed, 3 failed, the same pre-existing unrelated
      `promotionRepository`/`announcementRepository` date-mocking failures documented in F-023.

F-025 implemented and verified (2026-08-01).

---

## Story 15 (F-026)

As the project owner

I want the 2 confirmed findings from F-025's `/code-review` fixed

So that the misleading comment doesn't confuse a future reader and the homepage doesn't do
redundant work on every request — the review's 3rd finding (Promise.all pairing duplicated across
4 files) is a maintainability-only flag, not fixed here since it wasn't part of what the project
owner asked to fix ("fix the recommended").

### Fixes

1. **`tests/e2e/search.spec.ts`'s comment claimed Box Hill was picked as the suburb with "the
   next-lowest displayOrder."** `Suburb` has no `displayOrder` field — that's Category-only.
   Corrected the comment to state the true reasoning: Box Hill and Kellyville were the only two
   zero-business suburbs found, and Box Hill was picked because it comes first in
   `data/suburbs.json`.
2. **`categoryRepository.getAll()` was called a 3rd time per homepage render** (already called by
   `PopularCategories.tsx` and `FeaturedBusinesses.tsx`), each call re-allocating and re-sorting the
   full array. Wrapped the *exported singleton's* `getAll()` in `React.cache()`
   (`lib/repositories/categoryRepository.ts`) so the 3 calls collapse to 1 per request. Deliberately
   left `JSONCategoryRepository` itself untouched — `categoryRepository.test.ts` constructs it
   directly with injected fixtures, so wrapping only the singleton export means those tests are
   unaffected by the caching change.

Acceptance Criteria

- [x] The suburb-chip test's comment no longer references a nonexistent `Suburb.displayOrder`
      field, and accurately explains why Box Hill was chosen.
- [x] `categoryRepository`'s exported singleton dedupes `getAll()` calls within a single request via
      `React.cache()`; `JSONCategoryRepository` construction/behavior is otherwise unchanged
      (`categoryRepository.test.ts` untouched, imports the class directly).
- [x] `npm run typecheck`, `npx eslint .` — pass/clean.
- [x] `npx vitest run` — 214 passed, 5 failed; none touch `categoryRepository` or anything changed
      here. All 5 are pre-existing date-boundary fixture fragility in `eventRepository`/
      `promotionRepository`/`announcementRepository` (hardcoded fixture dates like
      `endDate: "2026-08-01..."` relative to real `Date.now()`) — grew from the previously
      documented 3 to 5 because the real calendar date rolled from 2026-08-01 to 2026-08-02 between
      F-023 and this Feature, flipping more fixture dates from "future" to "past". Confirmed
      unrelated by inspecting the failing files directly; none import or exercise
      `categoryRepository`.
- [x] `npx playwright test` (full suite) — 284 passed, 16 skipped, 0 failed.
- [x] Manual check: homepage stats still render correctly (51 / 25 / 800+) with the cached
      repository.

F-026 implemented and verified (2026-08-02).

---

# Consolidated Backlog Items (F-007–F-017)

Added 2026-07-17 at the project owner's explicit request: **every genuinely-still-open item found
scattered across `.ai/TODO.md`'s Backlog section and individual sprints' `retrospective.md` Carry
Forward tables, consolidated here so this folder is the single place to check when planning what's
left**, rather than that context staying spread across 8+ separate files. Each entry below is
deliberately lighter-weight than F-001–F-006's full Story treatment — the real context, reasoning,
and history already exist in the source file cited; duplicating it in full here would just create a
second copy to keep in sync (the exact problem this whole session has been about). Follow the
source link for full detail before implementing any of these.

- **F-007 (Sentry)** — source: `.ai/TODO.md` Backlog, `sprints/sprint-09-production/retrospective.md`
  Carry Forward. Deferred 2026-07-14 by explicit project-owner choice, not a technical blocker.
- **F-008 (2 held-out events)** — source: `.ai/TODO.md` Backlog, `sprints/sprint-09b-content-cleanup/notes.md`
  F-003. Blocked purely on the project owner supplying updated dates; zero engineering work until then.
- **F-009 (business data completeness)** — source: `.ai/TODO.md` Backlog, `sprints/sprint-09b-content-cleanup/`
  F-005. Blocked purely on the project owner supplying real data; `scripts/admin.ts update` already
  exists as the tooling to apply it once supplied.
- **F-010 (Rich Results Test)** — source: `sprints/sprint-04-business-details/retrospective.md` and
  `sprints/sprint-07-quality/review.md` Carry Forward. Unlike F-008/009, this one is **not** blocked
  on anything external — the site has been publicly reachable since Sprint 9 (2026-07-09); this is
  simply a task nobody has picked up yet. **Run 2026-08-02** — see Next Steps below.
- **F-011 (screen-reader spot-check)** — source: `sprints/sprint-07-quality/retrospective.md` Carry
  Forward. Blocked on assistive-technology access in whatever environment eventually does this work
  (not available in this one).
- **F-012 (mobile LCP re-measurement)** — source: `sprints/sprint-07-quality/retrospective.md` Carry
  Forward. Not blocked — a fresh Lighthouse run against the live production URL would resolve
  whether this is still an issue after four more sprints of homepage changes. **Re-measured
  2026-08-02** — see Next Steps below.
- **F-013 (Lighthouse CI wiring)** — source: `sprints/sprint-07-quality/retrospective.md` Carry
  Forward ("reasonable Sprint 9 candidate" — verified 2026-07-17 this was never actually done;
  `lighthouse` is in `package.json` but absent from `.github/workflows/ci.yml`). **Implemented
  2026-08-02, not yet verified** — see Next Steps below.
- **F-014 (Privacy/Terms legal review)** — source: `sprints/sprint-08b-community-pages/retrospective.md`
  Carry Forward. Not an engineering task at all — needs the project owner's own legal judgement.
- **F-015 (nonce-based CSP)** — source: `sprints/sprint-09-production/retrospective.md` Carry
  Forward. Low priority; current `'unsafe-inline'` exception is documented and accepted, this is a
  hardening improvement, not a known vulnerability.
- **F-016 (real Contact form)** — source: `sprints/sprint-08b-community-pages/retrospective.md`
  Carry Forward. Explicitly "not scheduled" at the time — kept here for visibility, not urgency.
  **Spec drafted 2026-08-02 (Capture step only — Confirm still needed)**, see below and
  `.ai/DECISIONS.md` ADR-015.
- **F-017 (CODING_STANDARDS.md Scripts section)** — source: `sprints/sprint-08-admin/retrospective.md`
  Carry Forward. Purely a documentation nice-to-have, judged unnecessary when raised. **Completed
  2026-08-02** — see Next Steps below.

**Two items were found already resolved during this consolidation pass and closed out at the
source rather than carried forward here**: Sprint 08's "seed generator not run at production scale"
(moot — the real-content path was chosen instead, 27 real businesses as of 2026-07-17) and "CI's
validate-data step not exercised live" (confirmed enforced across many pushes since). Sprint 07's
"Vercel preview deployment not verified" was marked superseded (this project has no PR workflow, so
a distinct preview step was never applicable) rather than carried forward as still-open.

---

# Dependencies

- F-001: none — `line-clamp` utility is already in use elsewhere in the codebase (`PromotionCard.tsx`,
  Sprint 14 F-010), so no new dependency/utility needed.
- F-002: depends on `ci.yml`'s existing `checks`/`e2e` job names (already fixed and green as of
  commit `ba98234`) and requires a new `VERCEL_TOKEN` GitHub secret plus a Vercel dashboard change —
  not purely a code change, so implementation will need the project owner present to confirm the
  Vercel-side setting.
- F-003: raised 2026-07-16 after `git push` was blocked by `tests/e2e/search.spec.ts`'s WebKit suite
  failing intermittently under `.husky/pre-push` (each failing test passed cleanly when rerun in
  isolation). Originally scoped as "enable `retries` locally" (a mitigation, not a fix — a real
  regression would still eventually fail after retries exhaust, but so would a genuine intermittent
  bug most of the time, just less often). Re-scoped 2026-07-22 after actually reproducing the root
  cause (see Story 6/F-003 below): fixed the real race instead of papering over it with retries.
- F-004: none — purely editing existing Markdown files against evidence already gathered in the
  2026-07-17 audit; no code, schema, or infra changes involved. Independent of F-001–F-003.
- F-005: none — same profile as F-004 (docs-only), discovered as a side effect of implementing it.
  Independent of F-001–F-004.
- F-006: depends on `scripts/lib/validation.ts` (Sprint 8) as the pattern to extend for Check 3;
  Check 2's `commit-msg` hook is new territory for this repo's `.husky/` setup (currently only
  `pre-commit` and `pre-push` exist) so needs a new hook file, not just a new script. Independent of
  F-001–F-005 otherwise.
- F-007, F-015: both touch `next.config.ts`'s security headers (F-015 specifically); F-007 needs a
  new `SENTRY_DSN` secret following the `TRANSPORT_NSW_API_KEY`/`VERCEL_TOKEN` precedent (project
  owner's explicit go-ahead required before writing any new secret).
- F-008, F-009: blocked entirely on the project owner supplying content — zero engineering
  dependency, cannot start until then.
- F-010, F-011, F-012, F-013: no code dependencies; F-011 additionally needs assistive-technology
  access this environment doesn't have.
- F-014, F-016, F-017: no dependencies; F-014 isn't an engineering task at all.

---

# Documentation Required

Before starting this sprint read:

- `.ai/CLAUDE.md`
- `.ai/DESIGN_SYSTEM.md`
- `.ai/DEPLOYMENT.md` (F-002 specifically)
- `.ai/GIT_WORKFLOW.md`, `scripts/lib/validation.ts`, `.husky/pre-commit`, `.husky/pre-push`,
  `.github/workflows/ci.yml` (F-006 specifically — read the existing hook/CI/validation setup
  before adding a new `commit-msg` hook and three new scripts)

---

# Next Steps

F-004 is implemented and verified (2026-07-17) — see its Acceptance Criteria above for what changed,
the correction found along the way (sprint-06's F-005 "Community spotlight"), and the additional
scope found when the project owner asked to double-check Sprints 09/09b specifically (sprint-09's
`tasks.md`, sprint-09b's deployment-status line).

F-006 is also implemented and verified (2026-07-17) — four automated Husky/CI checks now guard
against the exact patterns F-004 found and fixed, confirmed with real dry runs against this repo's
own history (see its Acceptance Criteria above). Enforcement was confirmed hard-block everywhere,
including Check 4, at the project owner's explicit instruction overriding the original warn-only
proposal. One real pre-existing inconsistency (Sprint 04's F-009) was found and fixed while wiring
Check 3 up, and Check 1 was redesigned mid-implementation (moved from `pre-commit` to `commit-msg`,
gained a `scripts/**` exemption and a `Docs-Deferred:` escape hatch) after its first real run
flagged this sprint's own backlog notes and the guardrail scripts' own source as false positives —
full detail in the Acceptance Criteria above, not just declared done. `npm run typecheck`,
`npm run lint`, and the full `npm run test` suite (217/217) all pass with F-006 in place.

F-003 is also implemented and verified (2026-07-22) — the WebKit `search.spec.ts` flake's actual
root cause (a Next.js hydration race, not component debounce) was reproduced directly via a 30-run
concurrent-load stress script before any fix was written (see its Story above for the full
evidence). Fixed with a test-only `typeAndSettle()` retry helper in `tests/e2e/search.spec.ts` — no
application code changed. Re-verified: the same 3-browser concurrent-load scenario that originally
reproduced the failure now passes 3/3 full runs (81/81 individual tests), and the complete suite
(`npx playwright test`) passes clean at 281 passed / 16 skipped / 0 failed against a production
build (`npm run build && npm run start`).

F-018 is also implemented and verified (2026-07-31) — the homepage's "Popular categories" section
now shows all 21 categories in an accessible scroll-snap carousel instead of the old 3-category
`featured` grid, and `Category.featured` was removed project-wide (see its Acceptance Criteria
above for the full change list). Two real bugs were found and fixed along the way, not just
declared done from the original plan: a Chrome quirk that silently drops `behavior: "smooth"`
programmatic scrolls on snap containers after any real user gesture (fixed by using instant
`scrollIntoView` for button clicks; native scrolling stays smooth), and a mount-time measurement
race that could permanently disable the right arrow before any scrolling happened (fixed with a
`ResizeObserver`, caught by a genuinely failing Playwright test rather than assumed working).
`npm run typecheck`, `npm run lint`, and `npx playwright test` (284 passed / 16 skipped / 0 failed)
all pass; `npx vitest run` is 212/215 with the 3 failures pre-existing and unrelated (reproduces
identically with this Feature's changes stashed out) — flagged as a separate, real issue still
worth a dedicated look, not fixed here.

F-019 is also implemented and verified (2026-08-01) — a code-review follow-up on F-018's
`CategoryCarousel` that fixed 4 real issues: keyboard focus loss on the arrow buttons at either
scroll boundary (native `disabled` blurs a focused element; switched to Base UI's
`focusableWhenDisabled` + `aria-disabled` so the button stays tabbable), a fragile `offsetLeft`/
`scrollLeft` coordinate assumption in the scroll-to-card logic (fixed by making the scroll row its
own `offsetParent` via `relative`), a `ResizeObserver` blind spot to content-only size changes
(fixed by also observing the last card), and an initial-render disabled-state flash (`atEnd`
defaults to `true` now). `npm run typecheck`, `eslint`, `npx vitest run` (same 212/215, 3
pre-existing unrelated failures), and `npx playwright test -g "Popular categories"` (9/9 across 3
browsers) all pass. Only `CategoryCarousel.tsx` changed.

F-020 is also implemented and verified (2026-08-01) — `PromotionCard`'s title had no line-clamp,
so titles of varying length (16–77 characters in real data) wrapped to a different number of
lines per card, and CSS Grid's per-row height stretch turned that into inconsistently-sized
promotion cards. Fixed with `line-clamp-1` plus a `title=` tooltip for the full text on truncation;
`.ai/JSON_SCHEMA.md`'s Promotion Schema section and Claude Code's project memory were both updated
with a ~40-character guideline for future `title` data entry, per the project owner's explicit
request to prevent this recurring. `npm run typecheck` and `eslint` pass.

F-021 is also implemented and verified (2026-08-01) — extended F-020's `line-clamp-1`/
`line-clamp-2` standard to every other grid-rendered card with the same title+description shape:
`BusinessCard` (the original report — its "View details" button landed in a different spot per
card), `EventCard`, and `FeaturedContentCard`. A full survey of `components/cards/` confirmed
`AnnouncementCard` (stacked list, not a grid), `CategoryCard`, and `StatisticCard` (neither has this
field shape) correctly don't need it — see its Acceptance Criteria above for the reasoning.
`BusinessCard`'s conditionally-rendered address row (6/34 businesses) was deliberately left as a
minor, accepted residual difference rather than reserving space for it. `npm run typecheck`,
`eslint`, and `npx playwright test` against homepage/directory/search (24/25, 1 pre-existing
unrelated Transit-widget API flake) all pass.

F-022 is also implemented and verified (2026-08-01) — the homepage's "Featured businesses" section
had no cap and was showing all 9 businesses marked `featured`. Capped display to 6 in
`FeaturedBusinesses.tsx`, un-featured the 3 businesses beyond the first 6 in file order in the data
itself (project owner's explicit choice), and — per the project owner's explicit request to be
pushed back on rather than relying on conversational memory alone — added a real, hard-fail
`validateFeaturedBusinessCap()` rule to `scripts/lib/validation.ts`'s `validateAllData()`, so
`npm run validate:data` (and Husky pre-commit/CI per F-006) rejects a 7th featured business outright.
New unit tests cover the exactly-6/over-6/ignores-non-featured cases. Claude Code project memory
also captures the constraint. `npm run typecheck`, `eslint`, and the full `npx vitest run` (218
tests, same 3 pre-existing unrelated failures) all pass.

F-023 is also implemented and verified (2026-08-01) — a `/code-review` follow-up on F-021/F-022
that fixed 3 real issues and explicitly triaged a 4th: `validateFeaturedBusinessCap` wasn't
reachable from `scripts/admin.ts`'s own write path (fixed with a shared `validateWrite()` helper +
`CROSS_RECORD_CHECKS` map, plus a regression test), the 6-business cap was duplicated as two
independent constants in two files (fixed with a single `lib/constants/business.ts`, violating
`.ai/CLAUDE.md`'s DRY rule otherwise), and `line-clamp-2` alone doesn't force a minimum height so
short descriptions still left cards slightly uneven (fixed with `min-h-10` alongside `line-clamp-2`
on all 4 card components). The `title=` tooltip's touch-accessibility gap was considered and
deliberately left as-is — full text is already in the DOM for assistive tech regardless of the
visual clamp, and a real fix (tap-to-reveal) is a UX feature addition warranting its own spec, not
a mechanical fix. `npm run typecheck`, `eslint`, `npx vitest run` (219 tests, same 3 pre-existing
unrelated failures), and `npx playwright test` against homepage/directory/search (25/25) all pass.

F-001 was found already implemented and verified (2026-08-02) — this Feature's request (clamp
`BusinessCard`'s heading to one line) turned out to be the exact same fix F-021 shipped 2026-08-01
as part of its "same standard everywhere" survey; this row's status simply hadn't been updated to
reflect that. Re-verified directly against production (`/businesses?category=jp-services` renders
"JP – Ethiquity Mortgage…" truncated with an ellipsis). No code change — a stale-status correction,
the same pattern F-004/F-006 exist to catch.

F-005 is also implemented and verified (2026-08-02) — `.ai/ARCHITECTURE.md`'s "Monitoring" section
had Vercel Analytics lumped under "Future" alongside Sentry/Google Analytics/Microsoft Clarity,
though `app/layout.tsx` has imported `@vercel/analytics/next` (gated on `process.env.VERCEL`) since
Sprint 9. Split into "Current" (Vercel Analytics) and "Future" (the other three); no other file
touched.

F-017 is also implemented and verified (2026-08-02) — `.ai/CODING_STANDARDS.md` had no "Scripts"
section. Added one documenting the conventions already followed by all 19 files under `scripts/`:
kebab-case CLI entrypoints run via `tsx`, shared helpers camelCase in `scripts/lib/`, every
entrypoint registered as an npm script rather than invoked directly, `isMainModule()` guarding
`main()` on any entrypoint with a co-located test, and tests co-located as `<name>.test.ts` rather
than in a separate folder — derived from the actual `scripts/` folder, not invented.

F-013 is implemented but not yet verified (2026-08-02) — added a report-only Lighthouse step to the
`checks` job in `.github/workflows/ci.yml`: builds, starts the production server, polls it with
`curl` until ready, runs `npx lighthouse` against `localhost:3000`, prints each category's score to
the job log, and uploads the full JSON report as a build artifact. `continue-on-error: true` at the
step level, deliberately non-blocking per the project owner's explicit choice — no historical score
baseline exists yet to set a meaningful pass/fail threshold against. YAML validated well-formed
(`python3 -c "import yaml; yaml.safe_load(...)"`), but **not run end-to-end** — local verification
was attempted (found the repo's local `.next` build stale/broken, unrelated to this change) and the
project owner chose to skip local verification and let the first real GitHub Actions run be the
actual test instead. Stays open until a real push produces a `checks` job run with visible
Lighthouse scores in the log and a downloadable report artifact.

**Manual review (2026-08-02) found 2 real gaps, both fixed**: (1) the step's dependency on
`ubuntu-latest` shipping a preinstalled Chrome was untested and unverified — flagged as an
unresolved risk (`continue-on-error` would hide a persistent failure, not fix it) since confirming
it needs an actual CI run; (2) a silent `continue-on-error` failure had no visible signal anywhere
— fixed by giving the step `id: lighthouse` and adding a "Flag failed Lighthouse run" step
(`if: steps.lighthouse.outcome == 'failure'`) that emits a `::warning::` annotation, so a broken
report-only check now shows up in the Actions UI instead of just silently producing nothing run
after run.

F-002 is implemented but not yet verified (2026-08-02) — added a `deploy` job to `ci.yml`
(`needs: [checks, e2e]`, runs only on `push` to `main`) that deploys via `vercel pull` / `vercel
build --prod` / `vercel deploy --prebuilt --prod`, and added `vercel.json` with
`git.deploymentEnabled.main: false` (Vercel's documented mechanism, confirmed against current docs,
for disabling Git-triggered auto-deploys on a specific branch while CLI/CI-triggered deploys still
work — chosen over a dashboard setting so it's a reviewable, reversible code change).
`.ai/DEPLOYMENT.md`'s "Continuous Deployment" section updated to describe the new flow. **Blocked
on the project owner**: the `deploy` job needs `VERCEL_TOKEN`/`VERCEL_ORG_ID`/`VERCEL_PROJECT_ID`
as GitHub Actions secrets, which requires generating a Vercel token — a credential-issuing action
only the account owner should do, not something to hand to an assistant. See this Feature's
Acceptance Criteria above for the exact setup steps and the two already-known (non-secret) ID
values. Once secrets exist, a real push to `main` needs to happen to confirm the gate actually
blocks a red build and allows a green one — that push is a separate, visible action needing its own
go-ahead at the time, not assumed from the go-ahead to write this code.

**Manual review (2026-08-02) found 1 real gap, fixed**: all three `npx vercel` invocations in the
`deploy` job were unpinned, so a future Vercel CLI release could silently change deploy behavior
between one production deploy and the next with no corresponding repo change. Pinned to
`npx vercel@58` (the current major, confirmed via `npm view vercel version` → 58.4.4) across all
three steps — a deliberate major-version bump now requires its own commit rather than happening
invisibly.

**Real production gap found and fixed 2026-08-02, after the project owner pushed this Feature's
commit and reported the homepage stats (F-025) were still showing stale hardcoded values (19/12)
in production.** Root cause: the push containing this Feature's `vercel.json` was itself the push
that disabled Vercel's auto-deploy for `main` — Vercel evaluates `deploymentEnabled` from the
commit being pushed, so that same push disabled the only working deploy path *before* the
replacement (this Feature's CI `deploy` job) had its required secrets. Net effect: production had
not redeployed in 14 hours, stuck on a build from before F-025 even existed, with no path to
redeploy until the GitHub secrets are added. **This was a real design gap in this Feature, not a
hypothetical risk** — flagged too weakly in this Feature's own Acceptance Criteria above. Fixed by
running one manual `vercel deploy --prod` (using the project owner's already-authenticated local
Vercel CLI session, explicitly confirmed with them first) — verified live: homepage now shows 51
Businesses listed / 25 Categories covered, computed live, matching F-025/F-026's expected values.
**This manual deploy was a one-off — `git.deploymentEnabled.main: false` is still in effect, so
every future push to `main` needs either the GitHub secrets in place (enabling the automated
`deploy` job) or another manual `vercel deploy --prod`, until the secrets are added.**

F-010 is implemented and verified (2026-08-02) — ran Google's Rich Results Test against
`https://akuna-vista-local-directory.vercel.app/business/brar-roofing-solution` (chosen as a
business without the optional `address`/`priceRange` fields populated, to see the worst case, not
the best). Result: **2 valid items detected** (`LocalBusiness` and `Organization`), both eligible
for rich results; 2 non-critical notices flagging `priceRange` and `address` as missing, both
correctly marked "(optional)" by Google — this business's own data genuinely doesn't have those
fields set (consistent with F-021's finding that only 6/34 businesses have `address.suburb`), not
a structured-data template bug. No code change needed; conclusion is the JSON-LD template itself
is valid.

F-012 is implemented and verified (2026-08-02) — ran `npx lighthouse` (mobile form factor/screen
emulation) against `https://akuna-vista-local-directory.vercel.app` (homepage). Result: **LCP 2.58s
(2575ms)**, performance score 94/100, CLS 0.013, TBT 30ms, FCP 2.3s. This is essentially at the
2.5s target — technically ~75ms over, materially unchanged from the Sprint 7 baseline ("at/above
the 2.5s target") despite four more sprints of homepage additions (transit widget, weather widget,
card-sizing polish). Caveat: measured from this environment's network path to Vercel's edge, not a
controlled lab environment identical to Google's own Lighthouse CI infrastructure, so treat as a
real-world approximation, not a lab-precise number. Not re-optimized as part of this Feature — it
was scoped as "re-measure," not "fix"; a ~75ms overage this close to target likely doesn't warrant
new engineering work, but is flagged here rather than silently left for a future session to
rediscover.

---

## Story 17 (F-027)

As a visitor browsing categories on a touchscreen device

I want the carousel's left/right arrow buttons to be reliably tappable

So that a tap near an arrow scrolls the row instead of accidentally opening a category — raised
directly by the project owner 2026-08-02 with a screenshot of the "Popular categories" section.

### Root cause (investigated 2026-08-02)

`features/homepage/CategoryCarousel.tsx` (lines ~112–141) renders both arrows via the shared
`Button` component (`components/ui/button.tsx`) with `size="icon"`, which resolves to `size-8` —
a 32×32px box, well under the ~44×44px minimum touch target (WCAG 2.5.5 / Apple HIG). Each button
is also absolutely positioned straddling the row's edge (`left-0 -translate-x-1/2` /
`right-0 translate-x-1/2`), so only half of that already-small box sits over the carousel — the
rest overlaps the `Container` gutter immediately next to the first/last `CategoryCard`. That card
(`components/cards/CategoryCard.tsx`) is a single full-bleed `<Link>` spanning the whole column
with no inset separating it from the arrow's footprint, and the row's items are separated only by a
16px `gap-4`. A touch that lands slightly off-center from the 32px arrow — very easy on a real
finger — misses the button and hits the adjacent card's `Link` instead, navigating to that category
rather than scrolling.

### Proposed approach

Project owner confirmed (2026-08-02): expand the buttons' actual tappable area without changing how
they currently look (matches this project's minimal design philosophy — the small circular arrows
stay as-is visually).

- Restructure each arrow so the interactive `<button>` element's own box grows to at least 44×44px
  (via padding/min-size), while the existing visible chrome (the `bg-background`, `rounded-full`,
  `shadow-sm` circle) moves to an inner wrapper sized at today's visual dimensions — so the click/tap
  target is bigger than what's drawn, a standard pattern for small icon controls (e.g. `padding`
  around a visually-smaller inner glyph, similar to iOS's minimum-hit-area convention).
  - Note: simply adding padding/size directly to the current `<Button>` would also enlarge the
    visible circle, since the background/border/shadow classes are on that same element — the inner-
    wrapper split is what keeps the visual size unchanged.
- Scoped to `CategoryCarousel.tsx`'s two arrow buttons only — no change to `components/ui/button.tsx`
  shared variants (other consumers of `size="icon"` are out of scope and shouldn't be affected).
- No change to the arrows' position, disabled/`aria-disabled` behavior, or `focusableWhenDisabled`
  handling from F-018/F-019 — this Feature only changes hit-area size, not scroll logic or a11y
  state handling.

### Assumption (confirm before implementing)

- "44×44px" is the target minimum hit area (WCAG 2.5.5 AAA / Apple HIG's typical guidance) — flag if
  a different minimum is preferred.

Acceptance Criteria

- [x] Each arrow button's tappable/clickable area is at least 44×44px, measured from the actual
      interactive element's rendered box (not just the visible circle).
- [x] The arrows' visual appearance (size, circle, icon, shadow, position) is unchanged from today —
      confirmed by comparing before/after screenshots at the same viewport.
- [x] A tap anywhere within the expanded 44×44px hit area reliably triggers the scroll action, not
      navigation to the adjacent `CategoryCard` — verified on a real touch-emulated viewport (e.g.
      Chrome DevTools device toolbar or Playwright's touch emulation), not just visually inspected.
- [x] No regression to the existing keyboard focus, `aria-disabled`, or scroll-boundary behavior
      established in F-018/F-019.
- [x] Existing Playwright suite still passes; if no test currently covers the carousel's touch hit
      area, add one exercising a tap within the expanded-but-not-visible zone.

### Implementation (2026-08-02)

`features/homepage/CategoryCarousel.tsx`'s two arrows restructured: the interactive `<Button>` grew
to `size-11` (44px, `variant="ghost"`, transparent), wrapping an inner `<span>` that carries the
original visible chrome (`border-border bg-background rounded-full shadow-sm`, `size-8`/32px) and
the `ChevronLeft`/`ChevronRight` icon. `hover:bg-muted`/dark-mode hover states moved from the old
`variant="outline"` button onto the inner span via `group-hover`, since the outer button itself is
now visually transparent.

**Correction found during implementation, per this project's Correction protocol** (reality diverged
from the spec's implicit assumption): centering the new 44px box on the same point as the old 32px
box — the natural first approach, using the same `-translate-x-1/2` percentage-based transform —
grew the hit area symmetrically outward as well as inward. On mobile (375px viewport), that pushed
the button 6px past the `Container`'s own 16px `px-4` padding, causing real horizontal page overflow
(`tests/e2e/responsive.spec.ts`'s "/ at mobile (375px) has no horizontal scroll" failed: 381px
measured against a 375px viewport — caught by running the existing suite, not assumed safe).
Fixed by growing the hit area **inward only**: the outer box uses a fixed `-translate-x-4`/
`translate-x-4` (16px, matching the old box's own translate distance) instead of a width-proportional
`-1/2`, so its outward edge stays exactly where the old 32px box's edge was — no new overflow. The
inner 32px circle is anchored flush against that same outward edge (`justify-start` on the left
button, `justify-end` on the right) rather than centered within the new box, so it renders at the
exact same pixel position as before; the extra 12px of hit area is added entirely on the inward
side, toward the carousel's content, which is also the side the original bug report's touch/miss
scenario actually happens on.

**Verified:**
- Real-repro regression test added to `tests/e2e/homepage.spec.ts`: taps within the newly-expanded
  (but not visible) zone of the right arrow using a `hasTouch` context + `Locator.tap()`/
  `page.touchscreen.tap()`. Confirmed this test genuinely fails against the pre-fix component (ran
  it against a `git stash`-reverted `CategoryCarousel.tsx` first — failed as expected, "left disabled"
  never flipped) before confirming it passes against the fix — not just written and assumed correct.
- Full Playwright suite (303 tests, chromium + firefox + webkit, against a real `next build && next
  start` production server, not dev mode) — 287 passed, 16 skipped (pre-existing, unrelated), 0
  failed. This run includes the responsive-overflow test the correction above fixed.
- Visual screenshot comparison at the same 900×500 viewport as the project owner's original
  screenshot: circle size, position, icon, and spacing all pixel-identical to before.
- `npm run typecheck` and `npm run lint` both clean.

F-027 implemented and verified (2026-08-02).

---

## Story 18 (F-028)

As a visitor using dark mode or keyboard navigation

I want the carousel arrows' hover and focus states to match their visible circle, not the invisible
44px hit box behind it

So that F-027's touch-target fix doesn't introduce a new visible regression in states its own
screenshot-based verification (light mode, no keyboard focus) didn't cover — found by `/code-review`
run directly against F-027's diff, 2026-08-02.

### Findings (both independently reproduced before fixing, not taken on the reviewer's word)

1. **Dark-mode hover leak.** `variant="ghost"`'s `dark:hover:bg-muted/50`
   (`components/ui/button.tsx:17`) and F-027's new `hover:bg-transparent` override have different
   Tailwind modifier stacks (`[dark,hover]` vs `[hover]`), so `tailwind-merge` doesn't dedupe them —
   confirmed directly by feeding the real `buttonVariants` call through `tailwind-merge` and checking
   the output string, not by inspecting source alone. Since this app's dark mode is class-based
   (`app/globals.css:5`, `@custom-variant dark (&:is(.dark *));`), the surviving `dark:hover:bg-muted/50`
   class fires on hover, painting the whole 44px hit box gray in dark mode instead of just the
   32px circle.
2. **Off-center, oversized focus ring.** The focusable `<Button>` is now the 44px hit box (grown
   inward-only, so its own geometric center sits ~6px from the visible circle's center — see F-027's
   own note on why), while the visible circle lives in a separate, non-focusable inner `<span>`. No
   `focus-visible:` override was added to compensate, so `components/ui/button.tsx`'s base
   `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50` rendered around the
   full 44px box — confirmed geometrically (box spans -16px to +28px relative to the row edge for
   the left button; the base ring has no reason to know about the inner span's actual position).

Note: this app has no live dark-mode toggle yet (no `ThemeProvider`/class-toggle component exists
anywhere in `app/`/`components/` — grepped, only `app/globals.css` references `.dark`), so finding 1
isn't currently reachable by a real visitor. Fixed anyway rather than left as dead-code-shaped risk,
since the CSS is live and would surface the moment dark mode is wired up.

### Fix

- Both arrows' outer `<Button>` gained `dark:hover:bg-transparent` (alongside the existing
  `hover:bg-transparent`) and `focus-visible:border-transparent focus-visible:ring-0`, fully
  neutralizing the outer box's own hover/focus chrome in every mode.
- The inner `<span>` (the visible 32px circle) gained `group-focus-visible:border-ring
  group-focus-visible:ring-3 group-focus-visible:ring-ring/50`, mirroring `button.tsx`'s own base
  focus-visible styling but scoped to the actual visible circle via the outer button's `group` class.

Acceptance Criteria

- [x] In dark mode, hovering anywhere in either arrow's 44px hit area produces no visible background
      change outside the existing hover styling already confined to the inner 32px circle.
- [x] Tabbing to either arrow shows a focus ring matching the 32px visible circle's size/position, not
      the 44px hit box.
- [x] No change to hit-area size (44px), visible circle size/position (32px, pixel-identical), scroll
      behavior, or `aria-disabled`/`focusableWhenDisabled` handling from F-018/F-027.
- [x] Verified: dark-mode hover screenshot (`.dark` class forced on `<html>`, since no live toggle
      exists yet) shows no gray bleed beyond the 32px circle; keyboard-focus screenshots in both light
      and dark mode show the ring snug against the circle, not the outer box; full Playwright suite
      (303 tests, chromium + firefox + webkit, against a real production build) — 287 passed, 16
      skipped (pre-existing, unrelated), 0 failed; `npm run typecheck`/`lint` clean.

F-028 implemented and verified (2026-08-02).

---

## Story 10 (F-029)

As the project owner who just pushed F-028 to `main`

I want CI green again

So that the branch is deployable — raised 2026-08-02 with
`https://github.com/Cerosh/Akuna-Vista-Local-Directory/actions/runs/30726250394` showing the
`Unit tests` step failing.

### Root cause (investigated 2026-08-02)

`lib/repositories/eventRepository.test.ts`, `announcementRepository.test.ts`, and
`promotionRepository.test.ts` each freeze "now" for their date-filtering test by doing
`Date.now = () => now.getTime()`, then restoring it afterward. But the repositories call
`isPast(dateIso)` (`lib/utils/dateStatus.ts`) with no explicit `now`, so it falls back to the
default parameter `now: Date = new Date()`. Reassigning the static `Date.now` method does **not**
change what the `new Date()` constructor (no args) returns — verified directly:

```
Date.now() mocked -> 2026-07-06T12:00:00.000Z
new Date() (no args) -> 2026-08-02T01:11:52.317Z
```

So the mock in these three test files has always been a no-op; the "excludes X whose date has
passed" tests, and (in `eventRepository.test.ts`) the sort test that never mocked at all, were only
passing because real time hadn't yet passed the hardcoded ~2026-07-31/08-01 fixture dates. Today
(2026-08-02) tipped 5 tests over into failure. `isPast` itself and its own unit tests
(`dateStatus.test.ts`, which correctly passes `now` as an explicit argument) are unaffected and
correct — this is a test-mocking bug only, not a business-logic bug.

Acceptance Criteria

- [x] Replace the `Date.now = () => ...` / manual restore pattern with vitest's
      `vi.useFakeTimers()` + `vi.setSystemTime(now)` (`vi.useRealTimers()` to restore), which
      correctly freezes `new Date()` as well as `Date.now()`.
- [x] No production code changes — `isPast` and the three repositories are already correct.
- [x] `npm run test` passes against the real current date (not a mocked date).
- [x] `npm run typecheck` / `npm run lint` / `npm run format -- --check` clean.

### Implementation (2026-08-02)

Moved time-freezing to a `beforeEach`/`afterEach` pair per `describe` block in all three test files
(`vi.useFakeTimers()` + `vi.setSystemTime(now)` / `vi.useRealTimers()`), rather than only inside the
one test that previously tried to mock it — `eventRepository.test.ts`'s sort-order test had no time
mocking at all and was implicitly relying on real time staying behind its fixtures' default endDate,
which is exactly what broke. Freezing time for the whole suite in each file removes that hidden
dependency for every test, not just the one that names it explicitly.

**Verified:**

- `npx vitest run` on the three affected files — 16/16 passed.
- Full `npm run test` — 34 test files / 219 tests passed, run against the real system clock
  (2026-08-02), not a mocked date.
- `npm run typecheck`, `npm run lint`, `npm run format -- --check` — all clean.

F-029 implemented and verified (2026-08-02).

---

## Story 11 (F-030)

As the project owner who just pushed two data-only commits to `main`

I want CI green again

So that the branch is deployable — raised 2026-08-06 with
`https://github.com/Cerosh/Akuna-Vista-Local-Directory/actions/runs/31068621306` showing the
"End-to-end tests (1/2)" job failing.

### Root cause (investigated 2026-08-06)

`tests/e2e/homepage.spec.ts`'s "Transit widget ... never calls NSW Transport APIs directly from
the browser" test asserts:

```js
await expect(
  page.getByText("Schofields").first().or(page.getByText("Unavailable right now").first()),
).toBeVisible({ timeout: 15000 });
```

`.first()` is applied to each locator *before* `.or()` combines them. `TransitWidget.tsx`'s "Next
trains — Schofields" heading (line 83, `<h3 id="transit-trains-heading">`) is a **static** section
label that renders unconditionally, regardless of whether the trains fetch succeeds or fails — it
was never actually a signal that real data loaded. So `getByText("Schofields")` always has at
least one match. When the parking fetch *also* fails (rendering "Unavailable right now"), both
locators independently resolve to one element each, and `.or()` unions them into two distinct
elements — a strict-mode violation, since `toBeVisible()` requires exactly one match.

This run's trigger was the real NSW Transport API returning `403` for both `/v1/carpark` and
`/v1/tp/departure_mon` (visible in the job log) — an external API blip, not a regression from
either of the two commits that triggered this CI run (`069e0e2`, `1523669` — F-036/F-037, which
only touched `data/businesses.json`, `data/categories.json`, and a sprint-15 doc, confirmed via
`git show`). The bug has been latent in the test since it was written; it just requires the live
NSW Transport API to fail at least one of its two calls to surface.

### Acceptance Criteria

- [x] Fix the locator to `page.getByText("Schofields").or(page.getByText("Unavailable right
      now")).first()` — union first, then take one, so it's robust to any combination of visible
      indicator texts.
- [x] No production code change — `TransitWidget.tsx` is already correct; this is a test-only bug.
- [x] `npx playwright test tests/e2e/homepage.spec.ts` passes — 30/30 across chromium, firefox,
      webkit (verified 2026-08-06).
- [ ] Full Playwright suite still passes (will run as part of the pre-push hook on commit).

F-030 implemented and verified (2026-08-06).

---

Everything else — **F-007, F-009, F-011, F-014, F-015, and F-016 — remains captured but not
implemented.**
F-007–F-017 were consolidated here 2026-07-17 from `.ai/TODO.md`'s Backlog section and every
individual sprint's `retrospective.md` Carry Forward table, at the project owner's explicit
request, specifically so this one file is sufficient for planning what's left rather than needing
to check 8+ scattered files. Pick any item up: confirm the Acceptance Criteria (per Spec-Driven
Development Step 2), implement, then verify and check off. Note that with F-006 now live, picking
up any of these will itself be checked by the new guardrails (e.g. touching
`sprints/sprint-16-backlog/` in the same commit that implements one of them).

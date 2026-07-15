# Sprint 12 — Retrospective

Branding & Navigation Polish

Owner: Cerosh Jacob

Last Updated: 2026-07-16

Status: Complete (2026-07-16) — implemented and verified locally; commit/push/deploy remain open
steps for the project owner.

---

# Lessons Learned

What went well?

- Verifying the reported "no way to go back to home page" bug before writing a spec avoided
  building the wrong fix. `curl`ing the rendered HTML confirmed the header's Home link already
  worked — the real issue was a missing in-page affordance on the business detail page itself, not
  broken navigation.
- Actually loading the page after generating the favicon caught a real, shipping-blocking bug (an
  RGB-mode `.ico` crashing every route) that neither `npm run typecheck` nor `npm run lint` would
  ever have caught, since neither inspects binary asset correctness.
- Choosing general Acknowledgment of Country wording over guessing a specific Traditional Owners
  name avoided a real risk of misattribution — the project owner was asked rather than assumed.

What could improve?

- The "Include acknowledgment" request was missed on first read, buried at the end of a message
  that also contained the logo/navigation asks, and only surfaced when the project owner
  re-raised it explicitly. Worth reading multi-part requests more carefully for standalone asks
  that don't obviously connect to the surrounding sentence.
- No ImageMagick available locally for image processing (as Sprint 11 also found with `sips`) —
  Python/Pillow filled the gap this time, but this project has now hit "no ImageMagick" twice
  across two sprints; worth noting as a recurring environment constraint rather than treating it
  as a one-off each time.

Were any engineering standards updated?

- No new ADR needed — image asset processing (Pillow this time, `sips`/`qlmanage` in Sprint 11) is
  an implementation detail, not an architectural pattern.

Should DECISIONS.md change?

- No.

Should CODING_STANDARDS.md change?

- No.

---

# Sprint Retrospective

Keep

- Verifying a reported bug against the real rendered output before assuming what's broken.
- Actually loading the app after generating binary assets (images, icons) rather than trusting a
  clean typecheck/lint as sufficient evidence.
- Asking rather than guessing when a piece of real content (Acknowledgment of Country wording) has
  a right and wrong answer that isn't derivable from the codebase.

Stop

- Nothing identified this sprint.

Start

- Re-reading multi-part user requests fully before scoping work, so standalone asks (like this
  sprint's initially-missed acknowledgment request) aren't dropped.

---

# Carry Forward

Items not completed.

| Task | Reason | Next Sprint |
|------|--------|-------------|
| Commit / push / deploy this sprint's changes | Implementation complete and verified locally; deployment is the project owner's decision | N/A — awaiting explicit instruction |

---

# Metrics

Planned Features: 4, all spec-first (F-001–F-004, see README.md) — the first sprint since the
Spec-Driven Development rule was adopted (Sprint 11) to follow it from the very first line of code.

Completed Features: 4 of 4.

Open Bugs: None found (the RGBA `.ico` issue was found and fixed within this sprint, before it was
ever exposed to the project owner).

Documentation Updated: This sprint's own
README.md/goals.md/tasks.md/backlog.md/notes.md/retrospective.md/review.md.

Accessibility Reviewed: Yes — `tests/e2e/accessibility.spec.ts` re-run as part of the full suite,
all passing; breadcrumb uses semantic `<nav aria-label="Breadcrumb">` + `<ol>` markup.

Playwright Coverage: 294 tests (278 passed + 16 documented pre-existing skips) across
Chromium/Firefox/WebKit. Two new tests added: a breadcrumb navigation test
(`business-detail.spec.ts`) and a footer acknowledgment assertion added to the existing homepage
load test.

Sprint Velocity (optional): 4 features across 1 working session.

---

# AI Memory Update

At the end of the sprint determine whether the following documents require updates:

- [ ] CONTEXT.md — not touched; no dataset/schema change this sprint
- [x] TODO.md — Current Sprint pointer and Sprint 12 Summary added
- [ ] ROADMAP.md — not touched
- [ ] DECISIONS.md — not touched; no new architectural pattern
- [ ] CHANGELOG.md — no such file exists in this repository
- [ ] AI_MEMORY.md — not touched

Only update documents that genuinely changed.

---

# Sprint Summary

What was delivered?

- A breadcrumb (`Home > Category > Business Name`) on the business detail page.
- The project owner's real logo rolled out to the header, footer, and browser tab icon.
- An Acknowledgment of Country in the footer, on every page.

What remains?

- Committing, pushing and deploying this sprint's changes.
- Updating `.ai/TODO.md`'s Current Sprint pointer once this sprint is committed.

What should the next sprint focus on?

Whatever the project owner scopes next — Sprint 10 (Future Platform Foundation) remains queued.

---

# Next Sprint Goal

Sprint 10 (Future Platform Foundation) remains queued ahead of new ad hoc work in `TODO.md` unless
the project owner reorders it.

---

# Guiding Principle

A sprint should deliver user value, not just completed tasks.

Every sprint should leave the project better structured, better documented, better tested, easier
to maintain, and closer to the long-term vision.

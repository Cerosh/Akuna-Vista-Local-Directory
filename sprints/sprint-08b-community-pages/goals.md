# Sprint 08b — Goals

Community Pages

Owner: Cerosh Jacob

Last Updated: 2026-07-07

---

# Sprint Goal

Close the About/Contact/Privacy/Terms gap before Sprint 9 (Production Readiness) begins.

---

# Objective

Build four small, static, content-only pages — About, Contact, Privacy Policy, Terms of Service —
using components and conventions already established in Sprints 1–7. No new architecture, no new
UI patterns, no backend.

---

# Why This Sprint Exists

`.ai/ROADMAP.md`'s original "Phase 5: Community Pages" listed About, Community, Contact, Privacy,
Terms and 404 together. Across the actual 10-sprint plan, 404 shipped in Sprint 7 and Community
is arguably served by Sprint 6's homepage sections, but About, Contact, Privacy and Terms were
never assigned anywhere. `Footer.tsx` has linked to `/about` and `/contact` since Sprint 1 —
visitors clicking either land on a 404 today. `.ai/TESTING.md`'s Critical User Journeys list has
included "Contact page" the entire time, unbuildable until now.

Sprint 9's own planning documents (README.md Risks, notes.md Risks/Assumptions) already flagged
this exact gap and said it needed an explicit project-owner decision before that sprint's
Definition of Done could be signed off. This sprint is that decision, acted on: build the pages
now, as their own tracked unit of work, rather than folding them into Sprint 9 (whose actual scope
is monitoring/security/crawlability infrastructure, not new pages) or leaving the gap open.

---

# Goals

1. **Make every existing Footer link real** — `/about` and `/contact` currently 404; this sprint
   makes them true pages, and adds `/privacy` and `/terms` alongside them.
2. **Unblock Sprint 9** — its Definition of Done requires this decision resolved; this sprint
   resolves it explicitly rather than leaving it as a caveat.
3. **Match the existing quality bar, don't lower it** — these four pages meet the same
   accessibility/SEO standard Sprint 7 established sitewide (axe-core zero critical/serious
   violations, correct heading hierarchy, per-page metadata), verified by extending Sprint 7's
   own Playwright test infrastructure rather than building new tooling.
4. **Be honest about what this platform actually does** — Privacy Policy and Terms of Service
   content describes real, current behaviour (no accounts, no data collection beyond what Sprint
   9's analytics will add), not aspirational or templated legal boilerplate.
5. **Don't quietly expand scope** — no contact form (no backend exists to process one — ADR-002),
   no new visual language, no authentication.

---

# Non-Goals (this sprint)

- **No contact form / email-sending backend.** `/contact` is a `mailto:` link using the existing
  `Settings.contactEmail` field. Building actual form submission handling would require backend
  infrastructure this project doesn't have (ADR-002: JSON-only, no backend) — out of scope here.
- **No new design patterns.** Every page reuses `PageHeader`/`Container`/`Section`, exactly as
  every other simple content page in this project already does.
- **No legal sign-off claimed.** Privacy Policy and Terms of Service content is a good-faith,
  accurate draft describing current platform behaviour — not a substitute for the project owner's
  own legal judgement before treating it as binding.
- **No renumbering of Sprint 9 or Sprint 10.** See README.md's "Numbering" section.
- **No changes to Sprint 9's actual scope** (monitoring, analytics, security headers,
  `robots.txt`/`sitemap.xml`, browser compatibility, regression pass) — this sprint only resolves
  the one flagged precondition, it doesn't touch anything else in that plan.

---

# Success Criteria

Sprint 08b is successful when:

- [ ] `/about`, `/contact`, `/privacy`, `/terms` exist and are reachable from the Footer.
- [ ] `.ai/TESTING.md`'s "Contact page" Critical User Journey passes.
- [ ] All four routes pass the same axe-core/responsive Playwright checks every other route does.
- [ ] Privacy/Terms content is accurate to current platform behaviour and flagged as a draft for
      legal review, not asserted as vetted advice.
- [ ] Sprint 09's README.md/notes.md are updated to reference this sprint as the resolution to
      their previously-open About/Contact/Privacy/Terms risk.

---

# Guiding Principle

A resident who clicks "About" or "Contact" in the footer today hits a dead end — on a platform
whose entire purpose is being a trustworthy alternative to a WhatsApp thread. Four small pages
are a disproportionately large trust signal for a disproportionately small amount of work; this
sprint exists because that trade is worth making before, not after, Sprint 9 opens the platform
up further.

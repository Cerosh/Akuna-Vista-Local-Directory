# Sprint 09 — Goals

Production Readiness

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Sprint Goal

Prepare for public launch.

---

# Objective

Take everything built in Sprints 1–8 and make it safe, observable and crawlable for real users: activate error monitoring and analytics, add security headers, publish `robots.txt` and `sitemap.xml`, do a final metadata sanity check, verify browser compatibility, and run a full regression pass — then sign off against `.ai/DEPLOYMENT.md`'s Release and Deployment Checklists.

---

# Why This Sprint Exists

PROJECT.md's Launch Metrics — 100 businesses listed, 25 categories, 300 recommendations, a responsive website, an SEO score above 90, WCAG AA accessibility — describe what "MVP complete" looks like. Sprints 1–8 built toward every one of those targets, but building a feature and confirming it is genuinely ready for 800+ real community members (PROJECT.md) to depend on are not the same thing.

An unmonitored production deployment means the team learns about a broken page from a resident's complaint instead of a dashboard. An insecure deployment means the platform is asking a community to trust it without having earned that trust through basic hardening. An uncrawlable deployment — no `sitemap.xml`, no `robots.txt` — means search engines discover 100+ business pages slowly and inconsistently, directly undermining the SEO score > 90 target this platform is measured against. This sprint exists to close all three gaps before, not after, the first real user arrives.

This sprint also does not introduce new product surface area. Everything it touches — monitoring, analytics, security headers, `robots.txt`, `sitemap.xml`, metadata, browser testing — is infrastructure or verification work sitting on top of what Sprints 1–8 already shipped.

---

# Goals

1. **Give the team production visibility** — error logging and monitoring (Sentry) and analytics (Vercel Analytics / Google Analytics) must be wired up and verified to actually receive real events after deployment, not just configured.
2. **Hardened by default** — security headers from `.ai/SECURITY.md`'s "Headers" section must be present in production and tested in Preview first, so a security improvement doesn't become a launch-day regression.
3. **Crawlable, not just visitable** — `robots.txt` and `sitemap.xml` must exist for the first time, covering every business, category, community and static route, so search engines can index the directory efficiently.
4. **Confirm, don't re-audit** — the metadata review in this sprint is a final sanity check against Sprint 7's SEO audit, not a fresh pass; do not duplicate work Sprint 7 already completed.
5. **Works everywhere residents actually use it** — verify Chrome (primary), Firefox and Safari (secondary), plus mobile browsers, per `.ai/TESTING.md`'s "Browser Support."
6. **One last full regression pass** — every Critical User Journey in `.ai/TESTING.md` is re-verified before sign-off, catching anything that regressed silently across Sprints 1–8.
7. **Name the gaps, don't hide them** — this sprint's own planning surfaced a genuine gap (the missing About/Contact/Privacy/Terms pages), flagged explicitly rather than quietly absorbed or ignored, and resolved by inserting Sprint 08b before this one — see Non-Goals and README.md's Risks.

---

# Non-Goals (this sprint)

- **No new business features.** This sprint hardens and verifies existing functionality; it does not add directory, search or community features.
- **No fresh SEO audit.** Sprint 7 already audited and fixed per-page SEO (titles, descriptions, Open Graph tags, structured data, headings). This sprint's "metadata review" is a final sanity check, not a repeat of that audit.
- **No authenticated admin features.** Sprint 8 (Admin Preparation) covers CLI/local tooling for validation, import/export and backups — this sprint does not build or extend an authenticated admin dashboard.
- **No About, Contact, Privacy Policy or Terms of Service pages in this sprint's own scope.** These pages were never scheduled in this project's original 10-sprint plan (see README.md's Risks) — resolved by Sprint 08b, inserted before this sprint, not built here.

---

# Success Criteria

Sprint 9 is successful when:

- [ ] Monitoring and analytics are both wired up and confirmed to receive real events in production, not just configured. Split outcome: analytics (Vercel Analytics) is done and verified; monitoring (Sentry) is explicitly deferred by the project owner (2026-07-14), tracked in `.ai/TODO.md` Backlog — see README.md F-001. Left unchecked since the criterion as written requires both.
- [x] Security headers are live in production, having been tested in Preview first.
- [x] `robots.txt` and `sitemap.xml` exist, are correct, and are reachable in production.
- [x] The metadata final check finds Sprint 4/7 SEO work intact, with no open findings.
- [x] Browser compatibility is verified against the matrix in README.md (Chrome primary, Firefox/Safari secondary, mobile browsers) — automated Playwright cross-browser proxy; real physical-device testing disclosed as unavailable, see review.md.
- [x] A full regression pass across Critical User Journeys completes with no critical or high defects open.
- [x] DEPLOYMENT.md's Release Checklist and Deployment Checklist are both satisfied.
- [x] The About/Contact/Privacy/Terms gap has an explicit, recorded decision from the project owner — resolved by Sprint 08b.

---

# Guiding Principle

Deployment is not the end of development — it is the beginning of operating software in the real world (DEPLOYMENT.md). A sprint that only "adds features" without confirming they are safe, observable and discoverable in production has not actually finished the job of getting the platform ready for the 800+ residents waiting to use it.

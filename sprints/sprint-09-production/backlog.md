# Sprint 09 — Backlog

Production Readiness

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 9's deliverables into ordered, independently shippable items. Security headers come first because they are foundational, low-risk to add early, and benefit from the longest possible window to be tested in Preview before production. Observability (error logging/monitoring, then analytics) follows so the team has visibility for the rest of the sprint's work. Crawl infrastructure (`robots.txt`, then `sitemap.xml`) and the metadata final check come next. Browser compatibility is verified before the final regression pass so any findings have time to be fixed properly rather than discovered at the last minute.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Configure security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) per `.ai/SECURITY.md` "Headers" and "Content Security Policy" | None | High | Not Started |
| B-002 | Test security headers in Preview deployment; confirm no broken functionality (scripts, fonts, images, embeds) before enabling in Production | B-001 | High | Not Started |
| B-003 | Wire up error logging and monitoring (Sentry) via `SENTRY_DSN`, following DEPLOYMENT.md's "Observability" and SECURITY.md's "Logging" rules | None | High | Not Started |
| B-004 | Verify monitoring receives a real, deliberately triggered production error | B-003 | High | Not Started |
| B-005 | Wire up analytics (Vercel Analytics / Google Analytics) via the relevant environment variable(s) | None | Medium | Not Started |
| B-006 | Verify analytics receives a real production page view/event | B-005 | Medium | Not Started |
| B-007 | Build and publish `robots.txt` covering all public routes | None | High | Not Started |
| B-008 | Build `sitemap.xml` generation covering all business, category, community and static routes; reference it from `robots.txt` | B-007 | High | Not Started |
| B-009 | Verify `robots.txt` and `sitemap.xml` are correct and reachable in production | B-008 | High | Not Started |
| B-010 | Final metadata sanity check: spot-check titles, descriptions, Open Graph previews and structured data across a representative sample of route types (not a fresh audit — see Prioritisation Notes) | B-009 | Medium | Not Started |
| B-011 | Browser compatibility pass: Chrome (primary), Firefox and Safari (secondary), mobile Safari and mobile Chrome, per TESTING.md "Browser Support" | B-002 | Medium | Not Started |
| B-012 | Full final regression pass across TESTING.md's Critical User Journeys | B-004, B-006, B-009, B-010, B-011 | High | Not Started |
| B-013 | Complete DEPLOYMENT.md's Release Checklist and Deployment Checklist sign-off | B-012 | High | Not Started |

---

# Prioritisation Notes

- B-001/B-002 (security headers) are sequenced first because they are foundational and low-risk to add early, but they carry a real regression risk (blocking a script or embed) — testing in Preview before Production (B-002) is not optional and should not be compressed under time pressure.
- B-003–B-006 (monitoring, then analytics) are sequenced next so the team has production visibility for the remainder of the sprint's work — if something breaks during B-007 onward, the team should already be able to see it.
- B-007/B-008 (robots.txt, then sitemap.xml) are sequenced in that order because `sitemap.xml`'s location is referenced from `robots.txt`; building the sitemap first would mean revisiting `robots.txt` anyway.
- B-010 (metadata final check) is explicitly **not** a fresh SEO audit — that work was already done in Sprint 7. This item exists only to catch drift or regressions introduced after Sprint 7's audit, not to re-derive findings Sprint 7 already produced.
- B-011 (browser compatibility) is sequenced before the final regression pass (B-012) so that any browser-specific defect found has time to be fixed properly rather than discovered as the last task before sign-off.
- **The About/Contact/Privacy/Terms decision (see README.md Risks) is a blocking-or-not item the project owner must resolve before this backlog is considered complete.** It is not listed as a backlog item here because it was never scoped into this sprint — but this backlog cannot be honestly marked "done" while that decision remains unmade. Resolve it explicitly (add pages, or accept the gap in writing) before B-013 sign-off.

---

# Out of Scope for This Backlog

Do not add items for:

- A fresh SEO audit — Sprint 7 already completed this; see B-010's scope note above.
- New business, directory, search or community features — this sprint hardens and verifies, it does not extend product surface area.
- An authenticated admin dashboard — Sprint 8 (Admin Preparation) is CLI/local tooling only; this sprint does not build on top of it with authentication.
- Adding About/Contact/Privacy/Terms pages, unless the project owner explicitly decides to add them to this sprint (see Prioritisation Notes above).

If a task from this list seems necessary to "finish" production readiness, that's a signal scope is creeping — flag it instead of implementing it.

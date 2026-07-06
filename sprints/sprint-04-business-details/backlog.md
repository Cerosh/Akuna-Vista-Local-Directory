# Sprint 04 — Backlog

Business Details

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Purpose

This backlog breaks Sprint 4's deliverables into ordered, independently shippable items — core page and content sections first, then sharing and discoverability layers on top.

---

# Backlog Items

| ID | Item | Depends On | Priority | Status |
|----|------|------------|----------|--------|
| B-001 | Extend `BusinessRepository` with `getBusinessBySlug(slug)` | Sprint 1 repository layer | High | Not Started |
| B-002 | Build `/business/[slug]` route with 404 handling for unknown slugs | B-001 | High | Not Started |
| B-003 | Build business hero (name, category, featured/verified badges, primary CTA) | B-002 | High | Not Started |
| B-004 | Build contact information section (phone `tel:`, email `mailto:`, website, address) | B-002 | High | Not Started |
| B-005 | Build opening hours section (all 7 days, "Closed" handling) | B-002 | High | Not Started |
| B-006 | Build service areas section (graceful when empty) | B-002 | Medium | Not Started |
| B-007 | Build gallery section (`images[]`, graceful when empty/single image) | B-002 | Medium | Not Started |
| B-008 | Build social links section (`socialLinks`, graceful when all empty) | B-002 | Low | Not Started |
| B-009 | Build share button (Web Share API + copy-link fallback) | B-003 | Medium | Not Started |
| B-010 | Generate per-page SEO metadata (title, description) from business data | B-002 | High | Not Started |
| B-011 | Generate `LocalBusiness` JSON-LD structured data per business page | B-001, B-010 | Medium | Not Started |
| B-012 | Update homepage/directory cards to link to real `/business/[slug]` routes (remove any 404 placeholders) | B-002 | Medium | Not Started |
| B-013 | Responsive pass across hero, contact, hours, gallery, service areas | B-003–B-008 | High | Not Started |
| B-014 | Accessibility pass (alt text, heading hierarchy, keyboard access to contact links and share button) | B-003–B-009 | High | Not Started |
| B-015 | Playwright: directory/homepage → business page navigation, contact links present, share button behaviour | B-002–B-012 | High | Not Started |

---

# Prioritisation Notes

- B-001/B-002 (repository lookup + route + 404) unblock everything else and should land first.
- B-003–B-008 (content sections) can be built and reviewed independently, in any order, once B-002 exists — each is its own commit per the AI Development Plan.
- B-009 (share) and B-010/B-011 (SEO metadata, structured data) depend on the page having real content to describe — sequence them after the content sections are stable.
- B-012 (wiring up real links from Sprints 2/3) should happen once the detail page is confirmed working — don't leave stale 404 links in place after this sprint.
- B-015 (Playwright) should be written once the page is structurally stable, but keep Sprint 1–3's existing tests green throughout.

---

# Out of Scope for This Backlog

Do not add stories for:

- Site-wide SEO (sitemap.xml, robots.txt, canonical strategy, default OG image) — Sprint 08.
- Reviews/recommendation submission — Future (Version 2, PROJECT.md "Out of Scope").
- Related-businesses recommendation algorithm beyond a simple same-category list.
- Real business photography — placeholder images only, per PROJECT.md MVP scope.

If a task from this list seems necessary to "finish" the business page, that's a signal scope is creeping — flag it instead of implementing it.

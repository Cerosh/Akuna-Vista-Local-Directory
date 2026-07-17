# Sprint 04 — Technical Tasks

Business Details

Owner: Cerosh Jacob

Last Updated: 2026-07-06

---

# Data & Repository

- [x] Extend `BusinessRepository` with `getBusinessBySlug(slug)`.
- [x] Confirm the `Business` type covers every field needed for this sprint (`openingHours`, `serviceAreas`, `socialLinks`, `images`, `coordinates`, `tags`) per JSON_SCHEMA.md.
- [x] Ensure sample data in `businesses.json` includes at least one "fully populated" record and one "minimal" record (missing optional fields) to test graceful degradation.

---

# Frontend — Page & Hero

- [x] Build `/business/[slug]` route; call `notFound()` for unknown slugs.
- [x] Build hero: business name, category, short description, featured/verified badges, primary CTA (e.g. call or message).

---

# Frontend — Contact Information

- [x] Render phone as a `tel:` link, email as `mailto:`, website as an external link with `rel="noopener noreferrer"`.
- [x] Render address (`street`, `suburb`, `state`, `postcode`).
- [x] Omit any contact method that's empty in the data rather than rendering an empty row.

---

# Frontend — Opening Hours

- [x] Render all seven days from `openingHours`, including "Closed" days, in a clear, scannable format.
- [x] Consider highlighting "open now" state as a stretch goal — not required for Definition of Done.

---

# Frontend — Service Areas

- [x] Render `serviceAreas` as a clear list/tag group.
- [x] Omit the section entirely if `serviceAreas` is empty.

---

# Frontend — Gallery

- [x] Render `images[]` using `next/image` with descriptive alt text.
- [x] Handle zero, one, and multiple images gracefully (e.g. no gallery carousel forced on a single image).

---

# Frontend — Social Links

- [x] Render any populated `socialLinks` (Facebook, Instagram, LinkedIn) as icon links.
- [x] Omit the section entirely if all social links are empty.

---

# Frontend — Share Button

- [x] Implement share using the Web Share API (`navigator.share`) where supported.
- [x] Fall back to copy-link-to-clipboard with a toast/confirmation when Web Share is unavailable.
- [x] Ensure the shared/copied URL resolves directly to the business page.

---

# SEO Metadata (per-business)

- [x] Generate `<title>` and meta description per business using Next.js Metadata API, derived from business data (name, category, suburb).
- [x] Generate Open Graph tags (title, description, image) for correct link-preview rendering.
- [x] Scope: this page's metadata only. Site-wide SEO (sitemap, robots.txt, canonical strategy) is Sprint 08 — do not build it here.

---

# Structured Data

- [x] Generate `LocalBusiness` JSON-LD per business page (name, address, telephone, openingHours, url, image) via a small, testable generator function.
- [ ] Validate output against Google's Rich Results Test for at least one fully-populated business.
      Pre-existing false positive, corrected 2026-07-17: this was checked at the time but never
      actually done — the tool needs a public URL, which didn't exist until Sprint 9, and no later
      sprint recorded running it. Structural validation against schema.org's `LocalBusiness`
      properties was done instead, in Sprint 7 (see `sprints/sprint-07-quality/review.md`). Still
      genuinely owed.
- [x] Unit test the generator against both a fully-populated and a minimal business record.

---

# Integration with Earlier Sprints

- [x] Update homepage featured business cards and directory/category cards to link to the now-real `/business/[slug]` route.

---

# Responsive

- [x] Verify hero, contact, hours, service areas and gallery at mobile, tablet, desktop, large desktop.

---

# Accessibility

- [x] Gallery images have descriptive alt text.
- [x] Contact links, social links and the share button are keyboard accessible with visible focus states.
- [x] Heading hierarchy: H1 business name, H2 per major section.

---

# Testing

- [x] Unit tests: `LocalBusiness` structured data generator (full and minimal data); opening hours formatter.
- [x] Playwright: navigate from directory/homepage to a business page; verify contact links render correctly; verify share button behaviour; verify 404 for an invalid slug.

---

# Documentation

- [x] Update TODO.md / CONTEXT.md once this sprint is complete (see retrospective.md AI Memory Update).

---

# Out of Scope

Do not build in this sprint:

- Site-wide SEO infrastructure (sitemap.xml, robots.txt, canonical URL strategy, default OG image) — Sprint 08.
- Reviews or recommendation submission — Future (Version 2).
- Complex related-businesses recommendation logic.
- Real business photography.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, PROJECT.md, JSON_SCHEMA.md, and the specific standards doc for the task).
2. Implement one section of the business page only.
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits (see GIT_WORKFLOW.md).
6. Update TODO.md if the task changes sprint scope.

Never combine multiple unrelated sections in a single AI session or commit.

# Sprint 09b — Technical Tasks

Content Cleanup

Owner: Cerosh Jacob

Last Updated: 2026-07-09

---

# F-001 — Search filter chips (category + suburb)

- [ ] In `app/search/page.tsx` (or a small shared helper if reusable elsewhere), filter the
      `categories`/`suburbs` arrays to only entries with ≥1 matching business before passing to
      `SearchExperience`.
- [ ] Reuse `searchService.ts`'s existing suburb-matching/normalize logic rather than duplicating
      it.
- [ ] Unit test the filtering logic with synthetic fixtures (matches `searchService.test.ts`'s
      existing pattern).
- [ ] Update `tests/e2e/search.spec.ts`'s chip assertions for the new filtered set.

---

# F-002 — Popular Categories featured flags

- [ ] `data/categories.json`: `featured: false` on `plumbing`, `cleaning`; `featured: true` on
      `tutoring-education`, `real-estate`.
- [ ] No code change expected — confirm `PopularCategories.tsx` renders the new set correctly.

---

# F-003 — Events

- [ ] **First:** resolve the event-date question with the project owner (see notes.md's ⚠️ note)
      — do not proceed to implementation until this is answered.
- [ ] Replace `data/events.json`'s 5 sample events with the 3 real events supplied 2026-07-09
      (Blacktown Mayoral Fun Run, Blacktown Food Market, Fingerprints Workshop — full detail in
      notes.md), following Sprint 08b's real-content pattern (real UUIDs, `npm run validate:data`,
      no fabrication).
- [ ] Confirm no other file references a deleted event by name (mirrors the "Winter Fun Run →
      Local Grind Café" dangling-reference bug found and fixed during the business content swap).

---

# F-007 — Homepage section reorder

- [ ] `app/(home)/page.tsx`: remove `CommunitySpotlight` import and usage (leave the component
      file and its tests in place).
- [ ] `app/(home)/page.tsx`: move `<Promotions />` to directly after `<PopularCategories />` and
      directly before `<FeaturedBusinesses />`.
- [ ] `tests/e2e/homepage.spec.ts`: remove the `home.communitySpotlightHeading` visibility
      assertion (locator in `tests/pages/HomePage.ts` can stay defined, unused).
- [ ] Re-run `tests/e2e/homepage.spec.ts`, `tests/e2e/accessibility.spec.ts`,
      `tests/e2e/responsive.spec.ts` — confirm no regressions from the reordered/removed section.

---

# F-004 — Announcement.sourceUrl

- [ ] `scripts/lib/validation.ts`: add `sourceUrl: z.url().optional()` to `announcementSchema`.
- [ ] `types/announcement.ts`: add `sourceUrl?: string`.
- [ ] `components/cards/AnnouncementCard.tsx`: render a "Read more" link when `sourceUrl` present.
- [ ] New migration script (`scripts/migrate-add-announcement-source-url.ts` or similar), matching
      `scripts/migrate-add-price-range.ts`'s exact pattern — backup first, migrate, validate.
- [ ] `.ai/JSON_SCHEMA.md`: update Announcement Schema section (remove the "(Future)" framing now
      that it's implemented) and Versioning section.
- [ ] Unit tests for the migration and the schema/type change.

---

# F-005 — Real business data (contingent on project owner input)

- [ ] Collect whatever email/address/opening-hours/verification info the project owner has by
      the time this task starts.
- [ ] Add via `scripts/admin.ts update`, one business at a time, backup first.
- [ ] Update `.ai/TODO.md`'s Backlog entry — close if fully resolved, otherwise note what's still
      missing and for which businesses.

---

# F-006 — Real Footer social links (contingent on project owner input)

- [ ] If real community social URLs are supplied: update `components/layout/Footer.tsx`'s
      `SOCIAL_LINKS`, convert the icon spans to real `<Link>`/`<a>` elements pointing at those
      URLs, remove the "(coming soon)" `aria-label` suffix and placeholder comment.
- [ ] If not supplied: leave as-is, keep the Backlog entry open.

---

# Documentation

- [ ] `.ai/TODO.md`: remove Backlog entries for items fully closed this sprint; update any that
      carry forward with current status.
- [ ] `.ai/CONTEXT.md`: mark Sprint 09b complete, update Current Phase/Next Milestone → Sprint 10.

---

# AI Development Plan

For every task above:

1. Read relevant documentation (CLAUDE.md, this sprint's notes.md, `.ai/JSON_SCHEMA.md` for F-004).
2. Implement one feature only.
3. Run lint, typecheck, tests.
4. Self-review against REVIEW_CHECKLIST.md.
5. Commit using Conventional Commits.
6. Update `.ai/TODO.md` if the task closes or changes a Backlog entry.

Never combine multiple unrelated features in a single AI session or commit.

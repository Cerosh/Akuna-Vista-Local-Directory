# Sprint 09b — Technical Tasks

Content Cleanup

Owner: Cerosh Jacob

Last Updated: 2026-07-09

---

# F-001 — Search filter chips (category + suburb)

- [x] In `app/search/page.tsx` (or a small shared helper if reusable elsewhere), filter the
      `categories`/`suburbs` arrays to only entries with ≥1 matching business before passing to
      `SearchExperience`.
- [x] Reuse `searchService.ts`'s existing suburb-matching/normalize logic rather than duplicating
      it.
- [x] Unit test the filtering logic with synthetic fixtures (matches `searchService.test.ts`'s
      existing pattern).
- [x] Update `tests/e2e/search.spec.ts`'s chip assertions for the new filtered set.

---

# F-002 — Popular Categories featured flags

- [x] `data/categories.json`: `featured: false` on `plumbing`, `cleaning`; `featured: true` on
      `tutoring-education`, `real-estate`.
- [x] No code change expected — confirm `PopularCategories.tsx` renders the new set correctly.

---

# F-003 — Events

- [x] **First:** resolve the event-date question with the project owner (see notes.md's ⚠️ note)
      — do not proceed to implementation until this is answered.
- [x] Replace `data/events.json`'s 5 sample events with real content, following Sprint 08b's
      real-content pattern (real UUID, `npm run validate:data`, no fabrication). Resolution with
      the project owner (2026-07-14): only the Fingerprints Workshop was added (its date is a
      genuine upcoming Term 3 Friday); Blacktown Mayoral Fun Run and Blacktown Food Market were
      held out rather than published with their supplied 2024 dates — carried forward in
      `.ai/TODO.md`'s Backlog until updated dates are available.
- [x] Confirm no other file references a deleted event by name (mirrors the "Winter Fun Run →
      Local Grind Café" dangling-reference bug found and fixed during the business content swap).

---

# F-007 — Homepage section reorder

- [x] `app/(home)/page.tsx`: remove `CommunitySpotlight` import and usage (leave the component
      file and its tests in place).
- [x] `app/(home)/page.tsx`: move `<Promotions />` to directly after `<PopularCategories />` and
      directly before `<FeaturedBusinesses />`.
- [x] `tests/e2e/homepage.spec.ts`: remove the `home.communitySpotlightHeading` visibility
      assertion (locator in `tests/pages/HomePage.ts` can stay defined, unused).
- [x] Re-run `tests/e2e/homepage.spec.ts`, `tests/e2e/accessibility.spec.ts`,
      `tests/e2e/responsive.spec.ts` — confirm no regressions from the reordered/removed section.

---

# F-004 — Announcement.sourceUrl

- [x] `scripts/lib/validation.ts`: add `sourceUrl: z.url().optional()` to `announcementSchema`.
- [x] `types/announcement.ts`: add `sourceUrl?: string`.
- [x] `components/cards/AnnouncementCard.tsx`: render a "Read more" link when `sourceUrl` present.
- [x] New migration script (`scripts/migrate-add-announcement-source-url.ts` or similar), matching
      `scripts/migrate-add-price-range.ts`'s exact pattern — backup first, migrate, validate.
- [x] `.ai/JSON_SCHEMA.md`: update Announcement Schema section (remove the "(Future)" framing now
      that it's implemented) and Versioning section.
- [x] Unit tests for the migration and the schema/type change.

---

# F-005 — Real business data (contingent on project owner input)

- [x] Collect whatever email/address/opening-hours/verification info the project owner has by
      the time this task starts. Asked directly (2026-07-14) — the project owner had nothing new
      to supply this sprint.
- [ ] Add via `scripts/admin.ts update`, one business at a time, backup first. Not applicable —
      nothing was supplied.
- [x] Update `.ai/TODO.md`'s Backlog entry — carried forward as still open, not fabricated.

---

# F-006 — Footer social links — COMPLETED 2026-07-09, ahead of this sprint

- [x] Removed `Footer.tsx`'s `SOCIAL_LINKS` placeholder constant and its non-clickable
      "(coming soon)" icon spans entirely (project owner chose removal over waiting for real
      URLs). Unused `Globe`/`MessageCircle` imports removed. Contact column now shows only the
      email link. Verified: lint, typecheck, 121 unit tests, build all pass.

---

# Documentation

- [x] `.ai/TODO.md`: remove Backlog entries for items fully closed this sprint; update any that
      carry forward with current status.
- [x] `.ai/CONTEXT.md`: mark Sprint 09b complete, update Current Phase/Next Milestone → Sprint 10.

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

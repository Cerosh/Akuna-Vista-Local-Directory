/**
 * Sprint 16 F-022: the homepage's "Featured businesses" section
 * (`features/homepage/FeaturedBusinesses.tsx`) caps its display at this
 * many businesses, and `scripts/lib/validation.ts`'s
 * `validateFeaturedBusinessCap()` hard-fails `npm run validate:data` (and
 * therefore Husky pre-commit / CI) if `data/businesses.json` ever has more
 * than this many `featured: true` records.
 *
 * Single source of truth for both call sites — per `.ai/CLAUDE.md`'s "Don't
 * Repeat Yourself" rule, this used to be two independent constants that
 * could silently drift out of sync (code-review finding, Sprint 16 F-023).
 * Lives under `lib/` (not `scripts/lib/`) because `scripts/**` never
 * imports from `@/` and app code never imports from `scripts/**` — this is
 * the one location both sides can reach without crossing that boundary.
 */
export const MAX_FEATURED_BUSINESSES = 6;

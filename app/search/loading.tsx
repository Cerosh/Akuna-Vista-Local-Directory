import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Safe to add — /search never calls notFound() (see AI_MEMORY.md's
 * loading.tsx/notFound() Framework Gotcha).
 *
 * Mirrors SearchExperience's *default* state (no query/category/suburb in
 * the URL yet), which is what nearly every navigation to /search actually
 * lands on first — search input, filter-chip rows, and one short line of
 * copy, not a results grid.
 *
 * Two rounds of measured, real layout-shift regressions went into this
 * file (Sprint 07 Performance Profiling) — recorded so a future edit
 * doesn't reintroduce them:
 * 1. An earlier version rendered a full BusinessCardSkeletonGrid, far
 *    taller than this real default state (Lighthouse CLS 0.275).
 * 2. Replacing individual skeleton "pills" 1:1 with real chip counts still
 *    under-reserved space, because real category/suburb labels wrap onto
 *    several lines at mobile widths ("Landscaping & Gardening", "Cafés &
 *    Restaurants") while short uniform skeleton pills didn't (CLS 0.122).
 * The fix is `min-h` on each chip row, measured directly from the real
 * rendered rows at a 412px viewport (category row ~120px, suburb row
 * ~56px), rather than trying to visually replicate individual chips.
 */
export default function Loading() {
  return (
    <Section>
      <Container>
        <div className="mb-8 flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-full max-w-[480px]" />
          <div className="flex min-h-[120px] flex-wrap content-start gap-2">
            {Array.from({ length: 9 }, (_, index) => (
              <Skeleton key={index} className="h-7 w-24 rounded-full" />
            ))}
          </div>
          <div className="flex min-h-[56px] flex-wrap content-start gap-2">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-7 w-20 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-4 w-72" />
        </div>
      </Container>
    </Section>
  );
}

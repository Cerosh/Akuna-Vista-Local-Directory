import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { BusinessCardSkeletonGrid } from "@/components/cards/BusinessCardSkeleton";

/**
 * Homepage loading skeleton — safe to add since the homepage never calls
 * notFound() (see AI_MEMORY.md's loading.tsx/notFound() Framework Gotcha).
 * A representative sample of the page's shape (hero + two card rows)
 * rather than a 1:1 mirror of all eleven sections — the DESIGN_SYSTEM.md
 * goal is "communicate progress, avoid a blank screen," not pixel parity
 * for a skeleton shown only for the brief moment before content streams in.
 */
export default function Loading() {
  return (
    <>
      <Section className="py-16 sm:py-24">
        <Container className="flex flex-col items-center gap-4 text-center">
          <Skeleton className="h-10 w-full max-w-lg" />
          <Skeleton className="h-5 w-full max-w-md" />
          <Skeleton className="mt-2 h-12 w-full max-w-xl rounded-full" />
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="mb-8 flex flex-col gap-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
          <BusinessCardSkeletonGrid count={3} />
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="mb-8 flex flex-col gap-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
          <BusinessCardSkeletonGrid count={3} />
        </Container>
      </Section>
    </>
  );
}

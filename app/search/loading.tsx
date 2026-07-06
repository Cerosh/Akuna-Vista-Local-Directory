import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Skeleton } from "@/components/ui/skeleton";
import { BusinessCardSkeletonGrid } from "@/components/cards/BusinessCardSkeleton";

/**
 * Safe to add — /search never calls notFound() (see AI_MEMORY.md's
 * loading.tsx/notFound() Framework Gotcha).
 */
export default function Loading() {
  return (
    <Section>
      <Container>
        <div className="mb-8 flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="mb-8 flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-72" />
        </div>
        <BusinessCardSkeletonGrid />
      </Container>
    </Section>
  );
}

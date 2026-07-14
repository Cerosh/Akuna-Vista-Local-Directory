import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchExperience } from "@/features/search/SearchExperience";
import { businessRepository } from "@/lib/repositories/businessRepository";
import { categoryRepository } from "@/lib/repositories/categoryRepository";
import { suburbRepository } from "@/lib/repositories/suburbRepository";
import { categoriesWithBusinesses, suburbsWithBusinesses } from "@/lib/services/searchService";

export const metadata: Metadata = {
  title: "Search | Akuna Vista Local Directory",
  description: "Search local businesses by keyword, category or suburb.",
  // Canonicalises every query/filter combination to the bare page, same
  // treatment as /businesses — this is a client-side instant-filter utility
  // page (ARCHITECTURE.md's Search Architecture), not per-query indexable
  // content in its own right.
  alternates: { canonical: "/search" },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; suburb?: string }>;
}

// No loading.tsx for this route — it never calls notFound(), so there's
// no risk of the Sprint 3 "loading.tsx breaks notFound() status" gotcha,
// but the data fetch here is tiny (all businesses/categories/suburbs)
// and doesn't need a loading skeleton either.
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const [businesses, categories, suburbs] = await Promise.all([
    businessRepository.getAll(),
    categoryRepository.getAll(),
    suburbRepository.getAll(),
  ]);
  // Sprint 09b F-001 — only show filter chips that lead somewhere; a chip
  // for a category/suburb with zero real businesses is a dead end.
  const categoriesWithListings = categoriesWithBusinesses(categories, businesses);
  const suburbsWithListings = suburbsWithBusinesses(suburbs, businesses);

  return (
    <Section>
      <Container>
        <div className="mb-8">
          <PageHeader
            title="Search"
            description="Find local businesses by keyword, category or suburb."
          />
        </div>
        <SearchExperience
          businesses={businesses}
          categories={categoriesWithListings}
          suburbs={suburbsWithListings}
          initialQuery={params.q ?? ""}
          initialCategoryId={params.category}
          initialSuburb={params.suburb}
        />
      </Container>
    </Section>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { BusinessDirectory } from "@/features/directory/BusinessDirectory";

export const metadata: Metadata = {
  title: "Business Directory | Akuna Vista Local Directory",
  description: "Browse trusted local businesses recommended by your Akuna Vista neighbours.",
  alternates: { canonical: "/businesses" },
};

interface BusinessesPageProps {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}

export default async function BusinessesPage({ searchParams }: BusinessesPageProps) {
  const params = await searchParams;

  return (
    <Section>
      <Container>
        <div className="mb-8">
          <PageHeader
            title="Business Directory"
            description="Browse trusted local businesses recommended by your neighbours."
          />
        </div>
        <BusinessDirectory
          basePath="/businesses"
          categoryId={params.category}
          showCategoryFilters
          searchParams={params}
        />
      </Container>
    </Section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { BusinessDirectory } from "@/features/directory/BusinessDirectory";
import { categoryRepository } from "@/lib/repositories/categoryRepository";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await categoryRepository.getBySlug(slug);

  if (!category) {
    notFound();
  }

  return {
    title: `${category.name} | Akuna Vista Local Directory`,
    description: category.description ?? `Browse ${category.name} businesses in Akuna Vista.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const category = await categoryRepository.getBySlug(slug);

  if (!category) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;

  return (
    <Section>
      <Container>
        <div className="mb-8">
          <PageHeader title={category.name} description={category.description} />
        </div>
        <BusinessDirectory
          basePath={`/category/${category.slug}`}
          categoryId={category.id}
          searchParams={resolvedSearchParams}
        />
      </Container>
    </Section>
  );
}

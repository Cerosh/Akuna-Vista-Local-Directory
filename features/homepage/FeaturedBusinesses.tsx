import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { businessRepository } from "@/lib/repositories/businessRepository";
import { categoryRepository } from "@/lib/repositories/categoryRepository";

export async function FeaturedBusinesses() {
  const [businesses, categories] = await Promise.all([
    businessRepository.getFeatured(),
    categoryRepository.getAll(),
  ]);

  // Same reasoning as PopularCategories — omit rather than show an empty state.
  if (businesses.length === 0) {
    return null;
  }

  const categoryNameById = new Map(categories.map((category) => [category.id, category.name]));

  return (
    <Section className="border-border border-t">
      <Container>
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Featured businesses
          </h2>
          <p className="text-muted-foreground">
            Trusted local businesses recommended by your neighbours.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              categoryName={categoryNameById.get(business.categoryId)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

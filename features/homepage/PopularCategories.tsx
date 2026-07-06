import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { categoryRepository } from "@/lib/repositories/categoryRepository";

export async function PopularCategories() {
  const categories = await categoryRepository.getFeatured();

  // A marketing homepage should never show an "empty state" message —
  // if nothing is featured yet, the section simply doesn't render.
  if (categories.length === 0) {
    return null;
  }

  return (
    <Section id="categories" className="border-border scroll-mt-20 border-t">
      <Container>
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Popular categories
          </h2>
          <p className="text-muted-foreground">Browse by the services residents ask about most.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

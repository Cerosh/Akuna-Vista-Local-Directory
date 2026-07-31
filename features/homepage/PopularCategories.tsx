import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { categoryRepository } from "@/lib/repositories/categoryRepository";
import { CategoryCarousel } from "./CategoryCarousel";

export async function PopularCategories() {
  // Sprint 16 F-018: shows every category (previously only the 3 that
  // happened to carry a now-removed `featured` flag) in a horizontal
  // scroll-snap carousel — see CategoryCarousel.tsx.
  const categories = await categoryRepository.getAll();

  // A marketing homepage should never show an "empty state" message —
  // if there are no categories at all, the section simply doesn't render.
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
        <CategoryCarousel categories={categories} />
      </Container>
    </Section>
  );
}

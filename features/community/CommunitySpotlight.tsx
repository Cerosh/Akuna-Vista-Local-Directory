import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { EventCard } from "@/components/cards/EventCard";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { eventRepository } from "@/lib/repositories/eventRepository";
import { businessRepository } from "@/lib/repositories/businessRepository";
import { categoryRepository } from "@/lib/repositories/categoryRepository";

/**
 * One prominent card, not a carousel or new layout system — an extension
 * of the homepage's Featured Businesses concept (DESIGN_SYSTEM.md
 * "Homepage Layout"), reusing existing Business/Event data only. Never a
 * review or testimonial mechanism (sprint-06 notes.md).
 *
 * A still-upcoming featured event takes priority over a featured
 * business, since an event is inherently time-sensitive and a stale
 * spotlight would undercut "what's happening right now."
 */
export async function CommunitySpotlight() {
  const upcomingEvents = await eventRepository.getUpcomingEvents();
  const spotlightEvent = upcomingEvents.find((event) => event.featured);

  let spotlightCard: ReactNode = null;

  if (spotlightEvent) {
    spotlightCard = <EventCard event={spotlightEvent} />;
  } else {
    const featuredBusinesses = await businessRepository.getFeatured();
    const spotlightBusiness = featuredBusinesses[0];

    if (spotlightBusiness) {
      const categories = await categoryRepository.getAll();
      const categoryName = categories.find(
        (category) => category.id === spotlightBusiness.categoryId,
      )?.name;
      spotlightCard = <BusinessCard business={spotlightBusiness} categoryName={categoryName} />;
    }
  }

  // Same precedent as FeaturedBusinesses/PopularCategories: a single
  // highlight with nothing to highlight simply doesn't render.
  if (!spotlightCard) {
    return null;
  }

  return (
    <Section id="spotlight" className="border-border scroll-mt-20 border-t">
      <Container>
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Community spotlight
          </h2>
          <p className="text-muted-foreground">One thing from the community worth a look.</p>
        </div>
        <div className="mx-auto max-w-sm">{spotlightCard}</div>
      </Container>
    </Section>
  );
}

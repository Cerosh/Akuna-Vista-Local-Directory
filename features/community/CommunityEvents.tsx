import { CalendarDays } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { EmptyState } from "@/components/common/EmptyState";
import { EventCard } from "@/components/cards/EventCard";
import { eventRepository } from "@/lib/repositories/eventRepository";

/**
 * Unlike FeaturedBusinesses/PopularCategories (which hide themselves when
 * empty), this section always renders — an empty upcoming-events list is
 * an explicit Acceptance Criterion (sprint-06 Story 1): show a helpful
 * empty state, not a blank section.
 */
export async function CommunityEvents() {
  const events = await eventRepository.getUpcomingEvents();

  return (
    <Section id="events" className="border-border scroll-mt-20 border-t">
      <Container>
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Community events
          </h2>
          <p className="text-muted-foreground">What&apos;s coming up around the neighbourhood.</p>
        </div>
        {events.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No upcoming events yet"
            description="Check back soon — new community events are added regularly."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

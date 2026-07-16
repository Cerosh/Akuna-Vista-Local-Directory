import { Sparkles } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { EmptyState } from "@/components/common/EmptyState";
import { FeaturedContentCard } from "@/components/cards/FeaturedContentCard";
import { eventRepository } from "@/lib/repositories/eventRepository";
import { promotionRepository } from "@/lib/repositories/promotionRepository";
import { announcementRepository } from "@/lib/repositories/announcementRepository";
import { businessRepository } from "@/lib/repositories/businessRepository";
import { resolvePromotionBusinesses } from "@/lib/services/resolvePromotionBusinesses";
import { getFeaturedContent } from "@/lib/services/featuredContentService";

/**
 * The single featured-content section: aggregates featured:true records
 * across events, promotions and announcements via one mechanism
 * (getFeaturedContent), rather than three separate "featured X" sections.
 */
export async function FeaturedContent() {
  const [events, promotions, announcements] = await Promise.all([
    eventRepository.getFeaturedEvents(),
    promotionRepository.getFeaturedPromotions(),
    announcementRepository.getFeaturedAnnouncements(),
  ]);

  const resolvedPromotions = await resolvePromotionBusinesses(promotions, (id) =>
    businessRepository.getById(id),
  );

  const items = getFeaturedContent(events, resolvedPromotions, announcements);

  return (
    <Section id="featured" density="compact" className="border-border scroll-mt-20 border-t">
      <Container>
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h2 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
            Featured this week
          </h2>
          <p className="text-muted-foreground">Community content worth not missing.</p>
        </div>
        {items.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="Nothing featured right now"
            description="Check back soon — featured events, promotions and announcements appear here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <FeaturedContentCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

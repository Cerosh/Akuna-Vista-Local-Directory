import { Tag } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { EmptyState } from "@/components/common/EmptyState";
import { PromotionCard } from "@/components/cards/PromotionCard";
import { promotionRepository } from "@/lib/repositories/promotionRepository";
import { businessRepository } from "@/lib/repositories/businessRepository";
import { resolvePromotionBusinesses } from "@/lib/services/resolvePromotionBusinesses";

export async function Promotions() {
  const promotions = await promotionRepository.getActivePromotions();

  // A promotion whose business no longer resolves is omitted rather than
  // crashing the section — see sprint-06 tasks.md "Promotions".
  const resolved = await resolvePromotionBusinesses(promotions, (id) =>
    businessRepository.getById(id),
  );

  return (
    <Section id="promotions" className="border-border scroll-mt-20 border-t pt-6 sm:pt-8">
      <Container>
        {/* Reduced top gap (vs. the Section default) so promotion cards are
            visible without scrolling right after Hero — see sprint-14
            F-009. Left-aligned heading (F-001) instead of centered. */}
        <div className="mb-4 flex flex-col gap-2">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Local promotions
          </h2>
          <p className="text-muted-foreground">Current deals from businesses in the directory.</p>
        </div>
        {resolved.length === 0 ? (
          <EmptyState
            icon={Tag}
            title="No active promotions right now"
            description="Check back soon — local businesses add new promotions regularly."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resolved.map(({ promotion, business }) => (
              <PromotionCard
                key={promotion.id}
                promotion={promotion}
                businessName={business.name}
                businessSlug={business.slug}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

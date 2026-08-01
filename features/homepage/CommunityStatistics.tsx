import { Building2, Tag, Users } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { StatisticCard } from "@/components/cards/StatisticCard";
import { businessRepository } from "@/lib/repositories/businessRepository";
import { categoryRepository } from "@/lib/repositories/categoryRepository";
import { metadataRepository } from "@/lib/repositories/metadataRepository";

export async function CommunityStatistics() {
  const [metadata, businesses, categories] = await Promise.all([
    metadataRepository.get(),
    businessRepository.getAll(),
    categoryRepository.getAll(),
  ]);

  const stats = [
    metadata.communityMembers
      ? { icon: Users, value: `${metadata.communityMembers}+`, label: "Community members" }
      : null,
    { icon: Building2, value: `${businesses.length}`, label: "Businesses listed" },
    { icon: Tag, value: `${categories.length}`, label: "Categories covered" },
  ].filter((stat): stat is NonNullable<typeof stat> => stat !== null);

  if (stats.length === 0) {
    return null;
  }

  return (
    // No top border — WhyChooseLocal's tinted background right below already
    // separates it from FeaturedBusinesses above without a second divider
    // line immediately after (sprint-14 F-001 divider consolidation).
    <Section density="compact">
      <Container>
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h2 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
            A growing community
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <StatisticCard key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

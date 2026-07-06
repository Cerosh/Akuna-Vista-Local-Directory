import { Hero } from "@/features/homepage/Hero";
import { PopularCategories } from "@/features/homepage/PopularCategories";
import { FeaturedBusinesses } from "@/features/homepage/FeaturedBusinesses";
import { CommunityStatistics } from "@/features/homepage/CommunityStatistics";
import { WhyChooseLocal } from "@/features/homepage/WhyChooseLocal";
import { CommunitySpotlight } from "@/features/community/CommunitySpotlight";
import { FeaturedContent } from "@/features/community/FeaturedContent";
import { CommunityEvents } from "@/features/community/CommunityEvents";
import { Promotions } from "@/features/community/Promotions";
import { Announcements } from "@/features/community/Announcements";
import { LocalNewsPlaceholder } from "@/features/community/LocalNewsPlaceholder";
import { settingsRepository } from "@/lib/repositories/settingsRepository";

export default async function Home() {
  const settings = await settingsRepository.get();

  return (
    <>
      <Hero settings={settings} />
      <PopularCategories />
      <FeaturedBusinesses />
      <CommunityStatistics />
      <WhyChooseLocal />
      {/* Sprint 06 (Community Content) — appended after the existing
          Sprint 1-5 sections so their Visual Hierarchy is unchanged. */}
      <CommunitySpotlight />
      <FeaturedContent />
      <CommunityEvents />
      <Promotions />
      <Announcements />
      <LocalNewsPlaceholder />
    </>
  );
}

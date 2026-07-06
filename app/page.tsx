import { Hero } from "@/features/homepage/Hero";
import { PopularCategories } from "@/features/homepage/PopularCategories";
import { FeaturedBusinesses } from "@/features/homepage/FeaturedBusinesses";
import { CommunityStatistics } from "@/features/homepage/CommunityStatistics";
import { WhyChooseLocal } from "@/features/homepage/WhyChooseLocal";
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
    </>
  );
}

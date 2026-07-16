import type { Metadata } from "next";
import { Hero } from "@/features/homepage/Hero";
import { PopularCategories } from "@/features/homepage/PopularCategories";
import { FeaturedBusinesses } from "@/features/homepage/FeaturedBusinesses";
import { CommunityStatistics } from "@/features/homepage/CommunityStatistics";
import { WhyChooseLocal } from "@/features/homepage/WhyChooseLocal";
import { FeaturedContent } from "@/features/community/FeaturedContent";
import { CommunityEvents } from "@/features/community/CommunityEvents";
import { Promotions } from "@/features/community/Promotions";
import { Announcements } from "@/features/community/Announcements";
import { settingsRepository } from "@/lib/repositories/settingsRepository";
import { getSchofieldsWeather } from "@/lib/weather/weatherService";

// Title/description are already correct via the root layout's defaults for
// `/` — only the canonical needs to be explicit here.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [settings, initialWeather] = await Promise.all([
    settingsRepository.get(),
    // Fetched server-side so the Hero sidebar's weather card shows real
    // conditions on first paint instead of a guaranteed loading skeleton
    // (sprint-14 F-018) — degrades to `null` (client-side fetch takes over,
    // same as before) rather than failing the whole homepage render.
    getSchofieldsWeather().catch(() => null),
  ]);

  return (
    <>
      <Hero settings={settings} initialWeather={initialWeather} />
      <Promotions />
      <PopularCategories />
      <FeaturedBusinesses />
      <CommunityStatistics />
      <WhyChooseLocal />
      {/* Sprint 06 (Community Content) — appended after the existing
          Sprint 1-5 sections so their Visual Hierarchy is unchanged. */}
      <FeaturedContent />
      <CommunityEvents />
      <Announcements />
    </>
  );
}

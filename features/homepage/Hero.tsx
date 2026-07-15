import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { buttonVariants } from "@/components/ui/button";
import { SearchInput } from "@/components/common/SearchInput";
import { TransitWidget } from "@/features/homepage/TransitWidget";
import { WeatherCard } from "@/features/homepage/WeatherCard";
import type { Settings } from "@/types/settings";

interface HeroProps {
  settings: Settings;
}

/**
 * This is a local business directory first — live transit/weather data is
 * a secondary, at-a-glance convenience, not the page's main content (the
 * project owner's explicit framing, 2026-07-15). So the Hero stays the
 * visual centre of this row: a compact transit widget sits to its left,
 * balanced by a Schofields weather widget on the right (Sprint 13) —
 * neither should compete with Hero/Popular Categories for "central real
 * estate". Sidebars stack below Hero content on narrower screens, since a
 * business directory's search/hero should still come first on mobile.
 */
export function Hero({ settings }: HeroProps) {
  return (
    <Section className="pb-8 sm:pb-10">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[260px_1fr_260px]">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <TransitWidget />
          </div>

          <div className="order-1 mx-auto flex max-w-[640px] flex-col items-center gap-6 text-center lg:order-2">
            <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
              {settings.tagline ?? "Discover trusted local businesses."}
            </h1>
            <p className="text-muted-foreground max-w-[560px] text-lg">
              Recommendations from your {settings.communityName} neighbours — searchable, always up
              to date, and never lost in a WhatsApp thread.
            </p>

            <form action="/search" className="flex w-full max-w-[480px] flex-col gap-3 sm:flex-row">
              <SearchInput name="q" className="flex-1" />
              <button type="submit" className={buttonVariants({ size: "lg" })}>
                Search
              </button>
            </form>

            <Link
              href="/businesses"
              className="text-muted-foreground text-sm underline-offset-4 hover:underline"
            >
              Or browse the full directory
            </Link>
          </div>

          <div className="order-3 flex justify-center lg:justify-end">
            <WeatherCard />
          </div>
        </div>
      </Container>
    </Section>
  );
}

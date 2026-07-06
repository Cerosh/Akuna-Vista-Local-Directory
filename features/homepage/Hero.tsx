import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { buttonVariants } from "@/components/ui/button";
import { SearchInput } from "@/components/common/SearchInput";
import type { Settings } from "@/types/settings";

interface HeroProps {
  settings: Settings;
}

export function Hero({ settings }: HeroProps) {
  return (
    <Section className="pb-8 sm:pb-10">
      <Container>
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
            {settings.tagline ?? "Discover trusted local businesses."}
          </h1>
          <p className="text-muted-foreground max-w-[560px] text-lg">
            Recommendations from your {settings.communityName} neighbours — searchable, always up to
            date, and never lost in a WhatsApp thread.
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
      </Container>
    </Section>
  );
}

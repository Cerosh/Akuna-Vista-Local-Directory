import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { settingsRepository } from "@/lib/repositories/settingsRepository";

// This is intentionally a placeholder. The real homepage (hero, search,
// categories, featured businesses, community statistics) is built in
// Sprint 2 — see sprints/sprint-02-homepage.
export default async function Home() {
  const settings = await settingsRepository.get();

  return (
    <Section className="flex min-h-[60vh] items-center">
      <Container>
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            {settings.siteName}
          </h1>
          <p className="text-muted-foreground max-w-[560px]">
            {settings.tagline ?? "Coming soon."}
          </p>
        </div>
      </Container>
    </Section>
  );
}

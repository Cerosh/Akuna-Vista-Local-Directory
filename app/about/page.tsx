import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { settingsRepository } from "@/lib/repositories/settingsRepository";

export const metadata: Metadata = {
  title: "About | Akuna Vista Local Directory",
  description: "Why Akuna Vista Local Directory exists, and who it's for.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const settings = await settingsRepository.get();

  return (
    <Section>
      <Container narrow>
        <div className="mb-8">
          <PageHeader
            title="About"
            description={`Why ${settings.siteName} exists, and who it's for.`}
          />
        </div>
        <div className="text-foreground flex flex-col gap-6 text-base leading-relaxed">
          <p>
            Recommendations for a good plumber, a trustworthy electrician, or a reliable cleaner
            usually live inside WhatsApp group chats — helpful in the moment, then gone. A new
            resident asks the same question someone already answered months ago, and the answer is
            buried in a thread nobody can search.
          </p>
          <p>
            {settings.siteName} exists to turn those recommendations into something searchable and
            lasting: a community-driven directory of local businesses that residents of{" "}
            {settings.communityName} already trust, recommended by neighbours rather than paid
            advertising.
          </p>
          <p>
            This is the first version of a platform designed to eventually support other local
            communities the same way — starting with {settings.communityName}, and built to stay
            simple, trustworthy and genuinely useful rather than feature-heavy.
          </p>
          <p>
            Have a question, a correction, or a business to recommend?{" "}
            <a href="/contact" className="text-primary underline underline-offset-4">
              Get in touch
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}

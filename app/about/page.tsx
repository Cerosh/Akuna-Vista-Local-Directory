import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { settingsRepository } from "@/lib/repositories/settingsRepository";
import { StreetsWeCover } from "@/features/about/StreetsWeCover";

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
          <div className="border-secondary/30 text-secondary mb-4 inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-medium tracking-widest uppercase">
            Schofields, NSW — Former RAAF Airfield, Est. 1941
          </div>
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
        </div>
      </Container>

      <Container className="mt-10">
        <div className="border-border h-px w-full border-t border-dashed" aria-hidden="true" />
      </Container>

      <Container className="mt-10">
        <StreetsWeCover />
      </Container>

      <Container className="mt-10">
        <div className="border-border h-px w-full border-t border-dashed" aria-hidden="true" />
      </Container>

      <Container narrow className="mt-10">
        <p className="text-foreground text-base leading-relaxed">
          Have a question, a correction, or a business to recommend?{" "}
          <Link href="/contact" className="text-primary underline underline-offset-4">
            Get in touch
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}

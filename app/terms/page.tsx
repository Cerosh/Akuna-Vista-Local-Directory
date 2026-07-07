import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { settingsRepository } from "@/lib/repositories/settingsRepository";

export const metadata: Metadata = {
  title: "Terms of Service | Akuna Vista Local Directory",
  description: "The terms for using Akuna Vista Local Directory.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "8 July 2026";

export default async function TermsPage() {
  const settings = await settingsRepository.get();

  return (
    <Section>
      <Container narrow>
        <div className="mb-8">
          <PageHeader
            title="Terms of Service"
            description={`Last updated ${LAST_UPDATED}. Plain-language terms for a small, early-stage community project.`}
          />
        </div>
        <div className="text-foreground flex flex-col gap-6 text-base leading-relaxed">
          <p>
            By using {settings.siteName}, you agree to the following. This is written in plain
            language rather than formal legal terms, reflecting where the project is today.
          </p>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">What this site is</h2>
            <p>
              {settings.siteName} is an informational directory of local businesses in{" "}
              {settings.communityName}, built from community recommendations. It is not a booking,
              payment or review platform, and using it doesn&apos;t create any relationship between
              you and {settings.siteName} beyond browsing the directory.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">No warranty on listings</h2>
            <p>
              We do our best to keep business listings accurate, but we can&apos;t guarantee that
              every detail (opening hours, contact information, availability) is current or that any
              listed business will meet your expectations. Always confirm details directly with a
              business before relying on them.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">No accounts yet</h2>
            <p>
              This version of the site has no user accounts, sign-in, or ability to submit content
              directly. Everything you see is maintained by the project owner from community
              recommendations.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">Requesting a correction</h2>
            <p>
              If you&apos;re a business owner and something about your listing is wrong, or a
              resident and you&apos;ve spotted an error, please{" "}
              <a href="/contact" className="text-primary underline underline-offset-4">
                let us know
              </a>{" "}
              and we&apos;ll fix it.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">Changes to these terms</h2>
            <p>
              As the platform grows, these terms will be updated to reflect new features. See our{" "}
              <a href="/privacy" className="text-primary underline underline-offset-4">
                Privacy Policy
              </a>{" "}
              for how we handle information.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

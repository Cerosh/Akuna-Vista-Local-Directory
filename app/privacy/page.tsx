import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { settingsRepository } from "@/lib/repositories/settingsRepository";

export const metadata: Metadata = {
  title: "Privacy Policy | Akuna Vista Local Directory",
  description: "What Akuna Vista Local Directory does and doesn't do with your data.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "8 July 2026";

export default async function PrivacyPage() {
  const settings = await settingsRepository.get();

  return (
    <Section>
      <Container narrow>
        <div className="mb-8">
          <PageHeader
            title="Privacy Policy"
            description={`Last updated ${LAST_UPDATED}. Written in plain language, for a small, early-stage community project.`}
          />
        </div>
        <div className="text-foreground flex flex-col gap-6 text-base leading-relaxed">
          <p>
            {settings.siteName} is a directory of local businesses in {settings.communityName}. This
            page explains what the platform does — and doesn&apos;t do — with information about you,
            as of today.
          </p>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">No accounts, no sign-in</h2>
            <p>
              There is currently no way to create an account or sign in to this site. Every page is
              publicly viewable, and browsing the directory doesn&apos;t require giving us any
              personal information.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">What we collect today</h2>
            <p>
              The platform itself does not collect or store any personal information about visitors.
              If you email us via the{" "}
              <a href="/contact" className="text-primary underline underline-offset-4">
                Contact page
              </a>
              , we&apos;ll have whatever you choose to include in that email — nothing more.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">What&apos;s changing soon</h2>
            <p>
              We plan to add basic, privacy-respecting analytics (page views and general usage
              patterns) so we can understand how the directory is used and keep it running well.
              This will not involve accounts, tracking you individually across other sites, or
              selling data to anyone. We&apos;ll update this page when that happens.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">Business listings</h2>
            <p>
              Business details shown on this site (name, contact information, opening hours) are
              published because they&apos;re already public information for that business. If a
              business owner wants a listing corrected or removed, please{" "}
              <a href="/contact" className="text-primary underline underline-offset-4">
                get in touch
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-xl font-semibold">This will evolve</h2>
            <p>
              This is a first version of the platform and this policy will be revisited as features
              are added — particularly before anything that involves user accounts or collecting
              more information than described above. If you have questions about this policy,
              contact us using the details on the{" "}
              <a href="/contact" className="text-primary underline underline-offset-4">
                Contact page
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

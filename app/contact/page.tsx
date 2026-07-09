import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { settingsRepository } from "@/lib/repositories/settingsRepository";

export const metadata: Metadata = {
  title: "Contact | Akuna Vista Local Directory",
  description: "Get in touch with the Akuna Vista Local Directory team.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await settingsRepository.get();

  return (
    <Section>
      <Container narrow>
        <div className="mb-8">
          <PageHeader
            title="Contact"
            description="Questions, corrections, or a business to recommend — we'd like to hear from you."
          />
        </div>
        <div className="text-foreground flex flex-col gap-6 text-base leading-relaxed">
          <p>
            {settings.siteName} is run by and for the {settings.communityName} community. If you
            spot something wrong with a listing, want to suggest a local business, or just have a
            question, email us directly:
          </p>
          {settings.contactEmail ? (
            <a
              href={`mailto:${settings.contactEmail}`}
              className={buttonVariants({ variant: "default", className: "w-fit" })}
            >
              <Mail className="size-4" aria-hidden="true" />
              {settings.contactEmail}
            </a>
          ) : null}
          <p>
            <strong className="text-foreground font-semibold">Own a local business?</strong> Get in
            touch at the address above to have it added to the directory — include your business
            name, category, and the best contact details for residents to reach you.
          </p>
          <p className="text-muted-foreground text-sm">
            We read every message, though as a small community project response times can vary.
          </p>
        </div>
      </Container>
    </Section>
  );
}

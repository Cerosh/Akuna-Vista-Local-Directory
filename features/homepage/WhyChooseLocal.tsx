import { Search, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { IconWrapper } from "@/components/common/IconWrapper";

const REASONS = [
  {
    icon: Users,
    title: "Recommended by neighbours",
    description:
      "Every listing is grounded in genuine recommendations from people who actually live here — not paid placements.",
  },
  {
    icon: Search,
    title: "Nothing gets lost",
    description:
      "Search once instead of scrolling months of WhatsApp history to find the same recommendation again.",
  },
  {
    icon: ShieldCheck,
    title: "Trust before revenue",
    description:
      "We'd rather build a trusted directory slowly than a crowded one quickly. Quality over volume, always.",
  },
] as const;

export function WhyChooseLocal() {
  return (
    <Section className="border-border bg-muted/30 border-t">
      <Container>
        <div className="mb-10 flex flex-col gap-2 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Why choose local
          </h2>
          <p className="text-muted-foreground mx-auto max-w-[560px]">
            We&apos;re not building a business directory. We&apos;re preserving community knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center">
              <IconWrapper>
                <Icon className="size-5" aria-hidden="true" />
              </IconWrapper>
              <h3 className="text-foreground text-base font-semibold">{title}</h3>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

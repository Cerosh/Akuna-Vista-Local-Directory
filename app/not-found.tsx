import Link from "next/link";
import { MapPinOff } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { IconWrapper } from "@/components/common/IconWrapper";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="py-24 sm:py-32">
      <Container narrow className="flex flex-col items-center gap-4 text-center">
        <IconWrapper className="size-14">
          <MapPinOff className="size-6" aria-hidden="true" />
        </IconWrapper>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          We couldn&apos;t find that page
        </h1>
        <p className="text-muted-foreground max-w-[480px]">
          The page you&apos;re looking for may have moved or no longer exists. Try heading back to
          the homepage, or browse the directory to find a local business.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Return home
          </Link>
          <Link href="/businesses" className={buttonVariants({ variant: "secondary" })}>
            Browse businesses
          </Link>
        </div>
      </Container>
    </Section>
  );
}

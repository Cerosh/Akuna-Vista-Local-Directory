"use client";

import { useEffect } from "react";
import { ServerCrash } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { IconWrapper } from "@/components/common/IconWrapper";
import { Button, buttonVariants } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Route-segment error boundary (Next.js requires this to be a Client
 * Component). Never surfaces `error.message`/stack traces — per
 * DESIGN_SYSTEM.md/UI_GUIDELINES.md "Error States", this should read as
 * "something went wrong, here's what to do," not a debug console.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Console-only for now — central error reporting is Sprint 9
    // (Production Readiness) per ARCHITECTURE.md's "Logging" section.
    console.error(error);
  }, [error]);

  return (
    <Section className="py-24 sm:py-32">
      <Container narrow className="flex flex-col items-center gap-4 text-center">
        <IconWrapper className="bg-destructive/10 text-destructive size-14">
          <ServerCrash className="size-6" aria-hidden="true" />
        </IconWrapper>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          Something went wrong
        </h1>
        <p className="text-muted-foreground max-w-[480px]">
          We hit an unexpected problem loading this page. It might just be temporary — try again, or
          head back to the homepage.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button variant="default" onClick={reset}>
            Try again
          </Button>
          <Link href="/" className={buttonVariants({ variant: "secondary" })}>
            Return home
          </Link>
        </div>
      </Container>
    </Section>
  );
}

import { Newspaper } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconWrapper } from "@/components/common/IconWrapper";

/**
 * Intentionally a static placeholder — no feed logic, external data
 * source or real news content this sprint (sprint-06 Story 4 / Out of
 * Scope). Reads as "coming soon," not broken or missing.
 */
export function LocalNewsPlaceholder() {
  return (
    <Section id="local-news" className="border-border scroll-mt-20 border-t">
      <Container narrow>
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Local news
          </h2>
          <Badge variant="secondary">Coming soon</Badge>
        </div>
        <Card>
          <CardContent className="flex items-center gap-3">
            <IconWrapper>
              <Newspaper className="size-5" aria-hidden="true" />
            </IconWrapper>
            <CardDescription>
              We&apos;re working on bringing local news coverage to Akuna Vista — for now, check the
              Community Events and Announcements above for what&apos;s happening.
            </CardDescription>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}

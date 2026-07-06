import { Newspaper } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <IconWrapper>
                <Newspaper className="size-5" aria-hidden="true" />
              </IconWrapper>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">Local news</CardTitle>
                  <Badge variant="secondary">Coming soon</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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

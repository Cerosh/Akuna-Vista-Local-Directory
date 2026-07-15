import { CloudSun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconWrapper } from "@/components/common/IconWrapper";

/**
 * Placeholder for a planned Weather widget (project owner's direction,
 * 2026-07-15) — balances `TransitWidget` on the opposite side of Hero.
 * Static, no data fetching; swap this out entirely once the real widget
 * is built rather than growing it into one.
 */
export function WeatherComingSoon() {
  return (
    <Card size="sm" className="w-full max-w-[260px]">
      <CardHeader>
        <CardTitle className="text-sm">Weather</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2 py-2 text-center">
        <IconWrapper>
          <CloudSun className="size-5" aria-hidden="true" />
        </IconWrapper>
        <p className="text-muted-foreground text-xs">Coming soon</p>
      </CardContent>
    </Card>
  );
}

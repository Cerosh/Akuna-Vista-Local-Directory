import type { ComponentType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IconWrapper } from "@/components/common/IconWrapper";

interface StatisticCardProps {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

/** Statistic Card per DESIGN_SYSTEM.md's component library. */
export function StatisticCard({ label, value, icon: Icon }: StatisticCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
        {Icon ? (
          <IconWrapper>
            <Icon className="size-5" aria-hidden="true" />
          </IconWrapper>
        ) : null}
        <span className="text-foreground text-2xl font-semibold">{value}</span>
        <span className="text-muted-foreground text-sm">{label}</span>
      </CardContent>
    </Card>
  );
}

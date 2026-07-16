import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
  /**
   * "comfortable" (default) for primary homepage sections (Hero, Popular
   * Categories, Featured Businesses); "compact" for secondary/supporting
   * sections, so a long homepage doesn't read as one uniformly-spaced
   * block repeated ten times (2026-07 UI polish pass).
   */
  density?: "comfortable" | "compact";
}

/**
 * Vertical rhythm wrapper for page sections. Keeps spacing consistent
 * with the 8-point spacing scale (DESIGN_SYSTEM.md).
 */
export function Section({
  children,
  className,
  as: Tag = "section",
  id,
  density = "comfortable",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(density === "compact" ? "py-10 sm:py-12" : "py-12 sm:py-16", className)}
    >
      {children}
    </Tag>
  );
}

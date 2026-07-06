import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Vertical rhythm wrapper for page sections. Keeps spacing consistent
 * with the 8-point spacing scale (DESIGN_SYSTEM.md).
 */
export function Section({ children, className, as: Tag = "section" }: SectionProps) {
  return <Tag className={cn("py-12 sm:py-16", className)}>{children}</Tag>;
}

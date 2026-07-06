import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Reading width (720px) for long-form text content. */
  narrow?: boolean;
}

/**
 * Centred, horizontally-padded content wrapper.
 * Widths follow DESIGN_SYSTEM.md: max 1280px, standard 1024px, reading 720px.
 */
export function Container({ children, className, narrow = false }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-[720px]" : "max-w-[1280px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

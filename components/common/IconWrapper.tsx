import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconWrapperProps {
  children: ReactNode;
  className?: string;
}

/** Consistent rounded background for a Lucide icon. */
export function IconWrapper({ children, className }: IconWrapperProps) {
  return (
    <span
      className={cn(
        "bg-primary/10 text-primary inline-flex size-10 shrink-0 items-center justify-center rounded-full",
        className,
      )}
    >
      {children}
    </span>
  );
}

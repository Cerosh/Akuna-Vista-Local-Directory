import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { SearchX } from "lucide-react";
import { IconWrapper } from "@/components/common/IconWrapper";
import { buttonVariants } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; href: string };
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  children?: ReactNode;
}

/**
 * Generic empty state per UI_GUIDELINES.md — explain why nothing is
 * shown, suggest a next step, keep the tone positive. Never a bare
 * "no results" message.
 */
export function EmptyState({
  title,
  description,
  action,
  icon: Icon = SearchX,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <IconWrapper>
        <Icon className="size-5" aria-hidden="true" />
      </IconWrapper>
      <div className="flex flex-col gap-1">
        <h3 className="text-foreground text-base font-semibold">{title}</h3>
        <p className="text-muted-foreground max-w-[420px] text-sm">{description}</p>
      </div>
      {action ? (
        <Link href={action.href} className={buttonVariants({ variant: "secondary", size: "sm" })}>
          {action.label}
        </Link>
      ) : null}
      {children}
    </div>
  );
}

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSearchParams } from "@/lib/utils/searchParams";

interface PaginationProps {
  basePath: string;
  preserveParams?: Record<string, string | undefined>;
  page: number;
  totalPages: number;
}

/** Prev/Next pagination. URL-driven, no client state. */
export function Pagination({ basePath, preserveParams = {}, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-4">
      <PageLink
        basePath={basePath}
        preserveParams={preserveParams}
        page={page - 1}
        disabled={page <= 1}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Previous
      </PageLink>

      <span className="text-muted-foreground text-sm">
        Page {page} of {totalPages}
      </span>

      <PageLink
        basePath={basePath}
        preserveParams={preserveParams}
        page={page + 1}
        disabled={page >= totalPages}
      >
        Next
        <ChevronRight className="size-4" aria-hidden="true" />
      </PageLink>
    </nav>
  );
}

interface PageLinkProps {
  basePath: string;
  preserveParams: Record<string, string | undefined>;
  page: number;
  disabled: boolean;
  children: React.ReactNode;
}

function PageLink({ basePath, preserveParams, page, disabled, children }: PageLinkProps) {
  const className = cn(
    "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-fast",
    disabled ? "cursor-not-allowed text-muted-foreground/50" : "text-foreground hover:bg-muted",
  );

  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <Link href={withSearchParams(basePath, preserveParams, { page })} className={className}>
      {children}
    </Link>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";
import { withSearchParams } from "@/lib/utils/searchParams";
import type { BusinessSortOption } from "@/lib/repositories/businessRepository";

const SORT_OPTIONS: { value: BusinessSortOption; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "name", label: "Name A–Z" },
];

interface SortControlProps {
  basePath: string;
  currentSort: BusinessSortOption;
  preserveParams?: Record<string, string | undefined>;
}

/** Sort control for the business directory. URL-driven, no client state. */
export function SortControl({ basePath, currentSort, preserveParams = {} }: SortControlProps) {
  return (
    <div role="group" aria-label="Sort businesses" className="flex gap-2">
      {SORT_OPTIONS.map((option) => {
        const active = currentSort === option.value;
        return (
          <Link
            key={option.value}
            href={withSearchParams(basePath, preserveParams, {
              sort: option.value,
              page: undefined,
            })}
            aria-current={active ? "true" : undefined}
            className={cn(
              "duration-fast rounded-full px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}

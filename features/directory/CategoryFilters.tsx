import Link from "next/link";
import { cn } from "@/lib/utils";
import { withSearchParams } from "@/lib/utils/searchParams";
import type { Category } from "@/types/category";

interface CategoryFiltersProps {
  categories: Category[];
  activeCategoryId?: string;
  sort?: string;
}

/** Category filter chips for /businesses. URL-driven, no client state. */
export function CategoryFilters({ categories, activeCategoryId, sort }: CategoryFiltersProps) {
  const current = { sort };

  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
      <FilterChip
        href={withSearchParams("/businesses", current, { category: undefined, page: undefined })}
        active={!activeCategoryId}
      >
        All
      </FilterChip>
      {categories.map((category) => (
        <FilterChip
          key={category.id}
          href={withSearchParams("/businesses", current, {
            category: category.slug,
            page: undefined,
          })}
          active={activeCategoryId === category.id}
        >
          {category.name}
        </FilterChip>
      ))}
    </div>
  );
}

interface FilterChipProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

function FilterChip({ href, active, children }: FilterChipProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "duration-fast rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

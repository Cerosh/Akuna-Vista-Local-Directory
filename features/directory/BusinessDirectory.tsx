import { businessRepository, type BusinessSortOption } from "@/lib/repositories/businessRepository";
import { categoryRepository } from "@/lib/repositories/categoryRepository";
import { BusinessCard } from "@/components/cards/BusinessCard";
import { EmptyState } from "@/components/common/EmptyState";
import { CategoryFilters } from "@/features/directory/CategoryFilters";
import { SortControl } from "@/features/directory/SortControl";
import { Pagination } from "@/features/directory/Pagination";

const VALID_SORTS: BusinessSortOption[] = ["featured", "name"];

function parseSort(value: string | undefined): BusinessSortOption {
  return VALID_SORTS.includes(value as BusinessSortOption)
    ? (value as BusinessSortOption)
    : "featured";
}

function parsePage(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

interface BusinessDirectoryProps {
  /** "/businesses" or "/category/[slug]" — used to build filter/sort/page links. */
  basePath: string;
  /** Fixed category on /category/[slug]; absent (togglable) on /businesses. */
  categoryId?: string;
  showCategoryFilters?: boolean;
  searchParams: { sort?: string; page?: string };
}

/**
 * The single filter/sort/pagination composition shared by `/businesses`
 * and `/category/[slug]` — see sprints/sprint-03-directory/notes.md
 * "Shared filtering logic". Never duplicate this in either route.
 */
export async function BusinessDirectory({
  basePath,
  categoryId,
  showCategoryFilters = false,
  searchParams,
}: BusinessDirectoryProps) {
  const sort = parseSort(searchParams.sort);
  const page = parsePage(searchParams.page);

  const [categories, result] = await Promise.all([
    categoryRepository.getAll(),
    businessRepository.getPage({ categoryId, sort, page }),
  ]);

  const categoryNameById = new Map(categories.map((category) => [category.id, category.name]));
  const preserveParams = showCategoryFilters ? { category: categoryId, sort } : { sort };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {showCategoryFilters ? (
          <CategoryFilters categories={categories} activeCategoryId={categoryId} sort={sort} />
        ) : null}
        <SortControl basePath={basePath} currentSort={sort} preserveParams={preserveParams} />
      </div>

      {result.items.length === 0 ? (
        <EmptyState
          title="No businesses found"
          description="Try a different category, or check back soon — new businesses are added regularly."
          action={categoryId ? { label: "View all businesses", href: "/businesses" } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.items.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              categoryName={categoryNameById.get(business.categoryId)}
            />
          ))}
        </div>
      )}

      <Pagination
        basePath={basePath}
        preserveParams={preserveParams}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}

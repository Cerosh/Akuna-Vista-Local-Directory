import Link from "next/link";
import type { Category } from "@/types/category";

interface BreadcrumbProps {
  businessName: string;
  category?: Category;
}

/** Home > Category > Business Name. Category segment omitted if the business's category wasn't found. */
export function Breadcrumb({ businessName, category }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </li>
        {category ? (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/category/${category.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {category.name}
              </Link>
            </li>
          </>
        ) : null}
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-foreground font-medium">
          {businessName}
        </li>
      </ol>
    </nav>
  );
}

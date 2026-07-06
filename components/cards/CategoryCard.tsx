import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Store } from "lucide-react";
import type { ComponentType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IconWrapper } from "@/components/common/IconWrapper";
import type { Category } from "@/types/category";

interface IconProps {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

interface CategoryCardProps {
  category: Category;
}

/** Category Card per DESIGN_SYSTEM.md's Homepage Layout / component library. */
export function CategoryCard({ category }: CategoryCardProps) {
  const icons = LucideIcons as unknown as Record<string, ComponentType<IconProps>>;
  const Icon = (category.icon && icons[category.icon]) || Store;

  return (
    <Link href={`/category/${category.slug}`} prefetch={false} className="group block h-full">
      <Card className="duration-fast group-hover:border-primary/40 h-full transition-colors">
        <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
          <IconWrapper>
            <Icon className="size-5" aria-hidden="true" />
          </IconWrapper>
          <span className="text-foreground text-sm font-medium">{category.name}</span>
        </CardContent>
      </Card>
    </Link>
  );
}

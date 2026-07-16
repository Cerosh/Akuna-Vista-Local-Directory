import Link from "next/link";
import { Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDateRange } from "@/lib/utils/formatDate";
import type { Promotion } from "@/types/promotion";

interface PromotionCardProps {
  promotion: Promotion;
  businessName: string;
  businessSlug: string;
}

/**
 * Promotion Card — same Card/Badge primitives as BusinessCard.tsx. Takes
 * the resolved business name/slug as props rather than a businessId, so
 * the caller (Promotions.tsx) owns the BusinessRepository lookup and can
 * omit promotions whose business no longer resolves.
 */
export function PromotionCard({ promotion, businessName, businessSlug }: PromotionCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-xs font-medium">{businessName}</span>
            <CardTitle className="text-base">{promotion.title}</CardTitle>
          </div>
          {promotion.featured ? <Badge>Featured</Badge> : null}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <CardDescription className="line-clamp-2">{promotion.description}</CardDescription>
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Tag className="size-3.5" aria-hidden="true" />
          <span>Valid {formatDateRange(promotion.startDate, promotion.endDate)}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Link
          href={`/business/${businessSlug}`}
          className={buttonVariants({ size: "sm", variant: "secondary" })}
        >
          View business
        </Link>
      </CardFooter>
    </Card>
  );
}

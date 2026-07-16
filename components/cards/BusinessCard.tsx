import Link from "next/link";
import { MapPin } from "lucide-react";
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
import type { Business } from "@/types/business";

interface BusinessCardProps {
  business: Business;
  categoryName?: string;
}

/**
 * Business Card per DESIGN_SYSTEM.md's Business Card Design.
 * Rating and recommendation count are intentionally omitted — those
 * fields don't exist in JSON_SCHEMA.md's Business schema yet, and this
 * card should never display fabricated numbers.
 */
export function BusinessCard({ business, categoryName }: BusinessCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            {categoryName ? (
              <span className="text-muted-foreground text-xs font-medium">{categoryName}</span>
            ) : null}
            <CardTitle className="text-base">{business.name}</CardTitle>
          </div>
          <div className="flex shrink-0 gap-1">
            {business.featured ? <Badge>Featured</Badge> : null}
            {business.verified ? (
              <Badge className="bg-success text-success-foreground">Verified</Badge>
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <CardDescription>{business.shortDescription ?? business.description}</CardDescription>
        {business.address?.suburb ? (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <MapPin className="size-3.5" aria-hidden="true" />
            <span>
              {business.address.suburb}
              {business.address.state ? `, ${business.address.state}` : ""}
            </span>
          </div>
        ) : null}
      </CardContent>

      {/* Flush, borderless footer — overridden locally rather than changing the
          shared CardFooter primitive, so other CardFooter consumers (e.g.
          PromotionCard) keep their divided/shaded treatment unchanged. */}
      <CardFooter className="border-t-0 bg-transparent pt-0">
        {/* A plain Link styled with buttonVariants, not the Button component —
            this is a navigation link, so it should keep native <a> semantics
            (role="link") rather than Base UI's Button forcing role="button". */}
        <Link
          href={`/business/${business.slug}`}
          className={buttonVariants({ size: "sm", variant: "secondary" })}
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
import { ShareButton } from "@/features/business-details/ShareButton";
import type { Business } from "@/types/business";

interface BusinessHeroProps {
  business: Business;
  categoryName?: string;
}

export function BusinessHero({ business, categoryName }: BusinessHeroProps) {
  return (
    <div className="border-border flex flex-col gap-4 border-b pb-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          {categoryName ? (
            <span className="text-muted-foreground text-sm font-medium">{categoryName}</span>
          ) : null}
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            {business.name}
          </h1>
          <div className="flex gap-2">
            {business.featured ? <Badge>Featured</Badge> : null}
            {business.verified ? (
              <Badge className="bg-success text-success-foreground">Verified</Badge>
            ) : null}
          </div>
        </div>
        <ShareButton businessName={business.name} />
      </div>
      <p className="text-muted-foreground max-w-[720px]">{business.description}</p>
    </div>
  );
}

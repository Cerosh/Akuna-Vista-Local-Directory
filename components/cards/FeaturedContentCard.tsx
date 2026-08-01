import Link from "next/link";
import { Calendar, Megaphone, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type {
  FeaturedContentItem,
  FeaturedContentType,
} from "@/lib/services/featuredContentService";

const TYPE_LABEL: Record<FeaturedContentType, string> = {
  event: "Event",
  promotion: "Promotion",
  announcement: "Announcement",
};

const TYPE_ICON: Record<FeaturedContentType, typeof Calendar> = {
  event: Calendar,
  promotion: Tag,
  announcement: Megaphone,
};

interface FeaturedContentCardProps {
  item: FeaturedContentItem;
}

/**
 * The one presentation component for all featured content, regardless of
 * source type — per sprint-06 tasks.md "Do not implement three separate
 * featured UIs." A type badge is the only thing that varies visually.
 */
export function FeaturedContentCard({ item }: FeaturedContentCardProps) {
  const Icon = TYPE_ICON[item.type];

  const card = (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1 text-base" title={item.title}>
            {item.title}
          </CardTitle>
          <Badge>
            <Icon aria-hidden="true" />
            {TYPE_LABEL[item.type]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {/* min-h-10 (≈2 lines at text-sm) reserves space for the clamp's
            max, not just its cap — see PromotionCard.tsx for why (code-review
            finding, Sprint 16 F-023). */}
        <CardDescription className="line-clamp-2 min-h-10">{item.description}</CardDescription>
        <span className="text-muted-foreground text-xs">{item.meta}</span>
      </CardContent>
    </Card>
  );

  if (!item.href) {
    return card;
  }

  return (
    <Link href={item.href} className="block h-full">
      {card}
    </Link>
  );
}

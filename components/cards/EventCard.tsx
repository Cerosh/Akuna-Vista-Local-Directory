import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateRange } from "@/lib/utils/formatDate";
import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

/**
 * Event Card — same Card/Badge primitives as BusinessCard.tsx, per
 * DESIGN_SYSTEM.md's Cards guidance (title, description, optional image,
 * optional badge, primary action). No "primary action" here since events
 * have no detail page of their own this sprint.
 */
export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="h-full">
      {event.image ? (
        <div className="bg-muted relative aspect-video w-full">
          <Image
            src={event.image}
            alt={`${event.title} event image`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : null}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1 text-base" title={event.title}>
            {event.title}
          </CardTitle>
          {event.featured ? <Badge>Featured</Badge> : null}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {/* min-h-10 (≈2 lines at text-sm) reserves space for the clamp's
            max, not just its cap — see PromotionCard.tsx for why (code-review
            finding, Sprint 16 F-023). */}
        <CardDescription className="line-clamp-2 min-h-10">{event.description}</CardDescription>
        <div className="text-muted-foreground flex flex-col gap-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5" aria-hidden="true" />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden="true" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

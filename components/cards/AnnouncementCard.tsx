import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/formatDate";
import type { Announcement } from "@/types/announcement";

interface AnnouncementCardProps {
  announcement: Announcement;
}

/**
 * Announcement Card — deliberately simple (noticeboard, not a CMS, per
 * sprint-06 notes.md): title, message, published date, and a priority
 * badge only when it's actually worth calling out.
 */
export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{announcement.title}</CardTitle>
          {announcement.priority === "high" ? <Badge variant="destructive">Important</Badge> : null}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardDescription>{announcement.message}</CardDescription>
        <span className="text-muted-foreground text-xs">
          Posted {formatDate(announcement.publishedAt)}
        </span>
      </CardContent>
    </Card>
  );
}

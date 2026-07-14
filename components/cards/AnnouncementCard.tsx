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
import { formatDate } from "@/lib/utils/formatDate";
import type { Announcement } from "@/types/announcement";

interface AnnouncementCardProps {
  announcement: Announcement;
}

/**
 * Announcement Card — deliberately simple (noticeboard, not a CMS, per
 * sprint-06 notes.md): title, message, published date, a priority badge
 * only when it's actually worth calling out, and an optional "Read more"
 * link back to the original source (council page, DA notice, etc — Sprint
 * 09b F-004) when `sourceUrl` is present.
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
      {announcement.sourceUrl ? (
        <CardFooter>
          <a
            href={announcement.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "sm", variant: "secondary" })}
          >
            Read more
          </a>
        </CardFooter>
      ) : null}
    </Card>
  );
}

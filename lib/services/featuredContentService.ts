import type { Event } from "@/types/event";
import type { Announcement } from "@/types/announcement";
import type { ResolvedPromotion } from "@/lib/services/resolvePromotionBusinesses";
import { formatDate, formatDateRange } from "@/lib/utils/formatDate";

export type FeaturedContentType = "event" | "promotion" | "announcement";

export interface FeaturedContentItem {
  id: string;
  type: FeaturedContentType;
  title: string;
  description: string;
  meta: string;
  href?: string;
}

/**
 * The single cross-content-type "featured" mechanism (sprint-06): takes
 * already-featured events/promotions/announcements and normalises them
 * into one shape so they can share a single presentation component
 * (FeaturedContentCard) instead of three ad hoc "featured X" treatments.
 */
export function getFeaturedContent(
  events: Event[],
  promotions: ResolvedPromotion[],
  announcements: Announcement[],
): FeaturedContentItem[] {
  const eventItems: FeaturedContentItem[] = events.map((event) => ({
    id: event.id,
    type: "event",
    title: event.title,
    description: event.description,
    meta: `${formatDateRange(event.startDate, event.endDate)} · ${event.location}`,
  }));

  const promotionItems: FeaturedContentItem[] = promotions.map(({ promotion, business }) => ({
    id: promotion.id,
    type: "promotion",
    title: promotion.title,
    description: promotion.description,
    meta: business.name,
    href: `/business/${business.slug}`,
  }));

  const announcementItems: FeaturedContentItem[] = announcements.map((announcement) => ({
    id: announcement.id,
    type: "announcement",
    title: announcement.title,
    description: announcement.message,
    meta: formatDate(announcement.publishedAt),
  }));

  return [...eventItems, ...promotionItems, ...announcementItems];
}

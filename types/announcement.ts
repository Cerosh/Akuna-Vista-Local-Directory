export type AnnouncementPriority = "normal" | "high";

/**
 * New in Sprint 06 — no existing schema precedent in JSON_SCHEMA.md.
 * `featured` is a deliberate addition beyond the sprint's minimal field
 * list (id, title, message, publishedAt, expiresAt, priority): the
 * Featured Content mechanism aggregates `featured: true` records across
 * events, promotions AND announcements, so announcements need the field
 * too for that mechanism to work.
 */
export interface Announcement {
  id: string;
  title: string;
  message: string;
  publishedAt: string;
  expiresAt?: string;
  priority: AnnouncementPriority;
  featured: boolean;
}

import type { Announcement } from "@/types/announcement";
import announcementsData from "@/data/announcements.json";
import { isPast } from "@/lib/utils/dateStatus";

export interface AnnouncementRepository {
  getAll(): Promise<Announcement[]>;
  getActiveAnnouncements(): Promise<Announcement[]>;
  getFeaturedAnnouncements(): Promise<Announcement[]>;
}

/**
 * JSON-backed implementation. See businessRepository.ts for why the data
 * set is injectable via the constructor.
 */
export class JSONAnnouncementRepository implements AnnouncementRepository {
  private readonly announcements: Announcement[];

  constructor(announcements: Announcement[] = announcementsData as Announcement[]) {
    this.announcements = announcements;
  }

  async getAll(): Promise<Announcement[]> {
    return this.announcements;
  }

  async getActiveAnnouncements(): Promise<Announcement[]> {
    return this.announcements
      .filter((announcement) => !announcement.expiresAt || !isPast(announcement.expiresAt))
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getFeaturedAnnouncements(): Promise<Announcement[]> {
    return this.announcements.filter((announcement) => announcement.featured);
  }
}

export const announcementRepository: AnnouncementRepository = new JSONAnnouncementRepository();

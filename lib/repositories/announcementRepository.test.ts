import { describe, expect, it } from "vitest";
import { JSONAnnouncementRepository } from "./announcementRepository";
import type { Announcement } from "@/types/announcement";

function makeAnnouncement(overrides: Partial<Announcement>): Announcement {
  return {
    id: "00000000-0000-0000-0000-000000000000",
    title: "Example Announcement",
    message: "An announcement used for testing.",
    publishedAt: "2026-07-01T00:00:00Z",
    priority: "normal",
    featured: false,
    ...overrides,
  };
}

describe("JSONAnnouncementRepository", () => {
  const now = new Date("2026-07-06T12:00:00Z");

  it("returns all announcements", async () => {
    const announcements = [makeAnnouncement({ id: "a" }), makeAnnouncement({ id: "b" })];
    const repository = new JSONAnnouncementRepository(announcements);

    await expect(repository.getAll()).resolves.toHaveLength(2);
  });

  it("returns an empty array when no announcements exist", async () => {
    const repository = new JSONAnnouncementRepository([]);

    await expect(repository.getActiveAnnouncements()).resolves.toEqual([]);
  });

  it("excludes announcements whose expiresAt has passed", async () => {
    const active = makeAnnouncement({ id: "active", expiresAt: "2026-07-31T00:00:00Z" });
    const expired = makeAnnouncement({ id: "expired", expiresAt: "2026-07-01T00:00:00Z" });
    const noExpiry = makeAnnouncement({ id: "no-expiry" });
    const repository = new JSONAnnouncementRepository([active, expired, noExpiry]);

    const originalNow = Date.now;
    Date.now = () => now.getTime();
    try {
      const result = await repository.getActiveAnnouncements();
      expect(result.map((announcement) => announcement.id).sort()).toEqual(
        ["active", "no-expiry"].sort(),
      );
    } finally {
      Date.now = originalNow;
    }
  });

  it("orders active announcements newest publishedAt first", async () => {
    const older = makeAnnouncement({ id: "older", publishedAt: "2026-07-01T00:00:00Z" });
    const newer = makeAnnouncement({ id: "newer", publishedAt: "2026-07-05T00:00:00Z" });
    const repository = new JSONAnnouncementRepository([older, newer]);

    const result = await repository.getActiveAnnouncements();

    expect(result.map((announcement) => announcement.id)).toEqual(["newer", "older"]);
  });

  it("returns only featured announcements", async () => {
    const featured = makeAnnouncement({ id: "featured", featured: true });
    const notFeatured = makeAnnouncement({ id: "not-featured", featured: false });
    const repository = new JSONAnnouncementRepository([featured, notFeatured]);

    await expect(repository.getFeaturedAnnouncements()).resolves.toEqual([featured]);
  });
});

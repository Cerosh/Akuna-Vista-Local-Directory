import { Megaphone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { EmptyState } from "@/components/common/EmptyState";
import { AnnouncementCard } from "@/components/cards/AnnouncementCard";
import { announcementRepository } from "@/lib/repositories/announcementRepository";

/**
 * A simple noticeboard — a stacked list, not a card-grid, per sprint-06
 * notes.md ("this is a noticeboard, not a CMS").
 */
export async function Announcements() {
  const announcements = await announcementRepository.getActiveAnnouncements();

  // No top border — same consolidation reasoning as CommunityEvents.tsx.
  return (
    <Section id="announcements" density="compact" className="scroll-mt-20">
      <Container narrow>
        <div className="mb-8 flex flex-col gap-2 text-center">
          <h2 className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl">
            Community noticeboard
          </h2>
          <p className="text-muted-foreground">Announcements worth knowing about.</p>
        </div>
        {announcements.length === 0 ? (
          <EmptyState
            icon={Megaphone}
            title="No announcements right now"
            description="Check back soon — community announcements are posted here as they come up."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

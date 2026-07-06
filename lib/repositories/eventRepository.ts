import type { Event } from "@/types/event";
import eventsData from "@/data/events.json";
import { isPast } from "@/lib/utils/dateStatus";

export interface EventRepository {
  getAll(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  getFeaturedEvents(): Promise<Event[]>;
}

/**
 * JSON-backed implementation. See businessRepository.ts for why the data
 * set is injectable via the constructor.
 */
export class JSONEventRepository implements EventRepository {
  private readonly events: Event[];

  constructor(events: Event[] = eventsData as Event[]) {
    this.events = events;
  }

  async getAll(): Promise<Event[]> {
    return this.events;
  }

  async getUpcomingEvents(): Promise<Event[]> {
    return this.events
      .filter((event) => !isPast(event.endDate))
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }

  async getFeaturedEvents(): Promise<Event[]> {
    return this.events.filter((event) => event.featured);
  }
}

export const eventRepository: EventRepository = new JSONEventRepository();

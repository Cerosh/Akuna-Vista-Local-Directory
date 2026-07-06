/**
 * Single shared "has this ISO 8601 date passed" check, reused by events
 * (upcoming), promotions (active) and announcements (expired) — see
 * sprints/sprint-06-community/notes.md "Date comparison ... does not
 * justify a date library."
 */
export function isPast(dateIso: string, now: Date = new Date()): boolean {
  return new Date(dateIso).getTime() < now.getTime();
}

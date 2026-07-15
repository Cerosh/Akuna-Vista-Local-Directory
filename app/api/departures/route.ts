import { getStationDepartures } from "@/lib/transportNsw/departureService";
export type { TrainDeparture } from "@/lib/transportNsw/types";

/**
 * Server-side proxy for NSW Transport's live departure board API
 * (`departure_mon` — the departure-board-purpose-built endpoint, not the
 * general-purpose `trip` planner). See
 * lib/transportNsw/departureService.ts for the fetch/filter/sort logic.
 */
export async function GET() {
  try {
    const departures = await getStationDepartures();
    return Response.json({ departures });
  } catch (error) {
    console.error("Failed to fetch train departures:", error);
    return Response.json({ error: true }, { status: 502 });
  }
}

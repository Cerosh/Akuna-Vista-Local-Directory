import { getCarparkAvailability } from "@/lib/transportNsw/carparkService";
export type { CarparkAvailability } from "@/lib/transportNsw/types";

/**
 * Server-side proxy for NSW Transport's live carpark API — see
 * lib/transportNsw/carparkService.ts for the actual fetch/aggregation
 * logic (kept out of the route so it's unit-testable without an HTTP
 * layer, matching lib/transportNsw/departureService.ts's pattern).
 */
export async function GET() {
  try {
    const body = await getCarparkAvailability();
    return Response.json(body);
  } catch (error) {
    console.error("Failed to fetch carpark availability:", error);
    return Response.json({ error: true }, { status: 502 });
  }
}

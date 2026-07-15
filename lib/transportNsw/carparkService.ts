import { fetchTransportNsw } from "./client";
import type { CarparkAvailability } from "./types";

const SCHOFIELDS_FACILITY_ID = "24";
const TALLAWONG_FACILITY_IDS = ["26", "27", "28"];

// Matches the homepage transit widget's refresh cadence — concurrent
// visitors within the same window share one upstream call per facility
// rather than each triggering their own, per DECISIONS.md ADR-014.
const REVALIDATE_SECONDS = 300;

interface CarparkFacilityResponse {
  spots?: string;
  occupancy?: { total?: string };
}

/**
 * Free spots at one facility (total capacity minus current occupancy).
 * The NSW Transport API's own `occupancy.total` is spots currently
 * *taken*, not free — inverting it here is what makes a "Parking
 * Availability" card actually mean availability (see Sprint 11 notes.md).
 */
async function fetchFacilityFreeSpots(facilityId: string): Promise<number> {
  const data = await fetchTransportNsw<CarparkFacilityResponse>(
    "/v1/carpark",
    { facility: facilityId },
    REVALIDATE_SECONDS,
  );

  const spots = Number(data.spots);
  const occupied = Number(data.occupancy?.total);

  if (!Number.isFinite(spots) || !Number.isFinite(occupied)) {
    throw new Error(
      `NSW Transport carpark API returned an unexpected shape for facility ${facilityId}`,
    );
  }

  return spots - occupied;
}

/**
 * Live carpark availability for Schofields (one facility) and Tallawong
 * (three physical structures, summed into one figure) — the API key
 * never reaches the browser (DECISIONS.md ADR-014).
 */
export async function getCarparkAvailability(): Promise<CarparkAvailability> {
  const [schofields, ...tallawongFacilities] = await Promise.all([
    fetchFacilityFreeSpots(SCHOFIELDS_FACILITY_ID),
    ...TALLAWONG_FACILITY_IDS.map(fetchFacilityFreeSpots),
  ]);

  const tallawong = tallawongFacilities.reduce((sum, free) => sum + free, 0);

  return {
    schofields,
    tallawong,
    updatedAt: new Date().toISOString(),
  };
}

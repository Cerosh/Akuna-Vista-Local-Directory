import { fetchTransportNsw } from "./client";
import type { StopFinderResponse } from "./types";

// stop_finder responses aren't time-sensitive (station IDs essentially
// never change) — a long revalidation window keeps this cheap to call
// occasionally without needing a separate persistence layer.
const STOP_FINDER_REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * Resolves a station name to its NSW Transport global stop id via the
 * `stop_finder` endpoint (`type_sf=any`, filtered to `type: "stop"`
 * results — `type_sf=stop` rejects free-text names outright). Intended
 * to be run once per station, not on every request — see
 * `SCHOFIELDS_STATION_ID` in departureService.ts, which hardcodes the id
 * this function resolved for "Schofields Station" at implementation time
 * (2026-07-15) rather than re-resolving it on every departure board
 * request.
 */
export async function findStationId(searchTerm: string): Promise<string | null> {
  const data = await fetchTransportNsw<StopFinderResponse>(
    "/v1/tp/stop_finder",
    {
      outputFormat: "rapidJSON",
      type_sf: "any",
      name_sf: searchTerm,
      coordOutputFormat: "EPSG:4326",
      TfNSWSF: "true",
    },
    STOP_FINDER_REVALIDATE_SECONDS,
  );

  const bestStop = data.locations.find((location) => location.type === "stop" && location.isBest);
  return bestStop?.id ?? data.locations.find((location) => location.type === "stop")?.id ?? null;
}

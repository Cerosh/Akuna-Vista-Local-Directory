"use client";

import { usePolling } from "@/hooks/usePolling";
import type { TrainDeparture } from "@/lib/transportNsw/types";

// Per the project owner's explicit requirement — refresh every 30 seconds.
const REFRESH_INTERVAL_MS = 30 * 1000;

interface TrainDeparturesState {
  departures: TrainDeparture[];
  isLoading: boolean;
  hasError: boolean;
}

/**
 * Polls this app's own `/api/departures` route (never the NSW Transport
 * API directly — the key stays server-side, DECISIONS.md ADR-014) every
 * 30 seconds for Schofields Station's live next train departures.
 */
export function useTrainDepartures(): TrainDeparturesState {
  const { data, isLoading, hasError } = usePolling<{ departures: TrainDeparture[] }>(
    "/api/departures",
    REFRESH_INTERVAL_MS,
  );

  return { departures: data?.departures ?? [], isLoading, hasError };
}

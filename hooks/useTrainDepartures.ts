"use client";

import { useEffect, useState } from "react";
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
  const [departures, setDepartures] = useState<TrainDeparture[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/departures");
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }
        const body = (await response.json()) as { departures: TrainDeparture[] };
        if (!isCancelled) {
          setDepartures(body.departures);
          setHasError(false);
        }
      } catch {
        if (!isCancelled) {
          setHasError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    load();
    const intervalId = setInterval(load, REFRESH_INTERVAL_MS);

    return () => {
      isCancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  return { departures, isLoading, hasError };
}

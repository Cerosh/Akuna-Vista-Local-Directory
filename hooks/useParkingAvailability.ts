"use client";

import { useEffect, useState } from "react";
import type { CarparkAvailability } from "@/lib/transportNsw/types";

// Matches the server route's own revalidation window (see
// lib/transportNsw/carparkService.ts) — DECISIONS.md ADR-014.
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

interface ParkingAvailabilityState {
  data: CarparkAvailability | null;
  isLoading: boolean;
  hasError: boolean;
}

/**
 * Polls this app's own `/api/carpark` route (never the NSW Transport API
 * directly — the key stays server-side, DECISIONS.md ADR-014) every 5
 * minutes for live Schofields/Tallawong parking availability.
 */
export function useParkingAvailability(): ParkingAvailabilityState {
  const [data, setData] = useState<CarparkAvailability | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/carpark");
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }
        const body = (await response.json()) as CarparkAvailability;
        if (!isCancelled) {
          setData(body);
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

  return { data, isLoading, hasError };
}

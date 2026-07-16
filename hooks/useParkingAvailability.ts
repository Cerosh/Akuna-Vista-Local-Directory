"use client";

import { usePolling } from "@/hooks/usePolling";
import type { CarparkAvailability } from "@/lib/transportNsw/types";

// Matches the server route's own revalidation window (see
// lib/transportNsw/carparkService.ts) — DECISIONS.md ADR-014.
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

/**
 * Polls this app's own `/api/carpark` route (never the NSW Transport API
 * directly — the key stays server-side, DECISIONS.md ADR-014) every 5
 * minutes for live Schofields/Tallawong parking availability.
 */
export function useParkingAvailability() {
  return usePolling<CarparkAvailability>("/api/carpark", REFRESH_INTERVAL_MS);
}

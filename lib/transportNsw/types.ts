// Domain types this app actually renders — deliberately much smaller than
// the real API's full response shape (which includes coordinates, GTFS
// trip IDs, operator metadata, etc. this project never displays).

export interface CarparkAvailability {
  schofields: number;
  tallawong: number;
  updatedAt: string;
}

export interface TrainDeparture {
  /** Stable per-service key (real-time trip id when available). */
  id: string;
  /** Short line code, e.g. "T1". */
  lineCode: string;
  /** Full line name, e.g. "T1 North Shore & Western Line". */
  lineName: string;
  destination: string;
  /** Human-readable platform name, e.g. "Platform 1" — null if not published. */
  platform: string | null;
  /** ISO 8601 timestamp — the timetabled departure. */
  scheduledDeparture: string;
  /** ISO 8601 timestamp — real-time estimate, null when not available. */
  estimatedDeparture: string | null;
  /** True when `estimatedDeparture` reflects real-time data, not just the timetable. */
  isRealtime: boolean;
  /** Minutes from now until the effective (estimated, else scheduled) departure. */
  countdownMinutes: number;
}

// --- Raw shapes for the two `/v1/tp/*` endpoints this app calls ---
// Only the fields this app actually reads are typed; the real API
// returns considerably more (coordinates, fare zones, GTFS ids, etc).

export interface StopFinderLocation {
  id: string;
  name: string;
  type: string;
  isBest?: boolean;
}

export interface StopFinderResponse {
  locations: StopFinderLocation[];
}

export interface DepartureStopEvent {
  departureTimePlanned: string;
  departureTimeEstimated?: string | null;
  isRealtimeControlled?: boolean;
  location: {
    properties?: {
      platformName?: string;
    };
  };
  transportation: {
    disassembledName: string;
    number: string;
    destination: { name: string };
    product: { class: number; name: string };
    properties?: {
      RealtimeTripId?: string;
    };
  };
}

export interface DepartureMonResponse {
  systemMessages?: { type: string; text: string }[];
  stopEvents?: DepartureStopEvent[];
}

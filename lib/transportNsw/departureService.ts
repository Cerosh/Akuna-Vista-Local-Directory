import { fetchTransportNsw } from "./client";
import type { DepartureMonResponse, DepartureStopEvent, TrainDeparture } from "./types";

// Resolved once via findStationId("Schofields Station") against the real
// stop_finder endpoint (2026-07-15) — see stationLookup.ts's own comment.
// Hardcoded rather than re-resolved on every request: station ids don't
// change, and a runtime lookup would add latency/an extra API call to
// every departure board load for no benefit.
export const SCHOFIELDS_STATION_ID = "276220";

// `departure_mon` for a station returns every mode serving it (buses and
// trains both stop at Schofields) — there's no request parameter in the
// project owner's specified contract to filter this server-side, so it's
// filtered here instead. Sydney Trains Network is `product.class === 1`
// (confirmed against the real API response, 2026-07-15) — buses came
// back as `class === 5`.
const TRAIN_PRODUCT_CLASS = 1;

// The raw feed returns dozens of stop events (all modes, ~60-90 minutes
// out); a departure board only needs the next few.
const MAX_DEPARTURES = 8;

const DEPARTURE_REVALIDATE_SECONDS = 30;

function formatSydneyDateTime(date: Date): { itdDate: string; itdTime: string } {
  // itdDate/itdTime must be Sydney local time regardless of the server's
  // own timezone (UTC on Vercel) — Intl with an explicit timeZone avoids
  // the naive `new Date().toISOString()` mistake of assuming server-local
  // time is already correct.
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    itdDate: `${value("year")}${value("month")}${value("day")}`,
    itdTime: `${value("hour")}${value("minute")}`,
  };
}

function toDeparture(event: DepartureStopEvent, now: Date): TrainDeparture {
  // Real-time behaviour per the project owner's spec: use
  // departureTimeEstimated when present and non-empty, otherwise fall
  // back to departureTimePlanned.
  const estimated =
    event.departureTimeEstimated && event.departureTimeEstimated.length > 0
      ? event.departureTimeEstimated
      : null;
  const effectiveDeparture = estimated ?? event.departureTimePlanned;
  const countdownMinutes = Math.max(
    0,
    Math.round((new Date(effectiveDeparture).getTime() - now.getTime()) / 60000),
  );

  return {
    id:
      event.transportation.properties?.RealtimeTripId ??
      `${event.transportation.number}-${event.departureTimePlanned}`,
    lineCode: event.transportation.disassembledName,
    lineName: event.transportation.number,
    destination: event.transportation.destination.name,
    platform: event.location.properties?.platformName ?? null,
    scheduledDeparture: event.departureTimePlanned,
    estimatedDeparture: estimated,
    isRealtime: estimated !== null,
    countdownMinutes,
  };
}

/**
 * Pure transform: raw `departure_mon` response -> the next `MAX_DEPARTURES`
 * train departures, soonest first. Exported separately from
 * `getStationDepartures` so it's unit-testable against a fixture response
 * without a real network call.
 */
export function parseDepartureResponse(
  response: DepartureMonResponse,
  now: Date = new Date(),
): TrainDeparture[] {
  const trainEvents = (response.stopEvents ?? []).filter(
    (event) => event.transportation.product.class === TRAIN_PRODUCT_CLASS,
  );

  return trainEvents
    .map((event) => toDeparture(event, now))
    .sort(
      (a, b) =>
        new Date(a.estimatedDeparture ?? a.scheduledDeparture).getTime() -
        new Date(b.estimatedDeparture ?? b.scheduledDeparture).getTime(),
    )
    .slice(0, MAX_DEPARTURES);
}

/**
 * Live train departures for a station, sourced from NSW Transport's
 * `departure_mon` endpoint (the departure-board-purpose-built endpoint —
 * deliberately not the general-purpose `trip` planner, per the project
 * owner's explicit instruction).
 */
export async function getStationDepartures(
  stationId: string = SCHOFIELDS_STATION_ID,
): Promise<TrainDeparture[]> {
  const now = new Date();
  const { itdDate, itdTime } = formatSydneyDateTime(now);

  const response = await fetchTransportNsw<DepartureMonResponse>(
    "/v1/tp/departure_mon",
    {
      outputFormat: "rapidJSON",
      coordOutputFormat: "EPSG:4326",
      mode: "direct",
      type_dm: "stop",
      name_dm: stationId,
      depArrMacro: "dep",
      itdDate,
      itdTime,
      TfNSWDM: "true",
    },
    DEPARTURE_REVALIDATE_SECONDS,
  );

  return parseDepartureResponse(response, now);
}

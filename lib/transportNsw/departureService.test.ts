import { describe, expect, it } from "vitest";
import { parseDepartureResponse } from "./departureService";
import type { DepartureMonResponse, DepartureStopEvent } from "./types";

function makeStopEvent(overrides: Partial<DepartureStopEvent> = {}): DepartureStopEvent {
  return {
    departureTimePlanned: "2026-07-15T11:36:00Z",
    departureTimeEstimated: "2026-07-15T11:36:00Z",
    isRealtimeControlled: true,
    location: { properties: { platformName: "Platform 1" } },
    transportation: {
      disassembledName: "T1",
      number: "T1 North Shore & Western Line",
      destination: { name: "Richmond via Parramatta" },
      product: { class: 1, name: "Sydney Trains Network" },
      properties: { RealtimeTripId: "trip-1" },
    },
    ...overrides,
  };
}

const now = new Date("2026-07-15T11:30:00Z");

describe("parseDepartureResponse", () => {
  it("filters out non-train modes (buses, product.class !== 1)", () => {
    const bus = makeStopEvent({
      transportation: {
        ...makeStopEvent().transportation,
        product: { class: 5, name: "Sydney Buses Network" },
      },
    });
    const train = makeStopEvent();

    const result = parseDepartureResponse({ stopEvents: [bus, train] }, now);

    expect(result).toHaveLength(1);
    expect(result[0].lineCode).toBe("T1");
  });

  it("uses departureTimeEstimated when present and non-empty", () => {
    const event = makeStopEvent({
      departureTimePlanned: "2026-07-15T11:36:00Z",
      departureTimeEstimated: "2026-07-15T11:38:00Z",
    });

    const [departure] = parseDepartureResponse({ stopEvents: [event] }, now);

    expect(departure.estimatedDeparture).toBe("2026-07-15T11:38:00Z");
    expect(departure.isRealtime).toBe(true);
    expect(departure.countdownMinutes).toBe(8);
  });

  it("falls back to departureTimePlanned when departureTimeEstimated is null", () => {
    const event = makeStopEvent({
      departureTimePlanned: "2026-07-15T11:40:00Z",
      departureTimeEstimated: null,
    });

    const [departure] = parseDepartureResponse({ stopEvents: [event] }, now);

    expect(departure.estimatedDeparture).toBeNull();
    expect(departure.isRealtime).toBe(false);
    expect(departure.countdownMinutes).toBe(10);
  });

  it("falls back to departureTimePlanned when departureTimeEstimated is an empty string", () => {
    const event = makeStopEvent({
      departureTimePlanned: "2026-07-15T11:45:00Z",
      departureTimeEstimated: "",
    });

    const [departure] = parseDepartureResponse({ stopEvents: [event] }, now);

    expect(departure.isRealtime).toBe(false);
    expect(departure.countdownMinutes).toBe(15);
  });

  it("sorts by effective departure time ascending", () => {
    const later = makeStopEvent({
      departureTimePlanned: "2026-07-15T12:00:00Z",
      departureTimeEstimated: "2026-07-15T12:00:00Z",
      transportation: { ...makeStopEvent().transportation, disassembledName: "T5" },
    });
    const sooner = makeStopEvent({
      departureTimePlanned: "2026-07-15T11:36:00Z",
      departureTimeEstimated: "2026-07-15T11:36:00Z",
    });

    const result = parseDepartureResponse({ stopEvents: [later, sooner] }, now);

    expect(result.map((d) => d.lineCode)).toEqual(["T1", "T5"]);
  });

  it("caps the result at 8 departures", () => {
    const events = Array.from({ length: 12 }, (_, i) =>
      makeStopEvent({
        departureTimePlanned: `2026-07-15T11:${36 + i}:00Z`,
        departureTimeEstimated: `2026-07-15T11:${36 + i}:00Z`,
      }),
    );

    const result = parseDepartureResponse({ stopEvents: events }, now);

    expect(result).toHaveLength(8);
  });

  it("returns an empty array when there are no stop events", () => {
    expect(parseDepartureResponse({ stopEvents: [] }, now)).toEqual([]);
    expect(parseDepartureResponse({} as DepartureMonResponse, now)).toEqual([]);
  });

  it("never returns a negative countdown even for a departure already in the past", () => {
    const event = makeStopEvent({
      departureTimePlanned: "2026-07-15T11:00:00Z",
      departureTimeEstimated: "2026-07-15T11:00:00Z",
    });

    const [departure] = parseDepartureResponse({ stopEvents: [event] }, now);

    expect(departure.countdownMinutes).toBe(0);
  });

  it("falls back to a synthetic id when RealtimeTripId is absent", () => {
    const event = makeStopEvent({
      transportation: {
        ...makeStopEvent().transportation,
        properties: {},
      },
    });

    const [departure] = parseDepartureResponse({ stopEvents: [event] }, now);

    expect(departure.id).toContain("T1 North Shore & Western Line");
  });
});

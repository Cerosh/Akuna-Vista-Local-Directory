import { describe, expect, it } from "vitest";
import { isPast } from "./dateStatus";

describe("isPast", () => {
  const now = new Date("2026-07-06T12:00:00Z");

  it("returns true for a date before the reference date", () => {
    expect(isPast("2026-07-01T00:00:00Z", now)).toBe(true);
  });

  it("returns false for a date after the reference date", () => {
    expect(isPast("2026-08-01T00:00:00Z", now)).toBe(false);
  });

  it("returns false for the exact reference date", () => {
    expect(isPast("2026-07-06T12:00:00Z", now)).toBe(false);
  });

  it("handles date-only strings (no time component)", () => {
    expect(isPast("2026-07-01", now)).toBe(true);
    expect(isPast("2026-12-31", now)).toBe(false);
  });

  it("defaults to the current time when no reference date is given", () => {
    expect(isPast("2000-01-01T00:00:00Z")).toBe(true);
    expect(isPast("2999-01-01T00:00:00Z")).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { getWeatherCondition } from "./weatherCodeMap";

describe("getWeatherCondition", () => {
  it.each([
    [0, "Clear sky"],
    [1, "Mainly clear"],
    [2, "Partly cloudy"],
    [3, "Overcast"],
    [45, "Fog"],
    [61, "Slight rain"],
    [95, "Thunderstorm"],
  ])("maps code %i to %s", (code, description) => {
    const condition = getWeatherCondition(code);
    expect(condition.description).toBe(description);
    expect(condition.icon).toBeTruthy();
    expect(condition.code).toBe(code);
  });

  it("degrades gracefully for an unknown code instead of throwing", () => {
    const condition = getWeatherCondition(-1);
    expect(condition.description).toBe("Unknown");
    expect(condition.icon).toBeTruthy();
    expect(condition.code).toBe(-1);
  });
});

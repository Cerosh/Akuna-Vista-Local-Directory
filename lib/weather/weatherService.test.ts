import { beforeEach, describe, expect, it, vi } from "vitest";
import { degreesToCompass } from "./weatherService";
import type { OpenMeteoForecastResponse } from "./weather.types";

const { fetchOpenMeteoForecast } = vi.hoisted(() => ({
  fetchOpenMeteoForecast: vi.fn(),
}));

vi.mock("./weatherApi", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./weatherApi")>();
  return { ...actual, fetchOpenMeteoForecast };
});

function fixture(overrides: Partial<OpenMeteoForecastResponse> = {}): OpenMeteoForecastResponse {
  return {
    timezone: "Australia/Sydney",
    current: {
      time: "2026-07-16T14:00",
      temperature_2m: 18.3,
      relative_humidity_2m: 63,
      apparent_temperature: 17.1,
      precipitation: 0,
      rain: 0,
      weather_code: 1,
      wind_speed_10m: 14.2,
      wind_direction_10m: 45,
    },
    daily: {
      time: [
        "2026-07-16",
        "2026-07-17",
        "2026-07-18",
        "2026-07-19",
        "2026-07-20",
        "2026-07-21",
        "2026-07-22",
      ],
      weather_code: [1, 2, 3, 61, 0, 0, 95],
      temperature_2m_max: [22, 21, 20, 19, 23, 24, 18],
      temperature_2m_min: [11, 10, 12, 13, 9, 10, 14],
      sunrise: [
        "2026-07-16T06:58",
        "2026-07-17T06:57",
        "2026-07-18T06:57",
        "2026-07-19T06:56",
        "2026-07-20T06:55",
        "2026-07-21T06:54",
        "2026-07-22T06:53",
      ],
      sunset: [
        "2026-07-16T17:04",
        "2026-07-17T17:05",
        "2026-07-18T17:06",
        "2026-07-19T17:06",
        "2026-07-20T17:07",
        "2026-07-21T17:08",
        "2026-07-22T17:09",
      ],
      precipitation_probability_max: [10, 20, 30, 80, 0, 0, 90],
    },
    ...overrides,
  };
}

describe("degreesToCompass", () => {
  it.each([
    [0, "N"],
    [45, "NE"],
    [90, "E"],
    [180, "S"],
    [270, "W"],
    [360, "N"],
  ])("converts %i degrees to %s", (degrees, expected) => {
    expect(degreesToCompass(degrees)).toBe(expected);
  });
});

describe("getSchofieldsWeather", () => {
  beforeEach(() => {
    vi.resetModules();
    fetchOpenMeteoForecast.mockReset();
  });

  it("transforms a successful response, including wind compass direction", async () => {
    fetchOpenMeteoForecast.mockResolvedValue(fixture());
    const { getSchofieldsWeather } = await import("./weatherService");

    const data = await getSchofieldsWeather();

    expect(data.current.temperatureC).toBe(18.3);
    expect(data.current.windDirectionCompass).toBe("NE");
    expect(data.current.condition.description).toBe("Mainly clear");
    expect(data.current.rainMm).toBeNull();
    expect(data.today.maxTemperatureC).toBe(22);
    expect(data.today.sunrise).toBe("2026-07-16T06:58");
    expect(data.sevenDay).toHaveLength(7);
  });

  it("throws when the daily forecast array is empty", async () => {
    fetchOpenMeteoForecast.mockResolvedValue(
      fixture({
        daily: {
          time: [],
          weather_code: [],
          temperature_2m_max: [],
          temperature_2m_min: [],
          sunrise: [],
          sunset: [],
          precipitation_probability_max: [],
        },
      }),
    );
    const { getSchofieldsWeather } = await import("./weatherService");

    await expect(getSchofieldsWeather()).rejects.toThrow();
  });

  it("propagates an upstream fetch failure as an error", async () => {
    fetchOpenMeteoForecast.mockRejectedValue(new Error("network down"));
    const { getSchofieldsWeather } = await import("./weatherService");

    await expect(getSchofieldsWeather()).rejects.toThrow("network down");
  });

  it("serves a second call from cache without calling the API again", async () => {
    fetchOpenMeteoForecast.mockResolvedValue(fixture());
    const { getSchofieldsWeather } = await import("./weatherService");

    await getSchofieldsWeather();
    await getSchofieldsWeather();

    expect(fetchOpenMeteoForecast).toHaveBeenCalledTimes(1);
  });
});

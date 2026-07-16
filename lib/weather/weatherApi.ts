import type { OpenMeteoForecastResponse } from "./weather.types";

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

// Schofields, NSW — the community this platform serves.
const SCHOFIELDS_LATITUDE = -33.7037;
const SCHOFIELDS_LONGITUDE = 150.8786;

// A compact Hero sidebar card only has room for a glanceable forecast, not a
// full week — today plus the next 2 days.
const FORECAST_DAYS = 3;
const REQUEST_TIMEOUT_MS = 8000;

const CURRENT_FIELDS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "precipitation",
  "rain",
  "weather_code",
  "wind_speed_10m",
  "wind_direction_10m",
].join(",");

const DAILY_FIELDS = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset",
  "precipitation_probability_max",
].join(",");

export class WeatherApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "WeatherApiError";
  }
}

/**
 * Server-only call to Open-Meteo's free, keyless Forecast API for
 * Schofields, NSW. Requests only the fields this app's UI actually uses.
 * `revalidateSeconds` matches `weatherService.ts`'s own cache TTL so
 * Next's Data Cache and this app's explicit TTL cache agree.
 */
export async function fetchOpenMeteoForecast(
  revalidateSeconds: number,
): Promise<OpenMeteoForecastResponse> {
  const url = new URL(OPEN_METEO_BASE_URL);
  url.searchParams.set("latitude", String(SCHOFIELDS_LATITUDE));
  url.searchParams.set("longitude", String(SCHOFIELDS_LONGITUDE));
  url.searchParams.set("timezone", "Australia/Sydney");
  url.searchParams.set("forecast_days", String(FORECAST_DAYS));
  url.searchParams.set("current", CURRENT_FIELDS);
  url.searchParams.set("daily", DAILY_FIELDS);

  let response: Response;
  try {
    response = await fetch(url, {
      next: { revalidate: revalidateSeconds },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown error";
    throw new WeatherApiError(`Open-Meteo request failed: ${reason}`);
  }

  if (!response.ok) {
    throw new WeatherApiError(`Open-Meteo API returned ${response.status}`, response.status);
  }

  const data = (await response.json()) as OpenMeteoForecastResponse;
  if (!data.current || !data.daily) {
    throw new WeatherApiError("Open-Meteo response missing expected fields");
  }

  return data;
}

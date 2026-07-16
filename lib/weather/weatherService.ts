import { fetchOpenMeteoForecast, WeatherApiError } from "./weatherApi";
import { getWeatherCondition } from "./weatherCodeMap";
import { createTtlCache } from "./weatherCache";
import { WEATHER_REFRESH_MINUTES } from "./weatherConfig";
import type { DailyForecastDay, OpenMeteoForecastResponse, WeatherData } from "./weather.types";

const CACHE_TTL_MS = WEATHER_REFRESH_MINUTES * 60 * 1000;
const REVALIDATE_SECONDS = WEATHER_REFRESH_MINUTES * 60;

const cache = createTtlCache<WeatherData>(CACHE_TTL_MS);
// Coalesces concurrent getSchofieldsWeather() calls that land during a cache
// miss into a single upstream Open-Meteo request, rather than each caller
// independently triggering its own fetch while the first is still in flight.
let inFlightFetch: Promise<WeatherData> | null = null;

const COMPASS_POINTS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

/** Converts a wind direction in degrees (0-360) to a 16-point compass label. */
export function degreesToCompass(degrees: number): string {
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 22.5) % COMPASS_POINTS.length;
  return COMPASS_POINTS[index];
}

function toDailyForecastDay(
  raw: OpenMeteoForecastResponse["daily"],
  index: number,
): DailyForecastDay {
  return {
    date: raw.time[index],
    condition: getWeatherCondition(raw.weather_code[index]),
    maxTemperatureC: raw.temperature_2m_max[index],
    minTemperatureC: raw.temperature_2m_min[index],
    rainProbabilityPercent: raw.precipitation_probability_max?.[index] ?? null,
  };
}

/**
 * Open-Meteo's `daily` arrays are expected to be parallel — one entry per
 * date in `time`. A response where a sibling array is shorter than `time`
 * would otherwise silently produce `undefined` fields (rather than
 * throwing) once indexed in `toDailyForecastDay`, which downstream code
 * doesn't expect.
 */
function assertDailyArraysAligned(daily: OpenMeteoForecastResponse["daily"]): void {
  const expectedLength = daily.time.length;
  const arrays: Record<string, unknown[]> = {
    weather_code: daily.weather_code,
    temperature_2m_max: daily.temperature_2m_max,
    temperature_2m_min: daily.temperature_2m_min,
    sunrise: daily.sunrise,
    sunset: daily.sunset,
    precipitation_probability_max: daily.precipitation_probability_max,
  };

  for (const [field, values] of Object.entries(arrays)) {
    if (values.length !== expectedLength) {
      throw new WeatherApiError(
        `Open-Meteo response's daily.${field} length (${values.length}) doesn't match daily.time length (${expectedLength})`,
      );
    }
  }
}

function transformResponse(raw: OpenMeteoForecastResponse): WeatherData {
  if (!raw.daily.time || raw.daily.time.length === 0) {
    throw new WeatherApiError("Open-Meteo response contained no forecast data");
  }
  assertDailyArraysAligned(raw.daily);

  const current = raw.current;
  const today = toDailyForecastDay(raw.daily, 0);
  const dailyForecast = raw.daily.time.map((_, index) => toDailyForecastDay(raw.daily, index));

  return {
    current: {
      temperatureC: current.temperature_2m,
      feelsLikeC: current.apparent_temperature,
      humidityPercent: current.relative_humidity_2m,
      windSpeedKmh: current.wind_speed_10m,
      windDirectionDeg: current.wind_direction_10m,
      windDirectionCompass: degreesToCompass(current.wind_direction_10m),
      rainMm: current.rain > 0 ? current.rain : null,
      condition: getWeatherCondition(current.weather_code),
      observedAt: current.time,
    },
    today: {
      ...today,
      sunrise: raw.daily.sunrise[0],
      sunset: raw.daily.sunset[0],
    },
    dailyForecast,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Current + daily forecast for Schofields, NSW. Cached in-process for
 * `WEATHER_REFRESH_MINUTES` so concurrent homepage visitors share one
 * upstream Open-Meteo call, not one each — checked before the module-level
 * `fetch` cache is even consulted. Concurrent calls that land during a cache
 * miss share the same in-flight request rather than each firing their own.
 */
export async function getSchofieldsWeather(): Promise<WeatherData> {
  const cached = cache.get();
  if (cached) {
    return cached;
  }

  if (inFlightFetch) {
    return inFlightFetch;
  }

  inFlightFetch = (async () => {
    try {
      const raw = await fetchOpenMeteoForecast(REVALIDATE_SECONDS);
      const data = transformResponse(raw);
      cache.set(data);
      return data;
    } finally {
      inFlightFetch = null;
    }
  })();

  return inFlightFetch;
}

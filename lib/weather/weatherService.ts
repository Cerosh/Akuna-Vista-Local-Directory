import { fetchOpenMeteoForecast, WeatherApiError } from "./weatherApi";
import { getWeatherCondition } from "./weatherCodeMap";
import { createTtlCache } from "./weatherCache";
import type { DailyForecastDay, OpenMeteoForecastResponse, WeatherData } from "./weather.types";

const CACHE_TTL_MS = 10 * 60 * 1000;
const REVALIDATE_SECONDS = 10 * 60;

const cache = createTtlCache<WeatherData>(CACHE_TTL_MS);

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

function transformResponse(raw: OpenMeteoForecastResponse): WeatherData {
  if (!raw.daily.time || raw.daily.time.length === 0) {
    throw new WeatherApiError("Open-Meteo response contained no forecast data");
  }

  const current = raw.current;
  const today = toDailyForecastDay(raw.daily, 0);
  const sevenDay = raw.daily.time.map((_, index) => toDailyForecastDay(raw.daily, index));

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
    sevenDay,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Current + 7-day forecast for Schofields, NSW. Cached in-process for 10
 * minutes so concurrent homepage visitors share one upstream Open-Meteo
 * call, not one each — checked before the module-level `fetch` cache is
 * even consulted.
 */
export async function getSchofieldsWeather(): Promise<WeatherData> {
  const cached = cache.get();
  if (cached) {
    return cached;
  }

  const raw = await fetchOpenMeteoForecast(REVALIDATE_SECONDS);
  const data = transformResponse(raw);
  cache.set(data);
  return data;
}

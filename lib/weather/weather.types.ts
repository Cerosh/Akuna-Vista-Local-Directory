/** Minimal raw Open-Meteo response shape — only the fields this app actually requests. */
export interface OpenMeteoForecastResponse {
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    rain: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_probability_max: number[];
  };
}

export interface WeatherCondition {
  code: number;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temperatureC: number;
  feelsLikeC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  windDirectionDeg: number;
  windDirectionCompass: string;
  rainMm: number | null;
  condition: WeatherCondition;
  observedAt: string;
}

export interface DailyForecastDay {
  date: string;
  condition: WeatherCondition;
  maxTemperatureC: number;
  minTemperatureC: number;
  rainProbabilityPercent: number | null;
}

export interface TodayForecast extends DailyForecastDay {
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  current: CurrentWeather;
  today: TodayForecast;
  sevenDay: DailyForecastDay[];
  updatedAt: string;
}

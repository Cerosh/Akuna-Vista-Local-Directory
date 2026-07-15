import type { DailyForecastDay } from "@/lib/weather/weather.types";

interface WeatherForecastProps {
  days: DailyForecastDay[];
}

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  weekday: "short",
});

function dayLabel(dateStr: string, index: number): string {
  if (index === 0) return "Today";
  // `dateStr` is a date-only string (YYYY-MM-DD) from Open-Meteo's `daily.time` —
  // append a time so `Date` doesn't parse it as UTC midnight and shift the
  // weekday backwards in negative-UTC-offset zones (not Sydney's case, but
  // keeps this correct regardless of server timezone).
  return WEEKDAY_FORMATTER.format(new Date(`${dateStr}T12:00:00`));
}

/** Compact 7-day forecast list — same list-row convention as TransitWidget's departure list. */
export function WeatherForecast({ days }: WeatherForecastProps) {
  return (
    <ul className="flex flex-col gap-1.5">
      {days.map((day, index) => (
        <li key={day.date} className="flex items-center justify-between gap-2 text-xs">
          <span className="text-foreground w-10 shrink-0 font-medium">
            {dayLabel(day.date, index)}
          </span>
          <span aria-hidden="true">{day.condition.icon}</span>
          <span className="text-muted-foreground flex-1 truncate text-right">
            {day.rainProbabilityPercent !== null ? `${day.rainProbabilityPercent}%` : ""}
          </span>
          <span className="text-foreground shrink-0 text-right font-semibold whitespace-nowrap">
            {Math.round(day.maxTemperatureC)}° / {Math.round(day.minTemperatureC)}°
          </span>
        </li>
      ))}
    </ul>
  );
}

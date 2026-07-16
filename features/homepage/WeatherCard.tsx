"use client";

import { Droplets, Sunrise, Sunset, TriangleAlert, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/hooks/useWeather";
import { WeatherForecast } from "@/features/homepage/WeatherForecast";
import type { WeatherData } from "@/lib/weather/weather.types";

/**
 * Open-Meteo's sunrise/sunset strings (e.g. "2026-07-16T06:58") are already
 * Australia/Sydney wall-clock time with no UTC offset — we request
 * `timezone=Australia/Sydney` specifically so they come back that way.
 * Parsing via `new Date(isoTime)` would interpret that offset-less string as
 * local time of whatever runtime executes this (the visitor's own browser),
 * then reformatting it through a `timeZone: "Australia/Sydney"` Intl
 * formatter would convert it *again* — double-shifting the displayed time
 * for any visitor not already on Sydney's clock. Read the hour/minute
 * straight out of the string instead of round-tripping through `Date`.
 */
function formatTime(isoTime: string): string {
  const [, timePart] = isoTime.split("T");
  const [hourStr, minuteStr] = timePart.split(":");
  const hour24 = Number(hourStr);
  const period = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${minuteStr.padStart(2, "0")} ${period}`;
}

interface WeatherCardProps {
  /** Server-fetched initial value (see `app/(home)/page.tsx`) — lets first
   *  paint show real conditions instead of a guaranteed loading skeleton. */
  initialData?: WeatherData | null;
}

/**
 * Real current conditions + a 3-day forecast for Schofields, NSW, replacing
 * the Sprint 11 `WeatherComingSoon` placeholder in the Hero sidebar. Same
 * `Card size="sm"` / 260px-wide convention as the neighbouring
 * `TransitWidget`.
 */
export function WeatherCard({ initialData = null }: WeatherCardProps) {
  const weather = useWeather(initialData);

  return (
    <Card size="sm" className="w-full max-w-[260px]">
      <CardHeader>
        <CardTitle className="text-sm">Schofields Weather</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-sm">
        <div aria-live="polite" className="sr-only">
          {weather.data
            ? `${Math.round(weather.data.current.temperatureC)} degrees, ${weather.data.current.condition.description}.`
            : ""}
        </div>

        {weather.isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : !weather.data ? (
          <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <TriangleAlert className="size-3.5 shrink-0" aria-hidden="true" />
            Unavailable right now
          </p>
        ) : (
          <>
            <section className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">
                  {weather.data.current.condition.icon}
                </span>
                <span className="text-foreground text-2xl font-semibold">
                  {Math.round(weather.data.current.temperatureC)}°C
                </span>
              </div>
              <p className="text-muted-foreground text-xs">
                {weather.data.current.condition.description}
              </p>

              <div className="text-muted-foreground mt-1 flex flex-col gap-1 text-xs">
                <p className="flex items-center justify-between">
                  <span>Feels like</span>
                  <span className="text-foreground font-medium">
                    {Math.round(weather.data.current.feelsLikeC)}°C
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Droplets className="size-3.5 shrink-0" aria-hidden="true" />
                    Humidity
                  </span>
                  <span className="text-foreground font-medium">
                    {weather.data.current.humidityPercent}%
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Wind className="size-3.5 shrink-0" aria-hidden="true" />
                    Wind
                  </span>
                  <span className="text-foreground font-medium">
                    {Math.round(weather.data.current.windSpeedKmh)} km/h{" "}
                    {weather.data.current.windDirectionCompass}
                  </span>
                </p>
                {weather.data.current.rainMm !== null ? (
                  <p className="flex items-center justify-between">
                    <span>Rain</span>
                    <span className="text-foreground font-medium">
                      {weather.data.current.rainMm} mm
                    </span>
                  </p>
                ) : null}
              </div>
            </section>

            <section className="border-border text-muted-foreground flex flex-col gap-1 border-t pt-3 text-xs">
              <p className="flex items-center justify-between">
                <span>Today&apos;s High / Low</span>
                <span className="text-foreground font-medium">
                  {Math.round(weather.data.today.maxTemperatureC)}° /{" "}
                  {Math.round(weather.data.today.minTemperatureC)}°
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sunrise className="size-3.5 shrink-0" aria-hidden="true" />
                  Sunrise
                </span>
                <span className="text-foreground font-medium">
                  {formatTime(weather.data.today.sunrise)}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sunset className="size-3.5 shrink-0" aria-hidden="true" />
                  Sunset
                </span>
                <span className="text-foreground font-medium">
                  {formatTime(weather.data.today.sunset)}
                </span>
              </p>
              {weather.data.today.rainProbabilityPercent !== null ? (
                <p className="flex items-center justify-between">
                  <span>Chance of rain</span>
                  <span className="text-foreground font-medium">
                    {weather.data.today.rainProbabilityPercent}%
                  </span>
                </p>
              ) : null}
            </section>

            <section className="border-border border-t pt-3">
              <WeatherForecast days={weather.data.dailyForecast} />
            </section>
          </>
        )}
      </CardContent>
    </Card>
  );
}

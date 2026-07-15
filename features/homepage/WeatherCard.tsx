"use client";

import { Droplets, Sunrise, Sunset, TriangleAlert, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useWeather } from "@/hooks/useWeather";
import { WeatherForecast } from "@/features/homepage/WeatherForecast";

const TIME_FORMATTER = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function formatTime(isoTime: string): string {
  return TIME_FORMATTER.format(new Date(isoTime));
}

/**
 * Real current conditions + 7-day forecast for Schofields, NSW, replacing
 * the Sprint 11 `WeatherComingSoon` placeholder in the Hero sidebar. Same
 * `Card size="sm"` / 260px-wide convention as the neighbouring
 * `TransitWidget`.
 */
export function WeatherCard() {
  const weather = useWeather();

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
        ) : weather.hasError || !weather.data ? (
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
              <WeatherForecast days={weather.data.sevenDay} />
            </section>
          </>
        )}
      </CardContent>
    </Card>
  );
}

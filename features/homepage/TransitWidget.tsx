"use client";

import { CircleParking, TrainFront, TriangleAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useParkingAvailability } from "@/hooks/useParkingAvailability";
import { useTrainDepartures } from "@/hooks/useTrainDepartures";

const MAX_DEPARTURES_SHOWN = 3;

/**
 * Compact "getting around" sidebar widget for the homepage Hero row —
 * deliberately small (this is a local business directory first; live
 * transit data is a secondary, at-a-glance convenience, not the page's
 * main content, per the project owner's explicit framing 2026-07-15).
 * Combines Parking availability and Next Train Departures into one
 * widget rather than two separate cards, so it stays compact next to
 * Hero. Sits opposite a reserved slot for a future Weather widget — see
 * Hero.tsx.
 */
export function TransitWidget() {
  const parking = useParkingAvailability();
  const trains = useTrainDepartures();

  const isLoading = parking.isLoading && trains.isLoading;

  return (
    <Card size="sm" className="w-full max-w-[260px]">
      <CardHeader>
        <CardTitle className="text-sm">Getting around</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-sm">
        <div aria-live="polite" className="sr-only">
          {parking.data
            ? `Schofields Station ${parking.data.schofields} parking spots free, Tallawong Station ${parking.data.tallawong} parking spots free.`
            : ""}
          {trains.departures.length > 0
            ? ` Next train in ${trains.departures[0].countdownMinutes} minutes.`
            : ""}
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <>
            <section aria-labelledby="transit-parking-heading" className="flex flex-col gap-1.5">
              <h3
                id="transit-parking-heading"
                className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase"
              >
                <CircleParking className="size-3.5 shrink-0" aria-hidden="true" />
                Parking slots available
              </h3>
              {parking.hasError || !parking.data ? (
                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <TriangleAlert className="size-3.5 shrink-0" aria-hidden="true" />
                  Unavailable right now
                </p>
              ) : (
                <>
                  <p className="text-foreground flex items-center justify-between">
                    <span>Schofields</span>
                    <span className="font-semibold">{parking.data.schofields}</span>
                  </p>
                  <p className="text-foreground flex items-center justify-between">
                    <span>Tallawong</span>
                    <span className="font-semibold">{parking.data.tallawong}</span>
                  </p>
                </>
              )}
            </section>

            <section aria-labelledby="transit-trains-heading" className="flex flex-col gap-2">
              <h3
                id="transit-trains-heading"
                className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase"
              >
                <TrainFront className="size-3.5 shrink-0" aria-hidden="true" />
                Next trains — Schofields
              </h3>
              {trains.hasError ? (
                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <TriangleAlert className="size-3.5 shrink-0" aria-hidden="true" />
                  Unavailable right now
                </p>
              ) : trains.departures.length === 0 ? (
                <p className="text-muted-foreground text-xs">No upcoming departures</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {trains.departures.slice(0, MAX_DEPARTURES_SHOWN).map((departure) => (
                    <li key={departure.id} className="flex items-start justify-between gap-2">
                      <span className="text-foreground font-semibold whitespace-nowrap">
                        {departure.countdownMinutes} min
                      </span>
                      <span className="text-muted-foreground truncate text-right text-xs">
                        {departure.lineCode} to {departure.destination}
                        {departure.platform ? ` · ${departure.platform}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </CardContent>
    </Card>
  );
}

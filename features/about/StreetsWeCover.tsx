import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ZoneAccent = "primary" | "secondary" | "success" | "warning";

interface StreetZone {
  name: string;
  accent: ZoneAccent;
  /** Streets that don't exist yet — rendered as a planned zone, not a live one. */
  planned?: boolean;
  streets: string[];
}

const STREET_ZONES: StreetZone[] = [
  {
    name: "North",
    accent: "primary",
    streets: [
      "Rosetta Street",
      "Ward Street",
      "Hoy Street",
      "Overly Crescent",
      "Ranary Way",
      "Bateman Street",
      "Bigg Street",
      "Gillingham Street",
      "Corsair Street",
      "Alcorn Street",
      "Christy Drive",
      "Anson Street",
      "Lockheed Drive",
      "Mariner Avenue",
      "Auster Street",
      "Hornet Street",
    ],
  },
  {
    name: "Central",
    accent: "secondary",
    streets: [
      "Vampire Street",
      "Winjeel Street",
      "Avenger Street",
      "Sabre Street",
      "Baltimore Street",
      "Seagull Street",
      "Triton Parade",
      "Beechcraft Street",
      "Nabthorpe Parade",
      "Scout Street",
      "Dolphin Street",
      "Phantom Street",
      "Portland Street",
      "Dorland Street",
      "Swordfish Street",
    ],
  },
  {
    name: "South",
    accent: "success",
    streets: [
      "Firefly Street",
      "Halifax Street",
      "Valiant Street",
      "Ventura Street",
      "Kittyhawk Crescent",
    ],
  },
  {
    name: "Future / Development Plan",
    accent: "warning",
    planned: true,
    streets: [
      "Dallywater Close",
      "Talberg Crescent",
      "Robb Street",
      "Steege Street",
      "Rayson Street",
      "Hubble Street",
      "Balge Street",
      "Juger Street",
      "Ranate Crescent",
      "Nirimba Drive",
      "Future Burdekin Road",
    ],
  },
];

STREET_ZONES.forEach((zone) => zone.streets.sort((a, b) => a.localeCompare(b)));

const TOTAL_STREETS = STREET_ZONES.reduce((sum, zone) => sum + zone.streets.length, 0);

const ACCENT_STYLES: Record<ZoneAccent, { text: string; bar: string }> = {
  primary: { text: "text-primary", bar: "bg-primary" },
  secondary: { text: "text-secondary", bar: "bg-secondary" },
  success: { text: "text-success", bar: "bg-success" },
  warning: { text: "text-warning", bar: "bg-warning" },
};

export function StreetsWeCover() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Streets we cover</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {TOTAL_STREETS} streets across Akuna Vista, grouped by area.
        </p>
      </div>

      <div className="border-secondary/40 bg-secondary/5 rounded-lg border-l-2 py-3 pr-4 pl-4">
        <p className="text-secondary text-xs font-medium tracking-wide uppercase">Local history</p>
        <p className="text-foreground mt-1.5 text-sm leading-relaxed">
          Schofields was a WWII-era RAAF air station, then home to the Royal Navy&rsquo;s HMS
          Nabthorpe and the Royal Australian Navy&rsquo;s HMAS Nirimba. Several street names here —
          Nabthorpe Parade, Ranary Way, Nirimba Drive, and a wing of historic aircraft types like
          Vampire, Sabre and Kittyhawk — trace straight back to that history.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {STREET_ZONES.map((zone) => {
          const accent = ACCENT_STYLES[zone.accent];
          return (
            <Card
              key={zone.name}
              className={cn(
                zone.planned && "border-warning/40 bg-warning/5 border-2 border-dashed ring-0",
              )}
            >
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between">
                  <h3
                    className={cn(
                      "text-sm font-medium tracking-wide uppercase",
                      zone.planned ? "text-muted-foreground" : accent.text,
                    )}
                  >
                    {zone.name}
                  </h3>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {zone.streets.length}
                  </span>
                </div>
                <div
                  className={cn("h-0.5 w-8 rounded-full", zone.planned ? "bg-border" : accent.bar)}
                  aria-hidden="true"
                />
                {zone.planned && (
                  <p className="text-muted-foreground text-xs">Planned — not yet built</p>
                )}
              </CardHeader>
              <CardContent>
                <ul
                  className={cn(
                    "grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3",
                    zone.planned ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {zone.streets.map((street) => (
                    <li key={street}>{street}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

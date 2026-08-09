import { cn } from "@/lib/utils";

interface StreetZone {
  name: string;
  colorClass: string;
  /** Future/planned streets read visually de-emphasized — they don't exist yet. */
  muted?: boolean;
  streets: string[];
}

const STREET_ZONES: StreetZone[] = [
  {
    name: "North",
    colorClass: "bg-success",
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
    colorClass: "bg-blue-500",
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
    colorClass: "bg-orange-500",
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
    colorClass: "bg-warning",
    muted: true,
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

const TOTAL_STREETS = STREET_ZONES.reduce((sum, zone) => sum + zone.streets.length, 0);

export function StreetsWeCover() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Streets we cover</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {TOTAL_STREETS} streets across Akuna Vista, grouped by area.
        </p>
      </div>
      {STREET_ZONES.map((zone) => (
        <div key={zone.name} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span
              className={cn("size-2.5 shrink-0 rounded-full", zone.colorClass)}
              aria-hidden="true"
            />
            <h3 className="text-foreground text-sm font-medium tracking-wide uppercase">
              {zone.name}
            </h3>
            <span className="text-muted-foreground text-xs">({zone.streets.length})</span>
          </div>
          <ul
            className={cn(
              "grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-3 lg:grid-cols-4",
              zone.muted ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {zone.streets.map((street) => (
              <li key={street}>{street}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

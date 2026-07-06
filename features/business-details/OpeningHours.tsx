import { Clock } from "lucide-react";
import type { Business, BusinessOpeningHours } from "@/types/business";

interface OpeningHoursProps {
  business: Business;
}

const DAYS: { key: keyof BusinessOpeningHours; label: string }[] = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

export function OpeningHours({ business }: OpeningHoursProps) {
  if (!business.openingHours) {
    return null;
  }

  const hours = business.openingHours;

  return (
    <section aria-labelledby="hours-heading" className="flex flex-col gap-3">
      <h2
        id="hours-heading"
        className="text-foreground flex items-center gap-2 text-lg font-semibold"
      >
        <Clock className="text-muted-foreground size-4" aria-hidden="true" />
        Opening Hours
      </h2>
      <dl className="flex flex-col gap-1.5 text-sm">
        {DAYS.map(({ key, label }) => {
          const value = hours[key];
          const isClosed = !value || value.toLowerCase() === "closed";
          return (
            <div key={key} className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className={isClosed ? "text-muted-foreground" : "text-foreground font-medium"}>
                {isClosed ? "Closed" : value.replace("-", " – ")}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

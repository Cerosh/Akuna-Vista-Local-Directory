import { Badge } from "@/components/ui/badge";
import type { Business } from "@/types/business";

interface ServiceAreasProps {
  business: Business;
}

export function ServiceAreas({ business }: ServiceAreasProps) {
  if (!business.serviceAreas || business.serviceAreas.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="service-areas-heading" className="flex flex-col gap-3">
      <h2 id="service-areas-heading" className="text-foreground text-lg font-semibold">
        Service Areas
      </h2>
      <div className="flex flex-wrap gap-2">
        {business.serviceAreas.map((area) => (
          <Badge key={area} variant="outline">
            {area}
          </Badge>
        ))}
      </div>
    </section>
  );
}

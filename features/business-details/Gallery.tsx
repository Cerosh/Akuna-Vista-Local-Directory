import Image from "next/image";
import type { Business } from "@/types/business";

interface GalleryProps {
  business: Business;
}

export function Gallery({ business }: GalleryProps) {
  if (!business.images || business.images.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="gallery-heading" className="flex flex-col gap-3">
      <h2 id="gallery-heading" className="text-foreground text-lg font-semibold">
        Gallery
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {business.images.map((src, index) => (
          <div
            key={src + index}
            className="bg-muted relative aspect-video overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt={`${business.name} photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

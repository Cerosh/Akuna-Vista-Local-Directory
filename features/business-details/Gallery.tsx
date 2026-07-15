"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
          <Dialog key={src + index}>
            <DialogTrigger
              className="bg-muted focus-visible:ring-ring/50 relative aspect-video overflow-hidden rounded-lg outline-none focus-visible:ring-3"
              aria-label={`View ${business.name} photo ${index + 1} full size`}
            >
              <Image
                src={src}
                alt={`${business.name} photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-150 hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </DialogTrigger>
            <DialogContent className="border-none bg-transparent p-0 shadow-none">
              <DialogTitle className="sr-only">
                {business.name} photo {index + 1}
              </DialogTitle>
              <div className="relative h-[70vh] w-full">
                <Image
                  src={src}
                  alt={`${business.name} photo ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="92vw"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}

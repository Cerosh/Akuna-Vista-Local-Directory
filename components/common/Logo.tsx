import Link from "next/link";
import { MapPinHouse } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  siteName: string;
  className?: string;
}

/** Text-based logo. Replace with an image/svg mark once branding exists. */
export function Logo({ siteName, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("text-foreground flex items-center gap-2 text-base font-semibold", className)}
    >
      <MapPinHouse className="text-primary size-5" aria-hidden="true" />
      <span>{siteName}</span>
    </Link>
  );
}

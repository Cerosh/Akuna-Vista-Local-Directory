import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  siteName: string;
  /** Resolved by the caller from `Settings.logo` — Logo itself never hardcodes an asset path. */
  logo: string;
  className?: string;
}

export function Logo({ siteName, logo, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("text-foreground flex items-center gap-2 text-base font-semibold", className)}
    >
      <Image src={logo} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full" />
      <span>{siteName}</span>
    </Link>
  );
}

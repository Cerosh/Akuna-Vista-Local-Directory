import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only the self-authored /public/images/placeholder-business.svg needs
    // this today — it's a trusted static asset, not user-uploaded content.
    // Real business photos will be JPG/PNG and won't need this flag.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hatscripts.github.io",
        pathname: "/circle-flags/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; frame-src 'none'; sandbox;",
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The site ships zero external raster images (all visuals are CSS/SVG/DOM),
  // so no remotePatterns are needed. Keep the surface small and fast.
  poweredByHeader: false,
};

export default nextConfig;

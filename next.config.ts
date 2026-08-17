import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The only raster images are pre-compressed local frames in public/footage
  // (served as plain <img>), so no remotePatterns or image config is needed.
  poweredByHeader: false,
};

export default nextConfig;

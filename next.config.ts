import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    // This will ignore TypeScript errors during production build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

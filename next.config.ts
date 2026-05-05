import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.0.0.48'],

  images: {
    remotePatterns: [
      // Hero placeholder images. Remove once real photography is added.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },

    ],
  },
};

export default nextConfig;

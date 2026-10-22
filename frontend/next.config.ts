import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // EDIT GUIDE: API proxy and image hosts live here; page content is in Website Settings.
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
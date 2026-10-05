import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/shop", destination: "/products", permanent: false },
      { source: "/cart", destination: "/products", permanent: false },
    ];
  },
};

export default nextConfig;

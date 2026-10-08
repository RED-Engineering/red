import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@google/model-viewer"],
  outputFileTracingIncludes: {
    "/api/hero-model": ["./src/assets/hero-assembly.glb"],
  },
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

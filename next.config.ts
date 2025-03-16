import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // No recomendado en producción
  },
  reactStrictMode: true
};

export default nextConfig;

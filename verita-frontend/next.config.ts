import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Desabilitar image optimization se necessário para Vercel
  images: {
    unoptimized: false,
  },
};

export default nextConfig;

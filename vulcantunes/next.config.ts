import type { NextConfig } from "next";

const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true
} satisfies NextConfig;

export default nextConfig;

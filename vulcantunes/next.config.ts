import type { NextConfig } from "next";

const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ],
      },
    ]
  }
} satisfies NextConfig;

export default nextConfig;

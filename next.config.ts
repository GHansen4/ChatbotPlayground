import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for production builds
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Fix workspace root detection for Vercel
  outputFileTracingRoot: __dirname,
  
  // External packages configuration
  serverExternalPackages: [],
  
  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
  },
  
  // Compression
  compress: true,
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
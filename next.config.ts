import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    qualities: [50, 55, 60, 65, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/robot.txt",
        destination: "/robots.txt",
        permanent: true,
      },
      {
        source: "/baby-sitter",
        destination: "/layanan/baby-sitter",
        permanent: true,
      },
      {
        source: "/perawat-lansia",
        destination: "/layanan/perawat-lansia",
        permanent: true,
      },
      {
        source: "/perawat%20lansia",
        destination: "/layanan/perawat-lansia",
        permanent: true,
      },
      {
        source: "/art",
        destination: "/layanan/art",
        permanent: true,
      },
      {
        source: "/prt",
        destination: "/layanan/art",
        permanent: true,
      },
      {
        source: "/asisten-rumah-tangga",
        destination: "/layanan/art",
        permanent: true,
      },
      {
        source: "/pekerja-rumah-tangga",
        destination: "/layanan/art",
        permanent: true,
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

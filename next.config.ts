import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bnyrcyemzfbmihqhuwpt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/news-images/**",
      },
    ],
  },
};

export default nextConfig;

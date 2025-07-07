import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React strict mode बेहतर development के लिए
  reactStrictMode: true,

  // Supabase या किसी और external image domain के लिए config
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bnyrcyemzfbmihqhuwpt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/news-images/**",
      },
      // अगर और भी domains/images चाहिए तो यहाँ add कर सकते हैं
    ],
  },
};

export default nextConfig;

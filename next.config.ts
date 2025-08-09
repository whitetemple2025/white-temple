// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // 如果你沒有用 next/image 的遠端優化，可開啟下列設定避免部署環境限制
  // images: { unoptimized: true },

  webpack: (config, { isServer }) => {
    // 在瀏覽器端避免注入不必要的 Node polyfills
    if (!isServer) {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;

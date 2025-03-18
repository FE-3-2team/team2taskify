import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  postcssLoaderOptions: {
    postcssOptions: {
      config: "./postcss.config.js",
    },
  },
  images: {
    domains: ["example.com"],
  },
};

export default nextConfig;

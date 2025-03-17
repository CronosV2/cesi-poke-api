import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig = {
  webpack(config: WebpackConfig) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;

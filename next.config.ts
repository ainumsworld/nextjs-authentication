import type { NextConfig } from "next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

const nextConfig: NextConfig = {
  // dynamicIO: true,
  // cacheLife: {
  //   blog: {
  //     stale: 3600, // 1 hour
  //     revalidate: 900, // 15 minutes
  //     expire: 86400, // 1 day
  //   },
  // },

  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },

  experimental: {
    ppr: "incremental",
    reactCompiler: true,
    // staleTimes: {
    //   dynamic: 30,
    //   static: 180,
    // },
    // typedRoutes: true, // (not yet supported with turbopack)
  },

  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule: { test: { test: (arg0: string) => any } }) =>
        rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;

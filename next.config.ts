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
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
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
};

export default nextConfig;

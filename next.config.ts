import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Compile shared page and landing illustration styles with Tailwind. */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // The presentation is no longer shown on the site; its old address leads
  // to the form that requests it.
  async redirects() {
    return [
      {
        source: "/resources/presentation",
        destination: "/resources#presentation",
        permanent: false,
      },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        // Keep native CSS Module scoping: `as: "*.css"` would otherwise
        // turn module imports into global styles with no class-name exports.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

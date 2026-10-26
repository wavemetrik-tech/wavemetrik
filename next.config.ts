import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const posthogDomain = posthogHost
  ? new URL(posthogHost).hostname.split(".").slice(-2).join(".")
  : undefined;

// Every page is prerendered, so there is no request to make a nonce for:
// inline scripts (the page data Next.js writes, the theme script) are
// allowed as a group. What the policy does limit is where scripts, frames,
// fonts and form posts may come from or go to. React's development build
// needs `eval`, and the development overlay loads its font from a data URL.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${posthogDomain ? ` https://*.${posthogDomain}` : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  `font-src 'self'${isDev ? " data:" : ""}`,
  `connect-src 'self'${posthogHost ? ` ${posthogHost}` : ""}`,
  "worker-src blob:",
  // The map on the contact page.
  "frame-src https://www.google.com https://maps.google.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Browsers only act on this over HTTPS. Subdomains are left out: they are
  // not this site's to decide for.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  /* Compile shared page and landing illustration styles with Tailwind. */
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
  },
  cacheComponents: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The PDFs in `public/documents` are reached by address only: no page
      // links to them and the sitemap leaves them out. They download rather
      // than open, and search engines are told not to list them.
      {
        source: "/documents/:file",
        headers: [
          { key: "Content-Disposition", value: "attachment" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Addresses of the previous site, which search engines and other
      // sites still link to.
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-conditions", permanent: true },
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:id", destination: "/resources", permanent: true },
      {
        source: "/products/mt-c24",
        destination: "/products/client-emulators",
        permanent: true,
      },
      {
        source: "/products/mt-wave",
        destination: "/products/interference-generators",
        permanent: true,
      },
      // The presentation and the datasheet are no longer shown or served by
      // the site; their old addresses lead to where each can be requested.
      {
        source: "/resources/presentation",
        destination: "/resources#presentation",
        permanent: false,
      },
      {
        source: "/download/wavemetrik-technologies",
        destination: "/resources#presentation",
        permanent: false,
      },
      {
        source: "/Wavemetrik_Technologies.pdf",
        destination: "/resources#presentation",
        permanent: false,
      },
      {
        source: "/download/mt-wave-interference-generator",
        destination: "/products/interference-generators",
        permanent: false,
      },
      {
        source: "/MT-Wave/MT-Wave-Interference-Generator.pdf",
        destination: "/products/interference-generators",
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

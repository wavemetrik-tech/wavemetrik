import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

// Stand-in for SF Pro on non-Apple devices; see --font-sans in globals.css.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

// Each page sets its own title, description and canonical address through
// `pageMetadata`; these are the values every page shares.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Wavemetrik | Wi-Fi test and measurement systems",
    template: "%s | Wavemetrik",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: "Wavemetrik | Wi-Fi test and measurement systems",
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      // In-page links scroll smoothly (globals.css); this lets the router
      // switch that off while it changes page, so a new page opens at its
      // top instead of gliding up from the old scroll position.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </body>
    </html>
  );
}

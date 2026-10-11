import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { GUIDES } from "./resources/_data/guides";

// The placeholder policy pages are left out until they have their text.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
  ) => ({ url: absoluteUrl(path), changeFrequency, priority });

  return [
    page("/", 1, "weekly"),
    page("/products", 0.9),
    page("/products/wifi-test-systems", 0.9),
    page("/products/client-emulators", 0.9),
    page("/products/interference-generators", 0.9),
    page("/solutions", 0.8),
    page("/resources", 0.7),
    ...GUIDES.map((guide) => page(`/resources/${guide.slug}`, 0.6)),
    page("/about-us", 0.5, "yearly"),
    page("/contact-us", 0.5, "yearly"),
  ];
}

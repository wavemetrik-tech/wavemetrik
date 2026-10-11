import type { Metadata } from "next";
import { absoluteUrl, SITE } from "./site";

export const SHARE_ALT =
  "Wavemetrik: Wi-Fi test and measurement. Client emulators, interference generators and RF test systems.";

// A page's title, description, canonical address and share-card text in one
// place. `title` gets " | Wavemetrik" added unless `absolute` is set.
export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
  type = "website",
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
  type?: "website" | "article";
  index?: boolean;
}): Metadata {
  const shareTitle = absolute ? title : `${title} | ${SITE.name}`;
  // A page's own `openGraph` replaces the one inherited from the root, share
  // image included, so the image is named again here.
  const images = [
    { url: "/opengraph-image", width: 1200, height: 630, alt: SHARE_ALT },
  ];
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      locale: "en_US",
      title: shareTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images,
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}

const ORGANIZATION_ID = absoluteUrl("/#organization");

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/web-app-manifest-512x512.png"),
  slogan: SITE.tagline,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      telephone: SITE.phone,
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: SITE.email,
    },
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: absoluteUrl("/"),
  name: SITE.name,
  description: SITE.description,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
};

// The trail from the home page to this one, as [name, path] pairs.
export function breadcrumbSchema(trail: [name: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as [string, string], ...trail].map(
      ([name, path], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        item: absoluteUrl(path),
      }),
    ),
  };
}

// An instrument or system. `specs` are its headline figures.
export function productSchema({
  name,
  description,
  path,
  category,
  specs,
}: {
  name: string;
  description: string;
  path: string;
  category: string;
  specs: readonly { label: string; value: string }[];
}) {
  return {
    "@type": "Product",
    "@id": absoluteUrl(`${path}#product`),
    name,
    description,
    category,
    url: absoluteUrl(path),
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": ORGANIZATION_ID },
    additionalProperty: specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function faqSchema(
  questions: readonly { question: string; answer: string }[],
) {
  return {
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleSchema({
  title,
  description,
  path,
  section,
}: {
  title: string;
  description: string;
  path: string;
  section: string;
}) {
  return {
    "@type": "TechArticle",
    headline: title,
    description,
    articleSection: section,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: "en",
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

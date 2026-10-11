import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  FileTextIcon,
  PresentationIcon,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { DatasheetRequest } from "@/components/datasheet-request";
import { PageFrame } from "@/components/page-frame";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { GUIDES } from "./_data/guides";
import { GuideCard } from "./_components/guide-card";
import { PresentationFeature } from "./_components/presentation-feature";

const PAGE = {
  title: "Wi-Fi testing resources and guides",
  description:
    "Wavemetrik's technical presentation, product specifications and practical guides to planning, running and reading Wi-Fi evaluations.",
  path: "/resources",
};

export const metadata: Metadata = pageMetadata(PAGE);

const sections = [
  {
    label: "Technical presentation",
    detail: "Instruments, architectures and workflows, on request",
    href: "#presentation",
    icon: PresentationIcon,
  },
  {
    label: "Engineering guides",
    detail: "Plan, measure and interpret your tests",
    href: "#engineering-guides",
    icon: BookOpenIcon,
  },
  {
    label: "Product documentation",
    detail: "Specifications and current capabilities",
    href: "#product-documentation",
    icon: FileTextIcon,
  },
];

export default function ResourcesPage() {
  return (
    <PageFrame className="resources-page">
      <JsonLd data={breadcrumbSchema([["Resources", PAGE.path]])} />
      <section className="page-hero" aria-labelledby="resources-heading">
        <div className="grid items-end gap-x-16 gap-y-9 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <p className="eyebrow">Resources</p>
            <h1
              id="resources-heading"
              className="product-title mt-5 max-w-2xl text-balance"
            >
              Get closer to the engineering.
            </h1>
            <p className="mt-6 max-w-xl text-body/7 text-pretty text-muted-foreground">
              Explore the platform, understand the measurements and prepare a
              test plan with the right context.
            </p>
          </div>
          <nav aria-label="Resource sections" className="divide-y border-y">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="group/section flex min-h-20 items-center gap-4 rounded-lg py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <section.icon
                  aria-hidden
                  className="size-5 shrink-0 text-muted-foreground transition-colors group-hover/section:text-link"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-subhead font-medium group-hover/section:text-link">
                    {section.label}
                  </span>
                  <span className="mt-1 block text-caption-1 text-muted-foreground">
                    {section.detail}
                  </span>
                </span>
                <ArrowDownRightIcon
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover/section:translate-x-0.5 group-hover/section:translate-y-0.5 motion-reduce:transition-none"
                />
              </a>
            ))}
          </nav>
        </div>
      </section>
      <PresentationFeature />
      <section
        id="engineering-guides"
        aria-labelledby="guides-heading"
        className="page-section section-flush-top"
      >
        <header className="max-w-3xl">
          <p className="eyebrow">Engineering guides</p>
          <h2 id="guides-heading" className="section-heading mt-4">
            A useful starting point for your next test.
          </h2>
        </header>
        <ul className="mt-9 grid gap-4 md:grid-cols-3">
          {GUIDES.map((guide) => (
            <li key={guide.slug} className="min-w-0">
              <GuideCard guide={guide} />
            </li>
          ))}
        </ul>
      </section>
      <section
        id="product-documentation"
        aria-labelledby="documentation-heading"
        className="page-section section-flush-top"
      >
        <div className="grid items-start gap-x-14 gap-y-8 rounded-3xl bg-muted p-6 sm:p-9 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:p-10">
          <header>
            <p className="eyebrow">Product documentation</p>
            <h2
              id="documentation-heading"
              className="section-heading mt-4 max-w-lg"
            >
              Find the specifications that matter.
            </h2>
            <p className="mt-5 max-w-xl text-body/7 text-pretty text-muted-foreground">
              MT-Wave’s current specifications include Wi-Fi and non-Wi-Fi
              capabilities, channel coverage, control interfaces and firmware
              limitations.
            </p>
          </header>
          <div className="divide-y border-y">
            <Link
              href="/products/interference-generators#wifi-interference"
              className="flex min-h-20 items-center justify-between gap-4 py-4 text-subhead font-medium text-link underline-offset-4 hover:underline"
            >
              Read MT-Wave specifications
              <ArrowUpRightIcon aria-hidden className="size-4 shrink-0" />
            </Link>
            <DatasheetRequest
              label="Request a product datasheet"
              align="end"
              className="flex min-h-20 w-full items-center justify-between gap-4 py-4 text-left text-subhead font-medium text-link underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

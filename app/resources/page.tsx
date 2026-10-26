import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  FileTextIcon,
  PlayIcon,
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

// A document card: its name and a line about it, with a round chip at the end.
const DOCUMENT_CARD =
  "flex min-h-24 items-center justify-between gap-5 rounded-2xl bg-background p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6";

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
        <div className="grid items-center gap-x-14 gap-y-8 rounded-3xl bg-muted p-6 sm:p-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-10">
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
          {/* The two ways to the documents, as white cards on the tile. The
              round chip at the end of each turns blue under the pointer. */}
          <ul className="grid gap-3">
            <li>
              <Link
                href="/products/interference-generators#wifi-interference"
                className={`group ${DOCUMENT_CARD}`}
              >
                <span className="min-w-0">
                  <span className="block text-headline">
                    Read MT-Wave specifications
                  </span>
                  <span className="mt-1 block text-subhead/[1.375rem] text-muted-foreground">
                    Listed in full on the MT-Wave product page.
                  </span>
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-link transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                  <ArrowUpRightIcon aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
            <li>
              <a
                href="/videos/MT-Wave-demo.mp4"
                className={`group ${DOCUMENT_CARD}`}
              >
                <span className="min-w-0">
                  <span className="block text-headline">
                    Watch the MT-Wave demo
                  </span>
                  <span className="mt-1 block text-subhead/[1.375rem] text-muted-foreground">
                    A ten-minute walkthrough of the instrument.
                  </span>
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-link transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                  <PlayIcon aria-hidden className="size-4" />
                </span>
              </a>
            </li>
            <li>
              <DatasheetRequest
                label={
                  <span className="min-w-0">
                    <span className="block text-headline">
                      Request a product datasheet
                    </span>
                    <span className="mt-1 block text-subhead/[1.375rem] text-muted-foreground">
                      Choose a product and we’ll send it to you.
                    </span>
                  </span>
                }
                align="end"
                className={`w-full text-left ${DOCUMENT_CARD} [&>svg]:box-content [&>svg]:rounded-full [&>svg]:bg-muted [&>svg]:p-[0.6875rem] [&>svg]:text-link [&>svg]:transition-[rotate,background-color,color] hover:[&>svg]:bg-primary hover:[&>svg]:text-primary-foreground`}
              />
            </li>
          </ul>
        </div>
      </section>
    </PageFrame>
  );
}

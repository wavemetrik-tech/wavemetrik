import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import { CtaPanel } from "@/components/cta-panel";
import { PartDrawing } from "@/components/diagrams/part-drawings";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { pillLink } from "@/lib/pill-link";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { ProductArt } from "../_components/lab-art";
import { HEADLINE_SPECS as clientSpecs } from "./client-emulators/_components/hero";
import { headlineSpecs as waveSpecs } from "./interference-generators/_data/overview";
import {
  headlineSpecs as systemSpecs,
  platformAudience,
  platformParts,
  type PlatformPartId,
} from "./wifi-test-systems/_data/platform";

const PAGE = {
  title: "Wi-Fi test products",
  description:
    "Wavemetrik’s Wi-Fi test products: MT-SYS shielded test systems, MT-C24 Wi-Fi 7 client emulators and the MT-Wave interference generator, with the parts each system is built from.",
  path: "/products",
};

export const metadata: Metadata = pageMetadata(PAGE);

// The three products that have a page of their own. The words are the ones
// used for them on the home page; the figures are each page's headline ones.
const PRODUCTS = [
  {
    art: "system" as const,
    name: "MT-SYS",
    category: "Complete test systems",
    title: "One environment. Every part of the test.",
    description:
      "Bring shielded enclosures, client radios and programmable RF paths together in a system configured for your device.",
    specs: systemSpecs,
    href: "/products/wifi-test-systems",
  },
  {
    art: "clients" as const,
    name: "MT-C24",
    category: "Real client radios",
    title: "More clients. A clearer picture.",
    description:
      "Evaluate Wi-Fi performance, client loading and Wi-Fi 7 Multi-Link Operation with real radios.",
    specs: clientSpecs,
    href: "/products/client-emulators",
  },
  {
    art: "wave" as const,
    name: "MT-Wave",
    category: "Controlled interference",
    title: "Bring the busy air into your lab.",
    description:
      "Combine Wi-Fi traffic with Bluetooth, IEEE 802.15.4, radar or noise in a repeatable test scene.",
    specs: waveSpecs,
    href: "/products/interference-generators",
  },
];

// Where each part of the platform is described.
const PART_LINKS: Record<PlatformPartId, { label: string; href: string }> = {
  system: { label: "See MT-SYS", href: "/products/wifi-test-systems" },
  clients: { label: "See MT-C24", href: "/products/client-emulators" },
  emulator: {
    label: "See MT-BE",
    href: "/products/client-emulators#emulator-configurations",
  },
  wave: { label: "See MT-Wave", href: "/products/interference-generators" },
  attenuators: {
    label: "See them in a system",
    href: "/products/wifi-test-systems#system-configurations",
  },
  automation: {
    label: "See test automation",
    href: "/products/client-emulators#test-automation",
  },
};

export default function ProductsPage() {
  return (
    <PageFrame className="products-page">
      <JsonLd
        data={[
          breadcrumbSchema([["Products", PAGE.path]]),
          {
            "@type": "ItemList",
            name: "Wavemetrik products",
            itemListElement: PRODUCTS.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: product.name,
              url: absoluteUrl(product.href),
            })),
          },
        ]}
      />

      {/* The same hero tile as Solutions and About: the statement, and the
          three instruments drawn as one bench. */}
      <section
        className="page-hero pt-8 sm:pt-12 lg:pt-16"
        aria-labelledby="products-heading"
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-muted px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="grid items-center gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
            <div className="hero-copy relative z-10">
              <p className="eyebrow">Products</p>
              <h1
                id="products-heading"
                className="product-title mt-5 max-w-[12ch] text-balance"
              >
                From one instrument to a complete lab.
              </h1>
              <p className="mt-6 max-w-md text-body/7 text-pretty text-muted-foreground">
                Start with the instrument you need. Build a complete system when
                your test plan calls for more.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#range" className={pillLink.primary}>
                  See the range
                  <ArrowDownIcon aria-hidden className="size-4" />
                </a>
                <Link href="/contact-us" className={pillLink.outline}>
                  Talk to an engineer
                </Link>
              </div>
            </div>
            <div className="hero-art min-w-0">
              <ProductArt kind="system" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="range"
        aria-labelledby="range-heading"
        className="page-section section-flush-top"
      >
        <header className="max-w-2xl">
          <p className="eyebrow">The range</p>
          <h2 id="range-heading" className="section-heading mt-4">
            Systems and instruments.
          </h2>
        </header>
        <ul className="mt-9 grid gap-4 lg:gap-5">
          {PRODUCTS.map((product, index) => (
            <li key={product.name}>
              <Link
                href={product.href}
                className={`home-system-card home-product-card group ${
                  index % 2 ? "md:[&>.home-system-art]:order-first" : ""
                }`}
              >
                <div className="home-system-copy">
                  <p className="eyebrow">{product.category}</p>
                  <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)]/tight font-semibold tracking-tight">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-title-3 font-medium tracking-tight text-balance">
                    {product.title}
                  </p>
                  <p className="mt-4 max-w-md text-body/7 text-pretty text-muted-foreground">
                    {product.description}
                  </p>
                  <dl className="mt-7 grid max-w-md grid-cols-2 gap-x-6 gap-y-4 border-t pt-5">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="min-w-0">
                        <dt className="text-footnote/5 text-muted-foreground">
                          {spec.label}
                        </dt>
                        <dd className="mt-1 text-subhead font-semibold tabular-nums">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <span className="home-card-link mt-7">
                    Explore {product.name}{" "}
                    <ArrowUpRightIcon aria-hidden className="size-4" />
                  </span>
                </div>
                <div className="home-system-art">
                  <ProductArt kind={product.art} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="parts-heading" className="page-section">
        <header className="max-w-2xl">
          <p className="eyebrow">The platform</p>
          <h2 id="parts-heading" className="section-heading mt-4">
            What a system is built from.
          </h2>
          <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
            A modular platform for different lab roles. {platformAudience}
          </p>
        </header>
        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {platformParts.map((part) => (
            <li key={part.id} className="expertise-card flex flex-col">
              <PartDrawing id={part.id} className="rounded-2xl p-4" />
              <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
                <h3 className="text-title-3 font-semibold">{part.name}</h3>
                <p className="mt-1 text-subhead/[1.375rem] text-muted-foreground">
                  {part.role}
                </p>
                <dl className="mt-4">
                  <dt className="text-footnote text-muted-foreground">
                    Typical evaluation
                  </dt>
                  <dd className="mt-0.5 text-subhead/[1.375rem]">
                    {part.evaluation}
                  </dd>
                </dl>
                <Link
                  href={PART_LINKS[part.id].href}
                  className="mt-auto inline-flex min-h-11 w-fit items-center gap-1.5 rounded-sm pt-3 text-subhead font-medium text-link underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {PART_LINKS[part.id].label}
                  <ArrowUpRightIcon aria-hidden className="size-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaPanel
        headingId="products-contact-heading"
        eyebrow="Build your test environment"
        title="Find the right configuration."
        actions={
          <Link href="/contact-us" className={pillLink.primary}>
            Talk to our team <ArrowUpRightIcon aria-hidden className="size-4" />
          </Link>
        }
      >
        Tell us about your devices, test requirements and lab. We’ll help you
        find the right configuration.
      </CtaPanel>
    </PageFrame>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import { CtaPanel } from "@/components/cta-panel";
import { PageFrame } from "@/components/page-frame";
import { pillLink } from "@/lib/pill-link";
import { pageMetadata } from "@/lib/seo";
import { HeroLab } from "./_components/hero-lab";
import heroStyles from "./_components/home-hero.module.css";
import { ProductArt, EvidenceArt } from "./_components/lab-art";
import { approaches } from "./solutions/_data/approaches";
import { TestMotif } from "./solutions/_components/test-motif";
import { GUIDES } from "./resources/_data/guides";
import { ResourceGraphic } from "./resources/_components/resource-graphic";

export const metadata: Metadata = pageMetadata({
  title: "Wavemetrik | Wi-Fi test and measurement systems",
  absolute: true,
  description:
    "Wi-Fi test and measurement from Wavemetrik: real-radio Wi-Fi 7 client emulators, interference generators and shielded RF test systems for repeatable lab testing.",
  path: "/",
});
const instruments = [
  {
    id: "clients" as const,
    name: "MT-C24",
    category: "Real client radios",
    title: "More clients. A clearer picture.",
    description:
      "Evaluate Wi-Fi performance, client loading and Wi-Fi 7 Multi-Link Operation with real radios.",
    facts: ["24 or 48 client radios", "2×2 MIMO per radio"],
    href: "/products/client-emulators",
  },
  {
    id: "wave" as const,
    name: "MT-Wave",
    category: "Controlled interference",
    title: "Bring the busy air into your lab.",
    description:
      "Combine Wi-Fi traffic with Bluetooth, IEEE 802.15.4, radar or noise in a repeatable test scene.",
    facts: ["2.4, 5 & 6 GHz Wi-Fi", "Two independent radios"],
    href: "/products/interference-generators",
  },
];
const workflow = [
  {
    title: "Define the conditions",
    text: "Record your device, firmware, RF paths and traffic settings.",
  },
  {
    title: "Change one thing",
    text: "Vary path loss, client load or interference against a clear baseline.",
  },
  {
    title: "Keep the evidence",
    text: "Connect the measurements with configuration and packet context.",
  },
  {
    title: "Repeat on the next build",
    text: "Return to the same conditions to understand what changed.",
  },
];
export default function Home() {
  return (
    <PageFrame className="home-page">
      {/* The landing hero: the statement across the top, and the test bench
          drawn large on the page under it. */}
      <div className={heroStyles.band}>
        <section
          className={`page-hero ${heroStyles.hero}`}
          aria-labelledby="home-heading"
        >
          <header className={heroStyles.masthead}>
            <h1 id="home-heading" className={heroStyles.title}>
              <span>Better wireless</span>
              <span>starts in the lab.</span>
            </h1>
            <div className={`hero-copy ${heroStyles.copy}`}>
              <p className={heroStyles.description}>
                Real radios. Controlled RF. Repeatable measurements. Build the
                evidence for your next release.
              </p>
              <div className={heroStyles.actions}>
                <a href="#platform" className={pillLink.primary}>
                  Explore platform
                  <ArrowDownIcon aria-hidden className="size-4" />
                </a>
                <Link href="/contact-us" className={pillLink.outline}>
                  Talk to an engineer
                </Link>
              </div>
            </div>
          </header>
          <div className={`hero-art ${heroStyles.bench}`}>
            <HeroLab />
          </div>
        </section>
      </div>
      <section
        id="platform"
        className="page-section"
        aria-labelledby="platform-heading"
      >
        <header className="home-section-header">
          <div>
            <p className="eyebrow">The platform</p>
            <h2
              id="platform-heading"
              className="section-heading mt-4 max-w-xl text-balance"
            >
              Your lab. Built around your questions.
            </h2>
          </div>
          <p className="max-w-sm text-body/7 text-muted-foreground">
            Start with the instrument you need. Build a complete system when
            your test plan calls for more.
          </p>
        </header>
        <Link
          href="/products/wifi-test-systems"
          className="home-system-card home-product-card group"
        >
          <div className="home-system-copy">
            <p className="eyebrow">Complete test systems</p>
            <p className="mt-4 text-subhead font-semibold text-muted-foreground">
              MT-SYS
            </p>
            <h3 className="mt-2 text-[clamp(1.75rem,3vw,2.25rem)]/tight font-semibold tracking-tight text-balance">
              One environment.
              <br />
              Every part of the test.
            </h3>
            <p className="mt-5 max-w-md text-body/7 text-muted-foreground">
              Bring shielded enclosures, client radios and programmable RF paths
              together in a system configured for your device.
            </p>
            <span className="home-card-link mt-7">
              Explore test systems{" "}
              <ArrowUpRightIcon aria-hidden className="size-4" />
            </span>
          </div>
          <div className="home-system-art">
            <ProductArt kind="system" />
          </div>
        </Link>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {instruments.map((product) => (
            <Link
              href={product.href}
              key={product.id}
              className="home-product-card group flex flex-col"
            >
              <div className="home-instrument-art">
                <ProductArt kind={product.id} />
              </div>
              <div className="home-instrument-copy">
                <p className="eyebrow">{product.category}</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <h3 className="text-title-1 font-semibold tracking-tight">
                    {product.name}
                  </h3>
                  <ArrowUpRightIcon
                    aria-hidden
                    className="home-card-arrow size-5 text-link"
                  />
                </div>
                <p className="mt-3 text-title-3 font-medium tracking-tight">
                  {product.title}
                </p>
                <p className="mt-3 text-body/7 text-muted-foreground">
                  {product.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t pt-4 text-footnote/5 text-muted-foreground">
                  {product.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="page-section" aria-labelledby="applications-heading">
        <header className="home-section-header">
          <div>
            <p className="eyebrow">Applications</p>
            <h2
              id="applications-heading"
              className="section-heading mt-4 text-balance"
            >
              Start with the question.
            </h2>
          </div>
          <Link href="/solutions" className="home-text-link">
            Explore all solutions{" "}
            <ArrowUpRightIcon aria-hidden className="size-4" />
          </Link>
        </header>
        <div className="grid gap-x-10 md:grid-cols-2">
          {approaches.map((approach) => (
            <Link
              key={approach.id}
              href={`/solutions#${approach.id}`}
              className="home-application solution-card group"
            >
              <div className="min-w-0 flex-1">
                <p className="eyebrow">{approach.category}</p>
                <h3 className="mt-2 text-title-3/7 font-semibold tracking-tight group-hover:text-link">
                  {approach.title}
                </h3>
                <p className="mt-2 text-subhead/6 text-muted-foreground">
                  {approach.tagline}
                </p>
              </div>
              <div className="home-application-motif">
                <TestMotif kind={approach.id} />
              </div>
              <ArrowUpRightIcon
                aria-hidden
                className="home-card-arrow size-4 shrink-0 text-link"
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="page-section" aria-labelledby="evidence-heading">
        <div className="home-evidence-grid">
          <div className="home-evidence-art">
            <EvidenceArt />
            <p className="px-6 pb-6 text-center text-footnote/5 text-muted-foreground">
              Configuration → measurement → diagnostic context
            </p>
          </div>
          <div>
            <p className="eyebrow">Built for the next build</p>
            <h2
              id="evidence-heading"
              className="section-heading mt-4 max-w-lg text-balance"
            >
              A result you can return to.
            </h2>
            <p className="mt-5 text-body/7 text-muted-foreground">
              A throughput number starts a conversation. A repeatable test helps
              you find the answer. Keep the conditions, observations and
              evidence connected.
            </p>
            <ol className="mt-7 space-y-5">
              {workflow.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="home-step-number">{index + 1}</span>
                  <div>
                    <h3 className="text-body font-semibold">{step.title}</h3>
                    <p className="mt-1 text-subhead/6 text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/solutions#automation-and-diagnosis"
              className="home-text-link mt-8"
            >
              Explore the test workflow{" "}
              <ArrowUpRightIcon aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </section>
      <section className="page-section" aria-labelledby="learning-heading">
        <header className="home-section-header">
          <div>
            <p className="eyebrow">From the lab</p>
            <h2
              id="learning-heading"
              className="section-heading mt-4 max-w-xl text-balance"
            >
              A little context goes a long way.
            </h2>
          </div>
          <Link href="/resources" className="home-text-link">
            Browse resources <ArrowUpRightIcon aria-hidden className="size-4" />
          </Link>
        </header>
        <div className="grid gap-5 md:grid-cols-3">
          {GUIDES.map((guide) => (
            <Link
              href={`/resources/${guide.slug}`}
              key={guide.slug}
              className="home-guide resource-card group"
            >
              <div className="home-guide-art">
                <ResourceGraphic kind={guide.graphic} />
              </div>
              <div className="p-6">
                <p className="eyebrow">{guide.category}</p>
                <h3 className="mt-3 text-title-3/7 font-semibold tracking-tight group-hover:text-link">
                  {guide.title}
                </h3>
                <p className="mt-3 text-subhead/6 text-muted-foreground">
                  {guide.intro}
                </p>
                <span className="home-card-link mt-6">
                  Read the guide{" "}
                  <ArrowUpRightIcon aria-hidden className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaPanel
        headingId="home-contact-heading"
        eyebrow="Let’s build your test plan"
        title={
          <>
            <span className="block">Bring your next device.</span>
            <span className="block">We’ll help build the test.</span>
          </>
        }
        actions={
          <>
            <Link href="/contact-us" className={pillLink.primary}>
              Talk to our team{" "}
              <ArrowUpRightIcon aria-hidden className="size-4" />
            </Link>
            <Link href="/about-us" className={pillLink.outline}>
              Meet Wavemetrik
            </Link>
          </>
        }
      >
        Equip your lab, automate your cases, or ask us to run the evaluation on
        our systems.
      </CtaPanel>
    </PageFrame>
  );
}

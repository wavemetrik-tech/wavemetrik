import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { CtaTile } from "@/components/cta-panel";
import { pillLink } from "@/lib/pill-link";
import {
  approaches,
  applications,
  evaluationSteps,
  generalQuestions,
} from "./_data/approaches";
import { AirScene } from "./_components/air-scene";
import { TestMotif } from "./_components/test-motif";
import { TestApproach, Workflow } from "./_components/test-approach";
import { Questions } from "./_components/questions";

const PAGE = {
  title: "Wi-Fi test solutions",
  description:
    "Wireless test approaches for Wi-Fi performance and range, Wi-Fi 7 and MLO, coexistence and interference, DFS radar, mesh and roaming, and repeatable diagnosis.",
  path: "/solutions",
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function SolutionsPage() {
  return (
    <PageFrame className="solutions-page">
      <JsonLd
        data={[
          breadcrumbSchema([[PAGE.title, PAGE.path]]),
          faqSchema(approaches.flatMap((approach) => approach.questions)),
        ]}
      />
      {/* The hero is one tile: the statement, and the device with everything
          that reaches it over the air. */}
      <section
        className="page-hero pt-8 sm:pt-12 lg:pt-16"
        aria-labelledby="solutions-heading"
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-muted px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="grid items-center gap-x-10 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
            <div className="hero-copy relative z-10">
              <p className="eyebrow">Wireless test solutions</p>
              <h1
                id="solutions-heading"
                className="product-title mt-5 max-w-[11ch] text-balance"
              >
                Test against everything in the air.
              </h1>
              <p className="mt-6 max-w-md text-body/7 text-pretty text-muted-foreground">
                Wi-Fi shares its bands with Bluetooth, Zigbee, radar and noise,
                and with other Wi-Fi networks. These are the questions
                Wavemetrik systems are built to answer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#applications" className={pillLink.primary}>
                  Explore applications
                  <ArrowDownIcon aria-hidden className="size-4" />
                </a>
                <Link href="/contact-us" className={pillLink.outline}>
                  Discuss your test plan
                </Link>
              </div>
            </div>
            <AirScene
              approaches={approaches.map(({ id, category, question }) => ({
                id,
                category,
                question,
              }))}
            />
          </div>
        </div>
      </section>

      <section
        id="applications"
        aria-labelledby="applications-heading"
        className="page-section section-flush-top"
      >
        <header>
          <p className="eyebrow">Applications</p>
          <h2 id="applications-heading" className="section-heading mt-4">
            What you can test.
          </h2>
        </header>
        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {approaches.map((approach) => (
            <li key={approach.id} className="min-w-0">
              <a
                href={`#${approach.id}`}
                className="solution-card group/application flex h-full flex-col rounded-3xl bg-muted p-6 outline-none transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--foreground)_3%,var(--muted))] focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none sm:p-7"
              >
                <p className="eyebrow">{approach.category}</p>
                <div className="mb-5 mt-6">
                  <TestMotif kind={approach.id} />
                </div>
                <h3 className="max-w-[25ch] text-title-3 font-semibold tracking-tight text-balance">
                  {approach.title}
                </h3>
                <p className="mb-6 mt-2 text-subhead/6 text-muted-foreground">
                  {approach.tagline}
                </p>
                <span className="mt-auto inline-flex min-h-8 items-center gap-2 text-footnote font-medium text-link">
                  Explore the test approach
                  <ArrowRightIcon
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover/application:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-3xl border border-[var(--surface-outline)] p-6 sm:p-8">
          <h3 className="text-title-3 font-semibold">
            From a baseline to a repeatable test.
          </h3>
          <ul className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <li
                key={application.title}
                className="flex flex-col border-t pt-5"
              >
                <h4 className="text-subhead font-semibold">
                  <a
                    href={`#${application.approach}`}
                    className="underline-offset-4 hover:text-link hover:underline"
                  >
                    {application.title}
                  </a>
                </h4>
                <p className="mb-4 mt-2 text-footnote/6 text-pretty text-muted-foreground">
                  {application.description}
                </p>
                <p className="mt-auto text-caption-1 font-medium text-muted-foreground">
                  {application.instrument}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {approaches.map((approach) => (
        <TestApproach key={approach.id} approach={approach} />
      ))}

      <section
        aria-labelledby="evaluation-heading"
        className="page-section border-t"
      >
        <div className="rounded-3xl bg-muted p-6 sm:p-9 lg:p-10">
          <header className="max-w-2xl">
            <p className="eyebrow">Test workflow</p>
            <h2 id="evaluation-heading" className="section-heading mt-4">
              Build the evaluation around your DUT.
            </h2>
          </header>
          <div className="mt-8">
            <Workflow steps={evaluationSteps} headingLevel={3} />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="example-heading"
        className="page-section section-flush-top"
      >
        <div className="grid items-start gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.65fr)]">
          <header>
            <p className="eyebrow">Example result</p>
            <h2 id="example-heading" className="section-heading mt-4">
              How much interference can an access point take?
            </h2>
            <p className="mt-5 text-body/7 text-pretty text-muted-foreground">
              MT-Wave’s interferer level was stepped from −20 dBm (heavy
              interference) down to −70 dBm (negligible), and throughput
              measured for each WMM traffic class on two access points.
            </p>
            <Link
              href="/products/interference-generators"
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-subhead font-medium text-link underline-offset-4 hover:underline"
            >
              About MT-Wave
              <ArrowUpRightIcon aria-hidden className="size-4" />
            </Link>
          </header>
          <div className="min-w-0 rounded-3xl bg-muted p-5 sm:p-7">
            <div
              className="overflow-x-auto rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
              tabIndex={0}
              role="region"
              aria-label="Interference recovery results"
            >
              <table className="w-full min-w-[30rem] text-left text-footnote/6">
                <caption className="pb-6 text-left text-subhead font-semibold text-foreground">
                  Interferer level at which throughput recovers
                </caption>
                <thead className="border-y text-caption-1/5 text-muted-foreground">
                  <tr>
                    <th scope="col" className="w-[42%] py-4 pr-4 font-medium">
                      Access point
                    </th>
                    <th scope="col" className="px-3 py-4 font-medium">
                      Best effort and background recover at
                    </th>
                    <th scope="col" className="py-4 pl-3 font-medium">
                      Voice and video recover at
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <th scope="row" className="py-5 pr-4 font-medium">
                      Model-1
                      <span className="mt-1 block text-caption-1 font-normal text-muted-foreground">
                        Wi-Fi 6E
                      </span>
                    </th>
                    <td className="px-3 py-5 tabular-nums">About −40 dBm</td>
                    <td className="py-5 pl-3 tabular-nums">About −52 dBm</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-5 pr-4 font-medium">
                      Model-2
                      <span className="mt-1 block text-caption-1 font-normal text-muted-foreground">
                        Wi-Fi 7, set to 802.11ax on 6 GHz
                      </span>
                    </th>
                    <td className="px-3 py-5 tabular-nums">About −55 dBm</td>
                    <td className="py-5 pl-3 tabular-nums">About −55 dBm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-5 border-t pt-4 text-footnote/6 text-pretty text-muted-foreground">
              For a like-for-like comparison MT-C24 was set to 802.11ax on 6
              GHz. Interferer levels include over-the-air and cable losses.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="services-heading"
        className="page-section border-t"
      >
        <header>
          <p className="eyebrow">Services</p>
          <h2 id="services-heading" className="section-heading mt-4">
            Buy the system, or have us run it.
          </h2>
        </header>
        <ul className="mt-9 grid gap-x-10 gap-y-7 md:grid-cols-3">
          {[
            {
              title: "Wi-Fi testing",
              description:
                "Test systems and instruments for your own lab, configured for the devices you build.",
            },
            {
              title: "Wi-Fi automation",
              description:
                "Scripted test runs, so the same cases can be repeated on every firmware build.",
            },
            {
              title: "Test as a service",
              description:
                "We run the tests on our systems for you. Ask sales what is in scope.",
            },
          ].map((service, index) => (
            <li key={service.title} className="border-t pt-5">
              <span
                aria-hidden
                className="text-caption-1 font-medium text-muted-foreground"
              >
                0{index + 1}
              </span>
              <h3 className="mt-4 text-title-3 font-semibold">
                {service.title}
              </h3>
              <p className="mt-3 max-w-sm text-subhead/6 text-pretty text-muted-foreground">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <CtaTile
            actions={
              <Link href="/contact-us" className={pillLink.primary}>
                Talk to our team
                <ArrowUpRightIcon aria-hidden className="size-4" />
              </Link>
            }
          >
            <h3 className="max-w-xl text-title-2 font-semibold tracking-tight text-balance">
              Talk to us about your test plan
            </h3>
          </CtaTile>
        </div>
      </section>

      <section
        aria-labelledby="questions-heading"
        className="page-section section-flush-top"
      >
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.65fr)]">
          <header>
            <p className="eyebrow">Questions &amp; answers</p>
            <h2 id="questions-heading" className="section-heading mt-4">
              A few useful answers.
            </h2>
          </header>
          <Questions items={generalQuestions} />
        </div>
      </section>
    </PageFrame>
  );
}

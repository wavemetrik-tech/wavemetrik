import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import {
  GUIDES,
  guideReadingTime,
  guideSectionId,
  type Guide,
} from "../_data/guides";
import { GuideCard } from "../_components/guide-card";
import { ResourceGraphic } from "../_components/resource-graphic";

export function generateStaticParams() {
  return GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((item) => item.slug === slug);
  if (!guide) return { title: "Guide not found", robots: { index: false } };
  return pageMetadata({
    title: guide.title,
    description: guide.intro,
    path: `/resources/${guide.slug}`,
    type: "article",
  });
}

function GuideContents({ guide }: { guide: Guide }) {
  return (
    <nav aria-label="Guide sections">
      <ol className="mt-4 space-y-1">
        {guide.sections.map(([title], index) => (
          <li key={title}>
            <a
              href={`#${guideSectionId(index)}`}
              className="group/contents flex min-h-11 items-start gap-3 rounded-lg py-2 text-footnote/6 text-muted-foreground outline-none transition-colors hover:text-link focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden
                className="mt-px shrink-0 text-caption-1 tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default async function GuidePage({
  params,
}: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const guide = GUIDES.find((item) => item.slug === slug);
  if (!guide) notFound();
  const related = GUIDES.filter((item) => item.slug !== guide.slug);

  return (
    <PageFrame className="resource-guide-page">
      <JsonLd
        data={[
          articleSchema({
            title: guide.title,
            description: guide.intro,
            path: `/resources/${guide.slug}`,
            section: guide.category,
          }),
          breadcrumbSchema([
            ["Resources", "/resources"],
            [guide.title, `/resources/${guide.slug}`],
          ]),
        ]}
      />
      <section className="page-hero" aria-labelledby="guide-heading">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-2 text-footnote text-muted-foreground">
            <li>
              <Link
                href="/resources"
                className="inline-flex min-h-11 items-center gap-2 rounded-md font-medium text-link underline-offset-4 hover:underline"
              >
                <ArrowLeftIcon aria-hidden className="size-3.5" />
                Resources
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRightIcon className="size-3.5" />
            </li>
            <li>{guide.category}</li>
          </ol>
        </nav>
        <div className="grid items-center gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,.8fr)]">
          <header>
            <p className="eyebrow">{guide.category}</p>
            <h1
              id="guide-heading"
              className="product-title mt-5 max-w-3xl text-balance"
            >
              {guide.title}
            </h1>
            <p className="mt-6 max-w-2xl text-body/7 text-pretty text-muted-foreground">
              {guide.intro}
            </p>
            <p className="mt-6 text-caption-1 text-muted-foreground">
              Engineering guide
              <span aria-hidden className="mx-2">
                ·
              </span>
              {guideReadingTime(guide)} min read
              <span aria-hidden className="mx-2">
                ·
              </span>
              {guide.sections.length} sections
            </p>
          </header>
          <div
            aria-hidden
            className="resource-guide-graphic hidden rounded-3xl bg-muted px-7 py-10 lg:block"
          >
            <ResourceGraphic kind={guide.graphic} />
          </div>
        </div>
      </section>

      <div className="page-section section-flush-top">
        <div className="grid items-start gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.7fr)]">
          <aside className="lg:sticky lg:top-28">
            <div className="hidden border-t pt-5 lg:block">
              <h2 className="text-subhead font-semibold">In this guide</h2>
              <GuideContents guide={guide} />
            </div>
            <details className="resource-contents group/contents rounded-2xl bg-muted px-5 lg:hidden">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-subhead font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring">
                In this guide
                <ChevronDownIcon
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-open/contents:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <div className="border-t pb-3">
                <GuideContents guide={guide} />
              </div>
            </details>
          </aside>
          <article aria-labelledby="guide-heading" className="min-w-0">
            {guide.sections.map(([title, body], index) => (
              <section
                key={title}
                id={guideSectionId(index)}
                aria-labelledby={`heading-${index + 1}`}
                data-reveal
                className="border-t py-8 first:pt-7 sm:py-10"
              >
                <h2
                  id={`heading-${index + 1}`}
                  className="text-title-2 font-semibold tracking-tight text-balance"
                >
                  {title}
                </h2>
                <p className="mt-4 text-body/8 text-pretty text-muted-foreground">
                  {body}
                </p>
              </section>
            ))}
            <p className="mt-2 border-t pt-6 text-footnote/6 text-pretty text-muted-foreground">
              Based on Wavemetrik’s MT-Wave datasheet and technical capabilities
              presentation. Current product specifications take precedence over
              earlier presentation figures.
            </p>
            <div className="mt-7 flex flex-col items-start justify-between gap-x-6 gap-y-3 border-b pb-7 sm:flex-row sm:items-center">
              <Link
                href={`/solutions#${guide.related}`}
                className="inline-flex min-h-11 items-center gap-2 text-subhead font-medium text-link underline-offset-4 hover:underline"
              >
                Explore the related test solution
                <ArrowUpRightIcon aria-hidden className="size-4 shrink-0" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex min-h-11 items-center gap-2 text-footnote font-medium text-muted-foreground underline-offset-4 hover:text-link hover:underline"
              >
                All resources
                <ArrowLeftIcon aria-hidden className="size-3.5" />
              </Link>
            </div>
          </article>
        </div>
      </div>

      <section
        className="page-section section-flush-top"
        aria-labelledby="related-guides-heading"
      >
        <header>
          <p className="eyebrow">Engineering guides</p>
          <h2 id="related-guides-heading" className="section-heading mt-4">
            Continue exploring.
          </h2>
        </header>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {related.map((item) => (
            <li key={item.slug} className="min-w-0">
              <GuideCard guide={item} />
            </li>
          ))}
        </ul>
      </section>
    </PageFrame>
  );
}

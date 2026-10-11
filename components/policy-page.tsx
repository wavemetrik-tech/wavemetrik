import Link from "next/link";
import { ArrowUpRightIcon, ChevronDownIcon } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

// One section of a policy. Each block is a paragraph, or a list when it is
// an array.
export type PolicySection = {
  title: string;
  blocks: (string | string[])[];
};

const sectionId = (index: number) => `section-${index + 1}`;

function Contents({ titles }: { titles: string[] }) {
  return (
    <nav aria-label="Sections">
      <ol className="mt-4 space-y-1">
        {titles.map((title, index) => (
          <li key={title}>
            <a
              href={`#${sectionId(index)}`}
              className="flex min-h-11 items-start gap-3 rounded-lg py-2 text-footnote/6 text-muted-foreground outline-none transition-colors hover:text-link focus-visible:ring-2 focus-visible:ring-ring"
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

// The privacy policy and the terms: a title, when it was last changed, and
// numbered sections with a list of them alongside, laid out like a guide.
// The last section, how to reach the company about the document, is the
// same for both and is added here.
export function PolicyPage({
  title,
  path,
  updated,
  summary,
  sections,
  related,
}: {
  title: string;
  path: string;
  // Written out, because the clock cannot be read while a page is
  // prerendered. Change it whenever the text changes.
  updated: string;
  summary: string;
  sections: PolicySection[];
  // The other document, linked from the foot of this one.
  related: { label: string; href: string };
}) {
  const titles = [...sections.map((section) => section.title), "Contact us"];
  const HEADING = "text-title-2 font-semibold tracking-tight text-balance";
  const SECTION = "scroll-mt-28 border-t py-8 first:pt-7 sm:py-10";
  const TEXT = "mt-4 text-body/8 text-pretty text-muted-foreground";

  return (
    <PageFrame>
      <JsonLd data={breadcrumbSchema([[title, path]])} />
      <section aria-labelledby="policy-heading" className="page-hero">
        <p className="eyebrow">Legal</p>
        <h1 id="policy-heading" className="product-title mt-5">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-body/7 text-pretty text-muted-foreground">
          {summary}
        </p>
        <p className="mt-6 text-caption-1 text-muted-foreground">
          Last updated {updated}
        </p>
      </section>

      <div className="page-section section-flush-top">
        <div className="grid items-start gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.7fr)]">
          <aside className="lg:sticky lg:top-28">
            <div className="hidden border-t pt-5 lg:block">
              <h2 className="text-subhead font-semibold">On this page</h2>
              <Contents titles={titles} />
            </div>
            <details className="resource-contents group/contents rounded-2xl bg-muted px-5 lg:hidden">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-subhead font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring">
                On this page
                <ChevronDownIcon
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-open/contents:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <div className="border-t pb-3">
                <Contents titles={titles} />
              </div>
            </details>
          </aside>
          <article aria-labelledby="policy-heading" className="min-w-0">
            {sections.map((section, index) => (
              <section
                key={section.title}
                id={sectionId(index)}
                aria-labelledby={`heading-${index + 1}`}
                className={SECTION}
              >
                <h2 id={`heading-${index + 1}`} className={HEADING}>
                  {section.title}
                </h2>
                {section.blocks.map((block) =>
                  typeof block === "string" ? (
                    <p key={block} className={TEXT}>
                      {block}
                    </p>
                  ) : (
                    <ul
                      key={block[0]}
                      className={`${TEXT} list-disc space-y-2 pl-5 marker:text-tertiary-foreground`}
                    >
                      {block.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
            <section
              id={sectionId(sections.length)}
              aria-labelledby="heading-contact"
              className={`${SECTION} border-b`}
            >
              <h2 id="heading-contact" className={HEADING}>
                Contact us
              </h2>
              <p className={TEXT}>
                For questions or requests about this document, write to{" "}
                <a
                  href={`mailto:${SITE.supportEmail}`}
                  className="font-medium text-link underline underline-offset-4"
                >
                  {SITE.supportEmail}
                </a>{" "}
                or to the address below.
              </p>
              <address className={`${TEXT} not-italic`}>
                {SITE.legalName}
                <br />
                {SITE.address.street}
                <br />
                {SITE.address.city} {SITE.address.postalCode}, India
              </address>
            </section>
            <Link
              href={related.href}
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-subhead font-medium text-link underline-offset-4 hover:underline"
            >
              {related.label}
              <ArrowUpRightIcon aria-hidden className="size-4 shrink-0" />
            </Link>
          </article>
        </div>
      </div>
    </PageFrame>
  );
}

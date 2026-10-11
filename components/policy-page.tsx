import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { PageFrame } from "@/components/page-frame";
import { pillLink } from "@/lib/pill-link";
import { SITE } from "@/lib/site";

// The frame for the privacy and terms pages. Their text has not been
// supplied yet, so each shows its title and where to send questions.
export function PolicyPage({ title }: { title: string }) {
  return (
    <PageFrame>
      <section aria-labelledby="policy-heading" className="page-hero">
        <p className="eyebrow">Legal</p>
        <h1 id="policy-heading" className="product-title mt-5">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-body/7 text-pretty text-muted-foreground">
          For questions about this document, write to{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-link underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>
          .
        </p>
        <Link href="/contact-us" className={`${pillLink.outline} mt-8`}>
          Contact Wavemetrik <ArrowUpRightIcon aria-hidden className="size-4" />
        </Link>
      </section>
    </PageFrame>
  );
}

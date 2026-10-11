import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { pillLink } from "@/lib/pill-link";

export default function ResourceNotFound() {
  return (
    <PageFrame>
      <section
        className="page-hero"
        aria-labelledby="resource-not-found-heading"
      >
        <p className="eyebrow">Resources</p>
        <h1 id="resource-not-found-heading" className="product-title mt-5">
          Guide not found.
        </h1>
        <p className="mt-5 max-w-xl text-body/7 text-muted-foreground">
          This guide may have moved. Browse the resource library to find the
          engineering guides and product documentation.
        </p>
        <Link href="/resources" className={`${pillLink.primary} mt-7`}>
          Back to resources
        </Link>
      </section>
    </PageFrame>
  );
}

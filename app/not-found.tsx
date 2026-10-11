import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { pillLink } from "@/lib/pill-link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageFrame>
      <section className="page-hero" aria-labelledby="not-found-heading">
        <p className="eyebrow">Error 404</p>
        <h1 id="not-found-heading" className="product-title mt-5">
          This page is off the air.
        </h1>
        <p className="mt-5 max-w-xl text-body/7 text-muted-foreground">
          The address may have changed. Start from the home page, or go
          straight to the products.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={pillLink.primary}>
            Back to home
          </Link>
          <Link href="/products/wifi-test-systems" className={pillLink.outline}>
            See test systems
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PageFrame } from "@/components/page-frame";
import { pillLink } from "@/lib/pill-link";

// Shown in place of a page that failed to render. The header and footer
// stay, so the rest of the site is still one click away.
export default function PageError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageFrame>
      <section className="page-hero" aria-labelledby="error-heading">
        <p className="eyebrow">Something went wrong</p>
        <h1 id="error-heading" className="product-title mt-5">
          This page lost its signal.
        </h1>
        <p
          role="alert"
          className="mt-5 max-w-xl text-body/7 text-muted-foreground"
        >
          The page could not be shown. Try again, or go back to the home page.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className={`cursor-pointer ${pillLink.primary}`}
          >
            Try again
          </button>
          <Link href="/" className={pillLink.outline}>
            Back to home
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}

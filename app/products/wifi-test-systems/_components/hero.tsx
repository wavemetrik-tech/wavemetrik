import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";

import { HeadlineSpecs } from "@/components/headline-specs";
import { pillLink } from "@/lib/pill-link";

import { headlineSpecs } from "../_data/platform";
import { SystemScene } from "./system-scene";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="page-hero">
      {/* The scene is a wide drawing, so on wide screens it gets the larger
          share. */}
      <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:gap-x-16">
        <div>
          <p className="eyebrow mb-5">Complete wireless test environments</p>
          {/* The name and what it is read as one title; the description is
              quieter and the actions follow it. */}
          <h1 id="hero-heading" className="product-title">
            MT-SYS
          </h1>
          <p className="product-subtitle mt-4">
            <span className="whitespace-nowrap">Wi-Fi</span> test systems
          </p>
          <p className="mt-5 max-w-[32rem] text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-6">
            Performance, MLO and coexistence testing under controlled RF
            conditions, from a single compact rack to a five-enclosure mesh and
            roaming setup.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Link href="/contact-us" className={pillLink.primary}>
              Contact sales
            </Link>
            <a href="#system-configurations" className={pillLink.outline}>
              See configurations
              <ArrowDownIcon aria-hidden className="size-[1.125rem]" />
            </a>
          </div>
        </div>

        <SystemScene />
      </div>

      <HeadlineSpecs specs={headlineSpecs} className="mt-12 sm:mt-16" />
    </section>
  );
}

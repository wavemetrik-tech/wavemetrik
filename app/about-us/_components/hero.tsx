import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";

import { pillLink } from "@/lib/pill-link";

import { FrequencyDial } from "./frequency-dial";

// One tile, as on the Solutions page: what the company does on the left, and
// its line, "Precision at every frequency", as a dial on the right.
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="page-hero pt-8 sm:pt-12 lg:pt-16"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-muted px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="grid items-center gap-x-10 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
          <div className="hero-copy relative z-10">
            <p className="eyebrow">About Wavemetrik</p>
            <h1
              id="hero-heading"
              className="product-title mt-5 max-w-[10ch] text-balance"
            >
              Advancing wireless innovation
            </h1>
            <p className="mt-6 max-w-md text-body/7 text-pretty text-muted-foreground">
              We fuel innovation and growth by delivering cutting-edge wireless
              test and measurement solutions that empower businesses to achieve
              optimal performance in an increasingly connected world.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact-us" className={pillLink.primary}>
                Get in touch
              </Link>
              <a href="#expertise" className={pillLink.outline}>
                Our expertise
                <ArrowDownIcon aria-hidden className="size-[1.125rem]" />
              </a>
            </div>
          </div>
          <FrequencyDial />
        </div>
      </div>
    </section>
  );
}

import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";

import { DatasheetRequest } from "@/components/datasheet-request";
import { HeadlineSpecs } from "@/components/headline-specs";
import { pillLink } from "@/lib/pill-link";

import { RadioPaths } from "./radio-paths";

// From slide 8 of the capabilities deck.
export const HEADLINE_SPECS = [
  { label: "Real radios, MT-C24", value: "Up to 24" },
  { label: "Stations per band, MT-BE", value: "Up to 128" },
  { label: "MIMO, MT-BE", value: "Up to 4×4" },
  { label: "Channel width", value: "Up to 320 MHz" },
];

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="page-hero">
      {/* The scene is a wide drawing, so on wide screens it gets the larger
          share. */}
      <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:gap-x-16">
        <div>
          <p className="eyebrow mb-5">Real-radio client emulation</p>
          {/* The name and what it is read as one title; the description is
              quieter and the actions follow it. */}
          <h1 id="hero-heading" className="product-title">
            MT-C24
          </h1>
          <p className="product-subtitle mt-4">
            <span className="whitespace-nowrap">Wi-Fi 7</span> client emulators
          </p>
          <p className="mt-5 max-w-[32rem] text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-6">
            Real-radio clients with individual RF paths, for client scaling, MLO
            and interoperability testing. MT-C24 and MT-C4 use real radios at up
            to 2×2 MIMO; <span className="whitespace-nowrap">MT-BE</span>{" "}
            emulates up to 4×4 MIMO.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Link href="/contact-us" className={pillLink.primary}>
              Contact sales
            </Link>
            <DatasheetRequest
              label="Request datasheet"
              product="MT-C24"
              className={pillLink.outline}
            />
          </div>
          {/* The way down the page is a quieter link under the two actions. */}
          <a href="#emulator-configurations" className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-sm text-subhead font-medium text-link underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring">
            Compare emulators
            <ArrowDownIcon aria-hidden className="size-4" />
          </a>
        </div>

        <RadioPaths />
      </div>

      <HeadlineSpecs specs={HEADLINE_SPECS} className="mt-12 sm:mt-16" />
    </section>
  );
}

import Link from "next/link";
import { PlayIcon } from "lucide-react";

import { DatasheetRequest } from "@/components/datasheet-request";
import { HeadlineSpecs } from "@/components/headline-specs";
import { pillLink } from "@/lib/pill-link";

import { headlineSpecs } from "../_data/overview";
import { InterferenceScene } from "./interference-scene";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="page-hero">
      <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-2 xl:gap-x-16">
        <div>
          <p className="eyebrow mb-5">Controlled RF interference</p>
          {/* The name and what it is read as one title; the description is
              quieter and the actions follow it. */}
          <h1 id="hero-heading" className="product-title">
            MT-Wave
          </h1>
          <p className="product-subtitle mt-4">
            <span className="whitespace-nowrap">Wi-Fi</span> and{" "}
            <span className="whitespace-nowrap">non-Wi-Fi</span> interference
            generator
          </p>
          <p className="mt-5 max-w-[32rem] text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-6">
            MT-Wave is a compact RF interference generator for stress-testing
            wireless devices. It contains two independent radios: one generates
            real Wi-Fi traffic on the 2.4, 5 and 6 GHz bands, the other plays
            Bluetooth, Zigbee, DFS radar and AWGN signals.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Link href="/contact-us" className={pillLink.primary}>
              Contact sales
            </Link>
            <DatasheetRequest
              label="Request datasheet"
              product="MT-Wave"
              className={pillLink.outline}
            />
            {/* The browser's own player opens the recording. */}
            <a href="/videos/MT-Wave-demo.mp4" className={pillLink.outline}>
              <PlayIcon aria-hidden className="size-4" />
              Watch the demo
            </a>
          </div>
        </div>

        <InterferenceScene />
      </div>

      <HeadlineSpecs specs={headlineSpecs} className="mt-12 sm:mt-16" />
    </section>
  );
}

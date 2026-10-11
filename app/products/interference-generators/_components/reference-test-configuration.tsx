"use client";

import { useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  animateEach,
  EASE_IN_OUT,
  fadeIn,
  useRevealOnce,
} from "@/lib/use-reveal-once";

import { type SetupPartId, setupParts } from "../_data/reference-configuration";
import { SetupIllustration } from "./setup-illustration";

// The cables are drawn one after another, then the signals on them appear.
function drawSetup(root: HTMLElement) {
  const cables = animateEach(
    root,
    ".setup-cable",
    [
      { strokeDasharray: 1, strokeDashoffset: 1 },
      { strokeDasharray: 1, strokeDashoffset: 0 },
    ],
    { duration: 1100, stagger: 120, easing: EASE_IN_OUT },
  );
  const drawn = 1100 + 120 * Math.max(0, cables.length - 1);
  return [
    ...cables,
    ...fadeIn(root, ".setup-signal", { duration: 500, delay: drawn - 200 }),
  ];
}

export function ReferenceTestConfiguration() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<SetupPartId>("wave");
  const [hovered, setHovered] = useState<SetupPartId | null>(null);

  useRevealOnce(sectionRef, 0.65, drawSetup);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="reference-test-configuration-heading"
      className="page-section"
    >
      <header className="max-w-2xl">
        <h2
          id="reference-test-configuration-heading"
          className="section-heading"
        >
          Reference test configuration
        </h2>
        <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
          A typical Wavemetrik setup (MT-SYS1) pairs MT-Wave with the MT-C24
          client emulator and a shielded enclosure. MT-Wave injects controlled
          interference while MT-C24 generates the reference traffic, giving
          repeatable rate-versus-range (RVR, RVRO) and coexistence runs.
        </p>
      </header>

      <div className="mt-10 grid items-start gap-x-16 gap-y-10 sm:mt-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <figure className="min-w-0">
          <SetupIllustration
            highlighted={hovered ?? selected}
            onHover={setHovered}
          />
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-footnote text-muted-foreground">
            <span className="flex items-center gap-2">
              <svg aria-hidden viewBox="0 0 28 4" className="h-1 w-7">
                <path
                  d="M2 2 H26"
                  className="fill-none stroke-chart-2"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray="7 5"
                />
              </svg>
              Interference
            </span>
            <span className="flex items-center gap-2">
              <svg aria-hidden viewBox="0 0 28 4" className="h-1 w-7">
                <path
                  d="M2 2 H26"
                  className="fill-none stroke-brand"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray="1 7"
                />
              </svg>
              Reference traffic
            </span>
          </figcaption>
        </figure>

        <div className="min-w-0">
          <p className="text-footnote text-muted-foreground">
            Select a part of the setup to see what it does.
          </p>
          <Accordion
            value={[selected]}
            onValueChange={(value) => {
              const next = value.at(-1);
              if (next) setSelected(next as SetupPartId);
            }}
            className="mt-4 border-t"
          >
            {setupParts.map((part) => (
              <AccordionItem
                key={part.id}
                value={part.id}
                className="border-b"
                onPointerEnter={() => setHovered(part.id)}
                onPointerLeave={() => setHovered(null)}
              >
                <AccordionTrigger
                  className="items-center gap-4 rounded-md py-4 hover:no-underline"
                  onFocus={() => setHovered(part.id)}
                  onBlur={() => setHovered(null)}
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-headline text-foreground">
                      {part.name}
                    </span>
                    <span className="text-subhead font-normal text-muted-foreground">
                      {part.role}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-subhead/[1.375rem]">
                  <p className="max-w-[52ch] text-foreground">
                    {part.description}
                  </p>
                  {part.specs.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1.5 text-muted-foreground">
                      {part.specs.map((spec) => (
                        <li key={spec} className="flex gap-2.5">
                          <span
                            aria-hidden
                            className="mt-[0.5625rem] size-1 shrink-0 rounded-full bg-muted-foreground/60"
                          />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import type { ApproachId } from "../_data/approaches";
import { AirLabArt, LAB_SIGNALS } from "./air-lab-art";

export function AirScene({
  approaches,
}: {
  approaches: { id: ApproachId; category: string; question: string }[];
}) {
  const [active, setActive] = useState<ApproachId | null>(null);
  const chosen = approaches.find((approach) => approach.id === active);

  return (
    <figure
      className="hero-art min-w-0"
      aria-label="A wireless test lab connecting six test approaches to your device"
    >
      <AirLabArt active={active} />
      <ul
        className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3"
        aria-label="Choose a test approach"
        onPointerLeave={() => setActive(null)}
      >
        {LAB_SIGNALS.map((signal, index) => (
          <li key={signal.id} className="min-w-0">
            <a
              href={`#${signal.id}`}
              aria-label={`${signal.name}: ${approaches.find((approach) => approach.id === signal.id)?.question ?? ""}`}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setActive(signal.id);
              }}
              onFocus={() => setActive(signal.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(null)}
              className={`group flex min-h-11 items-center gap-2 rounded-sm border-t py-2 text-caption-1 font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-link motion-reduce:transition-none ${active === signal.id ? "border-link text-link" : "border-border text-muted-foreground hover:text-link"}`}
            >
              <span aria-hidden className="font-mono text-[10px] text-link">
                0{index + 1}
              </span>
              <span>{signal.name}</span>
              <ArrowUpRightIcon
                aria-hidden
                className="ml-auto size-3 shrink-0"
              />
            </a>
          </li>
        ))}
      </ul>
      <figcaption
        aria-live="polite"
        className="mt-4 flex min-h-20 flex-col items-center justify-center text-center"
      >
        {chosen ? (
          <>
            <span className="eyebrow">{chosen.category}</span>
            <span className="mt-1 text-subhead font-medium text-balance">
              {chosen.question}
            </span>
          </>
        ) : (
          <span className="text-footnote text-muted-foreground">
            Every signal is a question. Choose one.
          </span>
        )}
      </figcaption>
    </figure>
  );
}

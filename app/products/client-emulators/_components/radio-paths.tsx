"use client";

import { useState } from "react";
import { DraftingGrid, Fastener } from "@/components/diagrams/detail";

import {
  AccessPoint,
  Enclosure,
  LINK_KINDS,
} from "@/components/diagrams/parts";

// The drawing sits between y = 30 and y = 365 of its coordinate space.
const VIEW_WIDTH = 800;
const VIEW_TOP = 30;
const VIEW_HEIGHT = 335;

const SHELL = "fill-muted stroke-foreground/75";
const PANEL = "fill-background stroke-foreground/75";
const SOLID = "fill-foreground/55";
const FADE = "transition-opacity duration-200 motion-reduce:transition-none";

// 24 client radios in the emulator, six across and four down.
const RADIOS = Array.from({ length: 24 }, (_, index) => ({
  x: 52.5 + (index % 6) * 49,
  y: 87 + Math.floor(index / 6) * 64,
}));

// One RF path per radio: out of the emulator's side, through the attenuator
// bank, and into the enclosure.
const PATHS = Array.from({ length: 24 }, (_, index) => {
  const from = 95 + index * 10;
  const to = 180 + index * 2.6;
  return `M360 ${from} C470 ${from} 470 ${to.toFixed(1)} 580 ${to.toFixed(1)}`;
});

const LABEL =
  "pointer-events-none absolute -translate-x-1/2 -translate-y-full text-caption-1 font-medium whitespace-nowrap text-muted-foreground";
const percentX = (x: number) => `${(x / VIEW_WIDTH) * 100}%`;
const percentY = (y: number) => `${((y - VIEW_TOP) / VIEW_HEIGHT) * 100}%`;

// The client emulator at a glance: 24 real radios, each on its own RF path
// through an attenuator to the access point under test. Pointing at a radio
// picks out its path.
export function RadioPaths() {
  const [picked, setPicked] = useState<number | null>(null);
  const selected = picked;

  return (
    <figure className="min-w-0 surface-panel rounded-3xl bg-muted p-5 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3 text-footnote">
        <span className="font-medium">One radio. One independent path.</span>
        <span className="shrink-0 text-link tabular-nums">24 radios</span>
      </div>
      <div
        className="relative"
        style={{ aspectRatio: `${VIEW_WIDTH} / ${VIEW_HEIGHT}` }}
      >
        <svg
          aria-hidden
          viewBox={`0 ${VIEW_TOP} ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="absolute inset-0 size-full"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          onPointerLeave={() => setPicked(null)}
        >
          <DraftingGrid
            width={VIEW_WIDTH}
            height={VIEW_TOP + VIEW_HEIGHT}
            step={32}
          />
          {PATHS.map((d, index) => (
            <g
              key={d}
              className={`${FADE} ${
                selected !== null && selected !== index ? "opacity-15" : ""
              }`}
            >
              <path d={d} strokeWidth={1} className="stroke-brand/35" />
              <path
                d={d}
                strokeWidth={2.5}
                strokeDasharray={LINK_KINDS.clients.dash}
                className="stroke-brand motion-safe:animate-signal"
              />
            </g>
          ))}

          {/* Emulator with its 24 radios */}
          <rect
            x={30}
            y={70}
            width={330}
            height={280}
            rx={18}
            className={SHELL}
          />
          <rect
            x={40}
            y={80}
            width={310}
            height={260}
            rx={9}
            className={PANEL}
          />
          {RADIOS.map((radio, index) => {
            const cx = radio.x + 20;
            const cy = radio.y + 38;
            return (
              <g
                key={index}
                onPointerEnter={(event) => {
                  // A touch would only flash the highlight as the finger lifts.
                  if (event.pointerType !== "touch") setPicked(index);
                }}
              >
                <rect
                  x={radio.x}
                  y={radio.y}
                  width={40}
                  height={54}
                  rx={7}
                  strokeWidth={1.5}
                  className={`transition-colors duration-200 motion-reduce:transition-none ${
                    selected === index
                      ? "fill-brand/25 stroke-brand"
                      : "fill-brand/10 stroke-brand/50"
                  }`}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={2.6}
                  className="fill-brand stroke-none motion-safe:animate-hop"
                  style={{ animationDelay: `${(index * 0.17) % 1.6}s` }}
                />
                <path
                  d={`M${radio.x + 5} ${radio.y + 8} h8 v4 h8 v-4 h9 M${radio.x + 5} ${radio.y + 47} h10 m10 0h10`}
                  strokeWidth={0.8}
                  className="stroke-brand/40"
                />
                <rect
                  x={radio.x + 16}
                  y={radio.y + 16}
                  width={8}
                  height={7}
                  rx={1}
                  className="fill-brand/10 stroke-brand/40"
                  strokeWidth={0.8}
                />
                <path
                  d={`M${cx - 5} ${cy - 5} A7 7 0 0 1 ${cx + 5} ${cy - 5} M${cx - 9.5} ${cy - 9.5} A13.4 13.4 0 0 1 ${cx + 9.5} ${cy - 9.5}`}
                  strokeWidth={1.75}
                  className="stroke-brand/70"
                />
              </g>
            );
          })}

          {/* Attenuator bank: one channel per path */}
          <rect
            x={447}
            y={104}
            width={46}
            height={212}
            rx={12}
            className={PANEL}
          />
          {Array.from({ length: 6 }, (_, index) => (
            <g key={index}>
              <rect
                x={456}
                y={126 + index * 32}
                width={6}
                height={14}
                rx={1.5}
                className={SOLID}
              />
              <rect
                x={467}
                y={131 + index * 32}
                width={6}
                height={9}
                rx={1.5}
                className={SOLID}
              />
              <rect
                x={478}
                y={136 + index * 32}
                width={6}
                height={4}
                rx={1.5}
                className={SOLID}
              />
            </g>
          ))}

          <Enclosure x={580} y={135}>
            <AccessPoint />
          </Enclosure>
          {[35, 355].flatMap((x) =>
            [76, 344].map((y) => (
              <Fastener key={`${x}-${y}`} x={x} y={y} r={1.8} />
            )),
          )}
          <Fastener x={470} y={112} r={1.8} />
          <Fastener x={470} y={308} r={1.8} />
        </svg>

        <span
          aria-hidden
          className={LABEL}
          style={{ left: percentX(195), top: percentY(62) }}
        >
          24 client radios
        </span>
        <span
          aria-hidden
          className={LABEL}
          style={{ left: percentX(470), top: percentY(96) }}
        >
          Attenuators
        </span>
        <span
          aria-hidden
          className={LABEL}
          style={{ left: percentX(680), top: percentY(127) }}
        >
          Access point
        </span>
      </div>

      <figcaption className="mt-6 text-footnote/5 text-pretty text-muted-foreground">
        Each radio has its own RF path, so every link can be attenuated and
        observed on its own.
      </figcaption>
    </figure>
  );
}

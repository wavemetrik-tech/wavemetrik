"use client";

import { useState } from "react";
import { DraftingGrid, Fastener } from "@/components/diagrams/detail";

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 335;
const CENTER = { x: 300, y: 300 };
// The scale runs 75° either side of straight up.
const SWEEP = 75;

// The three Wi-Fi bands on the scale, each about as wide as the band is.
const BANDS = [
  { name: "2.4 GHz", from: -62, to: -50 },
  { name: "5 GHz", from: -24, to: 2 },
  { name: "6 GHz", from: 22, to: 60 },
] as const;

type BandName = (typeof BANDS)[number]["name"];

const round = (value: number) => Math.round(value * 10) / 10;

// A point on the dial: `angle` in degrees from straight up, clockwise.
function point(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: round(CENTER.x + Math.sin(radians) * radius),
    y: round(CENTER.y - Math.cos(radians) * radius),
  };
}

function arc(from: number, to: number, radius: number) {
  const start = point(from, radius);
  const end = point(to, radius);
  return `M${start.x} ${start.y} A${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}

// A slice of the dial, for the pointer to land on.
function wedge(from: number, to: number) {
  const inner = arc(from, to, 70);
  const outerStart = point(to, 262);
  const outerEnd = point(from, 262);
  return `${inner} L${outerStart.x} ${outerStart.y} A262 262 0 0 0 ${outerEnd.x} ${outerEnd.y} Z`;
}

const TICKS = Array.from({ length: 61 }, (_, index) => {
  const angle = -SWEEP + index * 2.5;
  const outer = point(angle, 250);
  const inner = point(angle, index % 4 === 0 ? 230 : 239);
  return `M${inner.x} ${inner.y} L${outer.x} ${outer.y}`;
}).join(" ");

const middle = (band: (typeof BANDS)[number]) => (band.from + band.to) / 2;
const bezelRight = point(SWEEP, 188);
const bezelLeft = point(-SWEEP, 188);
const BEZEL = `${arc(-SWEEP, SWEEP, 266)} L${bezelRight.x} ${bezelRight.y} A188 188 0 0 0 ${bezelLeft.x} ${bezelLeft.y} Z`;

// The company's line, "Precision at every frequency", as a tuning dial: the
// same scale and needle as the site header, bent into an arc. The needle
// rests on 5 GHz and turns to whichever band is pointed at or chosen.
export function FrequencyDial() {
  const [hovered, setHovered] = useState<BandName | null>(null);
  const [chosen, setChosen] = useState<BandName>("5 GHz");
  const active = hovered ?? chosen;
  const band = BANDS.find((item) => item.name === active)!;

  return (
    <figure className="hero-art min-w-0">
      <div
        className="relative"
        style={{ aspectRatio: `${VIEW_WIDTH} / ${VIEW_HEIGHT}` }}
        onPointerLeave={() => setHovered(null)}
      >
        <svg
          aria-hidden
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
          strokeLinecap="round"
        >
          <DraftingGrid width={VIEW_WIDTH} height={VIEW_HEIGHT} step={35} />
          <path
            d={BEZEL}
            className="fill-foreground/[0.025] stroke-foreground/10"
            strokeWidth={0.8}
          />
          {[186, 202, 258].map((radius) => (
            <path
              key={radius}
              d={arc(-SWEEP, SWEEP, radius)}
              className="stroke-foreground/15"
              strokeWidth={0.8}
            />
          ))}
          {[-70, -40, -10, 20, 50, 70].map((angle) => {
            const at = point(angle, 192);
            return (
              <circle
                key={angle}
                cx={at.x}
                cy={at.y}
                r={1.5}
                className="fill-foreground/30"
              />
            );
          })}
          {[78, 124, 170].map((radius, index) => (
            <path
              key={radius}
              d={arc(-SWEEP, SWEEP, radius)}
              strokeWidth={1.25}
              className="fx-ripple stroke-brand/30"
              style={{ "--fx-delay": `${index * 0.5}s` } as React.CSSProperties}
            />
          ))}

          <path d={TICKS} strokeWidth={1.5} className="stroke-foreground/30" />
          <path
            d={arc(-SWEEP, SWEEP, 250)}
            strokeWidth={1.5}
            className="stroke-foreground/30"
          />

          {BANDS.map((item) => (
            <path
              key={item.name}
              d={arc(item.from, item.to, 214)}
              strokeWidth={7}
              className={`stroke-brand transition-opacity duration-300 motion-reduce:transition-none ${
                item.name === active ? "" : "opacity-30"
              }`}
            />
          ))}
          {BANDS.map((item) => (
            <path
              key={item.name}
              d={arc(item.from, item.to, 207)}
              strokeWidth={1}
              strokeDasharray="1 4"
              className="stroke-brand/50"
            />
          ))}
          <path
            d="M170 300H260 M340 300H430 M300 98V112"
            className="stroke-foreground/20"
            strokeWidth={1}
          />
          {[272, 328].map((x) => (
            <Fastener key={x} x={x} y={300} r={3} />
          ))}

          {/* The needle turns to the band, and trembles very slightly. */}
          <g
            className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{
              transform: `rotate(${middle(band)}deg)`,
              transformOrigin: `${CENTER.x}px ${CENTER.y}px`,
            }}
          >
            <g
              className="dial-needle"
              style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
            >
              <path
                d={`M${CENTER.x} ${CENTER.y} V${CENTER.y - 222}`}
                strokeWidth={3}
                className="stroke-foreground"
              />
              <circle
                cx={CENTER.x}
                cy={CENTER.y - 222}
                r={5}
                className="fill-brand"
              />
            </g>
          </g>
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={15}
            strokeWidth={2}
            className="fill-background stroke-foreground/60"
          />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={5}
            className="fx-pulse fill-brand"
          />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={21}
            className="stroke-foreground/20"
            strokeWidth={1}
            strokeDasharray="2 4"
          />

          {BANDS.map((item) => (
            <path
              key={item.name}
              d={wedge(item.from - 9, item.to + 9)}
              fill="transparent"
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setHovered(item.name);
              }}
            />
          ))}
        </svg>

        {BANDS.map((item) => {
          const at = point(middle(item), 292);
          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={item.name === active}
              onClick={() => setChosen(item.name)}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setHovered(item.name);
              }}
              onFocus={() => setChosen(item.name)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full px-2 py-2 text-footnote font-semibold whitespace-nowrap text-muted-foreground tabular-nums outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring aria-pressed:text-link"
              style={{
                left: `${(at.x / VIEW_WIDTH) * 100}%`,
                top: `${(at.y / VIEW_HEIGHT) * 100}%`,
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <figcaption className="mt-6 text-center">
        <span className="block text-title-2 font-semibold tracking-tight text-balance sm:text-title-1">
          Precision at every frequency.
        </span>
        <span className="mt-1.5 block text-subhead text-muted-foreground">
          Wireless test &amp; measurement
        </span>
      </figcaption>
    </figure>
  );
}

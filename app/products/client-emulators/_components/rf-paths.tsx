"use client";

import { useState } from "react";
import { AccessPoint, Attenuator } from "@/components/diagrams/parts";

// From slide 10 of the capabilities deck (content/wavemetrik-presentation.md).
const POINTS = [
  {
    title: "A path for each radio",
    description:
      "Dedicated RF chains allow independent attenuation and observation of each test link.",
  },
  {
    title: "Antenna selection",
    description:
      "Omnidirectional and directional antennas support different traffic and coverage scenarios.",
  },
  {
    title: "Path-loss characterization",
    description:
      "Cable loss, splitters and attenuators form part of the test reference plane.",
  },
];

const VIEW_WIDTH = 560;
const VIEW_HEIGHT = 345;

const SHELL = "fill-muted stroke-foreground/75";
const PANEL = "fill-background stroke-foreground/75";

// Three of the radios, each with its own path. The middle one ends in a
// directional antenna, the other two in omnidirectional ones.
const PATHS = [
  { y: 85, antenna: "omni" },
  { y: 165, antenna: "directional" },
  { y: 245, antenna: "omni" },
] as const;

const WALL = 290;
const ANTENNA = 340;

const LABEL =
  "pointer-events-none absolute text-caption-1 font-medium whitespace-nowrap text-muted-foreground";
const percentX = (x: number) => `${(x / VIEW_WIDTH) * 100}%`;
const percentY = (y: number) => `${(y / VIEW_HEIGHT) * 100}%`;

// A closer look at three radio paths: each has its own attenuator and its
// own antenna inside the enclosure, and the loss along the way is part of
// what is characterized.
function PathsDrawing() {
  const [focus, setFocus] = useState<"omni" | "directional" | null>(null);
  return (
    <figure
      onPointerLeave={() => setFocus(null)}
      className="min-w-0 surface-panel rounded-3xl bg-muted p-5 sm:p-8"
    >
      <div
        className="relative"
        style={{ aspectRatio: `${VIEW_WIDTH} / ${VIEW_HEIGHT}` }}
      >
        <svg
          aria-hidden
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="absolute inset-0 size-full"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Shielded enclosure with the access point */}
          <rect
            x={WALL}
            y={10}
            width={250}
            height={286}
            rx={16}
            className={SHELL}
          />
          <rect
            x={WALL + 10}
            y={20}
            width={230}
            height={266}
            rx={7}
            className={PANEL}
          />
          <g transform="translate(455 165) scale(0.8)">
            <AccessPoint />
          </g>

          {PATHS.map((path) => (
            <g
              key={path.y}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setFocus(path.antenna);
              }}
              className={`transition-opacity duration-200 motion-reduce:transition-none ${focus && focus !== path.antenna ? "opacity-20" : ""}`}
            >
              {/* What the antenna radiates */}
              {path.antenna === "omni" ? (
                [14, 22].map((radius, index) => (
                  <circle
                    key={radius}
                    cx={ANTENNA}
                    cy={path.y}
                    r={radius}
                    strokeWidth={1.5}
                    className="fx-ripple stroke-brand/60"
                    style={
                      {
                        "--fx-delay": `${index * 0.5 + (path.y > 200 ? 1 : 0)}s`,
                      } as React.CSSProperties
                    }
                  />
                ))
              ) : (
                <path
                  d={`M${ANTENNA + 8} ${path.y} L${ANTENNA + 64} ${path.y - 20} V${path.y + 20} Z`}
                  strokeWidth={1.5}
                  className="fill-brand/15 stroke-brand/45"
                />
              )}

              {/* The path, from the radio to its antenna */}
              <path
                d={`M64 ${path.y} H${ANTENNA}`}
                strokeWidth={1}
                className="stroke-brand/35"
              />
              <path
                d={`M64 ${path.y} H${ANTENNA}`}
                strokeWidth={2.5}
                strokeDasharray="1 11"
                className="stroke-brand motion-safe:animate-signal"
              />
              <circle
                cx={WALL}
                cy={path.y}
                r={4.5}
                strokeWidth={1.5}
                className="fill-background stroke-foreground/60"
              />
              <Attenuator x={176} y={path.y} />

              {path.antenna === "omni" ? (
                <rect
                  x={ANTENNA - 3}
                  y={path.y - 18}
                  width={6}
                  height={36}
                  rx={3}
                  className={PANEL}
                />
              ) : (
                <rect
                  x={ANTENNA - 4}
                  y={path.y - 16}
                  width={10}
                  height={32}
                  rx={2.5}
                  className={PANEL}
                />
              )}

              {/* Radio */}
              <rect
                x={24}
                y={path.y - 27}
                width={40}
                height={54}
                rx={7}
                strokeWidth={1.5}
                className="fill-brand/10 stroke-brand/50"
              />
              <circle
                cx={44}
                cy={path.y + 11}
                r={2.6}
                className="fx-pulse fill-brand stroke-none"
                style={
                  { "--fx-delay": `${path.y / 100}s` } as React.CSSProperties
                }
              />
              <path
                d={`M39 ${path.y + 6} A7 7 0 0 1 49 ${path.y + 6} M34.5 ${path.y + 1.5} A13.4 13.4 0 0 1 53.5 ${path.y + 1.5}`}
                strokeWidth={1.75}
                className="stroke-brand/70"
              />
            </g>
          ))}

          {/* Everything between a radio and the enclosure wall */}
          <path
            d={`M64 304 V312 H${WALL} V304`}
            className="stroke-foreground/40"
          />
        </svg>

        <span
          aria-hidden
          className={`${LABEL} -translate-y-full`}
          style={{ left: percentX(24), top: percentY(50) }}
        >
          Radios
        </span>
        <span
          aria-hidden
          className={`${LABEL} -translate-x-1/2 -translate-y-full`}
          style={{ left: percentX(176), top: percentY(50) }}
        >
          Attenuators
        </span>
        <span
          aria-hidden
          className={`${LABEL} -translate-y-full`}
          style={{ left: percentX(316), top: percentY(58) }}
        >
          Antennas
        </span>
        <span
          aria-hidden
          className={`${LABEL} -translate-x-1/2 -translate-y-full`}
          style={{ left: percentX(455), top: percentY(134) }}
        >
          Access point
        </span>
        <span
          aria-hidden
          className={`${LABEL} -translate-x-1/2`}
          style={{ left: percentX(177), top: percentY(318) }}
        >
          Path loss
        </span>
      </div>
    </figure>
  );
}

export function RfPaths() {
  return (
    <section
      id="rf-paths"
      aria-labelledby="rf-paths-heading"
      className="page-section"
    >
      <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-2">
        <div className="lg:order-2">
          <h2 id="rf-paths-heading" className="section-heading">
            Individual RF paths make tests controllable
          </h2>
          <ul className="mt-10 border-b">
            {POINTS.map((point) => (
              <li key={point.title} className="border-t py-5">
                <h3 className="text-title-3 font-semibold">{point.title}</h3>
                <p className="mt-1.5 max-w-[52ch] text-callout/[1.5rem] text-pretty text-muted-foreground">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <PathsDrawing />
      </div>
    </section>
  );
}

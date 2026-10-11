"use client";

import { useState } from "react";

import { WIFI_LEVEL_MAX, WIFI_LEVEL_MIN } from "../_data/overview";

const VIEW_WIDTH = 560;
const VIEW_HEIGHT = 262;
const BASELINE = 220;
const CHANNELS = [
  { name: "Channel 36", center: 120 },
  { name: "Channel 40", center: 280 },
  { name: "Channel 44", center: 440 },
];
const DUT_CENTER = 280;
const DUT_TOP = 138;
// Interferer crest at the highest and lowest output level.
const CREST_MAX = 50;
const CREST_MIN = 195;

const PLACEMENTS = [
  { id: "co", label: "Co-channel", offset: 0 },
  { id: "adjacent", label: "Adjacent channel", offset: 160 },
] as const;

// Flat-topped 20 MHz signal standing on the baseline.
const signalPath = (center: number, top: number) =>
  `M${center - 80} ${BASELINE} L${center - 70} ${top + 12} Q${center - 68} ${top} ${center - 56} ${top} H${center + 56} Q${center + 68} ${top} ${center + 70} ${top + 12} L${center + 80} ${BASELINE} Z`;

const xPercent = (x: number) => `${(x / VIEW_WIDTH) * 100}%`;
const yPercent = (y: number) => `${(y / VIEW_HEIGHT) * 100}%`;

// A schematic spectrum: the device under test on one channel, and the MT-Wave
// Wi-Fi signal placed on the same channel or the next one, at a chosen level.
export function WifiSpectrum() {
  const [placement, setPlacement] = useState<"co" | "adjacent">("co");
  const [level, setLevel] = useState(5);

  const offset = PLACEMENTS.find((item) => item.id === placement)!.offset;
  const crest =
    CREST_MIN -
    ((level - WIFI_LEVEL_MIN) / (WIFI_LEVEL_MAX - WIFI_LEVEL_MIN)) *
      (CREST_MIN - CREST_MAX);
  const scale = (BASELINE - crest) / (BASELINE - CREST_MAX);

  return (
    <figure
      className="surface-panel rounded-3xl bg-muted p-5 sm:p-8"
      onPointerLeave={() => {
        setPlacement("co");
        setLevel(5);
      }}
    >
      <div
        className="relative"
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          const { left, top, width, height } =
            event.currentTarget.getBoundingClientRect();
          setPlacement(
            (event.clientX - left) / width > 0.65 ? "adjacent" : "co",
          );
          const strength = Math.min(
            1,
            Math.max(0, 1 - (event.clientY - top) / height),
          );
          setLevel(
            Math.round(
              WIFI_LEVEL_MIN + strength * (WIFI_LEVEL_MAX - WIFI_LEVEL_MIN),
            ),
          );
        }}
        style={{ aspectRatio: `${VIEW_WIDTH} / ${VIEW_HEIGHT}` }}
      >
        <svg
          aria-hidden
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="absolute inset-0 size-full"
        >
          {[40, 200, 360, 520].map((x) => (
            <line
              key={x}
              x1={x}
              x2={x}
              y1={24}
              y2={BASELINE}
              className="stroke-border"
            />
          ))}
          <path
            d={signalPath(DUT_CENTER, DUT_TOP)}
            strokeWidth={1.5}
            className="fill-foreground/8 stroke-foreground/45"
          />
          <g
            className="transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(${offset}px)` }}
          >
            <path
              d={signalPath(DUT_CENTER, CREST_MAX)}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              className="fill-brand/20 stroke-brand transition-transform duration-200 ease-out motion-reduce:transition-none"
              style={{
                transform: `scaleY(${scale})`,
                transformBox: "fill-box",
                transformOrigin: "50% 100%",
              }}
            />
          </g>
          <line
            x1={24}
            x2={536}
            y1={BASELINE}
            y2={BASELINE}
            className="stroke-foreground/30"
          />
        </svg>

        {CHANNELS.map((channel) => (
          <span
            key={channel.name}
            className="absolute -translate-x-1/2 text-caption-1 whitespace-nowrap text-muted-foreground"
            style={{
              left: xPercent(channel.center),
              top: yPercent(BASELINE + 10),
            }}
          >
            {channel.name}
          </span>
        ))}
        <span
          className="absolute -translate-x-1/2 -translate-y-full text-caption-1 whitespace-nowrap text-muted-foreground"
          style={{ left: xPercent(DUT_CENTER), top: yPercent(BASELINE - 8) }}
        >
          Device under test
        </span>
        <span
          className="absolute -translate-x-1/2 -translate-y-full text-caption-1 font-semibold whitespace-nowrap transition-[left,top] duration-300 ease-out motion-reduce:transition-none"
          style={{
            left: xPercent(DUT_CENTER + offset),
            top: yPercent(crest - 8),
          }}
        >
          MT-Wave
        </span>
      </div>

      <figcaption className="mt-6 border-t pt-4 text-footnote text-muted-foreground">
        Illustration of signal placement and level, not to scale.
      </figcaption>
    </figure>
  );
}

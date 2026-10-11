"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { type SignalTypeId, signalTypes } from "../_data/overview";
import { SpecList } from "./spec-list";

const VIEW_WIDTH = 560;
const VIEW_HEIGHT = 190;
const BASELINE = 160;

const SHAPE = "fill-chart-2/20 stroke-chart-2";

// Bluetooth: narrow carriers hopping across the 79 channels.
const HOP_CHANNELS = [5, 53, 23, 73, 14, 42, 64, 31];

// AWGN: a noise block with an uneven crest.
const NOISE_CREST = [
  84, 72, 90, 78, 70, 88, 76, 92, 74, 82, 68, 86, 78, 94, 72, 84, 76, 90, 70,
  82, 88, 74, 86,
];
const noisePath = `M170 ${BASELINE} ${NOISE_CREST.map((y, i) => `L${170 + i * 10} ${y}`).join(" ")} L390 ${BASELINE} Z`;

// Schematic signatures, one per signal type.
const GRAPHICS: Record<SignalTypeId, React.ReactNode> = {
  bluetooth: HOP_CHANNELS.map((channel, index) => (
    <rect
      key={channel}
      x={40 + (channel / 78) * 480 - 3}
      y={60}
      width={6}
      height={BASELINE - 60}
      rx={3}
      className="fill-chart-2 motion-safe:animate-hop"
      style={{ animationDelay: `${index * 0.2}s` }}
    />
  )),
  zigbee: (
    <>
      {Array.from({ length: 16 }, (_, index) => (
        <line
          key={index}
          x1={40 + index * 32}
          x2={40 + index * 32}
          y1={BASELINE - 8}
          y2={BASELINE}
          className="stroke-foreground/30"
        />
      ))}
      <path
        d={`M214 ${BASELINE} C224 ${BASELINE} 222 64 232 64 C242 64 240 ${BASELINE} 250 ${BASELINE} Z`}
        strokeWidth={2}
        className={SHAPE}
      />
    </>
  ),
  radar: [70, 330].flatMap((start) =>
    Array.from({ length: 6 }, (_, index) => (
      <rect
        key={`${start}-${index}`}
        x={start + index * 22}
        y={56}
        width={5}
        height={BASELINE - 56}
        rx={2.5}
        className="fill-chart-2 motion-safe:animate-hop"
        style={{
          animationDelay: `${(start === 70 ? 0 : 1.4) + index * 0.08}s`,
        }}
      />
    )),
  ),
  awgn: (
    <path
      d={noisePath}
      strokeWidth={2}
      strokeLinejoin="round"
      className={SHAPE}
    />
  ),
};

export function SignalExplorer() {
  return (
    <Tabs
      defaultValue={signalTypes[0].id}
      className="surface-panel rounded-3xl bg-muted p-5 sm:p-8 gap-0"
    >
      <TabsList
        aria-label="Signal type"
        className="grid w-full grid-cols-4 group-data-horizontal/tabs:h-auto"
      >
        {signalTypes.map((signal) => (
          <TabsTrigger
            key={signal.id}
            value={signal.id}
            className="min-h-11 text-[0.8125rem] leading-[1.125rem] text-muted-foreground"
          >
            {signal.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {signalTypes.map((signal) => (
        <TabsContent key={signal.id} value={signal.id} className="mt-8">
          <svg
            aria-hidden
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="w-full"
          >
            {GRAPHICS[signal.id]}
            <line
              x1={24}
              x2={536}
              y1={BASELINE}
              y2={BASELINE}
              className="stroke-foreground/30"
            />
          </svg>
          <div className="-mt-3 flex justify-between px-[7%] text-caption-1 text-muted-foreground">
            <span>{signal.axis[0]}</span>
            <span>{signal.axis[1]}</span>
          </div>
          <SpecList specs={signal.specs} className="mt-6 border-b" />
        </TabsContent>
      ))}
    </Tabs>
  );
}

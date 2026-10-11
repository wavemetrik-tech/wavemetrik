"use client";

import { useState } from "react";

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 300;
const BASELINE = 250;
const BAND_TOP = 16;

// `channels` is how many Wi-Fi channels MT-Wave can select in the band.
const BANDS = [
  { name: "2.4 GHz", from: 30, to: 310, channels: 11 },
  { name: "5 GHz", from: 360, to: 660, channels: 25 },
  { name: "6 GHz", from: 710, to: 970, channels: 59 },
];
const GRID_LEVELS = [62, 109, 156, 203];

// Channels the Wi-Fi radio is drawn on. Every one shows as an outline; the
// scene's channel is filled in.
const WIFI_CHANNELS = [100, 440, 775, 905];

// What the two radios transmit together in each scene.
const SCENES = [
  {
    id: "bluetooth",
    signal: "Bluetooth",
    wifiBand: "2.4 GHz",
    wifiCenter: 100,
  },
  { id: "zigbee", signal: "Zigbee", wifiBand: "2.4 GHz", wifiCenter: 100 },
  { id: "radar", signal: "Radar", wifiBand: "5 GHz", wifiCenter: 440 },
  { id: "awgn", signal: "AWGN", wifiBand: "6 GHz", wifiCenter: 775 },
] as const;

type SceneId = (typeof SCENES)[number]["id"];

// Shapes of the second radio's four signals, placed where each can transmit.
const BLUETOOTH_CARRIERS = [36, 166, 238, 256, 274, 292];
const RADAR_PULSES = [516, 530, 544, 558, 572];
const ZIGBEE_PATH = `M174 ${BASELINE} C188 ${BASELINE} 186 88 200 88 C214 88 212 ${BASELINE} 226 ${BASELINE} Z`;
const NOISE_PATH = `M592 ${BASELINE} ${[150, 168, 146, 172, 152, 166, 148]
  .map((y, i) => `L${592 + i * 10} ${y}`)
  .join(" ")} L652 ${BASELINE} Z`;
const WIFI_PATH = `M-56 ${BASELINE} L-49 78 Q-48 64 -40 64 H40 Q48 64 49 78 L56 ${BASELINE} Z`;
// A low-level decorative trace gives the spectrum an instrument-like surface.
const FLOOR_PATH = Array.from(
  { length: 196 },
  (_, i) =>
    `${i === 0 ? "M" : "L"}${10 + i * 5} ${239 - ((i * 13) % 7) - ((i * 3) % 4)}`,
).join(" ");

const OUTLINE = "fill-foreground/[0.03] stroke-foreground/15";
const OUTLINE_BAR = "fill-foreground/10";

// Fades a signal's color in while its scene is showing.
function ActiveLayer({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <g
      className={`transition-opacity duration-500 motion-reduce:transition-none ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </g>
  );
}

function Bars({
  positions,
  top,
  className,
  stagger,
}: {
  positions: number[];
  top: number;
  className: string;
  stagger?: number;
}) {
  return positions.map((x, index) => (
    <rect
      key={x}
      x={x - 2.5}
      y={top}
      width={5}
      height={BASELINE - top}
      rx={2.5}
      className={className}
      style={stagger ? { animationDelay: `${index * stagger}s` } : undefined}
    />
  ));
}

// One spectrum across the three bands. Everything MT-Wave can generate is
// outlined; the Wi-Fi channel and the second radio's signal that are on in
// the current scene are filled in.
export function InterferenceScene() {
  const [sceneId, setSceneId] = useState<SceneId>(SCENES[0].id);
  const scene = SCENES.find((item) => item.id === sceneId)!;

  return (
    <figure
      onPointerLeave={() => setSceneId(SCENES[0].id)}
      className="group/spectrum min-w-0 surface-panel rounded-3xl bg-muted p-5 sm:p-8"
    >
      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-1 text-footnote text-muted-foreground">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full bg-brand" />
          RF1: Wi-Fi on {scene.wifiBand}
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full bg-chart-2" />
          RF3: {scene.signal}
        </span>
      </figcaption>

      <div
        className="relative mt-5 h-52 sm:mt-6 sm:h-64"
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          const { left, width } = event.currentTarget.getBoundingClientRect();
          const index = Math.min(
            SCENES.length - 1,
            Math.max(
              0,
              Math.floor(((event.clientX - left) / width) * SCENES.length),
            ),
          );
          setSceneId(SCENES[index].id);
        }}
      >
        <svg
          aria-hidden
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          <defs>
            <linearGradient id="hero-band-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--background)" stopOpacity={0} />
              <stop offset="1" stopColor="var(--background)" />
            </linearGradient>
            <linearGradient id="hero-wifi-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--brand)" stopOpacity={0.4} />
              <stop offset="1" stopColor="var(--brand)" stopOpacity={0.06} />
            </linearGradient>
            <linearGradient id="hero-signal-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--chart-2)" stopOpacity={0.4} />
              <stop offset="1" stopColor="var(--chart-2)" stopOpacity={0.06} />
            </linearGradient>
          </defs>

          {BANDS.map((band) => (
            <g key={band.name}>
              <rect
                x={band.from}
                y={BAND_TOP}
                width={band.to - band.from}
                height={BASELINE - BAND_TOP}
                fill="url(#hero-band-fill)"
              />
              {GRID_LEVELS.map((y) => (
                <line
                  key={y}
                  x1={band.from}
                  x2={band.to}
                  y1={y}
                  y2={y}
                  vectorEffect="non-scaling-stroke"
                  className="stroke-foreground/[0.07]"
                />
              ))}
              {[1, 2, 3, 4, 5].map((i) => (
                <path
                  key={i}
                  d={`M${band.from + ((band.to - band.from) * i) / 6} ${BAND_TOP} V${BASELINE}`}
                  className="fill-none stroke-foreground/[0.05]"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {/* One tick per selectable channel. */}
              {Array.from({ length: band.channels }, (_, index) => {
                const x =
                  band.from +
                  ((index + 0.5) / band.channels) * (band.to - band.from);
                return (
                  <line
                    key={index}
                    x1={x}
                    x2={x}
                    y1={BASELINE - 10}
                    y2={BASELINE}
                    vectorEffect="non-scaling-stroke"
                    className="stroke-foreground/20"
                  />
                );
              })}
            </g>
          ))}
          <path
            d={FLOOR_PATH}
            className="fill-none stroke-foreground/25"
            strokeWidth={0.8}
            vectorEffect="non-scaling-stroke"
          />

          {/* Outlines of everything that can be generated */}
          <g strokeWidth={1.5}>
            {WIFI_CHANNELS.map((center) => (
              <path
                key={center}
                d={WIFI_PATH}
                transform={`translate(${center} 0)`}
                vectorEffect="non-scaling-stroke"
                className={OUTLINE}
              />
            ))}
            <Bars
              positions={BLUETOOTH_CARRIERS}
              top={96}
              className={OUTLINE_BAR}
            />
            <Bars positions={RADAR_PULSES} top={56} className={OUTLINE_BAR} />
            <path
              d={ZIGBEE_PATH}
              vectorEffect="non-scaling-stroke"
              className={OUTLINE}
            />
            <path
              d={NOISE_PATH}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className={OUTLINE}
            />
          </g>

          {/* The second radio's signal for this scene */}
          <ActiveLayer active={sceneId === "bluetooth"}>
            <Bars
              positions={BLUETOOTH_CARRIERS}
              top={96}
              className="fill-chart-2 motion-safe:animate-hop"
              stagger={0.25}
            />
          </ActiveLayer>
          <ActiveLayer active={sceneId === "zigbee"}>
            <path
              d={ZIGBEE_PATH}
              fill="url(#hero-signal-fill)"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              className="stroke-chart-2"
            />
          </ActiveLayer>
          <ActiveLayer active={sceneId === "radar"}>
            <Bars
              positions={RADAR_PULSES}
              top={56}
              className="fill-chart-2 motion-safe:animate-hop"
              stagger={0.12}
            />
          </ActiveLayer>
          <ActiveLayer active={sceneId === "awgn"}>
            <path
              d={NOISE_PATH}
              fill="url(#hero-signal-fill)"
              strokeWidth={2}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="stroke-chart-2"
            />
          </ActiveLayer>

          {/* The Wi-Fi channel for this scene */}
          <g
            className="transition-transform duration-700 ease-in-out motion-reduce:transition-none"
            style={{ transform: `translateX(${scene.wifiCenter}px)` }}
          >
            <path
              d={WIFI_PATH}
              fill="url(#hero-wifi-fill)"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              className="stroke-brand"
            />
            <path
              d="M-38 58V48H38V58 M0 48V38 M-42 84V232 M42 84V232"
              className="fill-none stroke-brand/35"
              strokeWidth={1}
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={0}
              cy={64}
              r={3.5}
              className="fill-background stroke-brand"
              strokeWidth={1.5}
            />
          </g>

          <line
            x1={0}
            x2={VIEW_WIDTH}
            y1={BASELINE}
            y2={BASELINE}
            vectorEffect="non-scaling-stroke"
            className="stroke-foreground/30"
          />
        </svg>

        {BANDS.map((band) => (
          <div
            key={band.name}
            className="absolute -translate-x-1/2 text-center whitespace-nowrap"
            style={{
              left: `${((band.from + band.to) / 2 / VIEW_WIDTH) * 100}%`,
              top: `${((BASELINE + 10) / VIEW_HEIGHT) * 100}%`,
            }}
          >
            <p className="text-subhead font-semibold">{band.name}</p>
            <p className="text-caption-1 text-muted-foreground">
              {band.channels} channels
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t pt-4 text-caption-1 text-muted-foreground">
        {SCENES.map((item) => (
          <span
            key={item.id}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setSceneId(item.id);
            }}
            className={`transition-colors duration-300 ${sceneId === item.id ? "text-foreground" : ""}`}
          >
            {item.signal}
          </span>
        ))}
      </div>
    </figure>
  );
}

"use client";

import { BracesIcon, GlobeIcon } from "lucide-react";
import { useState } from "react";
import { ScopeGrid } from "@/components/diagrams/detail";

import { useTilePointer } from "@/lib/use-tile-pointer";

import {
  formatWifiLevel,
  type KeyFeatureId,
  WIFI_LEVEL_MAX,
  WIFI_LEVEL_MIN,
} from "../_data/overview";

const AXIS = "stroke-foreground/25";
// Blue is the Wi-Fi radio, orange the second radio, as in the hero.
const SIGNAL = "fill-brand/20 stroke-brand";
const NON_WIFI = "fill-chart-2/20 stroke-chart-2";

const FADE = "transition-opacity duration-200 motion-reduce:transition-none";
const TINT = "transition-colors duration-200 motion-reduce:transition-none";
const RADIOS_WIDTH = 520;
const RADIOS_HEIGHT = 130;

// The signals on the shared spectrum, left to right. `x` and `top` place the
// signal's name; `until` is where its share of the drawing ends.
const RADIO_SIGNALS = [
  { id: "wifi", name: "Wi-Fi", radio: "RF1", x: 110, top: 24, until: 224 },
  {
    id: "bluetooth",
    name: "Bluetooth",
    radio: "RF3",
    x: 286,
    top: 40,
    until: 336,
  },
  { id: "zigbee", name: "Zigbee", radio: "RF3", x: 370, top: 46, until: 406 },
  {
    id: "awgn",
    name: "AWGN",
    radio: "RF3",
    x: 460,
    top: 60,
    until: RADIOS_WIDTH,
  },
] as const;

type RadioSignalId = (typeof RADIO_SIGNALS)[number]["id"];

// Both radios on one spectrum: a Wi-Fi channel beside Bluetooth carriers, a
// Zigbee channel and a noise block. The pointer picks one signal out.
function Radios() {
  const [ref, position] = useTilePointer<HTMLDivElement>();
  const active =
    position === null
      ? null
      : (RADIO_SIGNALS.find(
          (signal) => position * RADIOS_WIDTH <= signal.until,
        ) ?? null);

  const layer = (id: RadioSignalId) =>
    `${FADE} ${active && active.id !== id ? "opacity-25" : ""}`;
  const radioLabel = (radio: "RF1" | "RF3") =>
    `${TINT} ${active?.radio === radio ? "text-foreground" : ""}`;

  return (
    <div className="w-full">
      <div className="flex text-caption-1 font-medium text-muted-foreground">
        <span className={`w-[44%] ${radioLabel("RF1")}`}>RF1, Wi-Fi</span>
        <span className={radioLabel("RF3")}>RF3, non-Wi-Fi</span>
      </div>
      <div ref={ref} className="relative mt-3">
        <svg
          aria-hidden
          viewBox={`0 0 ${RADIOS_WIDTH} ${RADIOS_HEIGHT}`}
          className="block w-full"
        >
          <ScopeGrid
            x={8}
            y={16}
            width={504}
            height={102}
            columns={18}
            rows={4}
          />
          <path
            d="M20 118 L30 36 Q32 24 44 24 H176 Q188 24 190 36 L200 118 Z"
            strokeWidth={2}
            className={`${SIGNAL} ${layer("wifi")}`}
          />
          <g className={layer("bluetooth")}>
            {[248, 276, 318].map((x, index) => (
              <rect
                key={x}
                x={x}
                y={40}
                width={6}
                height={78}
                rx={3}
                className={`fill-chart-2 ${
                  active?.id === "bluetooth" ? "motion-safe:animate-hop" : ""
                }`}
                style={{ animationDelay: `${index * 0.25}s` }}
              />
            ))}
          </g>
          <path
            d="M348 118 C360 118 358 46 370 46 C382 46 380 118 392 118 Z"
            strokeWidth={2}
            className={`${NON_WIFI} ${layer("zigbee")}`}
          />
          <path
            d="M420 118 L420 74 L432 64 L444 78 L456 60 L468 76 L480 66 L492 80 L500 70 L500 118 Z"
            strokeWidth={2}
            strokeLinejoin="round"
            className={`${NON_WIFI} ${layer("awgn")}`}
          />
          <line x1={8} x2={512} y1={118} y2={118} className={AXIS} />
        </svg>
        {active && (
          <span
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full text-caption-1 font-semibold whitespace-nowrap"
            style={{
              left: `${(active.x / RADIOS_WIDTH) * 100}%`,
              top: `${((active.top - 8) / RADIOS_HEIGHT) * 100}%`,
            }}
          >
            {active.name}
          </span>
        )}
      </div>
    </div>
  );
}

// From the datasheet's Wi-Fi channel coverage table.
const WIFI_BANDS = [
  { name: "2.4", detail: "802.11b / g / n / ax, 11 channels" },
  { name: "5", detail: "802.11a / n / ac / ax, 25 channels" },
  { name: "6", detail: "802.11ax, 59 channels" },
];

// The pointer picks a band and shows what the unit transmits on it.
function WifiBands() {
  const [ref, position] = useTilePointer<HTMLParagraphElement>();
  const active =
    position === null
      ? null
      : Math.min(
          WIFI_BANDS.length - 1,
          Math.floor(position * WIFI_BANDS.length),
        );

  return (
    <div className="relative">
      <p className="mb-3 min-h-10 text-caption-1/5 text-muted-foreground">
        {active !== null
          ? WIFI_BANDS[active].detail
          : "2.4, 5 and 6 GHz channel coverage"}
      </p>
      <p
        ref={ref}
        className="text-[2.375rem]/none font-semibold tracking-tight"
      >
        {WIFI_BANDS.map((band, index) => (
          <span key={band.name}>
            {index > 0 && (
              <span className="font-normal text-foreground/25"> / </span>
            )}
            <span
              className={`${TINT} ${
                active === null
                  ? ""
                  : active === index
                    ? "text-link"
                    : "text-foreground/35"
              }`}
            >
              {band.name}
            </span>
          </span>
        ))}{" "}
        <span className="text-title-3 text-muted-foreground">GHz</span>
      </p>
    </div>
  );
}

const LEVEL_STEPS = WIFI_LEVEL_MAX - WIFI_LEVEL_MIN;
// +5 dBm, where the marker rests.
const LEVEL_REST = 35;

// One tick per decibel from −30 to +15 dBm. The marker follows the pointer
// and the level it stands on is read out below.
function Level() {
  const [ref, position] = useTilePointer<HTMLDivElement>();
  const marker =
    position === null ? LEVEL_REST : Math.round(position * LEVEL_STEPS);

  return (
    <div className="w-full">
      <div ref={ref} className="flex h-12 items-end justify-between">
        {Array.from({ length: LEVEL_STEPS + 1 }, (_, index) => (
          <span
            key={index}
            className="flex h-full w-[3px] items-end justify-center"
          >
            <span
              className={`rounded-full ${
                index === marker
                  ? "h-12 w-[3px] bg-brand"
                  : index % 5 === 0
                    ? "h-7 w-px bg-foreground/60"
                    : "h-4 w-px bg-foreground/30"
              }`}
            />
          </span>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-caption-1 text-muted-foreground tabular-nums">
        <span>{formatWifiLevel(WIFI_LEVEL_MIN)} dBm</span>
        <span className="font-semibold text-foreground">
          {formatWifiLevel(WIFI_LEVEL_MIN + marker)} dBm
        </span>
        <span>{formatWifiLevel(WIFI_LEVEL_MAX)} dBm</span>
      </div>
    </div>
  );
}

const FRAME_WIDTH = 12;
// Pixels per second. Both rows move at this speed, so only the spacing
// between frames differs.
const FRAME_SPEED = 28;
// `pitch` is the distance from one frame to the next.
const FRAME_ROWS = [
  { label: "16 µs", frames: 32, pitch: 14 },
  { label: "3000 µs", frames: 7, pitch: 80 },
];

// Frames back-to-back, then the same frames spaced far apart. They run past
// while the pointer is on the tile and stop where they are when it leaves.
function Load() {
  return (
    <div className="flex w-full flex-col gap-3">
      {FRAME_ROWS.map((row) => (
        <div key={row.label} className="flex items-center gap-4">
          {/* The strip is taken out of the layout so its length cannot widen
              the tile. */}
          <div className="relative h-6 min-w-0 flex-1 overflow-hidden mask-r-from-85%">
            <div
              className="absolute inset-y-0 left-0 flex w-max group-hover/tile:[--frames-state:running] motion-safe:animate-frames"
              style={
                {
                  gap: row.pitch - FRAME_WIDTH,
                  "--frames-period": `${row.pitch}px`,
                  "--frames-duration": `${row.pitch / FRAME_SPEED}s`,
                } as React.CSSProperties
              }
            >
              {Array.from({ length: row.frames }, (_, index) => (
                <span
                  key={index}
                  className="h-full shrink-0 rounded-[3px] bg-brand"
                  style={{ width: FRAME_WIDTH }}
                />
              ))}
            </div>
          </div>
          <span className="w-14 shrink-0 text-right text-caption-1 text-muted-foreground tabular-nums">
            {row.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const BAND_VIEW_WIDTH = 240;
// The 2.4 GHz band across the drawing: 2402 MHz at x = 24, 2480 MHz at 216.
const bandX = (mhz: number) => 24 + ((mhz - 2402) * 192) / 78;
const BLUETOOTH_CHANNELS = [3, 14, 27, 55, 66, 76];
const ZIGBEE_FIRST = 11;
const ZIGBEE_LAST = 26;
const ZIGBEE_REST = 19;
const zigbeeMhz = (channel: number) => 2405 + (channel - ZIGBEE_FIRST) * 5;

// Bluetooth carriers hopping across the band while the Zigbee channel
// follows the pointer, one of its 16 channels at a time.
function BluetoothZigbee() {
  const [ref, position] = useTilePointer<HTMLDivElement>();
  const channel =
    position === null
      ? ZIGBEE_REST
      : Math.min(
          ZIGBEE_LAST,
          Math.max(
            ZIGBEE_FIRST,
            ZIGBEE_FIRST +
              Math.round(
                (((position * BAND_VIEW_WIDTH - 24) * 78) / 192 - 3) / 5,
              ),
          ),
        );

  return (
    <div ref={ref} className="w-full max-w-60">
      <svg
        aria-hidden
        viewBox={`0 0 ${BAND_VIEW_WIDTH} 96`}
        className="block w-full"
      >
        <ScopeGrid x={4} y={12} width={232} height={76} columns={12} rows={4} />
        {BLUETOOTH_CHANNELS.map((bluetoothChannel, index) => (
          <rect
            key={bluetoothChannel}
            x={bandX(2402 + bluetoothChannel) - 2.5}
            y={20}
            width={5}
            height={68}
            rx={2.5}
            className={`fill-chart-2 ${
              position === null ? "" : "motion-safe:animate-hop"
            }`}
            style={{ animationDelay: `${index * 0.27}s` }}
          />
        ))}
        <g
          className="transition-transform duration-200 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${bandX(zigbeeMhz(channel))}px)` }}
        >
          <path
            d="M-20 88 C-8 88 -12 24 0 24 C12 24 8 88 20 88 Z"
            strokeWidth={2}
            className={NON_WIFI}
          />
        </g>
        <line x1={4} x2={236} y1={88} y2={88} className={AXIS} />
      </svg>
      <p className="mt-2 text-center text-caption-1 text-muted-foreground tabular-nums">
        {`Zigbee channel ${channel}, ${zigbeeMhz(channel)} MHz`}
      </p>
    </div>
  );
}

const RADAR_REGIONS = [
  "FCC",
  "ETSI",
  "Japan",
  "Korea",
  "Taiwan",
  "Canada",
  "Singapore",
  "Australia / New Zealand",
];

// Pointing at a region shows which pattern types the unit has for it.
function Radar() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative">
      <p className="mb-3 min-h-10 text-caption-1/5 text-muted-foreground">
        {active === null
          ? "Eight regional radar pattern sets"
          : active === "Japan"
            ? "Type 1 to 4 patterns, W53 and W56"
            : "Type 1 to 6 patterns"}
      </p>
      <ul
        className="flex flex-wrap gap-1.5"
        onPointerLeave={() => setActive(null)}
      >
        {RADAR_REGIONS.map((region) => (
          <li
            key={region}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setActive(region);
            }}
            className={`rounded-full px-3 py-2 text-caption-1 font-medium ${TINT} ${
              active === region
                ? "bg-foreground text-background"
                : "bg-background"
            }`}
          >
            {region}
          </li>
        ))}
      </ul>
    </div>
  );
}

const AWGN_MIN = 2;
const AWGN_MAX = 20;
// A noise block with an uneven crest.
const NOISE_CREST = [
  44, 34, 48, 38, 30, 46, 36, 50, 32, 42, 28, 44, 36, 48, 40,
];
const NOISE_PATH = `M50 88 ${NOISE_CREST.map((y, i) => `L${50 + i * 10} ${y}`).join(" ")} L190 88 Z`;

// The noise block is as wide as the bandwidth the pointer chooses, in 1 MHz
// steps from left to right.
function Awgn() {
  const [ref, position] = useTilePointer<HTMLDivElement>();
  const bandwidth =
    position === null
      ? AWGN_MAX
      : Math.round(AWGN_MIN + position * (AWGN_MAX - AWGN_MIN));

  return (
    <div ref={ref} className="w-full max-w-60">
      <svg aria-hidden viewBox="0 0 240 96" className="block w-full">
        <ScopeGrid x={4} y={12} width={232} height={76} columns={12} rows={4} />
        <path
          d={NOISE_PATH}
          strokeWidth={2}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={`${NON_WIFI} transition-transform duration-200 ease-out motion-reduce:transition-none`}
          style={{
            transform: `scaleX(${bandwidth / AWGN_MAX})`,
            transformBox: "fill-box",
            transformOrigin: "50% 100%",
          }}
        />
        <line x1={4} x2={236} y1={88} y2={88} className={AXIS} />
      </svg>
      <p className="mt-2 text-center text-caption-1 text-muted-foreground tabular-nums">
        {bandwidth} MHz bandwidth
      </p>
    </div>
  );
}

// The two addresses, drawn as address bars. The one under the pointer looks
// focused: a ring and a text cursor.
function Control() {
  return (
    <ul className="flex w-full flex-col gap-2 font-mono text-caption-1">
      {[
        { icon: GlobeIcon, url: "http://<unit address>:7000" },
        { icon: BracesIcon, url: "http://<unit address>:7000/api" },
      ].map((row) => (
        <li
          key={row.url}
          className="group/row flex items-center gap-2.5 rounded-xl bg-background px-3.5 py-2.5 ring-2 ring-transparent transition-shadow duration-200 hover:ring-brand/60 motion-reduce:transition-none"
        >
          <row.icon aria-hidden className="size-4 shrink-0 text-brand" />
          <span className="truncate">{row.url}</span>
          <span
            aria-hidden
            className="-ml-2 h-3.5 w-px shrink-0 bg-foreground opacity-0 group-hover/row:opacity-100 motion-safe:group-hover/row:animate-caret-blink"
          />
        </li>
      ))}
    </ul>
  );
}

const VISUALS: Record<KeyFeatureId, React.ComponentType> = {
  radios: Radios,
  wifi: WifiBands,
  level: Level,
  load: Load,
  bluetooth: BluetoothZigbee,
  radar: Radar,
  awgn: Awgn,
  control: Control,
};

// One small drawing per feature, each showing the thing the feature names
// and responding to the pointer. The tile it sits in must carry `data-tile`
// and the `group/tile` class.
export function FeatureVisual({ id }: { id: KeyFeatureId }) {
  const Visual = VISUALS[id];
  return <Visual />;
}

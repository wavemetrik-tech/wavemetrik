"use client";

import { useState } from "react";
import {
  CalibrationRing,
  DraftingGrid,
  Fastener,
  Vents,
} from "@/components/diagrams/detail";

import {
  AccessPoint,
  Attenuator,
  LINK_KINDS,
  type LinkKind,
  MeshNode,
  WaveUnit,
} from "@/components/diagrams/parts";

const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 440;
const CENTER = { x: 400, y: 220 };
const ENCLOSURE_HALF = 75;

// Attenuation steps on the client paths. Each ring holds eight client radios,
// drawn fainter as the attenuation grows.
const RINGS = [
  { radius: 130, attenuation: 20, strength: 1, angles: [-142, -112, -68, -38] },
  {
    radius: 170,
    attenuation: 40,
    strength: 0.65,
    angles: [-150, -120, -60, -30],
  },
  {
    radius: 210,
    attenuation: 60,
    strength: 0.4,
    angles: [-136, -106, -74, -44],
  },
];

const SHELL = "fill-muted stroke-foreground/75";
const PANEL = "fill-background stroke-foreground/75";

// 24 client radios: eight per ring, above and below the enclosure. Each link
// starts on the enclosure wall and ends at the radio.
const CLIENTS = RINGS.flatMap((ring) =>
  [...ring.angles, ...ring.angles.map((angle) => -angle)].map((angle) => {
    const radians = (angle * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const wall = ENCLOSURE_HALF / Math.max(Math.abs(cos), Math.abs(sin));
    const round = (value: number) => Math.round(value * 10) / 10;
    return {
      key: `${ring.radius}-${angle}`,
      strength: ring.strength,
      from: [round(CENTER.x + cos * wall), round(CENTER.y + sin * wall)],
      to: [
        round(CENTER.x + cos * ring.radius),
        round(CENTER.y + sin * ring.radius),
      ],
    };
  }),
);

const MESH_BOXES = [
  { x: 668, y: 86 },
  { x: 668, y: 264 },
];

// The three kinds of link in the scene, with what each one's key says.
const KEY: { kind: LinkKind; label: string; short: string }[] = [
  { kind: "interference", label: "Interference", short: "Interference" },
  {
    kind: "clients",
    label: "24 client radios by attenuation",
    short: "Clients",
  },
  { kind: "backhaul", label: "Mesh links", short: "Mesh" },
];

type Focus = LinkKind | "all";

const LABEL =
  "pointer-events-none absolute text-caption-1 font-medium whitespace-nowrap text-muted-foreground";
const FADE = "transition-opacity duration-300 motion-reduce:transition-none";
const percentX = (x: number) => `${(x / VIEW_WIDTH) * 100}%`;
const percentY = (y: number) => `${(y / VIEW_HEIGHT) * 100}%`;

// A Wi-Fi test system at a glance: the access point in its shielded
// enclosure, 24 client radios at three attenuation steps around it, MT-Wave
// feeding in interference, and mesh nodes linked through attenuators. One
// kind of link can be picked out; pointing at a choice previews it.
export function SystemScene() {
  const [previewed, setPreviewed] = useState<Focus | null>(null);
  const focus = previewed ?? "all";
  const layer = (kind: LinkKind) =>
    `${FADE} ${focus !== "all" && focus !== kind ? "opacity-20" : ""}`;

  return (
    <figure
      onPointerLeave={() => setPreviewed(null)}
      className="min-w-0 surface-panel rounded-3xl bg-muted p-5 sm:p-8"
    >
      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-footnote text-muted-foreground">
        {KEY.map((item) => (
          <span
            key={item.kind}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setPreviewed(item.kind);
            }}
            className="flex items-center gap-2"
          >
            <svg aria-hidden viewBox="0 0 28 4" className="h-1 w-7">
              <path
                d="M2 2 H26"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={LINK_KINDS[item.kind].keyDash}
                className={`fill-none ${LINK_KINDS[item.kind].stroke}`}
              />
            </svg>
            {item.label}
          </span>
        ))}
      </figcaption>

      <div
        className="relative mt-5 sm:mt-6"
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
          {/* Client traffic */}
          <DraftingGrid width={VIEW_WIDTH} height={VIEW_HEIGHT} />
          <g
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setPreviewed("clients");
            }}
            className={layer("clients")}
          >
            {RINGS.map((ring) => (
              <circle
                key={ring.radius}
                cx={CENTER.x}
                cy={CENTER.y}
                r={ring.radius}
                strokeWidth={1}
                className="stroke-foreground/15"
              />
            ))}
            <CalibrationRing
              x={CENTER.x}
              y={CENTER.y}
              radius={210}
              ticks={64}
            />
            {CLIENTS.map((client) => {
              const d = `M${client.to[0]} ${client.to[1]} L${client.from[0]} ${client.from[1]}`;
              return (
                <g key={client.key} opacity={client.strength}>
                  <path d={d} strokeWidth={1} className="stroke-brand/40" />
                  <path
                    d={d}
                    strokeWidth={3}
                    strokeDasharray={LINK_KINDS.clients.dash}
                    className="stroke-brand motion-safe:animate-signal"
                  />
                  <circle
                    cx={client.to[0]}
                    cy={client.to[1]}
                    r={7}
                    className="fill-background stroke-brand"
                  />
                  <circle
                    cx={client.to[0]}
                    cy={client.to[1]}
                    r={2.5}
                    className="fill-brand stroke-none"
                  />
                </g>
              );
            })}
          </g>

          {/* Interference from MT-Wave */}
          <g
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setPreviewed("interference");
            }}
            className={layer("interference")}
          >
            <path
              d="M150 220 H325"
              strokeWidth={5}
              className="stroke-foreground/15"
            />
            <path
              d="M150 220 H325"
              strokeWidth={3}
              strokeDasharray={LINK_KINDS.interference.dash}
              className="stroke-chart-2 motion-safe:animate-signal"
            />
            <WaveUnit x={40} y={192} />
          </g>

          {/* Mesh nodes, linked through attenuators */}
          <g
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setPreviewed("backhaul");
            }}
            className={layer("backhaul")}
          >
            {["M475 196 L668 140", "M475 244 L668 300", "M713 176 V264"].map(
              (d) => (
                <g key={d}>
                  <path
                    d={d}
                    strokeWidth={5}
                    className="stroke-foreground/15"
                  />
                  <path
                    d={d}
                    strokeWidth={3}
                    strokeDasharray={LINK_KINDS.backhaul.dash}
                    className="stroke-chart-3 motion-safe:animate-signal"
                  />
                </g>
              ),
            )}
            {MESH_BOXES.map((box) => (
              <g key={box.y}>
                <rect
                  x={box.x}
                  y={box.y}
                  width={90}
                  height={90}
                  rx={12}
                  className={SHELL}
                />
                <rect
                  x={box.x + 8}
                  y={box.y + 8}
                  width={74}
                  height={74}
                  rx={6}
                  className={PANEL}
                />
                <g
                  transform={`translate(${box.x + 45} ${box.y + 43}) scale(0.72)`}
                >
                  <MeshNode />
                </g>
              </g>
            ))}
            <g transform="rotate(-16 570 168)">
              <Attenuator x={570} y={168} />
            </g>
            <g transform="rotate(16 570 272)">
              <Attenuator x={570} y={272} />
            </g>
            <Attenuator x={713} y={220} vertical />
          </g>

          {/* Shielded enclosure with the access point */}
          <rect
            x={CENTER.x - ENCLOSURE_HALF}
            y={CENTER.y - ENCLOSURE_HALF}
            width={ENCLOSURE_HALF * 2}
            height={ENCLOSURE_HALF * 2}
            rx={16}
            className={SHELL}
          />
          <rect
            x={CENTER.x - ENCLOSURE_HALF + 10}
            y={CENTER.y - ENCLOSURE_HALF + 10}
            width={ENCLOSURE_HALF * 2 - 20}
            height={ENCLOSURE_HALF * 2 - 20}
            rx={7}
            className={PANEL}
          />
          <g transform={`translate(${CENTER.x} ${CENTER.y - 6})`}>
            <AccessPoint />
          </g>
          {[333, 467].flatMap((x) =>
            [153, 287].map((y) => <Fastener key={`${x}-${y}`} x={x} y={y} />),
          )}
          <Vents x={368} y={277} count={12} height={5} step={6} />
          <path
            d="M339 263H461 M452 206v25"
            className="stroke-foreground/20"
            strokeWidth={1}
          />
        </svg>

        {RINGS.map((ring) => (
          <span
            key={ring.radius}
            aria-hidden
            // The middle label is dropped on phones, where the rings sit too
            // close for three.
            className={`${LABEL} ${layer("clients")} -translate-x-1/2 -translate-y-1/2 bg-muted px-1.5 tabular-nums ${
              ring.attenuation === 40 ? "max-sm:hidden" : ""
            }`}
            style={{
              left: percentX(CENTER.x),
              top: percentY(CENTER.y - ring.radius),
            }}
          >
            {ring.attenuation} dB
          </span>
        ))}
        <span
          aria-hidden
          className={`${LABEL} ${layer("interference")} -translate-x-1/2 -translate-y-full`}
          style={{ left: percentX(95), top: percentY(184) }}
        >
          MT-Wave
        </span>
        <span
          aria-hidden
          className={`${LABEL} ${layer("backhaul")} -translate-x-1/2 -translate-y-full`}
          style={{ left: percentX(713), top: percentY(78) }}
        >
          Mesh nodes
        </span>
      </div>
    </figure>
  );
}

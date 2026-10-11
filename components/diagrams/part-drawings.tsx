"use client";

import { useState } from "react";
import { DraftingGrid, ScopeGrid } from "./detail";

import {
  AccessPoint,
  Attenuator,
  ClientModule,
  EmulatorUnit,
  Enclosure,
  WaveUnit,
} from "@/components/diagrams/parts";

export type PartDrawingId =
  | "system"
  | "clients"
  | "emulator"
  | "wave"
  | "attenuators"
  | "automation"
  | "spectrum";

const SHELL = "fill-muted stroke-foreground/75";
const PANEL = "fill-background stroke-foreground/75";
const LINE = "fill-none stroke-foreground/55";
const SOLID = "fill-foreground/55";
const FADE = "transition-opacity duration-200 motion-reduce:transition-none";

// The part's own outline, redrawn in the brand color while the pointer is on
// its tile. Give it the same geometry as the outline it covers.
function Outline({
  active,
  ...rect
}: { active: boolean } & React.SVGProps<SVGRectElement>) {
  return (
    <rect
      {...rect}
      className={`fill-none stroke-brand ${FADE} ${active ? "" : "opacity-0"}`}
    />
  );
}

// Each drawing is on a 240 × 150 canvas, built from the same pieces as the
// system diagrams. While `active`, the part's outline is in the brand color;
// that is the only change.
const DRAWINGS: Record<PartDrawingId, (active: boolean) => React.ReactNode> = {
  // An enclosure on top of a client module and its base.
  system: (active) => (
    <g transform="translate(62 5) scale(0.58)">
      <Enclosure x={0} y={0}>
        <AccessPoint />
      </Enclosure>
      <Outline active={active} x={0} y={0} width={200} height={150} rx={14} />
      <ClientModule x={-10} y={166} radios={24} />
      <rect x={-28} y={236} width={256} height={10} rx={5} className={SHELL} />
    </g>
  ),
  clients: (active) => (
    <g transform="translate(21 46) scale(0.9)">
      <ClientModule x={0} y={0} radios={24} />
      <Outline active={active} x={0} y={0} width={220} height={64} rx={11} />
    </g>
  ),
  emulator: (active) => (
    <>
      <EmulatorUnit />
      <Outline active={active} x={42} y={64} width={156} height={58} rx={11} />
    </>
  ),
  wave: (active) => (
    <g transform="translate(37.5 33) scale(1.5)">
      <WaveUnit x={0} y={0} />
      <Outline active={active} x={0} y={0} width={110} height={56} rx={11} />
    </g>
  ),
  // An attenuator in line with a cable.
  attenuators: (active) => (
    <g>
      <path
        d="M24 75 H216"
        strokeWidth={6}
        className="fill-none stroke-foreground/15"
      />
      <path
        d="M24 75 H216"
        strokeWidth={3.5}
        strokeDasharray="1 11"
        className="fill-none stroke-brand"
      />
      <g transform="translate(120 75) scale(2.3)">
        <Attenuator x={0} y={0} />
        <Outline
          active={active}
          x={-17}
          y={-11}
          width={34}
          height={22}
          rx={6}
        />
      </g>
    </g>
  ),
  // A report window: a checklist beside a chart.
  automation: (active) => (
    <g>
      <rect x={42} y={22} width={156} height={106} rx={10} className={PANEL} />
      <path d="M42 44 H198" className={LINE} />
      {[56, 68, 80].map((x) => (
        <circle key={x} cx={x} cy={33} r={3} className={SOLID} />
      ))}
      {[62, 82, 102].map((y) => (
        <g key={y}>
          <circle
            cx={62}
            cy={y}
            r={5}
            className="fill-brand/15 stroke-brand"
            strokeWidth={1.5}
          />
          <path
            d={`M59.5 ${y} l2 2 l3.5 -4`}
            strokeWidth={1.5}
            className="fill-none stroke-brand"
          />
          <path d={`M76 ${y} H110`} className={LINE} />
        </g>
      ))}
      <path d="M126 110 V58 M126 110 H184" className={LINE} />
      <ScopeGrid x={126} y={58} width={58} height={52} columns={4} rows={3} />
      <path
        d="M132 100L146 84L158 90L170 70L182 64V110H132Z"
        className="fill-brand/10 stroke-none"
      />
      <path
        d="M132 100 L146 84 L158 90 L170 70 L182 64"
        strokeWidth={2.5}
        className="fill-none stroke-brand"
      />
      <Outline active={active} x={42} y={22} width={156} height={106} rx={10} />
    </g>
  ),
  // A spectrum display: a Wi-Fi channel beside three narrow carriers.
  spectrum: (active) => (
    <g>
      <rect x={42} y={22} width={156} height={106} rx={10} className={PANEL} />
      <ScopeGrid x={54} y={38} width={132} height={72} columns={8} rows={4} />
      <path
        d="M54 116h34 m8 0h18 M174 30h12"
        className="stroke-foreground/25"
        strokeWidth={1}
      />
      {[58, 84].map((y) => (
        <path
          key={y}
          d={`M56 ${y} H184`}
          strokeWidth={1}
          className="fill-none stroke-foreground/15"
        />
      ))}
      <path
        d="M60 110 L66 58 Q67 52 73 52 H113 Q119 52 120 58 L126 110 Z"
        className="fill-brand/20 stroke-brand"
      />
      {[142, 156, 170].map((x) => (
        <rect
          key={x}
          x={x}
          y={68}
          width={5}
          height={42}
          rx={2.5}
          className="fill-chart-2 stroke-none"
        />
      ))}
      <path d="M54 110 H186" className={LINE} />
      <Outline active={active} x={42} y={22} width={156} height={106} rx={10} />
    </g>
  ),
};

// A product part drawn in a tile. Hovering the tile outlines the part in the
// brand color with a gentle lift. Pass `active` when something larger than the
// tile, such as a link around it, decides when the part is outlined.
export function PartDrawing({
  id,
  // The tile's corner radius and padding.
  className = "rounded-3xl p-4",
  active: activeFromOutside,
}: {
  id: PartDrawingId;
  className?: string;
  active?: boolean;
}) {
  const [hovered, setActive] = useState(false);
  const active = activeFromOutside ?? hovered;

  const drawing = (
    <svg
      aria-hidden
      viewBox="0 0 240 150"
      className="block w-full"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <DraftingGrid width={240} height={150} step={24} />
      {DRAWINGS[id](active)}
    </svg>
  );

  return (
    <div
      className={`illustration-art bg-muted ${className}`}
      onPointerEnter={(event) => {
        // A touch would only flash the highlight as the finger lifts.
        if (event.pointerType !== "touch") setActive(true);
      }}
      onPointerLeave={() => setActive(false)}
    >
      {drawing}
    </div>
  );
}

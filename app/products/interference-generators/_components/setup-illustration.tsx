"use client";

import type { SetupPartId } from "../_data/reference-configuration";
import {
  DraftingGrid,
  Fastener,
  ScopeGrid,
  Vents,
} from "@/components/diagrams/detail";

const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 570;

// Shared drawing styles. Every part is a `group/part`; its shapes turn brand
// blue while the part is highlighted.
const SHELL =
  "fill-muted stroke-foreground/75 transition-colors duration-200 group-data-highlighted/part:fill-brand/10 group-data-highlighted/part:stroke-brand";
const PANEL =
  "fill-background stroke-foreground/75 transition-colors duration-200 group-data-highlighted/part:stroke-brand";
const LINE =
  "fill-none stroke-foreground/55 transition-colors duration-200 group-data-highlighted/part:stroke-brand";
const SOLID =
  "fill-foreground/55 transition-colors duration-200 group-data-highlighted/part:fill-brand";
const MICRO_TEXT = "fill-muted-foreground font-medium select-none";

// Cable routes, drawn from the signal's source to its destination.
const CABLES = {
  interference:
    "M120 138 V206 Q120 222 136 222 H250 Q266 222 266 206 V166 Q266 150 282 150 H300",
  referenceOuter: "M620 490 H734 Q750 490 750 474 V136 Q750 120 734 120 H630",
  referenceInner: "M620 440 H664 Q680 440 680 424 V196 Q680 180 664 180 H630",
};

const ENCLOSURE_PORTS = { left: [150], right: [120, 180] };

// Absorber lining: rows of small wedges on the inner walls, left out around
// the ports.
const absorberWedges = (() => {
  const wedges: string[] = [];
  for (let x = 329; x + 16 <= 602; x += 16) {
    wedges.push(`M${x} 44 L${x + 8} 55 L${x + 16} 44 Z`);
  }
  for (let y = 62; y + 16 <= 276; y += 16) {
    const center = y + 8;
    if (ENCLOSURE_PORTS.left.every((port) => Math.abs(port - center) > 20)) {
      wedges.push(`M314 ${y} L325 ${y + 8} L314 ${y + 16} Z`);
    }
    if (ENCLOSURE_PORTS.right.every((port) => Math.abs(port - center) > 20)) {
      wedges.push(`M616 ${y} L605 ${y + 8} L616 ${y + 16} Z`);
    }
  }
  return wedges.join(" ");
})();

// Radiating arcs in front of an antenna probe. `direction` is 1 for a probe
// facing right, −1 for one facing left.
function waveArcs(cx: number, cy: number, direction: 1 | -1) {
  return [12, 22, 32]
    .map((radius) => {
      const dx = (radius * 0.766 * direction).toFixed(1);
      const dy = (radius * 0.643).toFixed(1);
      const sweep = direction === 1 ? 1 : 0;
      return `M${cx + Number(dx)} ${cy - Number(dy)} A${radius} ${radius} 0 0 ${sweep} ${cx + Number(dx)} ${cy + Number(dy)}`;
    })
    .join(" ");
}

const CLIENT_CELLS = Array.from({ length: 24 }, (_, i) => ({
  x: 172 + (i % 12) * 34,
  y: i < 12 ? 422 : 470,
}));

// Labels are HTML so they stay readable when the drawing scales down. Each is
// anchored on the edge nearest its part, so it grows away from the artwork.
const LABELS: {
  id: SetupPartId;
  text: string;
  x: number;
  y: number;
  align: "left" | "center" | "right";
  anchor: "top" | "middle" | "bottom";
}[] = [
  {
    id: "wave",
    text: "MT-Wave",
    x: 125,
    y: 62,
    align: "center",
    anchor: "bottom",
  },
  {
    id: "dut",
    text: "Access point",
    x: 465,
    y: 174,
    align: "center",
    anchor: "bottom",
  },
  {
    id: "enclosure",
    text: "Box-A",
    x: 334,
    y: 62,
    align: "left",
    anchor: "top",
  },
  {
    id: "attenuators",
    text: "MT84-A",
    x: 644,
    y: 350,
    align: "right",
    anchor: "middle",
  },
  {
    id: "emulator",
    text: "MT-C24",
    x: 152,
    y: 392,
    align: "left",
    anchor: "bottom",
  },
];

const LABEL_ALIGN = {
  left: "",
  center: "-translate-x-1/2",
  right: "-translate-x-full",
};

const LABEL_ANCHOR = {
  top: "",
  middle: "-translate-y-1/2",
  bottom: "-translate-y-full",
};

type SetupIllustrationProps = {
  highlighted: SetupPartId;
  onHover: (id: SetupPartId | null) => void;
};

// Pointer-only: the list beside the illustration is the keyboard and
// screen-reader control for the same selection.
function Part({
  id,
  hit,
  highlighted,
  onHover,
  children,
}: SetupIllustrationProps & {
  id: SetupPartId;
  hit: { x: number; y: number; width: number; height: number };
  children: React.ReactNode;
}) {
  return (
    <g
      data-highlighted={highlighted === id ? "" : undefined}
      className="group/part"
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") onHover(id);
      }}
      onPointerLeave={() => onHover(null)}
    >
      {children}
      <rect {...hit} fill="transparent" />
    </g>
  );
}

export function SetupIllustration(props: SetupIllustrationProps) {
  const { highlighted } = props;
  const interferenceActive = highlighted === "wave";
  const referenceActive =
    highlighted === "attenuators" || highlighted === "emulator";

  return (
    <div
      className="hover-illustration relative"
      style={{ aspectRatio: `${VIEW_WIDTH} / ${VIEW_HEIGHT}` }}
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        className="absolute inset-0 size-full"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <DraftingGrid width={VIEW_WIDTH} height={VIEW_HEIGHT} step={40} />
        {/* Reference traffic: MT-C24 to the enclosure, through the attenuators */}
        <g className="pointer-events-none fill-none">
          {[CABLES.referenceOuter, CABLES.referenceInner].map((d) => (
            <g key={d}>
              <path
                d={d}
                pathLength={1}
                className="setup-cable stroke-foreground/20"
                strokeWidth={6}
              />
              <path
                d={d}
                className="setup-signal stroke-brand motion-safe:animate-signal"
                strokeWidth={referenceActive ? 4 : 3}
                strokeDasharray="1 11"
              />
            </g>
          ))}
        </g>

        <Part
          {...props}
          id="enclosure"
          hit={{ x: 296, y: 26, width: 338, height: 278 }}
        >
          <rect
            x={300}
            y={30}
            width={330}
            height={270}
            rx={18}
            className={SHELL}
          />
          <rect
            x={314}
            y={44}
            width={302}
            height={242}
            rx={8}
            className={PANEL}
          />
          <path
            d={absorberWedges}
            className="fill-foreground/12 stroke-none transition-colors duration-200 group-data-highlighted/part:fill-brand/25"
          />
          {[307, 623].flatMap((x) =>
            [37, 293].map((y) => (
              <Fastener key={`${x}-${y}`} x={x} y={y} r={2.6} />
            )),
          )}
          <path
            d="M344 276H586 M348 280H582"
            className="fill-none stroke-foreground/20"
            strokeWidth={1}
          />
          {/* Feed-throughs and the antenna probes behind them */}
          <rect
            x={290}
            y={144}
            width={12}
            height={12}
            rx={3}
            className={SOLID}
          />
          <path d="M314 150 H332" className={LINE} />
          <rect
            x={332}
            y={138}
            width={5}
            height={24}
            rx={2.5}
            className={SOLID}
          />
          {ENCLOSURE_PORTS.right.map((y) => (
            <g key={y}>
              <rect
                x={628}
                y={y - 6}
                width={12}
                height={12}
                rx={3}
                className={SOLID}
              />
              <path d={`M616 ${y} H598`} className={LINE} />
              <rect
                x={593}
                y={y - 12}
                width={5}
                height={24}
                rx={2.5}
                className={SOLID}
              />
            </g>
          ))}
          <path
            d={waveArcs(342, 150, 1)}
            className="fill-none stroke-chart-2"
            opacity={0.7}
          />
          {ENCLOSURE_PORTS.right.map((y) => (
            <path
              key={y}
              d={waveArcs(588, y, -1)}
              className="fill-none stroke-brand"
              opacity={0.7}
            />
          ))}
        </Part>

        <Part
          {...props}
          id="dut"
          hit={{ x: 395, y: 140, width: 140, height: 132 }}
        >
          <rect
            x={405}
            y={262}
            width={120}
            height={6}
            rx={3}
            className={SOLID}
          />
          {[
            { x: 432, angle: -14 },
            { x: 465, angle: 0 },
            { x: 498, angle: 14 },
          ].map((antenna) => (
            <rect
              key={antenna.x}
              x={antenna.x - 3.5}
              y={182}
              width={7}
              height={52}
              rx={3.5}
              transform={`rotate(${antenna.angle} ${antenna.x} 232)`}
              className={PANEL}
            />
          ))}
          <rect
            x={413}
            y={228}
            width={104}
            height={32}
            rx={9}
            className={PANEL}
          />
          <Vents x={468} y={233} count={9} height={4} />
          <circle cx={431} cy={244} r={3} className="fill-brand" />
          <circle cx={443} cy={244} r={3} className={SOLID} />
          <circle cx={455} cy={244} r={3} className={SOLID} />
          <path d="M472 244 H502" className={LINE} />
        </Part>

        <Part
          {...props}
          id="emulator"
          hit={{ x: 120, y: 370, width: 530, height: 185 }}
        >
          <rect
            x={126}
            y={534}
            width={518}
            height={14}
            rx={7}
            className={SHELL}
          />
          <rect
            x={150}
            y={400}
            width={470}
            height={130}
            rx={16}
            className={SHELL}
          />
          <rect
            x={162}
            y={412}
            width={446}
            height={106}
            rx={8}
            className={PANEL}
          />
          {CLIENT_CELLS.map((cell) => {
            const cx = cell.x + 14;
            const cy = cell.y + 28;
            return (
              <g key={`${cell.x}-${cell.y}`}>
                <rect
                  x={cell.x}
                  y={cell.y}
                  width={28}
                  height={38}
                  rx={6}
                  strokeWidth={1.5}
                  className="fill-muted stroke-foreground/30 transition-colors duration-200 group-data-highlighted/part:fill-brand/10 group-data-highlighted/part:stroke-brand/60"
                />
                <circle cx={cx} cy={cy} r={2.2} className={SOLID} />
                <path
                  d={`M${cell.x + 5} ${cell.y + 6} h18 m-18 4h8`}
                  className="fill-none stroke-brand/35"
                  strokeWidth={0.8}
                />
                <path
                  d={`M${cx - 4.2} ${cy - 4.2} A6 6 0 0 1 ${cx + 4.2} ${cy - 4.2} M${cx - 7.8} ${cy - 7.8} A11 11 0 0 1 ${cx + 7.8} ${cy - 7.8}`}
                  strokeWidth={1.75}
                  className={LINE}
                />
              </g>
            );
          })}
          {[440, 490].map((y) => (
            <g key={y}>
              <circle cx={592} cy={y} r={6} className={PANEL} />
              <circle cx={592} cy={y} r={2} className={SOLID} />
              <rect
                x={616}
                y={y - 6}
                width={12}
                height={12}
                rx={3}
                className={SOLID}
              />
            </g>
          ))}
        </Part>

        <Part
          {...props}
          id="wave"
          hit={{ x: 20, y: 30, width: 210, height: 160 }}
        >
          <rect x={52} y={172} width={26} height={8} rx={3} className={SOLID} />
          <rect
            x={172}
            y={172}
            width={26}
            height={8}
            rx={3}
            className={SOLID}
          />
          <rect
            x={30}
            y={70}
            width={190}
            height={104}
            rx={14}
            className={SHELL}
          />
          <rect
            x={40}
            y={80}
            width={170}
            height={84}
            rx={8}
            className={PANEL}
          />
          <path
            d="M54 104 q6 -14 12 0 t12 0 t12 0"
            strokeWidth={2.5}
            className="fill-none stroke-brand"
          />
          <ScopeGrid
            x={49}
            y={88}
            width={58}
            height={28}
            columns={5}
            rows={3}
          />
          <Vents x={52} y={133} count={9} height={14} />
          <Fastener x={46} y={86} r={1.6} />
          <Fastener x={204} y={158} r={1.6} />
          {[
            { x: 120, label: "RF1" },
            { x: 150, label: "RF2" },
            { x: 180, label: "RF3" },
          ].map((port) => (
            <g key={port.label}>
              <text
                x={port.x}
                y={124}
                fontSize={9}
                textAnchor="middle"
                strokeWidth={0}
                className={MICRO_TEXT}
              >
                {port.label}
              </text>
              <circle cx={port.x} cy={140} r={7} className={PANEL} />
              <circle cx={port.x} cy={140} r={2.5} className={SOLID} />
            </g>
          ))}
        </Part>

        {/* Interference: MT-Wave RF1 to the enclosure */}
        <g className="pointer-events-none fill-none">
          <path
            d={CABLES.interference}
            pathLength={1}
            className="setup-cable stroke-foreground/20"
            strokeWidth={6}
          />
          <path
            d={CABLES.interference}
            className="setup-signal stroke-chart-2 motion-safe:animate-signal"
            strokeWidth={interferenceActive ? 4 : 3}
            strokeDasharray="7 5"
          />
          <circle
            cx={120}
            cy={140}
            r={5}
            className="fill-foreground/70 stroke-none"
          />
        </g>

        <Part
          {...props}
          id="attenuators"
          hit={{ x: 640, y: 300, width: 150, height: 100 }}
        >
          {[656, 726].map((x) => (
            <g key={x}>
              <rect
                x={x + 18}
                y={312}
                width={12}
                height={8}
                rx={3}
                className={SOLID}
              />
              <rect
                x={x + 18}
                y={380}
                width={12}
                height={8}
                rx={3}
                className={SOLID}
              />
              <rect
                x={x}
                y={318}
                width={48}
                height={64}
                rx={10}
                className={PANEL}
              />
              <rect
                x={x + 8}
                y={327}
                width={32}
                height={17}
                rx={4}
                strokeWidth={1.5}
                className={SHELL}
              />
              <text
                x={x + 24}
                y={339.5}
                fontSize={9.5}
                textAnchor="middle"
                strokeWidth={0}
                className={MICRO_TEXT}
              >
                dB
              </text>
              <rect
                x={x + 10}
                y={352}
                width={7}
                height={20}
                rx={2}
                className={SOLID}
              />
              <rect
                x={x + 20.5}
                y={359}
                width={7}
                height={13}
                rx={2}
                className={SOLID}
              />
              <rect
                x={x + 31}
                y={366}
                width={7}
                height={6}
                rx={2}
                className={SOLID}
              />
            </g>
          ))}
        </Part>
      </svg>

      {LABELS.map((label) => (
        <span
          key={label.id}
          aria-hidden
          className={`pointer-events-none absolute text-caption-1 font-medium whitespace-nowrap transition-colors duration-200 ${LABEL_ALIGN[label.align]} ${LABEL_ANCHOR[label.anchor]} ${
            highlighted === label.id
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
          style={{
            left: `${(label.x / VIEW_WIDTH) * 100}%`,
            top: `${(label.y / VIEW_HEIGHT) * 100}%`,
          }}
        >
          {label.text}
        </span>
      ))}
    </div>
  );
}

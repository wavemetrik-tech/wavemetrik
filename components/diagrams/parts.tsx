import { DraftingGrid, Fastener, ScopeGrid, Vents } from "./detail";

// Line-art parts shared by the site's diagrams. The system diagrams are drawn
// in one 1000 × 580 coordinate space. Status lights and waveforms carry the
// quiet loops defined beside `fx-pulse` in globals.css.

export const VIEW_WIDTH = 1000;
export const VIEW_HEIGHT = 580;

const SHELL = "fill-muted stroke-foreground/75";
const PANEL = "fill-background stroke-foreground/75";
const LINE = "fill-none stroke-foreground/55";
const SOLID = "fill-foreground/55";

export type Point = [number, number];

// `dash` repeats every 12 units so the signal animation loops cleanly;
// `keyDash` is a tighter version for the short legend swatch.
export const LINK_KINDS = {
  interference: {
    label: "Interference",
    stroke: "stroke-chart-2",
    dash: "7 5",
    keyDash: "7 5",
  },
  clients: {
    label: "Client traffic",
    stroke: "stroke-brand",
    dash: "1 11",
    keyDash: "1 7",
  },
  backhaul: {
    label: "Links between enclosures",
    stroke: "stroke-chart-3",
    dash: "3 9",
    keyDash: "3 6",
  },
} as const;

export type LinkKind = keyof typeof LINK_KINDS;

// A path through right-angle waypoints, with rounded corners.
function route(points: Point[], radius = 12) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const inLength = Math.hypot(x - px, y - py);
    const outLength = Math.hypot(nx - x, ny - y);
    const r = Math.min(radius, inLength / 2, outLength / 2);
    const ax = x - ((x - px) / inLength) * r;
    const ay = y - ((y - py) / inLength) * r;
    const bx = x + ((nx - x) / outLength) * r;
    const by = y + ((ny - y) / outLength) * r;
    d += ` L${ax} ${ay} Q${x} ${y} ${bx} ${by}`;
  }
  const [lastX, lastY] = points[points.length - 1];
  return `${d} L${lastX} ${lastY}`;
}

// An RF cable. The moving dashes show which kind of signal it carries; it
// dims and stops while another kind is in focus.
export function Link({
  points,
  kind,
  focus,
  onHover,
}: {
  points: Point[];
  kind: LinkKind;
  focus: LinkKind | null;
  onHover?: (kind: LinkKind | null) => void;
}) {
  const d = route(points);
  const dimmed = focus !== null && focus !== kind;
  return (
    <g
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") onHover?.(kind);
      }}
      onPointerLeave={() => onHover?.(null)}
      className={`fill-none transition-opacity duration-300 ${
        dimmed ? "opacity-20" : ""
      }`}
    >
      {onHover && <path d={d} stroke="transparent" strokeWidth={18} />}
      <path d={d} strokeWidth={5} className="stroke-foreground/15" />
      <path
        d={d}
        strokeWidth={3}
        strokeDasharray={LINK_KINDS[kind].dash}
        className={`${LINK_KINDS[kind].stroke} motion-safe:animate-signal`}
        style={{ animationPlayState: dimmed ? "paused" : "running" }}
      />
      {[points[0], points[points.length - 1]].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={4.5}
          strokeWidth={1.5}
          className="fill-background stroke-foreground/60"
        />
      ))}
    </g>
  );
}

export const ENCLOSURE_WIDTH = 200;
export const ENCLOSURE_HEIGHT = 150;

// Shielded enclosure, 200 × 150. Its contents are drawn around the center.
export function Enclosure({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={ENCLOSURE_WIDTH}
        height={ENCLOSURE_HEIGHT}
        rx={14}
        className={SHELL}
      />
      <rect
        x={x + 10}
        y={y + 10}
        width={ENCLOSURE_WIDTH - 20}
        height={ENCLOSURE_HEIGHT - 20}
        rx={6}
        className={PANEL}
      />
      <path
        d={`M${x + 18} ${y + 118} H${x + 182} M${x + 22} ${y + 122} H${x + 178}`}
        className="fill-none stroke-foreground/15"
        strokeWidth={1}
      />
      {[18, 182].flatMap((dx) =>
        [18, 132].map((dy) => (
          <Fastener key={`${dx}-${dy}`} x={x + dx} y={y + dy} />
        )),
      )}
      {[36, 64, 92].map((dy) => (
        <path
          key={dy}
          d={`M${x + 12} ${y + dy} h5 v10 h-5 M${x + 188} ${y + dy} h-5 v10 h5`}
          className="fill-muted stroke-foreground/20"
          strokeWidth={1}
        />
      ))}
      <Vents x={x + 68} y={y + 132} count={12} height={5} step={5} />
      <rect
        x={x + 174}
        y={y + 63}
        width={5}
        height={23}
        rx={2}
        className={SOLID}
      />
      <g transform={`translate(${x + ENCLOSURE_WIDTH / 2} ${y + 68})`}>
        {children}
      </g>
    </g>
  );
}

// Access point under test: a router with three antennas.
export function AccessPoint() {
  return (
    <g>
      <rect x={-50} y={34} width={100} height={5} rx={2.5} className={SOLID} />
      {[
        { x: -26, angle: -13 },
        { x: 0, angle: 0 },
        { x: 26, angle: 13 },
      ].map((antenna) => (
        <rect
          key={antenna.x}
          x={antenna.x - 3}
          y={-32}
          width={6}
          height={44}
          rx={3}
          transform={`rotate(${antenna.angle} ${antenna.x} 10)`}
          className={PANEL}
        />
      ))}
      <rect x={-42} y={6} width={84} height={27} rx={8} className={PANEL} />
      <path
        d="M-36 12 H36 M-33 29 H33"
        strokeWidth={0.8}
        className="fill-none stroke-foreground/20"
      />
      <Vents x={-12} y={13} count={10} height={3} step={4} />
      <Fastener x={-35} y={22} r={1.2} />
      <Fastener x={35} y={22} r={1.2} />
      <circle cx={-27} cy={19.5} r={2.6} className="fx-pulse fill-brand" />
      <circle cx={-17} cy={19.5} r={2.6} className={SOLID} />
      <circle cx={-7} cy={19.5} r={2.6} className={SOLID} />
      <path d="M8 19.5 H30" className={LINE} />
    </g>
  );
}

// Mesh node: a small tower.
export function MeshNode() {
  return (
    <g>
      <rect x={-30} y={34} width={60} height={5} rx={2.5} className={SOLID} />
      <rect x={-18} y={-28} width={36} height={62} rx={14} className={PANEL} />
      <path
        d="M-13 -20 Q0 -25 13 -20 M-13 27 H13"
        className="fill-none stroke-foreground/20"
        strokeWidth={0.8}
      />
      <Vents x={-8} y={0} count={5} height={11} />
      <circle
        cx={0}
        cy={-12}
        r={2.6}
        className="fx-pulse fill-brand"
        style={{ "--fx-delay": "1.2s" } as React.CSSProperties}
      />
      <path d="M-7 18 H7" className={LINE} />
    </g>
  );
}

// Real client devices: a phone and a laptop.
export function ClientDevices() {
  return (
    <g>
      <rect x={-52} y={-18} width={26} height={48} rx={6} className={PANEL} />
      <circle cx={-39} cy={-10} r={2} className={SOLID} />
      <rect
        x={-48}
        y={-4}
        width={18}
        height={26}
        rx={2}
        className="fill-brand/10 stroke-foreground/15"
        strokeWidth={0.8}
      />
      <path
        d="M-44 16 l4 -7 4 3 3 -8 M-43 26 h8"
        className="fill-none stroke-brand/60"
        strokeWidth={1}
      />
      <rect x={-10} y={-12} width={58} height={36} rx={4} className={PANEL} />
      <ScopeGrid x={-5} y={-6} width={48} height={24} columns={4} rows={2} />
      <path
        d="M-2 14 l8 -5 8 2 8 -12 8 4 9 -5"
        className="fill-none stroke-brand/70"
        strokeWidth={1.3}
      />
      <rect x={-18} y={25} width={74} height={5} rx={2.5} className={SOLID} />
    </g>
  );
}

export const WAVE_WIDTH = 110;
export const WAVE_HEIGHT = 56;

// MT-Wave interference generator. Its waveform slides by one period, clipped
// by the nested viewport that stands for the display.
export function WaveUnit({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={WAVE_WIDTH}
        height={WAVE_HEIGHT}
        rx={11}
        className={SHELL}
      />
      <rect
        x={x + 7}
        y={y + 7}
        width={WAVE_WIDTH - 14}
        height={WAVE_HEIGHT - 14}
        rx={5}
        className={PANEL}
      />
      <rect
        x={x + 16}
        y={y + 10}
        width={70}
        height={35}
        rx={3}
        className="fill-brand/[0.04] stroke-foreground/20"
        strokeWidth={0.8}
      />
      <ScopeGrid x={x + 20} y={y + 14} width={62} height={27} />
      <svg x={x + 20} y={y + 12} width={62} height={32} viewBox="0 0 70 32">
        <path
          d="M-26 16 q7 -15 14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0 t14 0"
          strokeWidth={2.5}
          className="fx-drift fill-none stroke-chart-2"
        />
      </svg>
      <circle cx={x + 96} cy={y + 23} r={4} className={PANEL} strokeWidth={1} />
      <circle
        cx={x + 96}
        cy={y + 23}
        r={1.4}
        className="fill-chart-2 stroke-none"
      />
      <Vents x={x + 91} y={y + 35} count={3} height={6} />
      <Fastener x={x + 10} y={y + 10} r={1.4} />
      <Fastener x={x + 100} y={y + 46} r={1.4} />
    </g>
  );
}

export const MODULE_WIDTH = 220;
export const MODULE_HEIGHT = 64;

// Client emulator module. MT-C24 shows 24 radios, MT-C12 shows 12.
export function ClientModule({
  x,
  y,
  radios,
}: {
  x: number;
  y: number;
  radios: 12 | 24;
}) {
  const columns = radios === 24 ? 12 : 6;
  const cellWidth = radios === 24 ? 13 : 29;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={MODULE_WIDTH}
        height={MODULE_HEIGHT}
        rx={11}
        className={SHELL}
      />
      <rect
        x={x + 7}
        y={y + 7}
        width={MODULE_WIDTH - 14}
        height={MODULE_HEIGHT - 14}
        rx={5}
        className={PANEL}
      />
      {Array.from({ length: radios }, (_, index) => (
        <g key={index}>
          <rect
            x={x + 15.5 + (index % columns) * (cellWidth + 3)}
            y={y + (index < columns ? 12 : 34)}
            width={cellWidth}
            height={18}
            rx={3.5}
            strokeWidth={1}
            className="fx-pulse fill-brand/15 stroke-brand/60"
            style={
              {
                "--fx-delay": `${((index * 7) % radios) * 0.27}s`,
              } as React.CSSProperties
            }
          />
          <path
            d={`M${x + 19 + (index % columns) * (cellWidth + 3)} ${y + (index < columns ? 16 : 38)} h${cellWidth - 7} m0 4 h${-(cellWidth - 7)}`}
            strokeWidth={0.7}
            className="fill-none stroke-brand/40"
          />
          <circle
            cx={x + 15.5 + (index % columns) * (cellWidth + 3) + cellWidth / 2}
            cy={y + (index < columns ? 25 : 47)}
            r={1.5}
            className="fill-brand/60 stroke-none"
          />
        </g>
      ))}
      {[4, MODULE_WIDTH - 4].flatMap((dx) =>
        [12, 52].map((dy) => (
          <Fastener key={`${dx}-${dy}`} x={x + dx} y={y + dy} r={1.2} />
        )),
      )}
      <path
        d={`M${x + 20} ${y + 59} h180`}
        strokeWidth={0.7}
        className="stroke-foreground/20"
      />
    </g>
  );
}

// MT-BE emulator with four antenna chains, drawn for a 240 × 150 canvas.
export function EmulatorUnit() {
  return (
    <g>
      {[69, 103, 137, 171].map((x) => (
        <rect
          key={x}
          x={x - 3.5}
          y={28}
          width={7}
          height={46}
          rx={3.5}
          className={PANEL}
        />
      ))}
      <rect x={42} y={64} width={156} height={58} rx={11} className={SHELL} />
      <rect x={49} y={71} width={142} height={44} rx={5} className={PANEL} />
      <Vents x={82} y={74} count={20} height={4} />
      <Fastener x={55} y={78} r={1.5} />
      <Fastener x={185} y={108} r={1.5} />
      <path
        d="M62 109 H178"
        strokeWidth={0.8}
        className="stroke-foreground/20"
      />
      {[69, 103, 137, 171].map((x) => (
        <g key={x}>
          <circle cx={x} cy={93} r={8} className={PANEL} />
          <circle
            cx={x}
            cy={93}
            r={5.5}
            className="fill-brand/10 stroke-brand/30"
            strokeWidth={0.8}
          />
          <path
            d={`M${x - 4} 105 h8 M${x} 62 v7`}
            className="stroke-foreground/30"
            strokeWidth={1}
          />
          <circle
            cx={x}
            cy={93}
            r={2.8}
            className="fx-pulse fill-brand"
            style={
              { "--fx-delay": `${(x - 69) * 0.02}s` } as React.CSSProperties
            }
          />
        </g>
      ))}
    </g>
  );
}

// Programmable attenuator on a cable, drawn across the cable's direction.
export function Attenuator({
  x,
  y,
  vertical = false,
}: {
  x: number;
  y: number;
  vertical?: boolean;
}) {
  const width = vertical ? 22 : 34;
  const height = vertical ? 34 : 22;
  const bars = vertical
    ? [
        { dx: -7, h: 13 },
        { dx: -2, h: 9 },
        { dx: 3, h: 5 },
      ]
    : [
        { dx: -10, h: 12 },
        { dx: -2.5, h: 8 },
        { dx: 5, h: 4 },
      ];
  const barWidth = vertical ? 4 : 5;
  const floor = vertical ? 8 : 6;
  return (
    <g>
      {[-1, 1].map((side) => (
        <rect
          key={side}
          x={vertical ? x - 3 : x + side * (width / 2 + 2) - 3}
          y={vertical ? y + side * (height / 2 + 2) - 3 : y - 3}
          width={6}
          height={6}
          rx={1}
          strokeWidth={0.8}
          className="fill-muted stroke-foreground/40"
        />
      ))}
      <rect
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        rx={6}
        className={PANEL}
      />
      <rect
        x={x - width / 2 + 3}
        y={y - height / 2 + 3}
        width={width - 6}
        height={height - 6}
        rx={3}
        className="fill-none stroke-foreground/15"
        strokeWidth={0.7}
      />
      {bars.map((bar) => (
        <rect
          key={bar.dx}
          x={x + bar.dx}
          y={y + floor - bar.h}
          width={barWidth}
          height={bar.h}
          rx={1.5}
          className={SOLID}
        />
      ))}
    </g>
  );
}

export const SPLITTER_WIDTH = 44;
export const SPLITTER_HEIGHT = 100;

// RF splitter: one input fanned out to several outputs.
export function Splitter({ x, y }: { x: number; y: number }) {
  const cx = x + SPLITTER_WIDTH / 2;
  const cy = y + SPLITTER_HEIGHT / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={SPLITTER_WIDTH}
        height={SPLITTER_HEIGHT}
        rx={10}
        className={SHELL}
      />
      <rect
        x={x + 5}
        y={y + 5}
        width={SPLITTER_WIDTH - 10}
        height={SPLITTER_HEIGHT - 10}
        rx={5}
        className={PANEL}
        strokeWidth={1}
      />
      <Fastener x={cx} y={y + 10} r={1.8} />
      <Fastener x={cx} y={y + SPLITTER_HEIGHT - 10} r={1.8} />
      <path
        d={`M${cx} ${cy - 26} V${cy + 26} M${cx - 10} ${cy - 14} L${cx} ${cy - 26} L${cx + 10} ${cy - 14} M${cx - 10} ${cy + 14} L${cx} ${cy + 26} L${cx + 10} ${cy + 14} M${cx - 12} ${cy} H${cx + 12}`}
        strokeWidth={2}
        className={LINE}
      />
    </g>
  );
}

export type DiagramLabel = {
  text: string;
  x: number;
  y: number;
  align?: "left" | "center" | "right";
  anchor?: "top" | "middle" | "bottom";
  strong?: boolean;
};

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

// The drawing surface. Labels are HTML placed in the drawing's coordinates,
// so they keep their size when the drawing scales. On narrow screens the
// drawing keeps a readable width and scrolls sideways.
export function DiagramFrame({
  label,
  labels,
  children,
}: {
  label: string;
  labels: DiagramLabel[];
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      tabIndex={0}
      className="overflow-x-auto rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className="relative min-w-[44rem]"
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
          <DraftingGrid width={VIEW_WIDTH} height={VIEW_HEIGHT} step={50} />
          {children}
        </svg>
        {labels.map((item) => (
          <span
            key={`${item.text}-${item.x}-${item.y}`}
            aria-hidden
            className={`pointer-events-none absolute text-caption-1 whitespace-nowrap ${
              item.strong
                ? "font-semibold"
                : "font-medium text-muted-foreground"
            } ${LABEL_ALIGN[item.align ?? "left"]} ${LABEL_ANCHOR[item.anchor ?? "top"]}`}
            style={{
              left: `${(item.x / VIEW_WIDTH) * 100}%`,
              top: `${(item.y / VIEW_HEIGHT) * 100}%`,
            }}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

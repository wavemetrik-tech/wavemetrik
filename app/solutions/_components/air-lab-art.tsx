import { AccessPoint } from "@/components/diagrams/parts";
import {
  DraftingGrid,
  Fastener,
  ScopeGrid,
  Vents,
} from "@/components/diagrams/detail";
import type { ApproachId } from "../_data/approaches";
import { SignalGlyph } from "./signal-glyph";

export const LAB_SIGNALS: {
  id: ApproachId;
  name: string;
  label: string;
  x: number;
  y: number;
  path: string;
}[] = [
  {
    id: "performance-and-range",
    name: "Performance",
    label: "RANGE / RSSI",
    x: 12,
    y: 76,
    path: "M120 110H144Q154 110 154 120V158Q154 168 164 168H192",
  },
  {
    id: "wifi-7-and-mlo",
    name: "Wi-Fi 7 & MLO",
    label: "MULTI-LINK",
    x: 12,
    y: 182,
    path: "M120 216H192",
  },
  {
    id: "coexistence-and-interference",
    name: "Coexistence",
    label: "COEXISTENCE",
    x: 12,
    y: 288,
    path: "M120 322H144Q164 322 164 302V274Q164 264 174 264H192",
  },
  {
    id: "radar-and-dfs",
    name: "Radar & DFS",
    label: "RADAR / DFS",
    x: 480,
    y: 76,
    path: "M480 110H456Q446 110 446 120V158Q446 168 436 168H408",
  },
  {
    id: "mesh-and-roaming",
    name: "Mesh & roaming",
    label: "MESH / ROAM",
    x: 480,
    y: 182,
    path: "M480 216H408",
  },
  {
    id: "automation-and-diagnosis",
    name: "Automation",
    label: "RUN / TRACE",
    x: 480,
    y: 288,
    path: "M480 322H456Q436 322 436 302V274Q436 264 426 264H408",
  },
];

// A conceptual cutaway lab, rather than a literal equipment configuration.
export function AirLabArt({ active }: { active: ApproachId | null }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 420"
      className="block h-auto w-full"
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <DraftingGrid width={600} height={420} step={30} />
      <path
        d="M160 360L204 336H440L396 360Z"
        className="fill-foreground/[0.03] stroke-foreground/10"
      />
      <path
        d="M180 365H420M180 360V370M420 360V370"
        className="stroke-foreground/25"
        strokeWidth={1}
      />
      <text
        x={300}
        y={389}
        textAnchor="middle"
        className="fill-muted-foreground stroke-none font-mono text-[10px] tracking-wider"
      >
        CONTROLLED RF ENVIRONMENT
      </text>
      <g transform="translate(186 24)">
        <rect
          width={228}
          height={28}
          rx={6}
          className="fill-background stroke-foreground/15"
        />
        {["2.4 GHz", "5 GHz", "6 GHz"].map((band, i) => (
          <g key={band}>
            <circle
              cx={14 + i * 76}
              cy={14}
              r={2.5}
              className="fill-link stroke-none"
            />
            <text
              x={24 + i * 76}
              y={18}
              className="fill-muted-foreground stroke-none font-mono text-[10px]"
            >
              {band}
            </text>
            {i < 2 && (
              <path
                d={`M${76 + i * 76} 7v14`}
                className="stroke-foreground/15"
              />
            )}
          </g>
        ))}
      </g>
      {LAB_SIGNALS.map((signal) => (
        <g
          key={signal.id}
          className={`transition-opacity duration-300 motion-reduce:transition-none ${active && active !== signal.id ? "opacity-20" : ""}`}
        >
          <path
            d={signal.path}
            strokeWidth={4}
            className="stroke-foreground/[0.06]"
          />
          <path
            d={signal.path}
            strokeDasharray="5 7"
            className={`${signal.id === "radar-and-dfs" || signal.id === "coexistence-and-interference" ? "stroke-chart-2" : "stroke-link"} motion-safe:animate-signal`}
            style={{
              animationPlayState:
                active && active !== signal.id ? "paused" : "running",
            }}
          />
          <g transform={`translate(${signal.x} ${signal.y})`}>
            <path
              d="M0 8L8 0H108V60L100 68H0Z"
              className="fill-background stroke-foreground/25"
            />
            <path
              d="M0 8H100V68M100 8L108 0"
              className="stroke-foreground/15"
              strokeWidth={0.8}
            />
            <rect
              x={8}
              y={16}
              width={84}
              height={36}
              rx={3}
              className="fill-muted stroke-foreground/10"
            />
            <g transform="translate(12 18)" strokeWidth={1.3}>
              <SignalGlyph kind={signal.id} />
            </g>
            <circle cx={10} cy={59} r={2} className="fill-link stroke-none" />
            <Vents x={73} y={57} count={5} step={3} height={4} />
            <text
              x={50}
              y={-9}
              textAnchor="middle"
              className="fill-muted-foreground stroke-none font-mono text-[9px] tracking-wider"
            >
              {signal.label}
            </text>
          </g>
        </g>
      ))}
      {/* Extruded shield, inset absorber, calibration plate and device. */}
      <path
        d="M180 128L212 96H420L388 128Z"
        className="fill-background stroke-foreground/40"
      />
      <path
        d="M388 128L420 96V286L388 318Z"
        className="fill-foreground/[0.04] stroke-foreground/40"
      />
      <rect
        x={180}
        y={128}
        width={208}
        height={190}
        rx={8}
        className="fill-background stroke-foreground/55"
      />
      <rect
        x={192}
        y={140}
        width={184}
        height={145}
        rx={5}
        className="fill-muted stroke-foreground/20"
      />
      <path
        d="M202 148H366V276H202Z"
        className="stroke-foreground/10"
        strokeDasharray="2 5"
      />
      <ScopeGrid
        x={206}
        y={152}
        width={156}
        height={120}
        columns={6}
        rows={5}
      />
      {[154, 173, 192, 211, 230, 249, 268].map((y) => (
        <path
          key={y}
          d={`M195 ${y}l5 4-5 4M373 ${y}l-5 4 5 4`}
          className="stroke-foreground/15"
          strokeWidth={0.8}
        />
      ))}
      <ellipse
        cx={284}
        cy={246}
        rx={65}
        ry={16}
        className="fill-link/[0.04] stroke-link/30"
      />
      <path
        d="M219 246V253C219 275 349 275 349 253V246"
        className="stroke-link/20"
      />
      <g transform="translate(284 210) scale(0.95)">
        <AccessPoint />
      </g>
      {[29, 46, 62].map((r, i) => (
        <path
          key={r}
          d={`M${284 - r} 191Q284 ${191 - r * 0.9} ${284 + r} 191`}
          className="stroke-link"
          opacity={0.5 - i * 0.12}
          strokeWidth={1.5}
        />
      ))}
      <path d="M204 293H364" className="stroke-foreground/15" />
      <text
        x={206}
        y={308}
        className="fill-foreground stroke-none font-mono text-[9px] tracking-wider"
      >
        DEVICE UNDER TEST
      </text>
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={342 + i * 9}
          cy={304}
          r={2}
          className={
            i === 0 ? "fill-link stroke-none" : "fill-foreground/20 stroke-none"
          }
        />
      ))}
      {[
        [186, 134],
        [382, 134],
        [186, 312],
        [382, 312],
      ].map(([x, y]) => (
        <Fastener key={`${x}-${y}`} x={x} y={y} />
      ))}
      <Vents x={395} y={161} count={4} step={4} height={72} />
      <path d="M202 115H378 M208 109H384" className="stroke-foreground/15" />
      {[168, 216, 264].map((y) => (
        <g key={y}>
          <circle
            cx={181}
            cy={y}
            r={3}
            className="fill-background stroke-link/60"
          />
          <circle
            cx={398}
            cy={y}
            r={3}
            className="fill-background stroke-link/60"
          />
        </g>
      ))}
      <path
        d="M180 324V334H202V324M366 324V334H388V324"
        className="fill-foreground/10 stroke-foreground/20"
      />
    </svg>
  );
}

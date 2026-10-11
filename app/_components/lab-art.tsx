import {
  AccessPoint,
  Attenuator,
  ClientModule,
  WaveUnit,
} from "@/components/diagrams/parts";
import { Fastener, ScopeGrid, Vents } from "@/components/diagrams/detail";

const delay = (seconds: number) =>
  ({ "--fx-delay": `${seconds}s` }) as React.CSSProperties;

// Stylized hardware, sharing the product pages' line-art vocabulary. `bare`
// leaves out the lettering, for drawings that are labeled in HTML.
export function Chamber({ bare = false }: { bare?: boolean }) {
  return (
    <g>
      <path
        d="M0 0L24-20H274L250 0Z"
        className="fill-muted stroke-foreground/35"
      />
      <path
        d="M250 0L274-20V190L250 210Z"
        className="fill-foreground/10 stroke-foreground/35"
      />
      <rect
        width="250"
        height="210"
        rx="10"
        className="fill-card stroke-foreground/40"
      />
      <rect
        x="15"
        y="15"
        width="220"
        height="155"
        rx="6"
        className="fill-surface-tint stroke-foreground/20"
      />
      <path
        d="M24 158V25H226V158 M24 148H226"
        className="fill-none stroke-foreground/15"
        strokeWidth={1}
      />
      <g
        className="fill-foreground/[0.04] stroke-foreground/10"
        strokeWidth={0.7}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M${27 + i * 16} 43 l8 -13 8 13 M${27 + i * 16} 141 l8 10 8 -10`}
          />
        ))}
        {[56, 80, 104, 128].map((y) => (
          <path key={y} d={`M25 ${y} l9 8 -9 8 M225 ${y} l-9 8 9 8`} />
        ))}
      </g>
      <path
        d="M42 146H208L193 135H57Z"
        className="fill-muted stroke-foreground/20"
        strokeWidth={1}
      />
      {[9, 241].flatMap((x) =>
        [9, 162, 200].map((y) => (
          <Fastener key={`${x}-${y}`} x={x} y={y} r={2.2} />
        )),
      )}
      {[47, 116].map((y) => (
        <rect
          key={y}
          x={4}
          y={y}
          width={7}
          height={27}
          rx={2}
          className="fill-muted stroke-foreground/30"
          strokeWidth={1}
        />
      ))}
      <rect
        x={235}
        y={78}
        width={9}
        height={38}
        rx={3}
        className="fill-muted stroke-foreground/40"
      />
      <path d="M240 85V109" className="stroke-foreground/40" />
      <Vents x={261} y={32} count={3} height={72} step={4} />
      <Vents x={165} y={181} count={8} height={12} step={4} />
      <g className="home-rf-arcs fill-none stroke-brand/40">
        {[48, 72, 96].map((r, index) => (
          <path
            key={r}
            d={`M${125 - r} 108a${r} ${r} 0 0 1 ${r * 2} 0`}
            className="fx-ripple"
            style={delay(index * 0.45)}
          />
        ))}
      </g>
      <g transform="translate(125 104) scale(1.15)">
        <AccessPoint />
      </g>
      {bare ? (
        <path d="M24 190H96" className="stroke-foreground/20" />
      ) : (
        <>
          <path d="M24 185H150" className="stroke-foreground/15" />
          <text
            x="24"
            y="199"
            className="fill-muted-foreground"
            fontSize="11"
            stroke="none"
            letterSpacing="1.2"
          >
            SHIELDED RF ENVIRONMENT
          </text>
        </>
      )}
      <circle
        cx="219"
        cy="187"
        r="4"
        className="fx-pulse fill-brand"
        style={delay(0.8)}
      />
      <rect
        x="18"
        y="210"
        width="30"
        height="8"
        rx="2"
        className="fill-foreground/30"
      />
      <rect
        x="202"
        y="210"
        width="30"
        height="8"
        rx="2"
        className="fill-foreground/30"
      />
    </g>
  );
}
export function WaveHardware({ bare = false }: { bare?: boolean }) {
  return (
    <g>
      <path
        d="M0 0L15-14H180L165 0ZM165 0L180-14V68L165 82Z"
        className="fill-muted stroke-foreground/35"
      />
      <g transform="scale(1.5)">
        <WaveUnit x={0} y={0} />
      </g>
      {bare ? (
        <path d="M20 65H62" className="stroke-foreground/20" />
      ) : (
        <text
          x="18"
          y="69"
          fontSize="11"
          className="fill-muted-foreground"
          stroke="none"
          letterSpacing="1"
        >
          MT-WAVE
        </text>
      )}
      <circle
        cx="145"
        cy="64"
        r="4"
        className="fx-pulse fill-chart-2"
        style={delay(1.6)}
      />
    </g>
  );
}
export function ClientHardware({ bare = false }: { bare?: boolean }) {
  return (
    <g>
      <path
        d="M0 0L18-16H304L286 0ZM286 0L304-16V66L286 83Z"
        className="fill-muted stroke-foreground/35"
      />
      <g transform="scale(1.3)">
        <ClientModule x={0} y={0} radios={24} />
      </g>
      {!bare && (
        <text
          x="0"
          y="108"
          fontSize="12"
          letterSpacing="1"
          className="fill-muted-foreground"
          stroke="none"
        >
          MT-C24 · REAL CLIENT RADIOS
        </text>
      )}
    </g>
  );
}
// `live` draws the two traces as the page opens and marks the newest point.
export function Laptop({ live = false }: { live?: boolean }) {
  return (
    <g>
      <rect
        width="204"
        height="134"
        rx="9"
        className="fill-card stroke-foreground/40"
      />
      <rect
        x="9"
        y="9"
        width="186"
        height="115"
        rx="4"
        className="fill-surface-tint stroke-foreground/15"
      />
      <ScopeGrid x={23} y={31} width={157} height={74} columns={8} rows={4} />
      <path
        d="M9 28H195 M23 111H122 M23 116H83"
        className="stroke-foreground/15"
        strokeWidth={1}
      />
      <circle
        cx={102}
        cy={4.5}
        r={1.2}
        className="fill-foreground/40 stroke-none"
      />
      <g className="fill-brand/20 stroke-none">
        {[8, 13, 10, 17, 14, 20, 18].map((h, i) => (
          <rect
            key={i}
            x={143 + i * 5}
            y={119 - h / 2}
            width={3}
            height={h / 2}
            rx={0.5}
          />
        ))}
      </g>
      <path
        d="M-14 135H218L234 148H-30Z"
        className="fill-muted stroke-foreground/40"
      />
      <path d="M70 138H134" className="stroke-foreground/20" />
      <path
        d="M-10 142H56 M148 142H213 M78 143H126"
        className="stroke-foreground/20"
        strokeWidth={0.7}
      />
      <path
        d="M24 91L47 76L70 79L93 57L116 62L139 35L163 42L180 27V105H24Z"
        className="fill-brand/[0.05] stroke-none"
      />
      <g className="stroke-foreground/10">
        {[45, 68, 91].map((y) => (
          <path key={y} d={`M23 ${y}H180`} />
        ))}
      </g>
      <path
        d="M24 91L47 76L70 79L93 57L116 62L139 35L163 42L180 27"
        pathLength={1}
        className={`fill-none stroke-brand ${live ? "fx-draw-now" : "fx-draw"}`}
        style={delay(live ? 1.1 : 0.3)}
        strokeWidth="2.5"
      />
      <path
        d="M24 99L47 96L70 82L93 88L116 77L139 81L163 62L180 68"
        pathLength={1}
        className={`fill-none stroke-chart-2 ${live ? "fx-draw-now" : "fx-draw"}`}
        style={delay(live ? 1.3 : 0.5)}
        strokeWidth="2"
      />
      {live && (
        <circle
          cx="180"
          cy="27"
          r="4"
          className="fx-pulse fill-brand stroke-background"
          strokeWidth="2"
        />
      )}
      <circle cx="24" cy="21" r="2.5" className="fill-brand" />
      <path d="M34 21H72" className="stroke-foreground/25" />
    </g>
  );
}
export function ProductArt({ kind }: { kind: "system" | "clients" | "wave" }) {
  return (
    <svg
      aria-hidden
      viewBox={kind === "system" ? "0 0 600 390" : "0 0 540 280"}
      className="home-product-svg"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "system" ? (
        <>
          <ellipse
            cx="310"
            cy="340"
            rx="220"
            ry="22"
            className="fill-foreground/5"
          />
          <path
            d="M128 285H80V150H225M390 180H490V310H430"
            className="stroke-brand/50 motion-safe:animate-signal"
            strokeDasharray="5 7"
          />
          <g className="home-hardware">
            <g transform="translate(225 62)">
              <Chamber />
            </g>
            <g transform="translate(46 242) scale(.8)">
              <WaveHardware />
            </g>
            <g transform="translate(225 300) scale(.72)">
              <ClientHardware />
            </g>
          </g>
          <Attenuator x={490} y={250} vertical />
        </>
      ) : kind === "clients" ? (
        <>
          <g
            className="stroke-brand/45"
            strokeDasharray="1 11"
            strokeWidth={2.5}
          >
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${90 + i * 130} 42V85Q${90 + i * 130} 100 ${105 + i * 130} 100H400`}
                className="motion-safe:animate-signal"
              />
            ))}
          </g>
          <ellipse
            cx="270"
            cy="214"
            rx="180"
            ry="18"
            className="fill-foreground/5"
          />
          <g className="home-hardware">
            <g transform="translate(111 109) scale(1.1)">
              <ClientHardware />
            </g>
          </g>
        </>
      ) : (
        <>
          <g className="home-rf-arcs stroke-chart-2/45">
            {[60, 90, 120].map((r, index) => (
              <path
                key={r}
                d={`M${270 - r} 126a${r} ${r} 0 0 1 ${r * 2} 0`}
                className="fx-ripple"
                style={delay(index * 0.45)}
              />
            ))}
          </g>
          <ellipse
            cx="270"
            cy="222"
            rx="150"
            ry="18"
            className="fill-foreground/5"
          />
          <g className="home-hardware">
            <g transform="translate(163 124) scale(1.3)">
              <WaveHardware />
            </g>
          </g>
        </>
      )}
    </svg>
  );
}
// The report illustrates a workflow, rather than a measured result. Its two
// check marks are drawn when the section first comes into view.
export function EvidenceArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 520 470"
      className="home-evidence-svg"
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M80 220H50V384H125M410 220H460V384H380"
        className="stroke-brand/40 motion-safe:animate-signal"
        strokeDasharray="5 7"
      />
      <g className="home-evidence-sheet">
        <rect
          x="90"
          y="44"
          width="340"
          height="305"
          rx="16"
          className="fill-card stroke-foreground/20"
        />
        <path d="M90 96H430" className="stroke-foreground/10" />
        <circle cx="113" cy="70" r="4" className="fill-brand" />
        <text
          x="128"
          y="75"
          fontSize="14"
          className="fill-foreground"
          stroke="none"
        >
          A test worth repeating
        </text>
        <g transform="translate(147 122)">
          <Laptop />
        </g>
        <path
          d="M116 295H258M116 315H220"
          className="stroke-foreground/20"
          strokeWidth="5"
        />
        <path
          d="M305 298l10 10 22-25"
          pathLength={1}
          className="fx-draw stroke-chart-3"
          style={delay(1.2)}
          strokeWidth="3"
        />
      </g>
      <g className="home-evidence-record">
        <rect
          x="124"
          y="365"
          width="273"
          height="60"
          rx="12"
          className="fill-card stroke-foreground/25"
        />
        <rect
          x="139"
          y="380"
          width="30"
          height="30"
          rx="7"
          className="fill-brand/10 stroke-brand/40"
        />
        <path
          d="M148 395l5 5 9-11"
          pathLength={1}
          className="fx-draw stroke-brand"
          style={delay(1.6)}
        />
        <text
          x="182"
          y="391"
          fontSize="12"
          className="fill-foreground"
          stroke="none"
        >
          Configuration retained
        </text>
        <text
          x="182"
          y="409"
          fontSize="11"
          className="fill-muted-foreground"
          stroke="none"
        >
          Ready for the next firmware build
        </text>
      </g>
      <text
        x="260"
        y="457"
        textAnchor="middle"
        fontSize="11"
        className="fill-muted-foreground"
        stroke="none"
      >
        WORKFLOW ILLUSTRATION · NOT MEASURED DATA
      </text>
    </svg>
  );
}

import type { ApproachId } from "../_data/approaches";
import {
  CalibrationRing,
  DraftingGrid,
  Fastener,
  ScopeGrid,
} from "@/components/diagrams/detail";

function Radio({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M-12 -5L-16 -24M0 -5V-29M12 -5L16 -24"
        className="stroke-foreground/50"
        strokeWidth={2.5}
      />
      <rect
        x={-23}
        y={-5}
        width={46}
        height={22}
        rx={5}
        className="fill-background stroke-foreground/55"
      />
      <path d="M-17 1H17M2 9H16" className="stroke-foreground/20" />
      <circle cx={-14} cy={9} r={2} className="fill-link stroke-none" />
      <circle
        cx={-7}
        cy={9}
        r={1.5}
        className="fill-foreground/25 stroke-none"
      />
      <path d="M-19 21H19" className="stroke-foreground/15" />
    </g>
  );
}

function Performance() {
  return (
    <>
      <g className="solution-trace">
        {[32, 43, 54].map((r) => (
          <path
            key={r}
            d={`M${48 + r * 0.7} ${76 - r * 0.7}Q${48 + r * 1.15} 76 ${48 + r * 0.7} ${76 + r * 0.7}`}
            className="stroke-link/25"
          />
        ))}
        <Radio x={45} y={77} />
      </g>
      <rect
        x={132}
        y={20}
        width={151}
        height={110}
        rx={6}
        className="fill-background stroke-foreground/20"
      />
      <ScopeGrid x={146} y={35} width={122} height={69} columns={5} rows={3} />
      <path d="M146 104H268M146 104V35" className="stroke-foreground/30" />
      <path
        d="M148 43C179 43 185 61 205 66S239 93 266 96"
        className="solution-trace stroke-link"
        strokeWidth={2}
      />
      <path
        d="M148 55C179 55 185 73 205 78S239 102 266 104"
        className="stroke-link/25"
        strokeDasharray="3 4"
      />
      {[
        [155, 44],
        [181, 54],
        [207, 67],
        [233, 83],
        [259, 95],
      ].map(([x, y]) => (
        <circle
          key={x}
          cx={x}
          cy={y}
          r={2.5}
          className="fill-background stroke-link"
        />
      ))}
      <text
        x={146}
        y={120}
        className="fill-muted-foreground stroke-none font-mono text-[8px] tracking-wider"
      >
        THROUGHPUT / RANGE
      </text>
    </>
  );
}

function MultiLink() {
  return (
    <>
      <Radio x={36} y={75} />
      <g transform="translate(264 75)">
        <rect
          x={-17}
          y={-31}
          width={34}
          height={63}
          rx={7}
          className="fill-background stroke-foreground/50"
        />
        <rect
          x={-12}
          y={-20}
          width={24}
          height={40}
          rx={3}
          className="fill-link/[0.04] stroke-foreground/15"
        />
        <path d="M-4 -25H4M-5 26H5" className="stroke-foreground/30" />
      </g>
      {[38, 75, 112].map((y, i) => (
        <g
          key={y}
          className="solution-trace"
          style={{ transitionDelay: `${i * 35}ms` }}
        >
          <path
            d={`M65 ${y}H235`}
            className="stroke-link/30"
            strokeDasharray="2 5"
          />
          <path
            d={`M65 ${y + 5}V${y - 5}M235 ${y + 5}V${y - 5}`}
            className="stroke-foreground/20"
          />
          {[92, 132, 172].map((x, j) => (
            <rect
              key={x}
              x={x + (i % 2) * 12}
              y={y - 4}
              width={22 + (j % 2) * 6}
              height={8}
              rx={2}
              className={
                i === 1
                  ? "fill-link/15 stroke-link/50"
                  : "fill-link stroke-none"
              }
            />
          ))}
          <text
            x={74}
            y={y - 10}
            className="fill-muted-foreground stroke-none font-mono text-[8px]"
          >
            {["2.4 GHz", "5 GHz", "6 GHz"][i]}
          </text>
        </g>
      ))}
      <path
        d="M67 17H235M67 13V21M235 13V21"
        className="stroke-foreground/15"
      />
    </>
  );
}

function Coexistence() {
  return (
    <>
      <rect
        x={15}
        y={22}
        width={209}
        height={109}
        rx={6}
        className="fill-background stroke-foreground/20"
      />
      <ScopeGrid x={26} y={34} width={186} height={72} columns={10} rows={3} />
      <path d="M26 106H212" className="stroke-foreground/35" />
      <path
        d="M30 106L44 57Q46 51 53 51H103Q110 51 112 57L126 106Z"
        className="solution-trace fill-link/10 stroke-link"
        strokeWidth={1.8}
      />
      <path
        d="M99 106L113 64Q115 58 122 58H169Q176 58 178 64L192 106Z"
        className="stroke-link/30"
        strokeDasharray="3 3"
      />
      {[69, 87, 133, 151, 195].map((x, i) => (
        <g key={x} className="solution-trace">
          <path
            d={`M${x} 106V${43 + (i % 3) * 10}h4V106`}
            className="fill-chart-2/10 stroke-chart-2"
          />
          <circle
            cx={x + 2}
            cy={38 + (i % 3) * 10}
            r={1.5}
            className="fill-chart-2 stroke-none"
          />
        </g>
      ))}
      <text
        x={27}
        y={121}
        className="fill-muted-foreground stroke-none font-mono text-[8px] tracking-wider"
      >
        SHARED SPECTRUM
      </text>
      <path d="M224 76H238M235 73L238 76L235 79" className="stroke-link/50" />
      <Radio x={267} y={77} />
    </>
  );
}

function Radar() {
  return (
    <>
      <g className="solution-trace">
        <circle
          cx={62}
          cy={76}
          r={43}
          className="fill-background stroke-foreground/20"
        />
        <CalibrationRing x={62} y={76} radius={43} ticks={36} />
        {[14, 27, 36].map((r) => (
          <circle key={r} cx={62} cy={76} r={r} className="stroke-link/15" />
        ))}
        <path d="M62 40V112M26 76H98" className="stroke-foreground/10" />
        <path
          d="M62 76V40A36 36 0 0 1 96 64Z"
          className="fill-chart-2/10 stroke-chart-2/30"
        />
        <path d="M62 76L87 50" className="stroke-chart-2" />
        <circle cx={81} cy={57} r={3} className="fill-chart-2 stroke-none" />
        <circle cx={62} cy={76} r={3} className="fill-link stroke-none" />
      </g>
      <ScopeGrid x={125} y={36} width={160} height={67} columns={8} rows={3} />
      <path d="M125 103H285" className="stroke-foreground/25" />
      <path
        d="M126 95H137V47H144V95H158V47H165V95H179V47H186V95H201"
        className="solution-trace stroke-chart-2"
        strokeWidth={1.8}
      />
      <path d="M217 77H239L248 58H284M239 77H284" className="stroke-link" />
      <path d="M248 36V105" className="stroke-link/30" strokeDasharray="2 4" />
      <text
        x={126}
        y={121}
        className="fill-muted-foreground stroke-none font-mono text-[8px] tracking-wider"
      >
        DETECT → CHANNEL MOVE
      </text>
    </>
  );
}

function Mesh() {
  return (
    <>
      <path
        d="M47 55L150 32L253 55M47 55Q150 99 253 55"
        className="stroke-link/25"
        strokeDasharray="3 5"
      />
      {[
        [47, 55],
        [150, 32],
        [253, 55],
      ].map(([x, y]) => (
        <g key={x} className="solution-trace">
          <circle cx={x} cy={y} r={31} className="stroke-link/15" />
          <g transform={`translate(${x} ${y}) scale(0.55)`}>
            <Radio x={0} y={0} />
          </g>
        </g>
      ))}
      <path
        d="M47 72Q65 123 124 119M171 119Q232 125 253 73"
        className="stroke-link"
        strokeDasharray="4 5"
      />
      <path d="M117 115L124 119L118 124" className="stroke-link" />
      <g className="solution-trace">
        <rect
          x={137}
          y={93}
          width={25}
          height={41}
          rx={5}
          className="fill-background stroke-foreground/50"
        />
        <path d="M145 98H154M146 128H153" className="stroke-foreground/20" />
        <rect
          x={141}
          y={103}
          width={17}
          height={19}
          rx={2}
          className="fill-link/[0.06] stroke-link/20"
        />
      </g>
      <path
        d="M139 88Q149 77 160 88M143 91Q149 84 156 91"
        className="stroke-link/50"
      />
    </>
  );
}

function Automation() {
  return (
    <>
      <rect
        x={27}
        y={14}
        width={246}
        height={109}
        rx={7}
        className="fill-background stroke-foreground/35"
      />
      <path d="M27 32H273M126 32V123" className="stroke-foreground/15" />
      {[39, 47, 55].map((x) => (
        <circle
          key={x}
          cx={x}
          cy={23}
          r={1.5}
          className="fill-foreground/25 stroke-none"
        />
      ))}
      <text
        x={258}
        y={26}
        textAnchor="end"
        className="fill-muted-foreground stroke-none font-mono text-[8px]"
      >
        TEST / REPLAY
      </text>
      {[48, 70, 92].map((y, i) => (
        <g
          key={y}
          className="solution-trace"
          style={{ transitionDelay: `${i * 35}ms` }}
        >
          <rect
            x={39}
            y={y - 4}
            width={9}
            height={9}
            rx={2}
            className="fill-link/[0.06] stroke-link/25"
          />
          <path d={`M41 ${y}l2 2 4-5`} className="stroke-link" />
          <path
            d={`M57 ${y}H109M57 ${y + 6}H91`}
            className="stroke-foreground/20"
          />
        </g>
      ))}
      <ScopeGrid x={139} y={43} width={120} height={58} columns={6} rows={3} />
      <path
        d="M141 89L153 80L164 84L177 60L190 68L202 51L214 59L227 47L239 51L257 42"
        className="solution-trace stroke-link"
        strokeWidth={1.8}
      />
      <path
        d="M141 96L164 91L177 79L202 84L227 70L257 68"
        className="stroke-link/25"
        strokeDasharray="3 4"
      />
      <path
        d="M139 110H165M173 110H199M207 110H234"
        className="stroke-foreground/20"
      />
      <path
        d="M112 123L106 136H194L188 123M97 137H203"
        className="stroke-foreground/30"
      />
      <Fastener x={32} y={118} r={1.5} />
      <Fastener x={268} y={118} r={1.5} />
    </>
  );
}

const MOTIFS = {
  "performance-and-range": Performance,
  "wifi-7-and-mlo": MultiLink,
  "coexistence-and-interference": Coexistence,
  "radar-and-dfs": Radar,
  "mesh-and-roaming": Mesh,
  "automation-and-diagnosis": Automation,
} satisfies Record<ApproachId, () => React.ReactNode>;

export function TestMotif({ kind }: { kind: ApproachId }) {
  const Drawing = MOTIFS[kind];
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 150"
      className="solution-motif h-36 w-full"
      fill="none"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <DraftingGrid width={300} height={150} step={20} />
      <Drawing />
    </svg>
  );
}

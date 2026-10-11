import type { Guide } from "../_data/guides";
import { DraftingGrid, ScopeGrid } from "@/components/diagrams/detail";

export function ResourceGraphic({ kind }: { kind: Guide["graphic"] }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 140"
      className="resource-graphic h-32 w-full"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <DraftingGrid width={320} height={140} step={20} />
      {kind === "planning" && (
        <>
          <path d="M60 70H260" className="stroke-foreground/20" />
          {[60, 160, 260].map((x, index) => (
            <g
              key={x}
              className="resource-graphic-part"
              style={{ transitionDelay: `${index * 45}ms` }}
            >
              <rect
                x={x - 27}
                y={42}
                width={54}
                height={56}
                rx={12}
                className="fill-background stroke-foreground/35"
              />
              <path
                d={`M${x - 8} 70l6 6 12-13`}
                className={index === 2 ? "stroke-chart-2" : "stroke-brand"}
                strokeWidth={2.5}
              />
              <path
                d={`M${x - 16} 88 h20 m-20 4 h32 M${x - 16} 51h10`}
                className="stroke-foreground/20"
                strokeWidth={1}
              />
              <circle
                cx={x + 15}
                cy={52}
                r={2}
                className="fill-brand/30 stroke-none"
              />
            </g>
          ))}
        </>
      )}
      {kind === "interference" && (
        <>
          <ScopeGrid
            x={20}
            y={24}
            width={280}
            height={88}
            columns={14}
            rows={4}
          />
          <path
            d="M20 108l8 -2 7 3 8 -1 6 2 9 -3 7 1 8 -2 7 4 8 -2 9 1 7 -2 8 3 8 -2 7 1 9 -2 7 3 8 -1 8 2 7 -3 8 1 7 -2 8 3 9 -1 7 2 8 -3 8 2 7 -1 9 2 8 -3 8 1 8 -2 9 3 8 -1 7 2 8 -3 8 1 7 -2 8 3"
            className="stroke-foreground/25"
            strokeWidth={0.8}
          />
          <path
            d="M20 112H300"
            className="stroke-foreground/20"
            strokeWidth={1}
          />
          <path
            d="M28 112L36 46Q38 36 48 36H116Q126 36 128 46L136 112Z"
            className="resource-graphic-part fill-brand/15 stroke-brand"
          />
          {[158, 177, 196].map((x, index) => (
            <path
              key={x}
              d={`M${x} 112V${50 + index * 10}`}
              className="resource-graphic-part stroke-chart-2"
              strokeWidth={4}
              style={{ transitionDelay: `${index * 45}ms` }}
            />
          ))}
          <path
            d="M218 112C230 112 230 54 242 54S254 112 266 112"
            className="resource-graphic-part stroke-chart-2"
          />
          <path
            d="M276 112V74L284 66L292 79L300 70V112"
            className="resource-graphic-part stroke-chart-2/70"
          />
        </>
      )}
      {kind === "results" && (
        <>
          <ScopeGrid
            x={28}
            y={20}
            width={268}
            height={96}
            columns={8}
            rows={3}
          />
          <path
            d="M40 35H100L140 46L180 68L220 82L282 94V108L220 98L180 82L140 60L100 53H40Z"
            className="fill-brand/[0.06] stroke-none"
          />
          <path
            d="M28 20V116H296"
            className="stroke-foreground/25"
            strokeWidth={1.5}
          />
          {[44, 76].map((y) => (
            <path
              key={y}
              d={`M28 ${y}H296`}
              className="stroke-foreground/10"
              strokeWidth={1}
            />
          ))}
          <path
            d="M40 35H100L140 46L180 68L220 82L282 94"
            className="resource-graphic-part stroke-brand"
          />
          <path
            d="M40 53H100L140 60L180 82L220 98L282 108"
            className="resource-graphic-part stroke-chart-2"
          />
          {[40, 100, 140, 180, 220, 282].map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy={[35, 35, 46, 68, 82, 94][index]}
              r={3}
              className="resource-graphic-part fill-background stroke-brand"
            />
          ))}
          {[40, 100, 140, 180, 220, 282].map((x, index) => (
            <path
              key={x}
              d={`M${x} ${[35, 35, 46, 68, 82, 94][index] - 6} v12 m-3 -12h6 m-6 12h6`}
              className="stroke-brand/40"
              strokeWidth={0.8}
            />
          ))}
        </>
      )}
    </svg>
  );
}

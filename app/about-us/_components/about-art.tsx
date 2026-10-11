import { CalibrationRing } from "@/components/diagrams/detail";

// A shared origin and several connected paths illustrate the vision without
// representing countries, customer locations or measured network data.
export function VisionArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 420 360"
      className="block size-full"
      fill="none"
      strokeWidth={1.25}
      strokeLinecap="round"
    >
      <path
        d="M210 20V42 M210 318V340 M50 180H72 M348 180H370"
        className="stroke-foreground/20"
      />
      <circle cx={210} cy={180} r={138} className="stroke-foreground/10" />
      <CalibrationRing x={210} y={180} radius={138} ticks={64} />
      <circle
        cx={210}
        cy={180}
        r={104}
        className="stroke-brand/15"
        strokeDasharray="2 6"
      />
      <ellipse
        cx={210}
        cy={180}
        rx={138}
        ry={53}
        transform="rotate(-35 210 180)"
        className="stroke-brand/40"
      />
      <ellipse
        cx={210}
        cy={180}
        rx={138}
        ry={53}
        transform="rotate(35 210 180)"
        className="stroke-brand/40"
      />
      <ellipse cx={210} cy={180} rx={57} ry={138} className="stroke-brand/30" />
      <path
        d="M105 92L210 180L323 107 M210 180L268 286 M210 180L100 250"
        className="stroke-brand/20"
        strokeDasharray="3 5"
      />
      <circle
        cx={210}
        cy={180}
        r={38}
        className="fill-background stroke-brand/50"
      />
      <circle
        cx={210}
        cy={180}
        r={30}
        className="fill-brand/[0.05] stroke-brand/15"
      />
      <path
        d="M191 177Q210 154 229 177 M198 184Q210 170 222 184 M205 191Q210 185 215 191"
        className="stroke-brand"
        strokeWidth={2}
      />
      <circle cx={210} cy={198} r={2.5} className="fill-brand stroke-none" />
      {[
        [105, 92],
        [323, 107],
        [268, 286],
        [100, 250],
        [210, 42],
      ].map(([x, y], i) => (
        <g key={x}>
          <circle
            cx={x}
            cy={y}
            r={i < 3 ? 11 : 7}
            className="fill-background stroke-brand/40"
          />
          <circle
            cx={x}
            cy={y}
            r={i < 3 ? 4 : 2.5}
            className="fill-brand stroke-none"
          />
          {i < 3 && <circle cx={x} cy={y} r={17} className="stroke-brand/15" />}
        </g>
      ))}
    </svg>
  );
}

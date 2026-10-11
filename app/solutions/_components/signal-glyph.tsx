import type { ApproachId } from "../_data/approaches";

// Compact signal signatures shared by the lab's six instrument displays.
export function SignalGlyph({ kind }: { kind: ApproachId }) {
  switch (kind) {
    case "performance-and-range":
      return (
        <>
          <path d="M0 30H76 M0 30V0" className="stroke-foreground/20" />
          <path d="M4 5C24 5 28 13 39 15S57 25 72 27" className="stroke-link" />
          {[8, 24, 40, 56, 72].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={[5, 9, 15, 22, 27][i]}
              r={2}
              className="fill-link stroke-none"
            />
          ))}
        </>
      );
    case "wifi-7-and-mlo":
      return (
        <>
          {[5, 17, 29].map((y, i) => (
            <g key={y}>
              <path d={`M0 ${y}H76`} className="stroke-foreground/15" />
              {[0, 1, 2].map((j) => (
                <rect
                  key={j}
                  x={6 + j * 24 + (i % 2) * 5}
                  y={y - 3}
                  width={14 + (j % 2) * 3}
                  height={6}
                  rx={2}
                  className={
                    i === 1
                      ? "fill-link/20 stroke-link/50"
                      : "fill-link stroke-none"
                  }
                />
              ))}
            </g>
          ))}
        </>
      );
    case "coexistence-and-interference":
      return (
        <>
          <path d="M0 30H76" className="stroke-foreground/20" />
          <path
            d="M4 30L12 9Q13 6 17 6H39Q43 6 44 9L52 30Z"
            className="fill-link/10 stroke-link"
          />
          {[27, 38, 58, 67].map((x, i) => (
            <path
              key={x}
              d={`M${x} 30v${-14 - (i % 2) * 10}`}
              className="stroke-chart-2"
              strokeWidth={2}
            />
          ))}
        </>
      );
    case "radar-and-dfs":
      return (
        <>
          <path d="M0 30H76" className="stroke-foreground/20" />
          <path
            d="M2 26H8V4H13V26H23V4H28V26H38V4H43V26H74"
            className="stroke-chart-2"
          />
          <path d="M54 6H74M64 3L74 6L64 9" className="stroke-link" />
        </>
      );
    case "mesh-and-roaming":
      return (
        <>
          <path
            d="M7 23L36 6L68 23M7 23H68"
            className="stroke-link/40"
            strokeDasharray="3 4"
          />
          {[
            [7, 23],
            [36, 6],
            [68, 23],
          ].map(([x, y]) => (
            <g key={x}>
              <circle
                cx={x}
                cy={y}
                r={6}
                className="fill-background stroke-link"
              />
              <circle cx={x} cy={y} r={2} className="fill-link stroke-none" />
            </g>
          ))}
        </>
      );
    case "automation-and-diagnosis":
      return (
        <>
          {[5, 16, 27].map((y) => (
            <g key={y}>
              <path d={`M1 ${y}l3 3 5-6`} className="stroke-link" />
              <path d={`M16 ${y}H30`} className="stroke-foreground/25" />
            </g>
          ))}
          <path
            d="M39 28L47 22L54 25L61 10L68 14L75 3"
            className="stroke-link"
          />
        </>
      );
  }
}

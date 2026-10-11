// Small, static details shared by the SVG illustrations. All colors follow
// the current theme; decorative geometry never adds interaction or motion.
export function Fastener({
  x,
  y,
  r = 2,
}: {
  x: number;
  y: number;
  r?: number;
}) {
  return (
    <g strokeWidth={0.7} className="fill-muted stroke-foreground/35">
      <circle cx={x} cy={y} r={r} />
      <path d={`M${x - r * 0.45} ${y + r * 0.45} l${r * 0.9} ${-r * 0.9}`} />
    </g>
  );
}

export function Vents({
  x,
  y,
  count = 6,
  height = 8,
  step = 4,
}: {
  x: number;
  y: number;
  count?: number;
  height?: number;
  step?: number;
}) {
  return (
    <path
      className="fill-none stroke-foreground/25"
      strokeWidth={1}
      d={Array.from(
        { length: count },
        (_, i) => `M${x + i * step} ${y} v${height}`,
      ).join(" ")}
    />
  );
}

export function ScopeGrid({
  x,
  y,
  width,
  height,
  columns = 6,
  rows = 3,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  columns?: number;
  rows?: number;
}) {
  return (
    <path
      className="fill-none stroke-foreground/10"
      strokeWidth={0.6}
      d={[
        ...Array.from(
          { length: columns + 1 },
          (_, i) => `M${x + (i * width) / columns} ${y} v${height}`,
        ),
        ...Array.from(
          { length: rows + 1 },
          (_, i) => `M${x} ${y + (i * height) / rows} h${width}`,
        ),
      ].join(" ")}
    />
  );
}

export function DraftingGrid({
  width,
  height,
  step = 40,
}: {
  width: number;
  height: number;
  step?: number;
}) {
  // Crosses leave more breathing room than a continuous blueprint grid.
  return (
    <path
      aria-hidden
      className="pointer-events-none fill-none stroke-foreground/[0.09]"
      strokeWidth={0.8}
      d={Array.from({ length: Math.floor(width / step) }, (_, col) =>
        Array.from(
          { length: Math.floor(height / step) },
          (_, row) =>
            `M${col * step + step / 2 - 2} ${row * step + step / 2} h4 m-2 -2 v4`,
        ).join(" "),
      ).join(" ")}
    />
  );
}

export function CalibrationRing({
  x,
  y,
  radius,
  ticks = 48,
}: {
  x: number;
  y: number;
  radius: number;
  ticks?: number;
}) {
  return (
    <g
      aria-hidden
      transform={`translate(${x} ${y})`}
      className="pointer-events-none fill-none stroke-foreground/20"
      strokeWidth={0.8}
    >
      {Array.from({ length: ticks }, (_, i) => (
        <path
          key={i}
          d={`M0 ${-radius} v${i % 4 === 0 ? 7 : 3}`}
          transform={`rotate(${(i * 360) / ticks})`}
        />
      ))}
    </g>
  );
}

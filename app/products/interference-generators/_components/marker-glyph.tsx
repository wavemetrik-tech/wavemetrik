import type { MarkerShape } from "../_data/sample-test-results";

// Five-point star in the 12 × 12 marker box, centered like the other shapes.
const STAR_POINTS = Array.from({ length: 10 }, (_, i) => {
  const radius = i % 2 === 0 ? 5.4 : 2.5;
  const angle = ((-90 + i * 36) * Math.PI) / 180;
  return `${(6 + radius * Math.cos(angle)).toFixed(2)},${(6.3 + radius * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

// A traffic class's marker, drawn in a 12 × 12 box centered on (6, 6). The
// ring is the color of the surface behind it, so overlapping markers stay
// apart.
export function MarkerGlyph({
  shape,
  color,
  ring = "var(--background)",
}: {
  shape: MarkerShape;
  color: string;
  ring?: string;
}) {
  const paint = {
    fill: color,
    stroke: ring,
    strokeWidth: 1.5,
    strokeLinejoin: "round",
    paintOrder: "stroke",
  } as const;

  switch (shape) {
    case "circle":
      return <circle cx={6} cy={6} r={4} {...paint} />;
    case "square":
      return <rect x={2.5} y={2.5} width={7} height={7} rx={0.75} {...paint} />;
    case "triangle":
      return <polygon points="6,0.8 10.8,8.8 1.2,8.8" {...paint} />;
    case "star":
      return <polygon points={STAR_POINTS} {...paint} />;
  }
}

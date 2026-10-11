// A small RF link study, drawn in the surrounding surface's text color.
export function CtaArt({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 360 190"
      className={`block h-auto w-full ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g opacity={0.12}>
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${15 + i * 30} 20v150`} />
        ))}
        {[30, 60, 90, 120, 150].map((y) => (
          <path key={y} d={`M15 ${y}H345`} />
        ))}
      </g>
      <path
        d="M70 94C126 94 126 48 180 48S237 94 291 94M70 102H291M70 110C126 110 126 156 180 156S237 110 291 110"
        opacity={0.3}
      />
      <path
        d="M70 94C126 94 126 48 180 48S237 94 291 94M70 110C126 110 126 156 180 156S237 110 291 110"
        strokeDasharray="1 11"
        strokeWidth={2.5}
        className="motion-safe:animate-signal"
        opacity={0.8}
      />
      <path
        d="M96 102H132L144 86L158 119L175 77L192 127L207 89L219 102H268"
        strokeWidth={1.6}
        opacity={0.8}
      />
      <g opacity={0.7}>
        <rect x={22} y={78} width={49} height={46} rx={7} />
        <path d="M28 86H65M28 116H65M32 78V59M45 78V52M58 78V59" />
        <circle cx={33} cy={101} r={2} fill="currentColor" stroke="none" />
        <path d="M41 101H61" />
        <path d="M28 129H65" />
      </g>
      <g opacity={0.7}>
        <rect x={291} y={78} width={49} height={46} rx={7} />
        <path d="M297 86H334M297 116H334" />
        <circle cx={315} cy={101} r={9} />
        <circle cx={315} cy={101} r={3} fill="currentColor" stroke="none" />
        <path d="M297 129H334" />
      </g>
      {[31, 43].map((r) => (
        <path
          key={r}
          d={`M${315 - r * 0.6} ${75 - r * 0.3}Q315 ${46 - r * 0.4} ${315 + r * 0.6} ${75 - r * 0.3}`}
          opacity={r === 31 ? 0.45 : 0.2}
        />
      ))}
      {[
        { x: 180, y: 48 },
        { x: 180, y: 156 },
      ].map((p) => (
        <g key={p.y}>
          <circle cx={p.x} cy={p.y} r={4} opacity={0.5} />
          <circle
            cx={p.x}
            cy={p.y}
            r={1.5}
            fill="currentColor"
            stroke="none"
            className="fx-pulse"
          />
        </g>
      ))}
      <path
        d="M106 32H158M202 32H254M106 170H158M202 170H254"
        strokeDasharray="2 5"
        opacity={0.25}
      />
    </svg>
  );
}

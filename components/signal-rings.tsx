// Signal rings spreading from the top right corner of whatever they are
// placed in: the motif on the brand-blue tiles. They fade out toward the
// left, where the tile's text is. The parent needs `relative
// overflow-hidden`, and its content `relative` to sit above them.
export function SignalRings() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 480 320"
      preserveAspectRatio="xMaxYMin slice"
      className="absolute inset-0 size-full mask-l-from-35%"
      fill="none"
    >
      <g className="stroke-white/15" strokeWidth={0.8}>
        {Array.from({ length: 19 }, (_, i) => (
          <path key={i} d="M480 0H34" transform={`rotate(${-i * 5} 480 0)`} />
        ))}
      </g>
      <circle
        cx={480}
        cy={0}
        r={168}
        className="stroke-white/30"
        strokeWidth={5}
        strokeDasharray="1 13"
      />
      <circle
        cx={480}
        cy={0}
        r={336}
        className="stroke-white/20"
        strokeWidth={1}
        strokeDasharray="3 8"
      />
      {Array.from({ length: 8 }, (_, index) => (
        <circle
          key={index}
          cx={480}
          cy={0}
          r={56 + index * 56}
          strokeWidth={1.5}
          className="fx-ripple stroke-white/25"
          style={
            {
              "--fx-delay": `${index * 0.35}s`,
              "--fx-rest": 0.55,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}

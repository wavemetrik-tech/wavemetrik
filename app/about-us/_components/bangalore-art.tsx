// A stylized skyline for the "Based in Bangalore" tile: a domed civic hall
// among office towers and trees, drawn in white on the brand blue, with a
// signal rising from one roof. It evokes the city; it is not a rendering of
// a particular building.

// Faces, from the farthest row to the nearest. They are solid, so each row
// hides the one behind it.
const FAR = "#1a63b2";
const TOWER = "#0f529d";
const HALL = "#0c4689";
const TREE = "#2a70bd";

const delay = (seconds: number) =>
  ({ "--fx-delay": `${seconds}s`, "--fx-rest": 0.4 }) as React.CSSProperties;

// A tower's windows: short strokes in rows, a few of them lit.
function Windows({
  x,
  y,
  columns,
  rows,
  lit,
}: {
  x: number;
  y: number;
  columns: number;
  rows: number;
  lit: number[];
}) {
  return (
    <g stroke="none" fill="#fff">
      {Array.from({ length: rows * columns }, (_, i) => (
        <rect
          key={i}
          x={x + (i % columns) * 11}
          y={y + Math.floor(i / columns) * 12}
          width={6}
          height={5}
          rx={1}
          opacity={lit.includes(i) ? 0.85 : 0.22}
        />
      ))}
    </g>
  );
}

// A tree: a round crown on a short trunk standing on the ground line.
function Tree({ x, r }: { x: number; r: number }) {
  return (
    <g>
      <path d={`M${x} ${232 - r}V232`} opacity={0.5} />
      <circle cx={x} cy={228 - r} r={r} fill={TREE} />
    </g>
  );
}

export function BangaloreArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 12 480 244"
      className="about-origin-art"
      fill="none"
      stroke="#fff"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* The sky: a dotted arc over the city, and the signal from the mast. */}
      <path
        d="M40 232a200 200 0 0 1 400 0"
        strokeDasharray="1 9"
        opacity={0.22}
      />
      <g strokeWidth={1.1}>
        {[13, 25, 38].map((r, index) => (
          <circle
            key={r}
            cx={392}
            cy={58}
            r={r}
            strokeOpacity={0.55 - index * 0.14}
            className="fx-ripple"
            style={delay(index * 0.45)}
          />
        ))}
      </g>

      {/* The far row of buildings, as plain shapes. */}
      <g stroke="none" fill={FAR}>
        <rect x={6} y={138} width={30} height={94} rx={2} />
        <rect x={104} y={118} width={34} height={114} rx={2} />
        <rect x={176} y={96} width={36} height={136} rx={2} />
        <rect x={296} y={108} width={48} height={124} rx={2} />
        <rect x={438} y={128} width={36} height={104} rx={2} />
      </g>

      {/* Office towers on both sides. */}
      <g fill={TOWER} strokeOpacity={0.6}>
        <rect x={26} y={160} width={36} height={72} rx={2} />
        <rect x={60} y={104} width={44} height={128} rx={2} />
        <path d="M70 104V97H94V104" />
        <rect x={346} y={142} width={28} height={90} rx={2} />
        <rect x={372} y={96} width={40} height={136} rx={2} />
        <path d="M380 96V88H404V96" />
        <rect x={412} y={152} width={38} height={80} rx={2} />
      </g>
      <Windows x={33} y={170} columns={2} rows={4} lit={[1, 4]} />
      <Windows x={68} y={114} columns={3} rows={9} lit={[2, 7, 12, 16, 23]} />
      <Windows x={380} y={106} columns={3} rows={9} lit={[0, 5, 10, 19, 24]} />
      <Windows x={420} y={162} columns={2} rows={5} lit={[0, 3, 8]} />

      {/* The mast and its light. */}
      <path d="M392 88V62" strokeOpacity={0.8} />
      <circle
        cx={392}
        cy={58}
        r={3}
        fill="#fff"
        stroke="none"
        className="fx-pulse"
      />

      {/* The hall: steps, a colonnade between two wings, and a dome on its
          drum. */}
      <g fill={HALL} strokeOpacity={0.92}>
        {/* Wings, each with a small dome. */}
        <path d="M132 180C132 168 139 162 146 162S160 168 160 180Z" />
        <path d="M320 180C320 168 327 162 334 162S348 168 348 180Z" />
        <path d="M146 162V155 M334 162V155" />
        <rect x={120} y={180} width={52} height={34} />
        <rect x={308} y={180} width={52} height={34} />
        {/* The upper floor, drum and dome. */}
        <rect x={196} y={134} width={88} height={28} />
        <rect x={214} y={114} width={52} height={20} />
        <path d="M212 114C212 88 225 74 240 74S268 88 268 114Z" />
        <rect x={235} y={66} width={10} height={8} rx={1} />
        <path d="M240 66V54" />
        {/* The colonnade and its pediment. */}
        <rect x={172} y={168} width={136} height={46} />
        <rect x={166} y={160} width={148} height={8} />
        <path d="M206 160L240 145L274 160Z" />
        {/* Steps. */}
        <rect x={164} y={214} width={152} height={6} />
        <rect x={156} y={220} width={168} height={6} />
        <rect x={148} y={226} width={184} height={6} />
      </g>
      <circle cx={240} cy={52} r={2.2} fill="#fff" stroke="none" />
      {/* Details: ribs on the dome, the drum's openings, columns, windows. */}
      <g strokeOpacity={0.45} strokeWidth={1}>
        <path d="M240 74V114 M226 114C226 94 232 80 240 74 M254 114C254 94 248 80 240 74" />
        <path d="M222 119V129 M231 119V129 M240 119V129 M249 119V129 M258 119V129" />
        <path d="M206 141V155 M219 141V155 M232 141V155 M248 141V155 M261 141V155 M274 141V155" />
      </g>
      <g strokeOpacity={0.85} strokeWidth={2.2}>
        {[184, 200, 216, 232, 248, 264, 280, 296].map((x) => (
          <path key={x} d={`M${x} 176V209`} />
        ))}
      </g>
      <path d="M178 173H302 M178 211H302" strokeOpacity={0.5} strokeWidth={1} />
      <g strokeOpacity={0.6} strokeWidth={1}>
        {[130, 146, 162, 318, 334, 350].map((x) => (
          <path key={x} d={`M${x - 3} 206V195a3 3 0 0 1 6 0V206`} />
        ))}
      </g>

      {/* Trees in front of the wings. */}
      <Tree x={110} r={12} />
      <Tree x={93} r={8} />
      <Tree x={370} r={12} />
      <Tree x={387} r={8} />

      {/* The ground, with the site's frequency scale under it. */}
      <path d="M14 232H466" strokeOpacity={0.7} />
      <g strokeOpacity={0.3} strokeWidth={1}>
        {Array.from({ length: 45 }, (_, i) => (
          <path key={i} d={`M${20 + i * 10} 240v${i % 5 === 0 ? 8 : 4}`} />
        ))}
      </g>
    </svg>
  );
}

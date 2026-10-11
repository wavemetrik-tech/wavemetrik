// An abstract city and its connected engineering spaces, rather than a map
// or an architectural rendering of a particular building.
export function BangaloreArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 480 300"
      className="about-origin-art"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g opacity={0.16}>
        {[64, 104, 144].map((r) => (
          <circle key={r} cx={247} cy={170} r={r} />
        ))}
        <path d="M247 15V33 M247 278V292 M83 170H99 M395 170H411" />
        <circle cx={247} cy={170} r={150} strokeDasharray="1 8" />
      </g>
      <g opacity={0.28}>
        <path d="M20 234H94Q106 234 106 246V262H190Q202 262 202 274V292 M460 238H386Q374 238 374 250V274H292V298 M42 106H92Q104 106 104 118V142 M444 84H376Q364 84 364 96V129" />
        <path d="M64 284H142V274H169 M338 290V282H421 M44 91H73 M399 69H429" />
        {[
          [42, 106],
          [444, 84],
          [64, 284],
          [421, 282],
          [20, 234],
          [460, 238],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={3} />
        ))}
      </g>
      <g className="fill-brand" opacity={0.8}>
        <path d="M63 217V165H108V217 M69 165V154H102V165 M120 217V129H170V217 M127 129V119H163V129 M325 217V155H377V217 M331 155V145H371V155 M389 217V181H417V217" />
        <path d="M187 217V149H307V217 M196 149V138H298V149 M211 138V114H283V138 M224 114V102Q247 73 270 102V114 M247 81V64 M237 76H257" />
        <path d="M181 217H313V224H181Z M174 224H320V231H174Z M47 231H435" />
        <path d="M194 165H300 M194 196H300 M211 123H283 M229 108H265" />
        {[202, 222, 242, 262, 282].map((x) => (
          <path
            key={x}
            d={`M${x} 171v36 m5 -36v36 M${x - 2} 168h9 M${x - 2} 210h9`}
          />
        ))}
        {[80, 93, 135, 151, 341, 357, 400].map((x, i) => (
          <path
            key={x}
            d={`M${x} ${i < 2 ? 178 : i < 4 ? 145 : i < 6 ? 170 : 191} v6 m0 9v6`}
            opacity={0.6}
          />
        ))}
      </g>
      <g opacity={0.5}>
        <path d="M106 241H169Q181 241 181 253V280 M374 245H329Q317 245 317 257V281 M207 244H287" />
        <circle cx={247} cy={244} r={7} className="fill-brand" />
        <circle cx={247} cy={244} r={2} fill="currentColor" stroke="none" />
        <circle cx={181} cy={280} r={3} />
        <circle cx={317} cy={281} r={3} />
      </g>
      <g transform="translate(365 64)">
        <circle r={17} opacity={0.2} />
        <circle r={10} opacity={0.4} />
        <circle r={3} fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

// From slide 18 of the capabilities deck (content/wavemetrik-presentation.md).
// The timelines are schematic: they show which link is busy when, not
// measured traffic.

type Block = { link: 0 | 1; from: number; to: number; role?: "TX" | "RX" };

const MODES: {
  name: string;
  behavior: string;
  evidence: string;
  blocks: Block[];
}[] = [
  {
    name: "eMLSR",
    behavior:
      "Link selection and switching with one active data exchange at a time",
    evidence: "Negotiated mode, link changes and interruption time",
    // One link at a time: the blocks never overlap.
    blocks: [
      { link: 0, from: 52, to: 92 },
      { link: 1, from: 100, to: 138 },
      { link: 0, from: 146, to: 182 },
      { link: 1, from: 190, to: 224 },
    ],
  },
  {
    name: "MLMR",
    behavior: "Multiple radios operating across affiliated links",
    evidence: "Per-link traffic, aggregate throughput and cross-link activity",
    // Both links carry traffic side by side.
    blocks: [
      { link: 0, from: 52, to: 112 },
      { link: 1, from: 62, to: 128 },
      { link: 0, from: 124, to: 196 },
      { link: 1, from: 142, to: 224 },
    ],
  },
  {
    name: "STR",
    behavior: "Simultaneous transmit and receive across an eligible link pair",
    evidence:
      "Negotiated capability and overlapping TX/RX activity for the same client",
    // Transmit on one link while receiving on the other.
    blocks: [
      { link: 0, from: 52, to: 122, role: "TX" },
      { link: 1, from: 76, to: 146, role: "RX" },
      { link: 0, from: 150, to: 212, role: "TX" },
      { link: 1, from: 168, to: 224, role: "RX" },
    ],
  },
];

const LANES = [44, 92];
const LABEL = "text-footnote text-muted-foreground";

function Timeline({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      <svg aria-hidden viewBox="0 0 240 136" className="mlo-timeline w-full">
        {LANES.map((y, lane) => (
          <g key={y}>
            <text
              x={12}
              y={y + 3.5}
              fontSize={10}
              className="fill-muted-foreground font-medium"
            >
              Link {lane + 1}
            </text>
            <line
              x1={48}
              x2={228}
              y1={y}
              y2={y}
              className="stroke-foreground/20"
            />
          </g>
        ))}
        {blocks.map((block) => {
          const y = LANES[block.link] - 12;
          const receive = block.role === "RX";
          return (
            <g key={`${block.link}-${block.from}`} className="mlo-block">
              <rect
                x={block.from}
                y={y}
                width={block.to - block.from}
                height={24}
                rx={6}
                strokeWidth={1.5}
                className={
                  receive
                    ? "fill-brand/15 stroke-brand"
                    : "fill-brand stroke-brand"
                }
              />
              {block.role && (
                <text
                  x={(block.from + block.to) / 2}
                  y={y + 15.5}
                  fontSize={9}
                  textAnchor="middle"
                  className={`font-semibold ${receive ? "fill-foreground" : "fill-white"}`}
                >
                  {block.role}
                </text>
              )}
            </g>
          );
        })}
        {/* Now, moving along the time axis. */}
        <line
          x1={48}
          x2={48}
          y1={22}
          y2={112}
          strokeWidth={1.5}
          strokeLinecap="round"
          className="fx-sweep stroke-foreground/45 opacity-0"
          style={{ "--fx-sweep": "180px" } as React.CSSProperties}
        />
        <text
          x={228}
          y={126}
          fontSize={10}
          textAnchor="end"
          className="fill-muted-foreground font-medium"
        >
          Time
        </text>
      </svg>
    </div>
  );
}

export function MloModes() {
  return (
    <section
      id="mlo-modes"
      aria-labelledby="mlo-modes-heading"
      className="page-section"
    >
      <header className="max-w-2xl">
        <h2 id="mlo-modes-heading" className="section-heading">
          MLO operating modes and test objectives
        </h2>
        <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
          Mode negotiation and packet timing determine which multi-link behavior
          a run demonstrates.
        </p>
      </header>

      <ul className="mt-10 grid gap-x-8 gap-y-14 sm:mt-14 lg:grid-cols-3">
        {MODES.map((mode) => (
          <li key={mode.name}>
            <div className="surface-panel rounded-3xl bg-muted p-4">
              <Timeline blocks={mode.blocks} />
            </div>
            <h3 className="mt-6 text-title-3 font-semibold">{mode.name}</h3>
            <dl className="mt-4 flex flex-col gap-4 border-t pt-4">
              <div>
                <dt className={LABEL}>Behavior to examine</dt>
                <dd className="mt-0.5 text-subhead/[1.375rem]">
                  {mode.behavior}
                </dd>
              </div>
              <div>
                <dt className={LABEL}>Test evidence</dt>
                <dd className="mt-0.5 text-subhead/[1.375rem]">
                  {mode.evidence}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t pt-6">
        <p className="max-w-[75ch] text-footnote/[1.25rem] text-muted-foreground">
          MLMR describes a radio arrangement. STR describes a simultaneous
          operating capability. Device support and link-pair constraints apply.
        </p>
      </div>
    </section>
  );
}

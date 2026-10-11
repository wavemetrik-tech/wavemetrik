// From slide 21 of the capabilities deck (content/wavemetrik-presentation.md).
// The drawings are schematic: they show what each feature does to a
// transmission, not measured traffic.
const FEATURES = [
  {
    name: "Preamble puncturing",
    stimulus: "Secondary-subchannel interference",
    evidence: "EHT Operation signaling and EHT PPDU metadata",
    kpi: "Throughput and active bandwidth",
    // A wide channel with one subchannel left out, where the interferer is.
    drawing: (
      <>
        {[9, 29, 69].map((x) => (
          <rect
            key={x}
            x={x}
            y={14}
            width={18}
            height={28}
            rx={3}
            className="fill-brand/20 stroke-brand"
          />
        ))}
        <rect
          x={49}
          y={14}
          width={18}
          height={28}
          rx={3}
          strokeDasharray="3 3"
          className="fill-none stroke-foreground/35"
        />
        <path
          d="M52 42 C56 42 55 22 58 22 C61 22 60 42 64 42 Z"
          className="fx-pulse fill-chart-2/20 stroke-chart-2"
        />
      </>
    ),
  },
  {
    name: "OFDMA",
    stimulus: "Multiple active clients and selected traffic mix",
    evidence: "Trigger/RU allocation and multi-user PPDUs",
    kpi: "Latency, capacity and per-client fairness",
    // Two transmissions, each shared between three clients in resource
    // units of different widths.
    drawing: (
      <g className="stroke-none">
        <rect
          x={9}
          y={12}
          width={38}
          height={14}
          rx={3}
          className="fill-brand"
        />
        <rect
          x={49}
          y={12}
          width={18}
          height={14}
          rx={3}
          className="fill-brand/55"
        />
        <rect
          x={69}
          y={12}
          width={18}
          height={14}
          rx={3}
          className="fill-brand/25"
        />
        <rect
          x={9}
          y={30}
          width={18}
          height={14}
          rx={3}
          className="fill-brand/25"
        />
        <rect
          x={29}
          y={30}
          width={18}
          height={14}
          rx={3}
          className="fill-brand"
        />
        <rect
          x={49}
          y={30}
          width={38}
          height={14}
          rx={3}
          className="fill-brand/55"
        />
      </g>
    ),
  },
  {
    name: "MU-MIMO",
    stimulus: "Concurrent spatially separated clients",
    evidence: "Sounding and multi-user spatial transmissions",
    kpi: "Aggregate and per-client throughput",
    // One transmitter, two beams, two clients.
    drawing: (
      <>
        <path
          d="M20 28 L74 7 V21 Z"
          className="fx-ripple fill-brand/20 stroke-brand/60"
        />
        <path
          d="M20 28 L74 35 V49 Z"
          className="fx-ripple fill-brand/20 stroke-brand/60"
          style={{ "--fx-delay": "2s" } as React.CSSProperties}
        />
        <rect
          x={8}
          y={19}
          width={11}
          height={18}
          rx={3}
          className="fill-background stroke-foreground/75"
        />
        {[14, 42].map((y) => (
          <g key={y}>
            <circle
              cx={82}
              cy={y}
              r={5.5}
              className="fill-background stroke-brand"
            />
            <circle cx={82} cy={y} r={2} className="fill-brand stroke-none" />
          </g>
        ))}
      </>
    ),
  },
];

const COLUMNS =
  "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]";
const COLUMN_LABEL = "text-footnote text-muted-foreground";
const COLUMN_NAMES = [
  ["stimulus", "Controlled stimulus"],
  ["evidence", "Packet / PHY evidence"],
  ["kpi", "Service KPI"],
] as const;

export function MultiUserValidation() {
  return (
    <section
      id="multi-user-validation"
      aria-labelledby="multi-user-validation-heading"
      className="page-section"
    >
      <header className="max-w-2xl">
        <h2 id="multi-user-validation-heading" className="section-heading">
          Puncturing and multi-user validation
        </h2>
        <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
          Feature testing combines a controlled stimulus with evidence from
          actual transmissions.
        </p>
      </header>

      <div className="mt-10 sm:mt-14">
        {/* Column headings sit above the rows on wide screens; on narrow
            screens each row carries its own. */}
        <div aria-hidden className={`hidden gap-x-10 pb-3 lg:grid ${COLUMNS}`}>
          <span className={COLUMN_LABEL}>Feature</span>
          {COLUMN_NAMES.map(([key, label]) => (
            <span key={key} className={COLUMN_LABEL}>
              {label}
            </span>
          ))}
        </div>
        <ul className="border-b">
          {FEATURES.map((feature) => (
            <li
              key={feature.name}
              className={`grid gap-x-10 gap-y-4 border-t py-6 lg:items-center ${COLUMNS}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-24 shrink-0 rounded-2xl bg-muted p-2">
                  <svg
                    aria-hidden
                    viewBox="0 0 96 56"
                    className="block w-full"
                    fill="none"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {feature.drawing}
                  </svg>
                </div>
                <h3 className="text-title-3 font-semibold text-balance">
                  {feature.name}
                </h3>
              </div>
              {COLUMN_NAMES.map(([key, label]) => (
                <p key={key} className="text-subhead/[1.375rem]">
                  <span className={`mb-0.5 block lg:sr-only ${COLUMN_LABEL}`}>
                    {label}
                  </span>
                  {feature[key]}
                </p>
              ))}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-[75ch] text-footnote/[1.25rem] text-muted-foreground">
          Advertised capability and observed feature use answer different
          questions.
        </p>
      </div>
    </section>
  );
}

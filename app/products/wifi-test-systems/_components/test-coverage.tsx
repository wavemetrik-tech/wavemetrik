// From slide 2 of the capabilities deck (content/wavemetrik-presentation.md).
const DOMAINS = [
  {
    name: "Performance & RF",
    conditions: "Throughput, RvR, orientation, client load",
    output: "Capacity and coverage limits",
  },
  {
    name: "Wi-Fi 7 & MLO",
    conditions: "Link modes, bandwidth, multi-user traffic",
    output: "Feature behavior and link utilization",
  },
  {
    name: "Coexistence",
    conditions: "Wi-Fi congestion, AWGN, Bluetooth, radar",
    output: "Robustness under controlled interference",
  },
  {
    name: "Mobility & mesh",
    conditions: "RF transitions, roaming, backhaul load",
    output: "Continuity and recovery behavior",
  },
  {
    name: "Applications & QoE",
    conditions: "Teams, Zoom, Meet, YouTube, mixed traffic",
    output: "Latency, loss and application statistics",
  },
  {
    name: "Functional & debug",
    conditions: "Security, association, distributed capture",
    output: "Protocol evidence for regression and debug",
  },
];

const COLUMNS = "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)]";
const COLUMN_LABEL = "text-footnote text-muted-foreground";

export function TestCoverage() {
  return (
    <section
      id="test-coverage"
      aria-labelledby="test-coverage-heading"
      className="page-section"
    >
      <header className="max-w-2xl">
        <h2 id="test-coverage-heading" className="section-heading">
          <span className="whitespace-nowrap">Wi-Fi</span> validation coverage
        </h2>
        <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
          A common test environment connects RF behavior with device performance
          and application experience.
        </p>
      </header>

      <div className="mt-10 sm:mt-14">
        {/* Column headings sit above the rows on wide screens; on narrow
            screens each row carries its own. */}
        <div aria-hidden className={`hidden gap-x-12 pb-3 lg:grid ${COLUMNS}`}>
          <span className={COLUMN_LABEL}>Test domain</span>
          <span className={COLUMN_LABEL}>Exercised conditions</span>
          <span className={COLUMN_LABEL}>Engineering output</span>
        </div>
        <ul className="border-b">
          {DOMAINS.map((domain) => (
            <li
              key={domain.name}
              className={`grid gap-x-12 gap-y-4 border-t py-6 lg:items-baseline ${COLUMNS}`}
            >
              <h3 className="text-title-3 font-semibold">{domain.name}</h3>
              <p className="text-callout/[1.5rem]">
                <span className={`mb-0.5 block lg:sr-only ${COLUMN_LABEL}`}>
                  Exercised conditions
                </span>
                {domain.conditions}
              </p>
              <p className="text-callout/[1.5rem]">
                <span className={`mb-0.5 block lg:sr-only ${COLUMN_LABEL}`}>
                  Engineering output
                </span>
                {domain.output}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

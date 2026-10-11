import { LineChart } from "@/components/charts/line-chart";

import { sweepThroughput, TRACE_STEP_SECONDS } from "../_data/measurements";
import { ChartTile, TextTile } from "./tiles";

// From slide 14 of the capabilities deck.
const POINTS = [
  {
    title: "Controlled variable",
    description:
      "Increase attenuation in steps while maintaining the selected traffic profile.",
  },
  {
    title: "Correlated evidence",
    description:
      "Review throughput alongside RSSI, MCS, retries and receive drops.",
  },
];

const SECONDS = sweepThroughput.map((_, index) => index * TRACE_STEP_SECONDS);

export function RateAdaptation() {
  return (
    <section
      id="rate-adaptation"
      aria-labelledby="rate-adaptation-heading"
      className="page-section"
    >
      <header className="max-w-2xl">
        <h2 id="rate-adaptation-heading" className="section-heading">
          Rate adaptation as attenuation increases
        </h2>
        <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
          The throughput curve identifies operating regions and the onset of
          link degradation.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-5">
        <ChartTile title="MT-C24 throughput over time">
          <LineChart
            label="MT-C24 throughput in Mbps over 630 seconds as attenuation is stepped up"
            x={SECONDS}
            xNames={SECONDS.map((second) => `${second} s`)}
            xTicks={[0, 100, 200, 300, 400, 500, 600].map((second) => ({
              at: second,
              label: `${second}`,
            }))}
            xTitle="Time (s)"
            yTicks={[0, 1000, 2000, 3000, 4000, 5000, 6000]}
            yTitle="Throughput, Mbps"
            yUnit="Mbps"
            series={[
              {
                name: "Throughput",
                color: "var(--chart-1)",
                values: sweepThroughput,
              },
            ]}
            className="h-64 sm:h-72"
          />
        </ChartTile>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-5">
          {POINTS.map((point) => (
            <TextTile key={point.title} title={point.title}>
              {point.description}
            </TextTile>
          ))}
        </div>
      </div>
      <p className="mt-6 max-w-[75ch] text-footnote/[1.25rem] text-muted-foreground">
        Horizontal axis: elapsed time. The trace shows a sweep, rather than
        sustained peak throughput over its entire duration.
      </p>
    </section>
  );
}

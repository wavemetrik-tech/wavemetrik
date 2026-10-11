import { LineChart } from "@/components/charts/line-chart";

import { mloThroughput, TRACE_STEP_SECONDS } from "../_data/measurements";
import { ChartTile, StatTile } from "./tiles";

// From slide 13 of the capabilities deck.
const RESULTS = [
  { value: ">5.4", platform: "MT-C24", detail: "2×2 MIMO OTA" },
  { value: ">8.5", platform: "MT-BE", detail: "TCP MLO OTA" },
  { value: ">9.5", platform: "", detail: "Reported UDP peak" },
];

const SECONDS = mloThroughput.map((_, index) => index * TRACE_STEP_SECONDS);

export function MeasuredThroughput() {
  return (
    <section
      id="measured-throughput"
      aria-labelledby="measured-throughput-heading"
      className="page-section"
    >
      <h2
        id="measured-throughput-heading"
        className="max-w-2xl section-heading"
      >
        Measured multi-gigabit throughput
      </h2>

      {/* The three results stand beside the trace behind the middle one. */}
      <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-5">
        <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3 lg:gap-5">
          {RESULTS.map((result) => (
            <StatTile key={result.value} value={result.value} unit="Gbps">
              {result.platform && (
                <span className="font-semibold text-foreground">
                  {result.platform}
                  {", "}
                </span>
              )}
              {result.detail}
            </StatTile>
          ))}
        </dl>

        <ChartTile title="MT-BE TCP MLO throughput trace">
          <LineChart
            label="MT-BE TCP MLO throughput in Mbps over 566 seconds"
            x={SECONDS}
            xNames={SECONDS.map((second) => `${second} s`)}
            xTicks={[0, 100, 200, 300, 400, 500].map((second) => ({
              at: second,
              label: `${second}`,
            }))}
            xTitle="Time (s)"
            yTicks={[0, 2000, 4000, 6000, 8000, 10000]}
            yTitle="Throughput, Mbps"
            yUnit="Mbps"
            series={[
              {
                name: "Throughput",
                color: "var(--chart-1)",
                values: mloThroughput,
              },
            ]}
            className="h-64 sm:h-80"
          />
        </ChartTile>
      </div>
      <p className="mt-6 max-w-[75ch] text-footnote/[1.25rem] text-muted-foreground">
        Wavemetrik lab examples. Throughput depends on the DUT, bands,
        bandwidth, RF path and traffic settings.
      </p>
    </section>
  );
}

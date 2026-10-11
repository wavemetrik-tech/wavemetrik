import { LineChart } from "@/components/charts/line-chart";

import {
  rxMcs,
  rxRate,
  TELEMETRY_STEP_SECONDS,
  txMcs,
  txRate,
} from "../_data/measurements";
import { ChartTile, TextTile } from "./tiles";

// From slide 12 of the capabilities deck.
const POINTS = [
  {
    title: "Per-link visibility",
    description:
      "Data and beacon RSSI, MCS, channel width, rate, packets, retries and failures.",
  },
  {
    title: "MLO session context",
    description:
      "Bands, channels and per-band traffic identify how the connection uses its links.",
  },
];

const SECONDS = txMcs.map((_, index) => index * TELEMETRY_STEP_SECONDS);
const SECOND_NAMES = SECONDS.map((second) => `${second} s`);
const TIME_TICKS = [0, 200, 400, 600, 800, 1000].map((second) => ({
  at: second,
  label: `${second}`,
}));

// Tx is the Wi-Fi blue and Rx the orange, as in the deck's plots.
const TX = "var(--chart-1)";
const RX = "var(--chart-2)";

const CHARTS = [
  {
    title: "TX / RX MCS over time",
    label: "Tx and Rx MCS index over 1020 seconds",
    yTitle: "MCS index",
    yUnit: "",
    yTicks: [0, 2, 4, 6, 8, 10, 12, 14],
    tx: txMcs,
    rx: rxMcs,
  },
  {
    title: "TX / RX PHY data rate over time",
    label: "Tx and Rx PHY data rate in Mbps over 1020 seconds",
    yTitle: "PHY data rate, Mbps",
    yUnit: "Mbps",
    yTicks: [0, 1000, 2000, 3000, 4000, 5000, 6000],
    tx: txRate,
    rx: rxRate,
  },
];

export function LiveTelemetry() {
  return (
    <section
      id="live-telemetry"
      aria-labelledby="live-telemetry-heading"
      className="page-section"
    >
      <h2 id="live-telemetry-heading" className="max-w-2xl section-heading">
        RF behavior in live telemetry
      </h2>

      {/* The two charts, with the two points the slide makes under them. */}
      <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-2 lg:gap-5">
        {CHARTS.map((chart) => (
          <ChartTile key={chart.title} title={chart.title}>
            <LineChart
              label={chart.label}
              x={SECONDS}
              xNames={SECOND_NAMES}
              xTicks={TIME_TICKS}
              xTitle="Time (s)"
              yTicks={chart.yTicks}
              yTitle={chart.yTitle}
              yUnit={chart.yUnit}
              series={[
                { name: "Tx", color: TX, values: chart.tx },
                { name: "Rx", color: RX, values: chart.rx },
              ]}
              step
              endLabels
            />
          </ChartTile>
        ))}
        {POINTS.map((point) => (
          <TextTile key={point.title} title={point.title}>
            {point.description}
          </TextTile>
        ))}
      </div>
      <p className="mt-6 max-w-[75ch] text-footnote/[1.25rem] text-muted-foreground">
        Metric availability depends on the client and capture metadata. One-way
        latency requires an appropriate timing method.
      </p>
    </section>
  );
}

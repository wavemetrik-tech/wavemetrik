import { ChartViews } from "@/components/charts/chart-views";
import { LineChart } from "@/components/charts/line-chart";

import { clientLoadThroughput, MSS_BYTES } from "../_data/measurements";
import { ChartTile, StatTile, TILE_TABS } from "./tiles";

// From slide 16 of the capabilities deck.
const RESULTS = [
  { value: "2,425", detail: "With 1 client at 1500-byte MSS" },
  { value: "1,264", detail: "Aggregate with 24 clients at the same MSS" },
];

const clients = (count: number) =>
  `${count} ${count === 1 ? "client" : "clients"}`;

// The two results the section quotes are in color; the client counts between
// them share one gray, and the readout and the table tell them apart.
const BETWEEN = "color-mix(in oklab, var(--foreground) 32%, transparent)";
const SERIES = clientLoadThroughput.map((row, index) => {
  const end = index === 0 || index === clientLoadThroughput.length - 1;
  return {
    name: clients(row.clients),
    color: index === 0 ? "var(--chart-1)" : end ? "var(--chart-2)" : BETWEEN,
    values: row.values,
    quiet: !end,
  };
});

const POSITIONS = MSS_BYTES.map((_, index) => index);

export function ClientLoad() {
  return (
    <section
      id="client-load"
      aria-labelledby="client-load-heading"
      className="page-section"
    >
      <header className="max-w-2xl">
        <h2 id="client-load-heading" className="section-heading">
          Client load and packet size affect capacity
        </h2>
        <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
          Aggregate TCP throughput for 1, 2, 4, 8, 16 and 24 clients in an
          example MLO test.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-5">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-5">
          {RESULTS.map((result) => (
            <StatTile key={result.value} value={result.value} unit="Mbps">
              {result.detail}
            </StatTile>
          ))}
        </dl>

        <ChartTile>
          <ChartViews
            title="Throughput against TCP MSS"
            tabsClassName={TILE_TABS}
            caption="Aggregate TCP throughput in Mbps for each client count at each TCP MSS"
            columns={[
              "TCP MSS (bytes)",
              ...SERIES.map((series) => series.name),
            ]}
            rows={MSS_BYTES.map((mss, index) => [
              `${mss}`,
              ...SERIES.map((series) => series.values[index]),
            ])}
            chart={
              <LineChart
                label="Aggregate TCP throughput in Mbps against TCP MSS, for 1 to 24 clients"
                x={POSITIONS}
                xNames={MSS_BYTES.map((mss) => `${mss}-byte MSS`)}
                xTicks={MSS_BYTES.map((mss, index) => ({
                  at: index,
                  label: `${mss}`,
                }))}
                xTitle="TCP MSS (bytes)"
                yTicks={[0, 500, 1000, 1500, 2000, 2500]}
                yTitle="Aggregate throughput, Mbps"
                yUnit="Mbps"
                series={SERIES}
                legend={[
                  { name: SERIES[0].name, color: SERIES[0].color },
                  { name: "2, 4, 8 and 16 clients", color: BETWEEN },
                  {
                    name: SERIES[SERIES.length - 1].name,
                    color: SERIES[SERIES.length - 1].color,
                  },
                ]}
                className="h-64 sm:h-72"
              />
            }
          />
        </ChartTile>
      </div>
      <p className="mt-6 max-w-[75ch] text-footnote/[1.25rem] text-muted-foreground">
        Test configuration: 2.4 GHz at 40 MHz and 6 GHz at 160 MHz. Measurements
        show aggregate TCP throughput.
      </p>
    </section>
  );
}

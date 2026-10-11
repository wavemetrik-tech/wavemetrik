import { ChartViews } from "@/components/charts/chart-views";
import { PolarChart } from "@/components/charts/polar-chart";

import {
  ORIENTATION_STEP_DEGREES,
  orientationThroughput,
} from "../_data/measurements";
import { ChartTile, StatTile, TextTile, TILE_TABS } from "./tiles";

// From slide 15 of the capabilities deck.
const POINTS = [
  {
    title: "Orientation sensitivity",
    description: "The reported spread at 0 dB is approximately 2%.",
  },
  {
    title: "Coverage roll-off",
    description:
      "Mean throughput: 907 Mbps at 20 dB, 536 Mbps at 40 dB and 116 Mbps at 60 dB.",
  },
];

// Attenuation has an order, so the traces step through one hue.
const SERIES = orientationThroughput.map((trace, index) => ({
  name: `${trace.attenuation} dB`,
  color: `var(--ramp-${index + 1})`,
  values: trace.values,
}));

const ORIENTATIONS = orientationThroughput[0].values.map(
  (_, index) => `${index * ORIENTATION_STEP_DEGREES}°`,
);

export function OrientationRange() {
  return (
    <section
      id="orientation-range"
      aria-labelledby="orientation-range-heading"
      className="page-section"
    >
      <h2 id="orientation-range-heading" className="max-w-2xl section-heading">
        Rate vs range across device orientations
      </h2>

      <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-5">
        <ChartTile note="Radius: average throughput. Angle: device orientation. Each trace represents one attenuation setting. Settings from 0 to 15 dB lie close to the 20 dB trace at this scale and are not drawn.">
          <ChartViews
            title="Throughput by orientation"
            tabsClassName={TILE_TABS}
            caption="Average throughput in Mbps at each device orientation, for each path attenuation"
            columns={["Orientation", ...SERIES.map((series) => series.name)]}
            rows={ORIENTATIONS.map((orientation, index) => [
              orientation,
              ...SERIES.map((series) => series.values[index]),
            ])}
            chart={
              <PolarChart
                label="Average throughput at each device orientation, for path attenuation from 20 to 60 dB"
                series={SERIES}
                stepDegrees={ORIENTATION_STEP_DEGREES}
                rings={[200, 400, 600, 800, 1000]}
                unit="Mbps"
                readoutLead="Average throughput at"
              />
            }
          />
        </ChartTile>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-3 lg:gap-5">
          <dl className="grid sm:col-span-2 lg:col-span-1">
            <StatTile value="942" unit="Mbps">
              Peak at 0 dB attenuation
            </StatTile>
          </dl>
          {POINTS.map((point) => (
            <TextTile key={point.title} title={point.title}>
              {point.description}
            </TextTile>
          ))}
        </div>
      </div>
    </section>
  );
}

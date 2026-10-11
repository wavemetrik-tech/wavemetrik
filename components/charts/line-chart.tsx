"use client";

import { useRef, useState } from "react";

export type LineSeries = {
  name: string;
  color: string;
  // One value for each x position.
  values: readonly number[];
  // Drawn thinner, behind the other lines.
  quiet?: boolean;
};

type LineChartProps = {
  // What the chart shows, for assistive technology.
  label: string;
  x: readonly number[];
  series: readonly LineSeries[];
  xTicks: readonly { at: number; label: string }[];
  xTitle: string;
  // The readout's heading for each x position, such as "120 s".
  xNames: readonly string[];
  // The first tick is the baseline and the last is the top of the plot.
  yTicks: readonly number[];
  yTitle: string;
  // Written after each value in the readout; may be empty.
  yUnit: string;
  // Hold each value until the next x position, for values that change in steps.
  step?: boolean;
  // The key above the plot. Defaults to one entry per series.
  legend?: readonly { name: string; color: string }[];
  // Name each series beside its last point.
  endLabels?: boolean;
  className?: string;
};

function LineKey({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="h-0.5 w-3.5 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}

// A line chart on the page background: hairline grid, 2px lines, and a
// crosshair that reads out every series at the nearest x position. Nothing
// animates.
export function LineChart({
  label,
  x,
  series,
  xTicks,
  xTitle,
  xNames,
  yTicks,
  yTitle,
  yUnit,
  step = false,
  legend,
  endLabels = false,
  className = "h-56 sm:h-64",
}: LineChartProps) {
  const plotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const last = x.length - 1;
  const xMin = x[0];
  const xSpan = x[last] - xMin;
  const yMin = yTicks[0];
  const ySpan = yTicks[yTicks.length - 1] - yMin;
  const xPercent = (value: number) => ((value - xMin) / xSpan) * 100;
  const yPercent = (value: number) => ((value - yMin) / ySpan) * 100;
  const format = (value: number) =>
    `${value.toLocaleString("en-US")}${yUnit ? ` ${yUnit}` : ""}`;

  const points = (values: readonly number[]) =>
    values
      .flatMap((value, index) => {
        const y = yMin + ySpan - value;
        return step && index < last
          ? [`${x[index]},${y}`, `${x[index + 1]},${y}`]
          : [`${x[index]},${y}`];
      })
      .join(" ");

  function nearest(clientX: number) {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return 0;
    const target = xMin + ((clientX - rect.left) / rect.width) * xSpan;
    let best = 0;
    for (let index = 1; index <= last; index++) {
      if (Math.abs(x[index] - target) < Math.abs(x[best] - target))
        best = index;
    }
    return best;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const from = active ?? 0;
    const jump = Math.max(1, Math.round(last / 10));
    const steps: Record<string, number> = {
      ArrowRight: from + 1,
      ArrowLeft: from - 1,
      PageUp: from + jump,
      PageDown: from - jump,
      Home: 0,
      End: last,
    };
    if (!(event.key in steps)) return;
    event.preventDefault();
    setActive(Math.min(last, Math.max(0, steps[event.key])));
  }

  const keys = legend ?? series;
  const shown = active ?? 0;
  const readout = series
    .map((item) => `${item.name} ${format(item.values[shown])}`)
    .join(", ");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-footnote text-muted-foreground">
        <span>{yTitle}</span>
        {keys.length > 1 && (
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {keys.map((item) => (
              <li key={item.name} className="flex items-center gap-2">
                <LineKey color={item.color} />
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`mt-6 pl-11 ${endLabels ? "pr-9" : "pr-3"}`}>
        <div ref={plotRef} className={`relative ${className}`}>
          {yTicks.map((tick, index) => (
            <div
              key={tick}
              className={`absolute inset-x-0 border-t ${index === 0 ? "border-foreground/30" : ""}`}
              style={{ bottom: `${yPercent(tick)}%` }}
            >
              <span className="absolute right-full mr-2 -translate-y-1/2 text-caption-1 text-muted-foreground tabular-nums">
                {tick.toLocaleString("en-US")}
              </span>
            </div>
          ))}

          {xTicks.map((tick) => (
            <div
              key={tick.at}
              className="absolute top-full flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${xPercent(tick.at)}%` }}
            >
              <span className="h-1 w-px bg-foreground/30" />
              <span className="mt-1.5 text-caption-1 whitespace-nowrap text-muted-foreground tabular-nums">
                {tick.label}
              </span>
            </div>
          ))}

          <svg
            aria-hidden
            viewBox={`${xMin} 0 ${xSpan} ${ySpan}`}
            preserveAspectRatio="none"
            className="absolute inset-0 size-full overflow-visible"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Quiet lines first, so the others sit on top. */}
            {[...series]
              .sort(
                (a, b) => Number(b.quiet ?? false) - Number(a.quiet ?? false),
              )
              .map((item) => (
                <polyline
                  key={item.name}
                  points={points(item.values)}
                  stroke={item.color}
                  strokeWidth={item.quiet ? 1.5 : 2}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
          </svg>

          {endLabels &&
            series.map((item) => (
              <span
                key={item.name}
                aria-hidden
                className="absolute left-full ml-1.5 translate-y-1/2 text-caption-1 font-medium whitespace-nowrap text-muted-foreground"
                style={{ bottom: `${yPercent(item.values[last])}%` }}
              >
                {item.name}
              </span>
            ))}

          {active !== null && (
            <>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-foreground/40"
                style={{ left: `${xPercent(x[active])}%` }}
              />
              {series.map((item) => (
                <span
                  key={item.name}
                  aria-hidden
                  // The ring is the color of whatever the chart sits on.
                  className="pointer-events-none absolute size-2 -translate-x-1/2 translate-y-1/2 rounded-full ring-2 ring-[var(--chart-surface,var(--background))]"
                  style={{
                    left: `${xPercent(x[active])}%`,
                    bottom: `${yPercent(item.values[active])}%`,
                    backgroundColor: item.color,
                  }}
                />
              ))}
              <div
                aria-hidden
                // Beside the crosshair, on whichever side has more room.
                className={`pointer-events-none absolute top-0 z-10 rounded-lg bg-background px-2.5 py-2 text-caption-1 whitespace-nowrap shadow-sm ring-1 ring-foreground/10 ${
                  xPercent(x[active]) > 50
                    ? "-ml-2.5 -translate-x-full"
                    : "ml-2.5"
                }`}
                style={{ left: `${xPercent(x[active])}%` }}
              >
                <p className="font-medium text-muted-foreground tabular-nums">
                  {xNames[active]}
                </p>
                <ul className="mt-1 flex flex-col gap-0.5">
                  {series.map((item) => (
                    <li key={item.name} className="flex items-center gap-2">
                      <LineKey color={item.color} />
                      <span className="font-semibold tabular-nums">
                        {format(item.values[active])}
                      </span>
                      {series.length > 1 && (
                        <span className="text-muted-foreground">
                          {item.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <div
            role="slider"
            tabIndex={0}
            aria-label={label}
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={last}
            aria-valuenow={shown}
            aria-valuetext={`${xNames[shown]}. ${readout}`}
            className="absolute -inset-2 z-20 cursor-crosshair touch-pan-y rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onPointerDown={(event) => setActive(nearest(event.clientX))}
            onPointerMove={(event) => setActive(nearest(event.clientX))}
            onPointerLeave={(event) => {
              if (event.pointerType !== "touch") setActive(null);
            }}
            onFocus={() => setActive((current) => current ?? 0)}
            onBlur={() => setActive(null)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <p className="mt-9 text-center text-caption-1 text-muted-foreground">
          {xTitle}
        </p>
      </div>
    </div>
  );
}

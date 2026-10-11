"use client";

import { useRef, useState } from "react";

export type PolarSeries = {
  name: string;
  color: string;
  // One value for each direction, clockwise from the top.
  values: readonly number[];
};

type PolarChartProps = {
  // What the chart shows, for assistive technology.
  label: string;
  series: readonly PolarSeries[];
  stepDegrees: number;
  // Ring values, inner to outer. The last one is the edge of the plot.
  rings: readonly number[];
  unit: string;
  // What the readout says before the direction, such as "Throughput at".
  readoutLead: string;
};

// A polar line chart: one closed trace per series, with the value as the
// radius. The readout above it lists every series in one direction, chosen by
// pointing at the chart or with the arrow keys. Nothing animates.
export function PolarChart({
  label,
  series,
  stepDegrees,
  rings,
  unit,
  readoutLead,
}: PolarChartProps) {
  const plotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const directions = Math.round(360 / stepDegrees);
  const max = rings[rings.length - 1];
  // Rounded, so the server and the browser print the same coordinates.
  const round = (value: number) => Math.round(value * 100) / 100;
  const point = (value: number, index: number) => {
    const angle = (index * stepDegrees * Math.PI) / 180;
    return [
      round(value * Math.sin(angle)),
      round(-value * Math.cos(angle)),
    ] as const;
  };
  const percent = ([px, py]: readonly [number, number]) => ({
    left: `${round(50 + (px / max) * 50)}%`,
    top: `${round(50 + (py / max) * 50)}%`,
  });

  function handlePointer(event: React.PointerEvent<HTMLDivElement>) {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const degrees = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
    setActive(Math.round(degrees / stepDegrees) % directions);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const steps: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: directions - 1,
    };
    if (!(event.key in steps)) return;
    event.preventDefault();
    setActive((steps[event.key] + directions) % directions);
  }

  const readout = series
    .map((item) => `${item.name} ${item.values[active]}`)
    .join(", ");

  return (
    <div>
      <p className="text-footnote text-muted-foreground">
        {readoutLead}{" "}
        <span className="font-medium text-foreground tabular-nums">
          {active * stepDegrees}°
        </span>
        , {unit}
      </p>
      <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-4">
        {series.map((item) => (
          <div key={item.name} className="min-w-14">
            <dt className="flex items-center gap-1.5 text-footnote text-muted-foreground">
              <span
                aria-hidden
                className="h-0.5 w-3.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </dt>
            <dd className="mt-1 text-title-3 font-semibold tabular-nums">
              {item.values[active]}
            </dd>
          </div>
        ))}
      </dl>

      {/* The margin leaves room for the direction labels around the plot. */}
      <div className="mx-auto mt-6 max-w-md p-8">
        <div ref={plotRef} className="relative aspect-square">
          <svg
            aria-hidden
            viewBox={`${-max} ${-max} ${max * 2} ${max * 2}`}
            className="absolute inset-0 size-full overflow-visible"
            fill="none"
            strokeLinejoin="round"
          >
            {rings.map((ring) => (
              <circle
                key={ring}
                r={ring}
                vectorEffect="non-scaling-stroke"
                className={
                  ring === max ? "stroke-foreground/30" : "stroke-border"
                }
              />
            ))}
            {Array.from({ length: directions }, (_, index) => {
              const [px, py] = point(max, index);
              return (
                <line
                  key={index}
                  x2={px}
                  y2={py}
                  vectorEffect="non-scaling-stroke"
                  className={
                    index === active ? "stroke-foreground/50" : "stroke-border"
                  }
                />
              );
            })}
            {series.map((item) => (
              <g key={item.name}>
                <polygon
                  points={item.values
                    .map((value, index) => point(value, index).join(","))
                    .join(" ")}
                  stroke={item.color}
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                />
                {item.values.map((value, index) => {
                  const [px, py] = point(value, index);
                  return (
                    <circle
                      key={index}
                      cx={px}
                      cy={py}
                      r={index === active ? max * 0.024 : max * 0.014}
                      fill={item.color}
                      strokeWidth={index === active ? 2 : 1}
                      vectorEffect="non-scaling-stroke"
                      className="stroke-[var(--chart-surface,var(--background))]"
                    />
                  );
                })}
              </g>
            ))}
          </svg>

          {/* Ring values sit between two spokes, clear of the markers. */}
          {rings.map((ring) => (
            <span
              key={ring}
              aria-hidden
              className="pointer-events-none absolute -translate-1/2 bg-[var(--chart-surface,var(--background))] px-0.5 text-caption-2 text-muted-foreground tabular-nums"
              style={percent(point(ring, 0.5))}
            >
              {ring.toLocaleString("en-US")}
            </span>
          ))}
          {Array.from({ length: directions }, (_, index) => (
            <span
              key={index}
              aria-hidden
              className={`pointer-events-none absolute -translate-1/2 text-caption-1 tabular-nums ${
                index === active
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }`}
              style={percent(point(max * 1.11, index))}
            >
              {index * stepDegrees}°
            </span>
          ))}

          <div
            role="slider"
            tabIndex={0}
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={360 - stepDegrees}
            aria-valuenow={active * stepDegrees}
            aria-valuetext={`${active * stepDegrees} degrees. ${readout} ${unit}`}
            className="absolute -inset-8 z-10 cursor-crosshair touch-pan-y rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onPointerDown={handlePointer}
            onPointerMove={handlePointer}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}

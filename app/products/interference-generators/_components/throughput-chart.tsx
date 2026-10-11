"use client";

import { useRef } from "react";

import {
  type AccessPointResult,
  levels,
  type MarkerShape,
  THROUGHPUT_MAX,
  trafficClasses,
} from "../_data/sample-test-results";
import { MarkerGlyph } from "./marker-glyph";

const LAST_INDEX = levels.length - 1;
const Y_TICKS = [0, 200, 400, 600, 800, 1000, 1200];
const X_TICKS = [-20, -30, -40, -50, -60, -70];

// Lines are drawn last-to-first so the first traffic class sits on top.
const DRAW_ORDER = [...trafficClasses].reverse();

export function formatLevel(level: number) {
  return level < 0 ? `−${Math.abs(level)}` : `${level}`;
}

const xPercent = (index: number) => (index / LAST_INDEX) * 100;
const yPercent = (value: number) => (value / THROUGHPUT_MAX) * 100;

// Legend key: a short stroke of the line with its marker on it.
function LegendKey({ shape, color }: { shape: MarkerShape; color: string }) {
  return (
    <svg aria-hidden viewBox="0 0 22 12" className="h-3 w-5.5 shrink-0">
      <line
        x1={1}
        y1={6}
        x2={21}
        y2={6}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <g transform="translate(5 0)">
        <MarkerGlyph shape={shape} color={color} />
      </g>
    </svg>
  );
}

type ThroughputChartProps = {
  result: AccessPointResult;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

export function ThroughputChart({
  result,
  activeIndex,
  onActiveIndexChange,
}: ThroughputChartProps) {
  const plotRef = useRef<HTMLDivElement>(null);
  const level = levels[activeIndex];
  const x = xPercent(activeIndex);

  function indexFromPointer(clientX: number) {
    const rect = plotRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return activeIndex;
    const ratio = (clientX - rect.left) / rect.width;
    return Math.min(LAST_INDEX, Math.max(0, Math.round(ratio * LAST_INDEX)));
  }

  function handlePointer(event: React.PointerEvent<HTMLDivElement>) {
    const next = indexFromPointer(event.clientX);
    if (next !== activeIndex) onActiveIndexChange(next);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const steps: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowUp: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      ArrowDown: activeIndex - 1,
      PageUp: activeIndex + 5,
      PageDown: activeIndex - 5,
      Home: 0,
      End: LAST_INDEX,
    };
    if (!(event.key in steps)) return;
    event.preventDefault();
    onActiveIndexChange(Math.min(LAST_INDEX, Math.max(0, steps[event.key])));
  }

  const readout = trafficClasses
    .map((item) => `${item.label} ${result.throughput[item.key][activeIndex]}`)
    .join(", ");

  return (
    <figure className="flex min-w-0 flex-col border-t pt-6">
      <h3 className="text-title-2 font-semibold">{result.name}</h3>
      <p className="mt-1 text-subhead text-muted-foreground">{result.detail}</p>

      <div className="mt-7">
        <p className="text-footnote text-muted-foreground">
          Throughput at{" "}
          <span className="font-medium text-foreground tabular-nums">
            {formatLevel(level)} dBm
          </span>
          , Mbps
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
          {trafficClasses.map((item) => (
            <div key={item.key} className="min-w-0">
              <dt className="flex items-center gap-1.5 text-footnote text-muted-foreground">
                <LegendKey shape={item.shape} color={item.color} />
                <span className="truncate">{item.label}</span>
              </dt>
              <dd className="mt-1 text-title-3 font-semibold tabular-nums">
                {result.throughput[item.key][activeIndex]}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12 pr-3 pl-10">
        <div ref={plotRef} className="relative h-64 sm:h-72">
          {Y_TICKS.map((tick) => (
            <div
              key={tick}
              className={
                tick === 0
                  ? "absolute inset-x-0 border-t border-foreground/30"
                  : "absolute inset-x-0 border-t"
              }
              style={{ bottom: `${yPercent(tick)}%` }}
            >
              <span className="absolute right-full mr-2 -translate-y-1/2 text-caption-1 text-muted-foreground tabular-nums">
                {tick.toLocaleString("en-US")}
              </span>
            </div>
          ))}

          {X_TICKS.map((tick) => (
            <div
              key={tick}
              className="absolute top-full flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${xPercent(levels.indexOf(tick))}%` }}
            >
              <span className="h-1 w-px bg-foreground/30" />
              <span className="mt-1.5 text-caption-1 text-muted-foreground tabular-nums">
                {formatLevel(tick)}
              </span>
            </div>
          ))}

          <div
            className="chart-cursor pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-foreground/40"
            style={{ left: `${x}%` }}
          />

          <div aria-hidden className="chart-series absolute inset-0">
            <svg
              viewBox={`0 0 ${LAST_INDEX} ${THROUGHPUT_MAX}`}
              preserveAspectRatio="none"
              className="absolute inset-0 size-full overflow-visible"
            >
              {DRAW_ORDER.map((item) => (
                <polyline
                  key={item.key}
                  points={result.throughput[item.key]
                    .map((value, index) => `${index},${THROUGHPUT_MAX - value}`)
                    .join(" ")}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {DRAW_ORDER.map((item) =>
              result.throughput[item.key].map((value, index) => {
                const active = index === activeIndex;
                return (
                  <svg
                    key={`${item.key}-${index}`}
                    viewBox="0 0 12 12"
                    // On narrow plots only every other point keeps its marker.
                    className={`absolute size-3 -translate-x-1/2 translate-y-1/2 overflow-visible transition-transform duration-150 ${
                      active
                        ? "z-10 scale-150"
                        : index % 2 === 1
                          ? "max-sm:hidden"
                          : ""
                    }`}
                    style={{
                      left: `${xPercent(index)}%`,
                      bottom: `${yPercent(value)}%`,
                    }}
                  >
                    <MarkerGlyph shape={item.shape} color={item.color} />
                  </svg>
                );
              }),
            )}
          </div>

          <span
            className="chart-cursor pointer-events-none absolute bottom-full z-10 mb-1 -translate-x-1/2 rounded-sm bg-foreground px-1.5 py-0.5 text-caption-1 font-semibold whitespace-nowrap text-background tabular-nums"
            style={{ left: `min(${x}%, calc(100% - 1.25rem))` }}
          >
            {formatLevel(level)} dBm
          </span>

          <div
            role="slider"
            tabIndex={0}
            aria-label={`Interferer level, ${result.name}`}
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={LAST_INDEX}
            aria-valuenow={activeIndex}
            aria-valuetext={`${formatLevel(level)} dBm. ${readout} Mbps`}
            className="absolute -inset-2 z-20 cursor-crosshair touch-pan-y rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onPointerDown={handlePointer}
            onPointerMove={handlePointer}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="mt-10">
          <div
            aria-hidden
            className="h-1.5 bg-foreground/25"
            style={{ clipPath: "polygon(0 0, 100% 84%, 100% 100%, 0 100%)" }}
          />
          <div className="mt-2 flex items-baseline justify-between gap-3 text-caption-1 text-muted-foreground">
            <span>Heavy</span>
            <span>Interferer level (dBm)</span>
            <span>Negligible</span>
          </div>
        </div>
      </div>

      <figcaption className="mt-8 max-w-[60ch] text-subhead/[1.375rem] text-foreground">
        {result.finding}
      </figcaption>
    </figure>
  );
}

"use client";

import { useRef, useState } from "react";
import { FrequencyScale } from "@/components/frequency-scale";
import { ScopeGrid } from "@/components/diagrams/detail";
import styles from "./footer-spectrum.module.css";

const BASELINE = 120;
const BANDS = ["2.4 GHz", "5 GHz", "6 GHz"];
const channel = (x: number) =>
  `M${x - 56} ${BASELINE} L${x - 49} 42 Q${x - 48} 30 ${x - 40} 30 H${x + 40} Q${x + 48} 30 ${x + 49} 42 L${x + 56} ${BASELINE} Z`;
const hump = (x: number) =>
  `M${x - 26} ${BASELINE} C${x - 12} ${BASELINE} ${x - 14} 50 ${x} 50 C${x + 14} 50 ${x + 12} ${BASELINE} ${x + 26} ${BASELINE} Z`;

// Fine calibration details retain the original spectrum silhouette.
function ChannelDetail({ x }: { x: number }) {
  return (
    <g strokeWidth={0.75}>
      <path
        d={`M${x - 40} 19H${x + 40}M${x - 40} 16V22M${x + 40} 16V22M${x} 26V34M${x - 4} 30H${x + 4}`}
        className="stroke-brand/35"
      />
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M${x - 32 + i * 8} 112V${102 - (i % 3) * 5}`}
          className="stroke-brand/20"
        />
      ))}
    </g>
  );
}

export function FooterSpectrum() {
  const [active, setActive] = useState<string | null>(null);
  const probe = useRef<SVGGElement>(null);
  const bandProps = (name: string) => ({
    className: styles.band,
    "data-active": active === name,
    "data-dimmed": active !== null && active !== name,
  });
  return (
    <div
      data-footer-art
      className={styles.spectrum}
      data-hovering={active !== null}
      onPointerLeave={() => setActive(null)}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const { left, width } = event.currentTarget.getBoundingClientRect();
        const position = Math.min(
          1,
          Math.max(0, (event.clientX - left) / width),
        );
        if (probe.current)
          probe.current.style.transform = `translateX(${position * 1088}px)`;
        setActive(BANDS[Math.min(2, Math.floor(position * 3))]);
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-4 text-footnote text-muted-foreground">
        <p>Precision across the Wi-Fi spectrum</p>
      </div>
      <svg
        aria-hidden
        viewBox={`0 0 1088 ${BASELINE + 1}`}
        className="block max-h-32 w-full"
        fill="none"
        strokeWidth={1.5}
        strokeLinejoin="round"
      >
        <ScopeGrid
          x={0}
          y={12}
          width={1088}
          height={108}
          columns={32}
          rows={4}
        />
        <g className={styles.scanner}>
          <rect
            x={-36}
            y={12}
            width={36}
            height={108}
            className="fill-brand/[0.04]"
          />
          <path d="M0 12V120" className="stroke-brand/20" strokeWidth={0.75} />
        </g>
        {BANDS.map((name, index) => (
          <rect
            key={name}
            x={index * (1088 / 3)}
            y={12}
            width={1088 / 3}
            height={108}
            className={styles.bandWash}
            data-active={active === name}
          />
        ))}
        <path
          d={Array.from(
            { length: 182 },
            (_, i) => `${i ? "L" : "M"}${i * 6} ${116 - ((i * 7) % 5) * 0.7}`,
          ).join(" ")}
          className="stroke-foreground/15"
          strokeWidth={0.75}
        />
        <g {...bandProps("2.4 GHz")}>
          <g className={styles.wave}>
            <path
              d={channel(110)}
              vectorEffect="non-scaling-stroke"
              className={`${styles.channel} fill-brand/15 stroke-brand`}
            />
            <ChannelDetail x={110} />
          </g>
          <path
            d={hump(246)}
            vectorEffect="non-scaling-stroke"
            className="fill-chart-2/10 stroke-chart-2/70"
          />
          {[196, 290, 306, 322].map((x, index) => (
            <g key={x}>
              <rect
                x={x - 2.5}
                y={44}
                width={5}
                height={76}
                rx={2.5}
                className={`${styles.carrier} fill-chart-2`}
                style={{ animationDelay: `${index * 0.7}s` }}
              />
              <path
                d={`M${x} 39V34M${x - 3} 34H${x + 3}`}
                className="stroke-chart-2/40"
                strokeWidth={0.75}
              />
            </g>
          ))}
        </g>
        <g {...bandProps("5 GHz")}>
          <g className={styles.wave} style={{ animationDelay: "-1.8s" }}>
            <path
              d={channel(470)}
              vectorEffect="non-scaling-stroke"
              className={`${styles.channel} fill-brand/10 stroke-brand/60`}
            />
            <ChannelDetail x={470} />
          </g>
          {[558, 571, 584, 597, 610].map((x, index) => (
            <rect
              key={x}
              x={x - 2.5}
              y={38}
              width={5}
              height={82}
              rx={2.5}
              className={`${styles.carrier} fill-chart-2/70`}
              style={{ animationDelay: `${1.2 + index * 0.1}s` }}
            />
          ))}
          <path
            d="M552 27H616M552 24V30M616 24V30"
            className="stroke-chart-2/35"
            strokeWidth={0.75}
          />
          <path
            d={`M636 ${BASELINE} V78 L646 66 L656 82 L666 62 L676 78 L686 68 L696 80 V${BASELINE} Z`}
            vectorEffect="non-scaling-stroke"
            className="fill-foreground/5 stroke-foreground/30"
          />
          <path
            d="M640 98L650 93L660 100L670 88L680 96L690 91"
            className="stroke-foreground/15"
            strokeWidth={0.75}
          />
        </g>
        <g {...bandProps("6 GHz")}>
          {[846, 974].map((x, index) => (
            <g
              key={x}
              className={styles.wave}
              style={{ animationDelay: `${-3.2 - index * 1.1}s` }}
            >
              <path
                d={channel(x)}
                vectorEffect="non-scaling-stroke"
                className={`${styles.channel} fill-brand/10 stroke-brand/60`}
              />
              <ChannelDetail x={x} />
            </g>
          ))}
        </g>
        <g ref={probe} className={styles.probe}>
          <rect
            x={-8}
            y={12}
            width={16}
            height={108}
            className="fill-brand/[0.06]"
          />
          <path
            d="M0 12V120"
            className="stroke-link/60"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            strokeDasharray="2 3"
          />
          <path
            d="M-3 9L0 12L3 9M-3 118L0 115L3 118"
            className="stroke-link"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <path
          d={`M0 ${BASELINE} H1088`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          className="stroke-foreground/25"
        />
      </svg>
      <FrequencyScale ticks="down" />
      <div className="mt-3 grid grid-cols-3 text-center text-footnote font-medium text-muted-foreground">
        {BANDS.map((name) => (
          <span
            key={name}
            className={styles.label}
            data-active={active === name}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

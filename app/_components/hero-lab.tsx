"use client";

import { useState } from "react";
import { Attenuator } from "@/components/diagrams/parts";
import { DraftingGrid } from "@/components/diagrams/detail";
import { Chamber, ClientHardware, Laptop, WaveHardware } from "./lab-art";

const VIEW_WIDTH = 880;
const VIEW_HEIGHT = 520;

// The four parts of the bench, in the order a test uses them. `cable` is the
// path that carries the part's signal to or from the enclosure.
const PARTS = [
  {
    id: "device",
    name: "Device",
    caption: "Isolate the device. Control the RF environment.",
  },
  {
    id: "clients",
    name: "Clients",
    caption: "Load the network with real client radios.",
    cable: "M421 409H525Q541 409 541 393V348Q541 332 525 332H439V277",
    stroke: "stroke-brand",
  },
  {
    id: "interference",
    name: "Interference",
    caption: "Introduce defined interference. Repeat the scene.",
    cable: "M185 255H240Q256 255 256 239V180Q256 164 272 164H314",
    stroke: "stroke-chart-2",
  },
  {
    id: "evidence",
    name: "Evidence",
    caption: "Connect the measurement with the conditions behind it.",
    cable: "M564 164H600Q616 164 616 180V338H658",
    stroke: "stroke-brand",
  },
] as const;

type PartId = (typeof PARTS)[number]["id"];

const LABELS: {
  part: PartId;
  text: string;
  x: number;
  y: number;
  place: string;
}[] = [
  {
    part: "device",
    text: "Device under test",
    x: 439,
    y: 30,
    place: "-translate-x-1/2 -translate-y-full",
  },
  { part: "interference", text: "MT-Wave", x: 20, y: 312, place: "" },
  { part: "clients", text: "MT-C24 client radios", x: 135, y: 470, place: "" },
  {
    part: "evidence",
    text: "Test report",
    x: 742,
    y: 440,
    place: "-translate-x-1/2",
  },
];

// The landing page's test bench. Its signals move on their own; pointing at
// a part, or choosing it below, lifts it and says what it is for. The labels
// are HTML so they stay readable when the drawing is small.
export function HeroLab() {
  const [hovered, setHovered] = useState<PartId | null>(null);
  const [chosen, setChosen] = useState<PartId | null>(null);
  const active = hovered ?? chosen;
  const part = PARTS.find((item) => item.id === active);

  const group = (id: PartId, order: number) => ({
    "data-active": active === id,
    "data-dimmed": active !== null && active !== id,
    className: "home-lab-part",
    style: { "--i": order } as React.CSSProperties,
    onPointerEnter: (event: React.PointerEvent<SVGGElement>) => {
      if (event.pointerType !== "touch") setHovered(id);
    },
    onPointerLeave: () => setHovered(null),
  });

  return (
    <figure
      className="home-lab"
      aria-label="A wireless test bench: a device in a shielded enclosure connected to MT-C24 client radios, MT-Wave interference and measurement software."
    >
      <div
        className="home-lab-stage"
        style={{ aspectRatio: `${VIEW_WIDTH} / ${VIEW_HEIGHT}` }}
      >
        <svg
          aria-hidden
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <DraftingGrid width={VIEW_WIDTH} height={VIEW_HEIGHT} step={44} />
          <path
            d="M290 47H272V290H290 M590 47H608V278H590 M277 61H285 M277 271H285"
            className="stroke-foreground/15"
            strokeWidth={1}
          />
          <ellipse
            cx="461"
            cy="478"
            rx="330"
            ry="24"
            className="fill-foreground/[0.05]"
          />

          <g className="home-lab-cables">
            {PARTS.map(
              (item) =>
                "cable" in item && (
                  <g
                    key={item.id}
                    className="home-lab-cable"
                    data-active={active === item.id || active === "device"}
                    data-dimmed={
                      active !== null &&
                      active !== item.id &&
                      active !== "device"
                    }
                  >
                    <path
                      d={item.cable}
                      strokeWidth={6}
                      className="stroke-foreground/10"
                    />
                    <path
                      d={item.cable}
                      strokeWidth={3}
                      strokeDasharray="7 5"
                      className={`${item.stroke} motion-safe:animate-signal`}
                    />
                  </g>
                ),
            )}
            <Attenuator x={541} y={369} vertical />
          </g>

          <g transform="translate(314 61)">
            <g {...group("device", 0)}>
              <rect
                x="-15"
                y="-30"
                width="300"
                height="270"
                className="home-lab-hit"
              />
              <Chamber bare />
            </g>
          </g>
          <g transform="translate(20 216)">
            <g {...group("interference", 1)}>
              <rect
                x="-15"
                y="-30"
                width="210"
                height="130"
                className="home-lab-hit"
              />
              <WaveHardware bare />
            </g>
          </g>
          <g transform="translate(135 373)">
            <g {...group("clients", 2)}>
              <rect
                x="-15"
                y="-30"
                width="335"
                height="130"
                className="home-lab-hit"
              />
              <ClientHardware bare />
            </g>
          </g>
          <g transform="translate(652 296) scale(.9)">
            <g {...group("evidence", 3)}>
              <rect
                x="-35"
                y="-20"
                width="275"
                height="190"
                className="home-lab-hit"
              />
              <Laptop live />
            </g>
          </g>

          <g className="home-lab-cables fill-background stroke-foreground/50">
            {[
              [314, 164],
              [439, 277],
              [564, 164],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="4.5" strokeWidth={1.5} />
            ))}
          </g>
        </svg>

        {LABELS.map((label) => (
          <span
            key={label.part}
            aria-hidden
            data-active={active === label.part}
            data-dimmed={active !== null && active !== label.part}
            className={`home-lab-label ${label.place}`}
            style={{
              left: `${(label.x / VIEW_WIDTH) * 100}%`,
              top: `${(label.y / VIEW_HEIGHT) * 100}%`,
            }}
          >
            {label.text}
          </span>
        ))}
      </div>

      <figcaption className="home-lab-bar">
        <div
          role="group"
          aria-label="Parts of the test bench"
          className="home-lab-chips"
          onPointerLeave={() => setHovered(null)}
        >
          {PARTS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={active === item.id}
              className="home-lab-chip"
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setHovered(item.id);
              }}
              onFocus={(event) => {
                // Keyboard focus previews a part, as the pointer does.
                if (event.currentTarget.matches(":focus-visible"))
                  setHovered(item.id);
              }}
              onBlur={() => setHovered(null)}
              onClick={() =>
                setChosen((current) => (current === item.id ? null : item.id))
              }
            >
              {item.name}
            </button>
          ))}
        </div>
        <p className="home-lab-caption" aria-live="polite">
          {part?.caption ??
            "Real radios. Controlled RF. Repeatable measurements."}
        </p>
      </figcaption>
    </figure>
  );
}

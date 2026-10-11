// Throughput values are read off the charts in the MT-Wave datasheet, so they
// are approximate (rounded to 5 Mbps). Replace with the original measurements
// when they are available.

export const LEVEL_START = -20;
export const LEVEL_END = -70;
export const LEVEL_STEP = -2;
export const THROUGHPUT_MAX = 1200;

// Interferer level in dBm for each point, from heavy to negligible interference.
export const levels = Array.from(
  { length: (LEVEL_END - LEVEL_START) / LEVEL_STEP + 1 },
  (_, i) => LEVEL_START + i * LEVEL_STEP,
);

export const trafficClasses = [
  { key: "voice", label: "Voice", color: "var(--chart-1)", shape: "circle" },
  { key: "video", label: "Video", color: "var(--chart-2)", shape: "square" },
  {
    key: "bestEffort",
    label: "Best effort",
    color: "var(--chart-3)",
    shape: "triangle",
  },
  {
    key: "background",
    label: "Background",
    color: "var(--chart-4)",
    shape: "star",
  },
] as const;

export type TrafficClassKey = (typeof trafficClasses)[number]["key"];
export type MarkerShape = (typeof trafficClasses)[number]["shape"];

export type AccessPointResult = {
  id: string;
  name: string;
  detail: string;
  finding: string;
  // Throughput in Mbps, one value per entry in `levels`.
  throughput: Record<TrafficClassKey, number[]>;
};

const zeros = (count: number) => Array.from({ length: count }, () => 0);

export const accessPoints: AccessPointResult[] = [
  {
    id: "model-1",
    name: "Access point Model-1",
    detail: "Wi-Fi 6E reference",
    finding:
      "Best-effort and background traffic recover at about −40 dBm; voice and video recover at about −52 dBm.",
    throughput: {
      voice: [
        ...zeros(13),
        5,
        0,
        30,
        480,
        480,
        470,
        920,
        945,
        940,
        915,
        900,
        955,
        985,
      ],
      video: [
        ...zeros(9),
        55,
        0,
        30,
        5,
        100,
        5,
        30,
        480,
        400,
        445,
        920,
        945,
        970,
        935,
        925,
        955,
        970,
      ],
      bestEffort: [
        0, 0, 0, 0, 5, 5, 15, 15, 20, 30, 860, 930, 920, 975, 965, 990, 970,
        940, 980, 975, 960, 945, 930, 970, 955, 950,
      ],
      background: [
        0, 0, 5, 0, 10, 10, 30, 65, 235, 415, 565, 875, 940, 965, 970, 980, 955,
        950, 965, 965, 970, 970, 970, 955, 975, 990,
      ],
    },
  },
  {
    id: "model-2",
    name: "Access point Model-2",
    detail: "Wi-Fi 7, configured to 802.11ax 6E",
    finding:
      "All traffic classes need a weaker interferer, about −55 dBm, before throughput recovers.",
    throughput: {
      voice: [...zeros(17), 470, 460, 940, 965, 965, 910, 910, 940, 985],
      video: [
        ...zeros(14),
        10,
        200,
        480,
        500,
        920,
        955,
        935,
        935,
        860,
        980,
        940,
        920,
      ],
      bestEffort: [
        ...zeros(12),
        5,
        75,
        85,
        35,
        200,
        980,
        970,
        975,
        950,
        950,
        965,
        945,
        960,
        950,
      ],
      background: [
        ...zeros(12),
        10,
        60,
        50,
        15,
        200,
        600,
        950,
        965,
        970,
        970,
        950,
        960,
        970,
        985,
      ],
    },
  },
];

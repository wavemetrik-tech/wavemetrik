// Copy comes from the MT-Wave datasheet. The interference sections are a
// short summary; the datasheet has the full specifications.

import type { Spec } from "../_components/spec-list";
import type { TrafficClassKey } from "./sample-test-results";

// The datasheet's headline specifications, shown under the hero.
export const headlineSpecs = [
  { label: "Wi-Fi bands", value: "2.4 / 5 / 6 GHz" },
  { label: "Wi-Fi output level", value: "−30 to +15 dBm" },
  { label: "Inter-frame spacing", value: "16 to 3000 µs" },
  { label: "DFS radar library", value: "8 regions" },
];

export const keyFeatures = [
  {
    id: "radios",
    title: "Two independent radios",
    description:
      "Wi-Fi and non-Wi-Fi interference from one unit, at the same time.",
  },
  {
    id: "wifi",
    title: "Real 802.11 traffic",
    description:
      "On 2.4, 5 and 6 GHz: 802.11a/b/g/n/ac/ax, 20 / 40 / 80 MHz, one chain or 2×2 MIMO.",
  },
  {
    id: "level",
    title: "Precise level control",
    description:
      "Wi-Fi output from −30 to +15 dBm in 1 dB steps, ±0.5 dB accuracy.",
  },
  {
    id: "load",
    title: "Adjustable channel load",
    description:
      "Inter-frame spacing from 16 µs (back-to-back) to 3000 µs, with WMM traffic classes.",
  },
  {
    id: "bluetooth",
    title: "Bluetooth and Zigbee",
    description:
      "Bluetooth Classic, Low Energy and Long Range; IEEE 802.15.4 frames.",
  },
  {
    id: "radar",
    title: "DFS radar patterns",
    description: "For eight regulatory regions, placed on any 5 GHz channel.",
  },
  {
    id: "awgn",
    title: "AWGN",
    description: "From 2 to 20 MHz wide, tunable from 2.4 to 6 GHz.",
  },
  {
    id: "control",
    title: "Browser control panel and HTTP API",
    description: "Nothing to install, and every setting can be scripted.",
  },
] as const;

export type KeyFeatureId = (typeof keyFeatures)[number]["id"];

// Wi-Fi settings, with the kind of control each one has in the control panel.
export const configurableParameters: {
  name: string;
  control: "select" | "slider";
}[] = [
  { name: "Standard", control: "select" },
  { name: "Channel", control: "select" },
  { name: "Bandwidth", control: "select" },
  { name: "MCS rate", control: "select" },
  { name: "WMM priority", control: "select" },
  { name: "IFS (inter-frame spacing)", control: "slider" },
  { name: "Power level", control: "slider" },
  { name: "Payload", control: "slider" },
];

// What each WMM priority is for. The classes themselves, in priority order
// with their chart color and marker, are `trafficClasses`.
export const wmmPriorityDescriptions: Record<TrafficClassKey, string> = {
  voice: "Highest priority for voice traffic",
  video: "High priority for video streaming",
  bestEffort: "Standard priority for general data",
  background: "Lowest priority for background tasks",
};

// `signals` names the MT-Wave signals each application's description refers to.
export const applications = [
  {
    title: "Wi-Fi robustness and QoS",
    description:
      "Access point and client behavior under co-channel and adjacent-channel congestion.",
    signals: ["Wi-Fi"],
  },
  {
    title: "Wi-Fi / Bluetooth coexistence",
    description: "In the 2.4 GHz band.",
    signals: ["Wi-Fi", "Bluetooth"],
  },
  {
    title: "Zigbee, Thread and Matter coexistence",
    description: "With busy Wi-Fi channels.",
    signals: ["Wi-Fi", "Zigbee"],
  },
  {
    title: "DFS development and pre-compliance",
    description:
      "Radar detection, channel availability check and channel-move behavior.",
    signals: ["Radar"],
  },
  {
    title: "6 GHz and Wi-Fi 6E stress testing",
    description: "Across U-NII-5 to U-NII-8.",
    signals: ["Wi-Fi"],
  },
  {
    title: "Sensitivity and SNR curves",
    description:
      "Raise the noise floor with AWGN without moving the device under test.",
    signals: ["AWGN"],
  },
  {
    title: "Regression and field-issue reproduction",
    description: "Scripted, repeatable interference scenarios.",
    signals: ["HTTP API"],
  },
];

export const WIFI_LEVEL_MIN = -30;
export const WIFI_LEVEL_MAX = 15;

// A level in dBm with its sign, as the datasheet writes it.
export const formatWifiLevel = (level: number) =>
  level > 0 ? `+${level}` : level < 0 ? `−${Math.abs(level)}` : "0";

export const wifiSpecs: Spec[] = [
  { label: "Standards", value: "IEEE 802.11a / b / g / n / ac / ax" },
  { label: "Bands", value: "2.4 GHz, 5 GHz and 6 GHz" },
  { label: "Channel bandwidth", value: "20, 40 or 80 MHz" },
  { label: "Transmit chains", value: "One chain or 2×2 MIMO" },
  {
    label: "Output level",
    value: "−30 to +15 dBm in 1 dB steps, ±0.5 dB accuracy",
  },
  { label: "RF output", value: "RF1 (front panel)" },
];

export const nonWifiSpecs: Spec[] = [
  { label: "Output level setting", value: "−35 to +12 dBm in 1 dB steps" },
  { label: "Playback", value: "Continuous loop until stopped" },
  { label: "RF output", value: "RF3 (front panel)" },
];

export const signalTypes = [
  {
    id: "bluetooth",
    name: "Bluetooth",
    axis: ["2402 MHz", "2480 MHz"],
    specs: [
      {
        label: "Signal types",
        value: "Bluetooth Classic, Low Energy and Long Range",
      },
      { label: "Channel", value: "0 to 78 (2402 to 2480 MHz in 1 MHz steps)" },
    ],
  },
  {
    id: "zigbee",
    name: "Zigbee",
    axis: ["Channel 11", "Channel 26"],
    specs: [
      { label: "Frame types", value: "Data, Beacon, Ack, MAC Command" },
      {
        label: "Channel",
        value: "11 to 26 (2405 to 2480 MHz), or any 5 GHz Wi-Fi channel",
      },
    ],
  },
  {
    id: "radar",
    name: "Radar",
    axis: ["Time", ""],
    specs: [
      {
        label: "Patterns",
        value: "DFS test patterns for eight regulatory regions",
      },
      { label: "Channel", value: "Any 5 GHz Wi-Fi channel, 36 to 165" },
    ],
  },
  {
    id: "awgn",
    name: "AWGN",
    axis: ["Frequency", ""],
    specs: [
      { label: "Center frequency", value: "2400 to 6000 MHz in 1 MHz steps" },
      { label: "Noise bandwidth", value: "2 to 20 MHz in 1 MHz steps" },
    ],
  },
] as const satisfies readonly {
  id: string;
  name: string;
  axis: readonly [string, string];
  specs: readonly Spec[];
}[];

export type SignalTypeId = (typeof signalTypes)[number]["id"];

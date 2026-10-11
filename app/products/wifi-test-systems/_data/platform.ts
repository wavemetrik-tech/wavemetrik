// From the Wavemetrik capabilities deck:
// the platform table on slide 7, with specifications from slides 8, 9, 11,
// 19, 22, 24 and 36.

// Headline figures shown under the hero: station counts from slide 4,
// isolation from slide 9, attenuation from slide 36 and channel width from
// slide 3.
export const headlineSpecs = [
  { label: "Client stations", value: "24 / 48 / 96" },
  { label: "Isolation, up to 8 GHz", value: "Over 90 dB" },
  { label: "Path attenuation", value: "Up to 95 dB" },
  { label: "Channel width", value: "Up to 320 MHz" },
];

export type PlatformPartId =
  "system" | "clients" | "emulator" | "wave" | "attenuators" | "automation";

export const platformParts: {
  id: PlatformPartId;
  name: string;
  role: string;
  evaluation: string;
  specs: string[];
}[] = [
  {
    id: "system",
    name: "MT-SYS",
    role: "Rack and shielded RF environment",
    evaluation: "AP/CPE qualification and regression",
    specs: [
      "More than 90 dB isolation up to 8 GHz",
      "Absorber-lined interiors",
      "10G Ethernet, USB and up to 24 SMA connections",
    ],
  },
  {
    id: "clients",
    name: "MT-C24 / MT-C4",
    role: "Real-radio clients with individual RF paths",
    evaluation: "Client scaling, MLO and interoperability",
    specs: ["Up to 2×2 MIMO per radio", "MT-C24: up to 24 radios"],
  },
  {
    id: "emulator",
    name: "MT-BE",
    role: "Up to 4×4 MIMO emulation",
    evaluation: "High-throughput and multi-link testing",
    specs: ["Up to 128 stations per band", "MLMR and STR"],
  },
  {
    id: "wave",
    name: "MT-Wave",
    role: "Wi-Fi and non-Wi-Fi stimulus",
    evaluation: "Congestion, coexistence and DFS",
    specs: [
      "Wi-Fi, AWGN, Bluetooth, Zigbee and DFS radar profiles",
      "1 dB level steps, ±0.5 dB accuracy",
    ],
  },
  {
    id: "attenuators",
    name: "RF attenuators",
    role: "Controlled loss on each RF path",
    evaluation: "Rate vs range, steering and roaming",
    specs: [
      "200 MHz to 8 GHz",
      "Up to 95 dB in 0.25 dB steps",
      "±0.5 dB accuracy",
    ],
  },
  {
    id: "automation",
    name: "MT-Core + MT-Sniffer",
    role: "Automation, HTML reports and capture",
    evaluation: "Regression with debug evidence",
    specs: [
      "HTML reports with KPIs and charts",
      "Multi-band capture in one PCAPNG",
    ],
  },
];

export const platformAudience =
  "For network operators, device brands, chipset teams, ODMs and independent test laboratories.";

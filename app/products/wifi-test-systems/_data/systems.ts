// From the block-diagram slides of the Wavemetrik capabilities deck
// (slides 4 to 6). Descriptions are read off the diagrams and their notes.

export type SystemId = "compact" | "scalable" | "tr398" | "mesh";

export type TestSystem = {
  id: SystemId;
  name: string;
  title: string;
  description: string;
  parts: { name: string; role: string }[];
  note: string;
  capabilities?: string[];
  testCases?: string[];
};

export const systems: TestSystem[] = [
  {
    // Text from slide 3. The layout is the MT-SYS1 reference configuration
    // in the MT-Wave datasheet.
    id: "compact",
    name: "MT-SYS-1",
    title: "MT-SYS-1 performance test system",
    description:
      "A compact rack integrates the RF environment, client radios and test control.",
    parts: [
      { name: "Box-A", role: "Access point under test" },
      { name: "MT-C24", role: "Clients and sniffer" },
      { name: "Attenuators", role: "On the path under test" },
      { name: "MT-Wave", role: "Interference into the enclosure" },
    ],
    note: "Supported combinations depend on the selected radio hardware, driver, firmware and operating band.",
    capabilities: [
      "12, 24 or 32 individual radios in a single instrument",
      "Highest achievable performance: 4K QAM and 320 MHz",
      "MLO: MLMR and eMLSR",
      "OFDMA and MU-MIMO",
      "Preamble puncturing",
      "Multi-client performance test cases",
      "User experience with real streaming: YouTube, Teams, Zoom, Google Meet and more",
    ],
    testCases: [
      "Peak performance",
      "RVR",
      "RVRVO",
      "MLO",
      "Preamble puncturing",
      "Band steering",
      "Interference: CCI/ACI",
      "Congestion control",
      "Multi-band throughput",
      "Multi-client",
      "Sniffing",
      "Latency, jitter",
      "Encryption and security",
      "Channel utilization",
      "Multi-band sniffing",
    ],
  },
  {
    id: "scalable",
    name: "MT-SYS-2/3",
    title: "24, 48 or 96 stations",
    description:
      "One shielded enclosure for the access point, with client capacity added in steps. Each MT-C24 module adds 24 radios on its own attenuated RF path.",
    parts: [
      { name: "Box-A", role: "Access point under test" },
      { name: "MT-C24", role: "Clients and sniffer, 24 radios per module" },
      { name: "Attenuators", role: "One on each client path" },
      { name: "MT-Wave", role: "Interference into the enclosure" },
    ],
    note: "Capture-radio allocation reduces the radios available for active client traffic.",
  },
  {
    id: "tr398",
    name: "TR-398",
    title: "Performance and TR-398 test system",
    description:
      "Three shielded enclosures: the access point and two mesh nodes. MT-C24 serves the access point directly, and MT-C12 reaches all three enclosures through a splitter.",
    parts: [
      { name: "Box-A", role: "Access point under test" },
      { name: "Box-B, Box-C", role: "Mesh nodes" },
      { name: "MT-C24", role: "Clients and sniffer on the access point" },
      { name: "MT-C12", role: "Clients and sniffer, split to every enclosure" },
      {
        name: "Attenuators",
        role: "On every client path and every link between enclosures",
      },
      { name: "MT-Wave", role: "Interference into Box-A" },
    ],
    note: "Logical connections rather than a complete cable schedule.",
  },
  {
    id: "mesh",
    name: "MT-SYS-5",
    title: "Mesh, roaming and performance",
    description:
      "Five shielded enclosures: the access point, three mesh nodes and a box of real client devices. One MT-C24 serves the access point, and a second reaches the four network enclosures through a splitter.",
    parts: [
      { name: "Box-A", role: "Access point under test" },
      { name: "Box-B, Box-C, Box-D", role: "Mesh nodes" },
      { name: "Box-E", role: "Real client devices" },
      {
        name: "MT-C24 × 2",
        role: "Clients and sniffer, one split to every network enclosure",
      },
      {
        name: "Attenuators",
        role: "On every client path and every link between enclosures",
      },
      { name: "MT-Wave", role: "Interference into Box-A" },
    ],
    note: "A topology explanation rather than a port-to-port cable schedule.",
  },
];

// MT-C24 modules for each station count in the scalable system.
export const stationOptions = [
  { stations: 24, modules: 1 },
  { stations: 48, modules: 2 },
  { stations: 96, modules: 4 },
] as const;

// Copy comes from the "Reference test configuration" and "Related products"
// parts of the MT-Wave datasheet.

export type SetupPartId =
  "wave" | "enclosure" | "dut" | "attenuators" | "emulator";

export type SetupPart = {
  id: SetupPartId;
  name: string;
  role: string;
  description: string;
  specs: string[];
};

export const setupParts: SetupPart[] = [
  {
    id: "wave",
    name: "MT-Wave",
    role: "Interference source",
    description:
      "Injects controlled interference into the enclosure while MT-C24 generates the reference traffic.",
    specs: [
      "Wi-Fi interference on 2.4, 5 and 6 GHz from RF1",
      "Bluetooth, Zigbee, radar and AWGN from RF3",
      "Wi-Fi output from −30 to +15 dBm in 1 dB steps",
    ],
  },
  {
    id: "enclosure",
    name: "Shielded enclosure",
    role: "Box-A",
    description: "Holds the device under test.",
    specs: [],
  },
  {
    id: "dut",
    name: "Device under test",
    role: "Access point",
    description:
      "The access point being tested. The sample results below use a Wi-Fi 6E model and a Wi-Fi 7 model.",
    specs: [],
  },
  {
    id: "attenuators",
    name: "MT84-A",
    role: "Programmable attenuators",
    description:
      "Sit on the path under test, between the enclosure and MT-C24.",
    specs: ["95 dB range", "0.25 dB steps", "±0.5 dB accuracy"],
  },
  {
    id: "emulator",
    name: "MT-C24",
    role: "Client emulator and sniffer",
    description:
      "Generates the reference traffic for rate-versus-range (RVR, RVRO) and coexistence runs.",
    specs: [
      "Wi-Fi 7 client emulator with 24 or 48 client radios",
      "MLO (EMLSR / MLMR), preamble puncturing and Multi-RU",
      "2×2 MIMO, up to 5 Gbps at 6 GHz",
      "Sniffing, band-steering and RVR / RVRO test automation",
      "Based on both Intel and Mediatek",
    ],
  },
];

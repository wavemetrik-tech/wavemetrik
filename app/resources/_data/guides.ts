export type Guide = {
  slug: string;
  category: string;
  title: string;
  intro: string;
  sections: [string, string][];
  related: string;
  graphic: "planning" | "interference" | "results";
};

export const GUIDES: Guide[] = [
  {
    slug: "plan-a-wifi-evaluation",
    category: "Test planning",
    title: "Planning a useful Wi-Fi evaluation",
    intro:
      "Start with a question about the device, then define the conditions and evidence needed to answer it.",
    sections: [
      [
        "Define the device and its configuration",
        "Record the model, firmware build, operating modes, supported bands and relevant features. A result without this context is difficult to compare later. Decide whether the evaluation is for an access point, client, mesh node or a complete system.",
      ],
      [
        "Choose a baseline",
        "Begin with a controlled RF environment and a simple traffic condition. Establish single-link performance before adding MLO, additional clients or interference. This gives later observations a reference.",
      ],
      [
        "Match instruments to the question",
        "MT-C24 provides reference clients, MT84-A varies path loss, and MT-Wave introduces controlled interference. Packet capture helps explain behaviour that a throughput total alone cannot show. A shielded enclosure helps isolate the device from the surrounding RF environment.",
      ],
      [
        "Agree the acceptance criteria",
        "Choose the measurements and limits before running the comparison. Depending on the use case, the useful evidence may include throughput, loss, latency, recovery or frame-level observations. An observed result is not automatically a pass or fail.",
      ],
      [
        "Retain enough information to repeat it",
        "Keep firmware versions, radio settings, RF-path details and traffic parameters with the result. When a problem appears, repeat the same condition before changing one parameter at a time.",
      ],
    ],
    related: "performance-and-range",
    graphic: "planning",
  },
  {
    slug: "understanding-interference",
    category: "RF fundamentals",
    title: "Choosing an interference scenario",
    intro:
      "Wi-Fi congestion, non-Wi-Fi signals and noise exercise different behaviours. Choose the stimulus that matches the question.",
    sections: [
      [
        "Co-channel and adjacent-channel traffic",
        "MT-Wave generates real 802.11 traffic. Place it on the DUT’s channel to exercise co-channel congestion, or on a neighbouring channel to examine adjacent-channel effects. Record channel width and RF level as part of the scenario.",
      ],
      [
        "Traffic class and channel load",
        "Voice, Video, Best effort and Background are the documented WMM traffic classes. Inter-frame spacing and payload settings let you change the traffic pattern. Compare these conditions with the same reference traffic on the DUT.",
      ],
      [
        "Bluetooth and IEEE 802.15.4",
        "The second radio plays Bluetooth Classic, Low Energy and Long Range signals, or IEEE 802.15.4 frames. It can operate at the same time as the Wi-Fi radio, with one non-Wi-Fi signal type selected at a time.",
      ],
      [
        "Noise and radar are different tests",
        "AWGN raises the noise floor for sensitivity and SNR investigations. Radar patterns exercise DFS detection and channel behaviour. Neither should be described as ordinary Wi-Fi traffic, and radar development checks do not replace accredited certification.",
      ],
      [
        "Measure the stimulus at the reference plane",
        "Cable loss, attenuation and over-the-air paths affect the interference reaching the DUT. MT-Wave’s non-Wi-Fi level is a setting rather than a calibrated absolute output. Measure actual power where it matters to the conclusion.",
      ],
    ],
    related: "coexistence-and-interference",
    graphic: "interference",
  },
  {
    slug: "reading-wireless-results",
    category: "Measurement context",
    title: "Reading wireless test results in context",
    intro:
      "Throughput is useful, but the configuration and supporting evidence determine what a measurement can establish.",
    sections: [
      [
        "Separate a specification from a result",
        "A product specification describes an instrument’s capability. A measured result describes one device in one configured test. MT-C24’s up-to-5-Gbps figure at 6 GHz is not a promise that every access point will achieve that throughput.",
      ],
      [
        "Compare like with like",
        "Keep standard, band, bandwidth, client count, traffic direction and RF path consistent when comparing devices. The MT-Wave datasheet compares a Wi-Fi 6E and a Wi-Fi 7 access point with the client set to 802.11ax on 6 GHz.",
      ],
      [
        "Read more than the final number",
        "Correlate throughput with available RSSI, MCS, retries and connection events. A change in rate selection or recovery behaviour can explain a result that a single average hides.",
      ],
      [
        "Keep capture limits visible",
        "Packet-level analysis depends on what the radio and driver supply. Noise and SNR need valid metadata. Airtime estimates, NAV reservations and physical clear-channel-assessment busy time represent different measurements.",
      ],
      [
        "Preserve the test boundary",
        "State the DUT, firmware, duration, RF conditions and acceptance criteria with the result. Retain the raw evidence for a repeat test. Coverage claims should identify the selected standard edition and agreed case matrix.",
      ],
    ],
    related: "automation-and-diagnosis",
    graphic: "results",
  },
];

export function guideReadingTime(guide: Guide) {
  const words = [guide.intro, ...guide.sections.flat()]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function guideSectionId(index: number) {
  return `section-${index + 1}`;
}

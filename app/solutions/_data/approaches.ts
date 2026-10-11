export type ApproachId =
  | "performance-and-range"
  | "wifi-7-and-mlo"
  | "coexistence-and-interference"
  | "radar-and-dfs"
  | "mesh-and-roaming"
  | "automation-and-diagnosis";

export type Question = { question: string; answer: string };
export type TestApproach = {
  id: ApproachId;
  category: string;
  title: string;
  tagline: string;
  introduction: string;
  instruments: ("MT-C24" | "MT-Wave")[];
  question: string;
  explanation: string;
  evaluate: string[];
  evidence: string[];
  steps: { title: string; description: string }[];
  note: string;
  questions: Question[];
};

export const approaches: TestApproach[] = [
  {
    id: "performance-and-range",
    category: "Performance & RF",
    title: "Wi-Fi performance and range",
    tagline: "Find the limits of a wireless link.",
    introduction:
      "A peak throughput number is only the beginning. Measure how an access point behaves as signal level changes, more clients join, and traffic runs in both directions.",
    instruments: ["MT-C24"],
    question: "Where does performance start to fall?",
    explanation:
      "Rate-versus-range testing varies RF path loss while the device stays in a controlled environment. It makes changes in throughput, link rate and stability easier to compare across firmware versions. Add orientation to understand how the device’s physical position affects its radio performance.",
    evaluate: [
      "Single-client baseline on each supported band",
      "Throughput as attenuation increases",
      "Multi-client loading and fairness",
      "Rate versus range with device orientation",
    ],
    evidence: [
      "Throughput versus attenuation",
      "Per-station performance observations",
      "A recorded configuration for regression",
    ],
    steps: [
      {
        title: "Record the baseline",
        description:
          "Document firmware, channel, bandwidth, security and traffic direction. Characterize the RF path before interpreting the result.",
      },
      {
        title: "Sweep the RF path",
        description:
          "Use programmable attenuation to vary received signal conditions. Keep the other test settings fixed so the comparison has a clear reference.",
      },
      {
        title: "Add client load",
        description:
          "Repeat with the required number of active clients. Compare aggregate throughput alongside the experience of individual stations.",
      },
      {
        title: "Review the evidence",
        description:
          "Compare throughput with RSSI, MCS and packet captures. Record the point where behaviour changes and rerun it on the next build.",
      },
    ],
    note: "Attenuation represents controlled path loss, not a direct distance in metres. Results depend on the DUT, RF path and test configuration.",
    questions: [
      {
        question: "What is the difference between RVR and RVRO?",
        answer:
          "RVR measures performance as RF path loss changes. RVRO adds device orientation to that evaluation, helping you compare how the device’s physical position affects the result.",
      },
      {
        question: "Can this compare firmware builds?",
        answer:
          "Yes. Keep the RF path, traffic and client configuration consistent, record the firmware version, and repeat the same attenuation sweep on each build.",
      },
    ],
  },
  {
    id: "wifi-7-and-mlo",
    category: "Wi-Fi 7",
    title: "Wi-Fi 7 and Multi-Link Operation",
    tagline: "Understand what each link contributes.",
    introduction:
      "Validate Multi-Link Operation, preamble puncturing and Multi-RU with real client radios. Look beyond the aggregate result to see how the device uses its available links.",
    instruments: ["MT-C24", "MT-Wave"],
    question: "Does the feature behave as intended?",
    explanation:
      "MLO introduces more than one path for wireless traffic. A useful evaluation starts with individual links and then compares the supported multi-link modes under the same conditions. MT-C24 supports EMLSR and MLMR, with 24 or 48 client radios and 2×2 MIMO per radio.",
    evaluate: [
      "Single-link and MLO throughput",
      "EMLSR and MLMR behaviour",
      "Preamble puncturing under selected conditions",
      "Multi-RU and client loading",
    ],
    evidence: [
      "Single-link and multi-link comparisons",
      "Evidence of link utilization",
      "Feature-specific regression cases",
    ],
    steps: [
      {
        title: "Confirm the feature set",
        description:
          "Agree which band combinations and link modes the DUT and client configuration support.",
      },
      {
        title: "Measure each link",
        description:
          "Create a single-link reference before enabling MLO. Record channel settings and RF path loss for each band.",
      },
      {
        title: "Exercise MLO",
        description:
          "Run the selected link modes and introduce controlled changes to one RF path at a time.",
      },
      {
        title: "Correlate the result",
        description:
          "Compare throughput with link-level evidence and captured frames. Use the same setup when reviewing a firmware change.",
      },
    ],
    note: "Supported feature combinations depend on radio hardware, driver, firmware and operating band. MT-C24’s stated peak is up to 5 Gbps at 6 GHz; it is not a guaranteed result for every DUT.",
    questions: [
      {
        question: "Does MT-Wave generate Wi-Fi 7 traffic?",
        answer:
          "MT-Wave supplies controlled interference; MT-C24 provides the real client radios for Wi-Fi 7 feature evaluation. MT-Wave’s stated Wi-Fi traffic support extends through 802.11ax, so use MT-C24 for the Wi-Fi 7 client role.",
      },
      {
        question: "Should aggregate throughput be the only metric?",
        answer:
          "No. Compare individual links with the combined result, and retain link-utilization evidence and captured frames so you can see how each link contributes.",
      },
    ],
  },
  {
    id: "coexistence-and-interference",
    category: "Interference & coexistence",
    title: "Coexistence and interference testing",
    tagline: "Recreate the traffic around your device.",
    introduction:
      "Combine real Wi-Fi congestion with Bluetooth, Zigbee or noise to understand how a device behaves in a shared spectrum environment.",
    instruments: ["MT-Wave", "MT-C24"],
    question: "What happens when the channel gets busy?",
    explanation:
      "MT-Wave has two independent radios. One generates Wi-Fi traffic across 2.4, 5 and 6 GHz; the other plays a selected non-Wi-Fi signal. Both can run at once, allowing a controlled combined interference scene without repeatedly rearranging the test bench.",
    evaluate: [
      "Co-channel and adjacent-channel interference",
      "WMM voice, video, best effort and background",
      "Wi-Fi with Bluetooth or IEEE 802.15.4 traffic",
      "Noise sensitivity using AWGN",
    ],
    evidence: [
      "Performance under defined interference",
      "Comparison across WMM traffic classes",
      "A reusable interference configuration",
    ],
    steps: [
      {
        title: "Establish a quiet reference",
        description:
          "Measure the DUT with the interferer stopped and record the reference traffic.",
      },
      {
        title: "Define the scene",
        description:
          "Select the interfering channel, bandwidth, traffic class, level and inter-frame spacing. Choose a non-Wi-Fi profile when needed.",
      },
      {
        title: "Change one condition",
        description:
          "Step interference power or channel load while keeping the remaining parameters fixed.",
      },
      {
        title: "Repeat and compare",
        description:
          "Review throughput, latency or recovery against the quiet reference. Preserve the settings for a repeat run through the HTTP API.",
      },
    ],
    note: "One non-Wi-Fi signal type runs at a time. Non-Wi-Fi output is a control setting rather than a calibrated absolute value; measure actual power when that value matters.",
    questions: [
      {
        question: "Can Wi-Fi and Bluetooth run at the same time?",
        answer:
          "Yes. MT-Wave’s independent radios can generate Wi-Fi traffic and the selected Bluetooth profile together. One non-Wi-Fi signal type runs at a time.",
      },
      {
        question: "Does this generate Matter application traffic?",
        answer:
          "The IEEE 802.15.4 stimulus supports coexistence evaluation around Zigbee, Thread and Matter devices. It should not be treated as a complete Matter application-traffic generator; agree application-level requirements in the test plan.",
      },
    ],
  },
  {
    id: "radar-and-dfs",
    category: "DFS development",
    title: "Radar detection and DFS validation",
    tagline: "Exercise channel changes under radar.",
    introduction:
      "Use representative radar patterns to explore detection, channel availability checks and channel-move behaviour during development and pre-compliance testing.",
    instruments: ["MT-Wave", "MT-C24"],
    question: "How does the device respond to radar?",
    explanation:
      "MT-Wave provides radar profiles for eight regulatory regions and lets the selected pattern be placed independently on a supported 5 GHz channel. A controlled setup helps reproduce the conditions around a channel transition and compare behaviour across firmware revisions.",
    evaluate: [
      "Radar detection behaviour",
      "Channel availability checks",
      "Channel-move and recovery observations",
      "Regional profile selection",
    ],
    evidence: [
      "Observed detection and channel behaviour",
      "Packet evidence around the transition",
      "Repeatable development checks",
    ],
    steps: [
      {
        title: "Select the region",
        description:
          "Choose the required profile from FCC, ETSI, Japan, Korea, Taiwan, Canada, Singapore or Australia / New Zealand.",
      },
      {
        title: "Set the channel",
        description:
          "Configure the DUT and select the radar placement. Record the RF path and measured stimulus level.",
      },
      {
        title: "Observe the transition",
        description:
          "Start the selected radar profile and capture the device’s response and subsequent channel behaviour.",
      },
      {
        title: "Build a regression case",
        description:
          "Preserve the setup and observations so engineering can repeat the same development check.",
      },
    ],
    note: "Formal certification requires accredited test equipment. Five listed long-pulse chirp profiles cannot be transmitted with current firmware: Japan Type 3 and Korea, Taiwan, Canada and FCC Type 5.",
    questions: [
      {
        question: "Is this a certification system?",
        answer:
          "This approach supports development and pre-compliance checks. Formal certification requires accredited test equipment and the applicable certification process.",
      },
      {
        question: "Are all listed radar profiles currently available?",
        answer:
          "No. Current firmware cannot transmit five listed long-pulse chirp profiles: Japan Type 3 and Korea, Taiwan, Canada and FCC Type 5. Confirm the required profile set when scoping the evaluation.",
      },
    ],
  },
  {
    id: "mesh-and-roaming",
    category: "Mobility & mesh",
    title: "Mesh and roaming validation",
    tagline: "Follow the connection as RF conditions change.",
    introduction:
      "Evaluate a device across controlled RF transitions, roaming conditions and mesh backhaul loading using a system configuration matched to the topology.",
    instruments: ["MT-C24"],
    question: "Does connectivity continue through the transition?",
    explanation:
      "A multi-enclosure setup separates the gateway, mesh nodes and selected clients. Programmable RF paths vary the relative signal conditions between them, making it possible to repeat a transition while observing traffic continuity and recovery.",
    evaluate: [
      "Roaming between defined RF conditions",
      "Band-steering behaviour",
      "Mesh backhaul and client traffic",
      "Application continuity during transitions",
    ],
    evidence: [
      "Topology and RF-path definition",
      "Transition and recovery observations",
      "Packet context for roaming issues",
    ],
    steps: [
      {
        title: "Map the topology",
        description:
          "Identify the gateway, mesh nodes, clients and RF links that the evaluation needs.",
      },
      {
        title: "Define the RF transition",
        description:
          "Record starting levels and the path-loss changes that will trigger the scenario.",
      },
      {
        title: "Run the traffic",
        description:
          "Observe the selected traffic while the RF conditions change. Include packet capture where it can explain the transition.",
      },
      {
        title: "Review recovery",
        description:
          "Compare continuity, loss and recovery against the agreed acceptance criteria and repeat the transition.",
      },
    ],
    note: "Mesh and roaming coverage depends on the configured system and agreed case matrix. Presentation block diagrams explain logical connections, not a complete port-to-port cable schedule.",
    questions: [
      {
        question: "Which system should we start with?",
        answer:
          "Start with the required topology: gateway, mesh nodes, clients and controlled RF links. Use that case matrix to select the enclosure and client configuration with our team.",
      },
      {
        question: "Does TR-398 coverage mean certification?",
        answer:
          "A configured test package can cover agreed TR-398 cases. Coverage alone does not establish certification; confirm the applicable cases, method and acceptance requirements for your programme.",
      },
    ],
  },
  {
    id: "automation-and-diagnosis",
    category: "Automation & diagnosis",
    title: "Repeatable testing and packet-level diagnosis",
    tagline: "Turn an observation into a repeatable test.",
    introduction:
      "Connect test configuration, execution and evidence so a performance issue can be reproduced, investigated and checked again on the next firmware build.",
    instruments: ["MT-Wave", "MT-C24"],
    question: "Can another engineer reproduce the result?",
    explanation:
      "A useful result includes the conditions that produced it. MT-Wave exposes browser controls and an HTTP API with JSON; the capabilities presentation also describes MT-Core test sequences and MT-Sniffer’s distributed capture workflow. Integration is scoped to the selected test package.",
    evaluate: [
      "Recorded RF and traffic configurations",
      "Scripted interference control",
      "Per-station capture and analysis",
      "Configured acceptance limits and reports",
    ],
    evidence: [
      "Repeatable test configuration",
      "KPI and diagnostic context",
      "Results linked to an engineering issue",
    ],
    steps: [
      {
        title: "Define",
        description:
          "Select the test cases, traffic, RF profiles and acceptance limits.",
      },
      {
        title: "Execute",
        description:
          "Apply the DUT and client configuration, run the sequence and monitor status.",
      },
      {
        title: "Evaluate",
        description:
          "Compare measured KPIs with the selected limits and collect diagnostic context.",
      },
      {
        title: "Report",
        description:
          "Review the results, charts and capture evidence. Retain the configuration with the issue record.",
      },
    ],
    note: "Automation and DUT command integration depend on the configured test package. Capture analysis depends on the radio, driver and supplied PHY metadata.",
    questions: [
      {
        question: "Does MT-Wave need desktop software?",
        answer:
          "MT-Wave provides browser controls and an HTTP API with JSON. The automation and DUT integration required for a broader sequence depend on the selected test package.",
      },
      {
        question: "What can MT-Sniffer help investigate?",
        answer:
          "Its distributed capture workflow adds per-station packet context to performance and connectivity observations. Available analysis depends on the radio, driver and supplied PHY metadata.",
      },
    ],
  },
];

export const applications = [
  {
    title: "Performance and rate versus range",
    description:
      "Measure throughput as the signal is attenuated step by step. MT-C24 automates RVR and RVRO runs, with programmable attenuators setting the path loss.",
    instrument: "MT-C24",
    approach: "performance-and-range",
  },
  {
    title: "Wi-Fi 7 and Multi-Link Operation",
    description:
      "Check MLO in EMLSR and MLMR modes, preamble puncturing and Multi-RU against 24 or 48 real client radios.",
    instrument: "MT-C24",
    approach: "wifi-7-and-mlo",
  },
  {
    title: "Wi-Fi robustness and QoS",
    description:
      "See how an access point or client behaves under co-channel and adjacent-channel congestion, at a level and channel load you choose.",
    instrument: "MT-Wave + MT-C24",
    approach: "coexistence-and-interference",
  },
  {
    title: "Wi-Fi and Bluetooth coexistence",
    description:
      "Play Bluetooth Classic, Low Energy and Long Range signals in the 2.4 GHz band while Wi-Fi traffic runs.",
    instrument: "MT-Wave",
    approach: "coexistence-and-interference",
  },
  {
    title: "Zigbee, Thread and Matter coexistence",
    description:
      "Place IEEE 802.15.4 frames next to busy Wi-Fi channels and watch what the device does.",
    instrument: "MT-Wave",
    approach: "coexistence-and-interference",
  },
  {
    title: "DFS development and pre-compliance",
    description:
      "Exercise radar detection, channel availability check and channel-move behaviour with radar patterns for eight regulatory regions.",
    instrument: "MT-Wave",
    approach: "radar-and-dfs",
  },
  {
    title: "6 GHz and Wi-Fi 6E stress testing",
    description: "Generate interference across U-NII-5 to U-NII-8.",
    instrument: "MT-Wave",
    approach: "coexistence-and-interference",
  },
  {
    title: "Sensitivity and SNR curves",
    description:
      "Raise the noise floor with AWGN without moving the device under test.",
    instrument: "MT-Wave",
    approach: "performance-and-range",
  },
  {
    title: "Regression and field-issue reproduction",
    description:
      "Script the interference scene once and replay it exactly on every build.",
    instrument: "MT-Wave",
    approach: "automation-and-diagnosis",
  },
];

export const evaluationSteps = [
  {
    title: "Scope the device",
    description:
      "Identify the DUT, firmware, supported bands and features you want to validate.",
  },
  {
    title: "Agree the case matrix",
    description:
      "Select the baseline, feature and robustness cases. Define the measurements and acceptance limits before testing.",
  },
  {
    title: "Configure the system",
    description:
      "Match clients, enclosures and controlled RF paths to the agreed cases.",
  },
  {
    title: "Review the findings",
    description:
      "Keep the results and diagnostic context together so the next action is clear and the important cases can be repeated.",
  },
];

export const generalQuestions: Question[] = [
  {
    question: "Can the test plan include application traffic?",
    answer:
      "Yes, application traffic can form part of an agreed evaluation. Define the application, traffic direction, continuity measurements and acceptance criteria before selecting the configuration.",
  },
  {
    question: "Do I need to buy a complete system?",
    answer:
      "You can discuss individual instruments, a configured system for your lab, or test as a service on Wavemetrik systems. Sales can help scope the option around your devices and test cases.",
  },
  {
    question: "How is standards coverage agreed?",
    answer:
      "Start with the applicable standard and required case matrix, then agree the method, equipment configuration and acceptance limits. Record coverage and any exclusions in the selected test package.",
  },
];

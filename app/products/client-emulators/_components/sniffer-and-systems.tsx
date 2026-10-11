import Link from "next/link";

// Two short briefs. MT-Sniffer is from slides 19, 31 and 32 of the
// capabilities deck; MT-SYS is from slides 3, 4 and 9, and has its own page.
const PRODUCTS = [
  {
    name: "MT-Sniffer",
    role: "Distributed capture and analysis",
    description:
      "A browser console coordinates capture benches and presents live station-level diagnostics.",
    points: [
      "Coordinates capture starts, stops and test identifiers across benches",
      "Per-STA airtime estimates, RSSI, rates and retries with frame context",
      "Multi-band capture in one PCAPNG",
    ],
    listLabel: "Nine modules for packet-level diagnosis",
    list: [
      "Airtime & efficiency",
      "Aggregation",
      "Channel & contention",
      "Rate adaptation",
      "OFDMA / MU-MIMO",
      "Signal quality & PHY",
      "QoS / WMM / EDCA",
      "Connection stability",
      "Frame inspector",
    ],
    link: null,
  },
  {
    name: "MT-SYS",
    role: "Rack and shielded RF environment",
    description:
      "A compact rack integrates the RF environment, client radios and test control.",
    points: [
      "More than 90 dB isolation up to 8 GHz",
      "Absorber-lined interiors",
      "24, 48 or 96 stations, with 24 radios in each MT-C24 module",
    ],
    listLabel: "Configurations",
    list: ["MT-SYS-1", "MT-SYS-2/3", "TR-398", "MT-SYS-5"],
    link: { href: "/products/wifi-test-systems", label: "See MT-SYS" },
  },
];

export function SnifferAndSystems() {
  return (
    <section
      id="sniffer-and-systems"
      aria-labelledby="sniffer-and-systems-heading"
      className="page-section"
    >
      <h2
        id="sniffer-and-systems-heading"
        className="max-w-2xl section-heading"
      >
        MT-Sniffer and <span className="whitespace-nowrap">MT-SYS</span>
      </h2>

      <ul className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-2 lg:gap-5">
        {PRODUCTS.map((product) => (
          <li
            key={product.name}
            className="flex flex-col surface-panel rounded-3xl bg-muted p-7 sm:p-8"
          >
            <h3 className="text-title-1 font-semibold">{product.name}</h3>
            <p className="mt-1 text-subhead/[1.375rem] text-muted-foreground">
              {product.role}
            </p>
            <p className="mt-5 max-w-[46ch] text-callout/[1.5rem] text-pretty">
              {product.description}
            </p>
            <ul className="mt-4 flex flex-col gap-1.5 text-subhead/[1.375rem] text-muted-foreground">
              {product.points.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[0.5625rem] size-1 shrink-0 rounded-full bg-muted-foreground/60"
                  />
                  {point}
                </li>
              ))}
            </ul>

            {/* Pinned to the bottom, so the two tiles end on the same line. */}
            <div className="mt-auto pt-8">
              <p className="text-footnote text-muted-foreground">
                {product.listLabel}
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {product.list.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-background px-3 py-1 text-footnote font-medium"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {product.link && (
                <Link
                  href={product.link.href}
                  // In the text color and underlined: the button blue is
                  // under 4.5:1 on --muted in the dark.
                  className="mt-6 block w-fit rounded-sm text-subhead font-medium underline decoration-foreground/30 underline-offset-4 outline-none hover:decoration-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {product.link.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-[75ch] text-footnote/[1.25rem] text-muted-foreground">
        MT-Sniffer: captured data and decoded features depend on the radio,
        driver and supplied PHY metadata.
      </p>
    </section>
  );
}

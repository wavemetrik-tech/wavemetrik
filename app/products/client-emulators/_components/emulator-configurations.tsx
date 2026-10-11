import { PartDrawing } from "@/components/diagrams/part-drawings";

// From slide 8 of the capabilities deck (content/wavemetrik-presentation.md).
const PLATFORMS = [
  {
    id: "real",
    name: "MT-C24 / MT-C4",
    summary: "Real-radio clients",
    drawing: "clients",
  },
  {
    id: "emulated",
    name: "MT-BE",
    summary: "Up to 4×4 MIMO emulation",
    drawing: "emulator",
  },
] as const;

const CAPABILITIES: { name: string; real: string[]; emulated: string[] }[] = [
  {
    name: "Radio architecture",
    real: ["Up to 2×2 MIMO per radio", "MT-C24: up to 24 radios"],
    emulated: ["Up to 4×4 MIMO"],
  },
  {
    name: "Station scale",
    real: ["Scales through real-radio modules"],
    emulated: ["Up to 128 stations per band"],
  },
  {
    name: "MLO modes listed",
    real: ["eMLSR, MLMR, MLSR"],
    emulated: ["MLMR, STR"],
  },
  {
    name: "Channel widths listed",
    real: ["80 / 160 / 320 MHz"],
    emulated: ["80 / 160 / 320 MHz"],
  },
  {
    name: "AP and STA roles",
    real: ["Supported configurations"],
    emulated: ["Supported configurations"],
  },
  {
    name: "Multi-user features",
    real: ["OFDMA, MU-MIMO, puncturing"],
    emulated: ["OFDMA, MU-MIMO, puncturing"],
  },
  {
    name: "RF and visibility",
    real: ["Individual shielded paths and sniffing"],
    emulated: ["Individual shielded paths and monitoring"],
  },
];

const COLUMNS = "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)]";

export function EmulatorConfigurations() {
  return (
    <section
      id="emulator-configurations"
      aria-labelledby="emulator-configurations-heading"
      className="page-section"
    >
      <header className="max-w-2xl">
        <h2 id="emulator-configurations-heading" className="section-heading">
          Client emulator configurations
        </h2>
        <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
          Platform selection follows spatial streams, station count and the MLO
          behavior under test.
        </p>
      </header>

      {/* The two platforms head the columns on wide screens. On narrow
          screens they are shown side by side above the list, and each row
          names its platform. */}
      <div
        className={`mt-10 grid grid-cols-2 gap-x-12 gap-y-6 sm:mt-14 ${COLUMNS}`}
      >
        <div className="max-lg:hidden" />
        {PLATFORMS.map((platform) => (
          <div key={platform.id}>
            <PartDrawing
              id={platform.drawing}
              className="rounded-3xl p-3 sm:p-4"
            />
            <p className="mt-5 text-title-3 font-semibold">{platform.name}</p>
            <p className="mt-1 text-subhead/[1.375rem] text-muted-foreground">
              {platform.summary}
            </p>
          </div>
        ))}
      </div>

      <ul className="mt-8 border-b">
        {CAPABILITIES.map((capability) => (
          <li
            key={capability.name}
            className={`grid gap-x-12 gap-y-4 border-t py-5 lg:items-baseline ${COLUMNS}`}
          >
            <h3 className="text-subhead font-semibold">{capability.name}</h3>
            {PLATFORMS.map((platform) => (
              <p key={platform.id} className="text-subhead/[1.375rem]">
                <span className="mb-0.5 block text-footnote text-muted-foreground lg:sr-only">
                  {platform.name}
                </span>
                {capability[platform.id].map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-[75ch] text-footnote/[1.25rem] text-muted-foreground">
        Feature availability depends on the selected radio, OS/driver, DUT and
        region.
      </p>
    </section>
  );
}

import { nonWifiSpecs, wifiSpecs } from "../_data/overview";
import { SignalExplorer } from "./signal-explorer";
import { SpecList } from "./spec-list";
import { WifiSpectrum } from "./wifi-spectrum";

const SECTION = "page-section";
const SPLIT = "grid items-center gap-x-16 gap-y-12 lg:grid-cols-2";
const HEADING = "section-heading";
const INTRO =
  "mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5";

export function WifiInterference() {
  return (
    <section
      id="wifi-interference"
      aria-labelledby="wifi-interference-heading"
      className={SECTION}
    >
      <div className={SPLIT}>
        <div>
          <h2 id="wifi-interference-heading" className={HEADING}>
            Wi-Fi interference
          </h2>
          <p className={INTRO}>
            The Wi-Fi radio transmits continuous 802.11 traffic that the unit
            generates itself. Placing it on the same channel as the device under
            test, or on a neighboring one, produces co-channel or
            adjacent-channel interference at a level and channel load you
            choose.
          </p>
          <SpecList specs={wifiSpecs} className="mt-10 border-b" />
        </div>
        <WifiSpectrum />
      </div>
    </section>
  );
}

export function NonWifiInterference() {
  return (
    <section
      id="non-wifi-interference"
      aria-labelledby="non-wifi-interference-heading"
      className={SECTION}
    >
      <div className={SPLIT}>
        <div className="lg:order-2">
          <h2 id="non-wifi-interference-heading" className={HEADING}>
            <span className="whitespace-nowrap">Non-Wi-Fi</span> interference
          </h2>
          <p className={INTRO}>
            The second radio plays ready-made recordings of Bluetooth, Zigbee,
            radar and noise signals. You choose which signal to play and where
            to place it in the spectrum. One signal type is active at a time,
            and it runs independently of the Wi-Fi radio.
          </p>
          <SpecList specs={nonWifiSpecs} className="mt-10 border-b" />
        </div>
        <SignalExplorer />
      </div>
    </section>
  );
}

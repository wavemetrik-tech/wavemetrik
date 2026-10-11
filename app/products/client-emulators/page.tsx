import type { Metadata } from "next";
import { ProductNav } from "@/components/product-nav";
import { ProductContact } from "@/components/product-contact";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { breadcrumbSchema, pageMetadata, productSchema } from "@/lib/seo";
import { ClientLoad } from "./_components/client-load";
import { EmulatorConfigurations } from "./_components/emulator-configurations";
import { HEADLINE_SPECS, Hero } from "./_components/hero";
import { LiveTelemetry } from "./_components/live-telemetry";
import { MeasuredThroughput } from "./_components/measured-throughput";
import { MloModes } from "./_components/mlo-modes";
import { MultiUserValidation } from "./_components/multi-user-validation";
import { OrientationRange } from "./_components/orientation-range";
import { RateAdaptation } from "./_components/rate-adaptation";
import { RfPaths } from "./_components/rf-paths";
import { SnifferAndSystems } from "./_components/sniffer-and-systems";
import { TestAutomation } from "./_components/test-automation";

const PAGE = {
  title: "MT-C24 Wi-Fi 7 client emulators",
  description:
    "MT-C24 emulates up to 24 real-radio Wi-Fi 7 clients on individual RF paths, for client scaling, Multi-Link Operation and interoperability testing.",
  path: "/products/client-emulators",
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function ClientEmulatorsPage() {
  return (
    <PageFrame className="product-page">
      <Hero />
      <JsonLd
        data={[
          productSchema({
            ...PAGE,
            name: "MT-C24",
            category: "Wi-Fi client emulators",
            specs: HEADLINE_SPECS,
          }),
          breadcrumbSchema([
            ["Products", "/products"],
            [PAGE.title, PAGE.path],
          ]),
        ]}
      />
      <ProductNav
        product="MT-C24"
        items={[
          { id: "emulator-configurations", label: "Emulators" },
          { id: "rf-paths", label: "RF paths" },
          { id: "test-automation", label: "Automation" },
          { id: "live-telemetry", label: "Measurements" },
          { id: "mlo-modes", label: "Wi-Fi 7 & MLO" },
        ]}
      />
      <EmulatorConfigurations />
      <RfPaths />
      <TestAutomation />
      <LiveTelemetry />
      <MeasuredThroughput />
      <RateAdaptation />
      <OrientationRange />
      <ClientLoad />
      <MloModes />
      <MultiUserValidation />
      <SnifferAndSystems />
      <ProductContact product="MT-C24" />
    </PageFrame>
  );
}

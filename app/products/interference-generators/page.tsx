import type { Metadata } from "next";
import { ProductNav } from "@/components/product-nav";
import { ProductContact } from "@/components/product-contact";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { breadcrumbSchema, pageMetadata, productSchema } from "@/lib/seo";
import { Applications } from "./_components/applications";
import { Hero } from "./_components/hero";
import { headlineSpecs } from "./_data/overview";
import {
  NonWifiInterference,
  WifiInterference,
} from "./_components/interference-sections";
import { KeyFeatures } from "./_components/key-features";
import { ReferenceTestConfiguration } from "./_components/reference-test-configuration";
import { SampleTestResults } from "./_components/sample-test-results";

const PAGE = {
  title: "MT-Wave Wi-Fi and non-Wi-Fi interference generator",
  description:
    "MT-Wave generates controlled Wi-Fi, Bluetooth, Zigbee, DFS radar and AWGN interference on the 2.4, 5 and 6 GHz bands for repeatable wireless device testing.",
  path: "/products/interference-generators",
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function InterferenceGeneratorsPage() {
  return (
    <PageFrame className="product-page">
      <Hero />
      <JsonLd
        data={[
          productSchema({
            ...PAGE,
            name: "MT-Wave",
            category: "RF interference generators",
            specs: headlineSpecs,
          }),
          breadcrumbSchema([
            ["Products", "/products"],
            [PAGE.title, PAGE.path],
          ]),
        ]}
      />
      <ProductNav
        product="MT-Wave"
        items={[
          { id: "key-features", label: "Features" },
          { id: "wifi-interference", label: "Wi-Fi" },
          { id: "non-wifi-interference", label: "Non-Wi-Fi" },
          { id: "applications", label: "Applications" },
          { id: "sample-test-results", label: "Test results" },
        ]}
      />
      <KeyFeatures />
      <WifiInterference />
      <NonWifiInterference />
      <Applications />
      <ReferenceTestConfiguration />
      <SampleTestResults />
      <ProductContact product="MT-Wave" />
    </PageFrame>
  );
}

import type { Metadata } from "next";
import { ProductNav } from "@/components/product-nav";
import { ProductContact } from "@/components/product-contact";
import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { breadcrumbSchema, pageMetadata, productSchema } from "@/lib/seo";
import { Hero } from "./_components/hero";
import { headlineSpecs } from "./_data/platform";
import { PlatformParts } from "./_components/platform-parts";
import { SystemConfigurations } from "./_components/system-configurations";
import { TestCoverage } from "./_components/test-coverage";

const PAGE = {
  title: "MT-SYS Wi-Fi test systems",
  description:
    "MT-SYS is a modular shielded RF test environment for Wi-Fi performance, MLO, coexistence, mesh and roaming validation, with 24, 48 or 96 client stations.",
  path: "/products/wifi-test-systems",
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function WifiTestSystemsPage() {
  return (
    <PageFrame className="product-page">
      <Hero />
      <JsonLd
        data={[
          productSchema({
            ...PAGE,
            name: "MT-SYS",
            category: "Wi-Fi test systems",
            specs: headlineSpecs,
          }),
          breadcrumbSchema([
            ["Products", "/products"],
            [PAGE.title, PAGE.path],
          ]),
        ]}
      />
      <ProductNav
        product="MT-SYS"
        items={[
          { id: "test-coverage", label: "Test coverage" },
          { id: "platform-parts", label: "Platform" },
          { id: "system-configurations", label: "Configurations" },
        ]}
      />
      <TestCoverage />
      <PlatformParts />
      <SystemConfigurations />
      <ProductContact product="MT-SYS" />
    </PageFrame>
  );
}

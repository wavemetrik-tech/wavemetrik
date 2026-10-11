import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { Contact } from "./_components/contact";
import { Expertise } from "./_components/expertise";
import { Hero } from "./_components/hero";
import { Principles } from "./_components/principles";
import { Values } from "./_components/values";
import { Vision } from "./_components/vision";

const PAGE = {
  title: "About us",
  description:
    "Wavemetrik delivers wireless test and measurement solutions from Bangalore: Wi-Fi 7 client emulation, interference generation and complete test systems.",
  path: "/about-us",
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function AboutUsPage() {
  return (
    <PageFrame className="about-page">
      <JsonLd data={breadcrumbSchema([["About", PAGE.path]])} />
      <Hero />
      <Principles />
      <Values />
      <Expertise />
      <Vision />
      <Contact />
    </PageFrame>
  );
}

import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { pageMetadata } from "@/lib/seo";

// Kept out of search results until the terms are in place.
export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "Wavemetrik’s terms and conditions.",
  path: "/terms-conditions",
  index: false,
});

export default function TermsConditionsPage() {
  return <PolicyPage title="Terms & Conditions" />;
}

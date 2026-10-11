import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { pageMetadata } from "@/lib/seo";

// Kept out of search results until the policy text is in place.
export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Wavemetrik’s privacy policy.",
  path: "/privacy-policy",
  index: false,
});

export default function PrivacyPolicyPage() {
  return <PolicyPage title="Privacy Policy" />;
}

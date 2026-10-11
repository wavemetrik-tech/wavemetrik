import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/policy-page";
import { pageMetadata } from "@/lib/seo";

const PAGE = {
  title: "Terms & Conditions",
  description:
    "The terms for using the Wavemetrik website: permitted use, product information, documents sent on request, intellectual property and liability.",
  path: "/terms-conditions",
};

export const metadata: Metadata = pageMetadata(PAGE);

const SECTIONS: PolicySection[] = [
  {
    title: "About these terms",
    blocks: [
      "This website, www.wavemetrik.com, is operated by Wavemetrik Technologies Pvt. Ltd. (“Wavemetrik”, “we”, “us”), a company based in Bangalore, India. By using the website you agree to these terms. If you do not agree, please do not use it.",
      "These terms cover the website only. The purchase, evaluation and support of Wavemetrik products are governed by the quotation, order or written agreement for that transaction. If that agreement and these terms differ, the agreement applies.",
    ],
  },
  {
    title: "Using the website",
    blocks: [
      "You may view the website, link to it, and print or save its pages for your own evaluation of Wavemetrik products. You agree not to:",
      [
        "Use the website in a way that breaks the law or infringes anyone’s rights",
        "Try to gain unauthorised access to the website or the systems behind it, or disrupt or overload them",
        "Introduce malicious code",
        "Copy the website in bulk by automated means, other than ordinary indexing by search engines",
        "Suggest that you are affiliated with or endorsed by Wavemetrik when you are not",
      ],
    ],
  },
  {
    title: "Product information",
    blocks: [
      "The website describes our products for general information. Specifications, configurations, features and availability can change without notice and can differ between configurations.",
      "The charts, measurements and test results shown are examples obtained under specific conditions. They are not a guarantee of the results you will obtain with your own device and setup.",
      "Nothing on the website is an offer to sell or a binding commitment. The specifications that bind us are those in our written quotation or agreement. The engineering guides are general guidance and are not advice for your particular test.",
    ],
  },
  {
    title: "Documents sent on request",
    blocks: [
      "Some documents, such as datasheets and our technical presentation, are not published on the website and are sent on request. They are provided so that you can evaluate Wavemetrik products.",
      "A document may be marked confidential or come with its own terms, and those terms apply to it. Please do not publish or redistribute these documents without our written permission.",
    ],
  },
  {
    title: "Intellectual property",
    blocks: [
      "The content of this website, including its text, drawings, diagrams, charts, design and software, belongs to Wavemetrik or its licensors and is protected by copyright and other laws. Apart from the limited use described above, these terms give you no licence or right to it.",
      "The Wavemetrik name and logo, and product names including MT-C24, MT-Wave and MT-SYS, are marks of Wavemetrik. You may not use them without our written permission, except to refer accurately to our company and products.",
      "Wi-Fi is a trademark of Wi-Fi Alliance. Bluetooth is a trademark of Bluetooth SIG, Inc. Zigbee is a trademark of the Connectivity Standards Alliance. These and other third-party names are used only to describe the technologies our products work with, and do not imply any affiliation or endorsement.",
    ],
  },
  {
    title: "Contacting us",
    blocks: [
      "Messages you send us are handled as described in our Privacy Policy.",
      "Unless we have agreed otherwise in writing, for example under a non-disclosure agreement, please do not send us confidential information through the website’s general contacts. We cannot treat unsolicited material as confidential.",
    ],
  },
  {
    title: "Third-party services and links",
    blocks: [
      "The website includes a map provided by Google and may link to other websites. We do not control those services and are not responsible for their content or practices. Their own terms and privacy policies apply when you use them.",
    ],
  },
  {
    title: "No warranty",
    blocks: [
      "We work to keep the website accurate and available, but it is provided “as is” and “as available”. To the extent the law allows, we give no warranty, express or implied, that its content is accurate, complete or suitable for a particular purpose, or that the website will be uninterrupted or free of errors. We may change, suspend or withdraw any part of it at any time.",
    ],
  },
  {
    title: "Limitation of liability",
    blocks: [
      "To the extent the law allows, Wavemetrik is not liable for any indirect, incidental, special or consequential loss, or for loss of profits, data or business, arising from your use of the website, your inability to use it, or your reliance on its content.",
      "Nothing in these terms excludes or limits liability that cannot be excluded or limited by law. Our liability in relation to Wavemetrik products is set out in the agreement for those products.",
    ],
  },
  {
    title: "Governing law",
    blocks: [
      "These terms are governed by the laws of India. The courts at Bengaluru, Karnataka have exclusive jurisdiction over any dispute about the website or these terms, to the extent the law allows.",
    ],
  },
  {
    title: "Changes to these terms",
    blocks: [
      "We may update these terms from time to time. The date at the top of this page shows when they were last changed. By continuing to use the website after a change, you accept the updated terms.",
      "If any part of these terms is found to be unenforceable, the rest remains in effect.",
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <PolicyPage
      title={PAGE.title}
      path={PAGE.path}
      updated="11 October 2026"
      summary="These terms apply to your use of this website. They are separate from the agreements under which Wavemetrik supplies its products, which have their own terms."
      sections={SECTIONS}
      related={{ label: "Read the Privacy Policy", href: "/privacy-policy" }}
    />
  );
}

import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/policy-page";
import { pageMetadata } from "@/lib/seo";

const PAGE = {
  title: "Privacy Policy",
  description:
    "What information Wavemetrik receives when you visit this website or contact us, how it is used, who it is shared with, and the choices you have.",
  path: "/privacy-policy",
};

export const metadata: Metadata = pageMetadata(PAGE);

// Each statement here describes what the site does today: PostHog analytics
// in cookieless mode (`lib/posthog.ts`), the forms that are emailed to us
// through Resend (`lib/send-enquiry.ts`), the events sent from the forms, and
// the map on the contact page. A change to the site that collects more or
// differently (another analytics or embedded service, a form that stores
// what it is sent or sends it somewhere else, a new event property) needs a
// matching change to this text and to `updated`.
const SECTIONS: PolicySection[] = [
  {
    title: "Who we are",
    blocks: [
      "Wavemetrik Technologies Pvt. Ltd. (“Wavemetrik”, “we”, “us”) is a company based in Bangalore, India. We operate www.wavemetrik.com and are responsible for the personal information described in this policy.",
      "This policy covers the website and the enquiries we receive through it. It does not cover Wavemetrik products or our agreements with customers, which have their own terms.",
    ],
  },
  {
    title: "Information you send us",
    blocks: [
      "The forms on this website (the contact form and the requests for a datasheet or the technical presentation) send what you type to us by email. When you submit one, the website passes it to Resend, an email delivery service, which delivers it to our mailbox. The website itself does not keep a copy, and none of it is sent to our analytics provider. Resend keeps a record of the emails it delivers for a limited period.",
      "When you use a form, email us or call us, we receive what you choose to share. This usually includes:",
      [
        "Your name, work email address and company",
        "Your phone number, if you call us or include it",
        "The content of your message, such as the product you are interested in and what you are testing",
      ],
      "Please do not send confidential information or sensitive personal information that you would not want us to hold.",
    ],
  },
  {
    title: "Information collected automatically",
    blocks: [
      "Some information is collected automatically when you visit:",
      [
        "Hosting logs. The website is hosted by Vercel Inc. Like any web host, its servers process technical details of each request: your IP address, your browser and device type, the page requested, the date and time, and the page that referred you. This is used to deliver the site, keep it secure and diagnose problems.",
        "Usage analytics, described in the next section.",
        "Your theme choice. If you switch the site between light and dark, that choice is saved in your browser’s local storage, on your device, so the site remembers it. It is not sent to us.",
      ],
      "This website does not set cookies of its own, and we do not use advertising networks.",
    ],
  },
  {
    title: "Analytics without cookies",
    blocks: [
      "We use PostHog, an analytics service, to understand how the website is used and to find and fix problems with it. It runs in a cookieless mode: it does not set a cookie and does not store anything in your browser. PostHog’s scripts are loaded from its servers, and it collects on our behalf:",
      [
        "The pages you view, the links and buttons you use, and the page that referred you",
        "Your browser, device type, screen size and language, and how quickly pages load",
        "That you opened one of our request forms or sent a form, together with the kind of enquiry, document or product chosen. What you type into a form, including your name, email address and message, is not collected",
        "Errors that occur in your browser while you use the site, and a small number of diagnostic messages",
      ],
      "To count visits without identifying anyone, PostHog’s servers turn your IP address and browser type into an anonymous code that changes every day. The code cannot be turned back into your IP address, and we do not use your IP address to work out where you are. We do not link this information to your name or contact details, and we do not use it for advertising.",
      "Because nothing is stored in your browser, there is no analytics cookie to accept or delete. If your browser or an extension blocks analytics, the website works the same.",
    ],
  },
  {
    title: "Google Maps on the contact page",
    blocks: [
      "Our contact page shows a map provided by Google. When the map loads, your browser connects to Google, which receives your IP address and browser details and may set its own cookies. Google handles that information under its own privacy policy.",
      "The “Get directions” button opens Google Maps in a new tab.",
    ],
  },
  {
    title: "How we use information",
    blocks: [
      "We use the information described above to:",
      [
        "Answer your enquiry and send what you asked for, such as a datasheet, the presentation or a quotation",
        "Provide sales and technical support, and manage our relationship with customers and prospective customers",
        "Operate, secure and improve this website",
        "Meet our legal and regulatory obligations",
      ],
      "We may follow up on your enquiry by email or phone. If you would rather we stop, tell us and we will.",
      "We handle this information because you have asked us to, because we have a legitimate business reason such as keeping the site secure, or because the law requires it. We do not sell personal information, and we do not use it for automated decisions or profiling.",
    ],
  },
  {
    title: "Who we share it with",
    blocks: [
      "We share personal information only where there is a reason to:",
      [
        "With service providers that host this website, provide its analytics, deliver the email from its forms and run our email and business systems, who handle it on our behalf",
        "With our professional advisers, such as lawyers and auditors, where needed",
        "With courts, regulators or authorities, where the law requires it",
        "With a successor to our business, if Wavemetrik is merged, acquired or reorganised",
      ],
      "We do not sell or rent personal information to anyone.",
    ],
  },
  {
    title: "Where information is processed",
    blocks: [
      "Wavemetrik is based in India. Our service providers, including our hosting provider, our analytics provider, our email delivery provider and Google, may process information in other countries, including the United States and countries in the European Union. Where information is transferred across borders, we do so in line with the law that applies.",
    ],
  },
  {
    title: "How long we keep it",
    blocks: [
      "We keep enquiries and correspondence for as long as we need them to answer you and to maintain our business relationship. After that, we keep them only for as long as the law or ordinary record-keeping requires. Hosting logs and analytics data are kept by those providers for a limited period.",
    ],
  },
  {
    title: "Security",
    blocks: [
      "We use reasonable technical and organisational measures to protect the information we hold, and this website is served only over an encrypted connection (HTTPS). No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your choices and rights",
    blocks: [
      "You can ask us to:",
      [
        "Tell you what personal information we hold about you",
        "Correct or update it",
        "Delete it",
        "Stop contacting you, or stop using your information where we rely on your consent",
      ],
      "Depending on where you live, you may have further rights under laws such as India’s Digital Personal Data Protection Act, 2023, or the EU General Data Protection Regulation. To make a request or raise a concern, write to us at the address in “Contact us” below. We will answer within a reasonable time and may need to confirm your identity first.",
      "If you are not satisfied with our answer, you may have the right to complain to the data protection authority where you live.",
    ],
  },
  {
    title: "Children",
    blocks: [
      "This website is intended for businesses and engineers. It is not directed at children, and we do not knowingly collect personal information from anyone under 18.",
    ],
  },
  {
    title: "Changes to this policy",
    blocks: [
      "We may update this policy when the website or the law changes. The date at the top of this page shows when it was last changed, and the current version is always the one published here.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title={PAGE.title}
      path={PAGE.path}
      updated="13 October 2026"
      summary="This policy explains what information we receive when you visit this website or contact us, and what we do with it. In short: the site sets no cookies of its own, we use one cookieless analytics service to see how it is used, we do not use advertising, and what you type into our forms is sent only to us, by email."
      sections={SECTIONS}
      related={{ label: "Read the Terms & Conditions", href: "/terms-conditions" }}
    />
  );
}

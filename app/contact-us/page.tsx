import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { ContactForm } from "./_components/contact-form";
import { ContactMethods, ContactLocation } from "./_components/contact-methods";
import styles from "./_components/contact.module.css";

const PAGE = {
  title: "Contact us",
  description:
    "Reach Wavemetrik sales and technical support by email or phone, or visit us in Bangalore, for Wi-Fi test systems, client emulators and interference generators.",
  path: "/contact-us",
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function ContactUsPage() {
  return (
    <PageFrame className="contact-page">
      <JsonLd data={breadcrumbSchema([["Contact", PAGE.path]])} />
      {/* The page opens on the form and the direct contacts. Its title is
          for search engines and screen readers only. */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className={`page-hero pt-8 sm:pt-12 lg:pt-16 ${styles.page}`}
      >
        <h1 id="hero-heading" className="sr-only">
          Contact Wavemetrik
        </h1>
        {/* The form comes first in the markup, as it does on a phone, where
            it stands above the contacts. From desktop width the grid puts
            the contacts in the left column beside it. */}
        <div className={styles.workspace}>
          <ContactForm />
          <ContactMethods />
        </div>
      </section>
      <ContactLocation />
    </PageFrame>
  );
}

import { JsonLd } from "@/components/json-ld";
import { PageFrame } from "@/components/page-frame";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { ContactForm } from "./_components/contact-form";
import { ContactMethods, ContactLocation } from "./_components/contact-methods";
import styles from "./_components/contact.module.css";

const PAGE = {
  title: "Contact Wavemetrik",
  description:
    "Reach Wavemetrik sales and technical support by email or phone, or visit us in Bangalore, for Wi-Fi test systems, client emulators and interference generators.",
  path: "/contact-us",
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function ContactUsPage() {
  return (
    <PageFrame className="contact-page">
      <JsonLd data={breadcrumbSchema([["Contact", PAGE.path]])} />
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className={`page-hero ${styles.page}`}
      >
        <header className={styles.intro}>
          <div>
            <p className="eyebrow">Contact Wavemetrik</p>
            <h1 id="hero-heading" className={styles.title}>
              Let’s talk.
            </h1>
          </div>
          <p className={styles.lead}>
            A product question, a testing challenge, or a new idea. Start a
            conversation with the people who build your test systems.
          </p>
        </header>
        <div className={styles.workspace}>
          <ContactMethods />
          <ContactForm />
        </div>
      </section>
      <ContactLocation />
    </PageFrame>
  );
}

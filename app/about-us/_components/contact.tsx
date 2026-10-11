import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { pillLink } from "@/lib/pill-link";
import styles from "./about-sections.module.css";

// Contact details from wavemetrik.com. White, underlined links stay readable
// on the brand-blue tile in either theme.
const LINK =
  "rounded-sm underline decoration-foreground/30 underline-offset-4 outline-none hover:decoration-foreground focus-visible:ring-2 focus-visible:ring-ring";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="page-section"
    >
      <div className={styles.contact}>
        <div>
          <p className="eyebrow mb-4">Let’s work together</p>
          <h2 id="contact-heading" className="section-heading">
            Enable team excellence, fuel business growth
          </h2>
          <p className="mt-4 max-w-[34rem] text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
            We believe in the power of collaboration. Let’s team up and create
            something extraordinary together. If you’re interested in working
            with us, we’d love to discuss how we can bring your ideas to life.
          </p>
          <div className="mt-6 sm:mt-8">
            <Link href="/contact-us" className={pillLink.inverse}>
              Get in touch
              <ArrowUpRightIcon
                aria-hidden
                className="size-4"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>

        <dl className={styles.contactDetails}>
          {[
            { label: "Company", value: "Wavemetrik Technologies Pvt. Ltd." },
            {
              label: "Address",
              value: (
                <>
                  Northstar, Galleria Ambedkar Colony
                  <br />
                  Yelahanka, Bangalore 560064
                </>
              ),
            },
            {
              label: "Email",
              value: (
                <a
                  href="mailto:sales@wavemetrik.com"
                  className={`${LINK} inline-flex items-center gap-2`}
                >
                  sales@wavemetrik.com
                  <ArrowUpRightIcon
                    aria-hidden
                    className="size-4 shrink-0"
                    strokeWidth={1.5}
                  />
                </a>
              ),
            },
            {
              label: "Phone",
              value: (
                <a href="tel:+917899669501" className={`${LINK} tabular-nums`}>
                  +91 78996 69501
                </a>
              ),
            },
          ].map((row) => (
            <div key={row.label} className={styles.contactDetail}>
              <dt className="text-caption-1 font-medium text-muted-foreground">
                {row.label}
              </dt>
              <dd className="text-callout/6 font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

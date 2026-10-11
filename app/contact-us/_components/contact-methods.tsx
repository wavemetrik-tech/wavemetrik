import { ArrowUpRightIcon } from "lucide-react";
import { pillLink } from "@/lib/pill-link";
import styles from "./contact.module.css";

const METHODS = [
  {
    name: "Sales",
    value: "sales@wavemetrik.com",
    href: "mailto:sales@wavemetrik.com",
    description: "Product information, quotes and enterprise solutions",
  },
  {
    name: "Technical support",
    value: "support@wavemetrik.com",
    href: "mailto:support@wavemetrik.com",
    description: "Help with your products and test setup",
  },
  {
    name: "Give us a call",
    value: "+91 78996 69501",
    href: "tel:+917899669501",
    description: "Monday – Friday",
  },
];
export function ContactMethods() {
  return (
    <section aria-labelledby="direct-heading" className={styles.direct}>
      <h2 id="direct-heading" className={styles.directHeading}>
        Reach the team directly
      </h2>
      <ul className="mt-3">
        {METHODS.map((method) => (
          <li key={method.name}>
            <a href={method.href} className={styles.directRow}>
              <div className="min-w-0">
                <h3 className={styles.methodLabel}>{method.name}</h3>
                <span className={styles.directLink}>{method.value}</span>
                <p className={styles.methodDescription}>{method.description}</p>
              </div>
              <ArrowUpRightIcon
                aria-hidden
                className={styles.directArrow}
                strokeWidth={1.5}
              />
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.officeNote}>
        <p className={styles.methodLabel}>Our office</p>
        <p className="mt-2 text-callout font-medium">Bangalore, India</p>
        <a href="#location-heading" className={styles.officeLink}>
          Find us on the map <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
}
export function ContactLocation() {
  return (
    <section
      aria-labelledby="location-heading"
      className={`page-section section-flush-top ${styles.locationSection}`}
    >
      {/* The map runs the full width, and the address is a card on it. On a
          phone the card stands above the map, so it does not cover it. */}
      <div className={styles.location}>
        <div className={styles.locationCard}>
          <p className="eyebrow mb-3">Visit us</p>
          <h2 id="location-heading" className={styles.locationTitle}>
            Find us in Bangalore.
          </h2>
          <address className={styles.address}>
            <span className="block text-headline">
              Wavemetrik Technologies Pvt. Ltd.
            </span>
            <span className="mt-1.5 block text-muted-foreground">
              Northstar, Galleria Ambedkar Colony
              <br />
              Yelahanka, Bangalore 560064
            </span>
          </address>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Northstar%20Galleria%20Ambedkar%20Colony%20Yelahanka%20Bangalore%20560064"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 ${pillLink.primary}`}
          >
            Get directions <ArrowUpRightIcon aria-hidden className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className={styles.map}>
          <iframe
            title="Google Maps: Northstar Galleria, Ambedkar Colony, Yelahanka, Bangalore"
            src="https://maps.google.com/maps?q=Northstar%20Galleria%20Ambedkar%20Colony%20Yelahanka%20Bangalore%20560064&z=16&output=embed"
            width="1120"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import {
  PartDrawing,
  type PartDrawingId,
} from "@/components/diagrams/part-drawings";
import styles from "./about-sections.module.css";

// The four areas from the About page of wavemetrik.com. Three have a product
// page to go to.
const AREAS: {
  name: string;
  description: string;
  drawing: PartDrawingId;
  link?: { href: string; label: string };
}[] = [
  {
    name: "MT-C24",
    description: "Wi-Fi 7 Client Emulation",
    drawing: "clients",
    link: { href: "/products/client-emulators", label: "See MT-C24" },
  },
  {
    name: "MT-Wave",
    description: "Interference Generation",
    drawing: "wave",
    link: { href: "/products/interference-generators", label: "See MT-Wave" },
  },
  {
    name: "RF Signal Analysis",
    description: "Thorough device validation",
    drawing: "spectrum",
  },
  {
    name: "Network Performance",
    description: "End-to-end testing",
    drawing: "system",
    link: { href: "/products/wifi-test-systems", label: "See MT-SYS" },
  },
];

export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="page-section"
    >
      <header className={styles.expertiseHeader}>
        <div>
          <p className="eyebrow mb-4">Engineering expertise</p>
          <h2 id="expertise-heading" className="section-heading">
            The expertise behind Wavemetrik
          </h2>
        </div>
        <p className="max-w-sm text-body/7 text-pretty text-muted-foreground">
          A dedicated team of innovators, engineers and visionaries leading the
          future of tech.
        </p>
      </header>

      <ul className={styles.capabilities}>
        {AREAS.map((area, index) => (
          <li
            key={area.name}
            className={
              index < 2 ? styles.featuredCapability : styles.compactCapability
            }
          >
            <PartDrawing
              id={area.drawing}
              className={
                index < 2 ? styles.productDrawing : styles.compactDrawing
              }
            />
            <div className={styles.capabilityCopy}>
              <p className="mb-2 text-footnote font-medium text-muted-foreground">
                {area.description}
              </p>
              <h3
                className={
                  index < 2
                    ? "text-[2rem]/[1.125] font-semibold tracking-tight sm:text-[2.5rem]"
                    : "text-title-2 font-semibold tracking-tight"
                }
              >
                {area.name}
              </h3>
              {area.link && (
                <Link href={area.link.href} className={styles.productLink}>
                  {area.link.label}
                  <span className={styles.linkArrow}>
                    <ArrowUpRightIcon
                      aria-hidden
                      className="size-4"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

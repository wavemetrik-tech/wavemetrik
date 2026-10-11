import { VisionArt } from "./about-art";
import styles from "./about-sections.module.css";

// Copy from the About page of wavemetrik.com.
const AIMS = ["Wireless Innovation", "Customer Partnership", "Global Reach"];

// The vision as one large panel: the statement is the content, so it is set
// big and given room.
export function Vision() {
  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="page-section"
    >
      <div className={styles.vision}>
        <div className={styles.visionMain}>
          <div>
            <p className="eyebrow mb-4">Looking ahead</p>
            <h2 id="vision-heading" className="section-heading max-w-sm">
              Our vision, for the future
            </h2>
            <p className="mt-6 max-w-[52ch] text-body/7 text-pretty text-muted-foreground">
              As we continue to grow and evolve, our focus remains on
              innovation, customer satisfaction, and making a positive impact.
              We believe the future holds endless possibilities, and we’re
              excited to take this journey with you.
            </p>
          </div>
          <div className={styles.visionArt}>
            <VisionArt />
          </div>
        </div>
        <ul className={styles.visionGoals}>
          {AIMS.map((aim, index) => (
            <li key={aim}>
              <div aria-hidden className={styles.goalMarker}>
                <span />
                <span className={styles.index}>0{index + 1}</span>
              </div>
              <p className="text-subhead font-semibold">{aim}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

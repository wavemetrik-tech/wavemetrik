import styles from "./about-sections.module.css";

// Copy from the About page of wavemetrik.com.
const VALUES = [
  {
    name: "Integrity",
    description:
      "We hold ourselves to the highest ethical standards, ensuring transparency and honesty in all our dealings with customers and partners.",
  },
  {
    name: "Innovation",
    description:
      "We embrace change and constantly seek to push the boundaries of what’s possible. Innovation drives everything we do.",
  },
  {
    name: "Excellence",
    description:
      "We strive for excellence in every aspect of our business, from product development and testing to customer service and support.",
  },
] as const;

export function Values() {
  return (
    <section
      id="values"
      aria-labelledby="values-heading"
      className="page-section"
    >
      <header className="mb-9 sm:mb-12">
        <p className="eyebrow mb-4">Our values</p>
        <h2 id="values-heading" className="section-heading">
          What we stand for
        </h2>
      </header>
      <ul className={styles.values}>
        {VALUES.map((value, index) => (
          <li key={value.name} className={styles.value}>
            <div className="mb-3 flex items-baseline gap-3">
              <span aria-hidden className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-title-1 font-semibold tracking-tight">
                {value.name}
              </h3>
            </div>
            <p className="text-callout/6 text-pretty text-muted-foreground">
              {value.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

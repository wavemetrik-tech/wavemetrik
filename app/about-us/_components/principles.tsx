import { BangaloreArt } from "./bangalore-art";

// Copy from the About page of wavemetrik.com.
const PRINCIPLES = [
  {
    title: "Technology & Innovation",
    description:
      "We embrace the latest advancements to deliver state-of-the-art wireless test and measurement solutions for an increasingly connected world.",
  },
  {
    title: "Team Collaboration",
    description:
      "Our passionate team works closely with clients, building lasting relationships that drive measurable results and real-world impact.",
  },
  {
    title: "Our Story",
    description:
      "Driven by innovation, passion, and the desire to bring the best to our customers, partners, and communities worldwide.",
  },
];

export function Principles() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="page-section section-flush-top"
    >
      <header className="mb-9 sm:mb-12">
        <p className="eyebrow mb-4">Who we are</p>
        <h2 id="who-we-are-heading" className="section-heading">
          Rooted in Bangalore.
          <br />
          <span className="text-muted-foreground">Driven by innovation.</span>
        </h2>
      </header>

      <div className="about-principles">
        <figure className="about-origin">
          <figcaption className="about-origin-copy">
            <p className="flex items-center gap-2.5 text-footnote font-medium text-white/80">
              <span aria-hidden className="size-1.5 rounded-full bg-white" />
              Based in
            </p>
            <p className="about-origin-city">Bangalore</p>
            <p className="mt-2 text-title-3 font-medium text-white/80">India</p>
          </figcaption>
          <BangaloreArt />
          <div aria-hidden className="about-origin-rule">
            <span />
            <span />
            <span />
          </div>
        </figure>

        <ol className="about-principle-list">
          {PRINCIPLES.map((principle, index) => (
            <li key={principle.title} className="about-principle">
              <span aria-hidden className="about-principle-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-title-2 font-semibold tracking-tight sm:text-[1.625rem]/8">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-[48ch] text-callout/6 text-pretty text-muted-foreground">
                  {principle.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

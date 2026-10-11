import { applications } from "../_data/overview";

export function Applications() {
  return (
    <section
      id="applications"
      aria-labelledby="applications-heading"
      className="page-section"
    >
      <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
        <h2
          id="applications-heading"
          className="section-heading lg:sticky lg:top-40 lg:pt-3.5"
        >
          Applications
        </h2>

        <ul className="border-b">
          {applications.map((application) => (
            <li
              key={application.title}
              className="grid gap-x-10 gap-y-4 border-t py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:py-7"
            >
              <div>
                <h3 className="text-title-2 font-semibold text-balance">
                  {application.title}
                </h3>
                <p className="mt-1.5 max-w-[52ch] text-callout/[1.5rem] text-pretty text-muted-foreground">
                  {application.description}
                </p>
              </div>
              <ul
                aria-label="Signals used"
                className="flex flex-wrap content-start gap-1.5 sm:justify-end sm:pt-1"
              >
                {application.signals.map((signal) => (
                  <li
                    key={signal}
                    className="rounded-full bg-muted px-3 py-1 text-footnote font-medium text-muted-foreground"
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { PresentationRequestForm } from "./presentation-request-form";

// The technical presentation is shared on request, not shown on the site:
// what it covers on the left, the request form on the right.
export function PresentationFeature() {
  return (
    <section
      id="presentation"
      aria-labelledby="presentation-heading"
      className="page-section section-flush-top"
    >
      <div className="grid items-center gap-x-12 gap-y-9 rounded-3xl bg-muted p-6 sm:p-9 lg:grid-cols-2 lg:p-10">
        <div>
          <p className="eyebrow">Inside Wavemetrik</p>
          <h2
            id="presentation-heading"
            className="section-heading mt-4 max-w-lg"
          >
            Take a closer look at the test bench.
          </h2>
          <p className="mt-5 max-w-xl text-body/7 text-pretty text-muted-foreground">
            Our technical presentation brings together the instruments, RF
            architectures, test workflows and measurement examples behind
            Wavemetrik’s Wi-Fi validation systems.
          </p>
          <ul className="mt-6 space-y-3 text-subhead/6 text-muted-foreground">
            {[
              "System architectures and block diagrams",
              "Wi-Fi 7, MLO, coexistence and application testing",
              "Automation, telemetry and packet-level diagnosis",
            ].map((text) => (
              <li key={text} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-2.5 size-1 shrink-0 rounded-full bg-brand"
                />
                {text}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-footnote/5 text-muted-foreground">
            43 slides · Shared on request
          </p>
        </div>
        <PresentationRequestForm />
      </div>
    </section>
  );
}

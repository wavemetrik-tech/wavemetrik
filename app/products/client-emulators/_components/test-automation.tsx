// From slide 11 of the capabilities deck (content/wavemetrik-presentation.md).
const STAGES = [
  {
    name: "Define",
    actions: [
      "Select test cases.",
      "Set traffic and RF profiles.",
      "Choose acceptance limits.",
    ],
  },
  {
    name: "Execute",
    actions: [
      "Apply DUT and client settings.",
      "Run the test sequence.",
      "Monitor per-test status.",
    ],
  },
  {
    name: "Evaluate",
    actions: [
      "Compare KPIs with limits.",
      "Capture diagnostic context.",
      "Record the verdict.",
    ],
  },
  {
    name: "Report",
    actions: [
      "Export an HTML report.",
      "Review KPIs and charts.",
      "Share the test evidence.",
    ],
  },
];

export function TestAutomation() {
  return (
    <section
      id="test-automation"
      aria-labelledby="test-automation-heading"
      className="page-section"
    >
      <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <header className="lg:sticky lg:top-40">
          <h2 id="test-automation-heading" className="section-heading">
            MT-Core test automation
          </h2>
          <p className="mt-4 max-w-[30rem] text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
            Test setup, execution and reporting use a common sequence and
            configurable limits.
          </p>
        </header>

        {/* The four stages as one path, top to bottom. */}
        <div>
          <ol>
            {STAGES.map((stage, index) => (
              <li key={stage.name} className="relative pb-10 pl-10 last:pb-0">
                {index < STAGES.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute top-7 bottom-1 left-[0.3125rem] w-0.5 rounded-full bg-foreground/15"
                  />
                )}
                <span
                  aria-hidden
                  className="absolute top-2 left-0 size-3 rounded-full bg-brand"
                />
                <h3 className="text-title-2 font-semibold">{stage.name}</h3>
                <ul className="mt-2.5 flex flex-col gap-1.5 text-callout/[1.5rem] text-muted-foreground">
                  {stage.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-[60ch] border-t pt-4 text-footnote/[1.25rem] text-muted-foreground">
            Automation support and DUT command integration follow the configured
            test package.
          </p>
        </div>
      </div>
    </section>
  );
}

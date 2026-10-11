import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { TestApproach as Approach } from "../_data/approaches";
import { Questions } from "./questions";

export function Workflow({
  steps,
  headingLevel = 4,
}: {
  steps: Approach["steps"];
  headingLevel?: 3 | 4;
}) {
  const StepHeading = headingLevel === 3 ? "h3" : "h4";
  return (
    <ol className="solution-workflow grid gap-x-8 gap-y-7 sm:grid-cols-2">
      {steps.map((step, index) => (
        <li key={step.title} className="border-t pt-5">
          <p className="text-caption-1 font-medium tracking-[0.08em] text-muted-foreground">
            STEP {String(index + 1).padStart(2, "0")}
          </p>
          <StepHeading className="mt-3 text-subhead font-semibold">
            {step.title}
          </StepHeading>
          <p className="mt-2 text-subhead/6 text-pretty text-muted-foreground">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function TestApproach({ approach }: { approach: Approach }) {
  return (
    <section
      id={approach.id}
      aria-labelledby={`${approach.id}-heading`}
      className="page-section border-t"
    >
      <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.65fr)]">
        <header className="lg:sticky lg:top-28">
          <p className="eyebrow">{approach.category}</p>
          <h2 id={`${approach.id}-heading`} className="section-heading mt-4">
            {approach.title}
          </h2>
          <p className="mt-5 max-w-xl text-body/7 text-pretty text-muted-foreground">
            {approach.introduction}
          </p>
          <div className="mt-7 border-t pt-5">
            <p className="text-caption-1 font-medium text-muted-foreground">
              Instruments
            </p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {approach.instruments.map((name) => (
                <Link
                  key={name}
                  href={
                    name === "MT-C24"
                      ? "/products/client-emulators"
                      : "/products/interference-generators"
                  }
                  className="inline-flex min-h-11 items-center gap-1.5 text-subhead font-medium text-link underline-offset-4 hover:underline"
                >
                  {name}
                  <ArrowUpRightIcon aria-hidden className="size-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </header>
        <div className="min-w-0">
          <h3 className="text-title-2 font-semibold tracking-tight text-balance">
            {approach.question}
          </h3>
          <p className="mt-4 text-body/7 text-pretty text-muted-foreground">
            {approach.explanation}
          </p>
          <div className="mt-8 grid gap-7 rounded-2xl bg-muted p-5 sm:grid-cols-2 sm:p-7">
            {[
              { title: "What to evaluate", items: approach.evaluate },
              { title: "Evidence to keep", items: approach.evidence },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="text-subhead font-semibold">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-footnote/6 text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 size-1 shrink-0 rounded-full bg-brand"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="mb-4 mt-9 text-subhead font-semibold">
            Test workflow
          </h3>
          <Workflow steps={approach.steps} />
          <p className="mt-7 border-l-2 border-chart-2/50 pl-4 text-footnote/6 text-pretty text-muted-foreground">
            {approach.note}
          </p>
          <div className="mt-8">
            <Questions items={approach.questions} />
          </div>
          <a
            href="#applications"
            className="mt-5 inline-flex min-h-11 items-center text-footnote font-medium text-link underline-offset-4 hover:underline"
          >
            Back to applications ↑
          </a>
        </div>
      </div>
    </section>
  );
}

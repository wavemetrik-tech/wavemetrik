import Link from "next/link";

import { PartDrawing } from "@/components/diagrams/part-drawings";

import { platformAudience, platformParts } from "../_data/platform";

export function PlatformParts() {
  return (
    <section
      id="platform-parts"
      aria-labelledby="platform-parts-heading"
      className="page-section"
    >
      <header className="max-w-2xl">
        <h2 id="platform-parts-heading" className="section-heading">
          What’s inside a system
        </h2>
        <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
          A modular platform for different lab roles. {platformAudience}
        </p>
      </header>

      <ul className="mt-10 grid gap-x-8 gap-y-14 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {platformParts.map((part) => (
          <li key={part.id} className="flex flex-col">
            <PartDrawing id={part.id} />

            <h3 className="mt-6 text-title-3 font-semibold">{part.name}</h3>
            <p className="mt-1 text-subhead/[1.375rem] text-muted-foreground">
              {part.role}
            </p>

            <dl className="mt-5 border-t pt-4">
              <dt className="text-footnote text-muted-foreground">
                Typical evaluation
              </dt>
              <dd className="mt-0.5 text-subhead/[1.375rem]">
                {part.evaluation}
              </dd>
            </dl>
            <ul className="mt-4 flex flex-col gap-1.5 text-subhead/[1.375rem] text-muted-foreground">
              {part.specs.map((spec) => (
                <li key={spec} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[0.5625rem] size-1 shrink-0 rounded-full bg-muted-foreground/60"
                  />
                  {spec}
                </li>
              ))}
            </ul>

            {part.id === "wave" && (
              <Link
                href="/products/interference-generators"
                className="mt-4 w-fit rounded-sm text-subhead font-medium text-link underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              >
                See MT-Wave
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

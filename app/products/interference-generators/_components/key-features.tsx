import {
  configurableParameters,
  keyFeatures,
  wmmPriorityDescriptions,
} from "../_data/overview";
import { trafficClasses } from "../_data/sample-test-results";
import { FeatureVisual } from "./feature-visuals";
import { MarkerGlyph } from "./marker-glyph";

const TILE =
  "min-w-0 flex flex-col surface-panel rounded-3xl bg-muted p-7 sm:p-8";

export function KeyFeatures() {
  return (
    <section
      id="key-features"
      aria-labelledby="key-features-heading"
      className="page-section"
    >
      <h2 id="key-features-heading" className="section-heading">
        Key features
      </h2>

      <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
        {keyFeatures.map((feature, index) => {
          const lead = index === 0;
          return (
            <li
              key={feature.id}
              data-tile
              className={`group/tile ${TILE} sm:min-h-72 ${
                lead
                  ? "sm:col-span-2 lg:col-span-4"
                  : feature.id === "control"
                    ? "sm:col-span-2 lg:col-span-2"
                    : "lg:col-span-2"
              }`}
            >
              <h3 className="text-title-3 font-semibold text-balance">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-[44ch] text-subhead/[1.375rem] text-pretty text-muted-foreground">
                {feature.description}
              </p>
              <div className="mt-8 flex min-h-24 flex-1 items-end">
                <FeatureVisual id={feature.id} />
              </div>
            </li>
          );
        })}

        <li className={`${TILE} lg:col-span-3`}>
          <h3 className="text-title-3 font-semibold">
            Configurable parameters
          </h3>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {configurableParameters.map((parameter) => (
              <li
                key={parameter.name}
                className="group/field flex items-center justify-between gap-3 rounded-xl bg-background px-3.5 py-2.5 text-footnote font-medium"
              >
                {parameter.name}
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-brand/40 transition-[background-color,transform] duration-300 group-hover/field:scale-125 group-hover/field:bg-brand motion-reduce:transition-none"
                />
              </li>
            ))}
          </ul>
        </li>

        <li
          className={`${TILE} [--border:color-mix(in_oklab,var(--foreground)_12%,transparent)] lg:col-span-3`}
        >
          <h3 className="text-title-3 font-semibold">WMM priorities</h3>
          <ol className="mt-4">
            {/* Same marker and color as each class has in the sample results. */}
            {trafficClasses.map((item, index) => (
              <li
                key={item.key}
                className="grid grid-cols-[1rem_minmax(0,1fr)] gap-x-3 gap-y-1 py-4 not-first:border-t sm:flex sm:items-baseline sm:gap-4"
              >
                <span className="w-3 text-subhead text-muted-foreground tabular-nums">
                  {index + 1}
                </span>
                <span className="flex w-32 shrink-0 items-center gap-2 text-subhead font-semibold">
                  <svg
                    aria-hidden
                    viewBox="0 0 12 12"
                    className="size-3.5 shrink-0 overflow-visible"
                  >
                    <MarkerGlyph
                      shape={item.shape}
                      color={item.color}
                      ring="var(--muted)"
                    />
                  </svg>
                  {item.label}
                </span>
                <span className="col-start-2 text-subhead text-muted-foreground">
                  {wmmPriorityDescriptions[item.key]}
                </span>
              </li>
            ))}
          </ol>
        </li>
      </ul>
    </section>
  );
}

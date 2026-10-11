// A product's few headline figures, as a strip of cells under its hero.
export function HeadlineSpecs({
  specs,
  className,
}: {
  specs: readonly { label: string; value: string }[];
  className?: string;
}) {
  return (
    <dl
      className={`headline-specs grid grid-cols-2 lg:grid-cols-4 ${className ?? ""}`}
    >
      {specs.map((spec) => (
        <div key={spec.label}>
          <dt className="text-footnote/5 text-muted-foreground">
            {spec.label}
          </dt>
          <dd className="mt-2 text-title-3 font-semibold tracking-tight tabular-nums sm:text-title-2">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

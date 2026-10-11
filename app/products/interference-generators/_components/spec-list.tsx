export type Spec = { label: string; value: string | string[] };

// Parameter and specification rows. Pass a grid class to lay rows out in
// columns; each row keeps its own hairline.
export function SpecList({
  specs,
  className,
}: {
  specs: readonly Spec[];
  className?: string;
}) {
  return (
    <dl className={className}>
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="grid content-start gap-x-6 gap-y-1 border-t py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        >
          <dt className="text-subhead font-semibold">{spec.label}</dt>
          <dd className="text-subhead/[1.375rem]">
            {(Array.isArray(spec.value) ? spec.value : [spec.value]).map(
              (line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ),
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

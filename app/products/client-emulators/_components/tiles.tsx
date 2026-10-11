// The tiles the measurement sections are built from: a chart beside a few
// figures or notes, all on the muted surface.

const TILE = "surface-panel rounded-3xl bg-muted p-7 sm:p-8";

// Hairlines and marker rings inside a chart are drawn for the tile's surface,
// not the page's.
export const CHART_SURFACE =
  "[--border:color-mix(in_oklab,var(--foreground)_12%,transparent)] [--chart-surface:var(--muted)]";

// A segmented control's track on a tile: a shade darker than the tile.
export const TILE_TABS = "bg-foreground/[0.06] dark:bg-background";

// One headline figure: what it measures above, the number below.
export function StatTile({
  value,
  unit,
  children,
}: {
  value: string;
  unit: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col justify-between gap-8 ${TILE}`}>
      <dt className="text-subhead/[1.375rem] text-pretty text-muted-foreground">
        {children}
      </dt>
      <dd className="text-[2.75rem]/none font-semibold sm:text-[3.25rem]/none">
        {value}{" "}
        <span className="text-title-3 text-muted-foreground">{unit}</span>
      </dd>
    </div>
  );
}

// A short point: a title and a sentence.
export function TextTile({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={TILE}>
      <h3 className="text-title-3 font-semibold text-balance">{title}</h3>
      <p className="mt-2 max-w-[44ch] text-subhead/[1.375rem] text-pretty text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

// A chart with its title. Leave `title` out when the chart brings its own
// heading row.
export function ChartTile({
  title,
  note,
  className = "",
  children,
}: {
  title?: string;
  note?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className={`min-w-0 ${TILE} ${CHART_SURFACE} ${className}`}>
      {title && (
        <figcaption className="mb-6 text-title-3 font-semibold text-balance">
          {title}
        </figcaption>
      )}
      {children}
      {note && (
        <p className="mt-6 max-w-[60ch] text-footnote/[1.25rem] text-muted-foreground">
          {note}
        </p>
      )}
    </figure>
  );
}

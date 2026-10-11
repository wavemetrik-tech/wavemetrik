import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { type Guide, guideReadingTime } from "../_data/guides";
import { ResourceGraphic } from "./resource-graphic";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/resources/${guide.slug}`}
      className="resource-card group/resource flex h-full min-w-0 flex-col rounded-3xl bg-muted p-6 outline-none transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--foreground)_3%,var(--muted))] focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none sm:p-7"
    >
      <p className="eyebrow">{guide.category}</p>
      <div className="mb-5 mt-5">
        <ResourceGraphic kind={guide.graphic} />
      </div>
      <h3 className="text-title-3 font-semibold tracking-tight text-balance">
        {guide.title}
      </h3>
      <p className="mb-6 mt-3 text-subhead/6 text-pretty text-muted-foreground">
        {guide.intro}
      </p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-5">
        <span className="inline-flex min-h-7 items-center gap-2 text-footnote font-medium text-link">
          Read guide
          <ArrowRightIcon
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover/resource:translate-x-1 motion-reduce:transition-none"
          />
        </span>
        <span className="text-caption-1 text-muted-foreground">
          {guideReadingTime(guide)} min read
        </span>
      </div>
    </Link>
  );
}

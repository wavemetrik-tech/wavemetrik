import { PlusIcon } from "lucide-react";
import type { Question } from "../_data/approaches";

export function Questions({ items }: { items: Question[] }) {
  return (
    <div className="divide-y border-y">
      {items.map((item) => (
        <details
          key={item.question}
          className="solution-question group/question"
        >
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 rounded-lg py-4 text-subhead font-medium outline-none hover:text-link focus-visible:ring-2 focus-visible:ring-ring">
            {item.question}
            <PlusIcon
              aria-hidden
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open/question:rotate-45 motion-reduce:transition-none"
            />
          </summary>
          <p className="max-w-[70ch] pb-6 pr-6 text-subhead/6 text-pretty text-muted-foreground">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

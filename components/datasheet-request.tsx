"use client";

import { ChevronDownIcon } from "lucide-react";
import { useRef } from "react";
import { RequestForm } from "@/components/request-form";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const PRODUCTS = ["MT-Wave", "MT-C24", "MT-SYS"] as const;

// Datasheets are sent on request. The button opens the request form in a
// dropdown under it, with `product` already chosen.
export function DatasheetRequest({
  label,
  product,
  className,
  align = "start",
}: {
  label: string;
  product?: (typeof PRODUCTS)[number];
  className: string;
  align?: "start" | "end";
}) {
  const popup = useRef<HTMLDivElement>(null);

  return (
    <Popover
      onOpenChangeComplete={(open) => {
        // The dropdown always opens downward; if its end is below the
        // window, the page moves just enough to show it.
        if (open)
          popup.current?.scrollIntoView({
            block: "nearest",
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          });
      }}
    >
      <PopoverTrigger className={`group/request cursor-pointer ${className}`}>
        {label}
        <ChevronDownIcon
          aria-hidden
          className="size-[1.125rem] shrink-0 transition-transform duration-200 group-data-popup-open/request:rotate-180 motion-reduce:transition-none"
        />
      </PopoverTrigger>
      <PopoverContent
        ref={popup}
        align={align}
        sideOffset={10}
        collisionPadding={12}
        collisionAvoidance={{ side: "none", align: "shift" }}
        className="w-[min(27rem,calc(100vw-1.5rem))] scroll-mb-4 gap-5 rounded-[1.25rem] p-5 text-[1rem] shadow-[0_20px_60px_-16px_rgb(0_0_0/0.3)] ring-foreground/8 duration-200 sm:p-6"
      >
        <PopoverHeader className="gap-1">
          <PopoverTitle className="text-[1.375rem]/[1.75rem] font-semibold tracking-tight">
            Request a datasheet
          </PopoverTitle>
          <PopoverDescription className="text-[0.9375rem]/[1.375rem] text-pretty">
            Tell us who you are and we’ll send it to you.
          </PopoverDescription>
        </PopoverHeader>
        <RequestForm
          document="datasheet"
          products={PRODUCTS}
          defaultProduct={product}
          submitLabel="Request datasheet"
          compact
        />
      </PopoverContent>
    </Popover>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ProductNav({
  product,
  items,
}: {
  product: string;
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0].id);
  const nav = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element) => element !== null);
    const update = () => {
      frame = 0;
      const offset = (nav.current?.getBoundingClientRect().bottom ?? 140) + 80;
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
      }
      if (current) setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  useEffect(() => {
    const track = rail.current;
    const current = track?.querySelector<HTMLElement>(
      'a[aria-current="location"]',
    );
    if (!track || !current) return;
    const bounds = track.getBoundingClientRect();
    const item = current.getBoundingClientRect();
    if (item.left < bounds.left || item.right > bounds.right) {
      track.scrollTo({
        left: track.scrollLeft + item.left - bounds.left - 16,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }, [active]);

  return (
    <nav ref={nav} aria-label={`${product} sections`} className="product-nav">
      <div className="page-container flex min-h-14 items-center gap-6">
        <a
          href="#hero"
          className="hidden shrink-0 text-subhead font-semibold sm:block"
        >
          {product}
        </a>
        <div
          ref={rail}
          className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none]"
        >
          <ul className="flex w-max items-center gap-5 sm:gap-7">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "product-nav-link",
                    active === item.id && "is-active",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/contact-us"
          className="hidden shrink-0 items-center gap-1 text-footnote font-semibold text-link sm:flex"
        >
          Talk to us <ArrowUpRightIcon aria-hidden className="size-4" />
        </Link>
      </div>
    </nav>
  );
}

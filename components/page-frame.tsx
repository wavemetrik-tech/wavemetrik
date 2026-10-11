"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(.22, 1, .36, 1)";
// Blocks of a section that arrive as the reader reaches them.
const REVEALED =
  ".page-section > header, .page-section > h2, .page-section > p, .page-section > div, .page-section > ul, .page-section > ol, .page-section > dl, .page-section > figure, [data-reveal]";
// Drawings whose loops run faster while the pointer is on them.
const LIVELY = "figure, .fx-tile, .illustration-art, [data-tile]";

// The parts of a block that arrive one after another: the cells of a grid of
// up to twelve, or the block itself.
function parts(element: HTMLElement) {
  const children = Array.from(element.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
  const isGrid = getComputedStyle(element).display.includes("grid");
  return isGrid && children.length > 1 && children.length <= 12
    ? children
    : [element];
}

// Server-rendered children stay visible without JavaScript. Motion is only
// added to content entering the viewport after the initial render.
export function PageFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const revealed = new WeakSet<Element>();
    const candidates = root.querySelectorAll<HTMLElement>(REVEALED);
    // Do not replay a reveal when the reader returns to a section.
    candidates.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight)
        revealed.add(element);
    });
    const reveals = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || revealed.has(entry.target)) continue;
          revealed.add(entry.target);
          reveals.unobserve(entry.target);
          if (preference.matches) continue;
          parts(entry.target as HTMLElement).forEach((part, index) => {
            const animation = part.animate(
              [
                { opacity: 0, transform: "translateY(28px) scale(0.985)" },
                { opacity: 1, transform: "translateY(0) scale(1)" },
              ],
              {
                duration: 800,
                delay: index * 80,
                easing: EASE,
                fill: "backwards",
              },
            );
            animations.add(animation);
            animation.finished
              .then(() => animations.delete(animation))
              .catch(() => {});
          });
        }
      },
      { threshold: 0, rootMargin: "0px 0px -48px 0px" },
    );
    candidates.forEach((element) => reveals.observe(element));

    // `data-in-view` pauses a section's loops while it is off screen;
    // `data-seen` starts its one-time line drawings the first time it shows.
    const visibility = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target as HTMLElement;
          section.dataset.inView = String(entry.isIntersecting);
          if (entry.isIntersecting) section.dataset.seen = "true";
        }
      },
      { rootMargin: "100px" },
    );
    root
      .querySelectorAll(".page-section, .page-hero")
      .forEach((section) => visibility.observe(section));
    const footer = document.querySelector(".site-footer");
    if (footer) visibility.observe(footer);

    // Pointing at a drawing runs its loops at twice the pace. The rate eases
    // without restarting them.
    let lively: Element | null = null;
    const pace = (element: Element | null, rate: number) => {
      element?.getAnimations({ subtree: true }).forEach((animation) => {
        if (animation.effect?.getComputedTiming().iterations === Infinity)
          animation.updatePlaybackRate(rate);
      });
    };
    const point = (event: PointerEvent) => {
      if (event.pointerType === "touch" || preference.matches) return;
      const next = (event.target as Element).closest?.(LIVELY) ?? null;
      if (next === lively) return;
      pace(lively, 1);
      pace(next, 2);
      lively = next;
    };
    const release = () => {
      pace(lively, 1);
      lively = null;
    };
    document.addEventListener("pointerover", point);
    document.documentElement.addEventListener("pointerleave", release);

    const finish = () => animations.forEach((animation) => animation.finish());
    preference.addEventListener("change", finish);
    root.addEventListener("focusin", finish);
    return () => {
      reveals.disconnect();
      visibility.disconnect();
      animations.forEach((animation) => animation.cancel());
      release();
      document.removeEventListener("pointerover", point);
      document.documentElement.removeEventListener("pointerleave", release);
      preference.removeEventListener("change", finish);
      root.removeEventListener("focusin", finish);
    };
  }, []);

  return (
    <main
      id="main-content"
      ref={ref}
      className={cn("page-shell flex-1", className)}
    >
      {children}
    </main>
  );
}

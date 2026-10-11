"use client";

import { useEffect, type RefObject } from "react";

// A soft start and stop, for a line being drawn.
export const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";

// Plays a section's opening animations once, when its top edge has come up
// to `start` of the way down the window (0.65 is 65%). `build` creates the
// animations with `element.animate`, each with `fill: "backwards"`: they are
// held at their first frame until then, and leave no styles behind when they
// end. With Reduce Motion on, nothing is built and the section is simply
// shown. Pass a function that keeps its identity between renders.
export function useRevealOnce(
  ref: RefObject<HTMLElement | null>,
  start: number,
  build: (root: HTMLElement) => Animation[],
) {
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const animations = build(root);
    animations.forEach((animation) => animation.pause());
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        animations.forEach((animation) => animation.play());
      },
      // The tall top margin counts a section the reader has already passed,
      // such as one reached by a link to further down the page.
      { rootMargin: `100000px 0px ${Math.round((start - 1) * 100)}% 0px` },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [ref, start, build]);
}

// The elements under `root` that match `selector`, each animated in turn,
// `stagger` milliseconds apart.
export function animateEach(
  root: HTMLElement,
  selector: string,
  keyframes: Keyframe[],
  {
    stagger = 0,
    delay = 0,
    ...timing
  }: KeyframeAnimationOptions & { stagger?: number; delay?: number },
) {
  return Array.from(root.querySelectorAll(selector), (element, index) =>
    element.animate(keyframes, {
      fill: "backwards",
      ...timing,
      delay: delay + index * stagger,
    }),
  );
}

const HIDDEN_TO_SHOWN: Keyframe[] = [
  { opacity: 0, visibility: "hidden" },
  { opacity: 1, visibility: "visible" },
];

// Fades in the elements that match `selector`, hidden until then.
export function fadeIn(
  root: HTMLElement,
  selector: string,
  timing: KeyframeAnimationOptions & { delay?: number },
) {
  return animateEach(root, selector, HIDDEN_TO_SHOWN, timing);
}

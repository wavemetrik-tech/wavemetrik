"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Wheel scrolling with a little inertia, so the page glides to a stop rather
// than moving in steps. It is the page's own scroll that moves: sticky and
// fixed elements, in-page links and the browser's find and scroll
// restoration all work as they do without it.
//
// It is only for a mouse or trackpad. Touch keeps the device's own momentum,
// and with Reduce Motion on, Lenis follows the wheel 1:1.
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const lenis = new Lenis({
      // The share of the remaining distance covered each frame: lower glides
      // longer. This settles in about half a second.
      lerp: 0.11,
      autoRaf: true,
      // In-page links glide to their section, stopping below the header as
      // `scroll-padding-top` says.
      anchors: {
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      },
      // Stands down while the phone menu locks the page, and lets a
      // scrolling panel (a menu, a dropdown) take the wheel itself.
      autoToggle: true,
      allowNestedScroll: true,
      // A glide in progress ends when a link opens another page.
      stopInertiaOnNavigate: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}

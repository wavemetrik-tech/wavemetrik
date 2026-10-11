"use client";

import { useEffect, useRef, useState } from "react";

// How far across a drawing the pointer is, from 0 to 1, while it is anywhere
// over the drawing's tile, and null otherwise. Touch leaves the art static.
// Put the returned ref on the drawing, and `data-tile` on the tile around it.
export function useTilePointer<T extends Element>() {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState<number | null>(null);

  useEffect(() => {
    const drawing = ref.current;
    const tile = drawing?.closest<HTMLElement>("[data-tile]");
    if (!drawing || !tile) return;
    let frame = 0;
    let nextPosition: number | null = null;

    const track = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (
        (event.target as Element).closest(
          "button, input, select, textarea, a, label",
        )
      ) {
        cancelAnimationFrame(frame);
        frame = 0;
        setPosition(null);
        return;
      }
      const { left, width } = drawing.getBoundingClientRect();
      if (!width) return;
      nextPosition =
        Math.round(
          Math.min(1, Math.max(0, (event.clientX - left) / width)) * 500,
        ) / 500;
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          setPosition(nextPosition);
        });
    };
    const release = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      setPosition(null);
    };

    tile.addEventListener("pointermove", track);
    tile.addEventListener("pointerleave", release);
    return () => {
      cancelAnimationFrame(frame);
      tile.removeEventListener("pointermove", track);
      tile.removeEventListener("pointerleave", release);
    };
  }, []);

  return [ref, position] as const;
}

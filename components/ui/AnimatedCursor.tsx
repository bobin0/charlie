"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * A two-layer animated cursor: a precise dot and a lagging ring that grows
 * and glows when hovering interactive elements. Hidden on touch devices.
 */
export function AnimatedCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const move = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        gsap.to(ring, { scale: 1.9, borderColor: "rgba(255,0,128,0.9)", duration: 0.3 });
        gsap.to(dot, { scale: 0.4, duration: 0.3 });
      }
    };
    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) {
        gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.5)", duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
        style={{ boxShadow: "0 0 18px rgba(123,46,255,0.5)" }}
      />
    </>
  );
}

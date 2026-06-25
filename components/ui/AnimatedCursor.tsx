"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A two-layer animated cursor: a precise dot and a lagging ring that grows
 * and glows when hovering interactive elements.
 *
 * The two layers are ALWAYS rendered (hidden until the pointer first moves)
 * so the refs are valid when the effect wires up GSAP. The native cursor is
 * only hidden once this mounts on a fine-pointer device, so a cursor always
 * exists as a fallback.
 */
export function AnimatedCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide the native cursor only now that we're taking over.
    document.documentElement.classList.add("custom-cursor");

    // Center each layer on its own origin; position is driven by x/y.
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let first = true;
    const move = (e: MouseEvent) => {
      if (first) {
        // Snap to the pointer instantly, then fade in (no flight from 0,0).
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        first = false;
        return;
      }
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest("a, button, [data-cursor='hover'], input, [role='button']");

    const over = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      gsap.to(ring, { scale: 1.9, borderColor: "rgba(255,0,128,0.9)", duration: 0.3 });
      gsap.to(dot, { scale: 0.4, duration: 0.3 });
    };
    const out = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.6)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const hide = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const show = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-white opacity-0"
        style={{ boxShadow: "0 0 10px rgba(255,255,255,0.9)", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-white/60 opacity-0"
        style={{ boxShadow: "0 0 18px rgba(123,46,255,0.55)", willChange: "transform" }}
      />
    </>
  );
}

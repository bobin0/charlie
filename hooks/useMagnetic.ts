"use client";

import { useRef, useCallback } from "react";
import { gsap } from "gsap";

/**
 * Magnetic hover effect — the element is pulled toward the cursor and
 * eases back to centre on leave. Returns props to spread onto the element.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

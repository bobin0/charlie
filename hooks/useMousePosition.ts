"use client";

import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  /** Normalised -1..1 from centre. */
  nx: number;
  ny: number;
}

/** Tracks the global mouse position, including a centre-normalised value. */
export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return pos;
}

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins exactly once (safe to call from many components). */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const EASE = {
  smooth: "power3.out",
  expo: "expo.out",
  elastic: "elastic.out(1, 0.45)",
} as const;

export { gsap, ScrollTrigger };

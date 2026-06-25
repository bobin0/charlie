import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes intelligently. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Map a value from one range to another. */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/** Clamp a number between min and max. */
export function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export const NEON_HEX: Record<string, string> = {
  violet: "#7B2EFF",
  magenta: "#FF0080",
  cyan: "#00E5FF",
  gold: "#FFD700",
};

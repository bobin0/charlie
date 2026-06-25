"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/content";
import type { NeonColor } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ACCENT: Record<NeonColor, string> = {
  violet: "text-neon-violet",
  magenta: "text-neon-magenta",
  cyan: "text-neon-cyan",
  gold: "text-neon-gold",
};

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const count = TESTIMONIALS.length;

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex((next + count) % count);
    },
    [index, count]
  );

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(t);
  }, [count]);

  const active = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-violet/10 blur-[140px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <SectionLabel className="justify-center">In Their Words</SectionLabel>

        <div className="relative mt-12 min-h-[340px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={active.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -60, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass mx-auto max-w-3xl rounded-[2rem] p-10 sm:p-14"
            >
              <span className={`font-display text-6xl leading-none ${ACCENT[active.accent]}`}>“</span>
              <p className="mt-4 text-balance font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
                {active.quote}
              </p>
              <footer className="mt-8 flex flex-col items-center gap-1">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  {active.author}
                </span>
                <span className="text-xs text-white/50">{active.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => go(index - 1)}
            data-cursor="hover"
            aria-label="Previous"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => go(i)}
                data-cursor="hover"
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-gradient-to-r from-neon-violet to-neon-magenta" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(index + 1)}
            data-cursor="hover"
            aria-label="Next"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:scale-110"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

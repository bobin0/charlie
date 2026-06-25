"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/content";
import type { NeonColor } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ACCENT: Record<NeonColor, string> = {
  violet: "text-neon-violet",
  magenta: "text-neon-magenta",
  cyan: "text-neon-cyan",
  gold: "text-neon-gold",
};

function Counter({ value, duration = 1800 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setN(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref}>{n}</span>;
}

export function Stats() {
  return (
    <section id="numbers" className="relative border-y border-white/10 py-24">
      <div className="pointer-events-none absolute inset-0 bg-neon-grid bg-[length:60px_60px] opacity-40 mask-fade-y" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <SectionLabel className="justify-center">By The Numbers</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">
            A reputation built one<br className="hidden sm:block" /> legendary night at a time.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className={`font-display text-6xl font-bold tabular-nums sm:text-7xl ${ACCENT[stat.accent]} text-glow`}>
                <Counter value={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <span className="mt-3 text-sm uppercase tracking-[0.2em] text-white/55">
                {stat.label}
              </span>
              {i < STATS.length - 1 && (
                <span className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/10 lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

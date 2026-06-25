"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type Lenis from "lenis";
import { CharReveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

function scrollToExperience() {
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  const el = document.getElementById("experience");
  if (el && lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Animated haze blobs */}
      <div className="pointer-events-none absolute inset-0 -z-[5]">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[40vw] w-[40vw] rounded-full bg-neon-violet/20 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[34vw] w-[34vw] rounded-full bg-neon-magenta/20 blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        style={{ y, opacity, scale, filter: useTransform(blur, (b) => `blur(${b}px)`) }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="glass mb-8 flex items-center gap-3 rounded-full px-5 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-magenta opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-magenta" />
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">
            Now Open · Fri – Sat
          </span>
        </motion.div>

        <h1 className="font-display text-[15vw] font-semibold uppercase leading-[0.86] tracking-tight sm:text-[13vw] lg:text-[11rem]">
          <span className="block text-white text-glow">
            <CharReveal text="The Night" delay={0.6} />
          </span>
          <span className="block">
            <span className="text-gradient animate-gradient-pan">
              <CharReveal text="Starts Here." delay={1.0} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-8 max-w-xl text-balance text-base text-white/60 sm:text-lg"
        >
          Step into the city's most exclusive nightlife destination — where
          world-class sound, cinematic light and pure luxury collide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton onClick={() => {
            const lenis = (window as unknown as { lenis?: Lenis }).lenis;
            const el = document.getElementById("reserve");
            if (el && lenis) lenis.scrollTo(el, { duration: 1.6 });
            else el?.scrollIntoView({ behavior: "smooth" });
          }}>
            Reserve VIP Table
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={scrollToExperience}>
            Explore The Night
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToExperience}
        data-cursor="hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-white"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}

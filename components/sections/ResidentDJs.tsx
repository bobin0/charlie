"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { RESIDENT_DJS } from "@/lib/content";
import type { ResidentDJ, NeonColor } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordReveal } from "@/components/ui/Reveal";
import { NEON_HEX } from "@/lib/utils";

const RING: Record<NeonColor, string> = {
  violet: "from-neon-violet/60",
  magenta: "from-neon-magenta/60",
  cyan: "from-neon-cyan/60",
  gold: "from-neon-gold/60",
};

function DJCard({ dj, index }: { dj: ResidentDJ; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}% ${my}%, ${NEON_HEX[dj.accent]}55, transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 16);
    rx.set(-(py - 0.5) * 16);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      data-cursor="hover"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="preserve-3d group relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/10"
    >
      <img
        src={dj.image}
        alt={dj.name}
        className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

      {/* Cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300"
        style={{ background: spotlight, opacity: hover ? 1 : 0 }}
      />
      {/* Accent ring */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-t ${RING[dj.accent]} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        style={{ mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1 }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ transform: "translateZ(50px)" }}>
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/55">
          {dj.genre}
        </span>
        <h3 className="mt-1 font-display text-3xl font-bold uppercase leading-none text-white">
          {dj.alias}
        </h3>
        <span className="mt-1 text-sm text-white/55">{dj.name}</span>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">
            {dj.residency}
          </span>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:bg-white group-hover:text-ink"
            style={{ color: "inherit" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function ResidentDJs() {
  return (
    <section id="djs" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Resident Artists</SectionLabel>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.02] sm:text-6xl">
              <WordReveal text="The architects of the night." />
            </h2>
          </div>
          <p className="max-w-xs text-sm text-white/50">
            A handpicked roster of resident selectors shaping Charlie's signature
            sound — every weekend, all night long.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RESIDENT_DJS.map((dj, i) => (
            <DJCard key={dj.id} dj={dj} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

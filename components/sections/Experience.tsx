"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { EXPERIENCE_CARDS } from "@/lib/content";
import type { ExperienceCard, NeonColor } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordReveal } from "@/components/ui/Reveal";

const GLOW: Record<NeonColor, string> = {
  violet: "shadow-[0_30px_120px_-30px_rgba(123,46,255,0.7)]",
  magenta: "shadow-[0_30px_120px_-30px_rgba(255,0,128,0.7)]",
  cyan: "shadow-[0_30px_120px_-30px_rgba(0,229,255,0.7)]",
  gold: "shadow-[0_30px_120px_-30px_rgba(255,215,0,0.6)]",
};

const ACCENT_TEXT: Record<NeonColor, string> = {
  violet: "text-neon-violet",
  magenta: "text-neon-magenta",
  cyan: "text-neon-cyan",
  gold: "text-neon-gold",
};

function Card({ card, index, total }: { card: ExperienceCard; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // Image parallax inside the card.
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // 3D tilt from pointer.
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={ref}
      className="sticky top-0 flex h-screen items-center justify-center px-4 sm:px-6"
      style={{ zIndex: index }}
    >
      <motion.article
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className={`glass preserve-3d relative h-[78vh] w-full max-w-6xl overflow-hidden rounded-[2rem] ${GLOW[card.accent]}`}
      >
        {/* Image */}
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
          <img src={card.image} alt={card.title} className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-14">
          <div className="flex items-start justify-between">
            <span className={`font-display text-7xl font-bold sm:text-8xl ${ACCENT_TEXT[card.accent]} text-glow`}>
              {card.index}
            </span>
            <span className="glass rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-white/80">
              {card.tag}
            </span>
          </div>

          <div className="max-w-xl" style={{ transform: "translateZ(40px)" }}>
            <span className="text-xs uppercase tracking-[0.35em] text-white/45">
              {index + 1} / {total} · The Experience
            </span>
            <h3 className="mt-3 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-7xl">
              {card.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
              {card.description}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto mb-4 max-w-7xl px-6">
        <SectionLabel>The Experience</SectionLabel>
        <h2 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.02] sm:text-6xl">
          <WordReveal text="Four pillars of an unforgettable night." />
        </h2>
      </div>
      <div className="relative">
        {EXPERIENCE_CARDS.map((card, i) => (
          <Card key={card.id} card={card} index={i} total={EXPERIENCE_CARDS.length} />
        ))}
      </div>
    </section>
  );
}

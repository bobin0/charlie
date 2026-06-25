"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordReveal, FadeIn } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type Lenis from "lenis";

const PERKS = [
  { k: "01", title: "Private Bottle Service", desc: "Dedicated host and premium spirits delivered with champagne-parade theatre." },
  { k: "02", title: "Skyline Table Placement", desc: "Elevated platforms with the best sightlines to the DJ booth and floor." },
  { k: "03", title: "Skip-the-Line Entry", desc: "Discreet VIP entrance — walk past the queue, straight into the night." },
  { k: "04", title: "Personal Concierge", desc: "From transport to after-hours, a concierge anticipates every detail." },
];

function reserve() {
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  const el = document.getElementById("reserve");
  if (el && lenis) lenis.scrollTo(el, { duration: 1.6 });
  else el?.scrollIntoView({ behavior: "smooth" });
}

export function VIP() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="vip" ref={ref} className="relative overflow-hidden py-28">
      {/* Gold ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[40vw] w-[40vw] rounded-full bg-neon-gold/10 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-neon-gold/20">
            <motion.img
              style={{ y }}
              src="https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=1200&q=80"
              alt="VIP table experience"
              className="absolute inset-0 h-[120%] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
            <div className="glass absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl p-5">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-neon-gold">Tonight</span>
                <p className="font-display text-xl font-semibold text-white">Tables from €500</p>
              </div>
              <span className="font-display text-3xl text-white/30">★</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <SectionLabel>The VIP Experience</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.0] sm:text-6xl">
            <WordReveal text="Where the night belongs entirely to you." />
          </h2>
          <p className="mt-6 max-w-md text-white/60">
            Beyond the velvet rope lies a tier of nightlife reserved for the few.
            Every element — from the pour to the placement — is engineered around you.
          </p>

          <div className="mt-10 space-y-2">
            {PERKS.map((perk, i) => (
              <FadeIn key={perk.k} delay={i * 0.06}>
                <div className="group flex items-start gap-5 rounded-2xl border border-white/[0.06] p-5 transition-colors hover:border-neon-gold/30 hover:bg-white/[0.02]">
                  <span className="font-display text-lg text-neon-gold/80">{perk.k}</span>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-white">{perk.title}</h4>
                    <p className="mt-1 text-sm text-white/55">{perk.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-10">
            <MagneticButton onClick={reserve}>
              Request VIP Access
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

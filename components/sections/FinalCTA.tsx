"use client";

import { motion } from "framer-motion";
import { WordReveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const MARQUEE = "RESERVE · CHARLIE · THE NIGHT STARTS HERE · VIP · ";

export function FinalCTA() {
  return (
    <section id="reserve" className="relative overflow-hidden py-32">
      {/* Animated gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
          style={{
            background:
              "conic-gradient(from 0deg, #7B2EFF, #FF0080, #00E5FF, #FFD700, #7B2EFF)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-ink/60" />
      </div>

      {/* Top marquee */}
      <div className="absolute top-12 left-0 w-full overflow-hidden opacity-40">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="text-outline font-display text-4xl font-bold uppercase tracking-tight">
              {MARQUEE.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.5em] text-white/55"
        >
          Limited tables · Every weekend
        </motion.span>

        <h2 className="mt-8 font-display text-[16vw] font-bold uppercase leading-[0.84] tracking-tight sm:text-[12vw] lg:text-[10rem]">
          <span className="block text-white text-glow">
            <WordReveal text="Reserve" stagger={0.08} />
          </span>
          <span className="block text-gradient animate-gradient-pan">
            <WordReveal text="Your Night." stagger={0.08} />
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-lg text-white/60">
          Secure your table, skip the line and step into the city's most exclusive
          night. Our concierge will confirm within minutes.
        </p>

        {/* Reservation bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="glass mx-auto mt-12 flex max-w-xl flex-col gap-3 rounded-3xl p-3 sm:flex-row sm:rounded-full sm:p-2 sm:pl-6"
        >
          <input
            type="text"
            placeholder="Your name"
            className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <span className="hidden w-px self-stretch bg-white/10 sm:block" />
          <input
            type="date"
            className="flex-1 bg-transparent px-4 py-3 text-sm text-white/80 placeholder:text-white/40 focus:outline-none"
          />
          <MagneticButton type="submit" strength={0.25} className="px-7">
            Reserve
          </MagneticButton>
        </form>

        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/35">
          Or call · +00 1 555 CHARLIE
        </p>
      </div>
    </section>
  );
}

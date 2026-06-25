"use client";

import { motion } from "framer-motion";
import { WordReveal } from "@/components/ui/Reveal";

const COLUMNS = [
  {
    title: "Visit",
    links: ["1 Aurora Boulevard", "Metropolis District", "Open Fri – Sat · 23:00", "Dress code: Elevated"],
  },
  {
    title: "Explore",
    links: ["Experience", "Events", "Resident DJs", "Gallery", "VIP"],
  },
  {
    title: "Connect",
    links: ["Instagram", "TikTok", "SoundCloud", "Spotify"],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-800/60 pt-20">
      {/* Giant background wordmark */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center">
        <span className="block translate-y-1/4 font-display text-[24vw] font-bold leading-none text-white/[0.03]">
          CHARLIE
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neon-violet via-neon-magenta to-neon-cyan">
                <span className="absolute inset-[1.5px] rounded-full bg-ink" />
                <span className="relative font-display text-sm font-bold">C</span>
              </span>
              <span className="font-display text-lg font-semibold uppercase tracking-[0.3em]">
                Charlie
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
              An ultra-premium nightlife destination. World-class sound, cinematic light
              and an experience engineered for the few who demand the extraordinary.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="glass mt-7 flex items-center gap-2 rounded-full p-1.5 pl-5"
            >
              <input
                type="email"
                required
                placeholder="Join the guestlist"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                data-cursor="hover"
                className="rounded-full bg-gradient-to-r from-neon-violet to-neon-magenta px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-105"
              >
                Join
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
                {col.title}
              </h4>
              <ul className="mt-6 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      data-cursor="hover"
                      className="group inline-flex items-center text-sm text-white/65 transition-colors hover:text-white"
                    >
                      <span className="mr-0 h-px w-0 bg-neon-magenta transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <WordReveal
            text="THE NIGHT STARTS HERE."
            className="font-display text-3xl font-semibold text-white/80 sm:text-5xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/40 sm:flex-row"
        >
          <span>© {new Date().getFullYear()} Charlie Night Club. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" data-cursor="hover" className="hover:text-white">Privacy</a>
            <a href="#" data-cursor="hover" className="hover:text-white">Terms</a>
            <a href="#" data-cursor="hover" className="hover:text-white">Careers</a>
          </div>
          <span className="tracking-[0.2em]">Crafted for the night.</span>
        </motion.div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type Lenis from "lenis";
import { NAV_LINKS } from "@/lib/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

function scrollTo(id: string) {
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -40, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled ? "py-3" : "py-6"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-6",
            scrolled ? "glass mx-4 lg:mx-auto" : "bg-transparent"
          )}
        >
          {/* Wordmark */}
          <button
            onClick={() => scrollTo("top")}
            data-cursor="hover"
            className="group flex items-center gap-2"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-violet via-neon-magenta to-neon-cyan">
              <span className="absolute inset-[1.5px] rounded-full bg-ink" />
              <span className="relative font-display text-sm font-bold text-white">C</span>
            </span>
            <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Charlie
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-cursor="hover"
                className={cn(
                  "relative rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                  active === link.id ? "text-white" : "text-white/55 hover:text-white"
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <AudioToggle />
            </div>
            <button
              onClick={() => scrollTo("reserve")}
              data-cursor="hover"
              className="hidden rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-transform hover:scale-105 md:block"
            >
              Reserve
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor="hover"
              aria-label="Menu"
              className="glass flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            >
              <div className="flex flex-col gap-[5px]">
                <span className={cn("h-px w-5 bg-white transition-transform", open && "translate-y-[3px] rotate-45")} />
                <span className={cn("h-px w-5 bg-white transition-opacity", open && "opacity-0")} />
                <span className={cn("h-px w-5 bg-white transition-transform", open && "-translate-y-[3px] -rotate-45")} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-6 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollTo(link.id), 200);
                }}
                className="font-display text-3xl font-medium text-white/80 hover:text-white"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

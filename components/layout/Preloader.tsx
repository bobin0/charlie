"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Premium loading sequence: an animated counter from 0–100 with a
 * brand wordmark, followed by a dual-curtain reveal of the page.
 */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    let current = 0;
    const tick = () => {
      // Ease-out toward 100.
      current += Math.max(0.6, (100 - current) * 0.045);
      if (current >= 100) {
        current = 100;
        setCount(100);
        setTimeout(() => {
          setDone(true);
          onDone?.();
        }, 450);
        return;
      }
      setCount(Math.floor(current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          exit={{ opacity: 1 }}
        >
          {/* Curtains */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-ink-800"
            initial={{ x: 0 }}
            animate={count >= 100 ? { x: "-100%" } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-ink-800"
            initial={{ x: 0 }}
            animate={count >= 100 ? { x: "100%" } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={count >= 100 ? { opacity: 0, y: -20 } : {}}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="font-display text-sm uppercase tracking-[0.5em] text-white/70"
            >
              Charlie
            </motion.span>
            <div className="mt-6 flex items-baseline gap-2 font-display">
              <span className="text-7xl font-semibold tabular-nums text-white md:text-8xl">
                {count.toString().padStart(2, "0")}
              </span>
              <span className="text-2xl text-neon-magenta">%</span>
            </div>
            <div className="mt-6 h-px w-56 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-violet via-neon-magenta to-neon-cyan"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="mt-4 text-[10px] uppercase tracking-[0.4em] text-white/35">
              Entering the night
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

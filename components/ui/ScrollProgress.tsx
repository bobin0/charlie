"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin neon progress bar fixed to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[120] h-[3px] w-full origin-left bg-gradient-to-r from-neon-violet via-neon-magenta to-neon-cyan"
    />
  );
}

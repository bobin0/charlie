"use client";

import { motion, type Variants } from "framer-motion";
import { splitWords } from "@/animations/splitText";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: (stagger: number = 0.04) => ({
    transition: { staggerChildren: stagger },
  }),
};

const wordVariant: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const charVariant: Variants = {
  hidden: { y: "115%", opacity: 0, rotateX: -45 },
  show: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Reveals text word-by-word with an upward mask wipe. */
export function WordReveal({
  text,
  className,
  delay = 0,
  once = true,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  stagger?: number;
}) {
  const words = splitWords(text);
  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden py-[0.05em]">
          <motion.span className="inline-block will-change-transform" variants={wordVariant}>
            {w.word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Reveals text character-by-character (used for the hero headline). */
export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = splitWords(text);
  return (
    <motion.span
      className={cn("inline-flex flex-wrap perspective", className)}
      variants={container}
      custom={stagger}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, wi) => (
        <span key={wi} className="mr-[0.22em] inline-flex overflow-hidden py-[0.08em]">
          {w.chars.map((c, ci) => (
            <motion.span
              key={ci}
              className="inline-block will-change-transform"
              variants={charVariant}
            >
              {c}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

/** Generic fade-and-rise on scroll into view. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

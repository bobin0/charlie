"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** A small kicker label with an animated neon line — used above section titles. */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-12 origin-left bg-gradient-to-r from-neon-magenta to-transparent"
      />
      <span className="text-xs font-medium uppercase tracking-[0.4em] text-white/55">
        {children}
      </span>
    </div>
  );
}

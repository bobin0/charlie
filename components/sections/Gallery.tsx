"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GALLERY } from "@/lib/content";
import type { GalleryItem } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const SPAN: Record<GalleryItem["span"], string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  regular: "",
};

function Tile({ item, speed }: { item: GalleryItem; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="hover"
      className={cn(
        "group relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10",
        SPAN[item.span]
      )}
    >
      <motion.img
        style={{ y }}
        src={item.src}
        alt={item.caption}
        className="absolute inset-0 h-[120%] w-full -translate-y-[8%] object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-xs uppercase tracking-[0.25em] text-neon-cyan">Charlie</span>
        <p className="font-display text-xl font-semibold text-white">{item.caption}</p>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const speeds = [60, 30, 50, 24, 70, 36, 44, 28];
  return (
    <section id="gallery" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Inside Charlie</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.02] sm:text-6xl">
              Moments from<br />the floor.
            </h2>
          </div>
          <span className="text-sm text-white/45">A glimpse into the nights you'll remember.</span>
        </div>

        <div className="mt-14 grid auto-rows-[240px] grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {GALLERY.map((item, i) => (
            <Tile key={item.id} item={item} speed={speeds[i % speeds.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

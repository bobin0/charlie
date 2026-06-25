"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/animations/gsap";
import { EVENTS } from "@/lib/content";
import type { NeonColor } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";

const BORDER: Record<NeonColor, string> = {
  violet: "group-hover:border-neon-violet/70",
  magenta: "group-hover:border-neon-magenta/70",
  cyan: "group-hover:border-neon-cyan/70",
  gold: "group-hover:border-neon-gold/70",
};
const CHIP: Record<NeonColor, string> = {
  violet: "text-neon-violet",
  magenta: "text-neon-magenta",
  cyan: "text-neon-cyan",
  gold: "text-neon-gold",
};

export function Events() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = track.current!;
      const getScroll = () => el.scrollWidth - window.innerWidth;

      const tween = gsap.to(el, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${getScroll()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax the poster images as they cross the viewport.
      gsap.utils.toArray<HTMLElement>(".event-img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: root }
  );

  return (
    <section ref={root} id="events" className="relative overflow-hidden">
      <div className="relative h-screen">
        <div className="absolute left-0 right-0 top-10 z-20 mx-auto max-w-7xl px-6">
          <SectionLabel>Upcoming Events</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-semibold sm:text-6xl">
            The Lineup
          </h2>
        </div>

        <div
          ref={track}
          className="absolute top-1/2 flex -translate-y-1/2 items-center gap-8 px-[8vw] will-change-transform"
        >
          {EVENTS.map((event, i) => (
            <article
              key={event.id}
              data-cursor="hover"
              className={`group relative h-[68vh] w-[78vw] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 transition-colors duration-500 sm:w-[44vw] lg:w-[32vw] ${BORDER[event.accent]}`}
            >
              <div className="event-img absolute inset-0 scale-125">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

              <div className="relative z-10 flex h-full flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <span className="glass rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
                    {event.tag}
                  </span>
                  <span className="font-display text-2xl text-white/30">
                    0{i + 1}
                  </span>
                </div>

                <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <span className={`text-sm font-medium uppercase tracking-[0.2em] ${CHIP[event.accent]}`}>
                    {event.date}
                  </span>
                  <h3 className="mt-2 font-display text-4xl font-semibold leading-none text-white sm:text-5xl">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/65">{event.lineup}</p>
                  <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink">
                      Get Tickets
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Tail CTA card */}
          <div className="flex h-[68vh] w-[60vw] shrink-0 flex-col items-center justify-center gap-6 sm:w-[30vw]">
            <p className="text-center font-display text-3xl font-medium text-white/70">
              And many<br />more nights.
            </p>
            <button
              data-cursor="hover"
              className="rounded-full border border-white/20 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-ink"
            >
              Full Calendar
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-px w-16 bg-gradient-to-r from-white/40 to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.3em]">to browse</span>
        </div>
      </div>
    </section>
  );
}

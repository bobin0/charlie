"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/animations/gsap";
import { STORY_CHAPTERS } from "@/lib/content";

export function StoryScroll() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const slides = gsap.utils.toArray<HTMLElement>(".story-slide");
      const texts = gsap.utils.toArray<HTMLElement>(".story-text");
      const total = slides.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${total * 90}%`,
          scrub: 1,
          pin: ".story-pin",
          anticipatePin: 1,
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        tl.fromTo(
          slide,
          { autoAlpha: 0, scale: 1.18 },
          { autoAlpha: 1, scale: 1, duration: 1, ease: "power2.inOut" },
          i
        );
      });

      // Ken-burns drift on the active image + progress bar.
      slides.forEach((slide) => {
        const img = slide.querySelector("img");
        if (img) {
          gsap.to(img, {
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${total * 90}%`,
              scrub: true,
            },
          });
        }
      });

      texts.forEach((text, i) => {
        gsap.fromTo(
          text,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: () => `top+=${(i / total) * 100 - 4}% top`,
              end: () => `top+=${((i + 0.9) / total) * 100}% top`,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      gsap.to(".story-progress-fill", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${total * 90}%`,
          scrub: true,
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: root }
  );

  return (
    <section ref={root} id="journey" className="relative">
      <div className="story-pin relative h-screen w-full overflow-hidden">
        {/* Stacked slides */}
        {STORY_CHAPTERS.map((c, i) => (
          <div
            key={c.id}
            className="story-slide absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <img
              src={c.image}
              alt={c.title}
              className="h-full w-full object-cover"
              loading={i < 2 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
          </div>
        ))}

        {/* Texts */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="relative max-w-2xl">
              {STORY_CHAPTERS.map((c) => (
                <div
                  key={c.id}
                  className="story-text absolute left-0 top-1/2 -translate-y-1/2"
                  style={{ opacity: 0 }}
                >
                  <span className="font-display text-sm tracking-[0.4em] text-neon-cyan">
                    CHAPTER {c.index}
                  </span>
                  <h3 className="mt-4 font-display text-5xl font-semibold leading-[0.95] text-white sm:text-7xl">
                    {c.title}
                  </h3>
                  <p className="mt-5 max-w-md text-lg text-white/65">{c.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heading + progress */}
        <div className="absolute left-0 right-0 top-10 mx-auto max-w-7xl px-6">
          <span className="text-xs uppercase tracking-[0.4em] text-white/45">
            The Journey · Scroll to descend
          </span>
        </div>
        <div className="absolute bottom-10 left-1/2 h-px w-[60%] max-w-3xl -translate-x-1/2 overflow-hidden bg-white/15">
          <div className="story-progress-fill h-full w-full origin-left scale-x-0 bg-gradient-to-r from-neon-violet via-neon-magenta to-neon-cyan" />
        </div>
      </div>
    </section>
  );
}

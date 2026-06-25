"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Ambient audio toggle. Generates a soft evolving pad with the Web Audio API
 * (no asset required) so the toggle always works, and animates equaliser bars.
 */
export function AudioToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; oscs: OscillatorNode[] } | null>(null);

  const start = () => {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);

    // Layered detuned oscillators -> a warm ambient drone.
    const freqs = [55, 110, 164.81, 220];
    const oscs = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      osc.detune.value = (i - 1.5) * 6;
      const og = ctx.createGain();
      og.gain.value = 0.18 / freqs.length;
      osc.connect(og).connect(gain);
      osc.start();
      return osc;
    });

    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.5);
    ctxRef.current = ctx;
    nodesRef.current = { gain, oscs };
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (!ctx || !nodes) return;
    nodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    setTimeout(() => {
      nodes.oscs.forEach((o) => o.stop());
      ctx.close();
      ctxRef.current = null;
      nodesRef.current = null;
    }, 700);
  };

  const toggle = () => {
    if (on) stop();
    else start();
    setOn((v) => !v);
  };

  useEffect(() => () => stop(), []);

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      className="glass flex h-12 items-center gap-[3px] rounded-full px-4 transition-transform hover:scale-105"
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-neon-violet to-neon-cyan"
          animate={
            on
              ? { height: [6, 18, 9, 20, 6] }
              : { height: 4 }
          }
          transition={
            on
              ? { duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        />
      ))}
      <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/60">
        {on ? "Sound On" : "Sound"}
      </span>
    </button>
  );
}

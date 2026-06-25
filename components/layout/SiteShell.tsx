"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "./Preloader";
import { Navbar } from "./Navbar";
import { AnimatedCursor } from "@/components/ui/AnimatedCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";

// WebGL scene is client-only and dynamically imported so it never blocks SSR.
const Scene = dynamic(() => import("@/three/Scene"), { ssr: false });

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useLenis();

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Scene />
      <AnimatedCursor />
      <ScrollProgress />
      <Navbar />
      <BackToTop />
      <main
        className="relative"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        {children}
      </main>
    </>
  );
}

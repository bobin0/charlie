"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { NightScene } from "./NightScene";

/**
 * Fixed full-viewport WebGL canvas that sits behind the whole page,
 * providing the living, mouse-reactive nightclub atmosphere.
 */
export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <NightScene />
        </Suspense>
      </Canvas>
      {/* Vignette + grain overlay to deepen the cinematic mood. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(5,5,5,0.85) 100%)",
        }}
      />
    </div>
  );
}

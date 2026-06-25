"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NEON = [
  new THREE.Color("#7B2EFF"),
  new THREE.Color("#FF0080"),
  new THREE.Color("#00E5FF"),
  new THREE.Color("#FFD700"),
];

/** A drifting neon particle cloud. */
function Particles({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      const c = NEON[Math.floor(Math.random() * NEON.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.3) * 0.4;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/** Tall additive light beams that sway like nightclub spotlights. */
function Beams() {
  const group = useRef<THREE.Group>(null);

  const beams = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        x: (i - 3) * 2.6 + (Math.random() - 0.5),
        color: NEON[i % NEON.length],
        speed: 0.4 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const b = beams[i];
      child.rotation.z = Math.sin(t * b.speed + b.phase) * 0.32;
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + (Math.sin(t * b.speed * 1.6 + b.phase) * 0.5 + 0.5) * 0.16;
    });
  });

  return (
    <group ref={group} position={[0, -1, -4]}>
      {beams.map((b, i) => (
        <mesh key={i} position={[b.x, 4, 0]}>
          <planeGeometry args={[0.5, 18]} />
          <meshBasicMaterial
            color={b.color}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Camera gently follows the pointer for parallax depth. */
function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 1.0 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function NightScene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 9, 24]} />
      <ambientLight intensity={0.4} />
      <Particles />
      <Beams />
      <CameraRig />
    </>
  );
}

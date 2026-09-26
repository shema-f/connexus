"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { ConnexusBoxModel } from "./ConnexusBoxModel";

/** Small orbiting device node (phone / laptop / tablet abstraction). */
function DeviceNode({
  angle,
  radius,
  height,
  speed,
  online,
  label,
}: {
  angle: number;
  radius: number;
  height: number;
  speed: number;
  online: boolean;
  label: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const a = angle + clock.elapsedTime * speed;
    ref.current.position.set(Math.cos(a) * radius, height + Math.sin(clock.elapsedTime * 0.8 + angle) * 0.08, Math.sin(a) * radius);
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[0.42, 0.62, 0.06]} />
        <meshStandardMaterial color="#1a2233" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* screen glow when connected to the local network */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[0.34, 0.5]} />
        <meshBasicMaterial color={online ? "#1c7ff2" : "#2b3550"} transparent opacity={0.85} toneMapped={false} />
      </mesh>
      {/* connection line to the box (origin) */}
      <Line
        points={[
          [0, 0, 0],
          [
            -Math.cos(angle) * radius,
            -height,
            -Math.sin(angle) * radius,
          ],
        ]}
        color={online ? "#38d4f5" : "#2b3550"}
        lineWidth={online ? 1.4 : 0.6}
        transparent
        opacity={0.6}
        dashed={false}
      />
    </group>
  );
}

/** Cloud node — visually separated from the local network. */
function CloudNode({ online, position }: { online: boolean; position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5) * 0.12;
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.25;
    }
  });

  const material = (
    <meshStandardMaterial
      color={online ? "#1c3a5e" : "#121826"}
      emissive={online ? "#1c7ff2" : "#000000"}
      emissiveIntensity={online ? 0.35 : 0}
      roughness={0.3}
      transparent
      opacity={0.9}
    />
  );

  return (
    <group ref={ref} position={position}>
      <mesh>{material}<sphereGeometry args={[0.34, 20, 20]} /></mesh>
      <mesh position={[0.36, -0.06, 0]}>{material}<sphereGeometry args={[0.26, 20, 20]} /></mesh>
      <mesh position={[-0.34, -0.08, 0]}>{material}<sphereGeometry args={[0.24, 20, 20]} /></mesh>
      <mesh position={[0.08, 0.16, 0]}>{material}<sphereGeometry args={[0.28, 20, 20]} /></mesh>
      {/* sync uplink */}
      <Line
        points={[
          [0, -0.3, 0],
          [0, position[1] - 1.2, 0],
        ]}
        color={online ? "#38d4f5" : "#2b3550"}
        lineWidth={online ? 1.6 : 0.5}
        transparent
        opacity={online ? 0.8 : 0.25}
        dashed={!online}
        dashSize={0.12}
        gapSize={0.1}
      />
    </group>
  );
}

/** Animated dashed sync ring on the ground for depth. */
function GroundRings({ online }: { online: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.08;
  });
  return (
    <group ref={ref}>
      {[2.6, 3.4].map((r, i) => (
        <mesh key={r} position={[0, -0.9 + i * 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r, r + 0.012, 64]} />
          <meshBasicMaterial color={online ? "#1c7ff2" : "#2b3550"} transparent opacity={0.35 - i * 0.12} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContents({ online }: { online: boolean }) {
  const devices = useMemo(
    () => [
      { angle: 0.6, radius: 2.6, height: 0.7, speed: 0.12, label: "phone" },
      { angle: 2.5, radius: 2.9, height: 1.1, speed: 0.09, label: "laptop" },
      { angle: 4.4, radius: 2.5, height: 0.5, speed: 0.14, label: "tablet" },
      { angle: 5.6, radius: 2.8, height: 0.9, speed: 0.1, label: "device" },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#bfd8ff" />
      <directionalLight position={[-5, 3, -4]} intensity={0.4} color="#1c7ff2" />
      <pointLight position={[0, 1.4, 0]} intensity={online ? 12 : 4} distance={7} color="#38d4f5" />

      <ConnexusBoxModel online={online} />
      {devices.map((d) => (
        <DeviceNode key={d.label} {...d} online={online} />
      ))}
      <CloudNode online={online} position={[0, 3.4, -2.2]} />
      <GroundRings online={online} />
    </>
  );
}

/**
 * Hero3D — the five-second product story:
 * Connexus Box at the center, devices connected locally,
 * and the Internet as a separate node that can disappear without breaking anything.
 */
export function Hero3D() {
  const [online, setOnline] = useState(true);
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Graceful fallback when WebGL is unavailable.
    return (
      <div className="glass relative flex aspect-square w-full items-center justify-center rounded-3xl">
        <div className="text-center">
          <div className="tech-label-cyan mb-3">CONNEXUS BOX · CONCEPT</div>
          <p className="mx-auto max-w-[240px] text-sm text-graphite">
            Local hub connecting your devices — with or without the Internet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full" data-testid="hero-3d">
      <Canvas
        camera={{ position: [4.6, 2.6, 4.6], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
        }}
        onError={() => setFailed(true)}
      >
        <Suspense fallback={null}>
          <SceneContents online={online} />
        </Suspense>
      </Canvas>

      {/* Overlay controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => setOnline((v) => !v)}
          aria-pressed={online}
          className="pointer-events-auto glass-strong flex items-center gap-3 rounded-full px-4 py-2 text-xs font-medium text-white transition hover:border-signal-400/50"
        >
          <span className={`status-dot ${online ? "bg-cyanx" : "bg-graphite"}`} />
          {online ? "INTERNET: CONNECTED" : "INTERNET: OFFLINE"}
          <span className="font-mono text-[10px] text-graphite">— TAP TO SIMULATE OUTAGE</span>
        </button>
        <Link href="/connexus-box" className="pointer-events-auto text-xs font-medium text-graphite underline-offset-4 hover:text-white hover:underline">
          Explore the Connexus Box →
        </Link>
      </div>
    </div>
  );
}

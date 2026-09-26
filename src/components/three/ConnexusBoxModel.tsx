"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Edges } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural Connexus Box — compact local computing/networking appliance.
 * Built from primitives (no external GLB) for instant loads and zero asset weight.
 */

function StatusLight({ active = true }: { active?: boolean }) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.emissiveIntensity = active ? 1.2 + Math.sin(t * 2.4) * 0.5 : 0.15;
  });
  return (
    <mesh position={[-1.08, 0.86, 0.78]}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshStandardMaterial ref={ref} color="#38d4f5" emissive="#38d4f5" emissiveIntensity={1.2} toneMapped={false} />
    </mesh>
  );
}

function VentGrill({ y, z }: { y: number; z: number }) {
  const slats = [];
  for (let i = 0; i < 7; i++) {
    slats.push(
      <mesh key={i} position={[0.15 + i * 0.13, y, z]}>
        <boxGeometry args={[0.05, 0.012, 0.5]} />
        <meshStandardMaterial color="#0b0f17" roughness={0.9} />
      </mesh>
    );
  }
  return <group>{slats}</group>;
}

export function ConnexusBoxModel({ online = true }: { online?: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    // Gentle idle float + slow rotation for the hero presentation.
    group.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.06;
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.22;
  });

  return (
    <group ref={group}>
      {/* Body — matte graphite */}
      <RoundedBox args={[2.3, 0.85, 1.6]} radius={0.12} smoothness={6} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#141a26" roughness={0.55} metalness={0.35} />
        <Edges threshold={30} color="#2b3550" />
      </RoundedBox>

      {/* Top face accent — thin signal stripe */}
      <mesh position={[0, 0.431, 0]}>
        <boxGeometry args={[1.9, 0.005, 0.06]} />
        <meshStandardMaterial color="#1c7ff2" emissive="#1c7ff2" emissiveIntensity={online ? 0.9 : 0.1} toneMapped={false} />
      </mesh>

      {/* Front plate details */}
      {/* Ethernet port */}
      <mesh position={[0.72, 0.05, 0.805]}>
        <boxGeometry args={[0.34, 0.26, 0.02]} />
        <meshStandardMaterial color="#0a0e16" roughness={0.9} />
      </mesh>
      {/* USB ports */}
      <mesh position={[0.2, 0.05, 0.805]}>
        <boxGeometry args={[0.22, 0.1, 0.02]} />
        <meshStandardMaterial color="#0a0e16" roughness={0.9} />
      </mesh>
      <mesh position={[0.2, -0.12, 0.805]}>
        <boxGeometry args={[0.22, 0.1, 0.02]} />
        <meshStandardMaterial color="#0a0e16" roughness={0.9} />
      </mesh>
      {/* Power input */}
      <mesh position={[-0.25, 0.05, 0.805]}>
        <circleGeometry args={[0.09, 24]} />
        <meshStandardMaterial color="#0a0e16" roughness={0.9} />
      </mesh>
      {/* Vent grill */}
      <group position={[0, 0, 0]}>
        <VentGrill y={-0.1} z={0.805} />
      </group>

      {/* Status light */}
      <StatusLight active={online} />

      {/* Branding plate — mini connexus ring on the top face */}
      <group position={[0.62, 0.44, -0.42]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.16, 0.035, 12, 40, Math.PI * 1.55]} />
          <meshStandardMaterial color="#1c7ff2" emissive="#1c7ff2" emissiveIntensity={0.55} toneMapped={false} />
        </mesh>
        <mesh position={[0.02, 0, 0]}>
          <torusGeometry args={[0.05, 0.02, 10, 24]} />
          <meshStandardMaterial color="#38d4f5" emissive="#38d4f5" emissiveIntensity={0.7} toneMapped={false} />
        </mesh>
      </group>

      {/* Under-glow reflection catcher */}
      <mesh position={[0, -0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.1, 32]} />
        <meshBasicMaterial color="#0a0e16" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

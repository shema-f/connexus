"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * Lazy-mounted hero 3D. The Canvas bundle is only requested after first paint,
 * keeping LCP on the text/visual shell rather than the WebGL payload.
 */
const Hero3D = dynamic(() => import("./HeroScene").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="glass relative flex aspect-square w-full items-center justify-center rounded-3xl">
      <div className="text-center">
        <div className="tech-label-cyan mb-3">CONNEXUS BOX · CONCEPT</div>
        <div className="mx-auto h-1 w-24 animate-pulse rounded bg-signal-500/40" />
      </div>
    </div>
  );
}

export function Hero3DLazy() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return ready ? <Hero3D /> : <HeroFallback />;
}

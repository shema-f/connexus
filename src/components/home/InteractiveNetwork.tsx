"use client";

import { SectionHeader, Reveal } from "@/components/motion/Reveal";

/**
 * Pure-SVG interactive network diagram — lightweight alternative/companion to WebGL.
 * Shows devices meshed to the Connexus hub; the internet is a separate optional node.
 */
export function InteractiveNetwork() {
  const nodes = {
    hub: { x: 300, y: 190, r: 34, label: "CONNEXUS" },
    phone: { x: 120, y: 90, r: 18, label: "PHONE" },
    laptop: { x: 470, y: 100, r: 22, label: "LAPTOP" },
    tablet: { x: 90, y: 270, r: 20, label: "TABLET" },
    iot: { x: 480, y: 280, r: 16, label: "DEVICE" },
    cloud: { x: 300, y: 52, r: 24, label: "INTERNET" },
  };

  const localLinks = (["phone", "laptop", "tablet", "iot"] as const).map((k) => ({
    from: nodes.hub,
    to: nodes[k],
  }));

  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="NETWORK VISUALIZATION"
          title="One hub. Every device. Internet optional."
        />

        <Reveal className="mt-12">
          <div className="glass mx-auto max-w-4xl rounded-3xl p-4 sm:p-8">
            <svg
              viewBox="0 0 600 340"
              className="h-auto w-full"
              role="img"
              aria-label="Diagram: Connexus hub connected to local devices, with an optional internet uplink"
            >
              <defs>
                <radialGradient id="hubGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#1c7ff2" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1c7ff2" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Internet uplink (dashed, optional) */}
              <line x1={nodes.hub.x} y1={nodes.hub.y - nodes.hub.r} x2={nodes.cloud.x} y2={nodes.cloud.y + nodes.cloud.r}
                stroke="#38d4f5" strokeWidth="1.4" strokeDasharray="5 5" opacity="0.55">
                <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.6s" repeatCount="indefinite" />
              </line>

              {/* Local links */}
              {localLinks.map((l, i) => (
                <line key={i} x1={l.from.x} y1={l.from.y} x2={l.to.x} y2={l.to.y}
                  stroke="#1c7ff2" strokeWidth="1.2" opacity="0.5">
                  <animate attributeName="opacity" values="0.25;0.7;0.25" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
                </line>
              ))}

              {/* Cloud node */}
              <circle cx={nodes.cloud.x} cy={nodes.cloud.y} r={nodes.cloud.r} fill="#0e1a2c" stroke="#2b3550" strokeWidth="1.5" />
              <text x={nodes.cloud.x} y={nodes.cloud.y + 4} textAnchor="middle" fill="#8b94a7" fontSize="8" fontFamily="monospace">INTERNET</text>

              {/* Hub */}
              <circle cx={nodes.hub.x} cy={nodes.hub.y} r="58" fill="url(#hubGlow)" />
              <circle cx={nodes.hub.x} cy={nodes.hub.y} r={nodes.hub.r} fill="#0f2a4a" stroke="#1c7ff2" strokeWidth="2" />
              <text x={nodes.hub.x} y={nodes.hub.y + 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="monospace">CONNEXUS</text>

              {/* Devices */}
              {Object.entries(nodes)
                .filter(([k]) => !["hub", "cloud"].includes(k))
                .map(([k, n]) => (
                  <g key={k}>
                    <circle cx={n.x} cy={n.y} r={n.r} fill="#131a28" stroke="#3d93ff" strokeWidth="1.2" />
                    <text x={n.x} y={n.y + 3.5} textAnchor="middle" fill="#a8d1ff" fontSize="7.5" fontFamily="monospace">{n.label}</text>
                  </g>
                ))}
            </svg>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 border-t border-white/5 pt-4">
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-graphite">
                <span className="h-0.5 w-6 bg-signal-500" /> LOCAL LINK
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-graphite">
                <span className="h-0.5 w-6 border-t border-dashed border-cyanx" /> OPTIONAL UPLINK
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

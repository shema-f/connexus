import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Connexus — Connect beyond the Internet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #05070b 0%, #0a1428 60%, #072a54 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              border: "6px solid #1c7ff2",
              borderRightColor: "transparent",
              transform: "rotate(28deg)",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#fff", fontSize: 34, fontWeight: 700, letterSpacing: 8 }}>CONNEXUS</div>
            <div style={{ color: "#8b94a7", fontSize: 16, letterSpacing: 6, marginTop: 6 }}>CONNECT · SHARE · BEYOND</div>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ color: "#38d4f5", fontSize: 20, letterSpacing: 4 }}>FERRIVOX LTD · TECHNOLOGY IN DEVELOPMENT</div>
          <div style={{ color: "#fff", fontSize: 64, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Your digital world shouldn&apos;t stop when the Internet does.
          </div>
        </div>

        {/* Bottom: status */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#38d4f5" }} />
          <div style={{ color: "#8b94a7", fontSize: 22, letterSpacing: 4 }}>CONNECT BEYOND THE INTERNET · COMING SOON</div>
        </div>
      </div>
    ),
    { ...size }
  );
}

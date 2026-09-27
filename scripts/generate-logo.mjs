/**
 * Generates static PNG brand assets (no dependencies — Node zlib + manual PNG encoding):
 *   public/brand/logo-512.png         — square logo for Organization JSON-LD
 *   public/brand/apple-touch-icon.png — 180x180 iOS home-screen icon
 *
 * Renders the Connexus mark (C-ring + link nodes) to match
 * src/components/brand/LogoMark.tsx. Run once: node scripts/generate-logo.mjs
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- Minimal PNG encoder (RGBA, no interlace) ---------- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // Raw scanlines with filter byte 0.
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- Rasterizer: signed-distance shapes on a transparent canvas ---------- */
function makeCanvas(size) {
  return { size, data: Buffer.alloc(size * size * 4) };
}

function blendPx(canvas, x, y, r, g, b, a) {
  if (x < 0 || y < 0 || x >= canvas.size || y >= canvas.size || a <= 0) return;
  const i = (y * canvas.size + x) * 4;
  const da = canvas.data[i + 3] / 255;
  const outA = a + da * (1 - a);
  if (outA <= 0) return;
  canvas.data[i] = Math.round((r * a + canvas.data[i] * da * (1 - a)) / outA);
  canvas.data[i + 1] = Math.round((g * a + canvas.data[i + 1] * da * (1 - a)) / outA);
  canvas.data[i + 2] = Math.round((b * a + canvas.data[i + 2] * da * (1 - a)) / outA);
  canvas.data[i + 3] = Math.round(outA * 255);
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));
/** Coverage of a pixel center against a distance field (1px feather). */
function cov(d) {
  return clamp01(0.5 - d);
}

function drawRing(canvas, cx, cy, rOuter, rInner, color, rotDeg) {
  const [r, g, b] = color;
  const rot = (rotDeg * Math.PI) / 180;
  const cos = Math.cos(-rot);
  const sin = Math.sin(-rot);
  for (let y = Math.floor(cy - rOuter - 1); y <= Math.ceil(cy + rOuter + 1); y++) {
    for (let x = Math.floor(cx - rOuter - 1); x <= Math.ceil(cx + rOuter + 1); x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      // Rotate sample point into ring space.
      const rx = dx * cos - dy * sin;
      const ry = dx * sin + dy * cos;
      const dist = Math.hypot(rx, ry);
      const d = Math.max(dist - rOuter, rInner - dist);
      blendPx(canvas, x, y, r, g, b, cov(d));
    }
  }
}

function drawCircle(canvas, cx, cy, radius, color) {
  const [r, g, b] = color;
  for (let y = Math.floor(cy - radius - 1); y <= Math.ceil(cy + radius + 1); y++) {
    for (let x = Math.floor(cx - radius - 1); x <= Math.ceil(cx + radius + 1); x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) - radius;
      blendPx(canvas, x, y, r, g, b, cov(d));
    }
  }
}

function drawRoundRect(canvas, x0, y0, w, h, radius, color) {
  const [r, g, b] = color;
  for (let y = Math.floor(y0 - 1); y <= Math.ceil(y0 + h + 1); y++) {
    for (let x = Math.floor(x0 - 1); x <= Math.ceil(x0 + w + 1); x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const qx = Math.max(Math.abs(px - (x0 + w / 2)) - w / 2 + radius, 0);
      const qy = Math.max(Math.abs(py - (y0 + h / 2)) - h / 2 + radius, 0);
      const d = Math.hypot(qx, qy) - radius;
      blendPx(canvas, x, y, r, g, b, cov(d));
    }
  }
}

/* ---------- Connexus mark (viewBox 0 0 100 100, scaled to canvas) ---------- */
function renderMark(size) {
  const s = size / 100;
  const canvas = makeCanvas(size);
  const BLUE = [28, 127, 242]; // #1c7ff2
  const CYAN = [56, 212, 245]; // #38d4f5
  const DEEP = [11, 75, 153]; // #0b4b99

  // C-ring (rotated 28°), outer 44 / inner 29 — vertical gradient impression
  // via two tones: draw deep ring, then brighter upper arc.
  drawRing(canvas, 50 * s, 50 * s, 44 * s, 29 * s, DEEP, 28);
  drawRing(canvas, 50 * s, 38 * s, 33 * s, 29 * s, BLUE, 28);

  // Link nodes + connecting bar
  drawCircle(canvas, 32 * s, 50 * s, 9.5 * s, CYAN);
  drawCircle(canvas, 68 * s, 50 * s, 7 * s, BLUE);
  drawRoundRect(canvas, 36 * s, 46.5 * s, 28 * s, 7 * s, 3.5 * s, CYAN);

  // Corner node plates with ink centers (punch-through look on dark bg)
  drawRoundRect(canvas, 62 * s, 8 * s, 30 * s, 30 * s, 14 * s, CYAN);
  drawRoundRect(canvas, 68 * s, 14 * s, 18 * s, 18 * s, 9 * s, [5, 7, 11]); // #05070b
  drawRoundRect(canvas, 62 * s, 62 * s, 30 * s, 30 * s, 14 * s, BLUE);
  drawRoundRect(canvas, 68 * s, 68 * s, 18 * s, 18 * s, 9 * s, [5, 7, 11]);

  return canvas;
}

/* ---------- Emit ---------- */
mkdirSync(join(root, "public", "brand"), { recursive: true });

for (const [name, size] of [
  ["logo-512.png", 512],
  ["apple-touch-icon.png", 180],
]) {
  const { data } = renderMark(size);
  writeFileSync(join(root, "public", "brand", name), encodePng(size, size, data));
  console.log(`wrote public/brand/${name} (${size}x${size})`);
}

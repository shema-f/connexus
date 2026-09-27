import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#05070b",
          950: "#070a10",
          900: "#0a0e16",
          800: "#10151f",
          700: "#171d2a",
          600: "#20283a",
          500: "#2b3550",
        },
        signal: {
          DEFAULT: "#1c7ff2",
          50: "#eaf4ff",
          100: "#d3e8ff",
          200: "#a8d1ff",
          300: "#6fb2ff",
          400: "#3d93ff",
          500: "#1c7ff2",
          600: "#0f63c9",
          700: "#0b4b99",
          800: "#093a76",
          900: "#072a54",
        },
        cyanx: {
          DEFAULT: "#38d4f5",
          300: "#7ce4fa",
          400: "#5bdaf8",
          500: "#38d4f5",
          600: "#14b3dc",
        },
        graphite: "#8b94a7",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        castle: ["var(--font-castle)", "Georgia", "serif"],
      },
      // Display scale tuned for Sora: slightly looser tracking than Inter
      // (Sora reads denser at size) and a touch more line height for its
      // taller ascenders so hero lines don't feel cramped.
      fontSize: {
        "hero-lg": ["clamp(2.6rem, 6.75vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "hero-md": ["clamp(2rem, 4.6vw, 3.5rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(28,127,242,0.45)",
        "glow-sm": "0 0 24px -8px rgba(28,127,242,0.35)",
        panel: "0 24px 60px -24px rgba(0,0,0,0.65)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(139,148,167,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(139,148,167,0.055) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "56px 56px",
      },
      animation: {
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        "flow-x": "flow-x 3.2s linear infinite",
        "spin-slow": "spin 14s linear infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(56,212,245,0.55)" },
          "50%": { opacity: "0.65", boxShadow: "0 0 0 6px rgba(56,212,245,0)" },
        },
        "flow-x": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

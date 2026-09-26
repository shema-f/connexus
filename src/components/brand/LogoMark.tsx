"use client";

/**
 * Inline Connexus logo mark: C-ring with link node motif.
 * `mono` renders the white/graphite monochrome variant for light surfaces.
 */
export function LogoMark({
  className = "h-9 w-9",
  mono = false,
}: {
  className?: string;
  mono?: boolean;
}) {
  const ring = mono ? "#ffffff" : "url(#cx-ring-g)";
  const link = mono ? "#ffffff" : "url(#cx-link-g)";
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} role="img" aria-label="Connexus logo mark">
      <defs>
        <linearGradient id="cx-ring-g" x1="26" y1="14" x2="76" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5bdaf8" />
          <stop offset="0.45" stopColor="#1c7ff2" />
          <stop offset="1" stopColor="#0b4b99" />
        </linearGradient>
        <linearGradient id="cx-link-g" x1="30" y1="38" x2="72" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#38d4f5" />
          <stop offset="1" stopColor="#1c7ff2" />
        </linearGradient>
      </defs>
      <g transform="rotate(28 50 50)">
        <path
          d="M50 6a44 44 0 1 0 0 88 44 44 0 0 0 0-88Zm0 15a29 29 0 1 1 0 58 29 29 0 0 1 0-58Z"
          fill={ring}
          fillRule="evenodd"
        />
      </g>
      <rect x="62" y="8" width="30" height="30" rx="14" fill="#05070b" />
      <rect x="62" y="62" width="30" height="30" rx="14" fill="#05070b" />
      <circle cx="32" cy="50" r="9.5" fill={link} />
      <circle cx="68" cy="50" r="7" fill={link} />
      <rect x="36" y="46.5" width="28" height="7" rx="3.5" fill={link} />
    </svg>
  );
}

/** Full lockup: mark + wordmark + optional tagline. */
export function LogoLockup({
  className = "",
  mono = false,
  tagline = false,
}: {
  className?: string;
  mono?: boolean;
  tagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9" mono={mono} />
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-bold tracking-[0.18em] ${mono ? "text-ink" : "text-white"}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          CONNE<span className={mono ? "" : "text-signal-400"}>X</span>US
        </span>
        {tagline ? (
          <span className={`mt-1 text-[10px] font-medium tracking-[0.28em] ${mono ? "text-ink/60" : "text-graphite"}`}>
            CONNECT · SHARE · BEYOND
          </span>
        ) : null}
      </span>
    </span>
  );
}

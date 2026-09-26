"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { LogoLockup } from "./brand/LogoMark";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="Connexus home">
          <LogoLockup />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-graphite transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href={siteConfig.cta.earlyAccess.href} className="btn-primary !px-5 !py-2.5">
            {siteConfig.cta.earlyAccess.label}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[5px] h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[10px] h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/[0.06] bg-ink-950/95 lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/85 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.cta.earlyAccess.href}
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              {siteConfig.cta.earlyAccess.label}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

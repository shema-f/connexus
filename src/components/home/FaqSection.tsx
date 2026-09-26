"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/motion/Reveal";
import type { ContentItem } from "@/server/collections";

export function FaqSection({ items }: { items: ContentItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions, answered honestly."
          description="If something is still being researched, we say so."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {items.map((item, i) => (
            <div key={item.id} className="hairline">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-semibold text-white">{item.title}</span>
                <span aria-hidden className={`shrink-0 text-signal-300 transition-transform ${open === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {open === i ? (
                <p className="pb-6 pr-8 text-sm leading-relaxed text-graphite">{item.body}</p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/faq" className="btn-secondary">View all FAQs →</a>
        </div>
      </div>
    </section>
  );
}

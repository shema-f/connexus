import { SectionHeader, Reveal } from "@/components/motion/Reveal";

const capabilities = [
  { title: "Local Communication", desc: "Messaging and voice designed to work over the local network." },
  { title: "Offline Content", desc: "Lessons, docs, media and announcements served locally." },
  { title: "File Sharing", desc: "Fast local transfer between connected devices." },
  { title: "Edge Computing", desc: "Services running close to users, on the box." },
  { title: "Local Applications", desc: "Apps that run inside the Connexus environment." },
  { title: "Sync When Connected", desc: "Optional synchronization when Internet returns." },
  { title: "Private Networks", desc: "Organizational networks where data stays local." },
  { title: "Developer Platform", desc: "SDKs and APIs for building offline-first apps." },
];

export function WhatIs() {
  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="WHAT IS CONNEXUS?"
          title="A local digital layer for the places the Internet forgets."
          description="Connexus is an offline-first local digital infrastructure platform being developed by Ferrivox — a local environment where devices communicate and access services without depending on the public Internet for every interaction."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.06}>
              <div className="feature-card h-full">
                <span className="font-mono text-[10px] tracking-widest text-signal-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-mono text-[11px] leading-relaxed tracking-[0.14em] text-graphite">
            PLANNED CAPABILITIES · UNDER DEVELOPMENT · SUBJECT TO CHANGE
          </p>
        </Reveal>
      </div>
    </section>
  );
}

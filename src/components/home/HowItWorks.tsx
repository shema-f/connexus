import { SectionHeader, Reveal } from "@/components/motion/Reveal";

function FlowNode({ title, sub, accent = false }: { title: string; sub?: string; accent?: boolean }) {
  return (
    <div
      className={`flex min-w-[180px] flex-col items-center rounded-2xl border px-6 py-4 text-center ${
        accent ? "border-signal-400/50 bg-signal-500/10 shadow-glow-sm" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <span className="text-sm font-bold tracking-[0.12em] text-white">{title}</span>
      {sub ? <span className="mt-1 text-xs text-graphite">{sub}</span> : null}
    </div>
  );
}

function VerticalFlow() {
  return (
    <div className="flex flex-col items-center gap-0">
      <FlowNode title="DEVICE A" />
      <div aria-hidden className="flow-line my-1" style={{ width: 2, height: 34 }} />
      <FlowNode title="LOCAL CONNECTION" />
      <div aria-hidden className="flow-line my-1" style={{ width: 2, height: 34 }} />
      <FlowNode title="CONNEXUS BOX" accent />
      <div aria-hidden className="flow-line my-1" style={{ width: 2, height: 34 }} />
      <FlowNode title="LOCAL SERVICES" />
      <div aria-hidden className="flow-line my-1" style={{ width: 2, height: 34 }} />
      <FlowNode title="DEVICE B" />
    </div>
  );
}

function SyncFlow() {
  return (
    <div className="flex flex-col items-center gap-0">
      <span className="font-mono text-[10px] tracking-[0.2em] text-graphite">INTERNET RETURNS</span>
      <div aria-hidden className="flow-line my-1" style={{ width: 2, height: 30 }} />
      <FlowNode title="OPTIONAL SYNCHRONIZATION" />
      <div aria-hidden className="flow-line my-1" style={{ width: 2, height: 30 }} />
      <FlowNode title="CONNEXUS CLOUD" />
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="HOW IT WORKS"
          title="Local first. Cloud when it makes sense."
          description="Connexus is designed to operate locally first, with cloud connectivity used when available and appropriate."
        />

        <Reveal className="mt-14">
          <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div
              aria-hidden
              className="absolute inset-0 bg-grid-faint bg-grid opacity-40"
            />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="flex justify-center"><VerticalFlow /></div>

              <div className="hidden lg:block" aria-hidden>
                <div className="h-64 w-px bg-white/10" />
              </div>

              <div className="flex justify-center">
                <SyncFlow />
              </div>
            </div>

            <p className="relative mt-10 text-center text-sm text-graphite">
              Data flows between devices through the local network. When the Internet returns,
              synchronization with Connexus Cloud is <span className="text-white">optional and controlled</span> — never required.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { LogoLockup } from "./brand/LogoMark";
import { SocialLinks } from "./SocialLinks";
import { siteConfig } from "@/lib/site-config";

const productLinks = [
  { label: "Technology", href: "/technology" },
  { label: "Connexus Box", href: "/connexus-box" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Updates", href: "/updates" },
];

const participateLinks = [
  { label: "Developers", href: "/developers" },
  { label: "Community", href: "/community" },
  { label: "Pilot", href: "/pilot" },
  { label: "Early Access", href: "/early-access" },
  { label: "Partners", href: "/partners" },
];

const companyLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Investors", href: "/investors" },
  { label: "Demo", href: "/demo" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Developer Terms", href: "/developer-terms" },
];

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="tech-label mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-graphite transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="hairline bg-ink-950">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <LogoLockup tagline />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-graphite">
              A Ferrivox Ltd technology project. {siteConfig.supportStatement}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
                <span className="status-dot bg-cyanx" />
                <span className="font-mono text-[11px] tracking-widest text-graphite">
                  CONNEXUS · {siteConfig.status.label}
                </span>
              </span>
              <a
                href={`mailto:${siteConfig.company.email}`}
                className="text-sm text-signal-300 transition-colors hover:text-signal-200"
              >
                {siteConfig.company.email}
              </a>
            </div>
            <div className="mt-5">
              <Link href="/contact" className="btn-secondary !px-4 !py-2 text-xs">Contact Us</Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <LinkColumn title="Product" links={productLinks} />
            <LinkColumn title="Participate" links={participateLinks} />
            <LinkColumn title="Company" links={[...companyLinks, ...legalLinks]} />
          </div>

          <div className="lg:col-span-2">
            <SocialLinks />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-graphite">© {new Date().getFullYear()} Ferrivox Ltd. All rights reserved.</p>
          <p className="font-mono text-[11px] tracking-[0.2em] text-graphite">BUILT IN RWANDA · DESIGNED FOR THE WORLD</p>
        </div>
      </div>
    </footer>
  );
}

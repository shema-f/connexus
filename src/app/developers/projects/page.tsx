import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { ProjectDirectory } from "@/components/ProjectDirectory";
import { FinalCta } from "@/components/home/FinalCta";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Developer Projects",
  description:
    "Projects being built for or alongside Connexus — prototypes, experiments and integrations by the developer community.",
  alternates: { canonical: "/developers/projects" },
};

export default function DeveloperProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Developers", path: "/developers" }, { name: "Projects", path: "/developers/projects" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="DEVELOPER PROJECTS"
          title="What the community is building."
          description="Submitted projects are reviewed for moderation and security before being publicly listed."
        />
        <section className="section-pad">
          <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="tech-label-cyan">SUBMIT A PROJECT</span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Built something with Connexus?</h2>
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                Share prototypes, experiments and integrations. Every submission is reviewed before
                it appears publicly.
              </p>
              <div className="mt-8">
                <ProjectForm />
              </div>
            </div>
            <div>
              <span className="tech-label-cyan">PROJECT DIRECTORY</span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Approved projects</h2>
              <div className="mt-8">
                <ProjectDirectory />
              </div>
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

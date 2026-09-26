import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getAdminSession, ensureDefaultAdmin } from "@/server/auth";
import { db } from "@/server/collections";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await ensureDefaultAdmin();
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [
    reviews, developers, projects, pilots, demos, contacts, earlyAccess, newsletter, content, auditLog,
  ] = await Promise.all([
    db.reviews.list(),
    db.developers.list(),
    db.developerProjects.list(),
    db.pilotRequests.list(),
    db.demoRequests.list(),
    db.contactRequests.list(),
    db.earlyAccess.list(),
    db.newsletter.list(),
    db.content.list(),
    db.audit.list(),
  ]);

  const data = {
    reviews: reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    developers: developers.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    projects: projects.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    pilots: pilots.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    demos: demos.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    contacts: contacts.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    earlyAccess: earlyAccess.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    newsletter: newsletter.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    content: content.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    audit: auditLog.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 30),
  };

  return (
    <>
      {/* Admin uses its own minimal chrome, not the public navbar/footer. */}
      <main id="main" className="min-h-screen bg-ink">
        <AdminDashboard session={session} data={data} />
      </main>
    </>
  );
}

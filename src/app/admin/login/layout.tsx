import type { Metadata } from "next";

/**
 * The admin login is a client component and cannot export metadata itself;
 * this server layout keeps it out of search indexes.
 */
export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

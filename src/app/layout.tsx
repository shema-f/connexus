import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ConnexusBot } from "@/components/ConnexusBot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Connexus — Offline-First Digital Infrastructure | Ferrivox",
    template: "%s | Connexus by Ferrivox",
  },
  description:
    "Connexus is an offline-first digital infrastructure platform being developed by Ferrivox Ltd for local communication, content, applications and edge services.",
  applicationName: "Connexus",
  keywords: [
    "Connexus",
    "Ferrivox",
    "offline-first",
    "local network",
    "edge computing",
    "mesh networking",
    "Rwanda technology",
  ],
  authors: [{ name: "Ferrivox Ltd" }],
  openGraph: {
    type: "website",
    siteName: "Connexus",
    title: "Connexus — Offline-First Digital Infrastructure | Ferrivox",
    description:
      "Connect beyond the Internet. Connexus is an offline-first digital infrastructure platform being developed by Ferrivox Ltd.",
    url: siteUrl,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Connexus — Connect beyond the Internet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connexus — Offline-First Digital Infrastructure | Ferrivox",
    description:
      "Connect beyond the Internet. An offline-first digital infrastructure platform by Ferrivox Ltd. Coming soon.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" }],
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} bg-ink font-sans text-white antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded-md focus:bg-signal-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <ConnexusBot />
      </body>
    </html>
  );
}

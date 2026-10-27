// MODULE: App
// LAYER: 3
// ROLE: Root layout — fonts, global styles, site chrome, default SEO metadata
// DEPENDENCIES: next/font/google, @/shared-component, @/lib/site, @/styles/globals.css
// OWNER: Dylan / Claude

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/shared-component";
import { site } from "@/lib/site";
import "@/styles/globals.css";

// WHY: next/font downloads the font at build time and self-hosts it, so pages
// make no request to Google when they load.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: site.name,
    description: site.description,
    images: [{ url: "/images/headshot.webp", width: 600, height: 800, alt: site.name }],
  },
  twitter: { card: "summary" },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

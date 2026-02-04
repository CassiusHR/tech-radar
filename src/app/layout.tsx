import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl, isIndexable } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const indexable = isIndexable();
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Tech Radar",
  description: "Tech Radar",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  // Keep the site unindexable until the public domain is configured.
  ...(indexable
    ? {}
    : {
        robots: {
          index: false,
          follow: false,
          noarchive: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            noarchive: true,
          },
        },
      }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

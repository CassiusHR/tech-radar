import type { Metadata } from 'next'
import Link from 'next/link'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Tech Radar',
    template: '%s · Tech Radar',
  },
  description: 'A rolling digest of relevant tech items.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <div className="mx-auto w-full max-w-3xl px-4 py-8">
          <header className="mb-8 flex items-center justify-between gap-4">
            <Link href="/week" className="font-mono text-sm tracking-wide">
              Tech Radar
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/week"
                className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Week
              </Link>
            </nav>
          </header>

          {children}

          <footer className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
            <span className="font-mono">VOID</span> theme · Carlos Design System
          </footer>
        </div>
      </body>
    </html>
  )
}

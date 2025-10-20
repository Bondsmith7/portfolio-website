import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nathan - Portfolio & Thoughts',
  description: 'Portfolio website showcasing projects, thoughts, and ideas across technology, farming, sustainability, and faith.',
  keywords: ['portfolio', 'technology', 'farming', 'sustainability', 'faith', 'projects'],
  authors: [{ name: 'Nathan' }],
  openGraph: {
    title: 'Nathan - Portfolio & Thoughts',
    description: 'Portfolio website showcasing projects, thoughts, and ideas across technology, farming, sustainability, and faith.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import { Space_Grotesk, Roboto_Mono, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Karthik Bibireddy - Senior Software Engineer | Aspiring Quantitative Developer',
  description: 'Personal website of Karthik Bibireddy, showcasing professional experience, projects, and skills in Software Engineering and Quantitative Development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${robotoMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
} 
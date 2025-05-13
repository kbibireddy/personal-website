import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Karthik Bibireddy - Data Scientist & Software Engineer',
  description: 'Personal website of Karthik Bibireddy, showcasing professional experience, projects, and skills in Data Science and Software Engineering.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        {children}
      </body>
    </html>
  )
} 
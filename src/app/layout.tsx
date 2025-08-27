import type { Metadata } from 'next'
import './globals.css'
import { Space_Grotesk, Roboto_Mono, Inter } from 'next/font/google'
import Script from 'next/script'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'block',
  variable: '--font-space-grotesk',
  preload: true,
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'block',
  variable: '--font-roboto-mono',
  preload: true,
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
})

const inter = Inter({
  subsets: ['latin'],
  display: 'block',
  variable: '--font-inter',
  preload: true,
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
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
    <html lang="en" className={`${spaceGrotesk.variable} ${robotoMono.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "sxw4rpc185");
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
} 
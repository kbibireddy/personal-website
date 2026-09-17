/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#0D9488',
        secondary: '#0B1220',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        netflix: {
          primary: '#2DD4BF',
          background: '#0B1220',
          text: '#E8EEF7',
          accent: '#14B8A6',
        },
        meta: {
          primary: '#0D9488',
          background: '#F3F6FA',
          text: '#0F172A',
          accent: '#0F766E',
        },
        discord: {
          primary: '#38BDF8',
          background: '#12151C',
          text: '#E2E8F0',
          accent: '#0EA5E9',
        },
      },
      fontFamily: {
        syne: [
          'var(--font-syne)',
          'ui-sans-serif',
          'sans-serif',
        ],
        outfit: [
          'var(--font-outfit)',
          'ui-sans-serif',
          'sans-serif',
        ],
        mono: [
          'var(--font-ibm-plex-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
        // Keep legacy keys pointed at expressive fonts so old class names still resolve
        'space-grotesk': [
          'var(--font-syne)',
          'ui-sans-serif',
          'sans-serif',
        ],
        'roboto-mono': [
          'var(--font-ibm-plex-mono)',
          'ui-monospace',
          'monospace',
        ],
        inter: [
          'var(--font-outfit)',
          'ui-sans-serif',
          'sans-serif',
        ],
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      zIndex: {
        '-1': '-1',
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
      },
      maxWidth: {
        content: '67.2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

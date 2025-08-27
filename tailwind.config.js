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
        primary: '#0070f3',
        secondary: '#00040f',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // Netflix theme
        netflix: {
          primary: '#E50914',
          background: '#141414',
          text: '#FFFFFF',
          accent: '#B20710'
        },
        // Meta theme
        meta: {
          primary: '#0668E1',
          background: '#FFFFFF',
          text: '#1C2B33',
          accent: '#5AA7FF'
        },
        // Discord theme
        discord: {
          primary: '#5865F2',
          background: '#313338',
          text: '#FFFFFF',
          accent: '#4752C4'
        }
      },
      fontFamily: {
        'space-grotesk': [
          'var(--font-space-grotesk)',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'sans-serif'
        ],
        'roboto-mono': [
          'var(--font-roboto-mono)',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ],
        'inter': [
          'var(--font-inter)',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'sans-serif'
        ],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
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
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
} 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
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
        // Databricks theme
        databricks: {
          primary: '#FF3621',
          background: '#1B1B1B',
          text: '#FFFFFF',
          accent: '#3E4042'
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
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
      },
    },
  },
  plugins: [],
} 
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Krava — Swiss cream + ink, Bulgarian nosiya red accent
        primary: {
          DEFAULT: '#B3242B', // nosiya red
          light: '#E8B4B0',
          dark: '#8E1A20',
        },
        nosiya: { DEFAULT: '#B3242B', cream: '#FAF6EF', ink: '#1C1917' },
        cream: '#FAF6EF',
        ink: '#1C1917',
        gold: {
          DEFAULT: '#C9A961',
          light: '#E4D2A6',
          dark: '#A8893F',
        },
        sage: {
          DEFAULT: '#7A8A6F',
          light: '#AFBBA4',
          dark: '#5C6A52',
        },
        accent: {
          DEFAULT: '#7A8A6F', // sage (kept for legacy text-accent usage)
          light: '#AFBBA4',
        },
        background: '#FAF6EF', // warm cream
        surface: '#F3ECE0',
        foreground: '#1C1917', // near-black ink
        muted: '#8A817C',
        card: '#FFFFFF',
        border: '#EBE4D8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        pulse: 'pulse 2s infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}

export default config

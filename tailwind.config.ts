import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: {
          DEFAULT: '#4565F3',
          dark: '#3450D4',
          soft: '#EEF1FE',
        },
        coral: {
          DEFAULT: '#EF9D99',
          soft: '#FDF0EF',
        },
        // Dark backgrounds
        ink: {
          deep: '#1A1A2E',
          mid: '#2D2D44',
        },
        // Functional
        success: '#10B981',
        amber: '#F59E0B',
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        display: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',
          lg: '2rem',
          xl: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1152px',
        },
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 80s linear infinite',
      },
      boxShadow: {
        'brand-soft': '0 10px 30px -10px rgba(69, 101, 243, 0.25)',
        'brand-strong': '0 20px 50px -15px rgba(69, 101, 243, 0.35)',
      },
    },
  },
  plugins: [],
}

export default config

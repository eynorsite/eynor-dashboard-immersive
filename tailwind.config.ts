import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#6D1FE0',
          50: '#F5ECFF',
          100: '#E6CCFF',
          200: '#D4A8FF',
          300: '#BF7FFF',
          400: '#A856FF',
          500: '#6D1FE0',
          600: '#5A18BE',
          700: '#47129A',
          800: '#350D76',
          900: '#220852',
        },
        teal: {
          DEFAULT: '#22C997',
          50: '#E6FFF7',
          100: '#B3FFEC',
          200: '#80FFE0',
          300: '#4DFFD4',
          400: '#22C997',
          500: '#1BA77C',
          600: '#158561',
          700: '#0E6346',
          800: '#08412B',
          900: '#022010',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(109, 31, 224, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(109, 31, 224, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

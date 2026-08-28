/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#0B192C",
          50: "#f0f4f9",
          100: "#d9e2ee",
          800: "#142844",
          900: "#0B192C",
          950: "#060e1b",
        },
        secondary: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        accent: {
          amber: "#F59E0B",
          gold: "#EAB308",
          orange: "#F97316",
          blue: "#38BDF8",
          emerald: "#10B981",
        },
        dark: {
          900: "#070E1B",
          800: "#0F1E36",
          700: "#172A4D",
          card: "rgba(15, 30, 54, 0.75)",
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.25)',
        'glow-blue': '0 0 30px rgba(56, 189, 248, 0.2)',
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
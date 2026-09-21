/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      colors: {
        navy: {
          900: '#0A0F1E',
          800: '#0F172A',
          700: '#1E293B',
          600: '#334155',
          500: '#475569',
          400: '#64748B',
          300: '#94A3B8',
          200: '#CBD5E1',
          100: '#E2E8F0',
          50: '#F8FAFC',
        },
        brand: {
          blue: '#2563EB',
          violet: '#7C3AED',
          cyan: '#06B6D4',
          pink: '#EC4899',
        },
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #EC4899 100%)',
        'grad-soft': 'linear-gradient(135deg, #DBEAFE 0%, #E9D5FF 100%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease both',
        pulse: 'pulse 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
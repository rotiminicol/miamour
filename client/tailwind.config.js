/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF0F5',
          100: '#FFE0EB',
          200: '#FFC1D7',
          300: '#FFA3C2',
          400: '#FF85A2',
          500: '#FF5A8A',
          600: '#FF2E67',
          700: '#FF0343',
          800: '#D70036',
          900: '#A4002A',
        },
        secondary: {
          50: '#FCF5F7',
          100: '#F9E6EB',
          200: '#F0BFD0',
          300: '#E699B5',
          400: '#D9739A',
          500: '#CC4D7F',
          600: '#B32864',
          700: '#8E1F4F',
          800: '#7E2A47',
          900: '#551D31',
        },
        accent: {
          50: '#FBF8E9',
          100: '#F7F1D3',
          200: '#EFE3A7',
          300: '#E7D57B',
          400: '#DFC74F',
          500: '#D4AF37',
          600: '#B3912F',
          700: '#8C7125',
          800: '#66521B',
          900: '#403311',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        soft: '0 10px 25px -3px rgba(0, 0, 0, 0.05)',
        glow: '0 0 15px rgba(255, 90, 138, 0.35)',
      },
    },
  },
  plugins: [],
};
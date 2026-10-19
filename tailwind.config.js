/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ayur: {
          primary: '#173F35',
          secondary: '#6F8F78',
          dark: '#17211D',
          gold: '#B69A5A',
          'gold-dark': '#9C844D',
          'gold-light': '#E8DFC8',
          sage: '#E8F0EA',
          beige: '#F5F1EA',
          brown: '#A68B5B',
          cream: '#F5F1E8',
          light: '#E8DCC4',
          forest: {
            DEFAULT: '#173F35',
            deep: '#0D1914',
            card: '#13251E',
            light: '#255C4F',
          }
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
        display: ['Playfair Display', 'serif'],
        script: ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

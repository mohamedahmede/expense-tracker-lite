/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Eina', 'sans-serif'],
        'aclonica': ['Aclonica', 'sans-serif'],
        'eina': ['Eina', 'sans-serif'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      colors: {
        primary: '#246BFD',
        'input-bg': '#eff3f6',
      },
    },
  },
  plugins: [],
} 
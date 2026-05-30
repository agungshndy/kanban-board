/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Nunito"', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#f0f0ff',
          100: '#e4e4ff',
          200: '#cfceff',
          400: '#9b96ff',
          500: '#7B73FF',
          600: '#5f57f0',
          700: '#4840d4',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)',
        col: '0 1px 4px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}

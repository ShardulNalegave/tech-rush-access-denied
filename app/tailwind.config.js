/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"ABeeZee"'],
        body: ['"ABeeZee"'],
        heading: ['"Bayon"'],
        sfb: ['"SFB"'],
        sfr: ['"SFR"'],
      },
    },
  },
  plugins: [],
}


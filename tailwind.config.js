/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", ".public/index.html"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accentColor: "var(--accentColor)",
        lightColor: "var(--lightColor)",
        greyColor: "var(--greyColor)",
        lightGreen: "var(--lightGreen)",
        silverColor: "var(--silverColor)",
        pinkColor: "var(--pinkColor)",
        pinkColorDark: "var(--pinkColorDark)",
        goldColor: "var(--goldColor)",
        goldColorDark: "var(--goldColorDark)",
        blueColor: "var(--blueColor)",
        blueColorDark: "var(--blueColorDark)",
        greenColor: "var(--greenColor)",
        greenColorDark: "var(--greenColorDark)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}


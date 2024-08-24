/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#744BFC",
        secondary: {
          50: "#E8ECFF",
          100: "#F0F2FF",
          200: "#ffffff",
          300:"#EAEAEA"
        },
        dark: "#1E201E",
      },
    },
  },
  plugins: [],
}

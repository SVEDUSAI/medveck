/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF5F6",
          100: "#FFE0E4",
          200: "#FFC2C9",
          300: "#FF8A97",
          400: "#D94452",
          500: "#8B2635",
          600: "#751F2D",
          700: "#5F1824",
          800: "#49121C",
          900: "#330C13",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FFF8F0",
        },
      },
      fontFamily: {
        heading: ["System"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
        vidaloka: ["Vidaloka", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};

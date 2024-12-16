/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "'Poppins', serif",
      },
      colors: {
        myBlue: "#1e55ca",
      },
    },
  },
  darkMode: "class",
  plugins: [daisyui],
};

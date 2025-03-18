/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "743px" },
        tablet: { max: "1023px" },
        pc: { max: "1920px" },
      },
    },
  },
  plugins: [],
};

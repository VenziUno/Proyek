/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      color: {
        primary: {
          50: "#fff8e1",
          100: "#ffecb3",
          200: "#ffe082",
          300: "#ffd54f",
          400: "#ffca28",
          500: "#ffc107" /* Warna utama */,
          600: "#ffb300",
          700: "#ffa000",
          800: "#ff8f00",
          900: "#ff6f00",
        },
        secondary: {
          base: "#2196F3",
          hover: "#1976D2",
        },
        info: {
          base: "#3498db",
          hover: "#2c81ba",
        },
        success: {
          base: "#2ecc71",
          hover: "#24a65d",
        },
        danger: {
          base: "#e74c3c",
          hover: "#c44133",
        },
        warning: {
          base: "#f1c40f",
          hover: "#d4af37",
        },
        // link: {
        //   base: "#d1d5db",
        //   hover: "#4b5563",
        // },
        // neutral: {
        //   1: "#F2F2F3",
        //   2: "#C8CDD0",
        //   3: "#415058",
        //   4: "#1F292E",
        // },
      },
    },
  },
  plugins: [],
};

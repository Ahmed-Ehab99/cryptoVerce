/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: "#000",
        bgPrimary: "#fff",
        bgSecondary: "#f9f9f9",
        darkBlue: "#001529",
        pink: "#0071bd",
        lightBlue: "#e6f7ff",
        border: "#d9d9d9",
      },
    },
  },
  important: true,
  plugins: [],
};

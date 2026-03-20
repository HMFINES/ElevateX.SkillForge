/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        brand: {
          500: "rgb(var(--brand) / <alpha-value>)",
          600: "rgb(var(--brand-deep) / <alpha-value>)"
        },
        accent: "rgb(var(--accent) / <alpha-value>)",
        glow: "rgb(var(--glow) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(87, 120, 255, 0.22)",
        glass: "0 24px 60px rgba(15, 23, 42, 0.14)",
      },
      backgroundImage: {
        radial:
          "radial-gradient(circle at top, rgba(87,120,255,.18), transparent 42%)",
      },
    },
  },
  plugins: [],
};

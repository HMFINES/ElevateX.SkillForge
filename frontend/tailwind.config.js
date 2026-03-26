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
        error: "rgb(var(--error) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        brand: {
          400: "rgb(var(--brand-soft) / <alpha-value>)",
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
      opacity: {
        6: "0.06",
        8: "0.08",
        12: "0.12",
        14: "0.14",
        16: "0.16",
        18: "0.18",
        35: "0.35",
        72: "0.72",
        76: "0.76",
        78: "0.78",
        82: "0.82",
        92: "0.92",
      },
      boxShadow: {
        glow: "0 20px 70px rgba(79, 110, 247, 0.26)",
        glass: "0 24px 60px rgba(0, 0, 0, 0.22)",
        panel: "0 28px 80px rgba(4, 10, 24, 0.34)",
      },
      backgroundImage: {
        radial:
          "radial-gradient(circle at top, rgba(79,110,247,.2), transparent 42%)",
      },
    },
  },
  plugins: [],
};

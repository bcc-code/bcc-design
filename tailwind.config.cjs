/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        neutral: {
          0: "#ffffff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        "primary-dark-green": {
          50: "#f5f8f8",
          100: "#eaeeef",
          200: "#d2dadb",
          300: "#acbdbd",
          400: "#8ea6a6",
          500: "#437571",
          600: "#004e48",
          700: "#023d38",
          800: "#021f1c",
          900: "#020a0b",
        },
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      DEFAULT: "0.5rem",
      md: "1rem",
      lg: "2rem",
      xl: "4rem",
      full: "9999px",
    },
  },
  plugins: [],
};

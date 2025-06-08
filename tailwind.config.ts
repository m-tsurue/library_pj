import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a365d",
          light: "#2c5282",
          dark: "#153e75",
        },
        secondary: {
          DEFAULT: "#f7fafc",
          light: "#ffffff",
          dark: "#edf2f7",
        },
        accent: {
          DEFAULT: "#d69e2e",
          light: "#f6ad55",
          dark: "#b7791f",
        },
        text: {
          DEFAULT: "#2d3748",
          light: "#4a5568",
          dark: "#1a202c",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        japanese: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
import { DoubtReaction_E } from "@prisma/client";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./consts/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        xs: "1rem",
        lg: "0rem",
      },
    },
    extend: {
      screens: {
        xs: "320px",
        sm: "414px",
        md: "540px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1280px",
        "3xl": "1536px",
      },
      colors: {
        background: "var(--background)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        doubt: {
          [DoubtReaction_E.GOOD]: {
            DEFAULT: "#AAE29F",
            secondary: "#769C6E",
          },
          [DoubtReaction_E.BAD]: {
            DEFAULT: "#FF7272",
            secondary: "#BB5858",
          },
          [DoubtReaction_E.NORMAL]: {
            DEFAULT: "#C3E8FF",
            secondary: "#9CB8D7",
          },
        },
        error: "red",
        success: "green",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#f8faf7",
          dim: "#d8dad8",
          bright: "#f8faf7",
          variant: "#e1e3e0",
          tint: "#2c685a",
          container: {
            lowest: "#ffffff",
            low: "#f2f4f1",
            DEFAULT: "#eceeec",
            high: "#e7e9e6",
            highest: "#e1e3e0",
          },
        },
        "on-surface": {
          DEFAULT: "#191c1b",
          variant: "#404945",
        },
        "inverse-surface": {
          DEFAULT: "#2e3130",
          on: "#eff1ef",
        },
        outline: {
          DEFAULT: "#707975",
          variant: "#bfc9c4",
          subtle: "#d5e8d0",
        },
        primary: {
          DEFAULT: "#00372d",
          container: "#0b4f42",
          "on-container": "#83bfaf",
          fixed: "#b1efdd",
          "fixed-dim": "#96d3c1",
          inverse: "#96d3c1",
          "on-primary": "#ffffff",
        },
        secondary: {
          DEFAULT: "#ae2f34",
          container: "#ff6b6b",
          "on-container": "#6d0010",
          fixed: "#ffdad8",
          "fixed-dim": "#ffb3b0",
          "on-secondary": "#ffffff",
        },
        tertiary: {
          DEFAULT: "#0c3800",
          container: "#155100",
          "on-container": "#82c467",
          fixed: "#b0f592",
          "fixed-dim": "#95d878",
          "on-tertiary": "#ffffff",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
          "on-container": "#93000a",
          "on-error": "#ffffff",
        },
        brand: {
          pine: "#0b4f42",
          ruby: "#9e232a",
          sage: "#3e7b28",
          "sage-tint": "#ebf4e7",
          charcoal: "#14201d",
          offwhite: "#fafaf7",
        },
      },
      fontFamily: {
        serif: ["var(--font-eb-garamond)", "serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(11, 79, 66, 0.05)",
        ambient: "0 20px 40px -15px rgba(11, 79, 66, 0.08)",
        ruby: "0 10px 25px -5px rgba(158, 35, 42, 0.2)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;

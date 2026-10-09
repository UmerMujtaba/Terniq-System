import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F6FB",
        surface: "#FFFFFF",
        ink: "#131737",
        muted: "#5A5F82",
        mist: "#E3E6F4",
        signal: {
          DEFAULT: "#2F3FE0",
          deep: "#22346B",
          soft: "#E8EAFE",
        },
      },
      fontFamily: {
        display: ["'Bricolage Grotesque Variable'", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["'Instrument Sans Variable'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "76rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.7)" },
        },
      },
      animation: {
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

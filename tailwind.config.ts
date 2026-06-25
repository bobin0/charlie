import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./animations/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#050505",
          900: "#050505",
          800: "#0D0D0D",
          700: "#141414",
          600: "#1A1A1A",
        },
        neon: {
          violet: "#7B2EFF",
          magenta: "#FF0080",
          cyan: "#00E5FF",
          gold: "#FFD700",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.35em",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "gradient-pan": "gradient-pan 8s ease infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 28s linear infinite",
      },
      backgroundImage: {
        "neon-grid":
          "linear-gradient(rgba(123,46,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(123,46,255,0.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;

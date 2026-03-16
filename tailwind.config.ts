import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        surface: "#0e0e11",
        bone: "#f3ede2",
        muted: "#9fa0a6",
        accent: "#a6192e",
        accentMuted: "#c2a35a",
        stroke: "#1c1c22",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Manrope"', "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wide: "0.14em",
      },
      boxShadow: {
        glow: "0 15px 60px rgba(166, 25, 46, 0.28)",
        card: "0 20px 60px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "grain":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 20%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 25%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.04), transparent 20%)",
      },
    },
  },
  plugins: [],
} satisfies Config;

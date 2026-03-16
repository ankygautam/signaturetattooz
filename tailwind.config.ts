import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#060606",
        surface: "#101013",
        bone: "#f4eee4",
        muted: "#aaa39c",
        accent: "#8d1f32",
        accentMuted: "#b89160",
        stroke: "#242429",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"Sora"', "Inter", "system-ui", "sans-serif"],
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

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  base: isProd ? "./" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

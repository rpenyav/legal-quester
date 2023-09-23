import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  server: {
    port: 9001,
    host: true,
  },
  base: mode === "production" ? "/telocambio/" : "/", //el path solamente rula en produccion
}));

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Determine if we're in production
const isProduction = import.meta.env.PROD;

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: isProduction
          ? "https://trade-specialists.com/api" // Production API URL
          : "http://localhost:8080", // Local development API URL
        changeOrigin: true,
        secure: isProduction, // Enable SSL in production
      },
      "/api/backend": {
        target: isProduction
          ? "https://trade-specialists.com/api/backend" // Production backend URL
          : "http://localhost:8000", // Local development backend URL
        changeOrigin: true,
        secure: isProduction, // Enable SSL in production
      },
    },
    historyApiFallback: true,
  },
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});

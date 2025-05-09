import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
        secure: import.meta.env.NODE_ENV === "production",
      },
      "/api/backend": {
        target: import.meta.env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: import.meta.env.NODE_ENV === "production",
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

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { fileURLToPath } from "url";

console.log("VITE CONFIG LOADED");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@atoms": path.resolve(__dirname, "./src/components/atoms"),
      "@molecules": path.resolve(__dirname, "./src/components/molecules"),
      "@organisms": path.resolve(__dirname, "./src/components/organisms"),
      "@windows": path.resolve(__dirname, "./src/components/organisms/windows"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@primitives": path.resolve(__dirname, "./src/components/primitives"),
      "@templates": path.resolve(__dirname, "./src/components/templates"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@json": path.resolve(__dirname, "./src/json"),
      "@state": path.resolve(__dirname, "./src/state"),
      "@theme": path.resolve(__dirname, "./src/theme"),
    },
  },
})

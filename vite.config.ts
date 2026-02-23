import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  // Use the repository name so GitHub Pages serves assets correctly
  // e.g. https://axk47.github.io/Portfolio/
  base: '/Portfolio/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

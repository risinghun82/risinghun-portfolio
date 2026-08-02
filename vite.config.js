import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// RISINGHUN portfolio build config
// base: "./" keeps every built asset path relative, and viteSingleFile()
// inlines the JS/CSS directly into index.html as a classic (non-module)
// script. Both are needed so dist/index.html also works when opened
// directly from disk (file://) — Chromium blocks type="module" scripts
// under the file:// origin, which is why a normal Vite build shows a blank
// page there even with relative paths.
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  server: {
    port: 5173,
    open: true
  }
});

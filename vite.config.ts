import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/react-login-page/", // 👈 Required for GitHub Pages
  plugins: [react()],
});

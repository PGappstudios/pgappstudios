import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mdContent from "./scripts/vite-plugin-md.mjs";

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [mdContent(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    // scripts/ssg.mjs reads this to add <link rel="modulepreload"> for the
    // exact chunks each page needs.
    manifest: !isSsrBuild,
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            // React changes rarely; keeping it in its own file means a content
            // deploy does not make returning visitors download it again.
            manualChunks: { react: ["react", "react-dom", "react-router-dom"] },
          },
        },
  },
}));

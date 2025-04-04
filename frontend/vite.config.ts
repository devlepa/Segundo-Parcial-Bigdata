import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    cors: true,
    hmr: {
      host: "ec2-52-91-61-104.compute-1.amazonaws.com",
      port: 5173,
    },
    proxy: {
      "/api": {
        target: "http://ec2-52-91-61-104.compute-1.amazonaws.com:8000", // Updated Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ["ec2-52-91-61-104.compute-1.amazonaws.com"],
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
  },
});

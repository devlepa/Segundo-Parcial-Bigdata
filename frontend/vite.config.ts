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
      host: "ec2-34-239-124-130.compute-1.amazonaws.com", // Updated IPv4 DNS
      port: 5173,
    },
    proxy: {
      "/api": {
        target: "http://ec2-34-239-124-130.compute-1.amazonaws.com:8000", // Updated Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ["ec2-34-239-124-130.compute-1.amazonaws.com"], // Updated host
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
  },
});

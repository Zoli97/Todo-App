import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7000", // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // define process env
  define: {
    "process.env": process.env,
  },
});

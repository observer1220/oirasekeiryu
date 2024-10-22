import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  base:
    process.env.NODE_ENV === "development" ? "/oirasekeiryu" : "oirasekeiryu",
});

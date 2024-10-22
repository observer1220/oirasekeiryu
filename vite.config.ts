import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), checker({ typescript: true })],
    base:
      process.env.NODE_ENV === "development" ? "/oirasekeiryu" : "oirasekeiryu",
    define: {
      "process.env": env,
    },
  };
});

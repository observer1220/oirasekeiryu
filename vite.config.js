import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig( () => {
  const env = loadEnv("", process.cwd());
  return {
    plugins: [react(), eslint()],
    base: env.VITE_BASE,
  }
})
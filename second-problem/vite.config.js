import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 👈 forces Vite to run on localhost:3000
    open: true, // (optional) auto-opens browser
  },
})

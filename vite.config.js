import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tea-data-app/',
  server: {
    host: true,
    port: 5173
  }
})

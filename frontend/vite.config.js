import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/run': 'http://localhost:5000',
      // Add more API endpoints here if needed
    },
  },
})

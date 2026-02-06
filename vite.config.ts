import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/uottawa': {
        target: 'https://web5.uottawa.ca',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/uottawa/, '/rezweb'),
        secure: true
      }
    }
  }
})

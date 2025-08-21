import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'client',                 // frontend lives here
  plugins: [react()],
  build: {
    outDir: '../dist/client',     // compiled frontend goes to dist/client
    emptyOutDir: true
  }
})

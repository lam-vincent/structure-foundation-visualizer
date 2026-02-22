import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/structure-foundation-visualizer/',
  plugins: [react()],
})

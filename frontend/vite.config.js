// 3. Configure vite.config.ts / vite.config.js

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ← if you're using React
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),              // keep this if you're using React/Vue/...
    tailwindcss(),        // ← add this line
  ],
   build: {
    outDir: "dist",
    emptyOutDir: true,
  },
})
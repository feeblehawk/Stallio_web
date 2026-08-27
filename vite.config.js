import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],

  build: {
    // Inject <link rel="modulepreload"> for every transitive chunk a page needs.
    // When the browser fetches Home.js it immediately parallel-fetches FinalCta.js,
    // motionVariants.js, etc. — eliminating the waterfall where each shared chunk
    // was only discovered after its parent finished parsing.
    modulePreload: { polyfill: true },
  },
})
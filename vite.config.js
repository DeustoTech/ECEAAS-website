import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Use import.meta.dirname (Vite v8 native configLoader compatible)
      '@': `${import.meta.dirname}/src`,
    },
  },
  // Adjust base if deploying to a subdirectory, e.g. '/eceaas/'
  base: '/',
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
// Mesma data no HTML pré-renderizado e no bundle do cliente (rodapé, sitemap, llms.txt).
const BUILD_DATE = process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10)
process.env.BUILD_DATE = BUILD_DATE

export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(BUILD_DATE),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   host: '192.168.0.106'
  // }
})

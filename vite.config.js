import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    host: true,
    port: 3000,
    proxy: {
      '/apihost': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apihost/, ''),
      }
    },
  },
  resolve: {
    alias: {
      global: 'global/window',
    },
  },
  define: {
    global: {},
  },
});

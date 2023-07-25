import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV || 'development',
  plugins: [react()],
  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/app/assets/styles/_globalStyle.scss";',
      },
    },
  },
  resolve: {
    alias: [{ find: '@app', replacement: path.resolve(__dirname, 'src') }],
  },
})

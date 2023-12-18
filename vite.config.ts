/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  mode: process.env.NODE_ENV || "development",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setupTest.ts",
  },
  build: {
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000000,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/app/assets/styles/_globalStyle.scss";',
      },
    },
  },
  resolve: {
    alias: [{ find: "@app", replacement: path.resolve(__dirname, "src") }],
  },
});

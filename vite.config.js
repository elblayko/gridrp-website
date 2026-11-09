import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative asset paths so it can be deployed to any static host or subdirectory
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});

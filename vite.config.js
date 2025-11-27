import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        bunQuay: resolve(__dirname, 'mon-an/bun-quay.html'),
        goiCaTrich: resolve(__dirname, 'mon-an/goi-ca-trich.html'),
        bunKen: resolve(__dirname, 'mon-an/bun-ken.html'),
        gheHamNinh: resolve(__dirname, 'mon-an/ghe-ham-ninh.html'),
        nhumBien: resolve(__dirname, 'mon-an/nhum-bien.html'),
        gaRay: resolve(__dirname, 'mon-an/ga-ray.html'),
      },
    },
  },
});
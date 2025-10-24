import { defineConfig } from 'vite';
import angular from '@vitejs/plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    allowedHosts: ['card-manager-app.onrender.com']
  },
  build: {
    target: 'es2022'
  }
});

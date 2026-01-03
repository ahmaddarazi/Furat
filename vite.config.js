import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        homeFurnishings: resolve(__dirname, 'home-furnishings.html'),
        office: resolve(__dirname, 'office.html'),
        kitchens: resolve(__dirname, 'kitchens.html'),
        rugs: resolve(__dirname, 'rugs.html'),
        newArrivals: resolve(__dirname, 'new-arrivals.html'),
        impressum: resolve(__dirname, 'impressum.html'),
        datenschutz: resolve(__dirname, 'datenschutz.html'),
        notFound: resolve(__dirname, '404.html')
      }
    }
  }
});

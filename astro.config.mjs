import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server', // <--- ADD THIS EXACT LINE
  adapter: cloudflare(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // ADD THIS LINE BELOW (This is the missing piece for SEO)
  site: 'https://lewishamyourparty.org.uk',
  
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
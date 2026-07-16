import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chayev.github.io',
  base: '/menslounge',
  output: 'static',
  integrations: [sitemap()],
});

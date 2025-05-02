// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wassupsabin.github.io',  // Replace with your actual GitHub username
  base: '/website-southside',  // Uncommenting for GitHub Pages deployment
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404'), // Exclude 404 page from sitemap
      changefreq: 'weekly',
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-GB'
        }
      }
    })
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },
  output: 'static',
  image: {
    service: {
      entrypoint: 'astro/assets'
    }
  }
});

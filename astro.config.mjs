// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-github-username.github.io',  // Replace with your GitHub username
  // base: '/website-southside',  // Commenting out for local development
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

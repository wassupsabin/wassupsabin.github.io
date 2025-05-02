// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wassupsabin.github.io',  // This is correct for your GitHub username
  // Set trailingSlash to "ignore" instead of "always" to fix 404 errors
  trailingSlash: 'ignore',
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

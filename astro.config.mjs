import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://doublequeens.github.io',
  base: '/johnq',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  build: {
    format: 'directory'
  }
});

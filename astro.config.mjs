import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://qinshujuan.github.io/johnq',
  base: '/',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkGfm],
  },
  build: {
    format: 'directory'
  }
});

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://qinshujuan.github.io/minimal-blog',
  base: '/minimal-blog',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});

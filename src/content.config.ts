import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const technical = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/technical' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    readTime: z.string().optional(),
    cover: z.string().optional(),
  }),
});

const life = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/life' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    readTime: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = { technical, life };

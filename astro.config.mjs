// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from '@astrojs/mdx'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

// https://astro.build/config
export default defineConfig({
  site: 'http://nashdev255.github.io/',
  base: 'nash-portfolio-2025',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    mdx()
  ],
  
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeRaw,
      [
        rehypeKatex,
        {output: 'mathml' }
      ]
    ],
  }
});

// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'http://nashdev255.github.io/',
  base: 'nash-portfolio-2025',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [
        rehypeKatex,
        {output: 'mathml' }
      ]
    ],
  },
});

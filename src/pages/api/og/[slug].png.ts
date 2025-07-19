import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export const prerender = true;

export const GET: APIRoute = async ({ params, props }) => {
  try {
    const { slug } = params;
    const { post } = props;

    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    const width = 1200;
    const height = 630;

    let fontBase64 = '';
    try {
      const fontPath = path.join(process.cwd(), 'node_modules', '@fontsource', 'noto-sans-jp', 'files', 'noto-sans-jp-japanese-400-normal.woff2');
      if (fs.existsSync(fontPath)) {
        const fontBuffer = fs.readFileSync(fontPath);
        fontBase64 = fontBuffer.toString('base64');
        console.log('Font loaded successfully');
      }
    } catch (error) {
      console.log('Font loading failed');
    }

    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4facfe;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#00f2fe;stop-opacity:1" />
          </linearGradient>
          ${fontBase64 ? `
          <style>
            @font-face {
              font-family: 'Noto Sans JP Embedded';
              src: url(data:font/woff2;base64,${fontBase64}) format('woff2');
              font-weight: 400;
              font-style: normal;
            }
            @font-face {
              font-family: 'Noto Sans JP Embedded';
              src: url(data:font/woff2;base64,${fontBase64}) format('woff2');
              font-weight: 700;
              font-style: normal;
            }
          </style>
          ` : ''}
        </defs>
        
        <!-- 背景グラデーション -->
        <rect width="100%" height="100%" fill="url(#grad)"/>
        
        <!-- 装飾的な円 -->
        <circle cx="200" cy="200" r="150" fill="rgba(255,255,255,0.1)"/>
        <circle cx="1000" cy="430" r="120" fill="rgba(255,255,255,0.1)"/>
        
        <!-- タイトル -->
        <text x="80" y="120" font-family="${fontBase64 ? 'Noto Sans JP Embedded' : 'Arial, sans-serif'}" font-weight="bold" font-size="48" fill="white">${post.data.title.length > 35 ? post.data.title.substring(0, 35) + '...' : post.data.title}</text>
        
        <!-- ブランド名 -->
        <text x="1120" y="580" font-family="${fontBase64 ? 'Noto Sans JP Embedded' : 'Arial, sans-serif'}" font-size="24" fill="rgba(255,255,255,0.9)" text-anchor="end">Nash | Digital Content Developer</text>
      </svg>
    `;

    const buffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error generating OGP image:', err);
    console.error('Error details:', err.message);
    console.error('Error stack:', err.stack);
    return new Response('Error generating image', { status: 500 });
  }
};

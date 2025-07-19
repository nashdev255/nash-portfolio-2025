import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { createCanvas } from 'canvas';

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

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#4facfe');
    gradient.addColorStop(1, '#00f2fe');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(200, 200, 150, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1000, 430, 120, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    const title = post.data.title.length > 35 
      ? post.data.title.substring(0, 35) + '...' 
      : post.data.title;
    
    let currentX = 80;
    const titleY = 80;
    const charSpacing = 2;
    
    for (let i = 0; i < title.length; i++) {
      const char = title[i];
      ctx.fillText(char, currentX, titleY);
      
      const charWidth = ctx.measureText(char).width;
      currentX += charWidth + charSpacing;
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Nash | Digital Content Developer', width - 80, height - 80);

    const buffer = canvas.toBuffer('image/png');

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

import { profile } from '@/app/_data/portfolio';
import { getBlogPost, getBlogPosts } from '@/app/_data/posts';
import { calculateReadingTime } from '@/app/_utils/blog';
import { formatDate } from '@/app/_utils/date';
import { ImageResponse } from 'next/og';

export const alt = 'Portada del artículo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

/** Tono estable por post para que cada portada sea distinta pero coherente. */
const hueFromSlug = (slug: string) => [...slug].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 360, 7);

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.metadata.title ?? profile.name;
  const tags = post?.metadata.tags?.slice(0, 3) ?? [];
  const hue = hueFromSlug(slug);
  const domain = profile.website.replace(/^https?:\/\//, '');

  return new ImageResponse(
    <div
      tw='flex h-full w-full flex-col justify-between p-20 text-white'
      style={{
        background: `radial-gradient(circle at 85% 15%, hsl(${hue} 70% 35% / 0.55), transparent 55%), linear-gradient(160deg, #0a0a0f 0%, #111218 100%)`,
      }}
    >
      <div tw='flex items-center justify-between text-2xl text-slate-400'>
        <span>{domain}/blog</span>
        <div tw='flex'>
          {tags.map((tag) => (
            <span
              key={tag}
              tw='ml-3 rounded-full px-5 py-2 text-xl text-slate-200'
              style={{ border: '1px solid rgba(255,255,255,0.18)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div tw='flex text-7xl font-bold leading-tight tracking-tight' style={{ lineClamp: 3 }}>
        {title}
      </div>

      <div tw='flex items-center justify-between text-2xl text-slate-400'>
        <span tw='text-slate-200'>{profile.name}</span>
        {post ? (
          <span>
            {formatDate(post.metadata.publishedAt)} · {calculateReadingTime(post.content)} min de lectura
          </span>
        ) : null}
      </div>
    </div>,
    size
  );
}

import '@/app/_styles/blog.css';
import '@/app/_styles/code-highlighting.css';
import { CustomMDX } from '@/app/_components/mdx';
import { envs } from '@/app/_config/envs';
import { getBlogPosts } from '@/app/_data/posts';
import { formatDate } from '@/app/_utils/date';
import { Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buttonVariants, Chip } from '@heroui/react';
import { profile } from '@/app/_data/portfolio';

export default async function Blog({ params: _params }: PageProps<'/blog/[slug]'>) {
  const params = await _params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const readingTime = Math.max(1, Math.round(post.content.split(/\s+/).filter(Boolean).length / 200));
  const btnClass = buttonVariants({ variant: 'outline' });

  return (
    <section className='mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
      <div className='mb-4'>
        <Link href={'/blog' as Route} className={btnClass}>
          <span aria-hidden='true'>←</span>
          <span>Volver a los posts</span>
        </Link>
      </div>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${envs.SITE_URL}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${envs.SITE_URL}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: profile.name,
            },
          }),
        }}
      />
      <div className='relative overflow-hidden rounded-4xl border px-6 py-8 shadow-2xl backdrop-blur-xl sm:px-10 sm:py-12'>
        <div>
          <div className='text-muted flex flex-wrap items-center gap-3 text-xs tracking-[0.28em] uppercase'>
            <span>Blog</span>
            <span className='h-1 w-1 rounded-full bg-current opacity-40' />
            <span>{formatDate(post.metadata.publishedAt)}</span>
            <span className='h-1 w-1 rounded-full bg-current opacity-40' />
            <span>{readingTime} min</span>
          </div>

          <h1 className='text-balance mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl'>
            {post.metadata.title}
          </h1>

          {post.metadata.summary ? (
            <p className='text-foreground-2 mt-5 max-w-3xl text-base leading-8 sm:text-lg'>{post.metadata.summary}</p>
          ) : null}

          <div className='mt-8 flex flex-wrap items-center gap-3 text-sm'>
            <Chip size='lg'>Lectura pausada</Chip>
            <Chip size='lg'>{readingTime} min de lectura</Chip>
          </div>
          <article className='prose mt-10'>
            <CustomMDX source={post.content} />
          </article>
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params: _params }: PageProps<'/blog/[slug]'>) {
  const params = await _params;

  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  let ogImage = image;
  if (!ogImage) {
    const ogUrl = new URL('/og', envs.SITE_URL);
    ogUrl.searchParams.set('title', title);
    ogUrl.searchParams.set('description', description || '');
    ogUrl.searchParams.set('author', profile.name);
    ogUrl.searchParams.set('date', formatDate(publishedTime));
    ogUrl.searchParams.set('category', 'Blog');
    ogUrl.searchParams.set('url', `${envs.SITE_URL}/blog/${post.slug}`);
    ogImage = ogUrl.toString();
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${envs.SITE_URL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

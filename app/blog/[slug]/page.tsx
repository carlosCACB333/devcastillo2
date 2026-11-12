import { CustomMDX } from '@/app/_components/mdx';
import { ButtonLink } from '@/app/_components/ui/button-link';
import { JsonLd } from '@/app/_components/json-ld';
import { appLocale } from '@/app/_config/app';
import { absoluteUrl, personJsonLd, siteUrl } from '@/app/_config/seo';
import { profile } from '@/app/_data/portfolio';
import { BlogPost, getBlogPost, getBlogPosts } from '@/app/_data/posts';
import '@/app/_styles/blog.css';
import '@/app/_styles/code-highlighting.css';
import { calculateReadingTime } from '@/app/_utils/blog';
import { formatDate } from '@/app/_utils/date';
import { Chip } from '@heroui/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Blog({ params: _params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await _params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  return (
    <section className='mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
      <div className='mb-4'>
        <ButtonLink href={'/blog'} variant='outline'>
          <span aria-hidden='true'>←</span>
          <span>Volver a los posts</span>
        </ButtonLink>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              '@id': `${postUrl}#article`,
              headline: post.metadata.title,
              description: post.metadata.summary,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              image: getPostImage(post),
              url: postUrl,
              mainEntityOfPage: postUrl,
              inLanguage: appLocale,
              timeRequired: `PT${readingTime}M`,
              wordCount: post.content.split(/\s+/).filter(Boolean).length,
              author: { '@type': 'Person', '@id': personJsonLd['@id'], name: profile.name, url: siteUrl },
              publisher: { '@type': 'Person', '@id': personJsonLd['@id'], name: profile.name },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
                { '@type': 'ListItem', position: 3, name: post.metadata.title, item: postUrl },
              ],
            },
          ],
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

          <h1 className='mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl'>
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

const getPostImage = (post: BlogPost) => {
  const { title, summary, publishedAt, image } = post.metadata;
  if (image) return absoluteUrl(image);

  const ogUrl = new URL(absoluteUrl('/og'));
  ogUrl.searchParams.set('title', title);
  ogUrl.searchParams.set('description', summary || '');
  ogUrl.searchParams.set('author', profile.name);
  ogUrl.searchParams.set('date', formatDate(publishedAt));
  ogUrl.searchParams.set('category', 'Blog');
  ogUrl.searchParams.set('url', absoluteUrl(`/blog/${post.slug}`));
  return ogUrl.toString();
};

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return {};
  }

  const { title, publishedAt: publishedTime, summary: description } = post.metadata;
  const path = `/blog/${post.slug}`;
  const ogImage = { url: getPostImage(post), width: 1200, height: 630, alt: title };

  return {
    title,
    description,
    authors: [{ name: profile.name, url: siteUrl }],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'es_PE',
      siteName: profile.name,
      publishedTime,
      modifiedTime: publishedTime,
      authors: [profile.name],
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

import Link from 'next/link';
import { JsonLd } from '@/app/_components/json-ld';
import { appLocale } from '@/app/_config/app';
import { absoluteUrl, pageMetadata, personJsonLd } from '@/app/_config/seo';
import { profile } from '@/app/_data/portfolio';
import { Metadata, Route } from 'next';
import { getBlogPosts } from '../_data/posts';
import { formatDate } from '../_utils/date';

export default function Page() {
  const allBlogs = getBlogPosts();

  return (
    <section className='mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': absoluteUrl('/blog'),
          url: absoluteUrl('/blog'),
          name: `Blog de ${profile.name}`,
          description,
          inLanguage: appLocale,
          author: { '@id': personJsonLd['@id'] },
          blogPost: allBlogs.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            url: absoluteUrl(`/blog/${post.slug}`),
          })),
        }}
      />
      <header className='space-y-3'>
        <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>Blog</h1>
        <p className='text-foreground-2 max-w-2xl text-base leading-7 sm:text-lg'>{description}</p>
      </header>
      <div className='mt-8 grid gap-4'>
        {allBlogs.map((post) => (
          <Link
            key={post.slug}
            className='group overflow-hidden rounded-[1.5rem] border px-5 py-5 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:bg-white/85 hover:shadow-2xl sm:px-6 dark:hover:border-white/20 dark:hover:bg-white/8'
            href={`/blog/${post.slug}` as Route}
          >
            <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
              <div className='max-w-3xl space-y-2'>
                <div className='text-muted flex flex-wrap items-center gap-3 text-xs tracking-[0.24em] uppercase'>
                  <span>{formatDate(post.metadata.publishedAt)}</span>
                  <span className='h-1 w-1 rounded-full bg-current opacity-40' />
                  <span>Artículo</span>
                </div>
                <h2 className='text-2xl font-semibold tracking-tight transition-colors'>{post.metadata.title}</h2>
                <p className='text-foreground-2 max-w-2xl text-sm leading-7 sm:text-base'>{post.metadata.summary}</p>
              </div>
              <div className='text-foreground-2 flex items-center gap-2 text-sm'>
                <span className='hidden md:inline'>Leer</span>
                <span className='text-lg transition-transform duration-300 group-hover:translate-x-1'>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const description = 'Artículos, tutoriales y reflexiones sobre desarrollo web, programación y tecnología.';

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description,
  path: '/blog',
});

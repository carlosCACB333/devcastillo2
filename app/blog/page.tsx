import Link from 'next/link';
import { JsonLd } from '@/app/_components/json-ld';
import { appLocale } from '@/app/_config/app';
import { absoluteUrl, pageMetadata, personJsonLd } from '@/app/_config/seo';
import { profile } from '@/app/_data/portfolio';
import { Metadata, Route } from 'next';
import { getBlogPosts } from '../_data/posts';
import { calculateReadingTime } from '../_utils/blog';
import { formatDate } from '../_utils/date';

export default function Page() {
  const allBlogs = getBlogPosts();

  return (
    <section className='mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16'>
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
      <header className='border-b border-(--app-border) pb-10'>
        <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl'>Blog</h1>
        <p className='text-foreground-2 mt-4 max-w-2xl text-lg leading-8'>{description}</p>
      </header>

      <ul className='divide-y divide-(--app-border)'>
        {allBlogs.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}` as Route}
              className='group grid gap-2 py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8'
            >
              <div className='text-muted text-sm sm:pt-1'>
                <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt)}</time>
              </div>
              <div className='space-y-2'>
                <h2 className='text-xl font-semibold tracking-tight text-balance sm:text-2xl'>
                  <span className='bg-linear-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]'>
                    {post.metadata.title}
                  </span>
                </h2>
                <p className='text-foreground-2 max-w-2xl leading-7'>{post.metadata.summary}</p>
                <p className='text-muted flex items-center gap-2 pt-1 text-sm'>
                  <span>{calculateReadingTime(post.content)} min de lectura</span>
                  <span aria-hidden='true' className='transition-transform duration-300 group-hover:translate-x-1'>
                    →
                  </span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

const description = 'Artículos, tutoriales y reflexiones sobre desarrollo web, programación y tecnología.';

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description,
  path: '/blog',
});

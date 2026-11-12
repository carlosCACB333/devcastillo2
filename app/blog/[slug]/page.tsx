import { CustomMDX } from '@/app/_components/mdx';
import { JsonLd } from '@/app/_components/json-ld';
import { appLocale } from '@/app/_config/app';
import { absoluteUrl, personJsonLd, siteUrl } from '@/app/_config/seo';
import { profile } from '@/app/_data/portfolio';
import { BlogPost, getBlogPost, getBlogPosts } from '@/app/_data/posts';
import '@/app/_styles/blog.css';
import '@/app/_styles/code-highlighting.css';
import { calculateReadingTime, extractToc } from '@/app/_utils/blog';
import { ReadingProgress } from '../_components/reading-progress';
import { TableOfContents, TableOfContentsMobile } from '../_components/table-of-contents';
import { formatDate } from '@/app/_utils/date';
import type { Metadata, Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const CONTENT_ID = 'post-content';

export default async function Blog({ params: _params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await _params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const toc = extractToc(post.content);

  const posts = getBlogPosts();
  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <>
      <ReadingProgress targetId={CONTENT_ID} />
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
      <div className='mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16'>
        <div className='lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_17rem] xl:gap-24'>
          <article className='mx-auto w-full max-w-3xl min-w-0'>
            <header id='top' className='scroll-mt-32'>
              <Link
                href='/blog'
                className='text-muted hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors'
              >
                <span aria-hidden='true'>←</span> Blog
              </Link>

              <div className='text-muted mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm'>
                <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt)}</time>
                <span aria-hidden='true'>·</span>
                <span>{readingTime} min de lectura</span>
              </div>

              <h1 className='mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl'>
                {post.metadata.title}
              </h1>

              {post.metadata.summary ? (
                <p className='text-foreground-2 mt-6 text-lg leading-8 text-pretty'>{post.metadata.summary}</p>
              ) : null}

              <div className='mt-8 flex items-center gap-3 border-b border-(--app-border) pb-8'>
                <Image src={profile.avatarUrl} alt='' width={36} height={36} className='rounded-full' />
                <div className='text-sm leading-tight'>
                  <p className='font-medium'>{profile.name}</p>
                  <p className='text-muted'>{profile.role.split('|')[0].trim()}</p>
                </div>
              </div>
            </header>

            <div className='mt-8 lg:hidden'>
              <TableOfContentsMobile items={toc} />
            </div>

            <div id={CONTENT_ID} className='prose mt-4'>
              <CustomMDX source={post.content} />
            </div>

            <PostNavigation newer={newer} older={older} />
          </article>

          <aside className='hidden lg:block'>
            <div className='sticky top-28'>
              <TableOfContents items={toc} targetId={CONTENT_ID} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

const PostNavigation = ({ newer, older }: { newer?: BlogPost; older?: BlogPost }) => {
  if (!newer && !older) return null;

  return (
    <nav aria-label='Más artículos' className='mt-16 grid gap-4 border-t border-(--app-border) pt-8 sm:grid-cols-2'>
      {older ? (
        <Link
          href={`/blog/${older.slug}` as Route}
          className='group rounded-2xl border border-(--app-border) p-5 transition-colors hover:bg-(--surface)'
        >
          <span className='text-muted text-xs tracking-[0.2em] uppercase'>← Anterior</span>
          <span className='mt-2 block font-medium text-balance'>{older.metadata.title}</span>
        </Link>
      ) : (
        <span className='hidden sm:block' />
      )}
      {newer ? (
        <Link
          href={`/blog/${newer.slug}` as Route}
          className='group rounded-2xl border border-(--app-border) p-5 text-right transition-colors hover:bg-(--surface)'
        >
          <span className='text-muted text-xs tracking-[0.2em] uppercase'>Siguiente →</span>
          <span className='mt-2 block font-medium text-balance'>{newer.metadata.title}</span>
        </Link>
      ) : null}
    </nav>
  );
};

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

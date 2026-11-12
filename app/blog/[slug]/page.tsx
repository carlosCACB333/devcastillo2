import { CustomMDX } from '@/app/_components/mdx';
import { JsonLd } from '@/app/_components/json-ld';
import { appLocale } from '@/app/_config/app';
import { absoluteUrl, alternatesWith, personJsonLd, siteUrl } from '@/app/_config/seo';
import { profile } from '@/app/_data/portfolio';
import { BlogPost, getBlogPost, getBlogPosts, getPostModifiedAt, getRelatedPosts } from '@/app/_data/posts';
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
import { Suspense } from 'react';

const CONTENT_ID = 'post-content';

/**
 * La página es síncrona: el contenedor y el esqueleto forman el App Shell compartido por todos los posts
 * (Partial Prefetching). El slug se lee dentro de <Suspense>, así la navigación es instantánea.
 * Los posts de `generateStaticParams` se prerenderizan completos, así que el HTML no pierde contenido.
 */
export default function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  return (
    <div className='mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16'>
      <Suspense fallback={<PostSkeleton />}>
        <BlogPostContent params={params} />
      </Suspense>
    </div>
  );
}

const PostSkeleton = () => (
  <div aria-hidden='true' className='mx-auto max-w-3xl animate-pulse space-y-6 lg:mx-0'>
    <div className='h-4 w-16 rounded bg-(--surface)' />
    <div className='mt-10 h-4 w-48 rounded bg-(--surface)' />
    <div className='h-12 w-full rounded-lg bg-(--surface)' />
    <div className='h-12 w-2/3 rounded-lg bg-(--surface)' />
    <div className='h-20 w-full rounded-lg bg-(--surface)' />
  </div>
);

async function BlogPostContent({ params }: Pick<PageProps<'/blog/[slug]'>, 'params'>) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const toc = extractToc(post.content);

  const related = getRelatedPosts(post);
  const { publishedAt, tags = [] } = post.metadata;
  const modifiedAt = getPostModifiedAt(post);
  const wasUpdated = modifiedAt !== publishedAt;

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
              datePublished: publishedAt,
              dateModified: modifiedAt,
              image: getPostImage(post),
              keywords: tags.join(', '),
              articleSection: tags[0],
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
      <div>
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
                <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                <span aria-hidden='true'>·</span>
                <span>{readingTime} min de lectura</span>
                {wasUpdated ? (
                  <>
                    <span aria-hidden='true'>·</span>
                    <span>
                      Actualizado el <time dateTime={modifiedAt}>{formatDate(modifiedAt)}</time>
                    </span>
                  </>
                ) : null}
              </div>

              <h1 className='mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl'>
                {post.metadata.title}
              </h1>

              {post.metadata.summary ? (
                <p className='text-foreground-2 mt-6 text-lg leading-8 text-pretty'>{post.metadata.summary}</p>
              ) : null}

              {tags.length > 0 ? (
                <ul aria-label='Etiquetas' className='mt-6 flex flex-wrap gap-2'>
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className='text-foreground-2 rounded-full border border-(--app-border) px-3 py-1 text-xs'
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
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
              <TableOfContentsMobile items={toc} targetId={CONTENT_ID} />
            </div>

            <div id={CONTENT_ID} className='prose mt-4'>
              <CustomMDX source={post.content} />
            </div>

            <RelatedPosts posts={related} />
          </article>

          <aside className='hidden lg:block'>
            {/* top = navbar + borde + padding superior (lg:py-16): coincide con la posición inicial, así no se desplaza. */}
            <div className='sticky top-(--toc-top) [--toc-max-height:calc(100vh-var(--toc-top)-2rem)] [--toc-top:calc(var(--nav-height)+1px+4rem)]'>
              <TableOfContents items={toc} targetId={CONTENT_ID} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

const RelatedPosts = ({ posts }: { posts: BlogPost[] }) => {
  if (posts.length === 0) return null;

  return (
    <nav aria-labelledby='related-heading' className='mt-20 border-t border-(--app-border) pt-10'>
      <h2 id='related-heading' className='text-muted text-xs font-medium tracking-[0.2em] uppercase'>
        Sigue leyendo
      </h2>
      <ul className='mt-4 divide-y divide-(--app-border)'>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}` as Route} className='group flex items-baseline justify-between gap-6 py-5'>
              <span className='space-y-1'>
                <span className='group-hover:text-foreground block font-medium text-balance transition-colors'>
                  {post.metadata.title}
                </span>
                <span className='text-foreground-2 line-clamp-2 block text-sm leading-6'>{post.metadata.summary}</span>
              </span>
              <span
                aria-hidden='true'
                className='text-muted shrink-0 transition-transform duration-300 group-hover:translate-x-1'
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/** Portada del post: la del frontmatter o la generada por `opengraph-image.tsx`. */
const getPostImage = (post: BlogPost) => absoluteUrl(post.metadata.image ?? `/blog/${post.slug}/opengraph-image`);

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return {};
  }

  const { title, publishedAt: publishedTime, summary: description, tags = [] } = post.metadata;
  const path = `/blog/${post.slug}`;
  const images = [{ url: getPostImage(post), width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    keywords: tags,
    authors: [{ name: profile.name, url: siteUrl }],
    alternates: alternatesWith(path),
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'es_PE',
      siteName: profile.name,
      publishedTime,
      modifiedTime: getPostModifiedAt(post),
      authors: [profile.name],
      section: tags[0],
      tags,
      url: path,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}

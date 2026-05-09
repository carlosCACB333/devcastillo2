import Link from 'next/link';
import { Metadata, Route } from 'next';
import { getBlogPosts } from '../_data/posts';
import { formatDate } from '../_utils/date';

export default function Page() {
  const allBlogs = getBlogPosts();

  return (
    <section className='mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
      <div className='mt-8 grid gap-4'>
        {allBlogs
          .sort((a, b) => {
            const dateA = new Date(a.metadata.publishedAt);
            const dateB = new Date(b.metadata.publishedAt);
            if (dateA > dateB) return -1;
            if (dateA < dateB) return 1;
            return 0;
          })
          .map((post) => (
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
                  <p className='text-2xl font-semibold tracking-tight transition-colors'>{post.metadata.title}</p>
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

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos, tutoriales y reflexiones sobre desarrollo web, programación y tecnología.',
};

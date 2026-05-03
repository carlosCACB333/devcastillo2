import { ImageResponse } from 'next/og';
import { envs } from '../_config/envs';

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Portfolio';
  const description = url.searchParams.get('description') || '';
  const author = url.searchParams.get('author') || 'Developer';
  const date = url.searchParams.get('date');
  const category = url.searchParams.get('category') || 'Blog';
  const blogUrl = url.searchParams.get('url') || `${envs.SITE_URL}/blog`;

  return new ImageResponse(
    <div tw='flex flex-col w-full h-full px-12 py-12'>
      {/* Background accent */}
      <div tw='absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20' />
      <div tw='absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20' />

      {/* Content */}
      <div tw='flex flex-col h-full justify-between relative z-10'>
        {/* Header */}
        <div tw='flex items-center justify-between'>
          <span tw='text-slate-600 text-sm'>{category}</span>
        </div>

        {/* Main content */}
        <div tw='flex flex-col gap-6'>
          {/* Title */}
          <h1 tw='flex text-6xl font-black  leading-tight max-w-5xl'>{title}</h1>

          {/* Description */}
          {description && <p tw='text-xl text-slate-600 max-w-4xl leading-relaxed'>{description}</p>}
        </div>

        {/* Footer */}
        <div tw='flex items-center justify-between pt-8 border-t border-slate-700'>
          <div tw='flex items-center gap-4'>
            <div tw='flex w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full' />
            <div tw='flex flex-col'>
              <span tw=' font-semibold text-sm'>{author}</span>
              <span tw='text-slate-600 text-xs'>{date}</span>
            </div>
          </div>
          <span tw='text-slate-600 text-sm'>{blogUrl}</span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}

import { Skeleton } from '@heroui/react';

export default function Loading() {
  return (
    <main aria-busy='true' aria-live='polite'>
      <section className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24'>
        <div className='space-y-6 pt-8 sm:pt-12'>
          <div className='max-w-2xl space-y-3'>
            <Skeleton className='h-4 w-28 rounded-full' />
            <Skeleton className='h-8 w-full max-w-2xl rounded-2xl' />
            <Skeleton className='h-5 w-full max-w-xl rounded-2xl' />
          </div>

          <div className='space-y-4'>
            <Skeleton className='h-40 rounded-[1.5rem]' />
            <Skeleton className='h-40 rounded-[1.5rem]' />
          </div>
        </div>

        <div className='grid gap-4 pt-8 md:grid-cols-2 lg:pt-12 xl:grid-cols-3'>
          <Skeleton className='h-40 rounded-[1.5rem]' />
          <Skeleton className='h-40 rounded-[1.5rem]' />
          <Skeleton className='h-40 rounded-[1.5rem]' />
        </div>
      </section>
    </main>
  );
}

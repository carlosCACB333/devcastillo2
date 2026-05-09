import type { ReactNode } from 'react';

export const SearchPageShell = ({ children }: { children: ReactNode }) => (
  <main className='relative overflow-hidden'>
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24'>
      {children}
    </section>
  </main>
);

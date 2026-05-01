'use client';

import { ReactNode } from 'react';
import { useFullscreen } from '@/app/_hooks/use-fullscreen';

type FullscreenBoxProps = {
  children: ReactNode;
  title?: string;
  className?: string;
  contentClassName?: string;
};

export default function FullscreenBox({
  children,
  title = 'Vista',
  className = '',
  contentClassName = '',
}: FullscreenBoxProps) {
  const { elementRef, isFullscreen, isSupported, toggle } = useFullscreen<HTMLElement>();

  const content = <div className={`bg-background ${contentClassName}`}>{children}</div>;

  if (!isSupported) return content;

  return (
    <section ref={elementRef} className={`${className}`}>
      <header className='mb-3 flex items-center justify-between gap-3'>
        <h2 className='text-sm font-semibold uppercase'>{title}</h2>

        <button
          type='button'
          onClick={() => {
            void toggle();
          }}
          className='rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900'
        >
          {isFullscreen ? 'Salir pantalla completa' : 'Pantalla completa'}
        </button>
      </header>
      {content}
    </section>
  );
}

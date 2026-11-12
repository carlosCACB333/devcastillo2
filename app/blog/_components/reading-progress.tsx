'use client';

import { useReadingProgress } from './use-active-heading';

/** Barra superior solo en móvil/tablet: en escritorio el progreso se muestra en el índice lateral. */
export const ReadingProgress = ({ targetId }: { targetId: string }) => {
  const progress = useReadingProgress(targetId);

  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 lg:hidden'>
      <div
        className='bg-foreground/70 h-full origin-left transition-transform duration-150 ease-out'
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

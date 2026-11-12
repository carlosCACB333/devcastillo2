'use client';

import { useReadingProgress } from './use-active-heading';

export const ReadingProgress = ({ targetId }: { targetId: string }) => {
  const progress = useReadingProgress(targetId);

  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5'>
      <div
        className='bg-foreground/70 h-full origin-left transition-transform duration-150 ease-out'
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

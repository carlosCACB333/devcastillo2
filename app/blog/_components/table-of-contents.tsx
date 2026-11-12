'use client';

import type { TocItem } from '@/app/_utils/blog';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useActiveHeading, useReadingProgress } from './use-active-heading';

interface Props {
  items: TocItem[];
  targetId: string;
}

const TocList = ({
  items,
  activeId,
  onNavigate,
}: {
  items: TocItem[];
  activeId: string | null;
  onNavigate?: () => void;
}) => (
  <ul className='space-y-px border-l border-(--app-border)'>
    {items.map((item) => {
      const isActive = item.id === activeId;
      return (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            aria-current={isActive ? 'location' : undefined}
            data-toc-id={item.id}
            className={`-ml-px block border-l py-1.5 text-sm leading-snug transition-colors duration-200 ${
              item.level === 3 ? 'pl-7 text-[0.8125rem]' : 'pl-4'
            } ${
              isActive
                ? 'border-foreground text-foreground font-medium'
                : 'text-foreground/50 hover:text-foreground/80 border-transparent'
            }`}
          >
            {item.text}
          </a>
        </li>
      );
    })}
  </ul>
);

/** Índice lateral fijo (escritorio). */
export const TableOfContents = ({ items, targetId }: Props) => {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveHeading(ids);
  const progress = useReadingProgress(targetId);
  const listRef = useRef<HTMLDivElement>(null);

  // Mantiene visible el elemento activo cuando el índice es más alto que la pantalla.
  // Solo desplaza el contenedor del índice: scrollIntoView también movería la ventana.
  useEffect(() => {
    const container = listRef.current;
    if (!activeId || !container) return;
    const link = container.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(activeId)}"]`);
    if (!link) return;

    const linkTop = link.offsetTop; // el contenedor es `relative`, así que es su offsetParent
    const linkBottom = linkTop + link.offsetHeight;
    const padding = 24;
    if (linkTop - padding < container.scrollTop) {
      container.scrollTo({ top: linkTop - padding, behavior: 'smooth' });
    } else if (linkBottom + padding > container.scrollTop + container.clientHeight) {
      container.scrollTo({ top: linkBottom + padding - container.clientHeight, behavior: 'smooth' });
    }
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <nav aria-label='Índice del artículo' className='flex max-h-[calc(100vh-8rem)] flex-col'>
      <p className='text-muted mb-4 text-xs font-medium tracking-[0.2em] uppercase'>En este artículo</p>
      <div ref={listRef} className='relative -mr-2 [scrollbar-width:thin] overflow-y-auto pr-2'>
        <TocList items={items} activeId={activeId} />
      </div>
      <div className='text-muted mt-6 flex items-center justify-between gap-4 border-t border-(--app-border) pt-4 text-xs'>
        <span className='tabular-nums'>{Math.round(progress * 100)}% leído</span>
        <a href='#top' className='hover:text-foreground transition-colors'>
          Volver arriba ↑
        </a>
      </div>
    </nav>
  );
};

/** Índice plegable (móvil y tablet). */
export const TableOfContentsMobile = ({ items }: Omit<Props, 'targetId'>) => {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveHeading(ids);
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  const activeText = items.find((item) => item.id === activeId)?.text;

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className='group rounded-2xl border border-(--app-border) backdrop-blur-xl lg:hidden'
    >
      <summary className='flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm [&::-webkit-details-marker]:hidden'>
        <span className='flex min-w-0 gap-1.5'>
          <span className='shrink-0 font-medium'>Índice</span>
          {activeText ? <span className='text-muted truncate'>· {activeText}</span> : null}
        </span>
        <span aria-hidden='true' className='text-muted transition-transform duration-200 group-open:rotate-180'>
          ⌄
        </span>
      </summary>
      <div className='max-h-[60vh] overflow-y-auto px-4 pb-4'>
        <TocList items={items} activeId={activeId} onNavigate={() => setOpen(false)} />
      </div>
    </details>
  );
};

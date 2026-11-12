'use client';

import type { TocItem } from '@/app/_utils/blog';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useVisibleSections, type VisibleRange } from './use-active-heading';

interface Props {
  items: TocItem[];
  targetId: string;
}

/** Posición horizontal de la línea según el nivel del título (h3 se mete hacia dentro). */
const LINE_X = { 2: 1, 3: 13 } as const;
/** Media altura de la curva que une dos niveles distintos. */
const CURVE = 8;
const SVG_WIDTH = 16;

interface ItemBox {
  top: number;
  bottom: number;
  x: number;
}

interface Layout {
  boxes: ItemBox[];
  height: number;
}

/** Traza la línea del índice: vertical en cada entrada y una curva suave al cambiar de nivel. */
const buildPath = (boxes: ItemBox[]) =>
  boxes
    .map((box, index) => {
      const prev = boxes[index - 1];
      const next = boxes[index + 1];
      const fromPrev = prev && prev.x !== box.x;
      const toNext = next && next.x !== box.x;
      const start = box.top + (fromPrev ? CURVE : 0);
      const end = box.bottom - (toNext ? CURVE : 0);

      let segment = index === 0 ? `M${box.x} ${start}` : '';
      segment += ` L${box.x} ${end}`;
      if (toNext) {
        const y = box.bottom;
        segment += ` C${box.x} ${y} ${next.x} ${y} ${next.x} ${y + CURVE}`;
      }
      return segment;
    })
    .join('');

/** Mide la posición de cada entrada del índice (se recalcula si cambia el tamaño). */
function useListLayout(items: TocItem[]) {
  const listRef = useRef<HTMLUListElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const observer = new ResizeObserver(() => {
      const boxes = Array.from(list.children as HTMLCollectionOf<HTMLElement>).map((li, index) => ({
        top: li.offsetTop,
        bottom: li.offsetTop + li.offsetHeight,
        x: LINE_X[items[index]?.level ?? 2],
      }));
      setLayout(list.offsetHeight > 0 ? { boxes, height: list.offsetHeight } : null);
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [items]);

  return { listRef, layout };
}

/**
 * Tramo resaltado. Empieza y termina en partes rectas de la línea: si la primera/última entrada
 * llega con una curva, se salta esa curva para que el punto quede siempre sobre la línea.
 */
const getThumb = (boxes: ItemBox[], { first, last }: VisibleRange) => {
  const start = boxes[first];
  const end = boxes[last];
  const curvesIn = first > 0 && boxes[first - 1].x !== start.x;
  const curvesOut = last < boxes.length - 1 && boxes[last + 1].x !== end.x;
  const top = start.top + (curvesIn ? CURVE : 0);
  const bottom = end.bottom - (curvesOut ? CURVE : 0);
  return { top, height: Math.max(0, bottom - top), x: start.x };
};

interface TocListProps {
  items: TocItem[];
  range: VisibleRange | null;
  onNavigate?: () => void;
}

/**
 * Lista del índice. La línea resalta las secciones visibles en pantalla y un punto marca dónde empieza.
 * El resaltado es un bloque animado recortado con la forma de la línea (mask-image con el mismo SVG).
 */
const TocList = ({ items, range, onNavigate }: TocListProps) => {
  const { listRef, layout } = useListLayout(items);
  const path = useMemo(() => (layout ? buildPath(layout.boxes) : ''), [layout]);
  const mask = useMemo(() => {
    if (!layout) return undefined;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SVG_WIDTH}" height="${layout.height}"><path d="${path}" stroke="black" stroke-width="2" fill="none"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, [layout, path]);

  const thumb = layout && range ? getThumb(layout.boxes, range) : null;

  return (
    <div className='relative'>
      {layout ? (
        <>
          <svg
            aria-hidden='true'
            className='absolute top-0 left-0 text-(--app-border)'
            width={SVG_WIDTH}
            height={layout.height}
          >
            <path d={path} stroke='currentColor' strokeWidth={1} fill='none' />
          </svg>
          <div
            aria-hidden='true'
            className='absolute top-0 left-0'
            style={{ width: SVG_WIDTH, height: layout.height, maskImage: mask, WebkitMaskImage: mask }}
          >
            <div
              className='bg-foreground absolute inset-x-0 transition-[top,height,opacity] duration-300 ease-out'
              style={{ top: thumb?.top ?? 0, height: thumb?.height ?? 0, opacity: thumb ? 1 : 0 }}
            />
          </div>
          <span
            aria-hidden='true'
            className='bg-foreground absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[top,left,opacity] duration-300 ease-out'
            style={{ top: thumb?.top ?? 0, left: thumb?.x ?? LINE_X[2], opacity: thumb ? 1 : 0 }}
          />
        </>
      ) : null}

      {/* Sin medidas (SSR / antes de hidratar) una línea recta en la misma posición: no desplaza nada. */}
      {layout ? null : <span aria-hidden='true' className='absolute inset-y-0 left-0 w-px bg-(--app-border)' />}
      <ul ref={listRef} className='relative'>
        {items.map((item, index) => {
          const isVisible = range !== null && index >= range.first && index <= range.last;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={onNavigate}
                aria-current={range?.first === index ? 'location' : undefined}
                data-toc-id={item.id}
                className={`block py-1.5 text-sm leading-snug transition-colors duration-200 ${
                  item.level === 3 ? 'pl-8' : 'pl-5'
                } ${isVisible ? 'text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const TocIcon = () => (
  <svg aria-hidden='true' viewBox='0 0 24 24' className='size-4' fill='none' stroke='currentColor' strokeWidth={2}>
    <path d='M3 6h18M3 12h12M3 18h16' strokeLinecap='round' />
  </svg>
);

/** Índice lateral fijo (escritorio). */
export const TableOfContents = ({ items, targetId }: Props) => {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const range = useVisibleSections(ids, targetId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstVisibleId = range ? items[range.first]?.id : null;

  // Mantiene visible la primera sección resaltada cuando el índice es más alto que la pantalla.
  // Solo desplaza el contenedor del índice: scrollIntoView también movería la ventana.
  useEffect(() => {
    const container = scrollRef.current;
    if (!firstVisibleId || !container) return;
    const link = container.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(firstVisibleId)}"]`);
    if (!link) return;

    const linkTop = link.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
    const linkBottom = linkTop + link.offsetHeight;
    const padding = 24;
    if (linkTop - padding < container.scrollTop) {
      container.scrollTo({ top: linkTop - padding, behavior: 'smooth' });
    } else if (linkBottom + padding > container.scrollTop + container.clientHeight) {
      container.scrollTo({ top: linkBottom + padding - container.clientHeight, behavior: 'smooth' });
    }
  }, [firstVisibleId]);

  if (items.length === 0) return null;

  return (
    <nav aria-label='Índice del artículo' className='flex max-h-(--toc-max-height) flex-col'>
      <p className='text-muted mb-4 flex items-center gap-2 text-sm'>
        <TocIcon />
        En esta página
      </p>
      <div ref={scrollRef} className='-mr-2 [scrollbar-width:thin] overflow-y-auto py-1 pr-2'>
        <TocList items={items} range={range} />
      </div>
    </nav>
  );
};

/** Índice plegable (móvil y tablet). */
export const TableOfContentsMobile = ({ items, targetId }: Props) => {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const range = useVisibleSections(ids, targetId);
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  const activeText = range ? items[range.first]?.text : undefined;

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className='group rounded-2xl border border-(--app-border) backdrop-blur-xl lg:hidden'
    >
      <summary className='flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm [&::-webkit-details-marker]:hidden'>
        <span className='flex min-w-0 items-center gap-2'>
          <TocIcon />
          <span className='shrink-0 font-medium'>En esta página</span>
          {activeText ? <span className='text-muted truncate'>· {activeText}</span> : null}
        </span>
        <span aria-hidden='true' className='text-muted transition-transform duration-200 group-open:rotate-180'>
          ⌄
        </span>
      </summary>
      <div className='max-h-[60vh] overflow-y-auto px-4 pt-1 pb-4'>
        <TocList items={items} range={range} onNavigate={() => setOpen(false)} />
      </div>
    </details>
  );
};

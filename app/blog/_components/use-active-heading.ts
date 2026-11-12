'use client';

import { useEffect, useState } from 'react';

/** Altura reservada arriba (navbar sticky + margen): lo que queda debajo cuenta como "en pantalla". */
export const HEADING_OFFSET = 120;

export interface VisibleRange {
  first: number;
  last: number;
}

/** Se suscribe a scroll/resize agrupando las actualizaciones en un frame. */
function subscribeToScroll(update: () => void) {
  let frame = 0;
  const onScroll = () => {
    if (!frame) {
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    }
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

/**
 * Rango de secciones visibles en pantalla (índices de `ids`).
 * Una sección va desde su título hasta el siguiente; la última, hasta el final de `targetId`.
 */
export function useVisibleSections(ids: string[], targetId: string) {
  const [range, setRange] = useState<VisibleRange | null>(null);

  useEffect(() => {
    const headings = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const target = document.getElementById(targetId);
    if (headings.length === 0 || !target) return;

    return subscribeToScroll(() => {
      const tops = headings.map((heading) => heading.getBoundingClientRect().top);
      const contentBottom = target.getBoundingClientRect().bottom;
      const viewportBottom = window.innerHeight;

      let first = -1;
      let last = -1;
      tops.forEach((start, index) => {
        const end = index < tops.length - 1 ? tops[index + 1] : contentBottom;
        if (end > HEADING_OFFSET && start < viewportBottom) {
          if (first === -1) first = index;
          last = index;
        }
      });

      setRange((prev) => {
        if (first === -1) return null;
        if (prev?.first === first && prev.last === last) return prev;
        return { first, last };
      });
    });
  }, [ids, targetId]);

  return range;
}

/** Progreso de lectura (0–1) del elemento indicado. */
export function useReadingProgress(targetId: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    return subscribeToScroll(() => {
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight + HEADING_OFFSET;
      const read = HEADING_OFFSET - rect.top;
      // Redondeo a 1% para no re-renderizar en cada píxel.
      setProgress(total <= 0 ? 1 : Math.round(Math.min(1, Math.max(0, read / total)) * 100) / 100);
    });
  }, [targetId]);

  return progress;
}

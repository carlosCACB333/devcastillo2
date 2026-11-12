'use client';

import { useEffect, useState } from 'react';

/** Distancia desde arriba (navbar sticky + margen) a partir de la cual un título cuenta como "actual". */
export const HEADING_OFFSET = 120;

/**
 * Devuelve el id del último título que ya pasó la línea de lectura.
 * Usa scroll + requestAnimationFrame: más predecible que IntersectionObserver con secciones largas.
 */
export function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveId(headings[headings.length - 1].id);
        return;
      }

      let current: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top - HEADING_OFFSET <= 0) current = heading.id;
        else break;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return activeId;
}

/** Progreso de lectura (0–1) del elemento indicado. */
export function useReadingProgress(targetId: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight + HEADING_OFFSET;
      const read = HEADING_OFFSET - rect.top;
      setProgress(total <= 0 ? 1 : Math.min(1, Math.max(0, read / total)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetId]);

  return progress;
}

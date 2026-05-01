'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type UseFullscreenResult<T extends HTMLElement> = {
  elementRef: React.RefObject<T | null>;
  isFullscreen: boolean;
  isSupported: boolean;
  enter: () => Promise<boolean>;
  exit: () => Promise<boolean>;
  toggle: () => Promise<boolean>;
};

export function useFullscreen<T extends HTMLElement>(): UseFullscreenResult<T> {
  const elementRef = useRef<T>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(Boolean(document.fullscreenEnabled));

    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === elementRef.current);
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const enter = useCallback(async () => {
    const node = elementRef.current;
    if (!node) return false;

    if (document.fullscreenElement === node) {
      setIsFullscreen(true);
      return true;
    }

    try {
      await node.requestFullscreen();
      return true;
    } catch {
      return false;
    }
  }, []);

  const exit = useCallback(async () => {
    if (!document.fullscreenElement) {
      setIsFullscreen(false);
      return true;
    }

    try {
      await document.exitFullscreen();
      return true;
    } catch {
      return false;
    }
  }, []);

  const toggle = useCallback(async () => {
    if (isFullscreen) {
      return exit();
    }

    return enter();
  }, [enter, exit, isFullscreen]);

  return {
    elementRef,
    isFullscreen,
    isSupported,
    enter,
    exit,
    toggle,
  };
}

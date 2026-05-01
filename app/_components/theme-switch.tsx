'use client';

import { Button } from '@heroui/react';
import { useTheme } from 'next-themes';
import { useMounted } from '../_hooks/use-mounted';
import { MoonIcon, SunIcon } from './icons';

export const ThemeSwitch = () => {
  const { theme, systemTheme, setTheme } = useTheme();
  const isMounted = useMounted();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDarkMode = currentTheme === 'dark';

  const showDark = !isMounted || isDarkMode;

  return (
    <Button
      isIconOnly
      aria-label={showDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className='shrink-0'
      onClick={() => setTheme(showDark ? 'light' : 'dark')}
      size='sm'
      variant='ghost'
      isDisabled={!isMounted}
    >
      {showDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

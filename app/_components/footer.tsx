import { cacheLife } from 'next/cache';
import { profile } from '../_data/portfolio';
import { NextLink } from './ui/next-link';

export const Footer = async () => {
  'use cache';
  cacheLife('max');

  const year = new Date().getFullYear();

  return (
    <footer className='mt-auto border-t py-6 text-center text-sm'>
      <div className='mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 sm:flex-row'>
        <div className='text-foreground-2'>
          © {year} {profile.name}. Todos los derechos reservados.
        </div>
        <div className='flex gap-4'>
          <NextLink href='/projects'>Proyectos</NextLink>
          <NextLink href='/blog'>Blog</NextLink>
          <NextLink href='/certificates'>Certificados</NextLink>
        </div>
      </div>
    </footer>
  );
};

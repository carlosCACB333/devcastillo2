import { linkVariants } from '@heroui/styles';
import Link from 'next/link';
import { profile } from '../_data/portfolio';

export const Footer = () => {
  const linkClass = linkVariants();
  const year = '2026';

  return (
    <footer className='mt-auto border-t py-6 text-center text-sm'>
      <div className='mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 sm:flex-row'>
        <div className='text-foreground-2'>
          © {year} {profile.name}. Todos los derechos reservados.
        </div>
        <div className='flex gap-4'>
          <Link href='/projects' className={linkClass.base()}>
            Proyectos
          </Link>
          <Link href='/blog' className={linkClass.base()}>
            Blog
          </Link>
          <Link href='/certificates' className={linkClass.base()}>
            Certificados
          </Link>
        </div>
      </div>
    </footer>
  );
};

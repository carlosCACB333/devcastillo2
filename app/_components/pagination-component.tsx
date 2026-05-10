import Link from 'next/link';
import { PaginationInfo } from '../_types';
import { buttonVariants } from '@heroui/styles';
import { UrlQueryBuilder } from '../_utils/url';
import { Route } from 'next';

interface Props {
  pagination: PaginationInfo;
  path: Route;
  q?: string;
}

export const PaginationComponent = ({ pagination, path, q }: Props) => {
  const linkClass = buttonVariants({ variant: 'ghost', size: 'sm' });
  const baseHref = UrlQueryBuilder.create(path).set('q', q || '');
  const prevHref = pagination.hasPreviousPage ? baseHref.set('page', pagination.currentPage - 1).build() : '#';
  const nextHref = pagination.hasNextPage ? baseHref.set('page', pagination.currentPage + 1).build() : '#';

  return (
    <div className='flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-(--app-border) px-6 py-4 sm:flex-row'>
      <div className='text-foreground-2 text-sm'>
        Página {pagination.currentPage} de {pagination.totalPages}
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <Link href={prevHref} aria-disabled={!pagination.hasPreviousPage} className={linkClass}>
          Anterior
        </Link>

        <Link href={nextHref} aria-disabled={!pagination.hasNextPage} className={linkClass}>
          Siguiente
        </Link>
      </div>
    </div>
  );
};

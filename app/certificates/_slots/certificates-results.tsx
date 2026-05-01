import { Chip } from '@heroui/react';
import { Route } from 'next';
import { CardSimple } from '../../_components/card-simple';
import { PaginationComponent } from '../../_components/pagination-component';
import { PaginationInfo } from '../../_types';
import { CertificationSearchResult } from '../_services/search-certificates';

interface Props {
  certifications: CertificationSearchResult[];
  pagination: PaginationInfo;
  q?: string;
}

export const CertificatesResults = async ({ certifications, pagination, q = '' }: Props) => {
  'use cache';

  return (
    <section className='space-y-6 pt-4'>
      {certifications.length > 0 ? (
        <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {certifications.map((certification, index) => (
            <CardSimple
              key={certification.id}
              caption='Certificación'
              title={certification.name}
              imageSrc={certification.picture.url}
              href={certification.picture.url as Route}
              imageCaption={
                <Chip size='sm' variant='soft' className='bg-white/90 text-slate-900'>
                  #{String(pagination.showingStart + index).padStart(2, '0')}
                </Chip>
              }
            />
          ))}
        </div>
      ) : (
        <CardSimple caption='Sin resultados' title='No hay certificados disponibles.'>
          No se encontraron certificados en este momento. Intenta ajustar tu búsqueda o vuelve a consultar más tarde.
        </CardSimple>
      )}

      {pagination.totalPages > 1 && <PaginationComponent pagination={pagination} path='/certificates' q={q} />}
    </section>
  );
};

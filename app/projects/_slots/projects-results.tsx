import { buttonVariants, Chip } from '@heroui/react';
import { Route } from 'next';
import Link from 'next/link';
import { CardSimple } from '../../_components/card-simple';
import { GithubIcon, WorldIcon } from '../../_components/icons';
import { PaginationComponent } from '../../_components/pagination-component';
import { PaginationInfo } from '../../_types';
import { ProjectSearchResult } from '../_services/search-projects';

interface Props {
  projects: ProjectSearchResult[];
  pagination: PaginationInfo;
  q?: string;
  btnClassName?: string;
}

export const ProjectsResults = ({ projects, pagination, q = '', btnClassName }: Props) => {
  const fallbackButtonClassName = btnClassName ?? buttonVariants({ variant: 'tertiary', size: 'lg' });

  return (
    <section className='space-y-6 pt-4'>
      {projects.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2'>
          {projects.map((project, index) => (
            <CardSimple
              key={project.id}
              caption='Proyecto'
              title={project.title}
              imageSrc={project.pictures.at(0)?.url}
              href={project.pictures.at(0)?.url as Route}
              footer={
                <div className='flex flex-wrap gap-2'>
                  {project.gitHub ? (
                    <Link
                      href={project.gitHub as Route}
                      target='_blank'
                      rel='noreferrer'
                      className={fallbackButtonClassName}
                    >
                      <GithubIcon />
                      Código fuente
                    </Link>
                  ) : null}

                  {project.webSide ? (
                    <Link
                      href={project.webSide as Route}
                      target='_blank'
                      rel='noreferrer'
                      className={fallbackButtonClassName}
                    >
                      <WorldIcon />
                      Sitio en vivo
                    </Link>
                  ) : null}
                </div>
              }
              imageCaption={
                <Chip size='sm' variant='soft' className='bg-white/90 text-slate-900'>
                  #{String(pagination.showingStart + index).padStart(2, '0')}
                </Chip>
              }
            >
              <p className='text-foreground-2 text-sm leading-6'>{project.abstract}</p>

              {project.skills.length > 0 && (
                <div className='flex flex-wrap gap-2 pt-2'>
                  {project.skills.map((skill) => (
                    <Chip key={skill.id} size='sm' variant='soft'>
                      {skill.name}
                    </Chip>
                  ))}
                </div>
              )}
            </CardSimple>
          ))}
        </div>
      ) : (
        <CardSimple caption='Sin resultados' title='No hay proyectos disponibles.'>
          No se encontraron proyectos en este momento. Intenta ajustar tu búsqueda o vuelve a consultar más tarde.
        </CardSimple>
      )}

      {pagination.totalPages > 1 && <PaginationComponent pagination={pagination} path='/projects' q={q} />}
    </section>
  );
};

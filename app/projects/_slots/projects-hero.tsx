import { Chip } from '@heroui/react';

export const ProjectsHero = () => {
  return (
    <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
      <div className='max-w-3xl space-y-5'>
        <Chip size='sm' variant='soft'>
          Proyectos técnicos destacados
        </Chip>
        <div className='space-y-4'>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
            Proyectos y experiencias técnicas
          </h1>
          <p className='text-foreground-2 text-lg leading-8 sm:text-xl'>
            Explora una selección de proyectos en los que he trabajado: aplicaciones web, APIs, microservicios y
            soluciones de backend. Cada ficha incluye tecnologías utilizadas y enlaces a código fuente o demos en
            producción.
          </p>
        </div>
      </div>
    </div>
  );
};

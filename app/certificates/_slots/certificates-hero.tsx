import { Chip } from '@heroui/react';

export const CertificatesHero = () => {
  return (
    <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
      <div className='max-w-3xl space-y-5'>
        <Chip size='sm' variant='soft'>
          Certificaciones verificadas
        </Chip>
        <div className='space-y-4'>
          <h1 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
            Certificados y formación continua
          </h1>
          <p className='text-foreground-2 text-lg leading-8 sm:text-xl'>
            Una selección ordenada de certificaciones y cursos que complementan mi perfil técnico. Priorizados para
            mostrar primero los más relevantes.
          </p>
        </div>
      </div>
    </div>
  );
};

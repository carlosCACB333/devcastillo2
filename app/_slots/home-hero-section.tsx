import { buttonVariants, Chip, Link } from '@heroui/react';
import { profile } from '../_data/portfolio';
import { LinkedinIcon } from '../_components/icons';
import { CardSimple } from '../_components/card-simple';

export const HeroSection = () => {
  const btnPrimary = buttonVariants({ size: 'lg' });
  const btnSecondary = buttonVariants({ variant: 'secondary', size: 'lg' });

  return (
    <div className='grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start'>
      <div id='sobre-mi' className='space-y-8'>
        <div className='space-y-5'>
          <Chip size='sm' variant='soft'>
            Disponible para proyectos de producto y backend
          </Chip>
          <div className='space-y-4'>
            <h1 className='max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>{profile.name}</h1>
            <p className='max-w-2xl text-lg leading-8 sm:text-xl'>{profile.role}</p>
          </div>
          <p className='text-foreground-2 max-w-2xl text-base leading-8 sm:text-lg'>{profile.summary}</p>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <Link className={`${btnPrimary} space-x-1`} href={profile.linkedin} target='_blank'>
            <LinkedinIcon />
            Ver LinkedIn
            <Link.Icon />
          </Link>
          <Link className={`${btnSecondary} space-x-1`} href={profile.cv} target='_blank'>
            Descargar CV
            <Link.Icon />
          </Link>
        </div>

        <div className='text-muted flex flex-wrap gap-3 text-sm'>
          <span>{profile.location}</span>
          <span>·</span>
          <Link href={profile.github} className='text-muted'>
            GitHub
            <Link.Icon />
          </Link>
          <span>·</span>
          <Link href={`mailto:${profile.email}`} className='text-muted'>
            {profile.email}
            <Link.Icon />
          </Link>
        </div>
      </div>

      <CardSimple caption='Perfil' title='Resumen rápido'>
        <div className='mb-6 space-y-4'>
          <p>
            Soy un desarrollador orientado a construir productos sólidos con foco en mantenibilidad, rendimiento y
            experiencia de usuario.
          </p>
          <p>
            He trabajado en frontend, backend y arquitectura, conectando equipos, APIs y negocio con un criterio
            práctico de ingeniería.
          </p>
        </div>

        <div className='grid gap-3 text-sm sm:grid-cols-2'>
          <CardSimple titleSize='md' caption='Especialidad' title='Microservicios y frontend moderno' padding={false} />
          <CardSimple titleSize='md' caption='Enfoque' title='Código limpio y escalable' padding={false} />
        </div>
      </CardSimple>
    </div>
  );
};
